import React, { Component } from "react";
import auth0 from "auth0-js";

import { AUTH_CONFIG } from "../../config";
import { AuthProvider } from "../../contexts/authContext";

const auth = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: "token id_token"
});

class Auth extends Component {
    state = {
        authenticated: false,
        user: {
            role: "visitor"
        },
        accessToken: ""
    };

    componentDidMount() {
        this.checkSession();
    }

    initiateLogin = () => {
        auth.authorize();
    };

    logout = () => {
        this.setState({
            authenticated: false,
            user: {
                role: "visitor"
            },
            accessToken: ""
        });

        localStorage.clear();
    };

    handleAuthentication = () => {
        auth.parseHash((error, authResult) => {
            if (error) {
                console.log(error);
                console.log(`Error ${error.error} occured`);
                return;
            }
            localStorage.setItem("token", authResult.idToken)
            this.setSession(authResult.idTokenPayload);
        });
    };

    setSession(data) {

        const user = {
            id: data.sub,
            givenName: data.given_name,
            picture: data.picture,
            email: data.email,
            role: data[AUTH_CONFIG.roleUrl],
            nonce: data.nonce
        };
        this.setState({
            authenticated: true,
            accessToken: data.accessToken,
            user
        });

        localStorage.setItem("user", JSON.stringify(user))
    }

    checkSession = () => {

        auth.validateToken(localStorage.getItem('token'), localStorage.getItem('nonce'), (err, authResult) => {
            if (err) {
                console.log('checksessionrsulterr', err);
                this.setState({
                    authenticated: false,
                });

                return;
            }

            const user = {
                id: authResult.sub,
                givenName: authResult.given_name,
                picture: authResult.picture,
                email: authResult.email,
                role: authResult[AUTH_CONFIG.roleUrl],
                nonce: authResult.nonce
            };

            localStorage.setItem("user", JSON.stringify(user))
            this.setState({
                authenticated: true,
            });
        })


    };

    render() {
        const authProviderValue = {
            ...this.state,
            initiateLogin: this.initiateLogin,
            handleAuthentication: this.handleAuthentication,
            logout: this.logout
        };
        return (
            <AuthProvider value={authProviderValue}>
                {this.props.children}
            </AuthProvider>
        );
    }
}

export default Auth;