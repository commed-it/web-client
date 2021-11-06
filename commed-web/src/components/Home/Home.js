import React from 'react';
import './Home.css';
import HomeCategories from './Categories/HomeCategories';
import HomeProducts from './Products/HomeProducts';

function Home(props) {
    return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <HomeCategories />
            <HomeProducts />
        </div>
    );
}

export default Home;