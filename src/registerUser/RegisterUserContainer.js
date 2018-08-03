import { connect } from 'react-redux'
import RegisterUser from './RegisterUser'
import { registerUser } from './RegisterUserActions'

const mapStateToProps = (state, ownProps) => {
  const userAddress = state.registerUser.userAddress
  const isLoading = state.registerUser.isLoading
  const message = state.registerUser.message

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

const RegisterUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterUser)

export default RegisterUserContainer
