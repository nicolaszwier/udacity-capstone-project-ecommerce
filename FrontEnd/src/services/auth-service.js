import jwt_decode from 'jwt-decode';
import { WebAuth } from "auth0-js";
import { environment } from '../config';
import axios from 'axios';

const JWTS_LOCAL_KEY = 'JWTS_LOCAL_KEY';
const JWTS_ACTIVE_INDEX_KEY = 'JWTS_ACTIVE_INDEX_KEY';

const auth0 = new WebAuth({
    clientID: 'pKTGHsIqczKBuFkuknWc6LkVyfaOG0hm',
    domain: 'nicolasdev.auth0.com',
    responseType: 'token id_token',
    audience: 'udacitycapstoneecommerce',
    redirectUri: 'http://localhost:3000',
    scope: 'openid profile'
});

export class AuthService {
    url = environment.auth0.url;
    audience = environment.auth0.audience;
    clientId = environment.auth0.clientId;
    callbackURL = environment.auth0.callbackURL;

    token = null;
    payload = null;

    constructor() { }

    login() {
        auth0.authorize()
    }

    fetchUserInfoFromAuth0 = () => {

        const AuthStr = 'Bearer '.concat(localStorage.getItem(JWTS_LOCAL_KEY));
        return axios.get('https://nicolasdev.auth0.com/userinfo', { headers: { Authorization: AuthStr } })

    }

    user() {
        return this.userInfo;
    }

    // invoked in app.component on load
    check_token_fragment() {

        // parse the fragment
        const fragment = window.location.hash.substr(1).split('&')[0].split('=');
        // check if the fragment includes the access token
        if (fragment[0] === 'access_token') {
            // add the access token to the jwt
            this.token = fragment[1];
            // save jwts to localstore
            this.set_jwt();
        }
    }

    set_jwt() {
        localStorage.setItem(JWTS_LOCAL_KEY, this.token);
        if (this.token) {
            this.decodeJWT(this.token);
        }
    }

    load_jwts() {
        this.token = localStorage.getItem(JWTS_LOCAL_KEY) || null;
        if (this.token) {
            this.decodeJWT(this.token);
        }
    }

    activeJWT() {
        return this.token;
    }

    decodeJWT(token) {
        this.payload = jwt_decode(token);
        console.log(this.payload);

        return this.payload;
    }

    logout() {
        this.token = '';
        this.payload = null;
        this.set_jwt();
    }

    can(permission) {
        return this.payload && this.payload.permissions && this.payload.permissions.length && this.payload.permissions.indexOf(permission) >= 0;
    }
}
