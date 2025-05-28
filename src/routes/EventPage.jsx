import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.jsx';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import EditIcon from '../assets/edit.svg';
import Delete from '../assets/delete.svg';
import './EventPage.css';

function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [address, setAddress] = useState(null);

  const { user } = useUser();

  useEffect(() => {
    fetch(`http://localhost:8081/event/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar evento');
      }
      return response.json();
    })
    .then(data => {
      setEvento(data);
      setAddress(data.address);
    })
    .catch(error => {
      console.error('Erro:', error);
      navigate('/');
    });
  }, [id, navigate]);

  if (!evento || !address) {
    return (
      <div className="loading">
        <p>Carregando evento...</p>
      </div>
    );
  }
  const isOwner = user?.userId === evento.userId;

  const dataFormatada = new Date(evento.date).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    const confirm = window.confirm("Tem certeza que deseja deletar este evento?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:8081/event/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert("Evento deletado com sucesso!");
        navigate('/home'); 
      } else {
        const errorMsg = await response.text();
        alert(`Erro ao deletar evento: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro na deleção do evento.");
    }
  };



  return (
    <div className='event-layout'>
      <NavBar pagina={'home'}/>

      <div className='event-body'>
        <div 
          className='banner-img' 
          style={{ backgroundImage: `url(${evento.imgUrl})` }}
        ></div>

        <div className='event-title-edit'>
          <h2 className='event-title'>{evento.name}</h2>

          {isOwner && (
            <div className='edit-btns'>
              <button><img src={EditIcon} alt="Editar"/></button>
              <button onClick={handleDelete}><img src={Delete} alt="Deletar"/></button>
            </div>
          )}
        </div>
        
        <div className="event-description">
          <p>{evento.description}</p>
        </div>

        <div className="endereco">
          {`${address.street}, ${address.number} - ${address.district}, ${address.city} - ${address.state}, ${address.country}, CEP: ${address.cep}`}
          <br/>
          {`${dataFormatada}`}
        </div>

        {!isOwner &&(<div className="interesse">
          <input type="checkbox" id="interesse"/>
          <label htmlFor="interesse">Estou interessado nesse evento</label>
        </div>)}
      </div>
      
      <Footer />
    </div>
  );
}

export default EventPage;
