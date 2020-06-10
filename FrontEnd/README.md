
# Ecommerce react frontend

## Table of Contents

###  Features

* Signup, signin using your email or Google account
* Explore products
* See product details
* Add products to cart
* Remove products from cart

### Installation

### Installing Dependencies

#### Installing Node and NPM

This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

#### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the `frontend` directory of this repository. After cloning, open your terminal and run:

```bash
npm install
```

### Running Your Frontend in Dev Mode

The frontend app was built using create-react-app. In order to run the app in development mode use ```npm start```. You can change the script in the ```package.json``` file. 

```bash
npm start
```


### Authentication

The authentication system used for this project is Auth0. `./src/services/auth.service.js` contains the logic to direct a user to the Auth0 login page, managing the JWT token upon successful callback, and handle setting and retrieving the token from the local store. This token is then consumed and passed as an Authorization header when making requests to the backend.

### Authorization

The Auth0 JWT includes claims for permissions based on the user's role within the Auth0 system. When you sign in the app, you receive only customers permissions, so you can't perform actions like create new products or delete them.

