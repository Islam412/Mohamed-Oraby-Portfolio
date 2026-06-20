// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';
import { Toaster } from 'react-hot-toast';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <Toaster position="bottom-center" reverseOrder={false} toastOptions={{
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid rgba(201, 168, 76, 0.3)',
        },
        success: {
          icon: '✅',
          style: {
            background: '#1a1a1a',
            border: '1px solid rgba(74, 222, 128, 0.3)',
          },
        },
        error: {
          icon: '❌',
          style: {
            background: '#1a1a1a',
            border: '1px solid rgba(248, 113, 113, 0.3)',
          },
        },
      }} />
      <App />
    </AppProvider>
  </React.StrictMode>,
);