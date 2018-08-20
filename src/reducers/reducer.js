import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './authReducer';
import registerUserReducer from './registerUserReducer';
import uploadDataReducer from './uploadDataReducer';
import createUsersReducer from './createUsersReducer';

const reducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  registerUser: registerUserReducer,
  uploadData: uploadDataReducer,
  createUsers: createUsersReducer,
});

export default reducer;