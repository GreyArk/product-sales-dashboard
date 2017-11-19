"use strict";

const express = require("express");
const errors = require("restify-errors");
const productAutoPopulator = require("./productAutoPopulator");

module.exports.create = function initServer() {
  const server = express();

  const products = productAutoPopulator.start(25, 3000);

  server.get("/products", function(req, res) {
    res.json(
      Object.keys(products).map(function(productId) {
        return Object.assign(
          { id: productId },
          { self: req.protocol + "://" + req.headers.host + req.url + "/" + productId },
          products[productId],
          { customers: products[productId].customers.length }
        );
      })
    );
  });

  server.get("/products/:productId", function(req, res) {
    let productId = req.params.productId;
    let product = products[productId];

    if (!product) {
      res.json(new errors.ResourceNotFoundError("Product doesn't exist.").body);
    }

    let customers = product.customers;
    let offset = +req.query.offset;
    let limit = +req.query.limit;

    if (offset > 0) {
      customers = customers.slice(offset);
    }

    if (limit > 0) {
      customers = customers.slice(0, limit);
    }
    res.json(
      Object.assign({ id: productId }, product, { customers: customers })
    );
  });

  server.get(/.*/, express.static("app"));

  return server;
};
