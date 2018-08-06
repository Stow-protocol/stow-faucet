export const START_DOWNLOADING = 'START_DOWNLOADING'
export const END_DOWNLOADING = 'END_DOWNLOADING'

const startDownloading = () => ({
  type: START_DOWNLOADING,
  isLoading: true
})

const endDownloading = () => ({
  type: END_DOWNLOADING,
  isLoading: false
})


export function downloadKeys (private_enc_key, public_enc_key, eth_wallet) {
  return async (dispatch) => {
    console.log("START DOWNLOADING")
    dispatch(startDownloading())
    try{
      const pass = prompt("Input a password for exporting your ETH wallet")
      const wallet = eth_wallet.toV3(pass)
  
      //Download Eth Wallet
      var element = document.createElement('a');
      element.setAttribute('href', 'data:json,' + encodeURIComponent(JSON.stringify(wallet)));
      element.setAttribute('download', "linnia_eth_wallet.json");
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
  
      //Download Encryption Keys
      const enc_keys = {private_encryption_key: private_enc_key, public_encryption_key: public_enc_key }
      var element2 = document.createElement('a');
      element2.setAttribute('href', 'data:json,' + encodeURIComponent(JSON.stringify(enc_keys)));
      element2.setAttribute('download', "linnia_enc_keys.json");
      element2.style.display = 'none';
      document.body.appendChild(element2);
      element2.click();
      document.body.removeChild(element2);

    } catch(e){
    }
  
    dispatch(endDownloading())
  }
}