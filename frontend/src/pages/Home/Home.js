import React from 'react'
import Home_body_img from "../../assets/body.png";
import Search_Section from '../../components/contents/Search_Section';
import FeaturedProduct from "../../components/featuredProduct/featuredProduct";
import MetaData from '../../components/MetaData';
import "./Home.css";
import {useSelector} from 'react-redux';
import ImageCarousel from '../../components/imageCarousel'
const Home = () => {
  const {isAuthenticated, user} = useSelector(state=> state.user)
  return (
    <>
    <MetaData title="Home Page" />
        <div className='home'>
        {/* {isAuthenticated?  <div className="right-h"  style={{
            backgroundImage: `url(${Home_body_img})`,
            width: "100vw",
            height:"10vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}> 
        <h2 className='welcome'>Welcome {user.name} <br />
        😊happy to see you again...
        </h2> 
       
     
        </div>:""} */}
        <div>
            <ImageCarousel />
          </div>
        <div>
            <Search_Section />
        </div>
        <div>
          <FeaturedProduct />
          </div>
          

    </div>
    </>
  )
}

export default Home;