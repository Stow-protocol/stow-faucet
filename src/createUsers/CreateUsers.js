import React, { Component } from 'react'

class CreateUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    const intro = () =>
      <div>
        <h1>Create Linnia Users</h1>
        <p className="App-intro">
          This Faucet is to create a Linnia User and get started developing using the Linnia Protocol
        </p>
      </div>

      return (
        <div>
          {intro()}
        </div>
      );
  }
}

export default CreateUsers;
