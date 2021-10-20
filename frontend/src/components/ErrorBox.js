import React from "react";

function ErrorBox(props) {
  return <div className="errorBox">error... {props.message}</div>;
}

export default ErrorBox;
