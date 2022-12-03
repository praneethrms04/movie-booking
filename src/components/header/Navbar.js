import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const userLoggedin = localStorage.getItem("accessToken");

  const goToLogin = () => {
    navigate("/login");
  };
  const goToSignup = ()=>{
    localStorage.clear()
    // window.location.search ==  "referrer=home"
    navigate("/login?referrer=home")
  }
  return (
    <>
      <div className="navbar bg-dark text-white">
        <div className="ms-4 fs-2 fw-bolder">
          BookMyShow <i className="bi bi-film"></i>
        </div>
        {userLoggedin ? (
          <div>
            <button className="loginbtn" onClick={goToLogin}>
              Login <i className="bi bi-box-arrow-in-left"></i>
            </button>
          </div>
        ) : (
          <div>
            <button className="loginbtn" onClick={goToSignup} >
              logOut <i className="bi bi-box-arrow-in-right"></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
