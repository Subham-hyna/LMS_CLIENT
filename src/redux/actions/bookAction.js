import { server } from "../store";
import { addBookFail, addBookRequest, addBookSuccess, allBooksFail, allBooksRequest, allBooksSuccess, clearError, clearMessage, updateBookFail, updateBookRequest, updateBookSuccess } from "../reducers/bookReducer";
import axios from "axios";

// Get All Books
export const getBooks = (keyword = "", currentPage = 1, genre) => async (dispatch) => {
    try {
      dispatch(allBooksRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
      }
  
      let link = `${server}/book/get-books?keyword=${keyword}&page=${currentPage}`;
  
        if(genre){
          link = `${server}/book/get-books?keyword=${keyword}&page=${currentPage}&genre=${genre}`;

        }
  
      const { data } = await axios.get(link,config);
  
      dispatch(allBooksSuccess(data));
    } catch (error) {
      dispatch(allBooksFail(error.response.data.message));
    }
};

//Add Book
export const addBook = (bookData) => async (dispatch) => {
    try {
      dispatch(addBookRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
    };
  
      const { data } = await axios.post(`${server}/book/add-book`,
      bookData,
      config
      );
  
      dispatch(addBookSuccess(data));
    } catch (error) {
      dispatch(addBookFail(error.response.data.message));
    }
};

// Edit Book
export const editBook = (bookData, id) => async (dispatch) => {
    try {
      dispatch(updateBookRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        "Content-Type": "application/json", 
        'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  }
  
      const { data } = await axios.put(`${server}/book/edit-book/${id}`, bookData, config);
  
      dispatch(updateBookSuccess(data));
    } catch (error) {
        console.log(error.response.data.message)
      dispatch(updateBookFail(error.response.data.message));
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(clearError());
};
  
//Clearing Message
export const clearMessages = () => async (dispatch) => {
    dispatch(clearMessage());
};
