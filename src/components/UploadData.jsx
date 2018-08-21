import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Success from './../common/Success';
import Failure from './../common/Failure';

const styles = (theme) => ({
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
    this.state = { file: null, public_key: "", metadata: "" };
  }

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

    if (!file) {
      this.setState({
        validationError: "Please choose a file to upload."
      });
    }

    if (public_key.length < 2) {
      this.setState({
        validationError: "Please fill your public encryption key."
      });
    }

    if (metadata.length < 2) {
      return this.setState({
        validationError: 'Please include metadata.'
      });
    }

    this.props.onUploadData(file, public_key, metadata);
  };

  render() {
    const { done, classes, message } = this.props;
    const { validationError } = this.state;


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
            We'll choose a file from your computer, dress it up, and upload it.
          </Typography>
          <Typography variant='body1' className={classes.copy}>
            This should be the <span className={classes.important}>public key</span> you generated in the previous step.
            This key will encrypt our file so only our user can decrypt it!
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
              Make sure you choose a file that contains <span className={classes.important}>plain text</span>. Everything else will choke!
            </Typography>
            <input
              type="file"
              accept=".json,application/json"
              onChange={this.changeFile}
            />
            <br />
            <Button 
              className={classes.button}
              variant="contained" 
              color="secondary"
              type="submit"
            >
              Upload
            </Button>
          </form>
        </div>
      );
    }
  }
}

export default withStyles(styles)(UploadData);
