import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material';
import { MEMBERSHIP_STATUS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordReset } from '../../redux/reducers/userReducer';
import { changeMemshipStatus } from '../../redux/actions/userAction';

const ChangeMembershipModal = ({member,children}) => {
    const [open, setOpen] = useState(false);
    const [membershipStatus, setMembershipStatus] = useState(member && member.membershipStatus);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { loading, isChanged } = useSelector((state)=>state.user);
    const dispatch = useDispatch();

    function submitHandler(e){
        e.preventDefault();
        dispatch(changeMemshipStatus(membershipStatus,member._id));
    }

    useEffect(()=>{
        if(isChanged){
            dispatch(updatePasswordReset());
        }
    },[dispatch,isChanged]);

  return (
   <>
    <button onClick={handleOpen}>{children}</button>
    <Modal
    open={open}
    onClose={handleClose}
    >
         <div className='modal'>
        <div className='modal-heading'>
            <p>Membership Status</p>
            <p>To change the Membership Status</p>
        </div>
        <div className='modal-content'>
            <form onSubmit={submitHandler}>
                <div>
                    <p>Membership</p>
                     <select value={membershipStatus} onChange={(e)=>(setMembershipStatus(e.target.value))}>
                        <option value="" >Membership Status</option>
                        {MEMBERSHIP_STATUS && MEMBERSHIP_STATUS.map((m,index)=>(
                        <option key={index} value={m} >{m}</option>
                        ))}
                    </select>
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

export default ChangeMembershipModal