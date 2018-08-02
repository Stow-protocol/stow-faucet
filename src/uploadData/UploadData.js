import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const progressStyle = {
  color: 'black',
}

class UploadData extends Component {
  constructor(props) {
    super(props)
    this.state = { file: null, public_key: '', metadata: '' }
  }

  changeFile = (event) => {
    const file = event.target.files[0]
    this.setState({ file: file })
  }

  onInputChange = (property) => (event) => {
    const value = event.target.value
    this.setState({ [property]: value })
  }

  uploadFile = (event) => {
    event.preventDefault()
    const file = this.state.file
    const public_key = this.state.public_key
    const metadata = this.state.metadata

    if (!file) {
      return alert('Please choose a file to upload.')
    }

    if (public_key.length < 2) {
      return alert('Please fill your public encryption key.')
    }

    if (metadata.length < 2) {
      return alert('Please fill the metadata.')
    }

    this.props.onUploadData(file, public_key, metadata)
  }

  render () {
    const { isLoading, done, message } = this.props

    const intro = () =>
    <div>
        <h1>Upload Data</h1>
        {message && !done && <h2 className='error'>{message}</h2>}
        {isLoading && <div>
              <div className='progress-background' />
              <CircularProgress className='progress' style={progressStyle} thickness={7} />
        </div>}
    </div>

    if(done){
      return (
        <div>
           {intro()}
           <h2 className='success'>The file was uploaded to Linnia!</h2>
        </div>
      );
    } else {
      return (
        <div>
           {intro()}
          <p>Choose a file from your computer and upload it to Linnia</p>
          <form onSubmit={this.uploadFile}>
            <label htmlFor='public_key'>Public Encryption Key </label>
            <input id='public_key' type='text' value={this.state.public_key} onChange={this.onInputChange('public_key')} />
            <br />
            <label htmlFor='metadata'>Metadata </label>
            <input id='metadata' type='text' value={this.state.metadata} onChange={this.onInputChange('metadata')} />
            <br />
            <input type="file" onChange={this.changeFile} />
            <br />
            <button type='submit'>Upload</button>
          </form>
  
        </div>
      );
    }
  }
}

export default UploadData;
