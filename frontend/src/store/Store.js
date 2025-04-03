import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import cartReducer from "./reducers/CartReducer";


const Store = createStore(
    cartReducer,
    composeWithDevTools(applyMiddleware(thunk))
    );

export default Store;


