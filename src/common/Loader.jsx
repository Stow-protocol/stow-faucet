import React from 'react';
import { connect } from 'react-redux';
import Logo from 'linnia-brand/components/Logo';
import { withStyles } from '@material-ui/core/styles';

const logoStyle = {
  position: 'fixed',
  width: 500,
  height: 500,
  top: '50%',
  left: '50%',
  marginTop: -250,
  marginLeft: -250,
  zIndex: 10000000,
  animation: 'App-logo-spin infinite 20s linear',
};

const styles = (theme) => ({
  fullScreen: {
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: 9999,
    position: 'fixed', 
    top: 0,
    left: 0,
  }
});

const Loader = ({ isLoading, classes }) => isLoading ? (
  <div className={classes.fullScreen}>
    <Logo style={logoStyle} />
  </div>
) : (
  <div></div>
);

const mapStateToProps = (state) => {
	const isUploading = state.uploadData.isLoading;
	const isRegistering = state.registerUser.isLoading;
	const isCreating = state.createUsers.isLoading;
	const isLoading = isUploading || isRegistering || isCreating;
	return { isLoading };
};

export default connect(mapStateToProps)(withStyles(styles)(Loader));