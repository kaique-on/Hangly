import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'
import EditIcon from '../assets/edit.svg';
import Fechar from '../assets/fechar.svg';
import NoImg from '../assets/sem-fotos.svg'
import './EventPage.css';

const CreateEventPage = () => {
  return (
    <div className='create-body'>
        <NavBar pagina={'home'}/>
        <div className='event-body'>
            <div className='banner-img-none'><img src={NoImg} alt="" /></div>
            <div className='event-title-edit'>
                            <input className='event-title-create' placeholder='Insira aqui o nome do evento'></input>
                            <div className='edit-btns-x'>
                                <button><img src={Fechar}/></button>
                            </div>
                        </div>
        <div className='event-description'>
            a
        </div>
        </div>
    </div>
  )
}

export default CreateEventPage