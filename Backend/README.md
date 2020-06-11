# Ecommerce API backend

## Getting Started

### Installing Dependencies

#### Python 3.7

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

#### Virtual Enviornment

We recommend working within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organaized. Instructions for setting up a virual enviornment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

#### PIP Dependencies

Once you have your virtual environment setup and running, install dependencies by naviging to the `/backend/src` directory and running:

```bash
pip install -r requirements.txt
```

This will install all of the required packages we selected within the `requirements.txt` file.

##### Key Dependencies

- [Flask](http://flask.pocoo.org/)  is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use handle the lightweight sqlite database. You'll primarily work in app.py and can reference models.py. 

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross origin requests from our frontend server. 

## Database Setup
With Postgres running, restore a database using the trivia.psql file provided. From the src folder in terminal run:
```bash
psql ecommerce < ecommerce.psql
```

## Running the server

From within the `backend` directory first ensure you are working using your created virtual environment.

To run the server, execute:

```bash
export FLASK_APP=app.py
export FLASK_ENV=development
flask run
```

Setting the `FLASK_ENV` variable to `development` will detect file changes and restart the server automatically.

Setting the `FLASK_APP` variable to `flaskr` directs flask to use the `flaskr` directory and the `__init__.py` file to find the application. 

## API Reference

### Error Handling
Errors are returned as JSON objects in the following format:

```
{
    "success": False, 
    "error": 404,
    "message": "Not found"
}
```

The API will return these error types when requests fail:

- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 422: Unprocessable


## Endpoints

## GET '/status'
- General:
  - Only return the current status of the API
  - Sample: `http://127.0.0.1:5000/status`
  
  ```json
    {
    "success": "True",
    "status": "The ecommerce API is working properly"
    }  
  ```

## GET '/categories'
- General:
  - Returns a list of categories objects, success value, and total number of categories
  - Sample: `http://127.0.0.1:5000/categories`
  
  
  ```json
  {
  "categories": [
    {
      "id": 1, 
      "name": "Books"
    }, 
    {
      "id": 2, 
      "name": "Computers"
    }
  ], 
  "success": true, 
  "total_categories": 2
  }
  ```  

## GET '/products'
- General:
  - Returns a list of products objects, success value, and total number of products
  - Results are paginated in groups of 20. Include a request argument to choose page number: `page=1`, starting from 1. And a request argument: `search-term` to filter products by name, if nothing has informed, all questions will be listed.
  - Sample: `http://127.0.0.1:5000/products` 
  
  
```json
{
  "products": [
       {
         "active": "Y",
         "category_id": 2,
         "category_name": "Computers",
         "id": 1,
         "image_link": "{url}",
         "long_description": "Long description of product",
         "name": "Product 1",
         "price": 48.5,
         "reference": "FASF243FS",
         "short_description": "The product 2 is amazing",
         "tags": [
            "electronic",
            "mouse",
            "computers"
         ]
      },
       {
         "active": "Y",
         "category_id": 2,
         "category_name": "Computers",
         "id": 1,
         "image_link": "{url}",
         "long_description": "Long description of product",
         "name": "Product 1",
         "price": 48.5,
         "reference": "FASF243FS",
         "short_description": "The product 2 is amazing",
         "tags": [
            "electronic",
            "mouse",
            "computers"
         ]
      }
],
"success": true,
"total_products": 2
}
```

## GET '/products/{product_id}'
- General:
  - Returns the product object of the given id and success value.
  - Sample: `http://127.0.0.1:5000/products/1` 
  
  
```json
{
  "products": [
       {
         "active": "Y",
         "category_id": 2,
         "category_name": "Computers",
         "id": 1,
         "image_link": "{url}",
         "long_description": "Long description of product",
         "name": "Product 1",
         "price": 48.5,
         "reference": "FASF243FS",
         "short_description": "The product 2 is amazing",
         "tags": [
            "electronic",
            "mouse",
            "computers"
         ]
      }
],
"success": true
}
```

## POST '/product'
- General:
  - Creates a new product, if success, returns success value and new question id.
  - Sample: `http://127.0.0.1:5000/product`
  
  - Body: 
  ```
  {
    "category_id": 2,
    "image_link": "{url}",
    "long_description": "Long description of product",
    "name": "Product 1",
    "price": 48.5,
    "reference": "FASF243FS",
    "short_description": "The product 2 is amazing",
    "tags": [
       "electronic",
       "mouse",
       "computers"
       ]
   }
  ```
  - Response: 
  ```
  {
    "created": 32, 
    "success": true
  }
  ```
  
  
  
## PATCH '/product/{product_id}'
- General:
  - Update a product with the given id, if success, returns success value and new product updated.
  - Sample: `http://127.0.0.1:5000/product/1`
  
  - Body: 
  ```
  {
    "category_id": 2,
    "image_link": "{url}",
    "long_description": "Long description of product",
    "name": "Product 1",
    "price": 48.5,
    "reference": "FASF243FS",
    "short_description": "The product 2 is amazing",
    "tags": [
       "electronic",
       "mouse",
       "computers"
       ]
   }
  ```
  - Response: 
  ```
  {
    "product": {"Product object"}, 
    "success": true
  }
  ```

## PATCH '/product-inactivate/{product_id}'

- General:
  - Inactivate the product with the given id
  - Returns: A object that contains success value and id of the inactive product
  - Sample: `http://127.0.0.1:5000/product-inactivate/2`


- Response: 
  ```
  {
    "product": 2, 
    "success": true
  }
  ```

## GET '/cart/{customer_id}'
- General:
  - Returns a list of the cart products, the totals, success value and total numbem of products.
  - Sample: `http://127.0.0.1:5000/cart/1` 
  
  
```json
{
  "products": [
    {
      "amount": 2,
      "customer_id": 1,
      "id": 1,
      "product_id": 1,
      "product_name": "Product 1",
      "short_description": "Short description of the product",
      "product_price": 100
    }
  ],
  "success": true,
  "total_products": 1,
  "totals": {
    "discount": 0,
    "final_price": 100
  }
}
```



## POST '/add-to-cart'
- General:
  - Add a new product to customer cart, if success, returns success value and new cart id.
  - Sample: `http://127.0.0.1:5000/add-to-cart`
  
  - Body: 
  ```
  {
    "customer_id": 1,
    "product_id": 1,
    "amount": 1,
    "product_price": 100
  }
  ```
  - Response: 
  ```
  {
    "created": 32, 
    "success": true
  }
  ```
  
## DELETE '/remove-from-cart/{cart_id}'

- General:
  - Delete a product from the cart with the given id
  - Returns: A object that contains success value and id of the deleted cart
  - Sample: `http://127.0.0.1:5000/remove-from-cart/15`

- Response: 
  ```
  {
    "delete": 2, 
    "success": true
  }
  ```
  


## Testing
To run the tests, run
```
dropdb ecommerce_test
createdb ecommerce_test
psql ecommerce_test < ecommerce_test.psql
python tests.py
```
