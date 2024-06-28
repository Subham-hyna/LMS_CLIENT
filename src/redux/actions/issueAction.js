import { addIssueFail, addIssueRequest, addIssueSuccess, clearIssueError, clearIssueMessage, allIssueFail, allIssueRequest, allIssueSuccess, updateIssueFail, updateIssueRequest, updateIssueSuccess, allPendingIssueRequest, allPendingIssueSuccess, allPendingIssueFail, allIssuedIssueSuccess, allReturnIssueSuccess } from "../reducers/issueReducer";
import { server } from "../store";
import axios from "axios";

//Issue Request
export const issueRequest = (bookId) => async (dispatch) => {
    try {
      dispatch(addIssueRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
    };
  
      const { data } = await axios.post(`${server}/issue/issue-request`,
      {bookId},
      config
      );
  
      dispatch(addIssueSuccess(data));
    } catch (error) {
      dispatch(addIssueFail(error.response.data.message));
    }
};

//Get Issue Request
export const getPendingIssueRequest = (currentPage = 1, status) => async (dispatch) => {
    try {
      dispatch(allPendingIssueRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
    };

    let link = `${server}/issue/get-allIssues?page=${currentPage}&transactionType=${status}`
  
      const { data } = await axios.get(link,
      config
      );
        if(status === "PENDING"){
            dispatch(allPendingIssueSuccess(data));
        }
        else if( status === "ISSUED"){
            dispatch(allIssuedIssueSuccess(data));
        }
        else if( status === "RETURNED"){
            dispatch(allReturnIssueSuccess(data))
        }
    } catch (error) {
      dispatch(allPendingIssueFail(error.response.data.message));
    }
};

//Get Issue Request
export const getIssueRequest = (currentPage = 1,status) => async (dispatch) => {
    try {
      dispatch(allIssueRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
    };

    let link = `${server}/issue/get-allIssues?page=${currentPage}`

    if(status){
       link = `${server}/issue/get-allIssues?page=${currentPage}&transactionType=${status}`
    }
    
      const { data } = await axios.get(link,
      config
      );
  
      dispatch(allIssueSuccess(data));
    } catch (error) {
      dispatch(allIssueFail(error.response.data.message));
    }
};

//Get Single User Pending Issue Request
export const getSingleUserIssueRequest = (currentPage = 1,id,status) => async (dispatch) => {
    try {
      dispatch(allIssueRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
    }
      let link = `${server}/issue/get-singleUser/${id}?&page=${currentPage}`

      if(status){
        link = `${server}/issue/get-singleUser/${id}?transactionType=${status}&page=${currentPage}`
      }
  
      const { data } = await axios.get(link,
      config
      );
  
      dispatch(allIssueSuccess(data));
    } catch (error) {
      dispatch(allIssueFail(error.response.data.message));
    }
};

//Get Single User Pending Issue Request
export const getCurrentUserIssueRequest = (currentPage = 1,status) => async (dispatch) => {
    try {
      dispatch(allIssueRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
    }
      let link = `${server}/issue/get-currentUser-issues?&page=${currentPage}`

      if(status){
        link = `${server}/issue/get-currentUser-issues?transactionType=${status}&page=${currentPage}`
      }
  
      const { data } = await axios.get(link,
      config
      );
  
      dispatch(allIssueSuccess(data));
    } catch (error) {
      dispatch(allIssueFail(error.response.data.message));
    }
};

//Approve Issue Request
export const approveIssueRequest = (issueId) => async (dispatch) => {
    try {
      dispatch(updateIssueRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
    };
  
      const { data } = await axios.put(`${server}/issue/approve-issueRequest`,
      {issueId},
      config
      );
  
      dispatch(updateIssueSuccess(data));
    } catch (error) {
      dispatch(updateIssueFail(error.response.data.message));
    }
};

//Renew Issue 
export const renewIssue = (issueId) => async (dispatch) => {
    try {
      dispatch(updateIssueRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
    };
  
      const { data } = await axios.put(`${server}/issue/renew-issue`,
      {issueId},
      config
      );
  
      dispatch(updateIssueSuccess(data));
    } catch (error) {
      dispatch(updateIssueFail(error.response.data.message));
    }
};

//Return Issue 
export const returnIssue = (issueId) => async (dispatch) => {
    try {
      dispatch(updateIssueRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
    };
  
      const { data } = await axios.put(`${server}/issue/return`,
      {issueId},
      config
      );
  
      dispatch(updateIssueSuccess(data));
    } catch (error) {
      dispatch(updateIssueFail(error.response.data.message));
    }
};

//Delete Issue Request
export const deleteIssueRequest = (issueId) => async (dispatch) => {
    try {
      dispatch(updateIssueRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
    };
  
      const { data } = await axios.delete(`${server}/issue/delete-issueRequest/${issueId}`,
      config
      );
  
      dispatch(updateIssueSuccess(data));
    } catch (error) {
      dispatch(updateIssueFail(error.response.data.message));
    }
};

//Delete Issue Request
export const deleteCurrentUserIssueRequest = (issueId) => async (dispatch) => {
    try {
      dispatch(updateIssueRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
    };
  
      const { data } = await axios.delete(`${server}/issue/delete-myIssueRequest/${issueId}`,
      config
      );
  
      dispatch(updateIssueSuccess(data));
    } catch (error) {
      dispatch(updateIssueFail(error.response.data.message));
    }
};

// Clearing Errors
export const clearIssueErrors = () => async (dispatch) => {
    dispatch(clearIssueError());
};
  
//Clearing Message
export const clearIssueMessages = () => async (dispatch) => {
    dispatch(clearIssueMessage());
};