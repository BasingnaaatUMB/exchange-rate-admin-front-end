import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import axios from './api/axios';
const LOGIN_URL = '/login';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        username: user,
        password: password,
      });
      const accessToken = response?.data?.accessToken;
      setAuth({ user, password, accessToken })
      setUser('');
      setPassword('');
      navigate(from, { replace: true });
    }catch(error){
      if (!error?.response){
        setErrMsg('No Server Response');
      } else if (error.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (error.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed'); 
      }
      errRef.current.focus();
    }
  }

  return (
    <div className="registerSection">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className="registerForm"> 
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        ></input>
        <button>Sign In</button>
      </form>
      <p>
        Need an Account? <br />
        <span className="line">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
