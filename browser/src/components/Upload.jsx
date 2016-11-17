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
      message: ""
    }
    this.previews = [];
    this.toBeUploaded = [];
    this.uploaded = [];
    this.uploadFile = this._uploadFile.bind(this);
    this.selectFiles = this._selectFiles.bind(this);
    this.previewFiles = this._previewFiles.bind(this);
    this.renderImages = this._renderImages.bind(this);
    this.edit = this._edit.bind(this);
  }

  render() {
    return (
      <div className="upload-container">
        <p className="category-font">
          Total {this.state.method}
          Files: {this.state.filesNum}
        </p>
        <input className="hidden" id="upload" type="file" multiple onChange={this.previewFiles}></input>
        <p className="category-font">{this.state.message}</p>
        <div className="preview">
          {this.renderImages()}
        </div>
        <Button class="buttons" id="select-files" click={this.selectFiles} text="Select Files"/>
        <Button class="buttons" type="submit" click={this.uploadFile} text="Upload Now"/>
        <p>{this.state.status}</p>
      </div>
    )
  }

  _renderImages() {
    return this.state.thumbnails.map((file, index) => {
      this.deleteImg = this._deleteImg.bind(this, index);
      if (!this.toBeUploaded.length) {
        return (
          <div className="thumb-block" key={index}>
            <Image src={file.src}/>
          </div>
        )
      } else {
        return (
          <div className="thumb-block" key={index}>
            <Image src={file.src}/>
            <div>
              <i className='delete-icon' onClick={this.deleteImg}></i>
            </div>
          </div>
        )
      }
    })
  }

  _selectFiles() {
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
        if (self.previews.indexOf(image) === -1) {
          self.previews.push(image);
        }
        self.setState({method: 'Selected ', thumbnails: self.previews, filesNum: self.previews.length, message: "What You Selected:"})
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

    this.setState({thumbnails: this.previews, filesNum: this.previews.length});
  }

  _uploadFile() {
    let metadata = {};
    this.setState({message: "What You Uploaded:"})
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
        this.setState({method: 'Uploaded ', thumbnails: this.uploaded, filesNum: this.uploaded.length})
      });
    })
    this.toBeUploaded = [];
  }

  _edit() {}

}
