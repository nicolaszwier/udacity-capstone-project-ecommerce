import os
from flask import Flask, request, jsonify, abort
from sqlalchemy import exc
import json
from flask_cors import CORS
import logging
from models import db, setup_db
# from models import db, setup_db
# from auth import AuthError, requires_auth

app = Flask(__name__)
setup_db(app)
CORS(app)


@app.route('/')
def fetch_products():

    return jsonify({
        'success': True
    })
