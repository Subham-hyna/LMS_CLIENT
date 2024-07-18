import React, { useEffect } from 'react'
import './Dashboard.css'
import { Link } from "react-router-dom";
import Boxes from '../../components/Boxes/Boxes';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import {ADMIN} from "../../constants"
import AccountModal from '../../modals/AccountModal/AccountModal';
import BookDetailsModal from '../../modals/BookDetailsModal/BookDetailsModal';
import TableLoader from '../../components/Loader/TableLoader/TableLoader';
import { useDispatch, useSelector } from 'react-redux';
import DateTime from '../../components/DateTime/DateTime';
import { getBooks } from '../../redux/actions/bookAction';
import { getMembers } from '../../redux/actions/userAction';
import { getCurrentUserIssueRequest, getIssueRequest, getPendingIssueRequest } from '../../redux/actions/issueAction';
import MetaData from "../../components/MetaData/MetaData"

const Dashboard = () => {

  const { loading, users, user, userFilteredCount } = useSelector((state)=>state.user);
  const bookLoading = useSelector((state)=>state.book);
  const { books, bookFilteredCount } = useSelector((state)=>state.book);
  const { issueLoading, issues, returnIssueFilteredCount, issuedIssueFilteredCount } = useSelector((state)=>state.issue);
  const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getBooks("",1,""));
  if(user?.role === ADMIN){
    dispatch(getMembers("",1,""));
    dispatch(getIssueRequest(1,""));
    dispatch(getPendingIssueRequest(1,"ISSUED"));
    dispatch(getPendingIssueRequest(1,"RETURNED"));
  }
  else{
    dispatch(getCurrentUserIssueRequest(1,""));
  }
},[dispatch])

  return (
   <div className='admin-page'>
   <MetaData title={`DASHBOARD`} />
      <div className='dashboard-heading'>
        <h3>Welcome, <span>{user?.name.split(" ")[0]}</span></h3>
        <DateTime />
      </div>
      {user?.role === ADMIN && <div className='dashboard-boxes'>
        <Boxes
        title={"Total Members"}
        value={userFilteredCount}
        icon={<PeopleAltIcon />}
        />
        <Boxes
        title={"Total Books"}
        value={bookFilteredCount}
        icon={<MenuBookIcon />}
        />
        <Boxes
        title={"Issued Books"}
        value={issuedIssueFilteredCount + returnIssueFilteredCount}
        icon={<BookmarkAddedIcon />}
        />
        <Boxes
        title={"Returned Books"}
        value={returnIssueFilteredCount}
        icon={<LibraryBooksIcon />}
        />
      </div>}
      <div className='dashboard-middle'>
        <div className='dashboard-books'>
        <div className='dashboard-last-heading'>
          <h5>Book List</h5>
          <Link to="/member/books">View all</Link>
        </div>
        <div>
        <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Edition</th>
            <th>{user.role === ADMIN ? "Quantity" : "Stock"}</th>
          </tr>
        </thead>
        <tbody style={books && books.length === 0 ? {height:"200px"} : {} }>
        {bookLoading.loading ? <TableLoader column={4} /> : <>
        {books && books.length === 0 ? <span><h5>NO BOOKS</h5></span>
            : 
            books && books.slice(0,5).map((b,index)=>(
              <tr key={index}>
                <td><BookDetailsModal book={b}><pre>{b.title}</pre></BookDetailsModal></td>
                <td><BookDetailsModal book={b}><pre>{b.author}</pre></BookDetailsModal></td>
                <td><BookDetailsModal book={b}>{b.edition}</BookDetailsModal></td>
                {user.role === ADMIN ? <td ><BookDetailsModal style={{backgroundColor: "inherit", color:"inherit"}} book={b}>{b.stock}</BookDetailsModal></td> :
                <td style={b.stock > 0 ? {color : "var(--green)"}:{color: "var(--red)"}} ><BookDetailsModal style={{backgroundColor: "inherit", color:"inherit"}} book={b}>{b.stock > 0 ? "Available" : "Out-of-Stock"}</BookDetailsModal></td>
                }
              </tr>
            ))}</>}
        </tbody>
       </table>
        </div>
        </div>
        { user?.role === ADMIN && 
        <div className='dashboard-issue-request'>
        <div className='dashboard-last-heading'>
          <h5>Members</h5>
          <Link to="/admin/members">View all</Link>
        </div>
            <div>
              <table className='table'>
            <thead>
              <tr>
                <th>Member</th>
                <th><pre>Register ID</pre></th>
                <th>Email</th>
                <th><pre>Membership Status</pre></th>
              </tr>
            </thead>
            <tbody style={users && users.length === 0 ? {height:"200px"} : {} } >
                {loading ? <TableLoader column={4} /> : <>
              {users && users.length === 0 ? <span><h5>NO MEMBERS</h5></span>
              :  
              users && users.slice(0,5).map((u,index)=>(
                  <tr key={index}>
                    <td>
                     <AccountModal user={u}><pre>{u.name}</pre></AccountModal>
                    </td>
                    <td><AccountModal user={u}>{u.registrationNo}</AccountModal></td>
                    <td><AccountModal user={u}><pre>{u.email}</pre></AccountModal></td>
                    <td><AccountModal user={u} style={{backgroundColor: "inherit", color:"inherit"}} ><pre>{u.membershipStatus}</pre></AccountModal></td>
                  </tr>
                ))}</>}
            </tbody>
           </table>
            </div>
        </div>
        }
      </div>
      {user?.role === ADMIN ?
      <div className='admin-dashboard-last'>
        <div className='dashboard-last-heading'>
          <h5>Recent Issues</h5>
          <Link to="/admin/issue-history">View all</Link>
        </div>
        <div>
        <table className='table'>
       <thead>
         <tr>
           <th>Member</th>
           <th>ID</th>
           <th>Title</th>
           <th>Author</th>
           <th><pre>Issue Date</pre></th>
           <th><pre>Return Date</pre></th>
           <th>Status</th>
         </tr>
       </thead>
       <tbody style={issues && issues.length === 0 ? {height:"200px"} : {} } >
       {issueLoading ? <TableLoader column={7} /> :<>
        {issues && issues.length === 0 ? <span><h5>NO ISSUES</h5></span>
            : 
            issues && issues.slice(0,5).map((i,index)=>(
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
               <td><pre>{i.issueDate?.split("T")[0]}</pre></td>
               <td><pre>{i.returnDate?.split("T")[0]}</pre></td>
              <td>{i.transactionType}</td>
             </tr>
           ))}</>}
       </tbody>
      </table>
        </div>
      </div>
      :
      <div className='admin-dashboard-last'>
        <div className='dashboard-last-heading'>
          <h5>Recent Issues</h5>
          <Link to="/member/my-issues">View all</Link>
        </div>
        <div>
        <table className='table'>
       <thead>
         <tr>
         <th>Title</th>
        <th>Author</th>
        <th><pre>Request Date</pre></th>
        <th><pre>Issue Date</pre></th>
        <th><pre>Due Date</pre></th>
        <th>Status</th>
         </tr>
       </thead>
       <tbody style={issues && issues.length === 0 ? {height:"200px"} : {} } >
       {issueLoading ? <TableLoader column={6} /> :<>
        {issues && issues.length === 0 ? <span><h5>NO ISSUES</h5></span>
            : 
            issues && issues.slice(0,5).map((i,index)=>(
             <tr key={index}> 
             <td>
              <BookDetailsModal book={i.bookId}>{i.bookId.title}</BookDetailsModal>
             </td>
             <td>
              <BookDetailsModal book={i.bookId}><pre>{i.bookId.author}</pre></BookDetailsModal>
              </td>
             <td><pre>{i.createdAt.split("T")[0]}</pre></td>
             <td><pre>{i.issueDate?.split("T")[0]}</pre></td>
             <td><pre>{i.dueDate?.split("T")[0]}</pre></td>
             <td>{i.transactionType}</td>
             </tr>
           ))}</>}
       </tbody>
      </table>
        </div>
      </div>
    }
    </div>
  )
}

export default Dashboard