import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./slice/userSlice";
import forgatePasswordReducers from "./slice/forgatePasswordSlice";



const store = configureStore({
    reducer:{
        user:userReducers ,
        forgatePassword : forgatePasswordReducers
    }
})

export default store