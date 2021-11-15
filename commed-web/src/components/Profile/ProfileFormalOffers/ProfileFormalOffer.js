import React from "react";
import "./ProfileFormalOffer.css";
import "../Profile.css";
import "../ProfileProduct/ProfileProduct.css";
import { get } from "../../../utils";

function ProfileFormalOffer(props) {
  const [formalOffers, setFormalOffers] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [logedUser, setLogedUser] = React.useState(false);
  const getFormalOffers = async () => {
    const result = await get("/offer/encounter/", false);
    const result_json = await result.json();
    setFormalOffers(result_json);
    console.log(result_json);
  };

  const getLoggedUser = async () => {
    const result = await get("/auth/user/", true);
    const result_json = await result.json();
    setLogedUser(result_json);
  };

  const getProducts = async () => {
    const result = await get("/product/", false);
    const result_json = await result.json();
    setProducts(result_json);
    console.log(result_json);
  };

  React.useEffect(() => {
    getFormalOffers();
    getLoggedUser();
    getProducts();
  }, []);

  return (
    <div>
      <div className="container3">
        <div className="top4">
          {formalOffers &&
            formalOffers
              .filter((formalOffer) => formalOffer.client === logedUser.pk)
              .map((formalOffer) => {
                return (
                  <div class="card col-xs-12 col-sm-6 col-md-4 col-lg-3 productCard3">
                    <h6>
                      {logedUser.username} (Product:{" "}
                      {() => products[formalOffer.product - 1].title}, Owner:{" "}
                      {() => products[formalOffer.product - 1].owner} )
                    </h6>

                    <button class="buttonProduct2 mt-auto btn btn-primary">
                      View details
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default ProfileFormalOffer;
