import React, {useState, useEffect} from 'react';
import Loader from '../../components/loader/Loader';
import MetaData from '../MetaData';
import './UpdatePassword.css';
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors,loadUser, updatePassword} from '../../actions/userAction';
import { useNavigate  } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


  const {error, isUpdated, loading} = useSelector((state)=>state.profile)

const [oldPassword, setOldPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };


  useEffect(() => {
    if(error){
        alert(error);
        dispatch(clearErrors());
    }
    if(isUpdated){
        alert("Password Updated Successfully")
     navigate("/account");

     dispatch({
        type: UPDATE_PASSWORD_RESET
     });
     }
    }, [dispatch, isUpdated, error,navigate ]);
  return (
    <>    <MetaData title="Update Profile" />
    {loading? <Loader/> : (

    <div className='updateProfileContainer'>
    <div className='updateProfileBox'>
        <h2>Update Password</h2>
    <form
            className="updateProfileForm"
        
            encType="multipart/form-data"
            onSubmit={updatePasswordSubmit}
          >
            <div className="signUpPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e)=> setOldPassword(e.target.value)}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="newPassword"
                    value={newPassword}
                    onChange={(e)=> setNewPassword(e.target.value)}
                  />
                </div>
                <div className="signUpPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                  />
                </div>

            <input type="submit" value="Update Password" className="updateProfileBtn" />
          </form>  
    </div>
    </div>
    
    )}

</>
  )
}

export default UpdatePassword