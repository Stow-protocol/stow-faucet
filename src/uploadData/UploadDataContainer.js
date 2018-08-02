import { connect } from 'react-redux'
import UploadData from './UploadData'
import { uploadData } from './UploadDataActions'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadData: (filepath) => {
      dispatch(uploadData(filepath))
    }
  }
}

const UploadDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadData)

export default UploadDataContainer
