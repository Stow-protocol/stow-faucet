import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Success from './../common/Success';
import Failure from './../common/Failure';
import jsonFile from '../dummy-data/Delicia Schowalter';

function TabContainer(props) {
  return (
     <Typography component="div" style={{ padding: 8 * 3 }}>
       {props.children}
     </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginTop: 20
  },
  important: {
    fontWeight: 'bold',
    fontFamily: 'Heavitas'
  },
  copy: {
    margin: '30px 0px 20px'
  },
  textField: {
    marginBottom: 10
  },
  buttonBar: {
    textAlign: 'center'
  },
  alertText: {
    margin: '20px 0',
    textAlign: 'center',
    color: theme.palette.black
  }
});

class UploadData extends Component {
  constructor(props) {
    super(props);
    this.state = { file: jsonFile, public_key: "", metadata: "", value: 0, };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  changeFile = event => {
    const file = event.target.files[0];
    this.setState({ file: file });
  };

  onInputChange = property => event => {
    const value = event.target.value;
    this.setState({ [property]: value });
  };

  onConfirmError = () => {
    this.setState({
      validationError: ''
    });
  }

  uploadFile = event => {
    event.preventDefault();
    const file = this.state.file;
    const public_key = this.state.public_key;
    const metadata = this.state.metadata;

    this.props.onUploadData(file, public_key, metadata);
  };

  render() {
    const { done, classes, message } = this.props;
    const { validationError, value } = this.state;


    if (done) {
      return (
        <div>
          <Success>
            <Typography variant="display1" className={classes.alertText}>
              The file was uploaded to Linnia!
            </Typography>
          </Success>
        </div>
      );
    } else if (message || validationError) {
      return (
        <Failure>
          <Typography variant="display1" className={classes.alertText}>
            {message || validationError}
          </Typography>
          {validationError && <div className={classes.buttonBar}>
            <Button 
              className={classes.button}
              variant="contained" 
              color="secondary"
              onClick={this.onConfirmError}
            >
              Ok!
            </Button>
          </div>}
        </Failure>
      );
    } else {
      return (
        <div>
          <Typography variant="body1" className={classes.copy}>
            Now its time to upload your first record to the Linnia Protocol!
            We'll use some dummy medical data that we have created, dress it up, and upload it.
          </Typography>
          <Typography variant='body1' className={classes.copy}>
            This should be the <span className={classes.important}>public key</span> you generated in the previous step.
            This key will encrypt our file so only our private encryption key can decrypt it!
          </Typography>
          <form onSubmit={this.uploadFile}>
            <TextField
              id="public_key"
              label="Public Key"
              type="text"
              fullWidth
              className={classes.textField}
              value={this.state.public_key}
              required={true}
              onChange={this.onInputChange("public_key")}
            />
            <Typography variant='body1' className={classes.copy}>
              <span className={classes.important}>Metadata</span> should be text that people will use to find your data. 
              What will be useful for you to query later?
            </Typography>
            <TextField
              id="metadata"
              label="MetaData"
              type="text"
              fullWidth
              className={classes.textField}
              value={this.state.metadata}
              required={true}
              onChange={this.onInputChange("metadata")}
            />
            <Typography variant='body1' className={classes.copy}>
              <div className={classes.important}>Dummy data json file</div>

            </Typography>

            <div className={classes.root}>
                <Tabs value={value} onChange={this.handleChange}>
                  <Tab label="Recommended Use Linnia Dummy Data" />
                  <Tab label="Advanced" />
                </Tabs>
              {value === 0 && <TabContainer>
                <Typography variant='body1' className={classes.copy}>
                 <div>Linnia recommended Dummy data json file will be used</div>

                 <a href="../dummy-data/Delicia%20Schowalter.json" target="_blank">Click here to preview our dummy data json file</a>
                </Typography></TabContainer>}

              {value === 1 && <TabContainer>{/*TODO: this is currently not working.  Data ends up with extra \\\*/}
                <Typography variant='body1' className={classes.copy}>
                Make sure you choose a file that contains <span className={classes.important}>JSON</span>. Everything else will choke!
                </Typography>
                <input
                type="file"
                accept=".json,application/json"
                onChange={this.changeFile}
                />
              </TabContainer>}
            </div>
            <br />
            <Button 
              className={classes.button}
              variant="contained" 
              color="secondary"
              type="submit"
            >
              Upload to IPFS and Append to Linnia Protocol
            </Button>
          </form>
        </div>
      );
    }
  }
}

export default withStyles(styles)(UploadData);
