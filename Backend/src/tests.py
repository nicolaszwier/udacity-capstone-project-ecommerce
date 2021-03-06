import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from app import app
from models import setup_db, Category, Product, Cart


class EcommerceTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = app
        self.client = self.app.test_client
        self.database_name = "ecommerce_test"
        self.database_path = "postgres://{}:{}@{}/{}".format(
            'postgres', 'root', 'localhost:5432', self.database_name)
        setup_db(self.app, self.database_path)

        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)

        self.new_product = {
            "reference": "FFHJHF243FS",
            "name": "Book 1",
            "category_id": 3,
            "short_description": "This book is amazing",
            "long_description": "Imagine some long description here",
            "price": 48.50,
            "tags": [
                "books"
            ],
            "image_link": "url"
        }

        token = os.environ['TOKEN_TESTS']
        self.header = {"Authorization": "Bearer " + token}

        self.new_bad_product = {
            "reference": None,
            "name": None,
            "category_id": 0,
            "short_description": None,
            "long_description": None,
            "price": 0,
            "tags": [
                "books"
            ],
            "image_link": ""
        }

        self.new_cart = {
            "customer_id": 2,
            "product_id": 2,
            "amount": 1,
            "product_price": 10
        }

        self.new_bad_cart = {
            "customer_id": 0,
            "product_id": 0,
            "amount": 0,
            "product_price": 0
        }

    def tearDown(self):
        """Executed after reach test"""
        pass

    def test_get_paginated_products(self):
        res = self.client().get('/products')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['total_products'])
        self.assertTrue(len(data['products']))

    def test_get_product_by_id(self):
        res = self.client().get('/products/1')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['product'])

    def test_404_sent_requesting_beyond_valid_page(self):
        res = self.client().get('/products?page=1000')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Not found')

    def test_new_product(self):
        res = self.client().post(
            '/product',
            headers=self.header,
            json=self.new_product
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)

    def test_new_product_with_bad_data(self):
        res = self.client().post(
            '/product',
            headers=self.header,
            json=self.new_bad_product
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 422)
        self.assertEqual(data['success'], False)
        self.assertIn('422 Unprocessable Entity:', data['message'])

    def test_add_to_cart(self):
        res = self.client().post(
            '/add-to-cart',
            headers=self.header,
            json=self.new_cart
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)

    def test_add_to_cart_with_bad_data(self):
        res = self.client().post(
            '/add-to-cart',
            headers=self.header,
            json=self.new_bad_cart
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 422)
        self.assertEqual(data['success'], False)
        self.assertIn('422 Unprocessable Entity:', data['message'])

    def test_get_cart_by_customer_id(self):
        res = self.client().get('/cart/1',  headers=self.header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['products'])
        self.assertTrue(data['total_products'])
        self.assertTrue(data['totals'])

    def test_check_cart_totals(self):
        res = self.client().get('/cart/1', headers=self.header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['totals'][0]['final_price'], 10)


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
