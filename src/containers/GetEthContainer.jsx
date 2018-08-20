import { connect } from 'react-redux'
import GetEth from '../components/GetEth'

const mapStateToProps = (state, ownProps) => {
  const web3 = state.auth.web3

  return {
    web3,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const GetEthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetEth)

export default GetEthContainer;
