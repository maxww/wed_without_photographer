import React from 'react';
import {render} from 'react-dom';
import Upload from './Upload';

export default class Pictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="main-contianer">
        <div className="welcome-container">
          <p className="title-font">Pictures</p>
          <p className="paragraph-font">Thank you for sharing the pictures with us!</p>
        </div>
        <Upload/>
      </div>
    )
  }
}
