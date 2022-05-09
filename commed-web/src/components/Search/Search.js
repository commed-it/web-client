import React from "react";
import { post, untilTherteeChars } from "../../utils.js";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "./Search.css";
import "../Home/Home.css";
import configData from "../../config.json";
import lang from "../../lang/cat.json"


function Search(props) {
  const navigate = useNavigate();

  const param = useParams();

  const [products, setProducts] = React.useState(0);

  const getProducts = async () => {
    var data = {
      tags: [
        {
          name: param.search ? param.search : "all",
        },
      ],
      location: {
        longitude: 0,
        latitude: 0,
        distance_km: 300,
      },
    };
    const result = await post("/product/search/", data, false);
    const result_json = await result.json();
    setProducts(result_json);
    console.log(result_json);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  const handleVisitProduct = (product) => {
    navigate({ pathname: "/product/" + product });
  };

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 row topDiv">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-self-top searchTitle">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-self-center home-subtitle">
          { products.length != 0 &&
            <div>
             {lang.search.results} {}: "{param.search}"
            </div>
          }
          { products.length === 0 &&
            <div>
              {lang.search.nothing}: "{param.search}"
            </div>
          }
        </div>
        
      </div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 row productsDiv">
        {products &&
          products.map((product) => {
            return (
              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 outCard">
                <div class="card col-xs-12 col-sm-12 col-md-12 col-lg-12 productCard">
                  <Carousel>
                    {product.images &&
                      product.images.map((image) => {
                        return (
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={configData.SERVER_URL + image.image}
                            />
                          </Carousel.Item>
                        );
                      })}
                  </Carousel>
                  <div class="d-flex flex-column card-body">
                    <h5 class="card-title">{product.title}</h5>
                    <p class="card-text">
                      {product.description.length > 47
                        ? product.description.substring(0, 47) + "..."
                        : untilTherteeChars(product.description)}
                    </p>
                    <button
                      class="buttonProduct mt-auto btn btn-primary"
                      onClick={() => handleVisitProduct(product.id)}
                    >
                      {lang.search.product}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
}

export default Search;
