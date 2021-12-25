import React, { Component } from "react";
import "./avatar.styles.scss";

const Avatar = (props) => (
  <div className="avatar">
    <div className="avatar-img">
      <img src="https://i.stack.imgur.com/Dj7eP.jpg" alt="#" />
    </div>
    <span className={`isOnline ${props.isOnline}`}></span>
  </div>
);

export default Avatar;
