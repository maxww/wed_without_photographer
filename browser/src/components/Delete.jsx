import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

export default class Delete extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.deleteImg = this._deleteImg.bind(this);
  }

  render() {
    return (
      <div>
        <i className='delete-icon' onClick={this.deleteImg}></i>
      </div>
    )
  }

  _deleteImg() {
    console.log("changing state")
  }
}

Delete.propTypes = {
  menu: PropTypes.array.isRequired
}
