import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Success from './../common/Success';
import Failure from './../common/Failure';
import jsonFile from '../dummy-data/Delicia Schowalter';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import classNames from 'classnames';

function TabContainer(props) {
  return (
     <Typography component="div" style={{ padding: 8 * 3 }}>
       {props.children}
     </Typography>
  );
}

function areDuplicatedKeys(metadata) {
  var testObject = {},
      duplicated = false;

  metadata.forEach((item) => {
    var key = item.key;  
    if (key in testObject) {
      duplicated = true;
    }
    else {
      testObject[key] = true;
    }
  });

  return duplicated;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const variantIcon = {
  error: ErrorIcon,
};

const messageStyles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    fontSize: 15,
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error']).isRequired,
};

const MySnackbarContentWrapper = withStyles(messageStyles)(MySnackbarContent);

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginTop: 20
  },
  removeButton: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  important: {
    fontWeight: 'bold',
    fontFamily: 'Heavitas'
  },
  copy: {
    margin: '30px 0px 20px'
  },
  textFieldWithMargin: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
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
    this.state = { file: jsonFile, 
      public_key: "", 
      metadata: [
        {'key':'domain','value':''},
        {'key':'keywords','value':''},
      ], 
      value: 0,
      showErrorMessage: false,
      errorMessage: '',
    };
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

  onMetadataKeyChange = index => event => {
    let metadata = this.state.metadata;
    metadata[index].key = event.target.value;
    this.setState({
      metadata: metadata
    });
  };

  onMetadataValueChange = index => event => {
    let metadata = this.state.metadata;
    metadata[index].value = event.target.value;
    this.setState({
      metadata: metadata
    });
  };

  onConfirmError = () => {
    this.setState({
      validationError: ''
    });
  }

  onAddMetadataKey = () => {
    const metadata = this.state.metadata.concat([{'key':'','value':''}])
    if(areDuplicatedKeys(metadata)){
      this.setState({
        errorMessage: 'Metadata cannot contain duplicated keys',
        showErrorMessage: true,
      });
    }
    else{
      this.setState({
        metadata
      });
    }
  }

  onRemoveMetadataKey = index => event => {
    let metadata = this.state.metadata;
    metadata.splice(index,1);
    this.setState({
      metadata
    });
  }

  handleCloseErrorMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ showErrorMessage: false });
  };

  uploadFile = event => {
    event.preventDefault();
    const file = this.state.file;
    const public_key = this.state.public_key;
    const metadata = this.state.metadata;

    if(areDuplicatedKeys(metadata)){
      this.setState({
        errorMessage: 'Metadata cannot contain duplicated keys',
        showErrorMessage: true,
      });
    }
    else{
      this.props.onUploadData(file, public_key, metadata);
    }
  };

  render() {
    const { done, classes, message } = this.props;
    const { validationError, value, metadata } = this.state;
    const isLocal = window.location.hostname === 'localhost';
    const dummyDataLink = `${isLocal ? '' : '/linnia-faucet'}/dummy-data/Delicia%20Schowalter.json`;
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
              <span className={classes.important}>Metadata</span> should be what people will use to find your data. 
              What will be useful for you to query later?
            </Typography>

            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.showErrorMessage}
              autoHideDuration={6000}
              onClose={this.handleCloseErrorMessage}
            >
              <MySnackbarContentWrapper
                onClose={this.handleCloseErrorMessage}
                variant="error"
                message={this.state.errorMessage}
              />
            </Snackbar>

            {metadata.map((m, i) => 
              <div key={'metadata-'+i.toString()}>
                  <TextField
                    key={'key-'+i.toString()}
                    id="metadata-input-key"
                    label="Key"
                    type="text"
                    className={classes.textFieldWithMargin}
                    value={m.key}
                    required={true}
                    onChange={this.onMetadataKeyChange(i)}
                  />
                  <TextField
                    key={'value'+i.toString()}
                    id="metadata-input-value"
                    label="Value"
                    type="text"
                    className={classes.textField}
                    value={m.value}
                    required={true}
                    onChange={this.onMetadataValueChange(i)}
                  />    
                <Button 
                  key={'remove-'+i.toString()}
                  variant="fab" 
                  mini color="secondary" 
                  aria-label="Delete"
                  className={classes.removeButton} 
                  onClick={this.onRemoveMetadataKey(i)}>
                  <DeleteIcon />
                </Button>   
              </div>
            )}

            <Button 
              className={classes.button}
              variant="contained" 
              color="secondary"
              onClick={this.onAddMetadataKey}
            >
              Add Key
            </Button>

            <Typography variant='body1' className={classes.copy}>
              <span className={classes.important}>Dummy data json file</span>

            </Typography>

            <div className={classes.root}>
                <Tabs value={value} onChange={this.handleChange}>
                  <Tab label="Recommended Use Linnia Dummy Data" />
                  <Tab label="Advanced" />
                </Tabs>
              {value === 0 && <TabContainer>
                <Typography variant='body1' className={classes.copy}>
                 Linnia recommended Dummy data json file will be used.
                 <br />
                 <a href={dummyDataLink} target="_blank" rel="noopener noreferrer">Click here to preview our dummy data json file</a>
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
