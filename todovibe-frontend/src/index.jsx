import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx'; 
import './index.css'; 
import { HashRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 

const RootComponent = () => {
  return (
    <React.StrictMode>
      <Toaster position='top-right' />
      <App />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <RootComponent />
  </HashRouter>
);
