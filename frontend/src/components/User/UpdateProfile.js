import React, {useState, useEffect} from 'react';
import Loader from '../../components/loader/Loader';
import MetaData from '../MetaData';
import './UpdateProfile.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors,loadUser,updateProfile} from '../../actions/userAction';
import { useNavigate  } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const {user} = useSelector(state=> state.user);
  const {error, isUpdated, loading} = useSelector((state)=>state.profile)

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [avatar, setAvatar] = useState('');
const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };



  const updateProfileDataChange = (e) => {
    if(e.target.name === "avatar"){
    const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
    }

    reader.readAsDataURL(e.target.files[0]);
}
  };
  

  useEffect(() => {
    if(user){
    
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url);
    }else{
        navigate("/login");
    }
    if(error){
        alert(error);
        dispatch(clearErrors());
    }
    if(isUpdated){
        alert("Profile Updated Successfully")
     dispatch(loadUser());
     navigate("/account");

     dispatch({
        type: UPDATE_PROFILE_RESET
     });
     }
    }, [dispatch, isUpdated, error ]);

  return (
    <>    <MetaData title="Update Profile" />
        {loading? <Loader/> : (

        <div className='updateProfileContainer'>
        <div className='updateProfileBox'>
            <h2>Update Profile</h2>
        <form
                className="updateProfileForm"
            
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
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

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input type="submit" value="Update Profile" className="updateProfileBtn" />
              </form>  
        </div>
        </div>
        
        )}
    
    </>
  )
}

export default UpdateProfile