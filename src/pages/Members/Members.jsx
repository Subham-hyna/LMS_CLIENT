import React, { useEffect, useState } from 'react'
import './Members.css'
import PageHeading from '../../components/PageHeading/PageHeading'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import AddMemberModal from '../../modals/AddMemberModal/AddMemberModal';
import { Pagination, Tooltip } from '@mui/material';
import AccountModal from '../../modals/AccountModal/AccountModal';
import ChangeMembershipModal from '../../modals/ChangeMembershipModal/ChangeMembershipModal';
import { MEMBERSHIP_STATUS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, clearMessages, getMembers } from '../../redux/actions/userAction';
import toast from 'react-hot-toast';
import TableLoader from '../../components/Loader/TableLoader/TableLoader';
import RefreshIcon from '@mui/icons-material/Refresh';
import MetaData from "../../components/MetaData/MetaData"

const Members = () => {

  const { loading, users , resultPerPage, userFilteredCount, error, message, isChanged } = useSelector((state)=>state.user);

  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { keyword } = useParams();

  const resetHandler = () => {
    dispatch(getMembers("",1,""));
    setPage(1);
    setStatus("");
    setSearchValue("");
    navigate("/admin/members")
  }

  const onPageChange = (event, value) => {
    setPage(value);
  };

  const memberSearch = (value) => {
    setSearchValue(value);
    if(value === ""){
      return
    }
    if(value.length > 0){
        navigate(`/admin/members/${value.trim()}`)
      }
      else{
        navigate("/admin/members")
      }
  }

  useEffect(()=>{
    dispatch(getMembers(keyword,page,status))
  },[dispatch,page,keyword,status,isChanged])

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
    if(message){
        toast.success(message);
        dispatch(clearMessages());
    }
    
  },[dispatch,error])

  return (
    <div className='admin-page'>
    <MetaData title={`MEMBERS`} />
       <PageHeading
        heading={"Members"}
        subHeading={"To create a member and view the member report"}
        searchHandler={memberSearch}
        placeholder={"Members by name, Id"}
        button={<AddMemberModal buttonIcon={<PersonAddAltRoundedIcon/>} buttonText={"Add Member"} />}
       />
       <div className='page-middle'>
       <div>
    <select value={status} onChange={(e)=>(setStatus(e.target.value))}>
                        <option value="" >Membership Status</option>
                        { MEMBERSHIP_STATUS && MEMBERSHIP_STATUS.map((m,index)=>(
                        <option key={index} value={m} >{m}</option>
                        ))}
        </select>
        <span onClick={resetHandler}>
        <Tooltip title="Reset">
          <RefreshIcon />
        </Tooltip></span>
        </div>
       <div>

      {users && users.length === 0 ? <span><h5>{`NO ${status && status} USERS FOUND ${searchValue && 'FOR'} "${searchValue}"`}</h5></span>
            :
        <table className='table'>
        <thead>
          <tr>
            <th><pre>Register ID</pre></th>
            <th>Member</th>
            <th><pre>Email ID</pre></th>
            <th><pre>Membership Status</pre></th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {loading ? <TableLoader column={5} /> :<>{users && users.map((m,index)=>(
              <tr key={index}>
                <td>{m.registrationNo}</td>
                <td><pre>{m.name}</pre></td>
                <td>{m.email}</td>
                <td>{m.membershipStatus}</td>
                <td>
                  <ChangeMembershipModal member={m}>Edit</ChangeMembershipModal>
                  <AccountModal user={m}><pre>View Details</pre></AccountModal>
                </td>
              </tr>
            ))}</>}
        </tbody>
       </table>}
       </div>
       </div>
       <span>
        {userFilteredCount > resultPerPage && (
          <Pagination
            count={Math.ceil(userFilteredCount / resultPerPage)}
            page={page}
            onChange={onPageChange}
            size="medium"
          />
        )}
      </span>
     </div>
  )
}

export default Members

