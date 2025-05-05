import React from 'react'
import NavBar from '../components/NavBar';
import { useParams, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className='login-page'>
            <NavBar pagina='login'/>
            <div className='login-body'>
                <form action="">
                <div>
                  <label for="name">Nome:</label>
                  <input type="text" id="name" name="name" placeholder="Qual é o seu nome?" required />
                </div>
                <div>
                  <label for="email">Email:</label>
                  <input type="email" id="email" name="email" placeholder="Qual email deseja associar ao Hangly?" required></input>
                </div>
                <div>
                  <label for="password">Senha:</label>
                  <input type="password" id="password" name="password" placeholder="Crie uma senha" required />
                </div>
                <div>
                  <label for="confirm-password">Confirme a senha:</label>
                  <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirme sua senha" required />
                </div>
                </form>
            </div>
    
        </div>
  ) 
}

export default LoginPage