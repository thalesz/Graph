import { Routes, Route } from 'react-router-dom';

import React from 'react';
import './App.css';
import Login from  './components/Login'
import Layout from './components/Layout';
import Register from './components/Register'
import Unauthorized from './components/Unauthorized';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home'
import Users from './components/Users'
import PageLogin from  './components/PageLogin'
import PageAgrupMediaPond from './components/AgrupMediaPond/PageAgrupMediaPond';
const ROLES = {
  'User': '2001',
  'Editor': '2002',
  'Admin': '187'
}

function App() {
  return (
    <Routes >  
      <Route path="/" >
        {/* rotas publicas */}
        <Route path="login" 
            element={
              <PageLogin imageName="imagem4.png">
                <Login />
              </PageLogin>
            }
        />
        <Route path="register"
           element={
              <PageLogin imageName='imagem3.png'>
                  <Register/>
              </PageLogin>
            } 
           
        />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes -- aplicando o layout */}
        <Route path="/" element={<Layout />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="/" element={<Home />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> 
              < Route path="/users" element={<Users />} />
            </Route>
        
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> 
              < Route path="/agrupMediaPond" element={<PageAgrupMediaPond />} />
            </Route>
        </Route>
          
        <Route path="*" element={<Missing />} />

      </Route>
    </Routes>
  );
}

export default App;
