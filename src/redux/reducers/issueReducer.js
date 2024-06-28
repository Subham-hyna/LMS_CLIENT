import { createSlice } from "@reduxjs/toolkit";

const issueSlice = createSlice({
    name: "issue",
    initialState: { issue:{} },
    reducers: {
        addIssueRequest(state,action){
            state.issueLoading = true;
        },
        addIssueSuccess(state,action){
            state.issueLoading = false;
            state.issueMessage = action.payload.message;
        },
        addIssueFail(state,action){
            state.issueLoading = false;
            state.issueError = action.payload;
        },

        updateIssueRequest(state,action){
            state.issueLoading = true;
        },
        updateIssueSuccess(state,action){
            state.issueLoading = false;
            state.issueMessage = action.payload.message;
        },
        updateIssueFail(state,action){
            state.issueLoading = false;
            state.issueError = action.payload;
        },

        allPendingIssueRequest(state,action){
            state.issueLoading = true;
        },
        allPendingIssueSuccess(state,action){
            state.issueLoading = false;
            state.pendingIssueFilteredCount =  action.payload.data.issueFilteredCount;
        },
        allReturnIssueSuccess(state,action){
            state.issueLoading = false;
            state.returnIssueFilteredCount =  action.payload.data.issueFilteredCount;
        },
        allIssuedIssueSuccess(state,action){
            state.issueLoading = false;
            state.issuedIssueFilteredCount =  action.payload.data.issueFilteredCount;
        },
        allPendingIssueFail(state,action){
            state.issueLoading = false;
            state.issueError = action.payload;
        },
        allIssueRequest(state,action){
            state.issueLoading = true;
        },
        allIssueSuccess(state,action){
            state.issueLoading = false;
            state.issues = action.payload.data.allIssues;
            state.resultPerPage = action.payload.data.resultPerPage;
            state.issueFilteredCount =  action.payload.data.issueFilteredCount;
        },
        allIssueFail(state,action){
            state.issueLoading = false;
            state.issueError = action.payload;
        },

        clearIssueError(state,action){
            state.issueError = null;
        },
        clearIssueMessage(state,action){
            state.issueMessage = null;
        }
    }
})

export default issueSlice.reducer;

export const { 
    addIssueRequest,
    addIssueSuccess,
    addIssueFail, 
    updateIssueRequest,
    updateIssueSuccess,
    updateIssueFail, 
    allIssueRequest, 
    allIssueSuccess, 
    allIssueFail, 
    allPendingIssueRequest, 
    allPendingIssueSuccess, 
    allReturnIssueSuccess,
    allIssuedIssueSuccess,
    allPendingIssueFail, 
    clearIssueError, 
    clearIssueMessage 
} = issueSlice.actions;
