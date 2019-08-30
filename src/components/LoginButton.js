import React, { Component } from 'react';

/*
Don't forget to include: <script src="https://apis.google.com/js/client.js"></script> right above </head>
in /public/index.html
*/

class LoginButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authorized: false,
            accessToken: '',
            scope: 'https://www.googleapis.com/auth/devstorage.read_write', //
            clientId: '399767558331-dk6kr8ga6sd0994hplf8bnt0pbnr4orf.apps.googleusercontent.com'
        };
    }

    authorize = () => {
        window.gapi.auth.authorize({
          client_id: this.state.clientId,
          scope: this.state.scope,
          immediate: false
        })
        .then(authResult => this.setState({accessToken: authResult.access_token}))
        .then(() => this.setState({authorized:true}))
        .then(() => this.props.postProcess())
    }

    loadButton = async () => {
        window.gapi.load('auth', this.authorize)
    }

    getAccessToken = () => {
        return this.state.accessToken
    }

    render = () => {
        return (
            <div>
                <button className="uk-button uk-button-default" onClick={this.loadButton}>
                    Login
                </button>
            </div>
        )
    }

}

export { LoginButton }