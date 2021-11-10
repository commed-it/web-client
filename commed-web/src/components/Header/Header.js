import React from "react";
import "./Header.css";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Modal } from "react-bootstrap";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { sessionService } from 'redux-react-session';
import  { sessionExist }  from '../../utils.js';

function Header(props) {
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseLogin = () => {
    console.log(show);
    setShow(false);
    console.log(show);
  };
  const handleShowLogin = () => {
    console.log(show);
    setShow(true);
    console.log(show);
  };
  const handleCloseRegister = () => {
    console.log(show);
    setShowRegister(false);
    console.log(show);
  };
  const handleShowRegister = () => {
    console.log(show);
    setShowRegister(true);
    console.log(show);
  };
  const handleLogOut = () => {
    sessionService.deleteSession();
    window.location.reload();
  };

  return (
    <div className="row d-flex flex-row customNavBar sticky-top ">
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
        <form className=" d-flex col-xs-8 col-sm-8 col-md-8 col-lg-8">
          <div className="inputField">
            <input
              className="inputField form-control form-control-sm col-xs-8 col-sm-8 col-md-8 col-lg-8 rounded-pill ml-auto mr-auto"
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
              className="searchIcon bi bi-search justify-content-center align-self-center"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            </svg>
          </div>
        </form>
      </div>
      {!sessionExist() && (
        <div className="center col-xs-12 col-sm-12 col-md-3 col-lg-3 d-flex justify-content-end">
          <button
            className="button btn btn-sm btn-outline-light col-xs-6 col-sm-6 col-md-5 col-lg-4 rounded-pill d-flex justify-content-center align-self-center"
            variant="primary"
            onClick={handleShowLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="icon bi bi-box-arrow-in-right justify-content-center align-self-center"
              viewBox="0 0 18 18"
            >
              <path
                fillRule="evenodd"
                d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
              />
              <path
                fillRule="evenodd"
                d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
            <a
              style={{ color: "white", textDecoration: "none" }}
              data-toggle="modal"
              data-target="#modalLoginForm"
            >
              Log in
            </a>
          </button>
          <button
            onClick={handleShowRegister}
            className="button btn btn-sm btn-outline-light col-xs-6 col-sm-6 col-md-5 col-lg-4 rounded-pill d-flex justify-content-center align-self-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="icon bi bi-person-plus justify-content-center align-self-center"
              viewBox="0 0 18 18"
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              <path
                fillRule="evenodd"
                d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
              />
            </svg>
            <a
              style={{ color: "white", textDecoration: "none" }}
              data-toggle="modal"
              data-target="#modalRegisterForm"
            >
              Sign Up
            </a>
          </button>
        </div>
      )}
      {sessionExist() && (
        <div className="center col-xs-12 col-sm-12 col-md-3 col-lg-3 d-flex justify-content-end">
          <button className="button btn btn-sm btn-outline-light col-xs-6 col-sm-6 col-md-5 col-lg-4 rounded-pill d-flex justify-content-center align-self-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chat-dots icon"
              viewBox="0 0 16 16"
            >
              <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
            </svg>
            <a style={{ color: "white", textDecoration: "none" }}>Chat</a>
          </button>
          <button className="button btn btn-sm btn-outline-light col-xs-6 col-sm-6 col-md-5 col-lg-4 rounded-pill d-flex justify-content-center align-self-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ffffff"
              class="bi bi-plus-circle-fill icon"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
            <a style={{ color: "white", textDecoration: "none" }}>Product</a>
          </button>
          <button
            onClick={handleLogOut}
            className="button btn btn-sm btn-outline-light col-xs-6 col-sm-6 col-md-5 col-lg-4 rounded-pill d-flex justify-content-center align-self-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-box-arrow-right icon"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
            <a
              style={{ color: "white", textDecoration: "none" }}
              data-toggle="modal"
              data-target="#modalRegisterForm"
            >
              Log Out
            </a>
          </button>
        </div>
      )}
      <Modal
        show={showRegister}
        onHide={handleCloseRegister}
        id="modalRegisterForm"
        role="dialog"
        aria-labelledby="myModalLabel"
        width="50%"
      >
        <Register close={handleCloseRegister}></Register>
      </Modal>
      <Modal
        show={show}
        onHide={handleCloseLogin}
        id="modalLoginForm"
        role="dialog"
        aria-labelledby="myModalLabel"
        width="50%"
      >
        <Login close={handleCloseLogin}></Login>
      </Modal>
    </div>
  );
}

export default Header;
