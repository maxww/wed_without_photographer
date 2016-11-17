import React from 'react';
import {render} from 'react-dom';
import {database} from '../../firebase';
import firebase from 'firebase';
import Image from './Image';
import * as _ from 'lodash';

export default class Pictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allImagesMetadata: {}
    }
    this.renderImages = this._renderImages.bind(this);
    this.downloadFile = this._downloadFile.bind(this);
  }
  render() {
    return (
      <div className="main-contianer">
        <div className="welcome-container">
          <p className="title-font">Christian & Taffy</p>
          <p className="paragraph-font">See all the pictures people uploaded!</p>
          <div className="preview">
            {this.renderImages()}
          </div>
        </div>

      </div>
    )
  }

  componentDidMount() {
    this.downloadFile();
  }

  _renderImages () {
    return _.values(this.state.allImagesMetadata).map( (file, index) => {
      return (
        <div className="thumb-block-large" key={index}>
          <Image class="thumb-image-large" src={file.src}/>
        </div>
      )
    });
  }

  _downloadFile () {
    database.ref('imageMetadataRef').once('value').then(function(snapshot) {
      return snapshot.val();
    }).then((allImagesMetadata) => {
      this.setState({allImagesMetadata: allImagesMetadata});
    });
  }

}
