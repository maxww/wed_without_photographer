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
          <li><Link className="nav-item" to="/upload"><p className="home"></p></Link></li>
          <li><Link className="nav-item" to="/pictures"><p className="view-all"></p></Link></li>
        </ul>
        {this.props.children}
        <div className="copyright-font copyright"><p className="copyright-icon"></p>2017 Christian and Taffy Photos Sharing App. All rights reserved. </div>
      </div>
    )
  }
}
