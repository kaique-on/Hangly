import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Foto from '../assets/sem-foto.jpg';
import EstrelaCheia from '../assets/estrela-cheia.svg';
import EstrelaVazia from '../assets/estrela-vazia.svg';
import LocalIcon from '../assets/local-icon.svg'
import MsgIcon from '../assets/mensagem-icon.svg'
import Denunciar from '../assets/denunciar.svg';
import Fotos from '../assets/sem-fotos.svg'
import './ProfilePage.css';

function ProfilePage() {
  return (
    <div className='profile-layout'>
        <NavBar pagina={'home'}/>
        <div className='profile-body'>
            <div className='img-events'>
                <img className='foto-perfil' src={Foto} />
                <div className='ultimos-eventos'>
                    <div className='ultimos-eventos-titulo'><p>Ultimos Eventos</p> <br /></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className='info'>
                <div className='info-fotos'>
                <div>
                <div className='top-info'>
                    <h4 className='profile-name'>Kaique Nascimento, 19y</h4>
                    <div className='local'><img src={LocalIcon}/><p>Itapevi, SP</p></div>
                </div>
                <p className='profissao'>Desenvolvedor Web</p>
                <div>
                    <p className='rating-title'>Avaliação pessoal</p>
                    <div className='rating'>
                        <h4>8,6</h4>
                        <div className='rating-stars'>
                            <img src={EstrelaCheia}/>
                            <img src={EstrelaCheia}/>
                            <img src={EstrelaCheia}/>
                            <img src={EstrelaCheia}/>
                            <img src={EstrelaVazia}/>
                        </div>
                    </div>
                </div>

                <div className='botoes'>
                    <div className='botao btn-rosa'>
                        <img src={MsgIcon} />
                        <h5>Enviar mensagem</h5>
                    </div>
                    <div className="botao">
                        <img src={Denunciar}/>
                        <h5>Denunciar usuário</h5>
                    </div>
                </div>
                </div>
                <div className='fotos'>
                    <img src={Fotos} alt="" />
                </div>
                </div>
                
                <hr />
            </div>
        </div>
    </div>
  )
}

export default ProfilePage