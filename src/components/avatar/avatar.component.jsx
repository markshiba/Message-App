import React, { Component } from "react";
import "./avatar.styles.scss";
// import MD5 from "crypto-js/md5";

const Avatar = ({ avatarSrc }) => {
  // const md5 = MD5(`${email}`.toString());
  // let size = 80,
  //   imageSrc = "http://www.gravatar.com/avatar/" + md5 + ".jpg?s=" + size;

  return (
    <div className="avatar">
      <div className="avatar-img">
        <img src={avatarSrc} alt="User Avatar" />
      </div>
    </div>
  );
};

export default Avatar;
