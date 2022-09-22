import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from '../reviewCard/ReviewCard';
import Loader from '../loader/Loader';
import MetaData from '../../components/MetaData';
import { addItemsToCart } from "../../actions/CartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button} from "@mui/material";
import Rating from '@mui/material/Rating';
const ProductDetail = ({match}) => {

    const {id} = useParams();
     const[ open, setOpen] = useState(false)
    const [rating, setRating] = useState(0);
    const [comment, setComment]= useState("")

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError} = useSelector((state) => state.newReview);


const [quantity, setQuantity]= useState(1);

const increaseQuantity =()=>{
  if(product.stock <= quantity) return;
  const qty = quantity +1;
  setQuantity(qty);
}
const decreaseQuantity =()=>{
  if(1 >= quantity) return;
  const qty = quantity - 1;
  setQuantity(qty);
}

const submitReviewToggle=()=>{
  open? setOpen(false): setOpen(true)
};
console.log(id);

const reviewSubmitHandler = () => {


  const myForm = new FormData();

  myForm.set("rating", rating);
  myForm.set("comment",comment);
  myForm.set("productId",id);
  dispatch(newReview(myForm));
  setOpen(false);
};



  useEffect(() => {
    if(error){
      alert(error);
      dispatch(clearErrors());
    }
    if(reviewError){
      alert(reviewError);
      dispatch(clearErrors());
    }
    if(success){
      alert("review submitted Successfully")
      dispatch({type:NEW_REVIEW_RESET})
    }
    dispatch(getProductDetails(id));
  }, [dispatch,id,reviewError,error, success]);
      

  
const addToCartHandler=()=>{
  dispatch(addItemsToCart(id, quantity))
  alert("item added to cart")
}


  const options= {
    edit:  false,
    color: "rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth <600 ?20:25,
    value: product.rating,
    isHalf:true,
  
  
  }


  return (
<>{loading?<Loader /> : (
    <>
     <MetaData title={`${product.name}`} />
    <div className="ProductDetails">
      <div className="carousel">
        <Carousel>
          {product.images &&
            product.images.map((item, i) => (
              <img
                className="CarouselImage"
                key={item.url}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
        </Carousel>
      </div>
      <div className="detailsBlock">
        <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Food # {product._id}</p>
        </div>
        <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span>({product.numOfReviews} Reviews)</span>

        </div>
        <div className="detailsBlock-3-1">
        <span className="quantity">Quantity</span>
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" readOnly value={quantity}/>
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
        </div>
        <p className="stock__meta" style={{ paddingBottom: ".5vmax" }}>
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out Of Stock" : "In Stock"}
                  </b>
                </p>
                <div
                  className="Description"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span>Description:</span>
                  <p>{product.description}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="wishlist"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "15px 5px",
                    }}
                 
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                    </svg>
                    <span
                      className="cartBtn"
                      style={{ opacity: 0.7, padding: "0px 5px" }}
                    >
                      Add to wishlist
                    </span>
                  </div>

                  <div
                    className="pointer flex"
                    style={{
                      padding: "10px 5px",
                      alignItems: "center",
                      
                    }}
                 
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-bag"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                    <button disabled = {product.stock <1? true: false}
                    onClick={addToCartHandler}
                      className="cartBtn"
                      style={{
                        opacity: 0.7,
                        padding: "0px 5px",
                        border: "none",
                        cursor: "pointer",}}
                      
                    >
                      Add to Cart
                    </button>
                    <br />
                    
                  </div>
                
                </div>
                <button className="btn" style={{marginTop:'30px', fontSize:"10px" }} onClick={submitReviewToggle}>Submit Review</button>
      </div>
     
    </div>

    <div className="Review_container">
      <h3 className="reviewsHeading">Reviews</h3>
<Dialog 
aria-labelledby="simple -dialog-title"
open={open}
onClose={submitReviewToggle}
>
  
  <DialogTitle>Submit Review</DialogTitle>
  <DialogContent className="submitDialog">
    <h4 >Rating</h4>
      <Rating 
      onChange={(e)=>setRating(e.target.value)}
      value={rating}
      size="large"
      name="simple-controlled"
      />
      <textarea 
      className="submitDialogTextArea"
        cols="30"
        rows="5"
        value={comment}
        placeholder="comments"
        onChange={(e)=>setComment(e.target.value)}
        >
      </textarea>
  </DialogContent>
  <DialogActions>
    <Button color="secondary" onClick={submitReviewToggle} >Cancel</Button>
    <Button color="primary" onClick={reviewSubmitHandler}>Submit</Button>
  </DialogActions>


</Dialog>
      {product.reviews && product.reviews[0]?(
        <div className="reviews">
            {product.reviews.map((review)=><ReviewCard review={review} />)}
        </div>
      ):(<p className="noReviews">No Reviews Yet</p>)}
    </div>
</>
)}
</>
  );
};

export default ProductDetail;
