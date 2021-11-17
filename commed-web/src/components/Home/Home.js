import React from "react";
import "./Home.css";
import HomeCategories from "./Categories/HomeCategories";
import HomeProducts from "./Products/HomeProducts";

function Home(props) {
  return (
    <div className="topDiv col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div className="divOpacity">
        <HomeCategories />
        <HomeProducts />
      </div>
    </div>
  );
}

export default Home;
