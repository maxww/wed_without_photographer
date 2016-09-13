import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

export default class Image extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className={this.props.class}>
                <img  className="thumb-image" src={this.props.src}></img>
            </div>
        )
    }
}

Image.propTypes = {
    class: PropTypes.string,
    src : PropTypes.string.isRequired
}
