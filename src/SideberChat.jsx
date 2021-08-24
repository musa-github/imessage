import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "./firebase";
import { setChat } from "./redux/chatSlice";
import { selectUser } from "./redux/userSlice";
import "./sideberChat.css";

export const SideberChat = ({ id, chatName }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [chatInfo, setchatInfo] = useState([]);
  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("message")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setchatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      onClick={() => {
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        );
      }}
      className="sideberChat"
    >
      <Avatar src={user && user.photo} />
      <div className="sideberChat__nfo">
        <h3>{chatName}</h3>
        <p> {chatInfo[0]?.message}</p>
        <small>
          {new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleString()}
        </small>
      </div>
    </div>
  );
};
