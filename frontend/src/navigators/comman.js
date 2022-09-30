import React from 'react';

import { Route } from 'react-router-dom';

import Home from '../pages/Home/Home.js';

import ProductDetail from '../components/ProductDetail/ProductDetail';
import Products from '../pages/Products/Products';
import Search from '../components/Search/Search';

import ForgotPassword from '../components/User/ForgotPassword';
import ResetPassword from '../components/User/ResetPassword.js';
import Cart from '../components/cart/Cart';

// import Notfound from "./more/Notfound";

function CommonNavigator() {
  return (
    <>
      <Route path='/' exact element={<Home />} />
      <Route path='/search' exact element={<Search />} />
      <Route exact path='/product/:id' element={<ProductDetail />} />
      <Route exact path='/products' element={<Products />} />
      <Route path='/products/:keyword' element={<Products />} />
      <Route exact path='/search' element={<Search />} />
      <Route path='/password/forgot' element={<ForgotPassword />} />
      <Route path='/password/reset/:token' element={<ResetPassword />} />
      <Route exact path='/cart' element={<Cart />} />
    </>
  );
}

export default CommonNavigator;
