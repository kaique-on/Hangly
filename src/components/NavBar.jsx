import {Link} from 'react-router-dom';
import React from 'react';
import Logo from '../assets/Hangly Logo White.svg';
import './NavBar.css';
import LandingPage from '../routes/LandingPage';

const NavBar = ({pagina}) => {
  return (
    <nav className={`navbar ${pagina}`}>
        <Link to={"/"} className='logo'>
            <img  src={Logo} alt=""/>
            <p>Hangly</p>
        </Link>
        
        {(pagina === 'landing' && 
            <div className='botoes-entrar'>
            <Link className='btn-cadastro' to={"/cadastro"}>Cadastrar</Link>
            <Link className='btn-login' to={"/login"}>Entrar</Link>
        </div>
        )}

        {(pagina === 'login' && 
            <h3 className='titulo-pag'>
            Login
        </h3>
        )}

        {(pagina === 'cadastro' && 
            <h3 className='titulo-pag'>
            Cadastro
        </h3>
        )}
    </nav>
  )
}

export default NavBar