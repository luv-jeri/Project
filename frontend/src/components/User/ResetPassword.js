import React, {useState, useEffect} from 'react';
import Loader from '../../components/loader/Loader';
import MetaData from '../MetaData';
import './UpdatePassword.css';
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors, resetPassword} from '../../actions/userAction';
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';


 
const ResetPassword = () => {
    const { token } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();


  const {error, success, loading} = useSelector((state)=>state.forgotPassword)

const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token,myForm));
  };


  useEffect(() => {
    if(error){
        alert(error);
        dispatch(clearErrors());
    }
    if(success){
        alert("Password Updated Successfully")
     navigate("/login");

     dispatch({
        type: UPDATE_PASSWORD_RESET
     });
     }
    }, [dispatch, success, error,navigate ]);
  return (
    <>    <MetaData title="Reset Password" />
    {loading? <Loader/> : (

    <div className='updateProfileContainer'>
    <div className='updateProfileBox'>
        <h2>Reset  Password</h2>
    <form
            className="updateProfileForm"
        
            encType="multipart/form-data"
            onSubmit={resetPasswordSubmit}
          >

                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
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

            <input type="submit" value="Reset Password" className="updateProfileBtn" />
          </form>  
    </div>
    </div>
    
    )}

</>
  )
   
   
  
}

export default ResetPassword