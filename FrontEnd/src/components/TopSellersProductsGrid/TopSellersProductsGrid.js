import React, { Component } from 'react';
import api from '../../services/api'
import ProductCard from "../ProductCard/ProductCard";
import './style.css';

class TopSellersProductsGrid extends Component {
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
        this.setState({
            products: [{
                "active": "Y",
                "category_id": 3,
                "category_name": "Games",
                "id": 4,
                "image_link": "https://images-na.ssl-images-amazon.com/images/I/71p8G%2BYeA6L._SL1500_.jpg",
                "long_description": "A Complex & Emotional Story-Experience the escalating moral conflicts created by Ellie's relentless pursuit of vengeance. The cycle of violence left in her wake will challenge your notions of right versus wrong, good versus evil, and hero versus villain. A Beautiful Yet Dangerous World - Set out on Ellie's journey, taking her from the peaceful mountains and forests of Jackson to the lush, overgrown ruins of greater Seattle. Encounter new survivor groups, and terrifying evolutions of the infected.",
                "name": "The Last of Us Part II - PlayStation 4",
                "price": 59.99,
                "reference": "123123",
                "short_description": "A Complex & Emotional Story-Experience the escalating moral conflicts created by Ellie's relentless pursuit of vengeance",
                "tags": [
                    "games",
                    "ps4",
                    "playstation"
                ]
            },
            {
                "active": "Y",
                "category_id": 5,
                "category_name": "Smartphones",
                "id": 1,
                "image_link": "https://i.ebayimg.com/thumbs/images/g/A4IAAOSwhEtd8oeq/s-l225.webp",
                "long_description": "The iPhone 11 comes with an amazing dual-camera system with an Ultra Wide camera that's perfect when you're taking photos of landscapes, groups, large interiors and action shots.",
                "name": "New Apple iPhone 11 64GB Purple",
                "price": 800,
                "reference": "123ABC",
                "short_description": "New Apple iPhone 11 64GB Purple MWLX2B/A LTE 4G Sim Free Unlocked UK ",
                "tags": [
                    "electronic",
                    "smartphones",
                    "apple"
                ]
            },
            {
                "active": "Y",
                "category_id": 6,
                "category_name": "Computers",
                "id": 2,
                "image_link": "https://i.ebayimg.com/thumbs/images/g/5m4AAOSw6Spe2sgR/s-l225.webp",
                "long_description": "Apple MacBook Air 13.3 (256GB SSD, Intel Core i3 10th Gen., 3.20 GHz, 8GB) Laptop - Gold",
                "name": "Apple MacBook Air 13.3",
                "price": 2500,
                "reference": "123ABC",
                "short_description": "Apple MacBook Air 13.3 (256GB SSD, Intel Core i3 10th Gen., 3.20 GHz, 8GB)",
                "tags": [
                    "electronic",
                    "computers",
                    "apple"
                ]
            }],
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

export default TopSellersProductsGrid;
