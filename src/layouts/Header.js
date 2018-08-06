import React, { Component } from 'react';

class Header extends Component {
  navigateTo = route => () => {
    this.props.history.push(route);
  };

  render () {
    return (
      <main className='container'>
        <div className='pure-g'>
          <div className='pure-u-1-1'>
              <button
                onClick={this.navigateTo('/linnia-faucet/upload-data')}>
                Upload Data to Linnia
              </button>
              <button
                onClick={this.navigateTo('/linnia-faucet/register-user')}>
                Register Metamask User in Linnia
              </button>
              <button
                onClick={this.navigateTo('/linnia-faucet')}>
                Create Linnia Users
              </button>
          </div>
        </div>
      </main>
    );
  }
}

export default Header;