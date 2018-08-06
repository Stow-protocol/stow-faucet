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


export function downloadKeys (eth_wallet) {
  return async (dispatch) => {
    console.log("START DOWNLOADING")
    dispatch(startDownloading())
    try{
      await new Promise((resolve) => {
        setTimeout(resolve, 1000)
      })
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

    } catch(e){
    }
  
    dispatch(endDownloading())
  }
}