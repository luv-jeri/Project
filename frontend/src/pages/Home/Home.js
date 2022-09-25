import React from 'react'

import Search_Section from '../../components/contents/Search_Section';
import FeaturedProduct from "../../components/featuredProduct/featuredProduct";
import MetaData from '../../components/MetaData/MetaData';
import "./Home.css";
import {useSelector} from 'react-redux';
import ImageCarousel from '../../components/ImageCarousel/imageCarousel';
import Restaurants from '../../components/Restaurants/Restaurants'
const Home = () => {

  return (
    <>
    <MetaData title="Home Page" />
        <div className='home'>
      
        <div>
            <ImageCarousel />
          </div>
        <div>
            <Search_Section />
        </div>
        <div>
          <FeaturedProduct />
          </div>
          <div>
            <Restaurants />
          </div>

    </div>
    </>
  )
}

export default Home;