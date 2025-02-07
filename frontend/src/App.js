import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home.js"
import Footer from "./components/Footer/Footer";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Products from "./pages/Products/Products";
import Search from "./components/Search/Search";
import LoginSignup from './pages/LoginSignup/LoginSignup';
import store from './store'
import { loadUser } from "./actions/userAction";
import UserOptions from './components/Header/UserOptions.js'
import {useSelector} from 'react-redux';
import Profile from "./pages/Profile/Profile.js"
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile.js"
import UpdatePassword from "./components/User/UpdatePassword.js"
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping.js'
import CheckoutSteps from "./components/order/CheckoutSteps";
import ConfirmOrder from './components/order//ConfirmOrder'
import Payment from "./components/order//Payment";
import axios from "axios";
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/order/OrderSuccess.js"
import MyOrder from "./components/order/MyOrder";
import MyOrderDetails from "./components/order/MyOrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import CreateProduct from './components/Admin/CreateProduct';
import AllProducts from "./components/Admin/AllProducts";
import EditProduct  from "./components/Admin/EditProduct";
import AllOrder  from "./components/Admin/AllOrder";
import UpdateOrder  from "./components/Admin/UpdateOrder";
import AllUsers  from "./components/Admin/AllUsers";
import UpdateUser from "./components/Admin/UpdateUser";
import AllReviews from "./components/Admin/AllReviews";
import BottomTab from "./components/BottomTab/BottomTab";
import Search_Section from "./components/contents/Search_Section";
import SignUp from "./pages/Join/SignUp";

// import Notfound from "./more/Notfound";


function App() {

const {isAuthenticated, user} = useSelector(state=> state.user)






const [stripeApiKey, setStripeApiKey] = useState("");

 async function getStripeApiKey (){
 const {data} = await axios.get("/api/v2/stripeapikey");
 setStripeApiKey(data.stripeApiKey)
 }
 useEffect(()=>{
  store.dispatch(loadUser()); 
  getStripeApiKey();
  },[])

  useEffect(() => {
   
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  return (
  
    <div className="App">
      <Router>
        <Header />
        <BottomTab />

      
        {isAuthenticated && <UserOptions user={user} />}

          <Routes>
          <Route path="/signup" exact element={<SignUp />} />

            <Route path="/" exact element={<Home/>} />
            <Route path="/search" exact element={<Search/>} />
            <Route exact path="/product/:id"  element={ < ProductDetail/>} />
            <Route exact path="/products"  element={<Products/>} />
            <Route  path="/products/:keyword"  element={<Products/>} />
            <Route exact path="/search"  element={<Search/>}/>
            <Route exact path="/login"  element={<LoginSignup/>} />
            <Route path="/password/forgot" element={<ForgotPassword/>} />
            <Route path="/password/reset/:token" element={<ResetPassword/>} />
            <Route exact path="/cart"  element={<Cart/>} />
            {isAuthenticated && <Route path="/account" element={<Profile />} /> }

          
   

            {isAuthenticated &&  <Route path="/login/shipping" element={<Shipping />} /> }
            {isAuthenticated && <Route path="/order/confirm" element={<ConfirmOrder />} /> }
            {isAuthenticated && <Route path="/me/update" element={<UpdateProfile/>} />}
            {isAuthenticated && <Route path="/account/password/update" element={<UpdatePassword/>} />}
           {isAuthenticated && <Route path="/process/payment" element={stripeApiKey &&< Elements stripe={loadStripe(stripeApiKey)}> <Payment /> </Elements>} /> }
           {isAuthenticated && <Route path="/success" element={<OrderSuccess />} /> }
           {isAuthenticated && <Route path="/orders" element={<MyOrder />} /> }
           {isAuthenticated && <Route path="/order/:id" element={<MyOrderDetails />} /> }




         {isAuthenticated && user.role === "admin" && <Route exact path="/dashboard" element={<Dashboard/>} />}
         {isAuthenticated && user.role === "admin" && <Route exact path="/admin/product" element={<CreateProduct/>} />}
          {isAuthenticated && user.role === "admin" &&  <Route exact path="/admin/products" element={<AllProducts/>} />}
          {isAuthenticated && user.role === "admin" &&  <Route exact path="/edit/product/:id" element={<EditProduct/>} />}
         {isAuthenticated && user.role === "admin" &&  <Route exact path="/admin/orders" element={<AllOrder/>} />}
         {isAuthenticated && user.role === "admin" && <Route exact path="/admin/order/:id" element={<UpdateOrder/>} />}
         {isAuthenticated && user.role === "admin" && <Route exact path="/admin/users" element={<AllUsers/>} />}
         {isAuthenticated && user.role === "admin" && <Route exact path="/admin/user/:id" element={<UpdateUser/>} />}
         {isAuthenticated && user.role === "admin" && <Route exact path="/admin/reviews" element={<AllReviews/>} />}
          </Routes>

       
          
          <Footer />
      </Router>
    </div>
  );
}

export default App;
