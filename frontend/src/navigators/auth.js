import React from 'react';

import { Route } from 'react-router-dom';

import LoginSignup from '../pages/LoginSignup/LoginSignup';
import SignUp from '../pages/Join/SignUp';
import LoggedIn from '../pages/LoggedIn/LoggedIn';

function AuthNavigator({ isAuthenticated }) {
  return (
    <>
      <Route path='/signup' exact element={isAuthenticated ? <LoggedIn /> : <SignUp />} />
      <Route
        exact
        path='/login'
        element={isAuthenticated ? <LoggedIn /> : <LoginSignup />}
      />
    </>
  );
}

export default AuthNavigator;
