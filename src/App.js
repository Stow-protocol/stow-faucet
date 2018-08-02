import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import logo from './logo.svg';

//Styles
import './App.css';

// Layouts
import Header from './layouts/Header';
import Faucet from './layouts/faucet/Faucet';
import UploadData from './layouts/uploadData/UploadData';
import ShowAuthErrors from './layouts/ShowAuthErrors'

import ProtectedRoute from './ProtectedRoute';

const history = createHistory({
  basename: '',
});

class App extends Component {
  componentDidMount () {
    this.props.authenticate();
  }

  render() {
    const { isAuthenticated, authError } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Linnia Faucet</h1>
        </header>
        <Header history={history}/>
        <Router history={history}>
          <Switch>
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              path='/upload_data'
              authError={authError}
              component={UploadData}
            />
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              path='/'
              authError={authError}
              component={Faucet}
            />
            <Route
              exact
              path='*'
              render={() => <ShowAuthErrors authError={authError} history={history} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
