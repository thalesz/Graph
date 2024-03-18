import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './context/AuthProvider'
import 'bootstrap/dist/css/bootstrap.min.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { BrowserRouter, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(
  
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
          <Route path="/*" element={<App />}/>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

