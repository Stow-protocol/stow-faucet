import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
const Wallet = require('ethereumjs-wallet')

const progressStyle = {
  color: 'black',
}

class CreateUsers extends Component {
  constructor(props) {
    super(props)
    this.state = { private_enc_key: null, public_enc_key: null, wallet_private_key: null, wallet_address: null, eth_wallet: null }
  }

  downloadKeys = () => {
    this.props.onDownloadKeys(this.state.private_enc_key, this.state.public_enc_key, this.state.eth_wallet)
  }

  generateKeys = () => {
    const enc_wallet = Wallet.generate()
    const private_enc_key = enc_wallet.getPrivateKeyString()
    const public_enc_key = enc_wallet.getPublicKeyString()

    const wallet = Wallet.generate()
    const wallet_private_key = wallet.getPrivateKeyString()
    const wallet_address = wallet.getAddressString()

    this.setState({ 
      private_enc_key: private_enc_key, 
      public_enc_key: public_enc_key, 
      wallet_private_key: wallet_private_key,
      wallet_address: wallet_address,
      eth_wallet: wallet })
  }

  render () {
    const { isLoading } = this.props
    console.log("START DOWNLOADING4")
    console.log('isLoading',isLoading)

    const intro = () =>
      <div>
        <h1>Create Linnia Users</h1>
        <p className="App-intro">
          Click the following button to generate the Wallet Signature and Encryption keys for 1 Linnia User. You can click as many times as you want to generate more users.
        </p>
        <p>After generating the User you have to add the Wallet private key to Metamask, go to the Register User tab and Register it in Linnia in order to be able to upload data</p>
        {isLoading && <div>
              <div className='progress-background' />
              <CircularProgress className='progress' style={progressStyle} thickness={7} />
        </div>}
      </div>

    const linniaKeys = () =>
      <div>
        <h1>Linnia Encryption Keys</h1>
        <h3>Private Key: {this.state.private_enc_key}</h3>
        <h3>Public Key: {this.state.public_enc_key}</h3>

        <h1>Ethereum Wallet Keys</h1>
        <h3>Private Key: {this.state.wallet_private_key}</h3>
        <h3>Address: {this.state.wallet_address}</h3>
        <p>It is your responsability to store them safetly. If you loose your keys or they get stolen there is nothing we can do in order to recover them.</p>
        <p>Save them carefully</p>
      </div>

    // If the keys were already generated
    if(this.state.private_enc_key){
      return (
        <div>
          {intro()}
          <button id='generate-keys' type='button' onClick={this.generateKeys} >Generate New Linnia Keys</button>
          {linniaKeys()}
          <button id='download-keys' type='button' onClick={this.downloadKeys} >Download Keys</button>
        </div>
      );
    }
    else{
      return (
        <div>
          {intro()}
          <button id='generate-keys' type='button' onClick={this.generateKeys} >Generate New Linnia Keys</button>
        </div>
      );
    }
  }
}

export default CreateUsers;
