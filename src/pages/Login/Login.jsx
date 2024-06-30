import React, { useEffect, useState } from 'react'
import './Login.css'
import LoginLogo from '../../assets/Login-page.png'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../redux/actions/userAction';
import toast from 'react-hot-toast';
import MetaData from "../../components/MetaData/MetaData"

const Login = () => {
  const [auth, setAuth] = useState("")
  const [email, setEmail] = useState("")
  const [registrationNo, setRegistrationNo] = useState("");
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { user,error,isAuthenticated,loading } = useSelector((state)=>state.user)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email.trim(),registrationNo.trim(),password.trim()))
    setEmail("");
    setRegistrationNo("")
    setPassword("")

  }

  const adminTestLogin = ()=> {
    dispatch(login("","000000","123456"))
  }

  useEffect(()=>{
    if(isAuthenticated){
        navigate("/member/dashboard");
    }
}
,[isAuthenticated,navigate])

useEffect(()=>{
    if(error){
        toast.error(error);
        dispatch(clearErrors());
    }
    if(isAuthenticated){
        navigate("/member/dashboard");
    }
    
}
,[dispatch,error,isAuthenticated,loading,user,navigate])

  return (
    <>
    <MetaData title={`LOGIN`} />
    <div className='login-page'>
        <div className='login-left'>
          <img width="700" src={LoginLogo} alt='Login-page' />
        </div>
        <div className='login-right'>
          <div className='login-content'>
            <div className='login-heading'>
              <LocalLibraryIcon />
              <h5>Librarify</h5>
            </div>
            <div className='login-subheading'>
              <h6>Welcome to Librarify!</h6>
              <p>Please sign-in to your account</p>
            </div>
            <form className='login-form' onSubmit={submitHandler}>
              <div className='login-through'>
                <p>Login by</p>
                <select value={auth} onChange={(e)=>(setAuth(e.target.value))}>
                        <option value="" >Select</option>
                        <option value="EMAIL" >EMAIL</option>
                        <option value="REGISTERNO" >REGISTRATION NO</option>
                </select>
              </div>
              { auth === "EMAIL" && <div className='login-email'>
                    <input type="email" onChange={(e)=>(setEmail(e.target.value)) } value={email} placeholder='Email' />
              </div>}
             { auth === "REGISTERNO" && <div className='login-registrationNo'>
                    <input type="text" onChange={(e)=>(setRegistrationNo(e.target.value)) } value={registrationNo} placeholder='Registration No'/>
              </div>}
              { auth !== "" && <div className='login-password'>
                    <input type={showPassword ? "text" : "password"} onChange={(e)=>(setPassword(e.target.value)) } value={password} placeholder='Password' required={true} />
                    {!showPassword ? <VisibilityOffIcon onClick={()=>{setShowPassword(!showPassword)}} /> : <VisibilityIcon onClick={()=>{setShowPassword(!showPassword)}}/>}
                <Link to='/forgot-password' >Forgot Password?</Link>
              </div>}
             {auth !== "" &&  <button type='submit' className='login-button'>{loading ? <span className="loader"></span> :"Login"}</button>}
            </form>
             {auth !== "" &&  <button style={{backgroundColor: "var(--red)"}} onClick={adminTestLogin} className='login-button'>{loading ? <span className="loader"></span> :"Admin Test Login"}</button>}
          </div>
        </div>
    </div>
    </>
  )
}

export default Login