import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Lupa from '../assets/lupa.svg';

function HomePage() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/event', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      return response.json();
    })
    .then(data => {
      setEventos(data);
    })
    .catch(error => {
      console.error('Erro ao buscar eventos:', error);
    });
  }, []);

  return (
    <div className='home-layout'>
      <NavBar pagina={'home'}/>

      <div className='home-body'>
        <div className="pesquisa">
          <input type="text" placeholder='Pesquisar eventos'/>
          <img src={Lupa} alt="Ícone de pesquisa"/>
        </div>

        <div className='categorias'>
          <button className='btn-categoria cat-selecionada'>Todas</button>
          <button className='btn-categoria'>Esportes</button>
          <button className='btn-categoria'>Música</button>
          <button className='btn-categoria'>Festas</button>
          <button className='btn-categoria'>Cinema</button>
          <button className='btn-categoria'>Restaurantes</button>
          <button className='btn-categoria'>Shopping</button>
          <button className='btn-categoria'>Natureza</button>
          <button className='btn-categoria'>Arte</button>          
        </div>

        <div className='eventos'>
          {eventos.map(evento => (
            <Link 
              className='evento-card'
              to={`/event/${evento.eventId}`}
              key={evento.eventId}
              style={{ backgroundImage: `url(${evento.imgUrl})` }}
            >
              <div className='evento-faixa'>{evento.name}</div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
