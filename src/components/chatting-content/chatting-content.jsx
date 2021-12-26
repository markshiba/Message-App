import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import "./chatting-content.scss";
import { firestore } from "../../firebase/firebase.utils";
import Message from "../message/message.coponent";
import { setMessageChatted } from "../../redux/messages/messages.action";
import AvatarName from "../avatar-name/avatar-name.component";

const ChattingContent = ({ selectedUser, currentUser, messageChatted }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageChatted]);

  const [message, setMessage] = useState("");
  const onChatting = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && message !== "") {
      //save message on firestore
      firestore
        .collection("messages")
        .add({
          createdAt: new Date(),
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
    }
  };

  const onSent = (e) => {
    if (e.key === "Enter") {
      setMessage("");
      return;
    }

    if (!message || !currentUser || !selectedUser) {
      setMessage("");
      return;
    }

    //save message on firestore
    firestore
      .collection("messages")
      .add({
        createdAt: new Date(),
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
        {selectedUser ? (
          <AvatarName
            avatarSrc={selectedUser.avatarSrc}
            displayName={selectedUser.displayName}
          />
        ) : null}
      </div>
      <div className="chatting-content__body">
        {messageChatted
          ? messageChatted.map((message) => (
              <Message
                messageInfo={message}
                currentUser={currentUser}
              ></Message>
            ))
          : null}

        <div ref={messagesEndRef} />
      </div>

      <div className="chatting-content__footer">
        <div className="send-message">
          <input
            type="text"
            placeholder="Type your message here"
            onChange={onChatting}
            value={message}
            onKeyDown={handleKeyDown}
          />

          <button onClick={onSent} className="btnSendMsg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setMessageChatted: (messageChatted) =>
    dispatch(setMessageChatted(messageChatted)),
});

const mapStateToProps = ({ user, message }) => ({
  selectedUser: user.selectedUser,
  currentUser: user.currentUser,
  messageChatted: message.messageChatted,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChattingContent);
