import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
const Wallet = require('ethereumjs-wallet')

const progressStyle = {
  color: 'black',
}

class Faucet extends Component {
  constructor(props) {
    super(props)
    this.state = {private_key: null, public_key: null}
  }

  generateKeys = () => {
    const wallet = Wallet.generate()
    const private_key = wallet.getPrivateKeyString()
    const public_key = wallet.getPublicKeyString()
    this.setState({ private_key: private_key, public_key: public_key })
  }

  registerUser = () => {
    this.props.onRegisterUser()
  }

  render () {
    const { isLoading, userAddress, message } = this.props

    const intro = () =>
      <div>
        <h1>Register User</h1>
        <p className="App-intro">
          This Faucet is to create a Linnia User and get started developing using the Linnia Protocol
        </p>
        {message && <h2 className='error'>{message}</h2>}
      </div>

    const linniaKeys = () =>
      <div>
        <h1>This are your Linnia Encryption Keys</h1>
        <h3>Private Key: {this.state.private_key}</h3>
        <h3>Public Key: {this.state.public_key}</h3>
        <p>It is your responsability to store them safetly. If you loose your keys or they get stolen there is nothing we can do in order to recover them.</p>
        <p>Save them carefully</p>
      </div>

    // If the keys were already generated
    if(this.state.private_key){
      // If the user was registered
      if(userAddress){
        return (
          <div>
            {intro()}
            {isLoading && <div>
              <div className='progress-background' />
              <CircularProgress className='progress' style={progressStyle} thickness={7} />
            </div>}
            {linniaKeys()}
            <h2>The User was created Successfully</h2>
            <h3>User Address: {userAddress}</h3>
          </div>
        );
      }else{
        return (
          <div>
            {intro()}
            {isLoading && <div>
              <div className='progress-background' />
              <CircularProgress className='progress' style={progressStyle} thickness={7} />
            </div>}
            {linniaKeys()}
            <button type='button' onClick={this.registerUser} >Register Linnia User</button>
          </div>
        );
      }
    }
    else{
      return (
        <div>
          {intro()}
          <button type='button' onClick={this.generateKeys} >Generate Linnia Keys</button>
        </div>
      );
    }
  }
}

export default Faucet;
