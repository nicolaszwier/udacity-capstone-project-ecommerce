python manage.py db init
python manage.py db migrate
python manage.py db upgrade

Roles
Admin: ['get:products','post:products','patch:product','patch:product-inactivate','get:customers','post:customer','patch:customer','get:cart','post:cart','delete:cart',]


## Running the server

From within the `./src` directory

Each time you open a new terminal session, run:

```bash
export FLASK_APP=app.py;
```
To run the server, execute:

```bash
flask run --reload
```

https://capstone-project-ecommerce.herokuapp.com/ | 


git remote add heroku https://git.heroku.com/capstone-project-ecommerce.git


database info
user: qursypmfdclyso
password: dd18e075bae8d5a07c18a68b0761f92336c692c54e60cdf889cb7b85e9d80124
server: ec2-52-6-143-153.compute-1.amazonaws.com
port: 5432
database: d8vds55g1ipovh