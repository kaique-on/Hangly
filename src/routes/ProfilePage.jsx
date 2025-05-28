import React from 'react';
import NavBar from '../components/NavBar';
import './ProfilePage.css';
import { useUser } from '../contexts/UserContext.jsx';

import SemFoto from '../assets/sem-foto.jpg';
import EstrelaCheia from '../assets/estrela-cheia.svg';
import EstrelaVazia from '../assets/estrela-vazia.svg';
import LocalIcon from '../assets/local-icon.svg';
import MsgIcon from '../assets/mensagem-icon.svg';
import Denunciar from '../assets/denunciar.svg';
import Fotos from '../assets/sem-fotos.svg';

function ProfilePage() {
    const { user } = useUser();

    const nome = user?.name || "Valor não informado";
    const cidade = user?.city || "Valor não informado";
    const birthDate = user?.birthDate ? user.birthDate : "Valor não informado";
    const rating = user?.rating !== null && user?.rating !== undefined ? user.rating : "Valor não informado";
    const imgUrl = user?.imgUrl || SemFoto;

    return (
        <div className='profile-layout'>
            <NavBar pagina={'home'} />
            <div className='profile-body'>
                <div className='img-events'>
                    <img className='foto-perfil' src={imgUrl} alt="Foto de perfil" />
                    <div className='ultimos-eventos'>
                        <div className='ultimos-eventos-titulo'>
                            <p>Ultimos Eventos</p> <br />
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className='info'>
                    <div className='info-fotos'>
                        <div>
                            <div className='top-info'>
                                <h4 className='profile-name'>
                                    {`${nome}, ${birthDate !== "Valor não informado" ? birthDate : "Valor não informado"}`}
                                </h4>
                                <div className='local'>
                                    <img src={LocalIcon} />
                                    <p>{cidade}</p>
                                </div>
                            </div>
                            <p className='profissao'>{user?.profession || "Profissão não informada"}</p>
                            <div>
                                <p className='rating-title'>Avaliação pessoal</p>
                                <div className='rating'>
                                    <h4>{rating}</h4>
                                    <div className='rating-stars'>
                                        <img src={EstrelaCheia} />
                                        <img src={EstrelaCheia} />
                                        <img src={EstrelaCheia} />
                                        <img src={EstrelaCheia} />
                                        <img src={EstrelaVazia} />
                                    </div>
                                </div>
                            </div>

                            <div className='botoes'>
                                <div className='botao btn-rosa'>
                                    <img src={MsgIcon} />
                                    <h5>Enviar mensagem</h5>
                                </div>
                                <div className="botao">
                                    <img src={Denunciar} />
                                    <h5>Denunciar usuário</h5>
                                </div>
                            </div>
                        </div>
                        <div className='fotos'>
                            <img src={Fotos} alt="Sem fotos" />
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;
