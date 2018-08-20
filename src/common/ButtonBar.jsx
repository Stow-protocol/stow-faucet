import React from 'react';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  button: {
    marginTop: 25,
    color: theme.palette.white,
    backgroundColor: theme.palette.secondary.main
  },
  back: {
    float: 'left'
  },
  next: {
    float: 'right'
  },
  disabled: {
    color: `${theme.palette.white} !important`,
    backgroundColor: theme.palette.gray,
    opacity: 0.3
  },
});

const ButtonBar = ({ steps, activeStep, classes, handleBack, handleNext }) => (
  <div>
    <Button
      className={classNames(classes.button, classes.back)}
      disabled={activeStep === 0}
      onClick={handleBack}
      classes={{
        disabled: classes.disabled
      }}
    >
      Back
    </Button>
    <Button
      className={classNames(classes.button, classes.next)}
      variant="contained"
      color="primary"
      onClick={handleNext}
      classes={{
        disabled: classes.disabled
      }}
    >
      {activeStep === steps.length - 1 ? "Finish" : "Next"}
    </Button>
  </div>
);

ButtonBar.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired
};

export default withStyles(styles)(ButtonBar);
