import React from "react";
import { connect } from "react-redux";
import { firestore } from "../../firebase/firebase.utils";
import { setSelectedUser } from "../../redux/user/user.actions";
import { setMessageChatted } from "../../redux/messages/messages.action";
import AvatarName from "../avatar-name/avatar-name.component";
import "./user-item.styles.scss";

const UserItem = ({
  user,
  setSelectedUser,
  currentUser,
  setMessageChatted,
}) => {
  const { displayName, isOnline, avatarSrc } = user;

  const onSelectedUser = () => {
    setSelectedUser(user);
    // if (!currentUser || !user) return;
    firestore
      .collection("messages")
      // .where(currentUser.id, "in", ["user1", "user2"])
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        var allMessages = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user1 === currentUser.id &&
              doc.data().user2 === user.id) ||
            (doc.data().user1 === user.id &&
              doc.data().user2 === currentUser.id)
          ) {
            allMessages.push(doc.data());
          }
        });

        setMessageChatted(allMessages);
      });
  };

  return (
    <div
      onClick={onSelectedUser}
      className={`chatlist__item ${isOnline ? isOnline : ""} `}
    >
      <div className="user-status">
        <span className={`${isOnline ? "active" : "off"} active-status`}></span>
        <AvatarName avatarSrc={avatarSrc} displayName={displayName} />
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
