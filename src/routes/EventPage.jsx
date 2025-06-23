import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.jsx';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import EditIcon from '../assets/edit.svg';
import Delete from '../assets/delete.svg';
import './EventPage.css';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'; // Importações necessárias

function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [address, setAddress] = useState(null);

  const { user } = useUser();

  // Sua chave de API do Google Maps (a mesma usada na CreateEventPage)
  const Maps_API_KEY = 'AIzaSyCvPYWQGss-os4Y-QNUPf5lagES50rkxS0'; 

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: Maps_API_KEY,
  });

  const [map, setMap] = useState(null);

  // Estado para a posição do marcador no mapa de visualização
  const [markerPosition, setMarkerPosition] = useState(null);

  // Callback para quando o mapa é carregado
  const onLoad = useCallback(function callback(mapInstance) {
    setMap(mapInstance);
    // Se tivermos a posição do marcador, centraliza o mapa nela
    if (markerPosition) {
      mapInstance.setCenter(markerPosition);
      mapInstance.setZoom(17); // Um zoom adequado para visualização do endereço
    } else {
      // Opcional: Um centro padrão se por algum motivo não houver coordenadas
      // No contexto desta página, esperamos que o evento tenha coordenadas
      mapInstance.setCenter({ lat: -23.0903, lng: -47.2185 }); // Ex: Indaiatuba, SP
      mapInstance.setZoom(10);
    }
  }, [markerPosition]); // Adicionado markerPosition como dependência

  // Callback para quando o mapa é desmontado
  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

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

      // Se o backend retornar latitude e longitude, use-as
      if (data.latitude && data.longitude) {
        setMarkerPosition({ lat: data.latitude, lng: data.longitude });
      } else {
        // Fallback: Se o backend não tiver lat/lng, tente geocodificar o endereço completo
        // Isso é uma boa prática para garantir que o mapa seja exibido
        const fullAddressString = `${data.address.street}, ${data.address.number || ''}, ${data.address.district}, ${data.address.city}, ${data.address.state}, ${data.address.country}`;
        
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddressString)}&key=${Maps_API_KEY}`)
          .then(geoResponse => geoResponse.json())
          .then(geoData => {
            if (geoData.results && geoData.results.length > 0) {
              const location = geoData.results[0].geometry.location;
              setMarkerPosition({ lat: location.lat, lng: location.lng });
            } else {
              console.warn('Não foi possível geocodificar o endereço do evento.');
              setMarkerPosition(null); // Garante que nenhum marcador seja exibido se não encontrado
            }
          })
          .catch(geoError => {
            console.error('Erro na Geocoding API ao buscar evento:', geoError);
            setMarkerPosition(null);
          });
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      navigate('/');
    });
  }, [id, navigate, Maps_API_KEY]); // Adicionado Maps_API_KEY como dependência

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
              {/* <button><img src={EditIcon} alt="Editar"/></button> */} {/* Botão de editar comentado por enquanto */}
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

        {/* Seção do mapa */}
        <div className='mapa mapa-evento'>
          {isLoaded && markerPosition ? (
            <GoogleMap
              mapContainerStyle={{ height: "100%", width: "100%" }} // Ajuste o tamanho conforme necessário
              center={markerPosition}
              zoom={17} // Um zoom que mostra bem o endereço
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              <Marker position={markerPosition} />
            </GoogleMap>
          ) : (
            isLoaded && !markerPosition ? (
                <p>Localização do evento não disponível ou em carregamento.</p>
            ) : (
                <p>Carregando mapa...</p>
            )
          )}
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