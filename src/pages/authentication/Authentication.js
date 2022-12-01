import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../components/login/Login";
import Signup from "../../components/signup/Signup";
import { userSignin, newUserSignup } from "../../api/auth.js";
import { userDetails } from "../../utils/userDetails";
import { ROLES } from "../../constants/userRoles";
import "./authentication.css";

const Authentication = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [errorMessage, setLoginErrorMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [errorMessageSignup, setErrorMessageSignup] = useState("");

  const navigate = useNavigate();

  const gotoLogin = () => {
    setShowSignup(false);
  };

  const gotoSignup = () => {
    setShowSignup(true);
  };

  const redirectToPage = (userType) => {
    if (userType === ROLES.CUSTOMER) {
      navigate("/");
    } else if (userType === ROLES.CLIENT) {
      navigate("/client");
    } else {
      navigate("/admin");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const userType = localStorage.getItem("userTypes");
      redirectToPage(userType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoginSubmit = (data) => {
    console.log(data);
    userSignin(data)
      .then((res) => {
        const { status, message, data } = res;
        if (status === 200) {
          if (message) {
            // case when login credentials are incorrect
            setLoginErrorMessage(message);
          } else {
            // success when api passes with corect credentials
            // store user data in the localstorage
            userDetails(data);
            // navigate to the correct page on login based on user type
            const userType = data.userTypes;
            redirectToPage(userType);
          }
        }
      })
      .catch((err) => {
        // case when api fails due to network/auth issue
        setLoginErrorMessage(err?.response?.data?.message || err?.message);
      });
    // 1. make an api call and post the data to signup
    // 2. if api call is successful, redirect to login page
    // 3. show a message to user that login is successful

    // if submit is success

    // if it is failure
  };

  const handleSignupSubmit = (data) => {
    // console.log(data);
    newUserSignup(data)
      .then((res) => {
        // console.log(res);
        if (res.status === 201) {
          // console.log("hello")
          setShowSignup(false);
          setLoginMessage("Sign up SuccessFul..! Please Login");
        } else if (res.message) {
          setErrorMessageSignup(res.message);
        }
      })
      .catch((error) => {
        setErrorMessageSignup(error?.response?.data?.message || error?.message);
      });

    // 1. make an api call and post the data
    // 2. if api call is successful, redirect to concerned user
    // 3.if api call is failure, show a message to user

    // if submit is successful

    // if submit is failure
    // dont call setignup(false)
  };

  return (
    <div>
      {showSignup ? (
        <Signup
          onSignupSumbit={handleSignupSubmit}
          goToLogin={gotoLogin}
          errorMessageSignup={errorMessageSignup}
        />
      ) : (
        <Login
          onLoginSumbit={handleLoginSubmit}
          goToSignup={gotoSignup}
          loginErrorMessage={errorMessage}
          loginMessage={loginMessage}
        />
      )}
    </div>
  );
};

export default Authentication;
