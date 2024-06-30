import { Modal } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addMember } from '../../redux/actions/userAction';

const AddMemberModal = ({buttonIcon, buttonText}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [registrationNo, setRegistrationNo] = useState("");
    const [avatar, setAvatar] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { loading } = useSelector((state)=>state.user);
    const dispatch = useDispatch();

    function submitHandler(e){
        e.preventDefault();

        if(avatar === ""){
            return toast.error("Please fill all the fields")
        }

        const formData = new FormData();

        formData.append("name",name.trim());
        formData.append("email",email.trim());
        formData.append("registrationNo",registrationNo.trim());
        formData.append("avatar",avatar);

        dispatch(addMember(formData));

        setName("");
        setEmail("");
        setRegistrationNo("");
        setAvatar("");
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
            <p>Add Member</p>
            <p>To Create Member with Email ID</p>
        </div>
        <div className='modal-content'>
            <form onSubmit={submitHandler}>
                <div>
                    <p>Name</p>
                    <input type="text" onChange={(e)=>(setName(e.target.value))} value={name} required={true} />
                </div>
                <div>
                    <p>Email</p>
                    <input type="email" onChange={(e)=>(setEmail(e.target.value)) } value={email} required={true} />
                </div>
                <div>
                    <p>Registration No</p>
                    <input type="text" onChange={(e)=>(setRegistrationNo(e.target.value)) } value={registrationNo} required={true} />
                </div>
                <div>
                <p>Select Profile Pic</p>
                        <input type="file"
                            accept="image/*"
                            onChange={(e) => setAvatar(e.target.files[0])}
                            />
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

export default AddMemberModal