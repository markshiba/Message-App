import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./chatting-content.scss";
import { firestore } from "../../firebase/firebase.utils";
import Message from "../message/message.coponent";

const ChattingContent = ({ selectedUser, currentUser, messageChatted }) => {
  useEffect(() => {}, []);

  const [message, setMessage] = useState("");
  const onChatting = (e) => {
    setMessage(e.target.value);
  };

  const onSent = (e) => {
    // const messagePackage = {
    //   user1: currentUser.id,
    //   user2: selectedUser.id,
    //   message: message,
    //   isChatting: true,
    // };

    if (!message || !currentUser || !selectedUser) {
      setMessage("");
      return;
    }

    //save message on firestore
    firestore
      .collection("messages")
      .add({
        user1: currentUser.id,
        user2: selectedUser.id,
        message: message,
        isChatting: true,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    setMessage("");
  };

  return (
    <div className="chatting-content">
      <div className="chatting-content__header">
        {selectedUser ? selectedUser.displayName : null}
      </div>
      <div className="chatting-content__body">
        {messageChatted
          ? messageChatted.map((message) => <Message props={message}></Message>)
          : null}
      </div>

      <div className="chatting-content__footer">
        <div className="send-message">
          <input
            type="text"
            placeholder="Type your message here"
            onChange={onChatting}
            value={message}
          />
          <button onClick={onSent} className="btnSendMsg" id="sendMsgBtn">
            <i className="fa fa-paper-plane"></i>
            send
          </button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ user, message }) => ({
  selectedUser: user.selectedUser,
  currentUser: user.currentUser,
  messageChatted: message.messageChatted,
});

export default connect(mapStateToProps)(ChattingContent);
