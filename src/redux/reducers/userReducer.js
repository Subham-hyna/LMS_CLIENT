import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { user:{} },
    reducers: {
        loginRequest(state,action){
            state.loading = true;
            state.isAuthenticated = false;
        },
        loginSuccess(state,action){
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.data.user;
            state.message = action.payload.message;
        },
        loginFail(state,action){
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },

        addMemberRequest(state,action){
            state.loading = true;
        },
        addMemberSuccess(state,action){
            state.loading = false;
            state.message = action.payload.message;
        },
        addMemberFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        loadUserRequest(state,action){
            state.loading = true;
            state.isAuthenticated = false;
        },
        loadUserSuccess(state,action){
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loadUserFail(state,action){
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {}
            state.error = action.payload;
        },

        logoutRequest(state,action){
            state.loading = true;
        },
        logoutSuccess(state,action){
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.message = action.payload;
        },
        logoutFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        OTPVerificationRequest(state,action){
            state.loading = true;
        },
        OTPVerificationSuccess(state,action){
            state.loading = false;
            state.message = action.payload.message
        },
        OTPVerificationFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        updateAvatarRequest(state,action){
            state.loading = true;
        },
        updateAvatarSuccess(state,action){
            state.loading = false;
            state.user = action.payload.data.user
            state.message = action.payload.message
            state.isUpdated = true
        },
        updateAvatarFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        updateAvatarReset(state,action){
            state.isUpdated = false;
        },

        updatePasswordRequest(state,action){
            state.loading = true;
        },
        updatePasswordSuccess(state,action){
            state.loading = false;
            state.message = action.payload.message;
            state.isChanged = true
        },
        updatePasswordFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        updatePasswordReset(state,action){
            state.isChanged = false;
        },

        forgotPasswordRequest(state,action){
            state.loading = true;
        },
        forgotPasswordSuccess(state,action){
            state.loading = false;
            state.message = action.payload.message;
        },
        forgotPasswordFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        resetPasswordRequest(state,action){
            state.loading = true;
            state.isAuthenticated = false
        },
        resetPasswordSuccess(state,action){
            state.user = action.payload.data.user
            state.message = action.payload.message;
            state.isAuthenticated = true
            state.loading = false;
            state.isChanged = true;
        },
        resetPasswordFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false
        },
        resetPasswordReset(state,action){
            state.isChanged = false;
        },

        changeMembershipRequest(state,action){
            state.loading = true;
        },
        changeMembershipSuccess(state,action){
            state.message = action.payload.message;
            state.loading = false;
            state.isChanged = true;
        },
        changeMembershipFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        changeMembershipReset(state,action){
            state.isChanged = false;
        },

        allMemberRequest(state,action){
            state.loading = true;
            state.users = [];
        },
        allMemberSuccess(state,action){
            state.loading = false;
            state.users = action.payload.data.users;
            state.resultPerPage = action.payload.data.resultPerPage;
            state.userFilteredCount =  action.payload.data.userFilteredCount;
        },
        allMemberFail(state,action){
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

export default userSlice.reducer;

export const { 
    loginRequest,
    loginSuccess, 
    loginFail,
    addMemberRequest,
    addMemberSuccess,
    addMemberFail, 
    loadUserRequest, 
    loadUserSuccess, 
    loadUserFail, 
    logoutRequest, 
    logoutSuccess, 
    logoutFail, 
    OTPVerificationRequest, 
    OTPVerificationSuccess, 
    OTPVerificationFail, 
    updateAvatarRequest,
    updateAvatarSuccess,
    updateAvatarFail,
    updateAvatarReset, 
    updatePasswordRequest, 
    updatePasswordSuccess, 
    updatePasswordFail, 
    updatePasswordReset,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail, 
    resetPasswordReset,
    allMemberRequest,
    allMemberSuccess,
    allMemberFail,
    changeMembershipRequest,
    changeMembershipSuccess,
    changeMembershipFail,
    changeMembershipReset,
    clearError, 
    clearMessage 
} = userSlice.actions;
