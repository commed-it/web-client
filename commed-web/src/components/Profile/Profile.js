import React from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import { get } from "../../utils.js";
import ProfileProduct from "./ProfileProduct/ProfileProduct";
import ProfileFormalOffer from "./ProfileFormalOffers/ProfileFormalOffer";

function Profile(props) {
  const { userId } = useParams();

  const [logedUser, setLogedUser] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState(false);
  const [profile, setProfile] = React.useState(true);
  const [products, setProducts] = React.useState(false);
  const [formalOffers, setFormalOffers] = React.useState(false);
  const [enterpriseDetails, setEnterpriseDetails] = React.useState([]);

  const handleOpenProfile = () => {
    setProfile(true);
    setProducts(false);
    setFormalOffers(false);
  };

  const handleOpenProducts = () => {
    setProfile(false);
    setProducts(true);
    setFormalOffers(false);
  };
  const handleOpenFormalOffers = () => {
    setProfile(false);
    setProducts(false);
    setFormalOffers(true);
  };
  const getUserDetails = async () => {
    const result = await get("/user/" + userId + "/", false);
    const result_json = await result.json();
    console.log(result_json);
    setUserDetails(result_json);
  };

  const getEnterpriseDetails = async () => {
    const result = await get("/enterprise/user/" + userId, false);
    const result_json = await result.json();
    console.log(result_json);
    setEnterpriseDetails(result_json);
  };

  const getLoggedUser = async () => {
    const result = await get("/auth/user/", true);
    const result_json = await result.json();
    setLogedUser(result_json);
  };

  React.useEffect(() => {
    getUserDetails();
    getEnterpriseDetails();
    getLoggedUser();
  }, []);

  return (
    <div className="parent3">
      <div className="flapContainer">
        <button className="flaps" onClick={handleOpenProfile}>
          Profile
        </button>
        <button className="flaps" onClick={handleOpenProducts}>
          Product
        </button>
        {enterpriseDetails.owner == logedUser.pk &&
          enterpriseDetails.owner != undefined &&
          logedUser.pk != undefined && (
            <button className="flaps" onClick={handleOpenFormalOffers}>
              Formal Offers
            </button>
          )}
      </div>
      {profile && (
        <div className="centering">
          <div className="container3">
            <div className="top1"></div>
            <img
              className=" col-xs-12 col-sm-12 col-md-12 col-lg-12 image3"
              alt="Profile image"
              src="https://images-na.ssl-images-amazon.com/images/I/81-yKbVND-L.png"
            ></img>
            <div className="bottom1">
              <h3>{enterpriseDetails.name}</h3>
              <h6>Info: {enterpriseDetails.contactInfo}</h6>
            </div>
          </div>
          <div className="decription3 centering">
            <h5>Description</h5>
            <p>{enterpriseDetails.description}</p>
          </div>
        </div>
      )}
      {products && <ProfileProduct></ProfileProduct>}
      {formalOffers && <ProfileFormalOffer></ProfileFormalOffer>}
    </div>
  );
}

export default Profile;
