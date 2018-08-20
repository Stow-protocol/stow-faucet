import { connect } from 'react-redux'
import UploadData from '../components/UploadData'
import { uploadData } from '../actions/UploadDataActions'

const mapStateToProps = (state, ownProps) => {
  const isLoading = state.uploadData.isLoading
  const message = state.uploadData.message
  const done = state.uploadData.done

  return {
    isLoading,
    message,
    done,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadData: (file, public_key, metadata) => {
      dispatch(uploadData(file, public_key, metadata))
    }
  }
}

const UploadDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadData)

export default UploadDataContainer
