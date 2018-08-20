import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ErrorIcon from '@material-ui/icons/Error';
import red from '@material-ui/core/colors/red';

const styles = (theme) => ({
  done: {
    backgroundColor: red[500],
    width: 200,
    height: 200
  },
  layout: {
    marginTop: 40
  },
  avatar: {
    margin: 'auto',
    width: 200,
    height: 200
  }
});

const Failure = ({ classes, children }) => (
  <section className={classes.layout}>
    <Avatar className={classes.avatar}>
      <ErrorIcon className={classes.done} />
    </Avatar>
    {children}
  </section>
);

Failure.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(Failure);


