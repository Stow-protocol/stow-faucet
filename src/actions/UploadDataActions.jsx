import crypto from 'crypto';
import store from '../store'
import Linnia from '@linniaprotocol/linnia-js';

export const UPLOAD_ERROR = 'UPLOAD_ERROR'
export const UPLOADING_TO_IPFS = 'UPLOADING_TO_IPFS'
export const UPLOADING_TO_LINNIA = 'UPLOADING_TO_LINNIA'
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
  
  let uploadFile = async (dispatch, ipfs, linnia, content) => {
    let encrypted, dataUri;
    
    //Encrypt
    try {
      dispatch(uploadingToIpfs());
      encrypted = await Linnia.util.encrypt(
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
    const hash = linnia.web3.utils.sha3(JSON.stringify(content));

    //Upload file to Linnia
    try {
      metadata.dataFormat = "json";
      metadata.storage = "IPFS";
      // TODO, get the encryption scheme and the linnia js version from linnia js object
      // Add those 2 has static variables of the Linnia js class
      metadata.encryptionScheme = "x25519-xsalsa20-poly1305";
      metadata.linniajsVersion = "0.3.0";
      metadata.encryptionPublicKey = publicKey;

      await linnia.addRecord(
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
      dispatch(uploadError("Unable to upload file to Linnia"));
      return;
    }

    dispatch(dataUploaded());
  };

  // Upload data to Linnia
  return async (dispatch) => {
    const linnia = store.getState().auth.linnia;
    const ipfs = store.getState().auth.ipfs;

    // Local File
    if(file instanceof Blob) {
      // Read File
      const fileReader = new FileReader();
      fileReader.onloadend = async (e) => {
        const content = JSON.parse(fileReader.result);
        await uploadFile(dispatch, ipfs, linnia, content);
      }
      fileReader.readAsText(file);
    
    // Linnia dummy data
    } else {
      await uploadFile(dispatch, ipfs, linnia, file);
    }
  }
}