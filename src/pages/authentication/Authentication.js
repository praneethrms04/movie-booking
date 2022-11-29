import React, { useState } from "react";
import Login from "../../components/login/Login";
import Signup from "../../components/signup/Signup";
import "./authentication.css";
const Authentication = () => {
  const [showSignup, setShowSignup] = useState(false);

  const handleSignupSubmit = (data) => {
    console.log(data);

    // 1. make an api call and post the data
    // 2. if api call is successful, redirect to concerned user
    // 3.if api call is failure, show a message to user
  };
  const handleLoginSubmit = (data) => {
    console.log(data);
    // 1. make an api call and post the data to signup
    // 2. if api call is successful, redirect to login page
    // 3. show a message to user that login is successful
  };

  const gotoLogin = () => {
    setShowSignup(false);
  };

  const gotoSignup = () => {
    setShowSignup(true);
  };

  return (
    <div>
      {showSignup ? (
        <Signup onSignupSumbit={handleSignupSubmit} goToLogin={gotoLogin} />
      ) : (
        <Login onLoginSumbit={handleLoginSubmit} goToSignup={gotoSignup} />
      )}
    </div>
  );
};

export default Authentication;
