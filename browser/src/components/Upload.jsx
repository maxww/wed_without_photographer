import React, { Component, PropTypes }from 'react';
import {render} from 'react-dom';
import { storageRef } from '../../firebase';
import Button from './Button';
import Image from './Image';

export default class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = {
            status: "0",
            filesNum: 0,
			uploaded: [],
		}
		this.uploaded = [];
        this.uploadFile = this._uploadFile.bind(this);
        this.selectFiles = this._selectFiles.bind(this);
        this.updateFilesNum = this._updateFilesNum.bind(this);
		this.renderImages = this._renderImages.bind(this);
	}


	render() {
		return (
            <div>
                <p>Total Selected Files: {this.state.filesNum}</p>
                <input className="hidden" id="upload" type="file" multiple onChange={this.updateFilesNum}></input>
                <Button class="buttons" id="select-files" click={this.selectFiles} text="Select Files" />
                <Button class="buttons" type="submit" click={this.uploadFile} text="Upload Now" />
                <p>Upload Status: {this.state.status}  % done</p>
				<p>What You Uploaded:</p>
				<div className="preview">
					{this.renderImages()}
				</div>
            </div>
		)
	}
	_renderImages(){
		return this.state.uploaded.map((script, index)=>{
			console.log("map",script, index)
			return <Image class="thumb" src={script} key={index}/>

		})
	}

    _selectFiles(){
        const input = document.getElementById('upload');
        input.click()
    }

    _updateFilesNum(){
        const input = document.getElementById('upload');
        this.setState({filesNum: input.files.length})
    }

    _uploadFile(){
        const selectedFiles = document.getElementById('upload').files;
        const self = this;
		let metadata = {};

        for (let file in selectedFiles){
            const eachFile = selectedFiles[file];
			metadata.contentType = eachFile.type;
            const uploadTask = storageRef.child('images/' + eachFile.name).put(eachFile, metadata);

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                self.setState({status: progress})

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                    break;
                    case firebase.storage.TaskState.RUNNING:
                    break;
                }

            }, function(error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                    break;
                    case 'storage/canceled':
                    break;
                    case 'storage/unknown':
                    break;
                }
            }, function() {
  				// Upload completed successfully, now we can get the download URL
  				const downloadURL = uploadTask.snapshot.downloadURL;
				self.uploaded.push(downloadURL)
				self.setState({uploaded: self.uploaded})
			});
        }

    }
}
