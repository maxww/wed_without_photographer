import React, { Component, PropTypes }from 'react';
import {render} from 'react-dom';

export default class Button extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <button className={this.props.class} onClick={this.props.click}>{this.props.text}</button>
        )
    }
}



Button.propTypes = {
    class: PropTypes.string,
    click : PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}
