import React, { Component } from "react";
import "./avatar.styles.scss";

const Avatar = (props) => (
  <div className="avatar">
    <div className="avatar-img">
      <img src={props.source} alt="User Avatar" />
    </div>
  </div>
);

export default Avatar;
