import {
  START_DOWNLOADING,
  END_DOWNLOADING,
} from '../actions/CreateUsersActions';

const initialState = {
  isLoading: false,
};

const createUsersReducer = (state = initialState, action) => {
  if (action.type === START_DOWNLOADING) {
    const { isLoading } = action;
    return Object.assign({}, state, { isLoading });
  } else if (action.type === END_DOWNLOADING) {
    const { isLoading } = action;
    return Object.assign({}, state, { isLoading });
  }
  return state;
};

export default createUsersReducer;