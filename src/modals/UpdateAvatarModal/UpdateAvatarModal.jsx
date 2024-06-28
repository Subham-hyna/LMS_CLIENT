import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material';
import { clearErrors, updateAvatar } from '../../redux/actions/userAction';
import { updateAvatarReset } from '../../redux/reducers/userReducer';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const UpdateAvatarModal = () => {
    const [avatar, setAvatar] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { error,loading, isUpdated, message } = useSelector((state)=>state.user)

    const dispatch = useDispatch();

    function submitHandler(e){
        e.preventDefault();
        if(avatar===""){
            return toast.error("Please select a file")
        }
        const formData = new FormData();

        formData.append("avatar",avatar);

        dispatch(updateAvatar(formData));

        setAvatar("");
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            dispatch(updateAvatarReset());
        }
    },[dispatch,error,isUpdated]);

  return (
    <>
    <li onClick={handleOpen}>Update Avatar</li>

    <Modal
    open={open}
    onClose={handleClose}>
        <div className='modal'>
            <div className='modal-heading'>
                <p>Update Avatar</p>
                <p>To Update your Profile Avatar</p>
            </div>
            <div className='modal-content'>
                <form onSubmit={submitHandler}>
                    <div>
                        <p>Select a file</p>
                        <input type="file"
                            accept="image/*"
                            onChange={(e) => setAvatar(e.target.files[0])}
                            />
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

export default UpdateAvatarModal