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
            "image_link": "https://a-static.mlcdn.com.br/618x463/mouse-game-mecanico-8000-dpi-7-botao-led-cw60-retroiluminado-onikuma/hamypresentes/if027/bd9ed969ca6f317c26011e262427d2a1.jpg"
        }

        self.header = {"Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InJyMURJOHhhYVB5Zk1DaWRlYzJLRiJ9.eyJodHRwczovL25pY29sYXMuY29tL3JvbGUiOlsiZ2V0OnByb2R1Y3RzIiwicG9zdDpwcm9kdWN0cyIsInBhdGNoOnByb2R1Y3QiLCJwYXRjaDpwcm9kdWN0LWluYWN0aXZhdGUiLCJnZXQ6Y2FydCIsInBvc3Q6Y2FydCIsImRlbGV0ZTpjYXJ0Il0sImdpdmVuX25hbWUiOiJOaWNvbGFzIiwiZmFtaWx5X25hbWUiOiJad2llcnp5a293c2tpIiwibmlja25hbWUiOiJuaWNvbGFzendpZXIiLCJuYW1lIjoiTmljb2xhcyBad2llcnp5a293c2tpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdoVGh6aTB5dDEyUUxIZ1RhQWo3Q1BmdUdlZFlCNEVrZDUwM2JLVk9RIiwibG9jYWxlIjoicHQtQlIiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNi0xMVQyMDowNjo1Ny4xMzNaIiwiZW1haWwiOiJuaWNvbGFzendpZXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vbmljb2xhc2Rldi5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTgwODczMDMwMjY4NTkwMDc0MjkiLCJhdWQiOiJwS1RHSHNJcWN6S0J1Rmt1a25XYzZMa1Z5ZmFPRzBobSIsImlhdCI6MTU5MTkwNzM5MSwiZXhwIjoxNTkxOTQzMzkxLCJhdF9oYXNoIjoiZHp3LVVGT3JGRFE3cWtpd1kzb09FZyIsIm5vbmNlIjoidXB4cWwxdXNlekFmeFRzZlFBcFo4cU9OSHNRcE43Ty0ifQ.AIr77DL3nziRESwq3l3GHTJOXjTW65Ck7Yu9pA9v2L3kwxuXwGX01hNf3hMXCd5PV7N672Zao8zVVqSRftlOtY5QUM2AhUehpEZcm9QXrNSr_mHPRpNwNAiklkJMXgiAeioZt12o0-VqUKW8aOZXE4idOwm9LsipKpJC8wMYa2jA80w243WqsBYlEpi-PjoGsVA0D3SgNygyHuMufNhlbAdv7eL8WDvTJqd-y97xB9MieiRy5lr767ztWTdXgPE719jYuS-Yxq8n0byZcCcC0KsSdfvg3nBNvgH7nvC-gl0nzl3M1EERCkTfYEbWWCe_BAH0TwkZousf0aJwuMcOGg"}

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
