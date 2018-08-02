import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthError from '../auth/authError/AuthError';

const Empty = () => {
  return (
    <div>
    </div>
  );
};

class Home extends Component {
  navigateTo = route => () => {
    this.props.history.push(route);
  };

  render () {
    const { authError } = this.props;

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
            {authError ? <AuthError authError={authError} /> : <Empty />}
          </div>
        </div>
      </main>
    );
  }
}

Home.propTypes = {
  authError: PropTypes.string,
};

export default Home;