import React, { useEffect } from 'react'
import { Link} from 'react-router-dom'
import MetaData from '../../components/MetaData';
import { useSelector} from 'react-redux';
import Loader from '../../components/loader/Loader';
import { useNavigate,  } from 'react-router-dom';
import './Profile.css';



const Profile = () => {
    
    const navigate = useNavigate();
   

    const {isAuthenticated, user, loading, } = useSelector((state)=> state.user);


    useEffect(() => {
        if(isAuthenticated===false){
          navigate("/login")
         }
        }, [isAuthenticated]);

  return (
   <>


    

    {loading ? (<Loader />): ( 
   <>
   <MetaData title={`${user.name}'s Profile`}/>
  <div className='profileContainer'>
   <div>
       <h1>My profile</h1>
       <img src={user.avatar.url} alt={user.name} className="profile__img"/>
       <Link to="/me/update">Edit Profile</Link>
   </div>
   <div>
       <div>
           <h4>Full Name</h4>
           <p>{user.name}</p>
       </div>
       <div>
           <h4>Email</h4>
           <p>{user.email}</p>
       </div>
       <div>
           <h4>Joined On</h4>
           <p>{String(user.createdAt).substr(0, 10)}</p>
       </div>
       <div>
           <Link to="/orders">My Orders</Link>
           <Link to="password/update">Change Password</Link>
       </div>

   </div>

  </div>
  

  
  </>
  )}
   
    

 

   </>
  )
}

export default Profile