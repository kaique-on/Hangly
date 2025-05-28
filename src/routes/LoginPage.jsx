import {React, useState} from 'react'
import NavBar from '../components/NavBar';
import { useParams, useNavigate } from 'react-router-dom';
import './AuthPage.css';
import ArrowsSVG from '../assets/double-arrow-white.svg';
import { useAuth } from '../contexts/AuthContext';


const LoginPage = () => {
    
  const navigate = useNavigate(); // hook de navegação
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login inválido');
      }

      const data = await response.json();
      const token = data.token;

      // Salva no contexto
      login(token);

      // Redireciona para a home
      navigate('/home');
    } catch (error) {
      alert('Erro ao fazer login: ' + error.message);
    }
  };
  

  return (
    <div className='login-page'>
            <NavBar pagina='login'/>
            <div className='login-body'>
                <form className='form-auth' onSubmit={handleSubmit}>
                <div>
                  <label for="email">Email:</label>
                  <input type="email" id="email" name="email" placeholder="Insira um email existente" onChange={handleChange} required />
                </div>
                <div>
                  <label for="password">Senha:</label>
                  <input type="password" id="password" name="password" placeholder="Insira sua senha" onChange={handleChange} required />
                </div>

                <button type="submit">Próximo<img src={ArrowsSVG} /></button>
                </form>
            </div>
    
        </div>
        )
}

export default LoginPage