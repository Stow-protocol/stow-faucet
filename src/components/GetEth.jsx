import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import Success from './../common/Success';
import Failure from './../common/Failure';


const styles = (theme) => ({
  copy: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 10
  },
  alertText: {
    color: theme.palette.black,
    width: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: 40
  }
});

const Explanation = ({ classes, getEth }) => (
  <div>
    <Typography variant="body1" className={classes.copy}>
      You will need test Ether to register onto Linnia and to upload some data.  
    </Typography>
    <Typography variant="body1" className={classes.copy}>
      If you don't have any, you can get one test Ether to your test account by clicking the button below.
    </Typography>
    <Typography variant="body1" className={classes.copy}> Alternatively you can visit <a href="https://faucet.ropsten.be/" target="Ropsten">this site
      </a> and manually enter your Ethereum Address. 
    </Typography>
    <div>
      <Button 
        variant="contained" 
        color="secondary"
        className={classes.button}
        onClick={getEth}
      >
        Click Here For One Eth
      </Button>
    </div>
  </div>
);

class GetEth extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      account: "", 
      success: null 
    };
  }

  componentWillMount() {
    this.props.web3.eth
      .getAccounts()
      .then(accounts => this.setState({ account: accounts[0] }));
  }

  getEth = () => {
    axios
      .get(
        `http://faucet.ropsten.be:3001/donate/${this.state.account}`
      )
      .then(rsp => {
        this.setState({
          success: true
        });
      })
      .catch(error => {
        this.setState({
          success: false
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { success } = this.state;
    return (
      <div>
        {success && <Success>
          <Typography variant='display1' className={classes.alertText}>
            Success! You should have on more Eth in your account shortly!
          </Typography> 
        </Success>}
        {success === false && <Failure>
          <Typography variant='display1' className={classes.alertText}>
            You are greylisted. Please wait at least 24 hours!
          </Typography>         
        </Failure>}
        {success === null && <Explanation 
          classes={classes}
          getEth={this.getEth}
        />}
      </div>
    );
  }
}

export default withStyles(styles)(GetEth);
