import { Avatar, IconButton } from "@material-ui/core";
import { RateReviewOutlined } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import db, { auth } from "./firebase";
import { selectUser } from "./redux/userSlice";
import "./sideber.css";
import { SideberChat } from "./SideberChat";
export const Sideber = () => {
  const user = useSelector(selectUser)
  const [chats,setChats]=useState([])

  useEffect(()=>{
db.collection("chats").onSnapshot(snapshot=>{
  setChats(snapshot.docs.map(doc=>{
    return {
      id:doc.id,
      data:doc.data()
    }
  }))
})

  }, []);
  const addChats = ()=>{
    const chatName = prompt("Please ender a chat name")
   if(chatName){
    db.collection("chats").add({
      chatName:chatName
    })
   }
  }

  return (
    <div className="sideber">
      <div className="sideber__header">
        <Avatar onClick={()=>auth.signOut()} src={user.photo} className="sideber__avatar" />
        <div className="sideber__input">
          <SearchIcon />
          <input placeholder="Search" />
        </div>
        <IconButton onClick={addChats} variant="outlined" className="sideber__inputButton">
          <RateReviewOutlined />
        </IconButton>
      </div>
      <div className="sideber__chat">
        {chats&& chats.map(({id,data:{chatName}})=>{
         
          return <SideberChat key={id} id={id} chatName={chatName}/>
        })}
        
       
      </div>
    </div>
  );
};
