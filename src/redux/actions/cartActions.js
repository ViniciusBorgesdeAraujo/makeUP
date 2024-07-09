import axios from "axios";
import * as actionTypes from "../constants/cartConstants";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await api.get(`/products/${id}`);

    dispatch({
      type: actionTypes.ADD_TO_CART,
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
  } catch (error) {
    console.error("Erro ao adicionar ao carrinho", error);
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
