import store from '../store'

export const ADD_USER = 'ADD_USER'
export const USER_REGISTERED = 'USER_REGISTERED'

const addUser = () => ({
  type: ADD_USER,
  isLoading: true
})

const userRegistered = (userAddress) => ({
  type: USER_REGISTERED,
  isLoading: false,
  userAddress
})

export function registerUser () {
  // Register User on Linnia
  return async (dispatch) => {
    dispatch(addUser())
    const linnia = store.getState().auth.linnia
    const [userAddress] = await store.getState().auth.web3.eth.getAccounts()
    const { users } = await linnia.getContractInstances();

    //Register User
    await users.register({ from: userAddress, gas: 500000, gasPrice: 20000000000 });
    console.log("The user was registered sucessfully")
    dispatch(userRegistered(userAddress))
  }
}

export function uploadData (private_key) {
  // Register User on Linnia
  return async (dispatch) => {
    console.log("Upload Data")
  }
}