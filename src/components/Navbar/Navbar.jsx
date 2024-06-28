import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { ADMIN } from '../../constants.js';
import AccountModal from '../../modals/AccountModal/AccountModal.jsx';
import ChangePasswordModal from '../../modals/ChangePasswordModal/ChangePasswordModal.jsx';
import UpdateAvatarModal from '../../modals/UpdateAvatarModal/UpdateAvatarModal';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingIssueRequest } from '../../redux/actions/issueAction';
import { Tooltip } from '@mui/material';

const Navbar = ({user}) => {

  const [seeDropdown , setSeeDropdown] = useState(false);
  const [searchBoxValue, setSearchBoxValue] = useState("");

  const { pendingIssueFilteredCount, issues } = useSelector((state)=>state.issue);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("CLick")
    navigate(`/member/books/${searchBoxValue}`)
  }

  useEffect(()=>{
    if(user.role === ADMIN){
      dispatch(getPendingIssueRequest(1,"PENDING"));
    }
  },[issues,dispatch,user])

  return (
    <nav className='navbar'>
        <Link to="/dashboard" className='n-left'>
          <LocalLibraryRoundedIcon className='library-icon' />
          <p>Librarify</p>
        </Link>
        <form className='n-middle' onSubmit={submitHandler}>
          <input type='text' placeholder='Search for Books' onChange={(e)=>{setSearchBoxValue(e.target.value)}} value={searchBoxValue} />
          
        <Tooltip title="Search">
          <SearchRoundedIcon className='search-icon' onClick={submitHandler} />
        </Tooltip>
        </form>
        <div className='n-right'>
          {user && user.role === ADMIN && <Link to="/admin/issue-books">
          <Tooltip title="Issue Request">
            <NotificationsRoundedIcon/>
          </Tooltip>
            {(pendingIssueFilteredCount != 0) && <span>{ pendingIssueFilteredCount}</span>}
            </Link>}
          <div onMouseOver={()=>{setSeeDropdown(true)}} onMouseOut={()=>{setSeeDropdown(false)}} onClick={()=>{setSeeDropdown(!seeDropdown)}}>
            <img src={user && user.avatar.url}  alt='profile-pic'/>
            <span>
              <p>{user && user.name.split(" ")[0].toUpperCase()}</p>
              <p>{user && user.role}</p>
            </span>
            <ArrowDropDownRoundedIcon className='dropdown-icon' />
            <div className='profile-dropdown' style={seeDropdown ? {display:"block"} : {display:"none"}}>
              <ul>
                <AccountModal user={user} onClick={()=>{setSeeDropdown(false)}}>My Account</AccountModal>
                <UpdateAvatarModal onClick={()=>{setSeeDropdown(false)}} />
                <ChangePasswordModal onClick={()=>{setSeeDropdown(false)}} />
              </ul>
            </div>
          </div>
        </div>
    </nav>
  )
}

export default Navbar