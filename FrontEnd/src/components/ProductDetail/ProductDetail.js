import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TopAppBar, TopAppBarRow, TopAppBarFixedAdjust, TopAppBarTitle, TopAppBarSection } from '@rmwc/top-app-bar';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';
import { Typography } from '@rmwc/typography';


import api from '../../services/api'
import ProductsGrid from "../ProductsGrid/ProductsGrid";

// styles
import '@rmwc/drawer/styles';
import '@rmwc/list/styles';
import '@rmwc/button/styles';
import '@rmwc/top-app-bar/styles';
import '@rmwc/typography/styles';
import './style.css';

class ProductDetail extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <>
                <div style={{ overflow: 'hidden', position: 'relative' }}>
                    <TopAppBar fixed className="mdc-theme--background" style={{ width: this.topAppBarWidth }}>
                        <TopAppBarRow>
                            <TopAppBarSection alignStart>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <IconButton className="mdc-theme--text-primary-on-background"
                                        icon="arrow_back"
                                    />
                                </Link>

                                <TopAppBarTitle className="mdc-theme--text-primary-on-background">
                                    Product
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

                </div>
            </>
        );
    }
}

export default ProductDetail;
