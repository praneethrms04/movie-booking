import React from "react";
import { useState } from "react";
import "./login.css";

const Login = (props) => {
  const { onLoginSumbit, goToSignup } = props;
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="main">
      <div className="form-body">
        <p className="text pt-4">User Login</p>
        <div className="pe-5">
        <form onSubmit={onLoginSumbit}>
          <div>
            <input
              type="text"
              placeholder="User Id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="btn btn-outline-warning"
              type="submit"
              value="Log In"
            />
          </div>
          <div className="signup">
            You Don't have an account ?
            <a href="#" onClick={goToSignup}>
              Signup
            </a>
          </div>
        </form>
        </div>
       
      </div>
    </div>
  );
};

export default Login;
