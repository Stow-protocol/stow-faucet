import { connect } from 'react-redux'
import RegisterUser from '../components/RegisterUser'
import { registerUser } from '../actions/RegisterUserActions'

const mapStateToProps = (state, ownProps) => {
  const userAddress = state.registerUser.userAddress
  const message = state.registerUser.message
  const users = state.registerUser.users

  return {
    userAddress,
    message,
    users
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
