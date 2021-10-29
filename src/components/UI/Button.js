import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  let buttonStyle;
  if (props.variant === "outline") {
    buttonStyle = classes.buttonOutline;
  } else if (props.variant === "circle") {
    buttonStyle = `${classes.button} ${classes.buttonCircle}`;
  } else if (props.variant === "primary-outline") {
    buttonStyle = `${classes.button} ${classes.buttonPrimaryOutline}`;
  } else {
    buttonStyle = classes.button;
  }

  return (
    <button
      className={`${buttonStyle} ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
