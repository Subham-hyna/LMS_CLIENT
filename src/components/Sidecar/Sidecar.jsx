import React, { useEffect, useState } from 'react'
import './Sidecar.css'
import { Link } from 'react-router-dom'
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import { useLocation } from 'react-router-dom';
import { ADMIN } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, logout } from '../../redux/actions/userAction';

const Sidecar = ({user}) => {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState("");

  
  const { error,loading } = useSelector((state)=>state.user)
  
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  }
  
  
  useEffect(()=>{
    const uri = pathname.split("/");
    setActiveTab(uri[2]);
    window.scrollTo(0, 0);

  if(error){
    toast.error(error)
    dispatch(clearErrors());
  }

  },[activeTab,setActiveTab,pathname]);
  

  return (
   <>
    <div className='sidecar'>
      <ul className='sidecar-upper'>
        <Link to="/member/dashboard" onClick={()=>{setActiveTab("dashboard")}} className={activeTab === "dashboard" ? "active-tab" : ""} >
          <SpaceDashboardRoundedIcon style={ activeTab === "dashboard" ? {color : "white"} : {}} />
          <p style={ activeTab === "dashboard" ? {color : "white"} : {}}>Dashboard</p></Link>
        {user?.role === ADMIN && <Link to="/admin/members" onClick={()=>{setActiveTab("members")}} className={activeTab === "members" ? "active-tab" : ""} >
          <PeopleAltRoundedIcon style={ activeTab === "members" ? {color : "white"} : {}} />
          <p style={ activeTab === "members" ? {color : "white"} : {}} >Members</p>
        </Link>}
        <Link to="/member/books" onClick={()=>{setActiveTab("books")}} className={activeTab === "books" ? "active-tab" : ""} >
          <MenuBookRoundedIcon style={ activeTab === "books" ? {color : "white"} : {}} />
          <p style={ activeTab === "books" ? {color : "white"} : {}}>Books</p>
        </Link>
        {user?.role === ADMIN && <Link to="/admin/issue-books" onClick={()=>{setActiveTab("issue-books")}} className={activeTab === "issue-books" ? "active-tab" : ""} >
          <StyleRoundedIcon style={ activeTab === "issue-books" ? {color : "white"} : {}} />
          <p style={ activeTab === "issue-books" ? {color : "white"} : {}}><pre>Issue Request</pre></p>
        </Link>}
        {user?.role === ADMIN && <Link to="/admin/return-books" onClick={()=>{setActiveTab("return-books")}} className={activeTab === "return-books" ? "active-tab" : ""} >
          <LibraryBooksRoundedIcon style={ activeTab === "return-books" ? {color : "white"} : {}} />
          <p style={ activeTab === "return-books" ? {color : "white"} : {}}><pre>Return Books</pre></p>
        </Link>}
        {user?.role === ADMIN && <Link to="/admin/issue-history" onClick={()=>{setActiveTab("issue-history")}} className={activeTab === "issue-history" ? "active-tab" : ""} >
          <HistoryRoundedIcon style={ activeTab === "issue-history" ? {color : "white"} : {}} />
          <p style={ activeTab === "issue-history" ? {color : "white"} : {}}><pre>Issue History</pre></p>
        </Link>}
        <Link to="/member/my-issues" onClick={()=>{setActiveTab("my-issues")}} className={activeTab === "my-issues" ? "active-tab" : ""} >
          <ImportContactsRoundedIcon style={ activeTab === "my-issues" ? {color : "white"} : {}} />
          <p style={ activeTab === "my-issues" ? {color : "white"} : {}}><pre>My Issues</pre></p>
        </Link>
      </ul>
      <div className='sidecar-lower'>
        <Link onClick={logoutHandler} >
          <LogoutRoundedIcon />
          <p>Logout</p>
        </Link>
      </div>
    </div>
   </>
  )
}

export default Sidecar