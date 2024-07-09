import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";

import { cartReducer } from "./reducers/cartReducers";
import {
  getProductsReducer,
  getProductDetailsReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
  cart: cartReducer,
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
});

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
