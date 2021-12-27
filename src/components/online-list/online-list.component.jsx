import React from "react";
import { connect } from "react-redux";
import UserItem from "../user-items/user-item.component";
import "./online-list.scss";

const OnlineList = ({ currentUser, allUsers }) => {
  return (
    <div className="main-chatlist">
      <div className="chatlist-heading">
        <div className="profile-card">
          <div className="profile-image">
            <img src={currentUser.avatarSrc} />
          </div>
          <h4>{currentUser ? currentUser.displayName : null}</h4>
        </div>
      </div>
      <div className="chatList-search">
        <div className="search-wrap">
          <input type="text" placeholder="Search Here" required />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist-items">
        {allUsers.map((user, index) => (
          <UserItem user={user} key={index} />
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
