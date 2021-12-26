import React from "react";

import "./button.styles.scss";

const Button = (props) => (
  <button
    type={props.type}
    className={`" btn ${props.size} "`}
    onClick={props.action}
  >
    {props.children}
  </button>
);

export default Button;
