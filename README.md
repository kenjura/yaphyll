# Yaphyll

Yaphyll is a simple, nodeJS-based forum, using React for a frontend.


# Local Dev

## Prereqs
+ mongodb 3.x
+ node 13+


## Initial Setup
+ create /etc/yaphyll.env
  + copy ./yaphyll.env.example and customize it
+ set up SSL (see below)
+ npm i

### SSL
Install mkcert or similar (google it)

run:
```
#!/bin/sh
cd /path/to/application/root
mkcert -install
mkcert localhost
```

## Running Locally
+ npm start

## Packaging for Production
tbd



# Testing

## Unit testing

just run ```mocha test/unit/**/*.test.js```

### Integration testing

Prerequisites:
+ local mysql: if you have docker, run ```docker-compose up```. otherwise install your own mysql and configure env variables in test/int/shared/setup-test-db.js
+ once installed, create a table called yaphyll-test and ensure the user "yaphyll" has access to it

Running tests:
```mocha test/int/**/*.test.js```

TODO: make this less clunky


# Notes

## local dev mysql server

Uses docker and docker-compose. To start it up, run ```docker-compose up```. To do so without tying up your current shell, run ```docker-compose start``` once it's been started once successfully.

To connect from shell, assuming you have a local mysql client, run ```mysql -u yaphyll -p -P 33307 -h 127.0.0.1``` (username and password are in docker-compose.yml), or use whatever client you have. Warning: you can't use the "localhost" host to connect to mysql in docker--you have to use 127.0.0.1.