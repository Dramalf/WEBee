import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './app'
import './index.css'
const wrapper=document.createElement('div');
wrapper.setAttribute('id','bee-extention-wrapper');
document.body.appendChild(wrapper);
const root = ReactDOM.createRoot(wrapper);
root.render(
      <App />
  );

