import React from 'react';
import {render} from 'react-dom';
import Upload from './Upload';

export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {
		return (
			<div className="">
				<p className="title-font">Welcome</p>
				<Upload/>
			</div>
		)
	}
}
