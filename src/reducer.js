import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth/authReducer';
import faucetReducer from './faucetReducer';

const reducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  faucet: faucetReducer,
});

export default reducer;
