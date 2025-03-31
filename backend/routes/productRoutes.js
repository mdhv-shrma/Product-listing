const express = require("express");
const { addProduct, getProducts, deleteProduct, updateProduct } = require("../controllers/productController");

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
