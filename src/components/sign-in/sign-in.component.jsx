import React, { useState } from "react";
import { auth, firestore } from "../../firebase/firebase.utils";
import { withRouter } from "react-router";
// import firebase from "@firebase/app-compat";
import Button from "../../components/button/button";
import "./sign-in.styles.scss";

const SignIn = ({ history }) => {
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

    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     const userRef = firestore.doc(`users/${userCredential.user.uid}`);
    //     userRef
    //       .update({
    //         isOnline: true,
    //       })
    //       .then(() => {
    //         console.log("Document successfully updated!");
    //         history.push("/");
    //       });
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //   });

    try {
      const userAuth = await auth.signInWithEmailAndPassword(email, password);
      const userRef = firestore.doc(`users/${userAuth.user.uid}`);
      await userRef.update({
        isOnline: true,
      });
      setUserCredentials({ email: "", password: "" });

      history.push("/");
    } catch (error) {
      console.log("sign in error");
    }
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="sign-in-form-container">
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
            autoComplete="off"
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
      </div>

      <Button type="submit" size="small">
        SIGN IN
      </Button>
    </form>
  );
};

export default withRouter(SignIn);
