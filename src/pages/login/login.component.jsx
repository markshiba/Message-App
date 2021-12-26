import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import "./login.styles.scss";

import loginImage from "../../assets/bg2.jpg"; // Tell Webpack this JS file uses this image

// import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const Login = ({ currentUser }) => {
  if (currentUser) {
    return <Redirect to={`/`} />;
  }

  return (
    <div className="login">
      <div>
        <h2 className="login-header">Once you try it, you can't leave</h2>
        <img className="login-image" src={loginImage} alt="" />
      </div>
      <SignUp />
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(Login);
