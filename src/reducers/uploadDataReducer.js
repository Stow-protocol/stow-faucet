import {
    UPLOAD_ERROR,
    UPLOADING_TO_IPFS,
    UPLOADING_TO_STOW,
    DATA_UPLOADED
  } from '../actions/UploadDataActions';
  
  const initialState = {
    isLoading: false,
    message: null,
    done: false,
    dataHash: ""
  };
  
  const uploadDataReducer = (state = initialState, action) => {
    if (action.type === UPLOADING_TO_IPFS) {
      const { isLoading, message } = action;
      return Object.assign({}, state, { isLoading, message });
    } else if (action.type === UPLOADING_TO_STOW) {
      const { isLoading, message } = action;
      return Object.assign({}, state, { isLoading, message });
    } else if (action.type === DATA_UPLOADED) {
      const { isLoading, done, dataHash } = action;
      return Object.assign({}, state, { isLoading, done, dataHash });
    } else if (action.type === UPLOAD_ERROR) {
      const { isLoading, message } = action;
      return Object.assign({}, state, { isLoading, message });
  }
  
    return state;
  };
  
  export default uploadDataReducer;
  