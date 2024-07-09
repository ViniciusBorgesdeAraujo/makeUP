import axios from "axios";
import * as actionTypes from "../constants/productConstants";
import * as cartActionTypes from "../constants/cartConstants";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

    const { data } = await api.get("/products");
    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await api.get(`/products/${id}`);

    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });
};

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await api.get(`/products/${id}`);

  dispatch({
    type: cartActionTypes.ADD_TO_CART,
    payload: {
      product: data.id,
      name: data.title,
      imageUrl: data.thumbnail,
      price: data.price,
      countInStock: data.stock,
      qty,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: cartActionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
