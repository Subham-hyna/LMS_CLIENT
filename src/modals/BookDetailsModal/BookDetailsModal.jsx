import React, { useState } from 'react'
import { Modal } from '@mui/material';

const BookDetailsModal = ({book,children,style}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
  return (
   <>
    <li style={style && style} onClick={handleOpen}>{children}</li>
    <Modal 
    open={open} 
    onClose={handleClose}>
       <div className='modal'>
       <div className='modal-heading'>
                <p>Book Details</p>
            </div>
           <div className='profile-modal-details'>
           <div>
                <p>ISBN</p>
                <p>{book&&book.ISBN}</p>
            </div>
            <div>
                <p>Title</p>
                <p>{book&&book.title}</p>
            </div>
            <div>
                <p>Author</p>
                <p>{book&&book.author}</p>
            </div>
            <div>
                <p>Edition</p>
                <p>{book&&book.edition}</p>
            </div>
            <div>
                <p>Genre</p>
                <p>{book&&book.genre}</p>
            </div>
            <div>
                <p>Published Year</p>
                <p>{book&&book.publishedYear}</p>
            </div>
            <div>
                <p>Stock</p>
                <p>{book&&book.stock}</p>
            </div>
            <div>
                <p>Added on</p>
                <p>{book&&book.createdAt.split("T")[0]}</p>
            </div>
           </div>
           <button onClick={handleClose} className='close-button'>Close</button>
       </div>
    </Modal>
   </>
  )
}

export default BookDetailsModal
