const pool = require("../database/db");

const addProduct = async (req, res) => {
  const { name, price, discount, image_url } = req.body;

  if (!name || !price || !image_url) {
    return res.status(400).json({ error: "All fields except discount are required!" });
  }

  try {
    const query = `
      INSERT INTO products (name, price, discount, image_url) 
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [name, price, discount || 0, image_url];
    const newProduct = await pool.query(query, values);

    res.status(201).json({ message: "Product added successfully!", product: newProduct.rows[0] });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `DELETE FROM products WHERE id = $1 RETURNING *;`;
    const deletedProduct = await pool.query(query, [id]);

    if (deletedProduct.rowCount === 0) {
      return res.status(404).json({ error: "Product not found!" });
    }

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, discount, image_url } = req.body;

  if (!name || !price || !image_url) {
    return res.status(400).json({ error: "All fields except discount are required!" });
  }

  try {
    const query = `
      UPDATE products 
      SET name = $1, price = $2, discount = $3, image_url = $4, created_at = NOW() 
      WHERE id = $5 RETURNING *;
    `;
    const values = [name, price, discount || 0, image_url, id];
    const updatedProduct = await pool.query(query, values);

    if (updatedProduct.rowCount === 0) {
      return res.status(404).json({ error: "Product not found!" });
    }

    res.status(200).json({ message: "Product updated successfully!", product: updatedProduct.rows[0] });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addProduct, getProducts, deleteProduct, updateProduct };
