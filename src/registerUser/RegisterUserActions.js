import store from '../store'

export const ADD_USER = 'ADD_USER'
export const USER_REGISTERED = 'USER_REGISTERED'
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR'

const addUser = () => ({
  type: ADD_USER,
  isLoading: true
})

const userRegistered = (userAddress) => ({
  type: USER_REGISTERED,
  isLoading: false,
  userAddress
})

const registrationError = (message) => ({
  type: REGISTRATION_ERROR,
  isLoading: false,
  message
})

export function registerUser () {
  // Register User on Linnia
  return async (dispatch) => {
    dispatch(addUser())
    const linnia = store.getState().auth.linnia
    const [userAddress] = await store.getState().auth.web3.eth.getAccounts()
    const { users } = await linnia.getContractInstances();

    //Register User
    try{
      const alreadyRegistered = await users.isUser(userAddress);
      if (alreadyRegistered){
        console.log("The User was already registered")
        dispatch(registrationError("The User was already registered"))
      } 
      else{
        await users.register({ from: userAddress, gas: 500000, gasPrice: 20000000000 });
        dispatch(userRegistered(userAddress))
      }
    } catch(e){
      dispatch(registrationError("Unable to register the user"))
    }
  }
}