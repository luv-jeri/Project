import React ,{useState}  from 'react';
import deliver2 from  '../../assets/deliver2.png';
import { useNavigate  } from "react-router-dom";
import svg2 from "../../assets/svg2.png"
import "./index.css";

const Search_Section = () => {

    const myStyle={
        // backgroundImage:`url(${svg2})`,
        // height:'100vh',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
    }; 

    
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate ();
    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }else{
            navigate("/products")
        }
    }
  return (


 

    <div className="container" style={myStyle} >
     
      <div className="left-s">
        <div>
            <div className="heading">
                <h1>🥪F😋😋D Delivery</h1>
                <p>Search your favourite foods from your favourite Restaurant and get delivered to you own city...</p>
            </div>
        
            <form onSubmit ={searchSubmitHandler}>
                <div className='form-input'>
                    <input type="text" placeholder="City  /  Restaurant  /  Food"
                     onChange={(e)=> setKeyword(e.target.value)}/>
                  
                    
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