import React from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import { get } from "../../utils.js";
import ProfileProduct from "./ProfileProduct/ProfileProduct";

function Profile(props) {
  const { userId } = useParams();

  const [userDetails, setUserDetails] = React.useState([]);
  const [profile, setProfile] = React.useState(false);
  const [enterpriseDetails, setEnterpriseDetails] = React.useState([]);

  const handleOpenProfile = () => {
    setProfile(true);
  };

  const handleOpenProducts = () => {
    setProfile(false);
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

  React.useEffect(() => {
    getUserDetails();
    getEnterpriseDetails();
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
        <button className="flaps" onClick={handleOpenProducts}>
          Formal Offers
        </button>
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
      {!profile && <ProfileProduct></ProfileProduct>}
    </div>
  );
}

export default Profile;
