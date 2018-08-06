import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
const Wallet = require('ethereumjs-wallet')

const progressStyle = {
  color: 'black',
}

class CreateUsers extends Component {
  constructor(props) {
    super(props)
    this.state = { wallet_private_key: null, wallet_address: null, eth_wallet: null }
  }

  downloadKeys = () => {
    this.props.onDownloadKeys(this.state.eth_wallet)
  }

  generateKeys = () => {
    const wallet = Wallet.generate()
    const wallet_private_key = wallet.getPrivateKeyString()
    const wallet_address = wallet.getAddressString()

    this.setState({ 
      wallet_private_key: wallet_private_key,
      wallet_address: wallet_address,
      eth_wallet: wallet })
  }

  render () {
    const { isLoading } = this.props

    const intro = () =>
      <div>
        <h1>Create Linnia Users</h1>
        <p className="App-intro">
          Click the following button to generate the Wallet Signature for 1 Linnia User. You can click as many times as you want to generate more users.
        </p>
        <p>After generating the User you have to import the generated json file Metamask, go to the Register User tab and Register it in Linnia in order to be able to upload data</p>
        {isLoading && <div>
              <div className='progress-background' />
              <CircularProgress className='progress' style={progressStyle} thickness={7} />
        </div>}
      </div>

    const linniaKeys = () =>
      <div>
        <h1>Linnia Ethereum Wallet Keys</h1>
        <h3>Private Key: {this.state.wallet_private_key}</h3>
        <h3>Address: {this.state.wallet_address}</h3>
        <p>It is your responsability to store them safetly. If you loose your keys or they get stolen there is nothing we can do in order to recover them.</p>
        <p>Save them carefully</p>
      </div>

    // If the keys were already generated
    if(this.state.wallet_private_key){
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
