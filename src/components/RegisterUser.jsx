import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RegisterUserKeys from './RegisterUserKeys';
import Wallet from "ethereumjs-wallet";
import { withStyles } from '@material-ui/core/styles';
import Success from './../common/Success';
import Failure from './../common/Failure';

const styles = {
  copy: {
    marginTop: 10
  },
  button: {
    marginTop: 20
  },
  alertText: {
    margin: '40px 0px',
    textAlign: 'center',
    wordWrap: 'break-word'
  }
};

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = { private_key: "", public_key: "" };
  }

  generateKeys = () => {
    const wallet = Wallet.generate();
    let private_key = wallet.getPrivateKeyString();
    let public_key = wallet.getPublicKeyString();
    this.setState({ private_key: private_key, public_key: public_key });
  };

  registerUser = () => {
    this.props.onRegisterUser();
  };

  render() {
    const { userAddress, message, classes, users } = this.props;
    const { private_key } = this.state;

    // If the keys were already generated
    if (private_key) {

      if (userAddress) {
        return (
           <Success>
             <Typography variant='title' className={classes.alertText}>
               <p>Your account has been successfully registered with the <a target='_blank'
                                                                href={"https://ropsten.etherscan.io/address/" + users.address}>Linnia
                 User Contract</a> at address {userAddress}.</p>
               <a target='_blank' href={"https://ropsten.etherscan.io/address/" + userAddress}> Check out out your
                 transaction record on etherscan.
               </a>
             </Typography>
           </Success>
        );
      }

      if (message) {
        return (
          <Failure className={classes.alertText}>
            <Typography variant='title' className={classes.alertText}>
              {message}
              <a target='_blank' href={"https://ropsten.etherscan.io/address/"+userAddress}> Transaction record on etherscan.
              </a>

            </Typography>
          </Failure>
        );
      }

      return (
        <div>
          <RegisterUserKeys private_key={this.state.private_key} public_key={this.state.public_key} />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            style={{fontSize:'3rem'}}
            onClick={this.registerUser}
          >
            Register Linnia User
          </Button>
        </div>
      );

    } else {
      return (
        <div>
          <Typography variant="body1" className={classes.copy}>
            First, we need to generate a pair of encryption keys.
            You will use these keys to encrypt and decrypt files
            on behalf of your user. To understand more about
            Private and Public Encryption Keys please: <a href="https://github.com/ConsenSys/linnia-resources/">Go Here</a>
          </Typography>
          <Button
            type="button"
            color="secondary"
            variant="contained"
            className={classes.button}
            onClick={this.generateKeys}
          >
            Generate Linnia Encryption Keys
          </Button>
        </div>
      );
    }
  }
}

export default withStyles(styles)(RegisterUser);
