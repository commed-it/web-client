import React from "react";
import "./HomeProducts.css";
import configData from "../../../config.json";
import { sessionService } from 'redux-react-session'
import { useNavigate } from 'react-router-dom';
import { get } from '../../../utils.js';



function HomeProducts(props) {

  const navigate = useNavigate();

  const [products, setProducts] = React.useState([]);

  const getProducts = async () => {
    const result = await get('/product/', false);
    const result_json = await result.json();
    setProducts(result_json);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  const handleVisitProduct = (product) => {
    navigate({ pathname: '/product/'+product });
  }


  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 row d-flex productsDiv">
      {products &&
        products.map((product) => {
          return (
            <div class="card col-xs-12 col-sm-6 col-md-4 col-lg-3 productCard">
              { product.images &&
                <img
                class="card-img-top"
                src={() => product.images[0].image}
                alt="Product Card Image"
                ></img>
              }
              <div class="d-flex flex-column card-body">
                <h5 class="card-title">{product.title}</h5>
                <p class="card-text">{product.description}</p>
                <button  class="buttonProduct mt-auto btn btn-primary" onClick={() => handleVisitProduct(product.id)}>
                  Go to product
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default HomeProducts;
