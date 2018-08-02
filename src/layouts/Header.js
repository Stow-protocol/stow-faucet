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
                onClick={this.navigateTo('/upload_data')}>
                Upload Data
              </button>
              <button
                onClick={this.navigateTo('/')}>
                Register User
              </button>
          </div>
        </div>
      </main>
    );
  }
}

export default Header;