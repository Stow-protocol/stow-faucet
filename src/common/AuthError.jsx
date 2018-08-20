import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Failure from './Failure';
import StepContainer from './StepContainer';
import Typography from '@material-ui/core/Typography';

const errorCopy = {
  NO_METAMASK: 'No Metamask found. Please install Metamask and try again.',
  LOCKED_METAMASK: 'Please unlock Metamask and refresh to continue.',
  LINNIA_MISCONFIGURED: 'No hub found at supplied address on supplied network. Please check your configuration and network and try again.',
  IPFS_MISCONFIGURED: 'Connect to IPFS failed. Are you sure you configured it correctly?',
  STILL_LOADING: 'MetaMask and IPFS still initalizing! Please try again in a second.'
};

const styles = (theme) => ({
  error: {
    marginTop: 40,
    textAlign: 'center',
    color: theme.palette.black
  }
});

const AuthError = ({ classes, error }) => (
  <StepContainer>
    <Failure>
      <Typography variant="display1" className={classes.error}>
        {errorCopy[error]}
      </Typography>
    </Failure>
  </StepContainer>	
);

AuthError.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired
};

export default withStyles(styles)(AuthError);

