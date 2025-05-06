import {React, useState} from 'react'
import NavBar from '../components/NavBar';
import { useParams, useNavigate } from 'react-router-dom';
import './AuthPage.css';
import ArrowsSVG from '../assets/double-arrow-white.svg';


const CadastroPage = () => {
  const navigate = useNavigate(); // hook de navegação
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // evita recarregar a página

    const { name, email, password, confirmPassword } = formData;

    // Validação simples
    if (!name || !email || !password || !confirmPassword) {
      alert('Preencha todos os campos!');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    navigate('/home');
  };


  return (
    <div className='login-page'>
            <NavBar pagina='cadastro'/>
            <div className='login-body'>
                <form className='form-auth' onSubmit={handleSubmit}>
                <div>
                  <label for="name">Nome:</label>
                  <input type="text" id="name" name="name" placeholder="Qual é o seu nome?" onChange={handleChange} required />
                </div>
                <div>
                  <label for="email">Email:</label>
                  <input type="email" id="email" name="email" placeholder="Qual email deseja associar ao Hangly?" onChange={handleChange}  required ></input>
                </div>
                <div>
                  <label for="password">Senha:</label>
                  <input type="password" id="password" name="password" placeholder="Crie uma senha" onChange={handleChange} required />
                </div>
                <div>
                  <label for="confirmPassword">Confirme a senha:</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirme sua senha" onChange={handleChange} required />
                </div>

                <button type="submit">Próximo<img src={ArrowsSVG} /></button>
                </form>
            </div>
    
        </div>
  ) 
}

export default CadastroPage