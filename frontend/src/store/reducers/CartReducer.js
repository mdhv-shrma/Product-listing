const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
      case "ADD_TO_CART": {
          const existingItem = state.cart.find(item => item.id === action.payload.id);

          return existingItem
              ? {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: action.payload.quantity } // Update with backend data
                            : item
                    ),
                }
              : {
                    ...state,
                    cart: [...state.cart, action.payload], // Add new item from backend
                };
      }

      case "REMOVE_FROM_CART": {
          return {
              ...state,
              cart: state.cart.filter(item => item.id !== action.payload), // Remove from state
          };
      }

      case "UPDATE_CART_ITEM": {
          return {
              ...state,
              cart: state.cart.map(item =>
                  item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
              ),
          };
      }

      case "SET_PRODUCTS":
          return {
              ...state,
              products: action.payload,
          };

      case "SET_CART_ITEMS": {
          return {
              ...state,
              cart: action.payload, // Set cart items from backend
          };
      }

      case "CLEAR_CART": {
          return {
              ...state,
              cart: [], // Clear the cart
          };
      }

      default:
          return state;
  }
};

export default cartReducer;
