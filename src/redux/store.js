import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userReducer';
import bookSlice from './reducers/bookReducer';
import issueSlice from './reducers/issueReducer'

const store = configureStore({
    reducer: {
        user : userSlice,
        book : bookSlice,
        issue : issueSlice
    },
  });
  
  export default store;
  
//   export const server = "http://127.0.0.1:8000/api/v1";
  export const server = "https://lms-server-4c06.onrender.com/api/v1";
