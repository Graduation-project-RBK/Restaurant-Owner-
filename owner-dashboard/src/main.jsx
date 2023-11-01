import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from './features/restaurantSlice.js';

const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer position="top-right" autoClose={3000} />
  </React.StrictMode>,
)
