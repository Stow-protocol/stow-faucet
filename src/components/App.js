import React, { Component } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import Logo from 'linnia-brand/components/Logo';
import StepContainer from '../common/StepContainer';
import Loader from '../common/Loader';
import Done from '../common/Done';
import AuthError from '../common/AuthError';
import ButtonBar from '../common/ButtonBar';
import "../App.css";
import RegisterUser from "../containers/RegisterUserContainer";
import UploadData from "../containers/UploadDataContainer";
import CreateUsers from "../containers/CreateUsersContainer";
import Intro from "./Intro";
import GetEth from "../containers/GetEthContainer";

const styles = (theme) => ({
  app: {
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
    margin: 0,
    padding: 40
  },
  icon: {
    color: 'white'
  },
  stepLabel: {
    color: theme.palette.black
  },
  heroTitle: {
    color: theme.palette.black,
    marginTop: 20
  },
  stepper: {
    backgroundColor: theme.palette.primary.main
  },
  success: {
    marginTop: 40,
    textAlign: 'center'
  }
});

const logoStyle = {
  width: 150,
  height: 150,
  animation: 'App-logo-spin infinite 20s linear',
};

const steps = [{
    title: "Welcome To The Linnia Faucet",
    Component: <Intro />,
    authenticated: false
  }, {
    title: "Get Ethereum Address",
    Component: <CreateUsers />,
    authenticated: false
  }, {
    title: "Get Test Ether",
    Component: <GetEth />,
    authenticated: true
  }, {
    title: "Register A User",
    Component: <RegisterUser />,
    authenticated: true
  }, {
    title: "Upload A File",
    Component: <UploadData />,
    authenticated: true
  }
];

class App extends Component {
  componentDidMount() {
    this.props.authenticate();
  }

  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { activeStep } = this.state;
    const { classes, isAuthenticated, authError } = this.props;

    return (
      <div className={classes.app}>
        <Loader />
        <Logo 
          style={logoStyle}
          fill='#fff'
        />
        <Typography 
          className={classes.heroTitle}
          variant='display3'
        >
          Linnia Faucet
        </Typography>
        <Stepper
          className={classes.stepper}
          activeStep={activeStep} 
          orientation="vertical"
          color="secondary"
        >
          {steps.map((step, index) => {
            return (
              <Step key={step.title}>
                <StepLabel/>
                <StepContent>
                  {step.authenticated && !isAuthenticated ?
                    <AuthError error={authError || 'STILL_LOADING'} /> :
                    <StepContainer>
                    <Typography 
                      variant='display1'
                      className={classes.stepLabel}
                    >
                      {step.title}
                    </Typography>
                    {step.Component}
                    <ButtonBar
                      handleBack={this.handleBack}
                      handleNext={this.handleNext}
                      activeStep={activeStep}
                      steps={steps}
                    />
                  </StepContainer>}
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && <Done />}
      </div>
    );
  }
}

export default withStyles(styles)(App);
