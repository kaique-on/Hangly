import { Link } from 'react-router-dom';
import React from 'react';
import Logo from '../assets/Hangly Logo White.svg';
import './NavBar.css';
import SemFoto from '../assets/sem-foto.jpg';
import AddIcon from '../assets/add.svg';
import Logout from '../assets/logout.svg';
import { useUser } from '../contexts/UserContext.jsx';

const NavBar = ({ pagina }) => {
    const { user } = useUser();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <nav className={`navbar ${pagina}`}>
            <Link to={pagina === 'home' ? "/home" : "/"} className='logo'>
                <img src={Logo} alt="" />
                <p>Hangly</p>
            </Link>

            {(pagina === 'landing' &&
                <div className='botoes-entrar'>
                    <Link className='btn-cadastro' to={"/signin"}>Cadastrar</Link>
                    <Link className='btn-login' to={"/login"}>Entrar</Link>
                </div>
            )}

            {(pagina === 'login' &&
                <h3 className='titulo-pag'>Login</h3>
            )}

            {(pagina === 'signin' &&
                <h3 className='titulo-pag'>Cadastro</h3>
            )}

            {(pagina === 'home' &&
                <div className='home-pag'>
                    <Link className='create' to={"/create"}>
                        <img src={AddIcon} alt="" />
                        <p>Criar</p>
                    </Link>
                    <Link className='profile' to={"/profile"}>
                        <p>{user ? user.name : "Usuário"}</p>
                        <img src={SemFoto} />
                    </Link>
                    <div className='logout' onClick={handleLogout}>
                        <img src={Logout} />
                    </div>
                </div>
            )}
        </nav>
    )
}

export default NavBar;
