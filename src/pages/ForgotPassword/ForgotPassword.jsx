import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, forgotPassword } from '../../redux/actions/userAction';
import toast from 'react-hot-toast';
import MetaData from "../../components/MetaData/MetaData"
import InitialLoader from '../../components/Loader/InitialLoader/InitialLoader';

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const { loading, error ,userLoading} = useSelector((state)=>state.user);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email.trim()));
    setEmail("");

  }

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearErrors());
    }
    
},[dispatch,error]);

  return (
    <>
    <MetaData title={`FORGOT PASSWORD`} />
    {userLoading ? <InitialLoader />
    :
    <div className='login-page' style={{justifyContent: "center" , alignItems: "center"}}>
    <div className='login-right' style={{ backgroundColor: "var(--darkwhite)" , borderRadius: "10px"}}>
      <div className='login-content'>
        <div className='login-subheading'>
          <h6>Forgot password</h6>
          <p>Enter your email to get the reset link</p>
        </div>
        <form className='login-form' onSubmit={submitHandler}>
          <div className='login-email'>
                <input type="email" onChange={(e)=>(setEmail(e.target.value)) } value={email} placeholder='Email' required={true} />
          </div>
          <button type='submit' className='login-button'>{loading?<span className='loader'></span>:"Get Link"}</button>
        </form>
      </div>
    </div>
</div>}
</>
  )
}

export default ForgotPassword