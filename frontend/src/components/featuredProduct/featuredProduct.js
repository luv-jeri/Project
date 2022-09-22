import React,{useEffect, useState} from 'react';
import Card from '../card/Card';
import "./index.css";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../loader/Loader';



// const product = {
//   name:"Panner Pizza",
//   image:[{url:`${body}`}],
//   price:5620,
//   _id:1,
//   meta_description:"this is very delicious food you get for your party"
// }

const FeaturedProduct = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    products,
    loading,
    productCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  console.log(products)
  useEffect(()=>{
  dispatch(getProduct())
  },[dispatch])
  return (
    <div>
        <div className="title-f">
                <h1>🍴Favourite Dishes🍴</h1>
                <span></span>
        </div>
        {loading ? < Loader/> :  <div className="card-container">
           

             {/* {products && products.map((product, i)=>(
                <Card key={product._id} product={product} />
             ))} */}
          {products &&
                products.map((product) => (
                  <Card key={product._id} product={product} />
                ))}
        </div>}
      
    </div>
  )
}

export default FeaturedProduct