import { connect } from 'react-redux'
import Faucet from './Faucet'
import { registerUser } from './FaucetActions'

const mapStateToProps = (state, ownProps) => {
  const userAddress = state.faucet.userAddress
  const isLoading = state.faucet.isLoading
  const message = state.faucet.message

  return {
    isLoading,
    userAddress,
    message,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterUser: () => {
      dispatch(registerUser())
    }
  }
}

const FaucetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Faucet)

export default FaucetContainer
