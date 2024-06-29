import React, { useEffect, useState } from 'react'
import PageHeading from '../../components/PageHeading/PageHeading'
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import AddBookModal from '../../modals/AddBookModal/AddBookModal';
import { Pagination, Tooltip } from '@mui/material';
import BookDetailsModal from '../../modals/BookDetailsModal/BookDetailsModal';
import EditBookModal from '../../modals/EditBookModal/EditBookModal';
import { ADMIN, BOOK_GENRE } from '../../constants';
import ConfirmationModal from '../../modals/ConfirmationModal/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TableLoader from '../../components/Loader/TableLoader/TableLoader';
import { clearErrors, clearMessages, getBooks } from '../../redux/actions/bookAction';
import toast from 'react-hot-toast';
import { clearIssueErrors, clearIssueMessages, issueRequest } from '../../redux/actions/issueAction';
import RefreshIcon from '@mui/icons-material/Refresh';
import MetaData from "../../components/MetaData/MetaData"


const Books = () => {


  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const { user } = useSelector((state)=>state.user);
  const { loading, books, resultPerPage, bookFilteredCount, error, isChanged, message } = useSelector((state)=>state.book);
  const { issueMessage , issueError } = useSelector((state)=>state.issue);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { keyword } = useParams();

  const resetHandler = () => {
    dispatch(getBooks("",1,""))
    setPage(1);
    setGenre("");
    setSearchValue("");
    navigate("/member/books")
  }

  const onPageChange = (event, value) => {
    setPage(value);
  };

  const bookSearch = (value) => {
    setSearchValue(value);
    if(value.length > 0){
      navigate(`/member/books/${value.trim()}`)
    }
    else{
      navigate("/member/books")
    }
  }
  useEffect(()=>{
    dispatch(getBooks(keyword,page,genre))
  },[dispatch,page,keyword,genre,isChanged,message])

  const confirmationHandler = (id) => {
    dispatch(issueRequest(id));
  }

  useEffect(()=>{
    if(error){
        toast.error(error);
        dispatch(clearErrors());
      }
    if(issueError){
        toast.success(issueError);
        dispatch(clearIssueErrors());
    }
    if(message){
        toast.success(message);
        dispatch(clearMessages());
    }
    if(issueMessage){
      toast.success(issueMessage);
      dispatch(clearIssueMessages());
    }
    
  },[dispatch,error,message,issueMessage,issueError])

  return (
    <div className='admin-page'>
    <MetaData title={`BOOKS`} />
       <PageHeading
        heading={"Books"}
        subHeading={"To add a book and view the book details"}
        searchHandler={bookSearch}
        placeholder={"Books by title, author, iSBN"}
        button={user.role === ADMIN && (<AddBookModal buttonIcon={<AutoStoriesRoundedIcon/>} buttonText={"Add Book"} />)}
       />
        <div className='page-middle'>
        <div>
    <select value={genre} onChange={(e)=>(setGenre(e.target.value))}>
                        <option value="" >Select Genre</option>
                        <option value="" >ALL</option>
                        { BOOK_GENRE && BOOK_GENRE.map((m,index)=>(
                        <option key={index} value={m} >{m}</option>
                        ))}
        </select>
        <span onClick={resetHandler}>
        <Tooltip title="Reset">
          <RefreshIcon />
        </Tooltip>
          </span>
        </div>
       <div>
       <table className='table'>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Edition</th>
            <th>{user.role === ADMIN ? "Quantity" : "Stock"}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={books && books.length === 0 ? {height:"300px"} : {}}>
        {loading ? <TableLoader column={6} /> :<>{books && books.length === 0 ? <span><h5>{`NO BOOKS FOUND ${searchValue && 'BY THE NAME'} ${searchValue} ${genre && 'FOR'} ${genre} ${genre && 'GENRE'}`}</h5></span>
        :
        books.map((b,index)=>(
              <tr key={index}>
                <td><BookDetailsModal book={b}>{b.ISBN}</BookDetailsModal></td>
                <td><BookDetailsModal book={b}><pre>{b.title}</pre></BookDetailsModal></td>
                <td><BookDetailsModal book={b}><pre>{b.author}</pre></BookDetailsModal></td>
                <td><BookDetailsModal book={b}>{b.edition}</BookDetailsModal></td>
                {user.role === ADMIN ? <td><BookDetailsModal book={b}>{b.stock}</BookDetailsModal></td> :
                <td style={b.stock > 0 ? {color : "var(--green)"}:{color: "var(--red)"}} ><BookDetailsModal book={b}><pre>{b.stock > 0 ? "Available" : "Out-of-Stock"}</pre></BookDetailsModal></td>
                }
                <td>
                  {user.role === ADMIN && <EditBookModal book={b}>Edit</EditBookModal> }
                   <ConfirmationModal heading={"Request Issue"} subHeading={"Do you want to issue this book"} state={"success"} data={b} confirmationHandler={confirmationHandler}>Request</ConfirmationModal>
                  <BookDetailsModal book={b}><pre>View Details</pre></BookDetailsModal>
                </td>
              </tr>
            ))}</>}
        </tbody>
       </table>
       </div>
       </div>
       <span>
        {bookFilteredCount > resultPerPage && (
          <Pagination
            count={Math.ceil(bookFilteredCount / resultPerPage)}
            page={page}
            onChange={onPageChange}
            size="medium"
          />
        )}
      </span>
     </div>
  )
}

export default Books