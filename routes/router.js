const express = require("express");
const ProductController = require("../controllers/ProductController");

module.exports = app => {
  app.get("/", ProductController.index);
  app.get("/create-product", ProductController.create);
  app.post("/create-product/store", ProductController.store);
  app.get("/view-product/:id", ProductController.view);
  app.get("/edit-product/:id", ProductController.edit);
  app.post("/edit-product/update", ProductController.update);
  app.get("/delete-product/:id", ProductController.delete);
};
