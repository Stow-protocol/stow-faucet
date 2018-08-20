import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';

const styles = {
  copy: {
    marginTop: 10,
  }
};

class Intro extends Component {

  render() {
    const { classes } = this.props
    return (
      <div>
        <Typography variant="body1" className={classes.copy}>
          Hey there friend!
        </Typography>
        <Typography variant="body1" className={classes.copy}>
          This faucet is to help you understand the Linnia protocol.
          Before we begin please make sure you have installed MetaMask and are on the Ropsten test network. </Typography> 
        <Typography variant="body1" className={classes.copy}>
            <a href="https://metamask.io/" target='MetaMask'>
              Installation directions here
            </a>
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Intro);
