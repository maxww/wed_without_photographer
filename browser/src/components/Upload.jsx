import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {storageRef, database} from '../../firebase';
import firebase from 'firebase';
import Button from './Button';
import Image from './Image';
import Dropdown from './Dropdown';
import Delete from './Delete';
// const imageMetadataRef = database.ref('imageMetadataRef')

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      method: '',
      filesNum: 0,
      thumbnails: [],
      message: "",
      instruction: 'Click on green button to add pictures.'
    }
    this.previews = [];
    this.toBeUploaded = [];
    this.uploaded = [];
    this.uploadFile = this._uploadFile.bind(this);
    this.selectFiles = this._selectFiles.bind(this);
    this.previewFiles = this._previewFiles.bind(this);
    this.renderImages = this._renderImages.bind(this);
    this.showUploadButton = this._showUploadButton.bind(this);
  }

  render() {
    return (
      <div className="upload-container">
        <p className="category-font">
          {this.state.instruction}
        </p>
        <p className="category-font">
          {this.state.method}
          {this.state.filesNum ? this.state.filesNum : ''}
        </p>
        <input className="hidden" id="upload" type="file" multiple onChange={this.previewFiles}></input>
        <p className="category-font">{this.state.message}</p>
        <div className="preview">
          {this.renderImages()}
        </div>
        <div className="bottom">
          <Button class="add-btn" id="select-files" click={this.selectFiles}/>
          {this.showUploadButton()}
          <p>{this.state.status}</p>
        </div>
      </div>
    )
  }

  _renderImages() {
    return this.state.thumbnails.map((file, index) => {
      this.deleteImg = this._deleteImg.bind(this, index);
      if (!this.toBeUploaded.length) {
        return (
          <div className="thumb-block-large" key={index}>
            <Image class="thumb-image-large" src={file.src}/>
          </div>
        )
      } else {
        return (
          <div className="thumb-block-large" key={index}>
            <Image class="thumb-image" src={file.src}/>
            <p className='delete-icon' onClick={this.deleteImg}></p>
          </div>
        )
      }
    })
  }

  _showUploadButton () {
    if (this.toBeUploaded.length) {
      return (
        <Button class="upload-btn" type="submit" click={this.uploadFile}/>
      )
    }
  }

  _selectFiles() {
    if (!this.toBeUploaded.length) {
      this.previews = [];
      this.setState({thumbnails: []});
    }
    const input = document.getElementById('upload');
    input.click();
  }

  _previewFiles(event) {
    event.preventDefault();

    const files = event.target.files;

    const self = this;

    this.setState({status: ''})

    function readAndPreview(file) {
      const reader = new FileReader();
      reader.addEventListener("load", function() {
        let image = new Image();
        image.title = file.name;
        image.src = this.result;
        console.log('preview', typeof image)
        if (self.previews.indexOf(image) === -1) {
          self.previews.push(image);
        }
        self.setState({method: 'Total Selected Pictures: ', thumbnails: self.previews, filesNum: self.previews.length, message: "What You've Selected:", instruction: ''})
      })
      reader.readAsDataURL(file);
    }

    if (files) {
      for (let file in files) {
        if (typeof files[file] === "object") {
          readAndPreview(files[file]);
          if (this.toBeUploaded.indexOf(files[file]) === -1 && this.uploaded.indexOf(files[file]) === -1) {
            this.toBeUploaded.push(files[file]);
          }
        }
      }
    }
  }

  _deleteImg(index) {
    event.preventDefault();

    this.toBeUploaded.splice(index, 1);
    this.previews.splice(index, 1);
    if (!this.toBeUploaded.length) {
      this.setState({thumbnails: this.previews, filesNum: this.previews.length, message: '', method: '', instruction: 'Click on green button to add pictures.'})
    } else {
      this.setState({thumbnails: this.previews, filesNum: this.previews.length});
    }
  }

  _uploadFile() {
    let metadata = {};
    this.setState({message: "What You've Uploaded:"})
    this.toBeUploaded.forEach((file, id) => {
      metadata.contentType = file.type;
      const uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({
          status: "Upload Status: " + progress + " % done"
        })

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            break;
          case firebase.storage.TaskState.RUNNING:
            break;
        }

      }, (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      }, () => {
        // Upload completed successfully, now we can get the download URL
        const downloadURL = uploadTask.snapshot.downloadURL;
        let imageFile = {
          src: downloadURL
        };
        database.ref('imageMetadataRef').push(imageFile);
        if (this.uploaded.indexOf(imageFile) === -1) {
          this.uploaded.push(imageFile);
        }
        this.setState({method: 'Total Uploaded Pictures: ', thumbnails: this.uploaded, filesNum: this.uploaded.length, instruction: 'Thank you for sharing!'})
      });
    })
    this.toBeUploaded = [];
  }
}
