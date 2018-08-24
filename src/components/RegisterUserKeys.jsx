import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Success from './../common/Success';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = (theme) => ({
  key: {
    wordWrap: 'break-word',
    color: theme.palette.black
  },
  keyTitle: {
    fontSize: 20,
    color: theme.palette.black
  },
  keyBox: {
    backgroundColor: theme.palette.primary.main,
    padding: 20
  },
  public: {
    marginTop: 20
  },
  copy: {
    marginTop: 10
  },
  success: {
    margin: '20px 0px'
  }
});

class RegisterUserKeys extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Success>
        <Typography 
          variant="title" 
          gutterBottom
          className={classes.success}
        >
          Success!
        </Typography>
        <div className={classes.keyBox}>
          <Typography 
            variant="title" 
            gutterBottom 
            className={classes.keyTitle}
          >
            Private Key:
          </Typography>
          <Typography 
            variant="body2" 
            className={classes.key}
          >
            {this.props.private_key}
          </Typography>
          <Typography 
            variant="title" 
            gutterBottom 
            className={classNames(classes.keyTitle, classes.public)}
          >
            Public Key:
          </Typography>
            <Typography 
            variant="body2" 
            className={classes.key}
          >
            {this.props.public_key}
          </Typography>
        </div>
        <Typography variant="body1" className={classes.copy}>
          It is your responsibility to store them safely. If you loose your
          keys or they get stolen, there is nothing we can do in order to recover
          them. Save them carefully!
        </Typography>
        <Typography variant="body1" className={classes.copy}>
          Next up, we need to register your ethereum address with the Linnia Protocol smart contracts.
        </Typography>
      </Success>
    );
  }
}

export default withStyles(styles)(RegisterUserKeys);