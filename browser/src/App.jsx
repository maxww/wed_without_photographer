import React from 'react';
import MainComponent from './components/MainComponent';
import { Link } from 'react-router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="app">
        <ul className="nav-items">
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to="/pictures">Pictures</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
