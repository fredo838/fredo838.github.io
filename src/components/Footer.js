import React, { Component } from 'react';


class Footer extends Component {
  render = () => {
    return (
      <footer className="uk-section uk-section-default uk-section-small">
        <div className="uk-container">
          <p className="uk-text-small uk-text-center">
            ML6 &copy; {new Date().getFullYear()}
          </p>
        </div>
       </footer>
    )
  }
}

export { Footer };