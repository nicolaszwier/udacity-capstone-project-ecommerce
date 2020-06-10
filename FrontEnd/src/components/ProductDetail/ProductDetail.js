import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TopAppBar, TopAppBarRow, TopAppBarFixedAdjust, TopAppBarTitle, TopAppBarSection } from '@rmwc/top-app-bar';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';
import { Grid, GridCell } from '@rmwc/grid';
import { Typography } from '@rmwc/typography';
import { Card, CardPrimaryAction, CardMedia } from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { ChipSet, Chip } from '@rmwc/chip';
import { Snackbar } from '@rmwc/snackbar';


import api from '../../services/api'

// styles
import '@rmwc/card/styles';
import '@rmwc/textfield/styles';
import '@rmwc/list/styles';
import '@rmwc/button/styles';
import '@rmwc/top-app-bar/styles';
import '@rmwc/typography/styles';
import '@rmwc/grid/styles';
import '@rmwc/chip/styles';
import '@rmwc/snackbar/styles';
import './style.css';

class ProductDetail extends Component {
    constructor() {
        super();
        this.state = {
            snackbar: {
                open: false,
                message: ''
            },
            product: {
                tags: [],
                image_link: ''
            },
            productId: 0
        };
        this.newCart = {}
    }

    componentWillMount() {

        this.setState({
            productId: this.props.match.params.product_id,
        })
    }

    componentDidMount() {
        this.getProduct(this.props.match.params.product_id);
    }



    getProduct = (product_id) => {
        api.get(`/products/${product_id}`)
            .then(r => {
                console.log(r.data.product);
                this.setState({
                    product: r.data.product
                })



            }).catch(e => {
                console.log(e);
            })
    }



    addtoCart = () => {

        this.newCart = {
            product_id: this.state.product.id,
            customer_id: 1,
            amount: 1,
            product_price: this.state.product.price
        }

        api.post('/add-to-cart', this.newCart)
            .then(r => {

                this.setState({
                    snackbar: {
                        message: 'Product was successfully added to cart',
                        open: true
                    }
                })


            }).catch(e => {
                console.log(e);
            })
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
                                    {/* {this.state.product.name} */}
                                    Back to home
                                </TopAppBarTitle>
                            </TopAppBarSection>
                            <TopAppBarSection >
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
                        <Grid>
                            <GridCell span={4}>
                                <Card style={{}} className="product-card">
                                    <CardPrimaryAction>
                                        <CardMedia
                                            square
                                            style={{
                                                backgroundImage: `url(${this.state.product.image_link})`,
                                                backgroundSize: 'contain'
                                            }}
                                        />
                                    </CardPrimaryAction>

                                </Card>
                            </GridCell>
                            <GridCell span={8}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography use="headline4" style={{ fontWeight: '500' }}>{this.state.product.name}</Typography>
                                    <Typography use="subtitle1" theme="textSecondaryOnLight">{this.state.product.short_description}</Typography>
                                    <Typography use="subtitle2" theme="secondary">{this.state.product.category_name}</Typography>
                                    <div style={{ margin: '10px 0', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} />
                                    <Typography use="caption" theme="textSecondaryOnLight">Price</Typography>
                                    <Typography
                                        use="headline4"
                                        // tag="h2"
                                        theme="primary"
                                        style={{ fontWeight: '500' }}
                                    >
                                        {new Intl.NumberFormat('en-US',
                                            { style: 'currency', currency: 'USD' }
                                        ).format(this.state.product.price)}

                                    </Typography>

                                    <div style={{ display: 'flex', margin: '20px 0' }}>
                                        <TextField style={{ width: '100px' }} outlined label="Amount" value="1" />
                                        <Button onClick={() => { this.addtoCart() }} icon="add_shopping_cart" style={{ flexGrow: 1, marginLeft: '10px', height: '56px', maxWidth: '300px' }} label="Add to cart" unelevated />
                                    </div>

                                </div>
                            </GridCell>
                        </Grid>

                        <div style={{ margin: '5px 0', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} />

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography style={{ margin: '10px 0' }} use="headline5" theme="textPrimaryOnLight">Product description</Typography>
                            <Typography use="body1" theme="textSecondaryOnLight">{this.state.product.long_description}</Typography>
                        </div>

                        <ChipSet style={{ padding: '20px 0' }}>
                            {this.state.product.tags.map((el) => (
                                <Chip key={el} label={el} />
                            ))}
                        </ChipSet>
                    </div>

                </div>

                <Snackbar
                    open={this.state.snackbar.open}
                    onClose={() => this.setState({
                        snackbarOpened: false
                    })}
                    message={this.state.snackbar.message}
                    dismissesOnAction

                />
            </>
        );
    }
}

export default ProductDetail;
