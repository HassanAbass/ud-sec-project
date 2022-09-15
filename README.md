# Storefront Backend Project

## Getting Started
### 1. Create database
- Database default port is `5432`
#### Run the following commands on initialize database prod and test with user:
```
$ sudo -u postgres -i;
$ psql postgres
$ CREATE USER ud_user WITH PASSWORD 'password';
$ create database storefront;
$ create database storefront_test;
# \c storefront
$ GRANT ALL PRIVILEGES ON DATABASE storefront TO ud_user;
$ GRANT ALL PRIVILEGES ON DATABASE storefront_test TO ud_user;
```

### 3. migrate
```
$ npm install -g db-migrate
$ db-migrate up
```
### 2. Install packages
- Application default port is `3000`
- Run the following commands to start the app
```
$ npm install
$ npm run build
$ npm run test
$ node dist/server.js
```

