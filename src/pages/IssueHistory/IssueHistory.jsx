import React, { useEffect, useState } from 'react'
import PageHeading from '../../components/PageHeading/PageHeading';
import BookDetailsModal from '../../modals/BookDetailsModal/BookDetailsModal';
import AccountModal from '../../modals/AccountModal/AccountModal';
import { Pagination, Tooltip } from '@mui/material';
import { ISSUE_TRANSACTION_TYPE } from '../../constants';
import TableLoader from '../../components/Loader/TableLoader/TableLoader';
import { useDispatch, useSelector } from 'react-redux';
import { clearIssueErrors, clearIssueMessages, getIssueRequest, getSingleUserIssueRequest } from '../../redux/actions/issueAction';
import toast from 'react-hot-toast';
import { getMembers } from '../../redux/actions/userAction';
import RefreshIcon from '@mui/icons-material/Refresh';
import MetaData from "../../components/MetaData/MetaData"
import { useNavigate, useParams } from 'react-router-dom';

const IssueHistory = () => {

    const { issueLoading, issues, issueError, resultPerPage,issueFilteredCount,issueMessage} = useSelector((state)=>state.issue);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [allIssues , setAllIssues] = useState([]);
    const [searchResult , setSearchResult] = useState(false);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("");
    const [searchUserName, setSearchUserName] = useState("")
    
    const { userId } = useParams();
    
    const onPageChange = (event, value) => {
        setPage(value);
    };

    const resetHandler = () => {
      dispatch(getIssueRequest(1,""));
      setPage(1);
      setSearchResult(false);
      setSearchUserName("");
      setStatus("");
      navigate("/admin/issue-history")
    }
    
    const memberSearch = (value) => {
      if(value.trim() === ""){
        setSearchResult(false);
        navigate("/admin/issue-history")
            return 
        }
        dispatch(getMembers(value))
        setSearchResult(true);
      }
    
      const issueSearch = (userId,name) => {
        navigate(`/admin/issue-history/${userId}`)
        // dispatch(getSingleUserIssueRequest(page,userId,status));
        setSearchUserName(name);
        setSearchResult(false);
      }
    
      useEffect(()=>{

        if(userId !== undefined){
          dispatch(getSingleUserIssueRequest(page,userId,status));
        }else{
          dispatch(getIssueRequest(page,status));
        }
      },[dispatch,issueMessage,status,page,userId])
    
      useEffect(()=>{
            setAllIssues(issues);
      },[issues])
    
      useEffect(()=>{
        if(issueError){
            toast.success(issueError);
            dispatch(clearIssueErrors());
        }
        if(issueMessage){
          toast.success(issueMessage);
          dispatch(clearIssueMessages());
        }
        
      },[dispatch,issueMessage,issueError])

    

  return (
    <div className='admin-page'>
    <MetaData title={`ISSUE HISTORY`} />
    <PageHeading
     heading={"Issue History"}
     subHeading={"To view all your issues"}
     searchHandler={memberSearch}
     issueSearch={issueSearch}
     placeholder={"Members by name, Regsiter ID"}
     searchData={searchResult}
    />
    <div className='page-middle'>
    <div>
    <select value={status} onChange={(e)=>(setStatus(e.target.value))}>
                        <option value="" >Status</option>
                        {ISSUE_TRANSACTION_TYPE && ISSUE_TRANSACTION_TYPE.map((m,index)=>(
                        <option key={index} value={m} >{m}</option>
                        ))}
    </select>
    <span onClick={resetHandler}>
        <Tooltip title="Reset">
          <RefreshIcon />
        </Tooltip></span>
    </div>
      <div>
      {issues && issues.length === 0 ? <span><h5>{`NO ${status} ISSUES FOR ${searchUserName.toUpperCase()}`}</h5></span>
            :
        <table className='table'>
       <thead>
         <tr>
           <th>Member</th>
           <th><pre>Register ID</pre></th>
           <th>Title</th>
           <th>Author</th>
           <th><pre>Request Date</pre></th>
           <th><pre>Issue Date</pre></th>
           <th><pre>Due Date</pre></th>
           <th>Status</th>
         </tr>
       </thead>
       <tbody>

       {issueLoading ? <TableLoader column={8} /> :<>{allIssues && allIssues.map((i,index)=>(
             <tr key={index}> 
               <td>
                <AccountModal user={i.userId}><pre>{i.userId.name}</pre></AccountModal>
               </td>
               <td><AccountModal user={i.userId}><pre>{i.userId.registrationNo}</pre></AccountModal></td>
               <td>
                <BookDetailsModal book={i.bookId}><pre>{i.bookId.title}</pre></BookDetailsModal>
               </td>
               <td>
                <BookDetailsModal book={i.bookId}><pre>{i.bookId.author}</pre></BookDetailsModal>
                </td>
               <td><pre>{i.createdAt?.split("T")[0]}</pre></td>
               <td><pre>{i.issueDate?.split("T")[0]}</pre></td>
               <td><pre>{i.dueDate?.split("T")[0]}</pre></td>
              <td>{i.transactionType}</td>
             </tr>
           ))}</>}
       </tbody>
      </table>}
      </div>
      </div>
      <span>
        {issueFilteredCount > resultPerPage && (
          <Pagination
            count={Math.ceil(issueFilteredCount / resultPerPage)}
            page={page}
            onChange={onPageChange}
            size="medium"
          />
        )}
      </span>
    </div>
  )
}

export default IssueHistory