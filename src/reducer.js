import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth/authReducer';

const reducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
});

export default reducer;
