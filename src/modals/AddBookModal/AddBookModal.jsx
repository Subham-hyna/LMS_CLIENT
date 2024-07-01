import { Modal } from '@mui/material';
import React, { useState } from 'react'
import { BOOK_GENRE } from '../../constants';
import './AddBookModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../../redux/actions/bookAction';
import toast from 'react-hot-toast';

const AddBookModal = ({buttonIcon, buttonText}) => {

    const [ISBN, setISBN] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [publishedYear, setPublishedYear] = useState("");
    const [edition, setEdition] = useState("");
    const [stock, setStock] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { loading } = useSelector((state)=>state.book);
    const dispatch = useDispatch();

    function submitHandler(e){
        e.preventDefault();

        if(genre === ""){
            return toast.error("Fill all the fields");
        }
        
        const formData = new FormData();

        formData.append("ISBN",ISBN.trim())
        formData.append("title",title.trim())
        formData.append("author",author.trim())
        formData.append("genre",genre.trim())
        formData.append("publishedYear",publishedYear.trim())
        formData.append("edition",edition.trim())
        formData.append("stock",stock.trim())

        dispatch(addBook(formData));

        setISBN("");
        setTitle("");
        setAuthor("");
        setGenre("");
        setPublishedYear("");
        setEdition("");
        setStock("");
    }
    
  return (
    <>
    <button className='page-heading-add-button' onClick={handleOpen}>
        {buttonIcon}
        <p>{buttonText}</p>
    </button>
    <Modal
    open={open}
    onClose={handleClose}
    >
        <div className='modal'>
        <div className='modal-heading'>
            <p>Add Book</p>
            <p>To Add Book with ISBN, Title, Author</p>
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
                <button type='submit' className='success-button'>{loading?<span className='loader'></span>:"Submit"}</button>
            </form>

            <button onClick={handleClose} className='close-button'>Close</button>
        </div>
    </div>
    </Modal>
    </>
  )
}

export default AddBookModal