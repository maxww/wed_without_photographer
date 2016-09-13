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
			previews: [],
			message: "",
		}
		this.previews = [];
        this.uploadFile = this._uploadFile.bind(this);
        this.selectFiles = this._selectFiles.bind(this);
        this.previewFiles = this._previewFiles.bind(this);
		this.renderImages = this._renderImages.bind(this);
	}


	render() {
		return (
            <div>
                <p>Total Selected Files: {this.state.filesNum}</p>
                <input className="hidden" id="upload" type="file" multiple onChange={this.previewFiles}></input>
                <Button class="buttons" id="select-files" click={this.selectFiles} text="Select Files" />
                <Button class="buttons" type="submit" click={this.uploadFile} text="Upload Now" />
                <p>Upload Status: {this.state.status}  % done</p>
				<p>{this.state.message}</p>
				<div className="preview">
					{this.renderImages()}
				</div>
            </div>
		)
	}


	_renderImages(){
		console.log("rendering")
		return this.state.previews.map((file, index)=>{
			return (
				<div className="thumb-block" key={index}>
					<Image src={file.src} />
					<div className="mini-menu">...</div>
				</div>
			)
		})
	}

    _selectFiles(){
        const input = document.getElementById('upload');
        input.click();
    }

    _previewFiles(event){
		event.preventDefault();

        const files = event.target.files;
		this.setState({filesNum: files.length, message:"What You Selected:"});
		const self = this;

		function readAndPreview(file){
			const reader = new FileReader();
			reader.addEventListener("load", function(){
				let image = new Image();
				image.title = file.name;
				image.src = this.result;
				self.previews.push(image);
				self.setState({previews: self.previews})
			})
			reader.readAsDataURL(file);
		}

		if (files){
			for (let file in files){
				if (typeof files[file] === "object"){
					readAndPreview(files[file]);
				}
			}
		}
    }

    _uploadFile(){
        const selectedFiles = document.getElementById('upload').files;
        const self = this;
		let metadata = {};
		this.setState({message:"What You Uploaded:"})
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
				let imageFile = {src: downloadURL};
				if (!self.previews.indexOf(imageFile)) self.previews.push(imageFile);
				self.setState({previews: self.previews})
			});
        }

    }
}
