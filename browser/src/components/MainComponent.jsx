import React from 'react';
import {render} from 'react-dom';
import Upload from './Upload';

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="main-contianer">
        <div className="welcome-container">
          <p className="title-font title">Welcome</p>
          <p className="paragraph-font title">Thank you for sharing the pictures with us!</p>
        </div>
        <Upload/>
        <div className="copyright-font"><p className="copyright-icon"></p>2017 Christian and Taffy Photos Sharing App. All rights reserved. </div>
      </div>
    )
  }
}
