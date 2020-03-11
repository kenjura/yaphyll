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

