import os
import json
from sqlalchemy import Column, String, Integer, Numeric, create_engine
from flask_sqlalchemy import SQLAlchemy
from decimal import Decimal

database_name = "ecommerce"
database_path = os.environ['DATABASE_URL']
# database_path = "postgres://{}:{}@{}/{}".format(
#     'postgres', 'root', 'localhost:5432', database_name)

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


class Cart(db.Model):
    __tablename__ = 'cart'

    id = Column(Integer, primary_key=True)
    customer_id = db.Column(db.String, nullable=False)
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
                'image_link': el.image_link
            })
        return formated_cart
