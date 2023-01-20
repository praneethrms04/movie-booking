import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
const Navbar = (props) => {
  const {filterMoviesBySearch, hideSearch} = props

  const [searchtext, setSearchText] = useState("")
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
  const searchFunction =(e)=>{
    e.preventDefault();
    console.log(searchtext)
    filterMoviesBySearch(searchtext);

  }
  return (
    <>
      <div className="navbar bg-dark text-white">
        <div className="ms-4 fs-2 fw-bolder">
          BookMyShow <i className="bi bi-film"></i>
        </div>
        { hideSearch &&
        <form className="d-flex pb-3" onSubmit={searchFunction}>
          <input type="text" className="rounded" value={searchtext} placeholder="search movie" onChange={e => setSearchText(e.target.value)}/>
          <button  className="btn btn-light btn-sm p-1 w-25 rounded ms-2 mt-4">search</button>
        </form>
        }
        { userLoggedin ? (
          <div>
            <button className="loginbtn" onClick={goToSignup} >
              logOut <i className="bi bi-box-arrow-in-right"></i>
            </button>
          </div>
          
        ) : (
          <div>
            <button className="loginbtn" onClick={goToLogin}>
              Login <i className="bi bi-box-arrow-in-left"></i>
            </button>
          </div>
          
        )}
      </div>
    </>
  );
};

export default Navbar;
