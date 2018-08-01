import store from '../store'

export function registerUser (private_key, public_key) {
  // Register User on Linnia
  console.log("Register User Action")
  return async (dispatch) => {
    const linnia = store.getState().auth.linnia
    const [ownerAddress] = await store.getState().auth.web3.eth.getAccounts()
    const { users } = await linnia.getContractInstances();
    await users.register({ from: ownerAddress, gas: 500000, gasPrice: 20000000000 });
    console.log("The user was registered sucessfully")
  }
}