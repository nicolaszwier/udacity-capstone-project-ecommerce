import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TopAppBar, TopAppBarRow, TopAppBarFixedAdjust, TopAppBarTitle, TopAppBarSection } from '@rmwc/top-app-bar';
import { IconButton } from '@rmwc/icon-button';
import { Typography } from '@rmwc/typography';
import { Snackbar } from '@rmwc/snackbar';
import { List, ListGroup, ListItem, ListItemGraphic, ListItemPrimaryText, ListItemSecondaryText, ListItemText } from "@rmwc/list";
import { Avatar } from '@rmwc/avatar';
import { SimpleDialog } from '@rmwc/dialog';


import api from '../../services/api'

// styles
import '@rmwc/list/styles';
import '@rmwc/dialog/styles';
import '@rmwc/avatar/styles';
import '@rmwc/top-app-bar/styles';
import '@rmwc/typography/styles';
import '@rmwc/snackbar/styles';
import '@rmwc/list/styles';
import './style.css';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            snackbar: {
                open: false,
                message: ''
            },
            dialogOpened: false,
            products: [],
            totals_products: 0,
            totals: {
                final_price: 0
            },
            customerId: 0,
            selectedProduct: 0
        };
    }


    componentWillMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({
            customerId: user.id
        })
    }
    componentDidMount() {

        this.getCart(this.state.customerId);

    }



    getCart = (customer_id) => {

        api.get(`/cart/${customer_id}`)
            .then(r => {
                console.log(r.data);

                this.setState({
                    products: r.data.products,
                    totals_products: r.data.total_products,
                    totals: r.data.totals[0]
                })
                console.log('this.state', this.state);

            }).catch(e => {
                console.log(e);
            })

    }

    handleDialog = (product_id) => {

        this.setState({
            dialogOpened: !this.state.dialogOpened,
            selectedProduct: product_id
        })

    }

    handleSnackbar = (message) => {

        this.setState({
            snackbar: {
                open: !this.state.snackbar.open,
                message: message
            }
        })

    }
    removeFromCart = (action) => {

        if (action === 'accept') {
            api.delete(`/remove-from-cart/${this.state.selectedProduct}`)
                .then(r => {

                    this.getCart(this.state.customerId);
                    this.handleSnackbar('Product successfully deleted!');

                }).catch(e => {
                    console.log(e);
                })
        }

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
                                    Back to home
                                </TopAppBarTitle>
                            </TopAppBarSection>
                            <TopAppBarSection >
                            </TopAppBarSection>
                            <TopAppBarSection alignEnd>
                                <IconButton className="mdc-theme--secondary"
                                    icon="shopping_cart" label="Rate this!" />
                            </TopAppBarSection>
                        </TopAppBarRow>
                    </TopAppBar>
                    <TopAppBarFixedAdjust />

                    <div style={{ height: '100%', padding: '20px' }}>
                        <div style={{ margin: '5px 0', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} />

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography style={{ margin: '10px 0' }} use="headline5" theme="textPrimaryOnLight">Products in your cart</Typography>
                        </div>

                        <List twoLine avatarList>
                            <ListGroup>


                                {this.state.products.map((el) => (
                                    <ListItem key={el.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                                            <ListItemGraphic
                                                icon={
                                                    <Avatar
                                                        src={el.image_link}
                                                        size="medium"
                                                        name={el.product_name}
                                                    />
                                                }
                                            />
                                            <ListItemText>
                                                <ListItemPrimaryText>{el.product_name}</ListItemPrimaryText>
                                                <ListItemSecondaryText>{el.short_description}</ListItemSecondaryText>
                                            </ListItemText>
                                        </div>
                                        {/* <ListItemMeta> */}
                                        <IconButton theme="textIconOnLight" onClick={() => { this.handleDialog(el.id) }}
                                            icon="delete" label="Rate this!" />
                                        <Typography use="headline6" theme="secondary">
                                            {new Intl.NumberFormat('en-US',
                                                { style: 'currency', currency: 'USD' }
                                            ).format(el.product_price)}
                                        </Typography>
                                        {/* </ListItemMeta> */}
                                    </ListItem>


                                ))}

                            </ListGroup>
                        </List>
                        <div style={{ margin: '5px 0', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} />

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Typography style={{ margin: '10px 10px' }} use="headline6" theme="textPrimaryOnLight">Total:</Typography>
                            <Typography
                                use="headline4"
                                // tag="h2"
                                theme="primary"
                                style={{ fontWeight: '500' }}
                            >
                                {new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(this.state.totals.final_price)}

                                {console.log('aa', this.state.totals)}
                            </Typography>
                        </div>
                    </div>

                </div>

                <Snackbar
                    open={this.state.snackbar.open}
                    onClose={evt => {
                        this.setState({
                            snackbar: {
                                open: false
                            }
                        })
                    }}
                    message={this.state.snackbar.message}
                    dismissesOnAction

                />

                <SimpleDialog
                    title="Are you sure you want to remove this product from the cart?"
                    body="This action can't be undone"
                    open={this.state.dialogOpened}
                    onClose={evt => {
                        this.removeFromCart(evt.detail.action);
                        this.setState({
                            dialogOpened: false
                        })
                    }}
                />
            </>
        );
    }
}

export default Cart;
