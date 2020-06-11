import React from "react";
import { AuthConsumer } from "../../contexts/authContext";

import { Button } from '@rmwc/button';
import { Avatar } from '@rmwc/avatar';
import { DrawerTitle, DrawerSubtitle } from '@rmwc/drawer';

import '@rmwc/button/styles';
import '@rmwc/avatar/styles';
import '@rmwc/drawer/styles';


const DrawerUserView = () => (
    <AuthConsumer>
        {(user) => (
            <>
                <Avatar
                    src={user.picture}
                    style={{ marginTop: '15px', marginRight: '8px' }}
                    size="xlarge"
                    name={user.givenName}
                    interactive
                />
                {console.log('user', user)}
                <div>
                    <DrawerTitle>Hello, {user.givenName} </DrawerTitle>
                    <DrawerSubtitle>Enjoy this app! <span>😃</span></DrawerSubtitle>
                </div>
            </>
        )}
    </AuthConsumer>
);

export default DrawerUserView;