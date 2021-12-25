import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "./firebase/firebase.utils";

import Header from "./pages/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import Login from "./pages/login/login.component";
import { setCurrentUser, listAllUser } from "./redux/user/user.actions";

import { createUserProfileDocument } from "./firebase/firebase.utils";

import { firestore } from "./firebase/firebase.utils";

import "./App.css";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, listAllUser, currentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);

      const db = firestore.collection("users").onSnapshot((querySnapshot) => {
        var users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });

        listAllUser(users);
      });
    });

    // if (currentUser) {
    //   console.log("asd");

    // const unsubscribe = db.collection("users"); // .where("state", "==", "CA")

    // console.log(unsubscribe);

    // .onSnapshot((querySnapshot) => {
    //   var cities = [];
    //   querySnapshot.forEach((doc) => {
    //     cities.push(doc.data().name);
    //   });
    //   console.log("Current cities in CA: ", cities.join(", "));
    // });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="app">
        <Header></Header>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  listAllUser: (allUser) => dispatch(listAllUser(allUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
