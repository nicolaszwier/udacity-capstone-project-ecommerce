import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, DrawerHeader, DrawerContent, DrawerAppContent } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list';
import { TopAppBar, TopAppBarRow, TopAppBarFixedAdjust, TopAppBarTitle, TopAppBarSection } from '@rmwc/top-app-bar';
import { IconButton } from '@rmwc/icon-button';
import { Typography } from '@rmwc/typography';
import { Tooltip } from '@rmwc/tooltip';

import { AuthConsumer } from "../../contexts/authContext";
import api from '../../services/api'
import ProductsGrid from "../ProductsGrid/ProductsGrid";
import TopSellersProductsGrid from "../TopSellersProductsGrid/TopSellersProductsGrid";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import DrawerUserView from "../DrawerUserView/DrawerUserView";

// styles
import '@rmwc/drawer/styles';
import '@rmwc/list/styles';
import '@rmwc/top-app-bar/styles';
import '@rmwc/typography/styles';
import '@rmwc/avatar/styles';
import '@rmwc/tooltip/styles';
import './style.css';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: true,
            drawerModalOpen: false,
            categories: [],
            totalCategories: 0,
            user: {
                picture: ''
            },
            windowWidth: 0,
            windowHeight: 0
        };
        this.topAppBarWidth = 'calc(100% - 255px)';
        this.loadingCategories = true;
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions() {
        let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

        this.setState({ windowWidth, windowHeight });
    }

    componentDidMount() {
        this.getCategories();
        this.updateDimensions();
        this.handleTopAppBarSize();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }


    handleDrawer = () => {

        this.handleTopAppBarSize()

        this.setState({
            drawerOpen: !this.state.drawerOpen,
            drawerModalOpen: !this.state.drawerModalOpen,
        })

    }

    handleTopAppBarSize() {
        if (this.state.windowWidth > 660) {
            if (this.state.drawerOpen) {
                this.topAppBarWidth = '100%';
            } else {
                this.topAppBarWidth = 'calc(100% - 255px)';
            }
        } else {
            this.topAppBarWidth = '100%';
        }
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


                    {
                        this.state.windowWidth > 660 ? (
                            <Drawer dismissible open={this.state.drawerOpen} style={{ height: '100vh' }}>
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
                        ) : (
                                <Drawer modal open={this.state.drawerModalOpen} style={{ height: '100vh' }} onClose={evt => {
                                    this.setState({
                                        drawerModalOpen: false
                                    })
                                }}>
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

                            )
                    }

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
                                                            <Link to={{ pathname: `/cart` }} style={{ textDecoration: 'none' }}>
                                                                <IconButton className="mdc-theme--secondary"
                                                                    icon="shopping_cart" label="Rate this!" />
                                                            </Link>
                                                        </Tooltip>
                                                        <Logout />
                                                    </>


                                                ) : (
                                                        <Login />
                                                    )
                                            }
                                        </AuthConsumer>

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
                                <TopSellersProductsGrid />
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
