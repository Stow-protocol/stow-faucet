import store from '../store'

export const ADD_USER = 'ADD_USER'
export const USER_REGISTERED = 'USER_REGISTERED'
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR'

const addUser = () => ({
  type: ADD_USER,
  isLoading: true
})

const userRegistered = (userAddress, users) => ({
  type: USER_REGISTERED,
  isLoading: false,
  userAddress,
  users
})

const registrationError = (message, userAddress, users) => ({
  type: REGISTRATION_ERROR,
  isLoading: false,
  message,
  userAddress,
  users
})

export function registerUser () {
  // Register User on Stow
  return async (dispatch) => {
    dispatch(addUser())
    const stow = store.getState().auth.stow
    const [userAddress] = await store.getState().auth.web3.eth.getAccounts()
    const { users } = await stow.getContractInstances();

    //Register User
    try{
      const alreadyRegistered = await users.isUser(userAddress);
      if (!alreadyRegistered) {
        await users.register({from: userAddress, gas: 500000, gasPrice: 20000000000});
      }
      dispatch(userRegistered(userAddress, users))
    } catch(e){
      dispatch(registrationError("Unable to register the user", userAddress, users))
    }
  }
}