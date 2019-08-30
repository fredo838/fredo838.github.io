import React, { Component } from 'react';
import image from '../assets/ml6-logo.svg';

class Header extends Component {
  render = () => {
    return (
      <header>
        <div className="uk-container">
          <a className="uk-navbar-item uk-logo" href="/">
            <img width="140" src={image} alt="ML6-logo" uk-svg="true"/>
          </a>
        </div>
      </header>
    )
  }
}

export { Header }