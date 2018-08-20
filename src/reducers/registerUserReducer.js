import {
    ADD_USER,
    USER_REGISTERED,
    REGISTRATION_ERROR
  } from '../actions/RegisterUserActions';
  
  const initialState = {
    isLoading: false,
    userAddress: null,
    message: null,
  };
  
  const registerUserReducer = (state = initialState, action) => {
    if (action.type === ADD_USER) {
        const { isLoading } = action;
        return Object.assign({}, state, { isLoading });
    } else if (action.type === USER_REGISTERED) {
        const { userAddress, isLoading } = action;
        return Object.assign({}, state, { userAddress, isLoading });
    } else if (action.type === REGISTRATION_ERROR) {
      const { isLoading, message } = action;
      return Object.assign({}, state, { isLoading, message });
  }
  
    return state;
  };
  
  export default registerUserReducer;
  