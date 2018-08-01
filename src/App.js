import React, { Component } from 'react';
import logo from './logo.svg';

//Styles
import './App.css';

// Layouts
import Home from './layouts/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Linnia Faucet</h1>
        </header>
        <Home/>
      </div>
    );
  }
}

export default App;
