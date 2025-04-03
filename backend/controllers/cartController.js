const pool = require("../database/db");

const addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id || !Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ error: "Invalid data! Quantity must be a positive integer." });
  }

  try {
    const existingItem = await pool.query(
      "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );

    if (existingItem.rows.length > 0) {
      const updatedItem = await pool.query(
        "UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *",
        [quantity, user_id, product_id]
      );
      return res.status(200).json({ message: "Cart updated!", cartItem: updatedItem.rows[0] });
    }

    const newCartItem = await pool.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [user_id, product_id, quantity]
    );

    res.status(201).json({ message: "Product added to cart!", cartItem: newCartItem.rows[0] });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getCartItems = async (req, res) => {
  const { user_id } = req.params;
  try {
    const cartItems = await pool.query(
      `SELECT cart.id, cart.product_id, cart.quantity, products.name, products.price, 
       products.discount, products.image_url
       FROM cart
       JOIN products ON cart.product_id = products.id
       WHERE cart.user_id = $1`,
      [user_id]
    );
    res.status(200).json(cartItems.rows); // Return cart items
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


const updateCartItem = async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ error: "Quantity must be at least 1" });
  }

  try {
    const updatedCart = await pool.query(
      "UPDATE cart SET quantity = $1 WHERE id = $2 RETURNING *",
      [quantity, cartItemId]
    );

    res.status(200).json({ message: "Cart updated!", cartItem: updatedCart.rows[0] });
  } catch (error) {
    console.error("Error updating cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


const removeCartItem = async (req, res) => {
  const { cartItemId } = req.params;

  try {
      const deletedItem = await pool.query("DELETE FROM cart WHERE id = $1 RETURNING *", [cartItemId]);

      if (deletedItem.rowCount === 0) {
          return res.status(404).json({ error: "Cart item not found!" });
      }

      res.status(200).json({ message: "Cart item removed!", cartItemId });
  } catch (error) {
      console.error("Error removing cart item:", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
};


const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    await pool.query("DELETE FROM cart WHERE user_id = $1", [userId]);
    res.status(200).json({ message: "Cart cleared!" });
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addToCart, getCartItems, updateCartItem, removeCartItem, clearCart };
