import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardPrimaryAction, CardMedia } from '@rmwc/card';
import { Snackbar, SnackbarAction } from '@rmwc/snackbar';
import { Typography } from '@rmwc/typography';
import '@rmwc/card/styles';
import '@rmwc/typography/styles';
import '@rmwc/snackbar/styles';
import './style.css';

class ProductCard extends Component {
    constructor() {
        super();
        this.state = {
            snackbarOpened: false,
        };
    }


    render() {
        const { product } = this.props;
        return (
            <>
                <Link to={{ pathname: `/product/${product.id}` }} style={{ textDecoration: 'none' }}>
                    <Card style={{}} className="product-card">
                        <CardPrimaryAction>
                            <CardMedia
                                sixteenByNine
                                style={{
                                    backgroundImage: `url(${product.image_link})`,
                                    backgroundSize: 'contain'
                                }}
                            />
                            <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} />
                            <div style={{ padding: '0 1rem ' }} className="card-typography">
                                <Typography
                                    use="headline6"
                                    tag="h2"
                                    theme="primary"
                                    style={{ marginTop: '0.5rem' }}
                                >

                                    {new Intl.NumberFormat('en-US',
                                        { style: 'currency', currency: 'USD' }
                                    ).format(product.price)}

                                </Typography>
                                <Typography
                                    use="subtitle2"
                                    tag="p"
                                    theme="textSecondaryOnBackground"
                                    style={{ marginTop: '-1rem' }}
                                >
                                    {product.name}
                                </Typography>
                                {/* <Typography
                            use="body1"
                            tag="div"
                            theme="textSecondaryOnBackground"
                        >
                            Visit ten places on our planet
                        </Typography> */}
                            </div>
                        </CardPrimaryAction>
                        {/* <CardActions >
                        <CardActionIcons>

                            <CardActionIcon theme="secondary" icon="search" />
                            <CardActionIcon theme="secondary" icon="add_shopping_cart" />
                        </CardActionIcons>
                    </CardActions> */}
                    </Card>
                </Link>

                <Snackbar
                    open={this.state.snackbarOpened}
                    onClose={() => this.setState({ snackbarOpened: false })}
                    message="This is a new message"
                    dismissesOnAction
                    action={
                        <SnackbarAction
                            label="Dismiss"
                            onClick={() => console.log('Click Me')}
                        />
                    }
                />
            </>
        );
    }
}

export default ProductCard;
