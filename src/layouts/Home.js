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
  render () {
    const { authError } = this.props;

    return (
      <main className='container'>
        <div className='pure-g'>
          <div className='pure-u-1-1'>
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