import React from 'react';
import deliver2 from  '../../assets/deliver2.png';

import "./index.css";

const Search_Section = () => {

 
  return (


 

    <div className="container"  >
     
      <div className="left-s">
        <div>
            <div className="heading">
                <h1>🥪F😋😋D Delivery</h1>
                <p>Search your favourite foods from your favourite Restaurant and get delivered to you own city...</p>
            </div>
        
            <form action="">
                <div className='form-input'>
                    <input type="text" placeholder="City / Restaurant / Food"/>
                   
                    
                </div>
                <div className='btn-div'>
                <button type='submit' className='btn btn-s'>Explore Now</button>

                </div>
         
            </form>
        </div>
      </div>
      
      <div className="right-s">
      <img src={deliver2} alt="" />
      </div>

    </div>
 
  )
}

export default Search_Section