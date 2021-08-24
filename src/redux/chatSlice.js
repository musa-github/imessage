import { createSlice } from "@reduxjs/toolkit";
export const chatSlice = createSlice({
    name:'chat',
    initialState:{
        chatName:null,
        chatId:null,
    },
    reducers:{
        setChat:(state,action)=>{
            state.chatId= action.payload.chatId;
            state.chatName= action.payload.chatName;
        },
    }
});
export const { setChat}=chatSlice.actions;
export const selectName = (state)=>state.chat.chatName;
export const selectId = (state)=>state.chat.chatId;
export default chatSlice.reducer;
