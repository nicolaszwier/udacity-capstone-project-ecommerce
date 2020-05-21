import os
from sqlalchemy import Column, String, Integer, Numeric, create_engine
from flask_sqlalchemy import SQLAlchemy
import json

database_name = "ecommerce"
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

    def __init__(self, reference, name, category_id, short_description, long_description, price, tags, active):
        self.reference = reference
        self.name = name
        self.category_id = category_id
        self.short_description = short_description
        self.long_description = long_description
        self.price = price
        self.tags = tags
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
            'reference': self.reference,
            'name': self.name,
            'category': self.category,
            'short_description': self.short_description,
            'long_description': self.long_description,
            'price': self.price,
            'tags': self.tags,
            'active': self.active,
        }
