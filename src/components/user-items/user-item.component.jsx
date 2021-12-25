import React, { Component } from "react";
import { connect } from "react-redux";

import Avatar from "../avatar/avatar.component";
import { firestore } from "../../firebase/firebase.utils";
import { setSelectedUser } from "../../redux/user/user.actions";
import { setMessageChatted } from "../../redux/messages/messages.action";

import "./user-item.styles.scss";

const UserItem = ({
  user,
  setSelectedUser,
  currentUser,
  setMessageChatted,
}) => {
  const { displayName, isOnline } = user;
  console.log("currentUser", currentUser);
  const onSelectedUser = () => {
    setSelectedUser(user);
    if (!currentUser || !user) return;

    // .where("user1", "in", [user.id, currentUser.id])

    firestore
      .collection("messages")
      .where("user1", "in", [currentUser.id, user.id])
      .onSnapshot((querySnapshot) => {
        var allMessages = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user1 === currentUser.id &&
              doc.data().user2 === user.id) ||
            (doc.data().user1 === user.id &&
              doc.data().user2 === user.currentUser.id)
          ) {
            allMessages.push(doc.data());
          }
        });
        console.log("Current cities in CA: ", allMessages);
        setMessageChatted(allMessages);
      });
  };

  return (
    <div
      onClick={onSelectedUser}
      className={`chatlist__item ${isOnline ? isOnline : ""} `}
    >
      <Avatar isOnline={isOnline} />

      <div className="userMeta">
        <p>{displayName}</p>
        <span className="activeTime">32 mins ago</span>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setSelectedUser: (user) => dispatch(setSelectedUser(user)),
  setMessageChatted: (messageChatted) =>
    dispatch(setMessageChatted(messageChatted)),
});

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
