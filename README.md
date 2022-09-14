# Storefront Backend Project

## Getting Started
### 1. Create database
#### Run the following commands on initialize database with user:
```
$ sudo -u postgres -i;
$ psql postgres
$ CREATE USER ud_user WITH PASSWORD 'password';
$ create database storefront;
# \c storefront
$ GRANT ALL PRIVILEGES ON DATABASE storefront TO ud_user;
```
Notice: the 

### 3. migrate
- When users table migration start It will seed the data with a user whose `first_name`, `password` is `john`, `secret` so you can use the token for others uses endpoint as it is required to do so.
- You must use the same `BCRYPT_PASSOWRD`, `BCRYPT_ROUND`provided in the .env file in order for login to match you credentials, or your welcome to seed the db with you own salt. 

```
$ npm install -g db-migrate
$ db-migrate up
```
### 2. Install packages
Run the following to start the app
```
$ npm install
$ npm run build
$ npm run test
$ node dist/server.js
```

