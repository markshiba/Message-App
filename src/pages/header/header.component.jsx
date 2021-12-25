import react from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import { auth } from "../../firebase/firebase.utils";

import Button from "../../components/button/button";

import { signInWithGoogle } from "../../firebase/firebase.utils";

import SignIn from "../../components/sign-in/sign-in.component";

import { firestore } from "../../firebase/firebase.utils";
import "./header.styles.scss";

const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <div>
        {currentUser ? (
          <Button
            action={async () => {
              const userRef = firestore.doc(`users/${currentUser.id}`);
              await userRef.update({
                isOnline: false,
              });

              auth.signOut();
            }}
            size="small"
          >
            Sign Out
          </Button>
        ) : (
          <SignIn />

          // <Button action={signInWithGoogle}>Sign In</Button>
        )}
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(Header);
