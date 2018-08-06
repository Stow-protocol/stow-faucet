import { connect } from 'react-redux'
import CreateUsers from './CreateUsers'
import { downloadKeys } from './CreateUsersActions'

const mapStateToProps = (state, ownProps) => {
  console.log("START DOWNLOADING3")
  const isLoading = state.createUsers.isLoading

  return {
    isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDownloadKeys: (eth_wallet) => {
      dispatch(downloadKeys(eth_wallet))
    }
  }
}

const CreateUsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUsers)

export default CreateUsersContainer