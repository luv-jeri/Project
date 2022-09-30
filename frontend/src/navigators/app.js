import React, { useEffect, useState } from 'react';

import { Route } from 'react-router-dom';

import store from '../store';
import { loadUser } from '../actions/userAction';

import { useSelector } from 'react-redux';
import Profile from '../pages/Profile/Profile.js';

import UpdateProfile from '../components/User/UpdateProfile.js';
import UpdatePassword from '../components/User/UpdatePassword.js';

import Shipping from '../components/cart/Shipping.js';

import ConfirmOrder from '../components/order//ConfirmOrder';
import Payment from '../components/order//Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from '../components/order/OrderSuccess.js';
import MyOrder from '../components/order/MyOrder';
import MyOrderDetails from '../components/order/MyOrderDetails';

// import Notfound from "./more/Notfound";

function AppNavigator() {
  const { isAuthenticated } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v2/stripeapikey');
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (isAuthenticated)
    return (
      <>
        <Route path='/account' element={<Profile />} />
        <Route path='/login/shipping' element={<Shipping />} />
        <Route path='/order/confirm' element={<ConfirmOrder />} />
        <Route path='/me/update' element={<UpdateProfile />} />
        <Route path='/account/password/update' element={<UpdatePassword />} />
        <Route path='/success' element={<OrderSuccess />} />
        <Route path='/orders' element={<MyOrder />} />
        <Route path='/order/:id' element={<MyOrderDetails />} />
        <Route
          path='/process/payment'
          element={
            stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            )
          }
        />
      </>
    );
}

export default AppNavigator;
