import { connect } from 'react-redux'
import CreateUsers from '../components/CreateUsers'
import { downloadKeys } from '../actions/CreateUsersActions'

const mapStateToProps = () => ({});

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

export default CreateUsersContainer;