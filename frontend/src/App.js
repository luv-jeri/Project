import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import Cart from './pages/Cart.js'
import Shipping from './pages/Shipping.js'
import CheckoutSteps from "./cart/CheckoutSteps";
import ConfirmOrder from './cart/ConfirmOrder'
import Payment from "./cart/Payment";
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

  return (
  
    <div className="App">
      <Router>
        <Header />
      
        {isAuthenticated && <UserOptions user={user} />}

          <Routes>
          
            <Route path="/" exact element={<Home/>} />
            <Route exact path="/product/:id"  element={ < ProductDetail/>} />
            <Route exact path="/products"  element={<Products/>} />
            <Route  path="/products/:keyword"  element={<Products/>} />
            {!isAuthenticated &&<Route exact path="/search"  element={<Search/>}/>}
            <Route exact path="/login"  element={<LoginSignup/>} />
            <Route path="/password/forgot" element={<ForgotPassword/>} />
            <Route path="/password/reset/:token" element={<ResetPassword/>} />
            <Route exact path="/cart"  element={<Cart/>} />
            {isAuthenticated && <Route path="/account" element={<Profile />} /> }
          
            {isAuthenticated && <Route path="/login/shipping" element={<Shipping />} /> }
            {isAuthenticated && <Route path="/order/confirm" element={<ConfirmOrder />} /> }
            {isAuthenticated && <Route path="/me/update" element={<UpdateProfile/>} />}
            {isAuthenticated && <Route path="/account/password/update" element={<UpdatePassword/>} />}
           {isAuthenticated && <Route path="/process/payment" element={stripeApiKey &&< Elements stripe={loadStripe(stripeApiKey)}> <Payment /> </Elements>} /> }
           {isAuthenticated && <Route path="/success" element={<OrderSuccess />} /> }
           {isAuthenticated && <Route path="/orders" element={<MyOrder />} /> }
           {isAuthenticated && <Route path="/order/:id" element={<MyOrderDetails />} /> }


      {/* <Route exact path="/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>} />
      <Route exact  path="/admin/product" element={<ProtectedRoute isAdmin={true}><CreateProduct/></ProtectedRoute>} />
      <Route exact path="/admin/products" element={<ProtectedRoute isAdmin={true}><AllProducts/></ProtectedRoute>} />
      <Route exact path="/edit/product/:id" element={<ProtectedRoute isAdmin={true}><EditProduct/></ProtectedRoute>} />
      <Route exact path="/admin/orders" element={<ProtectedRoute isAdmin={true}><AllOrder/></ProtectedRoute>} />
      <Route exact path="/admin/order/:id"element={<ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute>} />
      <Route exact path="/admin/users" element={<ProtectedRoute isAdmin={true}><AllUsers/></ProtectedRoute>} />
      <Route exact path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>} />
      <Route exact path="/admin/reviews"  element={<ProtectedRoute isAdmin={true}><AllReviews/></ProtectedRoute>} /> */}
         <Route exact path="/dashboard" element={<Dashboard/>} />
         <Route exact path="/admin/product" element={<CreateProduct/>} />
         <Route exact path="/admin/products" element={<AllProducts/>} />
         <Route exact path="/edit/product/:id" element={<EditProduct/>} />
         <Route exact path="/admin/orders" element={<AllOrder/>} />
         <Route exact path="/admin/order/:id" element={<UpdateOrder/>} />
         <Route exact path="/admin/users" element={<AllUsers/>} />
         <Route exact path="/admin/user/:id" element={<UpdateUser/>} />
         <Route exact path="/admin/reviews" element={<AllReviews/>} />
          </Routes>

       
          
          <Footer />
      </Router>
    </div>
  );
}

export default App;
