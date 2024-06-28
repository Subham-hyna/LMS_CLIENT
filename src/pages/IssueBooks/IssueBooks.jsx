import React, { useEffect, useState } from 'react'
import PageHeading from '../../components/PageHeading/PageHeading'
import { Pagination, Tooltip } from '@mui/material'
import ConfirmationModal from '../../modals/ConfirmationModal/ConfirmationModal'
import BookDetailsModal from '../../modals/BookDetailsModal/BookDetailsModal'
import AccountModal from '../../modals/AccountModal/AccountModal'
import { useDispatch, useSelector } from 'react-redux'
import { approveIssueRequest, clearIssueErrors, clearIssueMessages, deleteIssueRequest, getIssueRequest, getSingleUserIssueRequest } from '../../redux/actions/issueAction'
import TableLoader from '../../components/Loader/TableLoader/TableLoader'
import { getMembers } from '../../redux/actions/userAction'
import toast from 'react-hot-toast'
import RefreshIcon from '@mui/icons-material/Refresh';
import MetaData from "../../components/MetaData/MetaData"

const IssueBooks = () => {

const { issueLoading, issues, issueError,resultPerPage,issueFilteredCount, issueMessage} = useSelector((state)=>state.issue);
const dispatch = useDispatch();

const [allIssues , setAllIssues] = useState([]);
const [searchResult , setSearchResult] = useState(false);
const [page, setPage] = useState(1);
const [searchUserName, setSearchUserName] = useState("")

const resetHandler = () => {
    dispatch(getIssueRequest(1,"PENDING"));
    setPage(1);
    setSearchResult(false);
    setSearchUserName("");
  }

const onPageChange = (event, value) => {
    setPage(value);
};

  const memberSearch = (value) => {
    if(value.trim() === ""){
        setSearchResult(false);
        return 
    }
    dispatch(getMembers(value))
    setSearchResult(true);
  }

  const issueSearch = (userId,name) => {
    dispatch(getSingleUserIssueRequest(1,userId,"PENDING"));
    setSearchUserName(name);
    setSearchResult(false);
  }

  const approveHandler = (id) => {
    console.log(id);
    dispatch(approveIssueRequest(id));
  }

  const cancelHandler = (id) => {
    dispatch(deleteIssueRequest(id));
  }

  useEffect(()=>{
    dispatch(getIssueRequest(page,"PENDING"));
  },[dispatch,issueMessage,page])

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
    <MetaData title={`ISSUE REQUEST`} />
       <PageHeading
        heading={"Issue Books"}
        subHeading={"To issue a book and view the book report"}
        searchHandler={memberSearch}
        issueSearch={issueSearch}
        placeholder={"Members by name, Id"}
        searchData={searchResult}
       />
       <div className='page-middle'>
        <div>
            <span onClick={resetHandler}>
        <Tooltip title="Reset">
          <RefreshIcon />
        </Tooltip></span>
        </div>
      <div>
      {issues && issues.length === 0 ? <span><h5>{`NO PENDING REQUEST ${searchUserName && "BY"} ${searchUserName.toLocaleUpperCase()}`}</h5></span>
            :
      <table className='table'>
       <thead>
         <tr>
           <th>Member</th>
           <th><pre>Register ID</pre></th>
           <th>Title</th>
           <th>Author</th>
           <th><pre>Request Date</pre></th>
           <th>Status</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>
       {issueLoading ? <TableLoader column={7} /> :<>{allIssues && allIssues.map((i,index)=>(
             <tr key={index}>
               <td>
                <AccountModal user={i.userId}><pre>{i.userId.name}</pre></AccountModal>
               </td>
               <td><AccountModal user={i.userId}>{i.userId.registrationNo}</AccountModal></td>
               <td>
                <BookDetailsModal book={i.bookId}><pre>{i.bookId.title}</pre></BookDetailsModal>
               </td>
               <td>
                <BookDetailsModal book={i.bookId}><pre>{i.bookId.author}</pre></BookDetailsModal>
                </td>
               <td><pre>{i.createdAt.split("T")[0]}</pre></td>
               <td style={i.bookId.stock > 0 ? {color:"var(--green)"}:{color:"var(--red)"}}><pre>{i.bookId.stock > 0 ? "Available" : "Out-of-Stock"}</pre></td>
               <td>
                 <ConfirmationModal heading={"Approve Request"} subHeading={"Are you sure to approve this Issue Request"} data={i} state={"success"} confirmationHandler={approveHandler} >Approve</ConfirmationModal>
                 <ConfirmationModal heading={"Cancel Request"} subHeading={"Are you sure to cancel this Issue Request"} data={i} state={"danger"} confirmationHandler={cancelHandler} >Cancel</ConfirmationModal>
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
            color="secondary"
            size="medium"
          />
        )}
      </span>
     </div>
  )
}

export default IssueBooks