import { bindActionCreators, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const forgatePasswordSlice = createSlice({
  name: "forgatePassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
    
  },
  reducers: {
    forgatePasswordRequest(state, action) {
      state.loading = true;
      state.error = null
      state.message = null
    },
    forgatePasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload
      state.error = null;
    },
 
    forgatePasswordError(state, action) {
        state.loading = false;
        state.message =null
        state.error = action.payload;
    },
    resetPasswordRequest(state, action) {
      state.loading = true;
      state.error = null
      state.message = null
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload
      state.error = null;
    },
 
    resetPasswordError(state, action) {
        state.loading = false;
        state.message =null
        state.error = action.payload;
    },
    Allerror(state,action){
        state.loading = false
        state = state
    }
  },
});

export const forgatePassword = (email)=>async(dispatch)=>
    {
        dispatch(forgatePasswordSlice.actions.forgatePasswordRequest())
        try {
            const responce = await axios.post("http://localhost:5000/api/v1/user/forgot-link",{email},{withCredentials:true,headers:{"Content-Type":"application/json"}})
            // console.log("responce is ",responce)
            dispatch(forgatePasswordSlice.actions.forgatePasswordSuccess(responce.data.message))
            dispatch(forgatePasswordSlice.actions.Allerror())
            
        } catch (error) {
            console.log("error sending rest password linking ",error)
            dispatch(forgatePasswordSlice.actions.forgatePasswordError(error.response.data.message))
            console.log("original output is ",error.response.data.message)
        }
    }

export const ResetPasswordToken = (token,password)=>async(dispatch)=>
    {
        dispatch(forgatePasswordSlice.actions.forgatePasswordRequest())
        try {
            const responce = await axios.post(`http://localhost:5000/api/v1/user/verify/${token}`,{password},{withCredentials:true,headers:{"Content-Type":"application/json"}})
            dispatch(forgatePasswordSlice.actions.forgatePasswordSuccess(responce.data.message))
            dispatch(forgatePasswordSlice.actions.Allerror())
        } catch (error) {
            console.log("error sending rest password linking ",error)
            dispatch(forgatePasswordSlice.actions.forgatePasswordError(error.response.data.message))
        }
    }
export default forgatePasswordSlice.reducer
