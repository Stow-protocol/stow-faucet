import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';
import green from '@material-ui/core/colors/green';

const styles = (theme) => ({
  layout: {
    marginTop: 40
  },
  done: {
    backgroundColor: green[500],
    width: 200,
    height: 200
  },
  avatar: {
    margin: 'auto',
    width: 200,
    height: 200
  }
});

const Success = ({ classes, children }) => (
  <section className={classes.layout}>
    <Avatar className={classes.avatar}>
      <DoneIcon className={classes.done} />
    </Avatar>
    {children}
  </section>
);

Success.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(Success);


