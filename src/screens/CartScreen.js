import React, { useEffect } from "react";
import "./CartScreen.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import CartItem from "../components/CartItem";

import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((totalQty, item) => totalQty + Number(item.qty), 0);
  };

  const getCartSubTotal = () => {
    return cartItems.reduce(
      (totalPrice, item) => totalPrice + Number(item.price) * item.qty,
      0
    );
  };

  const handleCheckoutClick = () => {
    Swal.fire({
      icon: "success",
      title: "Sucesso!",
      text: "Produto Comprado Com Sucesso!",
    });
  };

  useEffect(() => {
    console.log("CartScreen carregado");
  }, []);

  return (
    <div className="cartscreen">
      <div className="cartscreen__left">
        <h2>Carrinho de Compras</h2>

        {cartItems.length === 0 ? (
          <div>
            Seu carrinho está vazio <Link to="/">Voltar</Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.product}
              item={item}
              qtyChangeHandler={qtyChangeHandler}
              removeHandler={removeHandler}
            />
          ))
        )}
      </div>

      <div className="cartscreen__right">
        <div className="cartscreen__info">
          <p>Subtotal ({getCartCount()}) itens</p>
          <p>R${getCartSubTotal().toFixed(2)}</p>
        </div>
        <div>
          <button onClick={handleCheckoutClick}>
            Prosseguir para o Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
