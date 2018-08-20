import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthError from './AuthError';

const Empty = () => {
  return (
    <div>
    </div>
  );
};

class ShowAuthErrors extends Component {
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

ShowAuthErrors.propTypes = {
  authError: PropTypes.string,
};

export default ShowAuthErrors;