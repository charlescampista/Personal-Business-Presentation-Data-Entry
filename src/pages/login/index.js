
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    
    try {
      const response = await api.post('api/login', { email, password });
      //const response = await api.get('api/projects');
      console.log('====================================');
      console.log(response.data.data.token);
      console.log('====================================');
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      localStorage.setItem('user',response.data.data.user.id);
      localStorage.setItem('token', response.data.data.token);
      
      navigate('/home');
    } catch (err) {
      console.log(err);
      //alert('Falha no login, tente novamente.');
      navigate('/');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">

        <form onSubmit={handleLogin}>
          <input 

            placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="Sua Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#3498db" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
    </div>
  );
}