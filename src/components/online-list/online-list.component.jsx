import React from "react";
import { connect } from "react-redux";
import "./online-list.scss";
import UserItem from "../user-items/user-item.component";
const OnlineList = ({ currentUser, allUsers }) => {
  return (
    <div className="main__chatlist">
      <div className="chatlist__heading">
        <h2>{currentUser ? currentUser.displayName : null}</h2>
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input type="text" placeholder="Search Here" required />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        {allUsers.map((user, index) => (
          <UserItem
            user={user}
            // name={user.displayName}
            // gender={user.gender}
            // isOnline={user.isOnline ? "active" : ""}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser }, user: { allUsers } }) => ({
  currentUser,
  allUsers,
});

export default connect(mapStateToProps)(OnlineList);
