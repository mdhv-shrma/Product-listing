import { createStore } from "redux";
import cartReducer from "./reducers/CartReducer";


const cartStore = createStore(cartReducer);

export default cartStore;