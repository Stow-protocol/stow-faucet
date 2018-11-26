import crypto from 'crypto';
import store from '../store'
import Stow from '@stowprotocol/stow-js';

export const UPLOAD_ERROR = 'UPLOAD_ERROR'
export const UPLOADING_TO_IPFS = 'UPLOADING_TO_IPFS'
export const UPLOADING_TO_STOW = 'UPLOADING_TO_STOW'
export const DATA_UPLOADED = 'DATA_UPLOADED'

const uploadError = (message) => ({
  type: UPLOAD_ERROR,
  isLoading: false,
  message
})

const uploadingToIpfs = () => ({
  type: UPLOADING_TO_IPFS,
  isLoading: true
});

const dataUploaded = () => ({
  type: DATA_UPLOADED,
  isLoading: false,
  done: true
});

export const uploadData = (file, publicKey, originalMetadata) => {
  let metadata = {};
  originalMetadata.forEach( element => {
    metadata[element.key] = element.value;
  });
  
  let uploadFile = async (dispatch, ipfs, stow, content) => {
    let encrypted, dataUri;
    
    //Encrypt
    try {
      dispatch(uploadingToIpfs());
      encrypted = await Stow.util.encrypt(
         publicKey,
         content,
      );
    } catch (e) {
      dispatch(uploadError("Unable to encrypt file. Check the Public Key"));
      return
    }

    //Upload to IPFS
    try {
      dataUri = await new Promise((resolve, reject) => {
        ipfs.add(JSON.stringify(encrypted), (err, ipfsRed) => {
          err ? reject(err) : resolve(ipfsRed);
        });
      });
    } catch (e) {
      console.log(e)
      dispatch(uploadError("Unable to upload file to IPFS"));
      return;
    }

    const [owner] = await store.getState().auth.web3.eth.getAccounts();

    content.nonce = crypto.randomBytes(256).toString('hex');
    // hash of the plain file
    const hash = stow.web3.utils.sha3(JSON.stringify(content));

    //Upload file to stow
    try {
      metadata.dataFormat = "json";
      metadata.storage = "IPFS";
      // TODO, get the encryption scheme and the stow js version from stow js object
      // Add those 2 has static variables of the stow js class
      metadata.encryptionScheme = "x25519-xsalsa20-poly1305";
      metadata.stowjsVersion = "0.3.2";
      metadata.encryptionPublicKey = publicKey;

      await stow.addRecord(
         hash,
         metadata,
         dataUri,
         {
           from: owner,
           gas: 500000,
           gasPrice: 20000000000
         },
      );
    } catch (e) {
      console.log(e)
      dispatch(uploadError("Unable to upload file to Stow"));
      return;
    }

    dispatch(dataUploaded());
  };

  // Upload data to Stow
  return async (dispatch) => {
    const stow = store.getState().auth.stow;
    const ipfs = store.getState().auth.ipfs;

    // Local File
    if(file instanceof Blob) {
      // Read File
      const fileReader = new FileReader();
      fileReader.onloadend = async (e) => {
        const content = JSON.parse(fileReader.result);
        await uploadFile(dispatch, ipfs, stow, content);
      }
      fileReader.readAsText(file);
    
    // Stow dummy data
    } else {
      await uploadFile(dispatch, ipfs, stow, file);
    }
  }
}