import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'
import { Link, useParams, useNavigate } from 'react-router-dom';
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
          <Link className='evento-card e-card1' to={'/event'}>
            <div className='evento-faixa'>Rave Neon Night Alienz</div>
          </Link>
          <Link className='evento-card e-card2'>
            <div className='evento-faixa'>Pré-estreia de Vingadores: Guerras Secretas </div>
          </Link>
          <Link className='evento-card e-card3'>
            <div className='evento-faixa'>Show da banda Lupe De Lupe</div>
          </Link>
          <Link className='evento-card e-card4'>
            <div className='evento-faixa'>Piquenique no Ibirapuera</div>
          </Link>
          <Link className='evento-card e-card5'>
            <div className='evento-faixa'>Exposição do Van Gogh</div>
          </Link>
          <Link className='evento-card e-card6'>
            <div className='evento-faixa'>Karaokê na Liba</div></Link>
        </div>


      </div>

      <Footer />
    </div>
  )
}

export default HomePage