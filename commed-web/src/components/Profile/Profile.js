import React from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import { get } from "../../utils.js";

function Profile(props) {
  const { userId } = useParams();

  const [userDetails, setUserDetails] = React.useState([]);

  const getUserDetails = async () => {
    const result = await get("/user/" + userId + "/", false);
    const result_json = await result.json();
    console.log(result_json);
    setUserDetails(result_json);
  };

  React.useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="parent3">
      <div className="container3">
        <div className="top1">top</div>
        <img
          className=" col-xs-12 col-sm-12 col-md-12 col-lg-12 image3"
          alt="Profile image"
          src={() => userDetails.images[0].image}
        ></img>
        <div className="bottom1">bottom</div>
      </div>
      <div className="decription3">
        <h5>Description</h5>
        <p>sheeeeeeeeeshe</p>
      </div>
      Hello From Profile {userId}!
    </div>
  );
}

export default Profile;
