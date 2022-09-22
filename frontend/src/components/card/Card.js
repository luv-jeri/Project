import React from 'react';
import {Link} from "react-router-dom"

import './card.css'
import ReactStars from "react-rating-stars-component"

const Card = ({product}) => {
console.log(product)
const options= {
  edit:  false,
  color: "rgba(20,20,20,0.1)",
  activeColor:"tomato",
  size:window.innerWidth <600 ?20:25,
  value: product.rating,
  isHalf:true,
}

  return (
    <Link to={`/product/${product._id}`} className="card" >
    <img src={product.images[0].url} alt={product.name} width="200" />
    <div className="content-box">
        <h4 className="name">{product.name}</h4>
        <p>{product.meta_description}</p>
        <div className='flex'>
          <ReactStars {...options} />
          <span>({product.numOfReviews} Reviews)</span>
        </div>
        
        <div className='price-btn'>
          <span>₹{product.price}</span>
            <button  className="btn">Order Now</button>
        </div>
    </div>
      </Link>
  )
}

export default Card