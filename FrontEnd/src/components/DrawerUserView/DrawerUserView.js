import React from "react";
import { AuthConsumer } from "../../contexts/authContext";

import { Avatar } from '@rmwc/avatar';
import { DrawerTitle, DrawerSubtitle } from '@rmwc/drawer';

import '@rmwc/avatar/styles';
import '@rmwc/drawer/styles';


var user = localStorage.getItem('user');
if (user) {
    user = JSON.parse(user);
} else {
    user = {
        id: 0,
        givenName: null,
        picture: null,
        email: null,
        role: null,
        nonce: null
    };
}

const DrawerUserView = () => (

    <AuthConsumer>
        {() => (

            <>
                <Avatar
                    src={user.picture}
                    style={{ marginTop: '15px', marginRight: '8px' }}
                    size="xlarge"
                    name={user.givenName}
                    interactive
                />
                <div>
                    <DrawerTitle>Hello, {user.givenName} </DrawerTitle>
                    <DrawerSubtitle>Enjoy this app! <span>😃</span></DrawerSubtitle>
                </div>
            </>
        )}
    </AuthConsumer>
);

export default DrawerUserView;