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
                onClick={this.navigateTo('/upload-data')}>
                Upload Data to Stow
              </button>
              <button
                onClick={this.navigateTo('/register-user')}>
                Register Metamask User in Stow
              </button>
              <button
                onClick={this.navigateTo('/')}>
                Create Stow Users
              </button>
          </div>
        </div>
      </main>
    );
  }
}

export default Header;