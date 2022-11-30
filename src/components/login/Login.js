import React from "react";
import { useState } from "react";
import "./login.css";

const Login = (props) => {
  const { onLoginSumbit, goToSignup,loginMessage, loginErrorMessage } = props;
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = () => {
    const data = { userId, password };
    onLoginSumbit(data);
  };

  return (
    <div className="main">
      <div className="form-body">
        <p className="text pt-4">User Login</p>
        <div className="pe-5">
          <form onSubmit={handleSubmit}>
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
            <div className="text-danger pt-2 ms-4">
            {loginErrorMessage}
            </div>
            <div className="text-success pt-2 ms-4">
            {loginMessage}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
