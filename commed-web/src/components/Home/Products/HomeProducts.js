import React from "react";
import "./HomeProducts.css";
import configData from "../../../config.json";
import { sessionService } from "redux-react-session";
import { useNavigate } from "react-router-dom";
import { get, untilTherteeChars, post } from "../../../utils.js";
import useGeolocation from "react-hook-geolocation";
import { Carousel } from "react-bootstrap";
import lang from "../../../lang/cat.json"

function HomeProducts(props) {
  const navigate = useNavigate();

  const [products, setProducts] = React.useState([]);
  const [recommendedProducts, setRecommendedProducts] = React.useState([]);
  const [userLatitude, setLatitude] = React.useState(0);
  const [userLongitude, setLongitude] = React.useState(0);
  var latitude = 0;
  var longitude = 0;

  const getProducts = async () => {
    const result = await get("/product/", false);
    const result_json = await result.json();
    setProducts(result_json);
    console.log(result_json);
    console.log("I am a loser!");
  };

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      console.log("I am first!");
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(" My latitude " + latitude);
      console.log(" My longitude " + longitude);
    });
  };

  const getRecommendedProducts = async () => {
    var data = {
      location: {
        longitude: longitude,
        latitude: latitude,
        distance_km: 200,
      },
    };
    const result = await post("/product/recomendation/", data, false);

    const result_json = await result.json();
    console.log("wtf " + result_json);
    setRecommendedProducts(result_json);
  };

  React.useEffect(() => {
    getLocation();
    getProducts();
    getRecommendedProducts();
  }, []);

  const handleVisitProduct = (product) => {
    navigate({ pathname: "/product/" + product });
  };

  return (
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
                            className="carouselImage d-block w-100"
                            src={image.image}
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
                    {lang.home.products.btn}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default HomeProducts;
