
export const environment = {
    production: false,
    auth0: {
        url: 'nicolasdev', // the auth0 domain prefix
        audience: 'udacitycapstoneecommerce', // the audience set for the auth0 app
        clientId: 'pKTGHsIqczKBuFkuknWc6LkVyfaOG0hm', // the client id generated for the auth0 app
        callbackURL: 'http://localhost:3000/callback', // the base url of the running ionic application. 
    }
};

export const AUTH_CONFIG = {
    domain: "nicolasdev.auth0.com",
    roleUrl: "https://nicolas.com/role",
    clientId: "pKTGHsIqczKBuFkuknWc6LkVyfaOG0hm",
    callbackUrl: "http://localhost:3000/callback"
};