import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const progressStyle = {
  color: 'black',
}

class Faucet extends Component {
  constructor(props) {
    super(props)
    this.state = { filepath: null }
  }

  changeFile = (event) => {
    const filepath = event.target.files[0].name
    this.setState({ filepath: filepath })
  }

  uploadFile = (event) => {
    event.preventDefault()
    this.props.onUploadData(this.state.filepath)
  }

  render () {
    return (
      <div>
        <h1>Upload Data</h1>
        <p>Choose a file from your computer and upload it to Linnia</p>
        <form onSubmit={this.uploadFile}>
          <input type="file" onChange={this.changeFile} />
          <button type='submit'>Upload</button>
        </form>

      </div>
    );
  }
}

export default Faucet;
