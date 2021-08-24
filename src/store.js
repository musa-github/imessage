import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./redux/chatSlice";
import userSlice from "./redux/userSlice";
export  const store= configureStore({
    reducer:{
        user:userSlice,
        // another awy
        chat:chatReducer
    }
})
