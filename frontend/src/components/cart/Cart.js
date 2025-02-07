import React,{useState, useEffect} from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/CartAction";

import  Typography  from '@mui/material/Typography';
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import CartItemCard from "./CartItemCard.js";
import BottomTab from "../BottomTab/BottomTab";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { product } = useSelector(
      (state) => state.productDetails
    );
    const { cartItems } = useSelector((state) => state.cart);

      
       
      
        
      

    let Price = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  
    let totalPrice = Price;
    
    
    const increaseQuantity = (id, quantity, ) => {
      const newQty = quantity +1;
    
      if(product.stock <= quantity) {
        return;
      };
      
      
      dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
      const newQty = quantity - 1;
      if (1 >= quantity) {
        return;
      }
      dispatch(addItemsToCart(id, newQty));
    };
  
    const deleteCartItems = (id) => {
      dispatch(removeItemsFromCart(id));
    };
  
    const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
    localStorage.removeItem("cartItems");
    };
  

    return (
      <>
        {cartItems.length === 0 ? (
          <div className="emptyCart">
            <RemoveShoppingCartIcon />
            <Typography>No Items In Cart</Typography>
            <Link to="/products">View Products</Link>
            <BottomTab />
          </div>
        ) : (
          <>
            <div className="cartPage">
              <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
              </div>
  
              {cartItems &&
                cartItems.map((item) => (
                  <div className="cartContainer" key={item.product}>
                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                    <div className="cartInput">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.product, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input type="number" readOnly value={item.quantity} />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="cartSubtotal">{`₹${
                      item.price * item.quantity
                    }`}</p>
                  </div>
                ))}
  
              <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                  <p>Price Total</p>
                  <p>₹{totalPrice}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                  <button onClick={checkoutHandler}>Check Out</button>
                </div>
              </div>
            </div>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <BottomTab />
          </>
    )
     }
      </>
    );
  };
  
  export default Cart;