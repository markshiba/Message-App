import React from "react";
import Linkify from "react-linkify";
import "./message.styles.scss";

const Message = ({ messageInfo, currentUser }) => {
  let messageSide = "";
  if (messageInfo.user1 === currentUser.id) {
    messageSide = "right";
  } else {
    messageSide = "left";
  }
  return (
    <div className={`chat-item`}>
      <div className="chat-item-content">
        <div className={` ${messageSide}`}>
          <Linkify className="chat-msg">{messageInfo.message}</Linkify>
        </div>
      </div>
    </div>
  );
};

export default Message;
