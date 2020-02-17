const DB = require("../utils/db");
const fs = require("fs");
/**
 *  render page and width fetch data
 *
 * @return void
 */

exports.index = function(req, res) {
  DB.query("SELECT * FROM products", function(error, results, fields) {
    if (error) throw error;
    res.render("product/index", { results });
  });
};

/**
 *  Render Add Product Page
 *
 * @return void
 */

exports.create = function(req, res) {
  res.render("product/add-product");
};
/**
 *  Store Data
 *
 * @return void
 */
exports.store = function(req, res) {
  let uploadedFile = req.files.product_photo;
  let pictureName = uploadedFile.name.split(".")[0] + new Date().valueOf();
  pictureName = pictureName + "." + uploadedFile.name.split(".")[1];

  const values = {
    product_name: req.body.product_name,
    description: req.body.description,
    orginal_price: req.body.orginal_price,
    selling_price: req.body.selling_price,
    product_photo: pictureName,
    created_at: Math.floor(Date.now() / 1000)
  };
  if (
    uploadedFile.mimetype === "image/png" ||
    uploadedFile.mimetype === "image/jpeg" ||
    uploadedFile.mimetype === "image/gif"
  ) {
    uploadedFile.mv(`public/uploads/${student.product_photo}`, err => {
      if (err) {
        return res.status(500).send(err);
      }
      DB.query("INSERT INTO products SET ?", values, function(
        error,
        results,
        fields
      ) {
        if (error) throw error;
        res.redirect("/");
      });
    });
  }
};
/**
 *  View Single Product
 *
 * @return void
 */
exports.view = function(req, res) {
  DB.query("SELECT * FROM products WHERE id = ?", [req.params.id], function(
    error,
    result,
    fields
  ) {
    if (error) throw error;

    res.render("product/view-product", { result: result[0] });
  });
};

/**
 *  Edit  Single Product
 *
 * @return void
 */
exports.edit = function(req, res) {
  let query = "SELECT * FROM products WHERE id = ?";
  DB.query(query, [req.params.id], function(error, result, fields) {
    if (error) throw error;

    res.render("product/edit-product", { result: result[0] });
  });
};
/**
 *  Update  Single Product
 *
 * @return void
 */
exports.update = function(req, res) {
  let query = "UPDATE `products` SET ?";
  const values = {
    product_name: req.body.product_name,
    description: req.body.description,
    orginal_price: req.body.orginal_price,
    selling_price: req.body.selling_price
  };
  DB.query(query, values, function(error, results, fields) {
    if (error) throw error;
    res.redirect("/");
  });
};
/**
 *  Delete Product
 *
 * @return void
 */
exports.delete = function(req, res) {
  let id = req.params.id;
  let imageQuery =
    'SELECT product_photo from `products` WHERE id = "' + id + '"';
  let deleteProduct = 'DELETE FROM products WHERE id = "' + id + '"';

  DB.query(imageQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    let image = result[0].product_photo;

    fs.unlink(`public/uploads/${image}`, err => {
      if (err) {
        return res.status(500).send(err);
      }
      DB.query(deleteProduct, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.redirect("/");
      });
    });
  });
};
