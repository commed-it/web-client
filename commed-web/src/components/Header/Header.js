import React from 'react';
import './Header.css';

function Header(props) {
    return (
        <div className = "Header row d-flex flex-row customNavBar ustify-content-start">
            <div height="50" className="center col-xs-12 col-sm-12 col-md-2 col-lg-1">
                <img src="logo_white.png" width="50" height="50" className="d-inline align-top" ></img>
                <div className="navbar-text title">
                    Commed
                </div>
            </div>
            <div className="center col-xs-12 col-sm-12 col-md-7 col-lg-8">
                <form class="d-flex col-xs-12 col-sm-12 col-md-12 col-lg-12"> 
                    <input class="form-control col-xs-10 col-sm-10 col-md-10 col-lg-10" type="search" placeholder="Search" aria-label="Search"></input> 
                    <button class="btn btn-outline-light col-xs-2 col-sm-2 col-md-2 col-lg-1" type="submit">Search</button> 
                </form>
            </div>
            <div className="center col-xs-12 col-sm-12 col-md-3 col-lg-3 d-flex justify-content-end">
                <button class="btn btn-outline-light col-xs-6 col-sm-6 col-md-5 col-lg-4">Log in</button> 
                <button class="btn btn-outline-light col-xs-6 col-sm-6 col-md-5 col-lg-4">Sign Up</button> 
            </div>
        </div>
    );
}

export default Header;

