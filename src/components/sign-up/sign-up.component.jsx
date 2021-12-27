import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  auth,
  createUserProfileDocument,
  signInWithGoogle,
} from "../../firebase/firebase.utils";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import firebase from "@firebase/app-compat";
import Button from "../../components/button/button";
import "./sign-up.styles.scss";

const SignUp = ({ signUpStart, history }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthday: new Date(),
  });
  const { displayName, email, password, confirmPassword, gender, birthday } =
    userCredentials;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    // const { user } = firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     createUserProfileDocument(user, {
    //       displayName,
    //       gender,
    //       birthday,
    //     });

    //     setUserCredentials(...userCredentials, {
    //       displayName: "",
    //       email: "",
    //       password: "",
    //       confirmPassword: "",
    //       gender: "",
    //       birthday: "",
    //     });

    //     history.push("/");
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ..
    //   });

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName, gender, birthday });
    } catch (error) {
      console.error(error);
    }

    history.push("/");

    setUserCredentials({
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      birthday: "",
    });
  };

  return (
    <div className="sign-up">
      <h2 className="sign-up-describe">Start exploring NearApp</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div className="form-info">
          <div>
            <label>Full Name</label>
            <input
              id="displayName"
              type="text"
              name="displayName"
              value={displayName}
              onChange={handleChange}
              label="Mark Phan"
              required
            />
          </div>

          <div>
            <label>Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              label="Email"
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              label="Password"
              required
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              id="confirmedPassword"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              label="Confirm Password"
              required
            />
          </div>
          <div>
            <label>Birthday</label>

            <DatePicker
              selected={birthday}
              onChange={(date) => {
                setUserCredentials({ ...userCredentials, birthday: date });
              }}
              placeholderText={"dd/mm/yyyy"}
              maxDate={new Date()}
              showYearDropdown
              scrollableYearDropdown
            />
          </div>

          <div>
            <label>Gender</label>
            <select
              onChange={handleChange}
              defaultValue="Select Gender"
              name="gender"
              required
            >
              <option defaultValue>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="button-container">
          <Button type="submit">CREATE YOUR ACCOUNT</Button>
          <Button type="button" action={signInWithGoogle}>
            SIGN UP WITH GOOGLE
          </Button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
