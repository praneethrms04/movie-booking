import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useState } from "react";
import { ROLES } from "../../constants/userRoles";

import "./signup.css";

const Signup = (props) => {
  const { onSignupSumbit, goToLogin } = props;

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState(ROLES.CUSTOMER);

  return (
    <div className="main">
      <div className="form-body-signup">
        <p className="text pt-4">Sign up</p>
        <div className="pe-5">
          <form onSubmit={onSignupSumbit}>
            <div className="">
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
                type="text"
                placeholder="UserName"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="mt-4 dropdown_menu">
                <span className="user">UserType:</span>

                <div>
                  <DropdownButton
                    title={userType}
                    id="userType"
                    variant=""
                    onSelect={(role) => setUserType(role)}
                  >
                    <Dropdown.Item eventKey={ROLES.CUSTOMER}>
                      {ROLES.CUSTOMER}
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={ROLES.CLIENT}>
                      {ROLES.CLIENT}
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>

              <input
                type="submit"
                value="Sign Up"
                className="btn btn-outline-warning"
              />
            </div>
            <div className="login">
              Do you have an account ?
              <a href="#" onClick={goToLogin}>
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
