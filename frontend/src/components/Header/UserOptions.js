import React, { useState } from 'react';
import './Header.css';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import Backdrop from '@mui/material/Backdrop';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Profile from "../../assets/profile.png";
import { SpeedDialAction } from '@mui/material';
import {useNavigate} from "react-router-dom";
import {logout} from "../../actions/userAction"
import { useSelector, useDispatch } from 'react-redux';


const UserOptions = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen]  =useState(false);
    const {cartItems} = useSelector((state)=> state.cart)


 const options =[
   {icon:<ShoppingCartIcon  style={{color: cartItems.length>0 ? "tomato" : "unset"}}/>,name:`Cart(${cartItems.length})`, func: cart },
    {icon:<ListAltIcon />,name:"Orders", func: orders },
    {icon:<PersonIcon />,name:"Profile", func: account },
    {icon:<ExitToAppIcon />,name:"Logout", func: logoutUser },

 
 ] 

 if(user.role === "admin"){
    options.unshift(  {icon:<DashboardIcon />,name:"Dashboard", func: dashboard })
 };

function dashboard(){
    navigate("/dashboard");
}
function orders(){
    navigate("/orders");
}
function account(){
    navigate('/account');
}
function cart(){
   navigate('/cart');
}
function logoutUser(){
  // navigate("/login")
    dispatch(logout());
    
   alert("Logout successfully");
 

}




  return (
    <>
    <Backdrop open={open} style={{zIndex:"95"}} />
    <SpeedDial
    ariaLabel ="SpeedDial tooltip example"
    onClose ={()=> setOpen(false)}
    onOpen={()=>setOpen(true)}
    open={open}
    style={{zIndex:"1000", backgroundColor:"transparent"}}
    direction="down" 
    className='speedDial'
    icon={ <img
    className='speedDialIcon'
    src={user.avatar.url?user.avatar.url: `url(${Profile})`}
    alt=""

    />}
    >
     {options.map((item, i)=>(
        <SpeedDialAction key={i} icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>
     ))}   
    </SpeedDial>
    </>
  )
}

export default UserOptions