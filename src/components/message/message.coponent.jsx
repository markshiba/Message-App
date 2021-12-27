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
    <div className={`chat__item`}>
      <div className="chat__item__content">
        <div className={` ${messageSide}`}>
          <Linkify className="chat__msg">{messageInfo.message}</Linkify>
        </div>
      </div>
    </div>
  );
};

export default Message;
