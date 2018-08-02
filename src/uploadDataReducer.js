import {
    UPLOAD_ERROR,
    UPLOADING_TO_IPFS,
    UPLOADING_TO_LINNIA,
    DATA_UPLOADED
  } from './uploadData/UploadDataActions';
  
  const initialState = {
    isLoading: false,
    message: null,
    done: false,
  };
  
  const uploadDataReducer = (state = initialState, action) => {
    if (action.type === UPLOADING_TO_IPFS) {
      const { isLoading, message } = action;
      return Object.assign({}, state, { isLoading, message });
    } else if (action.type === UPLOADING_TO_LINNIA) {
      const { isLoading, message } = action;
      return Object.assign({}, state, { isLoading, message });
    } else if (action.type === DATA_UPLOADED) {
      const { isLoading, done } = action;
      return Object.assign({}, state, { isLoading, done });
    } else if (action.type === UPLOAD_ERROR) {
      const { isLoading, message } = action;
      return Object.assign({}, state, { isLoading, message });
  }
  
    return state;
  };
  
  export default uploadDataReducer;
  