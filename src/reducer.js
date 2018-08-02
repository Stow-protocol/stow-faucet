import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth/authReducer';
import faucetReducer from './faucetReducer';
import uploadDataReducer from './uploadDataReducer'

const reducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  faucet: faucetReducer,
  uploadData: uploadDataReducer,
});

export default reducer;
