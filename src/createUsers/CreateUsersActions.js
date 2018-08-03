export const START_LOADING = 'START_LOADING'
export const END_LOADING = 'END_LOADING'

const startLoading = () => ({
  type: START_LOADING,
  isLoading: true
})

const endLoading = () => ({
  type: END_LOADING,
  isLoading: false
})


export function downloadKeys (private_enc_key, public_enc_key, eth_wallet) {
  return async (dispatch) => {
    dispatch(startLoading())
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
  
    dispatch(endLoading())
  }
}