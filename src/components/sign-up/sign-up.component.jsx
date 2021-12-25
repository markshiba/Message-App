import React, { useState } from "react";

import Button from "../../components/button/button";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import "./sign-up.styles.scss";

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthday: "",
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
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName, gender, birthday });

      setUserCredentials(...userCredentials, {
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        birthday: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sign-up">
      <div className="sign-up-describe">
        <h2 className="title">Create your account</h2>
      </div>
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
            <input
              id="birthday"
              type="number"
              name="birthday"
              value={birthday}
              onChange={handleChange}
              label="birthday"
              required
            />
          </div>

          <div>
            <label>Gender</label>
            <select
              onChange={handleChange}
              defaultValue="Select Gender"
              name="gender"
            >
              <option defaultValue>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <Button type="submit">SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUp;
