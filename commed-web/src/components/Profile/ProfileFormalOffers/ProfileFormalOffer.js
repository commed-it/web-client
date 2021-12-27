import React from "react";
import "./ProfileFormalOffer.css";
import "../Profile.css";
import "../ProfileProduct/ProfileProduct.css";
import { get } from "../../../utils";
import { useParams } from "react-router-dom";
import configData from '../../../config.json';

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
    const result = await get("/offer/formaloffer/fromUser/" + userId, true);
    const result_json = await result.json();
    setFormalOffers(result_json);
  };

  React.useEffect(() => {
    getFormalOffers();

    getLoggedUser();
  }, []);

  return (
    <div>
      <div className="container4">
        <div className="top4">
          {formalOffers &&
            formalOffers.map((formalOffer) => {
              return (
                <div className="card col-xs-12 col-sm-6 col-md-4 col-lg-3 productCard3">
                  <div className="col-xs-3 col-sm-3 col-md-2 col-lg-1">
                    <img height="75px" width="75px" src={configData.SERVER_URL + formalOffer.product.images[0].image}></img>
                  </div>
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-3 align-self-center">
                    {formalOffer.product.title} - {formalOffer.theOtherClient.name} - version: {formalOffer.formalOffer.version}
                  </div>
                  <div className="col-xs-4 col-sm-4 col-md-5 col-lg-8 d-flex justify-content-end align-self-center">
                    <a href={configData.SERVER_URL + formalOffer.formalOffer.pdf}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-earmark-medical" viewBox="0 0 16 16">
                        <path d="M7.5 5.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L6 7l-.549.317a.5.5 0 1 0 .5.866l.549-.317V8.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L8 7l.549-.317a.5.5 0 1 0-.5-.866l-.549.317V5.5zm-2 4.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                      </svg>
                      { (formalOffer.formalOffer.state === "SI")  &&
                        <span class="badge bg-success">Signed</span>
                      }
                    { (formalOffer.formalOffer.state == "NS") &&
                        <span class="badge rounded-pill bg-warning text-dark">Pending</span>
                      }
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ProfileFormalOffer;
