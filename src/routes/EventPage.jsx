import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import EditIcon from '../assets/edit.svg';
import Delete from '../assets/delete.svg';
import './EventPage.css'

function EventPage() {
  return (
    <div className='event-layout'>
        <NavBar pagina={'home'}/>
        <div className='event-body'>
            <div className='banner-img'></div>
            <div className='event-title-edit'>
                <h3 className='event-title'>Rave Neon Night Alienz</h3>
                <div className='edit-btns'>
                    <button><img src={EditIcon}/></button>
                    <button><img src={Delete}/></button>
                </div>
            </div>
            
            <div class="event-description">
            <p><strong>Sábado agora vai rolar a Rave Neon Night Alienz 🌌🛸</strong></p>

            <p>Vai ser aquela rave insana, cheia de luz negra, tinta neon, som pesado e a galera mais fora da órbita reunida no rolê.</p>
            <p>O lugar vai estar todo no tema alien — então já separa teu look mais brilhante, que a ideia é todo mundo brilhar no escuro mesmo 😎✨</p>

            <p><strong>Vai ter:</strong></p>
            <ul>
                <li>DJ de psy, techno e umas batidas que parecem mensagem de outro planeta</li>
                <li>Maquiagem UV grátis na entrada</li>
                <li>Decoração intergaláctica muito doida</li>
                <li>E claro, aquele cantinho pra dar uma respirada entre os sets</li>
            </ul>

            <p>Começa às <strong>23h</strong> e vai até o sol nascer (ou a nave pousar de novo kkk).</p>
            <p>Chama quem curte esse tipo de vibe e cola com a gente!</p>

            <p>📍 <strong>Local:</strong> Base secreta (endereço no privado 👽)
                🎟️ <strong>Leva teu look neon, tua energia e vem viver esse rolê de outro mundo!</strong></p>
            </div>

        </div>
    </div>
  )
}

export default EventPage