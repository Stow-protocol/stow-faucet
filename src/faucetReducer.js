import {
    ADD_USER,
    USER_REGISTERED,
  } from './faucet/FaucetActions';
  
  const initialState = {
    isLoading: false,
    userAddress: null,
  };
  
  const faucetReducer = (state = initialState, action) => {
    if (action.type === ADD_USER) {
        const { isLoading } = action;
        return Object.assign({}, state, { isLoading });
    } else if (action.type === USER_REGISTERED) {
        const { userAddress, isLoading } = action;
        return Object.assign({}, state, { userAddress, isLoading });
    }
  
    return state;
  };
  
  export default faucetReducer;
  