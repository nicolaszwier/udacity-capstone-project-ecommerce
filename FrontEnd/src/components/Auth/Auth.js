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

            console.log('authResult', authResult);
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
            role: data[AUTH_CONFIG.roleUrl]
        };
        this.setState({
            authenticated: true,
            accessToken: data.accessToken,
            user
        });

        localStorage.setItem("user", JSON.stringify(user))
        console.log('user', user);
        console.log('data', data);

    }

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