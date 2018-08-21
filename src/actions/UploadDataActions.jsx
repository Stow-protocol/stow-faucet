import { encrypt } from '../utils';
import store from '../store'

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

export const uploadData = (file, public_key, metadata) => {
  // Upload data to Linnia
  return async (dispatch) => {
    const linnia = store.getState().auth.linnia;
    const ipfs = linnia.ipfs;

    // Read File
    const fileReader = new FileReader();
    fileReader.onloadend = async (e) => {
      let encrypted, dataUri;
      const content = fileReader.result;

      //Encrypt
      try {
        dispatch(uploadingToIpfs());
        encrypted = await encrypt(
          public_key,
          JSON.stringify(content),
        );
      } catch (e) {
        dispatch(uploadError("Unable to encrypt file. Check the Public Key"));
        return
      }

      //Upload to IPFS
      try {
        dataUri = await new Promise((resolve, reject) => {
          ipfs.add(encrypted, (err, ipfsRed) => {
            err ? reject(err) : resolve(ipfsRed);
          });
        });
      } catch (e) {
        dispatch(uploadError("Unable to upload file to IPFS"));
        return;
      }

      const [owner] = await store.getState().auth.web3.eth.getAccounts();
      const { records } = await linnia.getContractInstances();

      // hash of the plain file
      const hash = linnia.web3.utils.sha3(JSON.stringify(content));

      //Upload file to Linnia
      try {
        await records.addRecord(
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
        dispatch(uploadError("Unable to upload file to Linnia"));
        return;
      }

      dispatch(dataUploaded());

    }
    fileReader.readAsText(file);
  }
}