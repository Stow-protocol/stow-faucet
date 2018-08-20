import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CreateUsersIntro from './CreateUsersIntro';
import { withStyles } from '@material-ui/core/styles';
import Success from './../common/Success';
import Typography from '@material-ui/core/Typography';
const Wallet = require("ethereumjs-wallet");


const styles = {
  button: {
    marginTop: 20
  },
  copy: {
    marginTop: 10
  }
};

class CreateUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet_private_key: null,
      wallet_address: null,
      eth_wallet: null
    };
  }

  downloadKeys = () => {
    this.props.onDownloadKeys(this.state.eth_wallet);
  };

  generateKeys = () => {
    const wallet = Wallet.generate();
    const wallet_private_key = wallet.getPrivateKeyString();
    const wallet_address = wallet.getAddressString();

    this.setState({
      wallet_private_key: wallet_private_key,
      wallet_address: wallet_address,
      eth_wallet: wallet
    });
  };

  render() {
    const { classes } = this.props;

    // If the keys were already generated
    if (this.state.wallet_private_key) {
      return (
        <Success>
          <div>
            <Typography variant="title" className={classes.copy}>
            Success!
            </Typography>
            <Typography variant="body1" className={classes.copy}>
              It is your responsibility to store them safely. If you loose your
              file there is nothing we can do in order to recover
              them.
            </Typography>
            <Button
              variant="contained"
              id="download-keys"
              color="secondary"
              type="button"
              className={classes.button}
              onClick={this.downloadKeys}
            >
              Download Keys
            </Button>
          </div>
        </Success>
      );
    } else {
      return (
        <div>
          <CreateUsersIntro />
          <Button
            variant="contained"
            id="generate-keys"
            color="secondary"
            type="button"
            className={classes.button}
            onClick={this.generateKeys}
          >
            Generate New Ethereum Address
          </Button>
        </div>
      );
    }
  }
}

export default withStyles(styles)(CreateUsers);