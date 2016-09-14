import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

export default class Dropdown extends Component {
    constructor(props){
        super(props)
        this.state = {
            showDropdown: false,
        }
        this.toggleDropdown = this._toggleDropdown.bind(this);
        this.renderMenu = this._renderMenu.bind(this);

        this.changeByOption = this._changeByOption.bind(this);

    }

    render(){
        return (
            <div className="mini-menu" onClick={this.edit}>
                <p onClick={this.toggleDropdown}>...</p>
                <div>{this.renderMenu}</div>
            </div>

        )
    }

    _toggleDropdown(){
        console.log("changing state", this.state.showDropdown, this.setState)
        this.setState({showDropdown: true})
        this.renderMenu();
    }

    _renderMenu(){
        console.log(this.state.showDropdown)
        if (this.state.showDropdown){
            return this.props.menu.map((item) => {
                console.log("render menu",item)
                return(
                    <p source={item.src} onClick={this.changeByOption}>{item.name}</p>
                )
            })
        }
    }

    _changeByOption(e){
        console.log(e)
    }
}

Dropdown.propTypes = {
    menu: PropTypes.array.isRequired,
}
