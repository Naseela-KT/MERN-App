import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInfo: localStorage.getItem('admin')  
      ? JSON.parse(localStorage.getItem('admin')) 
      : null,
  };


  const authSlice= createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setUserCredentials : (state,action)=>{
            state.userInfo=action.payload;
            localStorage.setItem('admin',JSON.stringify(action.payload))
        },
        adminLogout: (state)=>{
            state.userInfo=null;
            localStorage.removeItem('admin')
            localStorage.removeItem('Token')
        }
    }
})


export const {setUserCredentials,adminLogout} = authSlice.actions;

export default authSlice.reducer;