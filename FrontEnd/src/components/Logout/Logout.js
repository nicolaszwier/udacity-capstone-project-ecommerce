import React from "react";
import { AuthConsumer } from "../../contexts/authContext";

import { Button } from '@rmwc/button';
import '@rmwc/button/styles';

const Logout = () => (
    <AuthConsumer>
        {({ logout }) => (
            <Button className="mdc-theme--secondary" onClick={logout} label="Logout" />
        )}
    </AuthConsumer>
);

export default Logout;