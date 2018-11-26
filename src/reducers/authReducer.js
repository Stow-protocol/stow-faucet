import { AUTH_SUCCESS, AUTH_FAILURE } from '../actions/AuthActions';

const initialState = {
  web3: null,
  stow: null,
  ipfs: null,
  isAuthenticated: false,
  authError: '',
};

const AuthReducer = (state = initialState, action) => {
  if (action.type === AUTH_SUCCESS) {
    const { web3, ipfs, stow } = action;
    const isAuthenticated = true;

    return Object.assign({}, state, {
      web3,
      ipfs,
      stow,
      isAuthenticated,
    });
  } else if (action.type === AUTH_FAILURE) {
    const { authError, isAuthenticated } = action;
    return Object.assign({}, state, { authError, isAuthenticated });
  }

  return state;
};

export default AuthReducer;
