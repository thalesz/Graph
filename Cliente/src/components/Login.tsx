import { useRef, useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { AxiosError } from 'axios';



const LOGIN_URL = '/auth';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from: { pathname: string } })?.from?.pathname || '/';

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
     // console.log(roles.type)
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err: any) {
        if (!(err instanceof AxiosError) || !err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login Failed');
        }
        if (errRef.current) {
          errRef.current.focus();
        }
      }
  };

  return (
    <div>
      <section className='midBox'>
        <div className='BemVindo'>
          <h1>Bem-vindo de volta!</h1>
          <p>Por favor, faça login para acessar sua conta.</p>

        </div>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
          {errMsg}
        </p>
        <form onSubmit={handleSubmit}>
                  
        <div className="input-wrapper">
          <input type="text" placeholder="User" name="text" className="input"
                id="username"
                ref={userRef}   
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
          />
        </div>


                  <div className="input-wrapper">

                    <input className="input"
                            placeholder="Senha"
                            type="password" 
                            id="password"
                            onChange={(e)=>setPwd(e.target.value)}
                            value={pwd}
                            required
                            />
                  </div>
                
                  <button>Entrar</button>
              </form>

        <div className='containerNewConta'>
            <p>
              Precisa de uma conta?<br />
            </p>
            <p className="line">
              <Link className='lineLink' to="/register">Cadastro</Link>
            </p>
        </div>
        
        

      </section>

      <div className="gradiente"></div>
    </div>
    

  );
};

export default Login;
