import React from "react";

import "./login.styles.scss";

import loginImage from "../../assets/bg1.jpg"; // Tell Webpack this JS file uses this image

// import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const Login = () => (
  <div className="login">
    <div>
      <h2 className="login-header">Once you try it, you can't leave</h2>
      <img class="login-image" src={loginImage} alt="" />
    </div>
    <SignUp />
  </div>
);

export default Login;
