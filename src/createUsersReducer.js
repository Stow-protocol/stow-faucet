import {
    START_LOADING,
    END_LOADING,
  } from './createUsers/CreateUsersActions';
  
  const initialState = {
    isLoading: false,
  };
  
  const createUsersReducer = (state = initialState, action) => {
    if (action.type === START_LOADING) {
      const { isLoading } = action;
      return Object.assign({}, state, { isLoading });
    } else if (action.type === END_LOADING) {
      const { isLoading } = action;
      return Object.assign({}, state, { isLoading });
    }
    return state;
  };
  
  export default createUsersReducer;
  