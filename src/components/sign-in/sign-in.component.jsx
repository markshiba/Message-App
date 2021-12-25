import React, { useState } from "react";

import Button from "../../components/button/button";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { firestore } from "../../firebase/firebase.utils";

import "./sign-in.styles.scss";

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userAuth = await auth.signInWithEmailAndPassword(email, password);
      const userRef = firestore.doc(`users/${userAuth.user.uid}`);
      await userRef.update({
        isOnline: true,
      });
      setUserCredentials(...userCredentials, { email: "", password: "" });
    } catch (error) {
      console.log("sign in error");
    }
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <div>
        <input
          className="sign-in-input"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          placeholder="Email"
          required
        />
      </div>

      <div>
        <input
          className="sign-in-input"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          placeholder="Password"
          required
        />
      </div>

      <Button type="submit" size="small">
        SIGN IN
      </Button>
    </form>
  );
};

export default SignIn;
