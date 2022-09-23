import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './components/contextApi/ContextApi'
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppProvider>
);