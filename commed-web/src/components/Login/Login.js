import React, { useState } from "react";
import "./Login.css";
import configData from "../../config.json";
import { sessionService } from 'redux-react-session';


function Login() {

  const [username, setUsername] = useState('');

  const handleUsername= (event) => {
    setUsername(event.target.value);
  }

  const [password, setPassword] = useState('');
  
  const handlePassword= (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = async () => {
    var data={
      'username' : username,
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
              class="bi bi-person-fill icons"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
              <input
                type="text"
                id="username"
                className="inputs form-control validate"
                placeholder="Username"
                value={username}
                onChange={handleUsername}
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
