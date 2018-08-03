import { connect } from 'react-redux'
import CreateUsers from './CreateUsers'
import { createUser } from './CreateUsersActions'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateUserr: () => {
      dispatch(createUser())
    }
  }
}

const CreateUsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUsers)

export default CreateUsersContainer
