import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice'



const store = configureStore({
    reducer: {
        adminAuth : authReducer
    }
})

export default store