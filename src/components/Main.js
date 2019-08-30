import React, { Component } from 'react';
import { TensorflowJsModel } from './TensorflowJsModel';
import { BrowserRouter, Route } from 'react-router-dom'
import { LinkBar } from './LinkBar'

class Main extends Component {
    render = () => {
      return (
        <main className="uk-container-large uk-align-center">
        <BrowserRouter>
          <LinkBar/>
          <Route exact path="/" component={TensorflowJsModel}/>
          <Route exact path="/TensorflowJsModel" component={TensorflowJsModel}/>
        </BrowserRouter>
        </main>
      )
    }
}

export { Main }