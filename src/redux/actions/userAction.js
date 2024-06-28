import axios from "axios";
import { loginRequest, loginSuccess, loginFail, clearError, clearMessage, loadUserRequest, loadUserSuccess, loadUserFail, logoutRequest, logoutSuccess, logoutFail, updateAvatarRequest, updateAvatarSuccess, updateAvatarFail, updatePasswordRequest, updatePasswordSuccess, updatePasswordFail, addMemberRequest, addMemberSuccess, addMemberFail, OTPVerificationRequest, OTPVerificationSuccess, OTPVerificationFail, forgotPasswordSuccess, forgotPasswordFail, forgotPasswordRequest, resetPasswordRequest, resetPasswordFail, resetPasswordSuccess, allMemberRequest, allMemberSuccess, allMemberFail, changeMembershipRequest, changeMembershipSuccess, changeMembershipFail } from '../reducers/userReducer'
import { server } from "../store";

//Login user
export const login = (email,registrationNo,password) => async (dispatch) => {
    try {
      dispatch(loginRequest());
  
      const config = { 
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    };
  
      const { data } = await axios.post(`${server}/users/login`,
      { email , registrationNo, password },
      config
      );
  
      dispatch(loginSuccess(data));
      localStorage.setItem("Access-Token",data.data.accessToken);
      localStorage.setItem("Refresh-Token",data.data.refreshToken);
    } catch (error) {
      dispatch(loginFail(error.response.data.message));
    }
};

//Add member
export const addMember = (userData) => async (dispatch) => {
  try {
    dispatch(addMemberRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.post(`${server}/users/register`,
    userData,
    config
    );

    dispatch(addMemberSuccess(data));
  } catch (error) {
    dispatch(addMemberFail(error.response.data.message));
  }
};

//Verify user
export const verifyUser = (otp,token) => async (dispatch) => {
  try {
    dispatch(OTPVerificationRequest());

    const config = { headers: { 
      "Content-Type": "application/json",
    },
    withCredentials: true
   };

    const { data } = await axios.put(`${server}/users/verify/${token}`,
    {otp},
    config
    );

    dispatch(OTPVerificationSuccess(data));
  } catch (error) {
    dispatch(OTPVerificationFail(error.response.data.message));
  }
};

//LoadUser
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    let token = localStorage.getItem("Access-Token");

    const config = {
      headers: {
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
  }

    const { data } = await axios.get(`${server}/users/current-user`,
    config
    );

    dispatch(loadUserSuccess(data.data.user));
  } catch (error) {
    console.log(error)
    dispatch(loadUserFail(error.response.data.message));
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {

    dispatch(logoutRequest());

    let token = localStorage.getItem("Access-Token");

    const config = {
      headers: {
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
  }
      
    const { data } = await axios.get(`${server}/users/logout`,
    config
    );

    dispatch(logoutSuccess(data.message));
    localStorage.setItem("Access-Token","");
    localStorage.setItem("Refresh-Token","");

  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

//Update Avatar
export const updateAvatar = (userData) => async (dispatch) => {
  try {
    dispatch(updateAvatarRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
    "Content-Type": "multipart/form-data",
    'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
  };

    const {data}  = await axios.put(`${server}/users/update-avatar`,
   userData,
    config,
    );


    dispatch(updateAvatarSuccess(data));
  } catch (error) {
    dispatch(updateAvatarFail(error.response.data.message));
  }
};

//Change Membership Status
export const changeMemshipStatus = (membershipStatus,id) => async (dispatch) => {
  try {
    dispatch(changeMembershipRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
    "Content-Type": "application/json",
    'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
  };

    const {data}  = await axios.put(`${server}/users/change-membershipStatus/${id}`,
   {membershipStatus},
    config,
    );


    dispatch(changeMembershipSuccess(data));
  } catch (error) {
    dispatch(changeMembershipFail(error.response.data.message));
  }
};

// Change Password
export const updatePassword = (userData) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
}

    const { data } = await axios.put(`${server}/users/change-password`, userData, config);

    dispatch(updatePasswordSuccess(data));
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`${server}/users/forgot-password`, {email}, config);

    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};

// Reset Password
export const resetPassword = (formData,token) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${server}/users/reset-password/${token}`,
      formData,
      config
    );

    dispatch(resetPasswordSuccess(data));
    localStorage.setItem("Access-Token",data.data.accessToken);
    localStorage.setItem("Refresh-Token",data.data.refreshToken);
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
  }
};

// Get All Users
export const getMembers = (keyword = "", currentPage = 1, status) => async (dispatch) => {
  try {
    dispatch(allMemberRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
    }

    let link = `${server}/users/get-users?keyword=${keyword}&page=${currentPage}`;

      if(status){
        link = `${server}/users/get-users?keyword=${keyword}&page=${currentPage}&membershipStatus=${status}`;
      }

    const { data } = await axios.get(link,config);

    dispatch(allMemberSuccess(data));
  } catch (error) {
    dispatch(allMemberFail(error.response.data.message));
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