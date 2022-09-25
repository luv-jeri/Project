import React, {useState, useEffect} from 'react';
import Loader from '../../components/loader/Loader';
import BusinessIcon from '@mui/icons-material/Business';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FaceIcon from '@mui/icons-material/Face';
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors, register } from '../../actions/userAction';
import { useNavigate , useLocation } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';

import '../LoginSignup/LoginSignup.css'
import './index.css'



const SignUp = () => {


  const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();



    const {error, loading, isAuthenticated} = useSelector(state=> state.user)

  const [user, setUser] =useState(
    {
        name:"",
        email:"",
        password:"",
        restaurant:"",
        address:"",
        city:"",
        openingTime:"",
        closingTime:"",
        role:"admin",
    }
);

  const {name, email, password, restaurant, address ,city,openingTime,closingTime} = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("./profile.png")


  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    myForm.set("restaurant", restaurant);
    myForm.set("address", address);
    myForm.set("city", city);
    myForm.set("openingTime", openingTime);
    myForm.set("closingTime", closingTime);
    myForm.set("role", "admin");

    dispatch(register(myForm));
  };

  const registerDataChange=(e)=>{
    if(e.target.name === "avatar"){
        const reader = new FileReader();
        reader.onload=()=>{
            if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result)
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }else{
        setUser({...user, [e.target.name]:e.target.value})
    }

}

const redirect= location.search ? location.search.split("=")[0]: "/account";
useEffect(() => {
  if(isAuthenticated){
    navigate(redirect)
   }
   if(error){
    alert(error);
   }
  }, [isAuthenticated, error, ]);


  return (
<div className='form-container'>       
<h2>Restaurant Registration Form</h2>
  <form
                className="signUpForms"
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpName">
                <DriveFileRenameOutlineIcon/>
                  <input
                    type="text"
                    placeholder="Restaurant Name"
                    required
                    name="restaurant"
                    value={restaurant}
                    onChange={registerDataChange}
                  />
                  </div>
                  <div className="signUpName">
                    <BusinessIcon />
                  <input
                    type="text"
                    placeholder="address "
                    required
                    name="address"
                    value={address}
                    onChange={registerDataChange}
                  />
                  </div>
                  <div className="signUpName">
                    <LocationOnIcon />
                   
                  <input
                    type="text"
                    placeholder="city"
                    required
                    name="city"
                    value={city}
                    onChange={registerDataChange}
                  />
                  </div>
                  <div className="signUpName">
                 
                    <label>Opening Time</label>
                   
                  <input
                    type="time"
                    placeholder="opening Time"
                    required
                    name="openingTime"
                    value={openingTime}
                    onChange={registerDataChange}
                  />
                  </div>
                  <div className="signUpName" >
                  <label>closing Time</label>
                 
                  <input
                    type="time"
                    placeholder="closing Time"
                    required
                    name="closingTime"
                    value={closingTime}
                    onChange={registerDataChange}
                  />
                  </div>

                <div id="registerImages">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>  </div>

  
  );
};

export default SignUp;
