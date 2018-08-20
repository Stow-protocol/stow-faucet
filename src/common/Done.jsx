import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Success from './Success';
import StepContainer from './StepContainer';

const styles = {
	heroText: {
    textAlign: 'center',
    marginTop: 40
  }
};

const Done = ({ classes }) => (
  <StepContainer>
    <Success>
      <Typography 
        variant='display2' 
        className={classes.heroText}
      >
        You're done! Go for and and build our decentralized future!
      </Typography>
    </Success>
  </StepContainer>
);

Done.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Done);

