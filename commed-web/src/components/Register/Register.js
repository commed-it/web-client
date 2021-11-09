import React, { useState } from "react";
import "./Register.css";
import configData from '../../config.json';

function Register(props) {

  const [formResult, setFormResult] = useState(0);

  const getComponent = () => {
    if (formResult == 0 ){
      return (<div></div>);
    }else if(formResult == 1){
      return (
        <div class="alert alert-success col-xs-12 col-sm-12 col-md-12 col-lg-12" role="alert">
          You have registered successfully!! Go back to Login into the application! :)
        </div>
      );
    }else{
      return (
        <div class="alert alert-danger col-xs-12 col-sm-12 col-md-12 col-lg-12" role="alert">
          Invalid registration.
        </div>
      );
    }
  }

  const [username, setUsername] = useState('');

  const handleUsername= (event) => {
    setUsername(event.target.value);
  }

  const [phoneNumber, setPhoneNumber] = useState('');
  
  const handlePhone= (event) => {
    setPhoneNumber(event.target.value);
  }

  const [email, setEmail] = useState('');

  const handleEmail= (event) => {
    setEmail(event.target.value);
  }

  const [password, setPassword] = useState('');

  const handlePassword= (event) => {
    setPassword(event.target.value);
  }

  const [repeatPassword, setRepeatPassword] = useState('');

  const handleRepeatPassword= (event) => {
    setRepeatPassword(event.target.value);
  }

  const handleRegister = async () => {
    var data={
      'username' : username,
      'email' : email,
      'password1' : password,
      'password2' : repeatPassword
    };
    const result = await fetch(configData.SERVER_URL+"/auth/registration/",
    {
        method : 'POST',
        body : JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    });
    if (result.ok){
      setFormResult(1);
    }else{
      setFormResult(-1);
    }
    props.close();
  }

  return (
    <div>
    <div role="document" borderRadius="0.8rem">
      <div className="window ">
        <div className="modal-header text-center">
          <h4 color="#007a6e" className="modal-title w-100 font-weight-bold">
            Welcome!
          </h4>
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
              placeholder="Username"
              onChange={handleUsername}
              value = {username}
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
              placeholder="Phone number"
              onChange={handlePhone}
              value = {phoneNumber}
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
              placeholder="Email"
              onChange={handleEmail}
              value = {email}
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
              placeholder="Password"
              onChange={handlePassword}
              value = {password}
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
              placeholder="Confirm password"
              onChange={handleRepeatPassword}
              value = {repeatPassword}
            />
            <label
              data-error="wrong"
              data-success="right"
              htmlFor="defaultForm-pass"
            ></label>
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button className="registerButton btn btn-default" type="submit" onClick={handleRegister}>Sign up</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;
