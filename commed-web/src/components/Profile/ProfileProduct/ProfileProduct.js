import "../Profile.css";
import "./ProfileProduct.css";
import { get } from "../../../utils";
import { useParams } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProfileProduct(props) {
  const { userId } = useParams();
  const [enterpriseDetails, setEnterpriseDetails] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const navigate = useNavigate();
  const getProducts = async () => {
    const result = await get("/product/", false);
    const result_json = await result.json();
    setProducts(result_json);
    console.log(result_json);
  };

  const getEnterpriseDetails = async () => {
    const result = await get("/enterprise/user/" + userId, false);
    const result_json = await result.json();
    console.log(result_json);
    setEnterpriseDetails(result_json);
  };
  const handleVisitProduct = (product) => {
    navigate({ pathname: "/product/" + product });
  };

  React.useEffect(() => {
    getEnterpriseDetails();
    getProducts();
  }, []);
  return (
    <div>
      <div>
        <div className="container3">
          <div className="top3">
            {products &&
              products
                .filter((product) => product.owner === enterpriseDetails.owner)
                .map((product) => {
                  return (
                    <div class="card col-xs-12 col-sm-6 col-md-4 col-lg-3 productCard2">
                      <h6>{enterpriseDetails.name}</h6>
                      {product.images && (
                        <img
                          class="card-img-top"
                          src={() => product.images[0].image}
                          alt="Product Card Image"
                        ></img>
                      )}
                      <div class="d-flex flex-column card-body">
                        <h5 class="card-title">{product.title}</h5>
                        <p class="card-text">{product.description}</p>
                      </div>
                      <button
                        class="buttonProduct mt-auto btn btn-primary"
                        onClick={() => handleVisitProduct(product.id)}
                      >
                        Go to product
                      </button>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileProduct;
