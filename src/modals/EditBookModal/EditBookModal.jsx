import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material';
import { BOOK_GENRE } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { editBook } from '../../redux/actions/bookAction';
import { updateBookReset } from '../../redux/reducers/bookReducer';

const EditBookModal = ({book,children}) => {

    const [ISBN, setISBN] = useState(book && book.ISBN);
    const [title, setTitle] = useState(book && book.title);
    const [author, setAuthor] = useState(book && book.author);
    const [genre, setGenre] = useState(book && book.genre);
    const [edition, setEdition] = useState(book && book.edition);
    const [publishedYear, setPublishedYear] = useState(book && book.publishedYear);
    const [stock, setStock] = useState(book && book.stock);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { loading, message, isChanged, error } = useSelector((state)=>state.book);
    const dispatch = useDispatch();


    function submitHandler(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append("ISBN",ISBN.trim());
        formData.append("title",title.trim());
        formData.append("author",author.trim());
        formData.append("genre",genre.trim());
        formData.append("edition",edition.trim());
        formData.append("publishedYear",publishedYear.trim());
        formData.append("stock",stock).trim();

        dispatch(editBook(formData, book._id));
    }

    useEffect(()=>{
        if(isChanged){
            dispatch(updateBookReset());
        }
    },[dispatch,error,message,isChanged]);

  return (
   <>
    <button onClick={handleOpen}>{children}</button>
    <Modal
    open={open}
    onClose={handleClose}
    >
         <div className='modal'>
        <div className='modal-heading'>
            <p>Edit Book</p>
            <p>To Edit the Book details</p>
        </div>
        <div className='modal-content'>
        <form onSubmit={submitHandler}>
                <div>
                    <p>ISBN</p>
                    <input type="text" onChange={(e)=>(setISBN(e.target.value))} value={ISBN} required={true} />
                </div>
                <div>
                    <p>Title</p>
                    <input type="text" onChange={(e)=>(setTitle(e.target.value)) } value={title} required={true} />
                </div>
                <div>
                    <p>Author</p>
                    <input type="text" onChange={(e)=>(setAuthor(e.target.value)) } value={author} required={true} />
                </div>
                <div>
                    <p>Select Genre</p>
                     <select value={genre} onChange={(e)=>(setGenre(e.target.value))}>
                        <option value="" >Select Genre</option>
                        {BOOK_GENRE && BOOK_GENRE.map((b,index)=>(
                        <option key={index} value={b} >{b}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Edition</p>
                    <input type="number" min="1" max="1000" step="1" onChange={(e)=>(setEdition(e.target.value)) } value={edition} required={true} />
                </div>
                <div>
                    <p>Published Year</p>
                    <input type="number" min="1400" max="2099" step="1" onChange={(e)=>(setPublishedYear(e.target.value)) } value={publishedYear} required={true} />
                </div>
                <div>
                    <p>Stock</p>
                    <input type="number" min="0" step="1" onChange={(e)=>(setStock(e.target.value)) } value={stock} required={true} />
                </div>
                <button type='submit' className='success-button'>{loading?<span className='loader'></span>:"Update"}</button>
            </form>

            <button onClick={handleClose} className='close-button'>Close</button>
        </div>
    </div>
    </Modal>
   </>
  )
}

export default EditBookModal