const express = require("express");
const { addProduct, getProducts, deleteProduct, updateProduct } = require("../controllers/productController");

const router = express.Router();

router.post("/add-product", addProduct); // Handles description
router.get("/", getProducts); // Returns description
router.put("/:id", updateProduct); // Updates description
router.delete("/:id", deleteProduct);

module.exports = router;
