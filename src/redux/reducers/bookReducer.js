import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: "book",
    initialState: { book:{} },
    reducers: {
        addBookRequest(state,action){
            state.loading = true;
        },
        addBookSuccess(state,action){
            state.loading = false;
            state.message = action.payload.message;
        },
        addBookFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        updateBookRequest(state,action){
            state.loading = true;
        },
        updateBookSuccess(state,action){
            state.loading = false;
            state.message = action.payload.message;
            state.isChanged = true
        },
        updateBookFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        updateBookReset(state,action){
            state.isChanged = false;
        },

        allBooksRequest(state,action){
            state.loading = true;
            state.books = [];
        },
        allBooksSuccess(state,action){
            state.loading = false;
            state.books = action.payload.data.books;
            state.resultPerPage = action.payload.data.resultPerPage;
            state.bookFilteredCount =  action.payload.data.bookFilteredCount;
        },
        allBooksFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        clearError(state,action){
            state.error = null;
        },
        clearMessage(state,action){
            state.message = null;
        }
    }
})

export default bookSlice.reducer;

export const { 
    addBookRequest,
    addBookSuccess,
    addBookFail, 
    updateBookRequest, 
    updateBookSuccess, 
    updateBookFail, 
    updateBookReset,
    allBooksRequest,
    allBooksSuccess,
    allBooksFail,
    clearError, 
    clearMessage 
} = bookSlice.actions;
