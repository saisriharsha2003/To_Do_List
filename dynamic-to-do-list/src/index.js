import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Adjust the path if App is in a different folder
import './index.css'; // Adjust the path if your CSS file is in a different folder

// Get the root element
const rootElement = document.getElementById('root');

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
