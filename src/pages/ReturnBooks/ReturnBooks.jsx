import React, { useEffect, useState } from 'react'
import PageHeading from '../../components/PageHeading/PageHeading'
import { Pagination, Tooltip } from '@mui/material'
import ConfirmationModal from '../../modals/ConfirmationModal/ConfirmationModal'
import BookDetailsModal from '../../modals/BookDetailsModal/BookDetailsModal'
import AccountModal from '../../modals/AccountModal/AccountModal'
import { useDispatch, useSelector } from 'react-redux'
import TableLoader from '../../components/Loader/TableLoader/TableLoader'
import { clearIssueErrors, clearIssueMessages, getIssueRequest, getSingleUserIssueRequest, renewIssue, returnIssue } from '../../redux/actions/issueAction'
import toast from 'react-hot-toast'
import { getMembers } from '../../redux/actions/userAction'
import RefreshIcon from '@mui/icons-material/Refresh';
import MetaData from "../../components/MetaData/MetaData"

const ReturnBooks = () => {

const { issueLoading, issues, issueError,resultPerPage,issueFilteredCount, issueMessage} = useSelector((state)=>state.issue);
const dispatch = useDispatch();
    
const [allIssues , setAllIssues] = useState([]);
const [searchResult , setSearchResult] = useState(false);
const [page, setPage] = useState(1);
const [searchUserName, setSearchUserName] = useState("")

const onPageChange = (event, value) => {
    setPage(value);
};

const resetHandler = () => {
    dispatch(getIssueRequest(1,"ISSUED"));
    setPage(1);
    setSearchResult(false);
    setSearchUserName("");
}

  const memberSearch = (value) => {
    if(value.trim() === ""){
        setSearchResult(false);
        return 
    }
    dispatch(getMembers(value))
    setSearchResult(true);
  }

  const issueSearch = (userId,name) => {
    dispatch(getSingleUserIssueRequest(1,userId,"ISSUED"));
    setSearchUserName(name);
    setSearchResult(false);
  }

  const renewHandler = (id) => {
    dispatch(renewIssue(id));
  }

  const returnHandler = (id) => {
    dispatch(returnIssue(id));
  }

  useEffect(()=>{
    dispatch(getIssueRequest(page,"ISSUED"));
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
        <MetaData title={`RETURN BOOKS`} />
       <PageHeading
        heading={"Return Books"}
        subHeading={"To issue a book and view the issue report"}
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
        </Tooltip></span></div>
      <div>
        <table className='table'>
       <thead>
         <tr>
           <th>Member</th>
           <th><pre>Register ID</pre></th>
           <th>Title</th>
           <th>Author</th>
           <th><pre>Issue Date</pre></th>
           <th><pre>Due Date</pre></th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody style={allIssues.length === 0 ? {height:"300px"} : {} } >
       {issueLoading ? <TableLoader column={7} /> :<>{allIssues && allIssues.length === 0 ? <span><h5>{`NO BOOK IS ISSUED ${searchUserName && "BY"} ${searchUserName.toUpperCase()}`}</h5></span>
            : 
            allIssues.map((i,index)=>(
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
               <td><pre>{i?.issueDate && i.issueDate.split("T")[0]}</pre></td>
               <td><pre>{i?.dueDate && i.dueDate.split("T")[0]}</pre></td>
              <td>
                 <ConfirmationModal heading={"Renew Issue"} subHeading={"Are you sure to increase the Due Date by 10 days"} data={i} state={"success"} confirmationHandler={renewHandler} >Renew</ConfirmationModal>
                 <ConfirmationModal heading={"Return Book"} subHeading={"Are you sure to return this Issue"} data={i} state={"danger"} confirmationHandler={returnHandler}>Return</ConfirmationModal>
               </td>
             </tr>
           ))}</>}
       </tbody>
      </table>
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

export default ReturnBooks