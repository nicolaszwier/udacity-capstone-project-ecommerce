import os
import json
from sqlalchemy import Column, String, Integer, Numeric, create_engine
from flask_sqlalchemy import SQLAlchemy
from decimal import Decimal

database_name = "ecommerce"
# database_path = os.environ['DATABASE_URL']
database_path = "postgres://{}:{}@{}/{}".format(
    'postgres', 'root', 'localhost:5432', database_name)

db = SQLAlchemy()


def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)


class Category(db.Model):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True)
    name = db.Column(db.String)
    active = Column(String)
    product = db.relationship('Product', backref='category', lazy=True)

    def __init__(self, name, active):
        self.name = name
        self.active = active

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'name': self.name,
            'active': self.active,
        }


class Product(db.Model):
    __tablename__ = 'product'

    id = Column(Integer, primary_key=True)
    reference = db.Column(db.String)
    name = db.Column(db.String)
    category_id = db.Column(db.Integer, db.ForeignKey(
        'category.id'), nullable=False)
    short_description = Column(String)
    long_description = Column(String)
    price = Column(Numeric)
    tags = db.Column(db.ARRAY(db.String))
    active = Column(String)
    cart = db.relationship('Cart', backref='product', lazy=True)
    image_link = db.Column(db.String)

    def __init__(self, reference, name, category_id, short_description, long_description, price, tags, active, image_link):
        self.reference = reference
        self.name = name
        self.category_id = category_id
        self.short_description = short_description
        self.long_description = long_description
        self.price = price
        self.tags = tags
        self.active = active
        self.image_link = image_link

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(product):
        formated_product = []
        for el in product:
            formated_product.append({
                'id': el.id,
                'reference': el.reference,
                'name': el.name,
                'category_id': el.category_id,
                'category_name': el.category_name,
                'short_description': el.short_description,
                'long_description': el.long_description,
                'price': Decimal(el.price),
                'tags': el.tags,
                'image_link': el.image_link,
                'active': el.active,
            })
        return formated_product

    # def format(self):
    #     return {
    #         'id': self.id,
    #         'reference': self.reference,
    #         'name': self.name,
    #         'category_id': self.category_id,
    #         'short_description': self.short_description,
    #         'long_description': self.long_description,
    #         'price': Decimal(self.price),
    #         'tags': self.tags,
    #         'image_link': self.image_link,
    #         'active': self.active,
    #     }


class Roles(db.Model):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    role = db.Column(db.String)
    permissions = db.Column(db.ARRAY(db.String))
    user = db.relationship('User', backref='role', lazy=True)

    def __init__(self, role, permissions):
        self.role = role
        self.permissions = permissions

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'role': self.role,
            'permissions': self.permissions,
        }


class User(db.Model):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    external_id = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    phone = db.Column(db.String)
    adress = db.Column(db.String)
    neighborhood = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    country = db.Column(db.String)
    role_id = db.Column(db.Integer, db.ForeignKey(
        'roles.id'), nullable=False)
    active = Column(String)
    # cart = db.relationship('Cart', backref='user', lazy=True)

    def __init__(self, external_id, first_name, last_name, email, phone, adress, neighborhood, active, city, state, country, role_id):
        self.external_id = external_id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone = phone
        self.adress = adress
        self.neighborhood = neighborhood
        self.city = city
        self.state = state
        self.country = country
        self.role_id = role_id
        self.active = active

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'external_id': self.external_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'adress': self.adress,
            'neighborhood': self.neighborhood,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'role_id': self.role_id,
            'active': self.active,
        }


class Cart(db.Model):
    __tablename__ = 'cart'

    id = Column(Integer, primary_key=True)
    customer_id = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        'product.id'), nullable=False)
    amount = db.Column(db.Integer)
    product_price = db.Column(Numeric)

    def __init__(self, customer_id, product_id, amount, product_price):
        self.customer_id = customer_id
        self.product_id = product_id
        self.amount = amount
        self.product_price = product_price

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(cart):
        formated_cart = []
        for el in cart:
            formated_cart.append({
                'amount': el.amount,
                'customer_id': el.customer_id,
                'id': el.id,
                'product_id': el.product_id,
                'product_name': el.product_name,
                'short_description': el.short_description,
                'product_price': el.product_price,
            })
        return formated_cart
