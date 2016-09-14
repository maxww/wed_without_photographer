import React, { Component, PropTypes }from 'react';
import {render} from 'react-dom';
import { storageRef } from '../../firebase';
import Button from './Button';
import Image from './Image';

export default class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = {
            status: "",
            filesNum: 0,
			thumnails: [],
			message: "",
		}
		this.previews = [];
		this.toBeUploaded = [];
		this.uploaded = [];
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
				<p>{this.state.message}</p>
				<div className="preview">
					{this.renderImages()}
				</div>
				<Button class="buttons" id="select-files" click={this.selectFiles} text="Select Files" />
				<Button class="buttons" type="submit" click={this.uploadFile} text="Upload Now" />
				<p>{this.state.status}</p>
            </div>
		)
	}


	_renderImages(){
		console.log("rendering")
		return this.state.thumnails.map((file, index)=>{
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

		const self = this;

		function readAndPreview(file){
			const reader = new FileReader();
			reader.addEventListener("load", function(){
				let image = new Image();
				image.title = file.name;
				image.src = this.result;
				if (self.previews.indexOf(image) === -1){
					self.previews.push(image);
				}
				self.setState({
					thumnails: self.previews,
					filesNum: self.previews.length,
					message:"What You Selected:"
				})
			})
			reader.readAsDataURL(file);
		}

		if (files){
			for (let file in files){
				if (typeof files[file] === "object"){
					readAndPreview(files[file]);
					if (this.toBeUploaded.indexOf(files[file] === -1)){
						this.toBeUploaded.push(files[file]);
					}
				}
			}
		}
    }

    _uploadFile(){
		let metadata = {};
		this.setState({message:"What You Uploaded:"})
        this.toBeUploaded.forEach((file)=>{
			metadata.contentType = file.type;
            const uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) =>{
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({status: "Upload Status: " + progress + " % done"})

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                    break;
                    case firebase.storage.TaskState.RUNNING:
                    break;
                }

            }, (error)=> {
                switch (error.code) {
                    case 'storage/unauthorized':
                    break;
                    case 'storage/canceled':
                    break;
                    case 'storage/unknown':
                    break;
                }
            }, ()=> {
  				// Upload completed successfully, now we can get the download URL
  				const downloadURL = uploadTask.snapshot.downloadURL;
				let imageFile = {src: downloadURL};
				if (this.uploaded.indexOf(imageFile) === -1){
					this.uploaded.push(imageFile);
				}
				this.setState({thumnails: this.uploaded})
			});
		})
	}
}
