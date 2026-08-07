import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './services/AuthContext';
import { RecordsProvider } from './services/RecordsContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RecordsProvider>
          <App />
        </RecordsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
