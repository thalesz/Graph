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
// import PageAgrupMediaPond from './components/AgrupMediaPond/PageAgrupMediaPond';
import PageAgrupMediaPond from './components/AgrupMediaPondBTS/PageAgrupMediaPond';
import PageDuvidaPorQuestao from './components/DuvidaPorQuestao/PageDuvidaPorQuestao';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import PageDuvPerQuestao from './components/DuvidaPorQuestaoBTS/PageDuvPerQuestao';
import PageMediaPond from './components/MediaPond/PageMediaPond';
import PageMetricas from './components/Metricas/PageMetricas';

const ROLES = {
  'User': '2001',
  'Editor': '2002',
  'Admin': '187'
}

function App() {
  return (
    // <ThemeProvider theme={theme}> {/* Envolve o conteúdo com o ThemeProvider */}

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
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> 
              < Route path="/duvidasPorAluno" element={<PageDuvPerQuestao />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> 
              < Route path="/mediaPond" element={<PageMediaPond/>} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> 
              < Route path="/metricas" element={<PageMetricas url='/metricas'/>} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> 
              < Route path="/medias" element={<PageMetricas url='/medias'/>} />
            </Route>
        </Route>
          
        <Route path="*" element={<Missing />} />

      </Route>
    </Routes>
    // </ThemeProvider>
  );
}

export default App;
