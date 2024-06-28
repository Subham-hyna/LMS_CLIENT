import React, { useState } from 'react'
import './AccountModal.css'
import { Modal } from '@mui/material';

const AccountModal = ({user,children,style}) => {
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
                <p>Account Details</p>
            </div>
            <AvatarModal url={user?.avatar.url}><div className='profile-modal-avatar'><img src={user?.avatar.url} alt="proile-pic" /></div></AvatarModal>
           <div className='profile-modal-details'>
           <div>
                <p>Name</p>
                <p>{user?.name}</p>
            </div>
            <div>
                <p>Email</p>
                <p>{user?.email}</p>
            </div>
            <div>
                <p>Registration Number</p>
                <p>{user?.registrationNo}</p>
            </div>
            <div>
                <p>Membership Status</p>
                <p>{user?.membershipStatus}</p>
            </div>
            <div>
                <p>Joined On</p>
                <p>{user?.createdAt.split("T")[0]}</p>
            </div>
           </div>
           <button onClick={handleClose} className='close-button'>Close</button>
       </div>
    </Modal>
   </>
  )
}

export default AccountModal

function AvatarModal({url, children}){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
    <>
        <div onClick={handleOpen}>{children}</div>
        <Modal open={open} onClose={handleClose}>
            <div className='avatar-large-pic'>
                <img src={url} alt='member-pic' />
            </div>
        </Modal>
    </>
    )
}