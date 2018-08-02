import { connect } from 'react-redux'
import Faucet from './Faucet'
import { registerUser, uploadData } from './FaucetActions'

const mapStateToProps = (state, ownProps) => {
  const userAddress = state.faucet.userAddress
  const isLoading = state.faucet.isLoading

  return {
    isLoading,
    userAddress,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterUser: () => {
      dispatch(registerUser())
    },
    onUploadData: (private_key) => {
      dispatch(uploadData(private_key))
    }
  }
}

const FaucetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Faucet)

export default FaucetContainer
