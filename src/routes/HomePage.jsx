import React from 'react';
import NavBar from '../components/NavBar';
import { useParams, useNavigate } from 'react-router-dom';
import './HomePage.css';
import Lupa from '../assets/lupa.svg';

function HomePage() {
  return (
    <div className='home-layout'>
      <NavBar pagina={'home'}/>
      <div className='home-body'>
        <div className="pesquisa">
          <input type="text" placeholder='Pesquisar eventos'/>
          <img src={Lupa} />
        </div>
      </div>
    </div>
  )
}

export default HomePage