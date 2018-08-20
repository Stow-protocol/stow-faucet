import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  progress: {
    color: theme.palette.black
  },
  copy: {
    marginTop: 10,
  }
});

class CreateUsersIntro extends Component {
  render() {
    const { classes } = this.props;
    return (
       <div>
        <Typography className={classes.copy} variant="body1" gutterBottom>
          If you already have an Ethereum Address in Metamask then
          you can move onto step 3! If not, then no worries. Click
          the following button to generate an Ethereum Address for
          1 Linnia User. 
        </Typography>
        <Typography className={classes.copy} variant="body1" gutterBottom>
          To understand more about Ethereum Addresses and Private Keys: <a href="https://github.com/ConsenSys/linnia-resources/" target="Resources"> Go Here </a>
        </Typography>
        <Typography className={classes.copy} variant="body1">
          After generating the Ethereum Address you will have to enter a
          password to secure the file before downloading. After that you
          will have to import the generated JSON file or enter the Private
          Key into Metamask.
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(CreateUsersIntro);
