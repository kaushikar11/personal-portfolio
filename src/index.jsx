import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>,
);

// Optional: Measure performance in your app
reportWebVitals();
