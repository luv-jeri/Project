
import React, {useState, useEffect} from 'react';
import Loader from '../../components/loader/Loader';
import MetaData from '../MetaData';
import './UpdateProfile.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import {useDispatch, useSelector} from 'react-redux';
import { clearErrors,forgotPassword} from '../../actions/userAction';


const ForgotPassword = () => {

    const dispatch = useDispatch();

  const {error, message, loading} = useSelector((state)=>state.forgotPassword)


const [email, setEmail] = useState('');



  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();


    myForm.set("email", email);

    dispatch(forgotPassword(myForm));
  };


  

  useEffect(() => {
    if(error){
        alert(error);
        dispatch(clearErrors());
    }
    if(message){
        alert(message)
     }
    }, [dispatch, error, message ]);
  return (
    <>    <MetaData title="Update Profile" />
        {loading? <Loader/> : (

        <div className='updateProfileContainer'>
        <div className='updateProfileBox'>
            <h2>Forget Password</h2>
        <form
                className="updateProfileForm"
            
                encType="multipart/form-data"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                     value={email}
                     required
                     onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>


                <input type="submit" value="Send Email" className="updateProfileBtn" />
              </form>  
        </div>
        </div>
        
        )}
    
    </>
  )
}

export default ForgotPassword