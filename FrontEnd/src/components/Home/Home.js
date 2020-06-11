import React, { Component } from 'react';
import { Drawer, DrawerHeader, DrawerContent, DrawerAppContent } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list';
import { TopAppBar, TopAppBarRow, TopAppBarFixedAdjust, TopAppBarTitle, TopAppBarSection } from '@rmwc/top-app-bar';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';
import { Typography } from '@rmwc/typography';
import { Tooltip } from '@rmwc/tooltip';

import { AuthConsumer } from "../../contexts/authContext";
import api from '../../services/api'
import ProductsGrid from "../ProductsGrid/ProductsGrid";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import DrawerUserView from "../DrawerUserView/DrawerUserView";

// styles
import '@rmwc/drawer/styles';
import '@rmwc/list/styles';
import '@rmwc/button/styles';
import '@rmwc/top-app-bar/styles';
import '@rmwc/typography/styles';
import '@rmwc/avatar/styles';
import '@rmwc/tooltip/styles';
import './style.css';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            open: true,
            categories: [],
            totalCategories: 0,
            user: {
                picture: ''
            },
            isLoggedIn: false
        };
        this.topAppBarWidth = 'calc(100% - 255px)';
        this.loadingCategories = true;
    }

    componentDidMount() {
        this.getCategories();
    }

    // checkIfIsLoggedIn = () => {
    //     this.authService.load_jwts()
    //     this.setState({
    //         isLoggedIn: this.authService.activeJWT() ? true : false
    //     })
    // }

    // doLogin = () => {
    //     this.authService.login();
    // }

    // doLogout = () => {
    //     this.authService.logout();
    //     this.setState({
    //         isLoggedIn: false
    //     })
    // }

    // handleUserInfo = async () => {

    //     await this.authService.fetchUserInfoFromAuth0()
    //         .then(r => {
    //             console.log('response.data', r.data);
    //             this.setState({
    //                 user: r.data
    //             })
    //         })
    //         .catch((error) => {
    //             console.log('error ' + error);
    //         });;


    // }


    handleDrawer = () => {

        if (this.state.open) {
            this.topAppBarWidth = '100%';
        } else {
            this.topAppBarWidth = 'calc(100% - 255px)';
        }

        this.setState({
            open: !this.state.open,
        })


    }

    getCategories = () => {

        api.get('/categories')
            .then(r => {
                this.setState({
                    categories: r.data.categories,
                    totalCategories: r.data.total_categories,
                })
                this.loadingCategories = false;

            }).catch(e => {
                console.log(e);

            })
    }


    render() {
        return (
            <>
                <div style={{ overflow: 'hidden', position: 'relative' }}>

                    <Drawer dismissible open={this.state.open} style={{ height: '100vh' }}>
                        <DrawerHeader className="drawer-header">

                            <AuthConsumer>
                                {({ authenticated }) =>
                                    authenticated ? (<DrawerUserView />) : (<Login />)
                                }
                            </AuthConsumer>

                        </DrawerHeader>
                        <DrawerContent>
                            <List>

                                <ListItem>All categories</ListItem>

                                {this.state.categories.map((el) => (
                                    <ListItem key={el.id}>{el.name}</ListItem>
                                ))}
                            </List>
                        </DrawerContent>
                    </Drawer>


                    <DrawerAppContent style={{ minHeight: '15rem', padding: '0rem', }}>
                        <>
                            <TopAppBar fixed className="mdc-theme--background" style={{ width: this.topAppBarWidth }}>
                                <TopAppBarRow>
                                    <TopAppBarSection alignStart>
                                        <IconButton className="mdc-theme--text-primary-on-background"
                                            icon="menu"
                                            onClick={() => { this.handleDrawer() }}
                                        />

                                        <TopAppBarTitle className="mdc-theme--text-primary-on-background">
                                            E-commerce
                                        </TopAppBarTitle>
                                    </TopAppBarSection>
                                    <TopAppBarSection >
                                        {/* <SearchBar></SearchBar> */}
                                    </TopAppBarSection>
                                    <TopAppBarSection alignEnd>

                                        <AuthConsumer>
                                            {({ authenticated }) =>
                                                authenticated ? (

                                                    <>
                                                        <Tooltip content="Go to cart">
                                                            <IconButton className="mdc-theme--secondary"
                                                                icon="shopping_cart" label="Rate this!" />
                                                        </Tooltip>
                                                        <Logout />
                                                    </>


                                                ) : (
                                                        <Login />
                                                    )
                                            }
                                        </AuthConsumer>


                                        {/* {this.state.isLoggedIn
                                            ? <>
                                                <Button className="mdc-theme--secondary" label="My orders" />
                                                <Tooltip content="Go to cart">
                                                    <IconButton className="mdc-theme--secondary"
                                                        icon="shopping_cart" label="Rate this!" />
                                                </Tooltip>
                                                <Tooltip content="Logout">
                                                    <IconButton className="mdc-theme--secondary" onClick={() => this.doLogout()}
                                                        icon="exit_to_app" label="Rate this!" />
                                                </Tooltip>
                                            </>
                                            : <Login />
                                        } */}

                                    </TopAppBarSection>
                                </TopAppBarRow>
                            </TopAppBar>
                            <TopAppBarFixedAdjust />

                            <div style={{ height: '100%', padding: '20px' }}>
                                <Typography
                                    use="headline6"
                                    tag="p"
                                    theme="secondary"
                                    style={{ marginTop: '-1rem', marginBottom: '0.3rem' }}
                                >
                                    Top sellers
                                </Typography>
                                <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}></div>
                                <ProductsGrid />
                                <Typography
                                    use="headline6"
                                    tag="p"
                                    theme="secondary"
                                    style={{ marginTop: '-0rem', marginBottom: '0.3rem' }}
                                >
                                    All categories
                                </Typography>
                                <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}></div>
                                <ProductsGrid />
                            </div>
                        </>


                    </DrawerAppContent>
                </div>
            </>
        );
    }
}

export default Home;
