import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// Actions
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(addToCart(product.id, qty));
    navigate("/cart");
  };

  return (
    <div className="productscreen">
      {loading ? (
        <h2>Carregando...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className="left__info">
              <p className="left__name">{product.title}</p>
              <p>Preço: R${product.price}</p>
              <p>Descrição: {product.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Preço: <span>R${product.price}</span>
              </p>
              <p>
                Status:{" "}
                <span>{product.stock > 0 ? "Em Stock" : "Fora de Stock"}</span>
              </p>
              <p>
                Quantidade
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.stock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Adicionar ao Carrinho
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
