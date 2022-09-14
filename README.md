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

### 3. migrate
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

