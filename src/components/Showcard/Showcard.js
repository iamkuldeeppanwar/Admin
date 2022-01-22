import React, { useEffect } from "react";
import axios from "axios";
import Products from "../Products/Products";
import "./Showcard.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

function Showcard() {
  const Navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState("");
  useEffect(() => {
    if (localStorage.getItem("Authorization")) {
      axios.get(`https://fakestoreapi.com/products`).then((products) => {
        if (products) {
          setProducts(products.data);
        } else {
          setError("Product not found!");
        }
      });
    } else {
      Navigate("/");
    }
  }, []);
  return (
    <>
      <Header />
      <div className="card-container">
        {error && <p>{error}</p>}
        {products.map((items) => {
          return (
            <div className="Card">
              <Products
                key={items.id}
                image={items.image}
                price={items.price}
                description={items.description}
                title={items.category}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Showcard;
