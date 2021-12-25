import React from "react";
import Avatar from "../avatar/avatar.component";
import "./message.styles.scss";

const Message = ({ props }) => {
  return (
    <div className="message-container">
      <div className="message-content">
        <p className="message-text">{props.message}</p>

        <Avatar />
      </div>
    </div>
  );
};

export default Message;
