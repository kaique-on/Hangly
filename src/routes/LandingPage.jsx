import React from 'react';
import NavBar from '../components/NavBar';
import { useParams, useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (    
    <div className='landing-page'>
        <NavBar pagina='landing'/>
        <div className='landing-body'>
            <h1>Chame alguém pra dar um rolê!</h1>
            <h4>Junte-se à comunidade, escolha um evento e conheça novas pessoas com interesses em comum!</h4>
        </div>

    </div>
  )
}

export default LandingPage