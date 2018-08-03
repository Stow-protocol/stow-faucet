import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth/authReducer';
import registerUserReducer from './registerUserReducer';
import uploadDataReducer from './uploadDataReducer'

const reducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  registerUser: registerUserReducer,
  uploadData: uploadDataReducer,
});

export default reducer;
