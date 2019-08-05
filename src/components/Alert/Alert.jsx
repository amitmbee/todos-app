import * as React from "react";



const Alert = ({ message, children, type, tag })=> {
  const AlertWrapper = tag ? tag : "div";
  return <AlertWrapper className={`notification is-${type}`}>{message || children}</AlertWrapper>;
};

Alert.defaultProps = {
  type: "danger",
};

export default Alert;
