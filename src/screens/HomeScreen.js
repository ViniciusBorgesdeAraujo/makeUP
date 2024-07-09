import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts as listProducts } from "../redux/actions/productActions";
import Product from "../components/Product";
import image8 from "../assets/img/image8.png";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [showProducts, setShowProducts] = useState(false);

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productsToShow = products.slice(0, 10);

  const handleBookingClick = () => {
    setShowProducts(true);
  };

  return (
    <div className="homescreen">
      {!showProducts && (
        <div className="homescreen__content">
          <div className="homescreen__text">
            <h2 className="homescreen__title">
              Discover Amazing Makeup Brands
            </h2>
            <p className="hero__subtitle">
              Descubra as melhores marcas de maquiagem com preços irresistíveis.
              Encontre produtos que realçam sua beleza natural e transformam seu
              visual com estilo e elegância.
            </p>
            <button className="booking-button" onClick={handleBookingClick}>
              Discover Products
            </button>
          </div>
          <img className="homescreen__image" src={image8} alt="Imagem Mulher" />
        </div>
      )}

      {showProducts && (
        <section className="products-container">
          <div className="homescreen__products">
            {loading ? (
              <h2>Carregando...</h2>
            ) : error ? (
              <h2>{error}</h2>
            ) : (
              productsToShow.map((product) => (
                <Product
                  key={product.id}
                  name={product.title}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.thumbnail}
                  productId={product.id}
                />
              ))
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomeScreen;
