import React from "react";
import { AuthConsumer } from "../../contexts/authContext";

import { Button } from '@rmwc/button';

import '@rmwc/button/styles';

const Login = () => (
    <AuthConsumer>
        {({ initiateLogin }) => (
            <Button className="mdc-theme--secondary" onClick={initiateLogin} label="Login" />
        )}
    </AuthConsumer>
);

export default Login;