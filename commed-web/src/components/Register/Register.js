import React, { useState } from "react";
import "./Register.css";
import configData from "../../config.json";
import { post } from "../../utils.js";
import lang from "../../lang/cat.json"


function Register(props) {
  const [formResult, setFormResult] = useState(0);
  const [msgError, setMsgError] = useState("");

  const getComponent = () => {
    if (formResult == 0) {
      return <div></div>;
    } else if (formResult == 1) {
      return (
        <div
          class="alert alert-success col-xs-12 col-sm-12 col-md-12 col-lg-12"
          role="alert"
        >
          {lang.register.succesfull}
        </div>
      );
    } else {
      return (
        <div
          class="alert alert-danger col-xs-12 col-sm-12 col-md-12 col-lg-12"
          role="alert"
        >
          {lang.register.error}
          {msgError}
        </div>
      );
    }
  };

  const [username, setUsername] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhone = (event) => {
    let phoneRegex = new RegExp('^[0-9]*$');
    let phoneNumber = event.target.value;
    if (phoneRegex.test(phoneNumber)){
      setPhoneNumber(phoneNumber);
    }
  };

  const [email, setEmail] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const [password, setPassword] = useState("");

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRepeatPassword = (event) => {
    setRepeatPassword(event.target.value);
  };

  const [enterpriseName, setEnterpriseName] = useState("");

  const handleEnterpriseName = (event) => {
    setEnterpriseName(event.target.value);
  };

  const [NIF, setNIF] = useState("");

  const handleNIF = (event) => {
    setNIF(event.target.value);
  };

  const handleRegister = async () => {
    var data = {
      username: username,
      email: email,
      password1: password,
      password2: repeatPassword,
    };
    var result = await post("/auth/registration/", data, false);
    var result_json = await result.json();
    console.log(result_json);
    result = await fetch(configData.SERVER_URL + "/auth/user/", {
      method: "GET",
      headers: {
        Authorization: "Token " + result_json.key,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    var user = await result.json();
    data = {
      owner: user.pk,
      NIF: NIF,
      name: enterpriseName,
      contactInfo: email,
    };
    var result = await post("/enterprise/", data, false);
    if (result.ok) {
      setFormResult(1);
      window.location.reload()
    } else {
      var error_json = await result.json()
      var error_message = "";
      for(var key in error_json) {
        error_message += " "+ key + " : "+ error_json[key];
      }
      setMsgError(error_message);
      setFormResult(-1);
    }
  };

  return (
    <div>
      <div role="document" borderRadius="0.8rem">
        <div className="window ">
          <div className="modal-header text-center">
            <h4 color="#007a6e" className="modal-title w-100 font-weight-bold">
              {lang.register.title}
            </h4>
          </div>
          <div className="text-center">
            <p color="#007a6e" className="modal-title w-100 font-weight-bold">
              {lang.register.text}
            </p>
          </div>
          {getComponent()}
          <div className="modal-body mx-3 border-0">
            <div class="md-form mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#ced4da"
                class="bi bi-person-fill icons"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <input
                type="text"
                id="defaultForm-username"
                class="inputs form-control validate"
                placeholder={lang.register.fields.username}
                onChange={handleUsername}
                value={username}
              ></input>
            </div>
            <div class="md-form mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#ced4da"
                class="bi bi-telephone-fill icons"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                />
              </svg>
              <input
                type="text"
                id="defaultForm-number"
                class="inputs form-control validate"
                placeholder={lang.register.fields.phone}
                onChange={handlePhone}
                value={phoneNumber}
              ></input>
            </div>
            <div className="md-form mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#ced4da"
                class="bi bi-envelope icons"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                />
              </svg>
              <input
                type="email"
                id="defaultForm-email"
                className="inputs form-control validate"
                placeholder={lang.register.fields.email}
                onChange={handleEmail}
                value={email}
              />
            </div>

            <div className="md-form mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#ced4da"
                class="bi bi-lock-fill icons"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
              <input
                type="password"
                id="defaultForm-pass"
                className="inputs form-control validate"
                placeholder={lang.register.fields.password}
                onChange={handlePassword}
                value={password}
              />
              <label
                data-error="wrong"
                data-success="right"
                htmlFor="defaultForm-pass"
              ></label>
            </div>
            <div className="md-form mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#ced4da"
                class="bi bi-lock-fill icons"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
              <input
                type="password"
                id="defaultForm-pass"
                className="inputs form-control validate"
                placeholder={lang.register.fields.conf_password}
                onChange={handleRepeatPassword}
                value={repeatPassword}
              />
              <label
                data-error="wrong"
                data-success="right"
                htmlFor="defaultForm-pass"
              ></label>
            </div>
            <div class="md-form mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#ced4da"
                class="bi bi-sticky-fill icons"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1h-11zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177V9.5z" />
              </svg>
              <input
                type="text"
                id="defaultForm-number"
                class="inputs form-control validate"
                placeholder={lang.register.fields.enterprise_name}
                onChange={handleEnterpriseName}
                value={enterpriseName}
              ></input>
            </div>
            <div class="md-form mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#ced4da"
                class="bi bi-person-badge-fill icons"
                viewBox="0 0 16 16"
              >
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z" />
              </svg>
              <input
                type="text"
                id="defaultForm-number"
                class="inputs form-control validate"
                placeholder={lang.register.fields.nif}
                onChange={handleNIF}
                value={NIF}
              ></input>
            </div>
          </div>
          {getComponent()}
          <div className="modal-footer d-flex justify-content-center">
            <button
              className="registerButton btn btn-default"
              type="submit"
              onClick={handleRegister}
            >
              {lang.register.signup}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
