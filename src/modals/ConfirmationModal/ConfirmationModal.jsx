import React, { useState } from 'react'
import { Modal } from '@mui/material';
import { useSelector } from 'react-redux';

const ConfirmationModal = ({heading, subHeading,confirmationHandler, state, data, children}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { issueLoading } = useSelector((state)=>state.issue);

    function submitHandler(e){
        e.preventDefault();
        confirmationHandler(data._id);
    }

  return (
    <>
    <button style={state==="success" ? {backgroundColor: "var(--green)"} : {backgroundColor: "var(--red)"}} onClick={handleOpen}>{children}</button>
    <Modal
    open={open}
    onClose={handleClose}
    >
         <div className='modal'>
        <div className='modal-heading'>
            <p>{heading}</p>
            <p>{subHeading}</p>
        </div>
        <div className='modal-content'>
            <div className='modal-button-group'>
            <button onClick={submitHandler} className={`${state}-button`} >{issueLoading?<span className='loader'></span>:"Confirm"}</button>
            <button onClick={handleClose} className='close-button'>Close</button>
            </div>

        </div>
    </div>
    </Modal>
    </>
  )
}

export default ConfirmationModal