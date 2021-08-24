import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import "./message.css";
import { selectUser } from "./redux/userSlice";
export const Message = ({
  id,
  contents: { timestamp, displayName, email, photo, uid, message },
}) => {
  const user = useSelector(selectUser);
  return (
    <div
      className={user.email === email ? "message" : "message message__sender"}
    >
      <Avatar className="message__photo" src={photo} />
      <p>{message}</p>
      <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
    </div>
  );
};
