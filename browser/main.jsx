import React from 'react';
import {render} from 'react-dom';
import App from './src/App';
require('./stylesheets/main.scss');

render(
	<App/>, document.getElementById('app'))
