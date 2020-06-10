import React, { Component } from 'react';
import api from '../../services/api'
import ProductCard from "../ProductCard/ProductCard";
import './style.css';

class ProductsGrid extends Component {
    constructor() {
        super();
        this.state = {
            open: true,
            products: [],
            totalProducts: 0,
        };
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {

        api.get('/products')
            .then(r => {
                this.setState({
                    products: r.data.products,
                    totalProducts: r.data.total_products,
                })

            }).catch(e => {
                console.log(e);

            })
    }

    render() {
        return (
            <div className="grid-products">
                {this.state.products.map((el) => (
                    <ProductCard key={el.id} product={el} />
                ))}
            </div>
        );
    }
}

export default ProductsGrid;
