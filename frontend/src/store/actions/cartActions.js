import axios from "axios";

export const addToCart = (product) => async (dispatch) => {
    try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User not logged in");
        console.log("hererer")
        const { data } = await axios.post("http://localhost:5000/api/cart/add", {
            user_id: userId,
            product_id: product.id,
            quantity: 1
        });

        dispatch({
            type: "ADD_TO_CART",
            payload: data.cartItem, // Assuming backend returns the updated cart item
        });

    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};

export const removeFromCart = (cartItem) => async (dispatch) => {
    try {
        if (cartItem.quantity > 1) {
            // Reduce quantity by 1
            const { data } = await axios.put(
                `http://localhost:5000/api/cart/update/${cartItem.id}`,
                { quantity: cartItem.quantity - 1 }
            );

            dispatch({
                type: "UPDATE_CART_ITEM",
                payload: data.cartItem, // Updated cart item from backend
            });
        } else {
            // Remove item from cart
            await axios.delete(`http://localhost:5000/api/cart/remove/${cartItem.id}`);

            dispatch({
                type: "REMOVE_FROM_CART",
                payload: cartItem.id, // Send cart item ID to the reducer
            });
        }
    } catch (error) {
        console.error("Error removing cart item:", error);
    }
};

export const fetchCartItems = () => async (dispatch) => {
    try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User not logged in");

        const { data } = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        dispatch({
            type: "SET_CART_ITEMS",
            payload: data, // Assuming backend returns an array of cart items
        });
    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
};

export const clearCart = () => (dispatch) => {
    dispatch({
        type: "CLEAR_CART",
    });
};