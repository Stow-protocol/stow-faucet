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
        const { userAddress, isLoading, users } = action;
        return Object.assign({}, state, { isLoading, userAddress, users });
    } else if (action.type === REGISTRATION_ERROR) {
      const { isLoading, message, userAddress, users } = action;
      return Object.assign({}, state, { isLoading, message, userAddress, users });
  }
  
    return state;
  };
  
  export default registerUserReducer;
  