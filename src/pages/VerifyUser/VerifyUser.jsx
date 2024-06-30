import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, verifyUser } from '../../redux/actions/userAction';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from "../../components/MetaData/MetaData"

const VerifyUser = () => {
  const [OTP, setOTP] = useState("")

  const { loading, message, error} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    if(OTP===""){
      return toast.error("Please enter the OTP");
    }
    
    dispatch(verifyUser(OTP.trim(),token))
    setOTP("");

  }

  useEffect(()=>{
    if(message){
      navigate("/");
    }
    if(error){
        toast.error(error);
        dispatch(clearErrors());
    }
},[dispatch,error,message]);

  return (
    <>
    <MetaData title={`VERIFY USER`} />
    <div className='login-page' style={{justifyContent: "center" , alignItems: "center"}}>
    <div className='login-right' style={{ backgroundColor: "var(--darkwhite)" , borderRadius: "10px"}}>
      <div className='login-content'>
        <div className='login-subheading'>
          <h6>Verify User</h6>
          <p>Please Enter the verification OTP</p>
        </div>
        <form className='login-form' onSubmit={submitHandler}>
          <div className='login-email'>
                <input type="text" onChange={(e)=>(setOTP(e.target.value)) } value={OTP} placeholder='OTP' required={true} />
          </div>
          <button type='submit' className='login-button'>{loading ? <span className='loader'></span>:"Verify"}</button>
        </form>
      </div>
    </div>
</div>
    </>
  )
}

export default VerifyUser