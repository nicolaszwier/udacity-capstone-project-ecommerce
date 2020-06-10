from flask import Flask, jsonify, abort


def validate_required_fields_in_new_product(new_product):

    if (new_product['reference'] == '') or (new_product['reference'] is None):
        abort(422, 'Reference is required')
    if (new_product['name'] == '') or (new_product['name'] is None):
        abort(422, 'Name is required')
    if (new_product['category_id'] == 0) or (new_product['category_id'] is None):
        abort(422, 'Category is required')
    if (new_product['short_description'] == '') or (new_product['short_description'] is None):
        abort(422, 'Short description is required')
    if (new_product['long_description'] == '') or (new_product['long_description'] is None):
        abort(422, 'Long description is required')
    if (new_product['price'] == 0) or (new_product['price'] is None):
        abort(422, 'Price is required')
    if (new_product['image_link'] == '') or (new_product['image_link'] is None):
        abort(422, 'Image link is required')

    return True


def validate_required_fields_in_new_cart(new_cart):

    if (new_cart['customer_id'] == 0) or (new_cart['customer_id'] is None):
        abort(422, 'Customer is required')
    if (new_cart['product_id'] == 0) or (new_cart['product_id'] is None):
        abort(422, 'Product is required')
    if (new_cart['amount'] == 0) or (new_cart['amount'] is None):
        abort(422, 'Amount is required')
    if (new_cart['product_price'] == 0) or (new_cart['product_price'] is None):
        abort(422, 'Product price is required')

    return True
