import React, { useEffect, useState } from 'react'
import BookDetailsModal from '../../modals/BookDetailsModal/BookDetailsModal';
import PageHeading from '../../components/PageHeading/PageHeading';
import { Pagination, Tooltip } from '@mui/material';
import ConfirmationModal from '../../modals/ConfirmationModal/ConfirmationModal';
import { ISSUE_TRANSACTION_TYPE } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { clearIssueErrors, clearIssueMessages, deleteCurrentUserIssueRequest, getCurrentUserIssueRequest } from '../../redux/actions/issueAction';
import TableLoader from '../../components/Loader/TableLoader/TableLoader';
import RefreshIcon from '@mui/icons-material/Refresh';
import MetaData from "../../components/MetaData/MetaData"

const MyIssues = () => {
    const { issueLoading, issues, issueError, resultPerPage,issueFilteredCount,issueMessage} = useSelector((state)=>state.issue);
    const dispatch = useDispatch();
    
    const [allIssues , setAllIssues] = useState([]);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("");
    
    
    const onPageChange = (event, value) => {
        setPage(value);
    };

    const resetHandler = () => {
        dispatch(getCurrentUserIssueRequest(1,""));
        setPage(1);
        setStatus("");
    }

    const cancelHandler = (id) => {
        dispatch(deleteCurrentUserIssueRequest(id));
      }

    useEffect(()=>{
          dispatch(getCurrentUserIssueRequest(page,status));
      },[dispatch,issueMessage,status,page])
    
      useEffect(()=>{
            setAllIssues(issues);
      },[issues,allIssues])
    
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
    <MetaData title={`MY ISSUES`} />
    <PageHeading
     heading={"My Issues"}
     subHeading={"To view all your issues"}
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
  {issues && issues.length === 0 ? <span><h5>{`NO ${status} ISSUES`}</h5></span>
            :
    <table className='table'>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th><pre>Request Date</pre></th>
        <th><pre>Issue Date</pre></th>
        <th><pre>Due Date</pre></th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {issueLoading ? <TableLoader column={7} /> :<>{allIssues && allIssues.map((i,index)=>(
          <tr key={index}>
            <td>
             <BookDetailsModal book={i.bookId}><pre>{i.bookId.title}</pre></BookDetailsModal>
            </td>
            <td>
             <BookDetailsModal book={i.bookId}><pre>{i.bookId.author}</pre></BookDetailsModal>
             </td>
            <td><pre>{i.createdAt.split("T")[0]}</pre></td>
            <td><pre>{i.issueDate?.split("T")[0]}</pre></td>
            <td><pre>{i.dueDate?.split("T")[0]}</pre></td>
            <td>{i.transactionType}</td>
            <td>
                { i.transactionType==="PENDING" && <ConfirmationModal heading={"Cancel Request"} subHeading={"Are you sure to cancel this Issue Request"} data={i} state={"danger"} confirmationHandler={cancelHandler} >Cancel</ConfirmationModal>}
            </td>
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

export default MyIssues