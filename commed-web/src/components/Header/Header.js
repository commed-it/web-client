import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div className="row d-flex flex-row customNavBar ">
      <div height="50" className="center col-xs-12 col-sm-12 col-md-2 col-lg-1">
        <img
          src="logo_white.png"
          width="50"
          height="50"
          className="d-inline align-top"
        ></img>
        <div className="navbar-text title">Commed</div>
      </div>
      <div className="searchBar col-xs-12 col-sm-12 col-md-7 col-lg-8">
        <form class=" d-flex col-xs-8 col-sm-8 col-md-8 col-lg-8">
          <div className="inputField">
            <input
              class="inputField form-control form-control-sm col-xs-8 col-sm-8 col-md-8 col-lg-8 rounded-pill ml-auto mr-auto"
              type="search"
              placeholder="Search"
              aria-label="Search"
              padding-left="30px"
            ></input>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#40414F"
              class="searchIcon bi bi-search justify-content-center align-self-center"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            </svg>
          </div>
        </form>
      </div>
      <div className="center col-xs-12 col-sm-12 col-md-3 col-lg-3 d-flex justify-content-end">
        <button class="button btn btn-sm btn-outline-light col-xs-6 col-sm-6 col-md-5 col-lg-4 rounded-pill d-flex justify-content-center align-self-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="icon bi bi-box-arrow-in-right justify-content-center align-self-center"
            viewBox="0 0 18 18"
          >
            <path
              fill-rule="evenodd"
              d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
            />
            <path
              fill-rule="evenodd"
              d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
            />
          </svg>
          Log in
        </button>
        <button class="button btn btn-sm btn-outline-light col-xs-6 col-sm-6 col-md-5 col-lg-4 rounded-pill d-flex justify-content-center align-self-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="icon bi bi-person-plus justify-content-center align-self-center"
            viewBox="0 0 18 18"
          >
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            <path
              fill-rule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
            />
          </svg>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Header;
