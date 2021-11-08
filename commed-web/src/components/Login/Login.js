import React, { useState } from "react";
import "./Login.css";
import configData from "../../config.json";
import { sessionService } from 'redux-react-session';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail= (event) => {
    setEmail(event.target.value);
  }
  
  const handlePassword= (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = async () => {
    var data={
      'email' : email,
      'username' : 'quimpm99',
      'password' : password
    };
    const result = await fetch(configData.SERVER_URL+"/auth/login/",
    {
        method : 'POST',
        body : JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    });
    const result_json = await result.json();
    sessionService.saveSession(result_json);
  }

  return (
    <form onSubmit={handleLogin}>
      <div role="document" borderRadius="0.8rem">
        <div className="window ">
          <div className="modal-header text-center">
            <h4 color="#007a6e" className="modal-title w-100 font-weight-bold">
              Welcome back!
            </h4>
          </div>
          <div className="modal-body mx-3 border-0">
            <div className="md-form mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#ced4da"
                class="bi bi-envelope icons"
                viewBox="0 0 16 16"
                style={{ top: "17px" }}
              >
                <path
                  fill-rule="evenodd"
                  d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                />
              </svg>
              <input
                type="email"
                id="email"
                className="inputs form-control validate"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
              />
              <label
                data-error="wrong"
                data-success="right"
                htmlFor="defaultForm-email"
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
                id="password"
                className="inputs form-control validate"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
              <label
                data-error="wrong"
                data-success="right"
                htmlFor="defaultForm-pass"
              ></label>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button className="loginButton btn btn-default" type="submit">Login</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
