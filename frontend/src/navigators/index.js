import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';

import Footer from '../components/Footer/Footer';

import store from '../store';
import { loadUser } from '../actions/userAction';

import { useSelector } from 'react-redux';

import axios from 'axios';

import BottomTab from '../components/BottomTab/BottomTab';
import CommonNavigator from './comman';
import AuthNavigator from './auth';
import AppNavigator from './app';
// import Notfound from "./more/Notfound";

function IndexNavigator() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

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

  return (
    <div className='App'>
      <Router>
        <Header />
        <BottomTab />

        <Routes>
          {CommonNavigator()}
          {AuthNavigator({ isAuthenticated })}
          {AppNavigator()}

          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default IndexNavigator;
