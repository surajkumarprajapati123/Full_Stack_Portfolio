import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    ClearAllError(state, action) {
      state.error = null;
    },
    loadloginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadloginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadloginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
 
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    UpdatePasswordRequest(state,action){
      state.loading = true,
      state.isUpdated = false,
      state.message = null,
      state.error = null
    },
    UpdatePasswordSuccess(state,action){
      state.loading = false,
      state.isUpdated = true,
      state.message = action.payload,
      state.error = null
    },
    UpdatePasswordFailed(state,action){
      state.loading = false,
      state.isUpdated = false,
      state.message = null,
      state.error = null
    },
    UpdateProfileRequest(state,action){
      state.loading = true,
      state.isUpdated = false,
      state.message = null,
      state.error = null
    },
    UpdateProfileSuccess(state,action){
      state.loading = false,
      state.isUpdated = true,
      state.message = action.payload,
      state.error = null
    },
    UpdateProfileFailed(state,action){
      state.loading = false,
      state.isUpdated = false,
      state.message = null,
      state.error = null
    },
    loadClearAllError(state, action) {
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailed, ClearAllError } = userSlice.actions;
export const {loadloginSuccess,loadloginRequest,loadloginFailed,loadClearAllError} = userSlice.actions
export const {logoutSuccess,logoutFailed} = userSlice.actions

export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const responce = await axios.post(
      "http://localhost:5000/api/v1/user/login",
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    console.log("login data is ", responce);
    dispatch(loginSuccess(responce.data));
    dispatch(ClearAllError());
  } catch (error) {
    console.log("Error is ", error);
    dispatch(loginFailed(error.response.data.message));
  }
};
export const getprofile = () => async (dispatch) => {
  dispatch(loadloginRequest());

  try {
    const responce = await axios.get(
      "http://localhost:5000/api/v1/user/profile",
      { withCredentials: true }
    );

    console.log("getprofile data is ", responce);
    dispatch(loadloginSuccess(responce.data));
    dispatch(loadClearAllError());
  } catch (error) {
    console.log("Error is get profile ", error);
    dispatch(loadloginFailed(error.response.data.message));
  }
};

export const logout = ()=>async(dispatch)=>
  {
    try {
      const responce = await axios.post("http://localhost:5000/api/v1/user/logout",{withCredentials:true})
      console.log("logout data is ",responce)
      dispatch(logoutSuccess(responce.data.message))
      dispatch(loadClearAllError())
    } catch (error) {
      // console.log("responce is ",responce)
      console.log("Error is logout : ",error)
      dispatch(logoutFailed(error.response.data.message))
    }
  }

  export const UpdatePassword =(oldPassword, newPassword, confirmPassword)=>async(dispatch)=>
    {
      dispatch(userSlice.actions.UpdatePasswordRequest())
      try {
          const responce = await axios.put('http://localhost:5000/api/v1/user/change-password',{oldPassword, newPassword, confirmPassword},{withCredentials:true},{headers:{"Content-Type":"application/json"}})
          dispatch(userSlice.actions.UpdatePasswordSuccess(responce.data))
          dispatch(loadClearAllError())
      } catch (error) {
        console.log("updated passord error ",error)
      dispatch(userSlice.actions.UpdatePasswordFailed(error.response.data.message))

      }
    }

export const UpdateProfile = (data)=>async(dispatch)=>
  {
    dispatch(userSlice.actions.UpdateProfileRequest())
    try {
      const responce = await axios.put('http://localhost:5000/api/v1/user/profile',{data},{withCredentials:true , headers:{"Content-Type":"application/json"}})
      dispatch(userSlice.actions.UpdatePasswordSuccess(responce.data))
      dispatch(userSlice.actions.loadClearAllError)
      
    }
    catch (error){
        console.log("error using updating profile",error)
        dispatch(userSlice.actions.UpdateProfileFailed(error.response.data.message))
    }
}

export default userSlice.reducer