import React, { Component } from 'react';
import { Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent, DrawerAppContent } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list';
import { Avatar } from '@rmwc/avatar';
import { TopAppBar, TopAppBarRow, TopAppBarFixedAdjust, TopAppBarTitle, TopAppBarSection } from '@rmwc/top-app-bar';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';
import { Typography } from '@rmwc/typography';
import Skeleton from 'react-loading-skeleton';


import api from '../../services/api'
import ProductsGrid from "../ProductsGrid/ProductsGrid";

// styles
import '@rmwc/drawer/styles';
import '@rmwc/list/styles';
import '@rmwc/button/styles';
import '@rmwc/top-app-bar/styles';
import '@rmwc/typography/styles';
import '@rmwc/avatar/styles';
import './style.css';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            open: true,
            categories: [],
            totalCategories: 0,
        };
        this.topAppBarWidth = 'calc(100% - 255px)';
        this.loadingCategories = true;
    }


    componentDidMount() {
        this.getCategories();
        console.log(this.context);

    }

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
                            <Avatar
                                // src="images/avatars/ironman.png"
                                style={{ marginTop: '15px', marginRight: '5px' }}
                                size="xlarge"
                                name="Tony Stark"
                                interactive
                            />
                            <div>
                                <DrawerTitle>Hello, Nicolas</DrawerTitle>
                                <DrawerSubtitle>nicolas@email.com</DrawerSubtitle>
                            </div>
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
                                        <Button className="mdc-theme--secondary" label="My orders" />
                                        <IconButton className="mdc-theme--secondary"
                                            icon="shopping_cart" label="Rate this!" />
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
