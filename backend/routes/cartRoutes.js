const express = require("express");
const {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  clearCart
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add", addToCart); 
router.get("/:user_id", getCartItems);
router.put("/update/:cartItemId", updateCartItem);
router.delete("/remove/:cartItemId", removeCartItem);
router.delete("/clear/:userId", clearCart);

module.exports = router;
