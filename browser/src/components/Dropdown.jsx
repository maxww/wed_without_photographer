import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

export default class Dropdown extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        this.renderMenu = this._renderMenu.bind(this);
        this.changeByOption = this._changeByOption.bind(this);
    }

    render(){
        return (
            <div className="dropdown">
                {this.renderMenu}
            </div>
        )
    }

    _renderMenu(){
        this.props.menu.map((item) => {
            console.log(item)
            return <p source={item.src} onClick={this.changeByOption}>{item.name}</p>
        })
    }

    _changeByOption(e){
        console.log(e)
    }
}

Dropdown.propTypes = {
    menu: PropTypes.array.isRequired,
}
