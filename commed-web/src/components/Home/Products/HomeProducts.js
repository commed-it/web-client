import React from "react";
import "./HomeProducts.css";
import configData from "../../../config.json";
import { sessionService } from "redux-react-session";

function HomeProducts(props) {
  const [products, setProducts] = React.useState([]);

  const getProducts = async () => {
    const result = await fetch(configData.SERVER_URL + "/product/", {
      method: "GET",
    });
    const result_json = await result.json();
    setProducts(result_json);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 row d-flex productsDiv">
      {products &&
        products.map((product) => {
          return (
            <div class="card col-xs-12 col-sm-6 col-md-4 col-lg-3 productCard ">
              <img
                class="card-img-top"
                src={product.images[0].image}
                alt="Product Card Image"
              ></img>
              <div class="d-flex flex-column card-body">
                <h5 class="card-title">{product.title}</h5>
                <p class="card-text">{product.description}</p>
                <a href="#" class="buttonProduct mt-auto btn btn-primary">
                  Go to product
                </a>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default HomeProducts;
