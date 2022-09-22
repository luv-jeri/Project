import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
// import { ReactNotifications, Store } from 'react-notifications-component';
// import 'react-notifications-component/dist/theme.css'

// Store.addNotification({
//   title: "Wonderful!",
//   message: "teodosii@react-notifications-component",
//   type: "success",
//   insert: "top",
//   container: "top-right",
//   animationIn: ["animate__animated", "animate__fadeIn"],
//   animationOut: ["animate__animated", "animate__fadeOut"],
//   dismiss: {
//     duration: 5000,
//     onScreen: true
//   }
// });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 

    <Provider store={store}>
      
      <App />
    
    </Provider> 


 
);


 