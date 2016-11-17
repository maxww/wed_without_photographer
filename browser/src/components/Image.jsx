import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

export default class Image extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <img className={this.props.class} src={this.props.src}></img>
    )
  }
}

Image.propTypes = {
  class: PropTypes.string,
  src: PropTypes.string.isRequired
}
