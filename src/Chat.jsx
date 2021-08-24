import { IconButton } from "@material-ui/core";
import { MicNoneOutlined } from "@material-ui/icons";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./chat.css";
import db from "./firebase";
import { Message } from "./Message";
import { selectId, selectName } from "./redux/chatSlice";
import { selectUser } from "./redux/userSlice";
export const Chat = () => {
  const chatName = useSelector(selectName);
  const user = useSelector(selectUser);
  const chatId = useSelector(selectId);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  console.log("message", message);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("message")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessage(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats").doc(chatId).collection("message").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setInput("");
  };
  return (
    <div className="chat">
      {/* chat header */}
      <div className="chat__header">
        <h3>
          To:<span className="chat__name"> {chatName}</span>{" "}
        </h3>
        <strong>Details</strong>
      </div>
      {/* chat messages */}

      <div className="chat__message">
        {message &&
          message.map(({ id, data }) => {
            return <Message key={id} contents={data} />;
          })}
      </div>

      {/* chat input */}
      <div className="chat__input">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Imessage"
          />
          <button type="submit">Send message</button>
        </form>
        <IconButton>
          <MicNoneOutlined className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
};

//
