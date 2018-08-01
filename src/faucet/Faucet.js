import React, { Component } from 'react';
const Wallet = require('ethereumjs-wallet')

class Faucet extends Component {
  constructor(props) {
    super(props)
    this.state = {private_key: null, public_key: null}

    this.generateKeys = this.generateKeys.bind(this)
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
    const intro = () =>
      <p className="App-intro">
        This Faucet is to create a Linnia User and get started developing using the Linnia Protocol
      </p>

    // If the keys were already generated
    if(this.state.private_key){
      return (
        <div>
          {intro()}
          <h1>This are your Linnia Keys</h1>
          <h3>Private Key: {this.state.private_key}</h3>
          <h3>Public Key: {this.state.public_key}</h3>
          <p>It is your responsability to store them safetly. If you loose your keys or they get stolen there is nothing we can do in order to recover them.</p>
          <p>Save them carefully</p>

          <button type='button' onClick={this.registerUser} >Register Linnia User</button>
        </div>
      );
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