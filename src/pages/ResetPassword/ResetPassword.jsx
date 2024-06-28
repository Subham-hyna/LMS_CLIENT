import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, resetPassword } from '../../redux/actions/userAction';
import { resetPasswordReset } from '../../redux/reducers/userReducer';
import MetaData from "../../components/MetaData/MetaData"

const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { user,loading, error, isChanged } =useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
  
    const submitHandler = (e) => {
      e.preventDefault();
      if(password !== confirmPassword){
        return toast.error("Passwords not matched");
      }

      const formData = new FormData();

      formData.append("password",password);
      formData.append("confirmPassword",confirmPassword);

      dispatch(resetPassword(formData,token));

      setPassword("");
      setConfirmPassword("");
  
    }

    useEffect(()=>{
      if(error){
        toast.error(error)
        dispatch(clearErrors());
      }
      if(isChanged){
          dispatch(resetPasswordReset());
      }
      if(user.name){
          navigate("/member/dashboard")
      }
  },[dispatch,isChanged,error,user]);
  
    return (
      <>
      <MetaData title={`RESET PASSWORD`} />
      <div className='login-page' style={{justifyContent: "center" , alignItems: "center"}}>
      <div className='login-right' style={{ backgroundColor: "var(--darkwhite)" , borderRadius: "10px"}}>
        <div className='login-content'>
          <div className='login-subheading'>
            <h6>Reset Password</h6>
            <p>Please reset your password</p>
          </div>
          <form className='login-form' onSubmit={submitHandler}>
          <div className='login-password' >
                    <input style={{ marginBottom: "0px"}} type={showPassword ? "text" : "password"} onChange={(e)=>(setPassword(e.target.value)) } value={password} placeholder='Password' required={true} />
                    {!showPassword ? <VisibilityOffIcon onClick={()=>{setShowPassword(!showPassword)}} /> : <VisibilityIcon onClick={()=>{setShowPassword(!showPassword)}}/>}
              </div>
          <div className='login-password'>
                    <input style={{ marginBottom: "0px"}} type={showConfirmPassword ? "text" : "password"} onChange={(e)=>(setConfirmPassword(e.target.value)) } value={confirmPassword} placeholder='Confirm Password' required={true} />
                    {!showConfirmPassword ? <VisibilityOffIcon onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}} /> : <VisibilityIcon onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}/>}
              </div>
            <button type='submit' className='login-button'>{loading?<span className='loader'></span>:"Reset"}</button>
          </form>
        </div>
      </div>
  </div>
  </>
  )
}

export default ResetPassword