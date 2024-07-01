import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    adminInfo: localStorage.getItem('admin')  
      ? JSON.parse(localStorage.getItem('admin')) 
      : null,
  };


  const authSlice= createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setAdminCredentials : (state,action)=>{
            state.adminInfo=action.payload;
            localStorage.setItem('admin',JSON.stringify(action.payload))
        },
        adminLogout: (state)=>{
            state.adminInfo=null;
            localStorage.removeItem('admin')
            localStorage.removeItem('Token')
        }
    }
})


export const {setAdminCredentials,adminLogout} = authSlice.actions;

export default authSlice.reducer;