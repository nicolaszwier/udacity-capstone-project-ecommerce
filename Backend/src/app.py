import os
from flask import Flask, request, jsonify, abort, redirect, session
from sqlalchemy import exc
import json
from flask_cors import CORS
import logging
from models import db, setup_db, Product, Category, Roles, User, Cart

app = Flask(__name__)
setup_db(app)
CORS(app)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')
    return response


@app.route('/products')
def fetch_products():

    try:
        query = Product.query.order_by(Product.price).all()
        products = [product.format() for product in query]

    except:

        logging.exception("message")
        if len(products) == 0:
            abort(404)

    finally:
        return jsonify({
            'success': True,
            'products': products,
            'total_products': len(Product.query.all())
        })


@app.route('/products/<int:product_id>')
def fetch_product_detail(product_id):

    query = Product.query.filter_by(id=product_id).first()

    if query is None:
        abort(404)

    product = query.format()

    return jsonify({
        'success': True,
        'product': product
    })


@app.route('/product', methods=['POST'])
def create_product():
    body = request.get_json()

    try:
        product = Product(
            reference=body.get('reference', None),
            name=body.get('name', None),
            category_id=body.get('category_id', None),
            short_description=body.get('short_description', None),
            long_description=body.get('long_description', None),
            price=body.get('price', None),
            tags=body.get('tags', None),
            image_link=body.get('image_link', None),
            active='Y'
        )

        product.insert()

        return jsonify({
            'success': True,
            'created': product.id,
        })

    except:
        logging.exception("message")
        db.session.rollback()
        abort(422)

    finally:
        db.session.close()


@app.route('/product/<int:product_id>', methods=['PATCH'])
def update_product(product_id):

    body = request.get_json()

    try:
        product = Product.query.get(product_id)

        if product is None:
            abort(404)

        product.reference = body.get('reference', None)
        product.name = body.get('name', None)
        product.category_id = body.get('category_id', None)
        product.short_description = body.get('short_description', None)
        product.long_description = body.get('long_description', None)
        product.price = body.get('price', None)
        product.tags = body.get('tags', None)
        product.image_link = body.get('image_link', None)

        product.update()

        return jsonify({
            'success': True,
            'product': product.format(),
        })

    except:
        db.session.rollback()
        logging.exception("message")
        abort(422)

    finally:
        db.session.close()


@app.route('/product-inactivate/<int:product_id>', methods=['PATCH'])
def inactivate_product(product_id):

    try:
        product = Product.query.get(product_id)

        if product is None:
            abort(404)

        product.active = 'N'

        product.update()

        return jsonify({
            'success': True,
            'product': product.id,
        })

    except:
        db.session.rollback()
        logging.exception("message")
        abort(422)

    finally:
        db.session.close()


@app.route('/customers')
def fetch_customers():

    try:
        query = User.query.order_by(User.id).all()
        users = [user.format() for user in query]

    except:

        if len(users) == 0:
            abort(404)

    finally:
        return jsonify({
            'success': True,
            'customers': users,
            'total_customers': len(User.query.all())
        })


@app.route('/customers/<int:customer_id>')
def fetch_customer_detail(customer_id):

    query = User.query.filter_by(id=customer_id).first()

    if query is None:
        abort(404)

    customer = query.format()

    return jsonify({
        'success': True,
        'customer': customer
    })


@app.route('/customer', methods=['POST'])
def create_customer():

    body = request.get_json()

    try:
        user = User(
            external_id=body.get('external_id', None),
            first_name=body.get('first_name', None),
            last_name=body.get('last_name', None),
            email=body.get('email', None),
            phone=body.get('phone', None),
            adress=body.get('adress', None),
            neighborhood=body.get('neighborhood', None),
            city=body.get('city', None),
            state=body.get('state', None),
            country=body.get('country', None),
            role_id=2,  # customer
            active='Y'
        )

        user.insert()

        return jsonify({
            'success': True,
            'created': user.id,
        })

    except:
        logging.exception("message")
        db.session.rollback()
        abort(422)

    finally:
        db.session.close()


@app.route('/customers/<int:customer_id>/manager', methods=['PATCH'])
def set_manager(customer_id):

    try:
        user = User.query.get(customer_id)

        if user is None:
            abort(404)

        user.role_id = 1

        user.update()

        return jsonify({
            'success': True,
            'customer': user.id,
        })

    except:
        db.session.rollback()
        logging.exception("message")
        abort(422)

    finally:
        db.session.close()


def calculate_cart_calue(cart):

    return jsonify({
        'total_price': total_price,
        'discount': discount,
        'final_price': final_price,
    })


'''
@TODO implement get cart by customer id and calculate the total
'''
@app.route('/cart/<int:customer_id>')
def fetch_cart(customer_id):

    try:
        query = Cart.query.filter_by(
            customer_id=customer_id).order_by(Cart.id).all()
        cart = [cart.format() for cart in query]

    except:

        if len(cart) == 0:
            abort(404)

    # totals = calculate_cart_calue(cart)

    finally:
        return jsonify({
            'success': True,
            'products': cart,
            'totals': {
                'discount': 10,
                'total_price': 100,
                'final_price': 90,
                '#todo': ''
            },
            'total_products': len(cart)
        })


@app.route('/add-to-cart', methods=['POST'])
def add_to_cart():

    body = request.get_json()

    try:
        cart = Cart(
            customer_id=body.get('customer_id', None),
            product_id=body.get('product_id', None),
            amount=body.get('amount', None),
            product_price=body.get('product_price', None),
        )

        cart.insert()

        return jsonify({
            'success': True,
            'created': cart.id,
        })

    except:
        logging.exception("message")
        db.session.rollback()
        abort(422)

    finally:
        db.session.close()


@app.route('/remove-from-cart/<int:cart_id>', methods=['DELETE'])
def delete_drink(cart_id):
    try:
        cart = Cart.query.filter(Cart.id == cart_id).one_or_none()

        if cart is None:
            abort(404)

        cart.delete()

        return jsonify({
            'success': True,
            'delete': cart.id
        })

    except:
        logging.exception("message")
        abort(422)


'''
   Error handlers 
'''
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": 404,
        "message": "Not found"
    }), 404


@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        "success": False,
        "error": 400,
        "message": str(error)
    }), 400


@app.errorhandler(401)
def bad_request(error):
    return jsonify({
        "success": False,
        "error": 401,
        "message": str(error)
    }), 401


@app.errorhandler(403)
def bad_request(error):
    return jsonify({
        "success": False,
        "error": 403,
        "message": str(error)
    }), 401


@app.errorhandler(422)
def unprocessable(error):
    return jsonify({
        "success": False,
        "error": 422,
        "message": "Unprocessable"
    }), 422
