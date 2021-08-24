import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./login.css";
export const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="logn__logo">
        <img
          src="https://images.macrumors.com/t/zIkzK5aI-P4nR5qrqplZq9pVrD0=/1600x1200/smart/article-new/2016/03/IMessage_Icon.jpg"
          alt="imessage"
        />
        <h2>iMessage</h2>
      </div>
      <Button onClick={signIn}>Sign in</Button>
    </div>
  );
};
