import React from "react";
import "./ProfileFormalOffer.css";
import "../Profile.css";
import "../ProfileProduct/ProfileProduct.css";
import { get } from "../../../utils";
import { useParams } from "react-router-dom";

function ProfileFormalOffer(props) {
  const [encounter, setEncounter] = React.useState("");
  const [formalOffers, setFormalOffers] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [logedUser, setLogedUser] = React.useState(false);
  const { userId } = useParams();

  const getLoggedUser = async () => {
    const result = await get("/auth/user/", true);
    const result_json = await result.json();
    setLogedUser(result_json);
  };

  const getFormalOffers = async () => {
    const result = await get("/offer/formaloffer/user/" + userId, true);
    const result_json = await result.json();
    setFormalOffers(result_json);
  };

  React.useEffect(() => {
    getFormalOffers();

    getLoggedUser();
  }, []);

  return (
    <div>
      <div className="container3">
        <div className="top4">
          {formalOffers &&
            formalOffers.map((formalOffer) => {
              return (
                <div class="card col-xs-12 col-sm-6 col-md-4 col-lg-3 productCard3">
                  <h6>
                    (Version: {formalOffer.version}, Contract:{" "}
                    {formalOffer.contract} )
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
