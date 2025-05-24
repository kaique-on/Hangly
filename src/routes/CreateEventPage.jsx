import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'
import EditIcon from '../assets/edit.svg';
import Fechar from '../assets/fechar.svg';
import NoImg from '../assets/sem-fotos.svg'
import './EventPage.css';

const CreateEventPage = () => {

  function autoGrow(element) {
  element.style.height = "auto";
  element.style.height = Math.max(200, element.scrollHeight) + "px";
}


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
        <textarea oninput="autoGrow(this)" rows="1" className='event-description-txt'>
            
        </textarea>
        </div>
    </div>
  )
}

export default CreateEventPage