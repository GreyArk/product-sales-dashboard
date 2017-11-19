# Spartez coding test

## How to install
Just run

```
npm install
```

## How to run
Just check out `scripts` in `package.json.`

## How it works

This application pretends to expose data about new customers who buy products
in real time via REST.

There are two endpoints:

```
GET http://localhost:9000/products
```

Exposes general information about all available products.

```
GET http://localhost:9000/products/{product-id}
```

Returns a JSON representation of the product and its customers. It can take the following query params:

* offset
* limit

## The task

Create a simple product sales dashboard application.
