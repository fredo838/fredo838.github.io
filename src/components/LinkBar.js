import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LinkBar extends Component {
  // The LinkBar Componenent is used to navigate between pages.
  render = () => {
    return (
      <header>
        <div className="uk-container">
          <nav className="uk-navbar-transparent" data-uk-navbar>
            <div className="uk-navbar-center uk-visible@m">
              <ul className="uk-navbar-nav">
                <li><Link to="/TensorflowJsModel">Model</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    )
  }
}

export { LinkBar }