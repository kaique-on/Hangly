import React, { useState, useContext, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import EditIcon from '../assets/edit.svg';
import Fechar from '../assets/fechar.svg';
import Check from '../assets/check.svg';
import NoImg from '../assets/sem-fotos.svg';
import './EventPage.css';
import { useUser } from '../contexts/UserContext.jsx';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [form, setForm] = useState({
    name: '',
    description: '',
    date: '',
    cep: '',
    city: '',
    state: '',
    country: 'Brasil',
    street: '',
    number: '',
    district: '',
    category: '',
    imgUrl: ''
  });

  // Estado para armazenar as coordenadas do pino
  const [markerPosition, setMarkerPosition] = useState(null); 

  // chave de API do Google Maps (já presente no código)
  const Maps_API_KEY = 'AIzaSyCvPYWQGss-os4Y-QNUPf5lagES50rkxS0';

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: Maps_API_KEY,
  });

  const [map, setMap] = useState(null);

  // Define um centro padrão para o mapa, por exemplo, Indaiatuba/SP
  // Dá pra ajustar isso para uma localização mais genérica ou o centro do Brasil, se preferir
  const defaultCenter = {
    lat: -23.0903, 
    lng: -47.2185, 
  };

  // Callback para quando o mapa é carregado
  const onLoad = useCallback(function callback(mapInstance) {
    setMap(mapInstance);
    // Se já tiver uma posição de marcador, centraliza o mapa nela
    if (markerPosition) {
      mapInstance.setCenter(markerPosition);
      mapInstance.setZoom(17); 
    } else {
      // Caso contrário, centraliza no padrão
      mapInstance.setCenter(defaultCenter);
      mapInstance.setZoom(10); // Um zoom inicial mais amplo
    }
  }, [markerPosition, defaultCenter]);

  // Callback para quando o mapa é desmontado
  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);


  // --- Função buscarEndereco atualizada ---
  function buscarEndereco() {
    let cep = form.cep;
    // Remove qualquer caractere que não seja número do CEP
    const cleanedCep = cep.replace(/\D/g, ''); 

    if (cleanedCep.length !== 8) {
        console.log('CEP inválido. Digite 8 dígitos.');
        setMarkerPosition(null); // Limpa o marcador se o CEP for inválido
        if (map) {
            map.setCenter(defaultCenter);
            map.setZoom(10);
        }
        return;
    }

    let url = 'https://viacep.com.br/ws/' + cleanedCep + '/json/';
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.erro) { // ViaCEP retorna "erro" para CEPs não encontrados
            console.log('CEP não encontrado no ViaCEP.');
            setMarkerPosition(null);
            if (map) {
                map.setCenter(defaultCenter);
                map.setZoom(10);
            }
            // Limpa os campos de endereço se o CEP não for encontrado
            setForm(prev => ({
                ...prev,
                street: '',
                city: '',
                state: '',
                district: ''
            }));
            return;
        }

        // Preenche os campos do formulário
        setForm(prev => ({
          ...prev,
          street: data.logradouro,
          city: data.localidade,
          state: data.uf,
          country: "Brasil",
          district: data.bairro
        }));

        // Constrói o endereço completo para a Google Geocoding API
        // É importante incluir o número para maior precisão, se disponível
        const fullAddressString = `${data.logradouro}, ${form.number ? form.number + ',' : ''} ${data.bairro}, ${data.localidade}, ${data.uf}, Brasil`;

        // Requisição para a Google Geocoding API
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddressString)}&key=${Maps_API_KEY}`)
          .then(geoResponse => {
            if (!geoResponse.ok) {
              throw new Error(`Erro HTTP na Geocoding API! status: ${geoResponse.status}`);
            }
            return geoResponse.json();
          })
          .then(geoData => {
            if (geoData.results && geoData.results.length > 0) {
              const location = geoData.results[0].geometry.location;
              const latitude = location.lat;
              const longitude = location.lng;

              const newMarkerPosition = { lat: latitude, lng: longitude };
              setMarkerPosition(newMarkerPosition); // Atualiza o estado da posição do marcador

              // Centraliza e ajusta o zoom do mapa no novo local
              if (map) {
                map.setCenter(newMarkerPosition);
                map.setZoom(17); // Um zoom mais próximo para o endereço
              }
            } else {
              console.log('Geocodificação: Endereço não encontrado para o pino.');
              setMarkerPosition(null); // Limpa o marcador se o endereço não for geocodificado
              if (map) {
                map.setCenter(defaultCenter); // Volta para o centro padrão
                map.setZoom(10);
              }
            }
          })
          .catch(geoError => {
            console.error('Erro na Google Geocoding API:', geoError);
            setMarkerPosition(null);
            if (map) {
                map.setCenter(defaultCenter);
                map.setZoom(10);
            }
          });
      })
      .catch(error => {
        console.error('Erro ao buscar CEP:', error);
        setMarkerPosition(null); // Limpa o marcador em caso de erro no CEP
        if (map) {
            map.setCenter(defaultCenter);
            map.setZoom(10);
        }
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
        const newForm = { ...prev, [name]: value };
        // Se o número ou a rua mudarem, podemos querer refazer a busca de coordenadas
        // Mas para simplificar, vamos manter a lógica no onBlur/Enter do CEP
        return newForm;
    });
  };

  // Efeito para chamar buscarEndereco quando o número muda, para aumentar a precisão da geocodificação
  useEffect(() => {
    if (form.cep && form.number) { // Garante que o CEP e o número estejam preenchidos
        buscarEndereco();
    }
  }, [form.number]); // Dependência do número

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      ...form,
      date: form.date + "T00:00:00", // transformar para formato LocalDateTime ISO
      userId: user.userId, // pega o id do usuário logado
      // Inclui latitude e longitude no objeto do evento
      latitude: markerPosition ? markerPosition.lat : null,
      longitude: markerPosition ? markerPosition.lng : null,
    };

    // Validar campos obrigatórios antes de enviar
    if (!eventData.name || !eventData.cep || !eventData.number || !eventData.date || !eventData.description) {
        alert('Por favor, preencha todos os campos obrigatórios (nome, descrição, data, CEP e número).');
        return;
    }


    fetch('http://localhost:8081/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // caso seu backend use JWT
      },
      body: JSON.stringify(eventData)
    })
      .then(res => {
        if (res.ok) {
          alert('Evento criado com sucesso!');
          navigate('/home');
        } else {
          // Tentar ler a mensagem de erro do backend
          return res.json().then(errorData => {
            const errorMessage = errorData.message || 'Erro desconhecido ao criar evento';
            alert(`Erro ao criar evento: ${errorMessage}`);
          }).catch(() => {
            alert('Erro ao criar evento (não foi possível ler a mensagem de erro do servidor).');
          });
        }
      })
      .catch(err => {
        console.error(err);
        alert('Erro na requisição. Verifique sua conexão ou o servidor.');
      });
  };

  return (
    <div className='create-body'>
      <NavBar pagina={'home'} />
      <div className='event-body'>
        <div className='banner-img-none'><img src={NoImg} alt="" /></div>

        <div className='event-title-edit'>
          <div>
            <input
              className='event-title-create'
              placeholder='Insira aqui o nome do evento'
              name='name'
              value={form.name}
              onChange={handleChange}
              required
            />
            <span style={{ color: 'var(--cor-principal)', fontSize: 32 }}>*</span>
          </div>

          <div className='edit-btns-x'>
            <button className='btn-verde' onClick={handleSubmit}><img src={Check} alt="Confirmar" /></button>
            <button onClick={() => navigate('/home')}><img src={Fechar} alt="Fechar" /></button>
          </div>
        </div>

        <textarea
          className='event-description-txt'
          placeholder='Descrição do evento'
          name='description'
          value={form.description}
          onChange={handleChange}
          required
        />

        <div className='endr-section'>
          <h3>Endereço</h3>
          <form onSubmit={handleSubmit}>
            <div className='form-endereco'>
              <div className='input-endereco cep'>
                <label>CEP: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
                <input
                  type="text"
                  name='cep'
                  value={form.cep}
                  onChange={handleChange}
                  onBlur={buscarEndereco} // Chama ao sair do input
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // Evita que o Enter submeta o formulário
                      buscarEndereco();
                    }
                  }}
                  required
                />
              </div>

              <div className='input-endereco cidade'>
                <label>Cidade: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
                <input type="text" name='city' value={form.city} onChange={handleChange} required />
              </div>

              <div className='input-endereco estado'>
                <label>Estado: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
                <select name="state" value={form.state} onChange={handleChange} required>
                  <option value="">Selecione um estado</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="PR">Paraná</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="BA">Bahia</option>
                  <option value="PE">Pernambuco</option>
                  <option value="CE">Ceará</option>
                  <option value="GO">Goiás</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="AM">Amazonas</option>
                  <option value="PA">Pará</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MA">Maranhão</option>
                  <option value="PI">Piauí</option>
                  <option value="AL">Alagoas</option>
                  <option value="TO">Tocantins</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="AC">Acre</option>
                  <option value="AP">Amapá</option>
                </select>
              </div>

              <div className='input-endereco pais'>
                <label>País: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
                <input type="text" name='country' value={form.country} onChange={handleChange} required />
              </div>

              <div className='input-endereco bairro'>
                <label>Bairro: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
                <input type="text" name='district' value={form.district} onChange={handleChange} required />
              </div>

              <div className='input-endereco rua'>
                <label>Rua: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
                <input type="text" name='street' value={form.street} onChange={handleChange} required />
              </div>

              <div className='input-endereco numero'>
                <label>Número: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
                <input type="number" name='number' value={form.number} onChange={handleChange} required />
              </div>

              <div className='input-endereco'>
                <label>Categoria: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
                <input type="text" name='category' value={form.category} onChange={handleChange} />
              </div>

              <div className='input-endereco'>
                <label>Data do Evento: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
                <input type="date" name='date' value={form.date} onChange={handleChange} required />
              </div>

              <div className='input-endereco'>
                <label>Link URL da Imagem do Evento: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
                <input type="text" name='imgUrl' value={form.imgUrl} onChange={handleChange} />
              </div>
            </div>

            <div className='mapa'>
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ height: "100%", width: "100%" }}
                  center={markerPosition || defaultCenter} // Usa a posição do marcador se existir, senão o centro padrão
                  zoom={markerPosition ? 17 : 10} // Ajusta o zoom com base na existência do marcador
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {markerPosition && ( // Renderiza o Marker apenas se houver uma posição definida
                    <Marker position={markerPosition} />
                  )}
                </GoogleMap>
              ) : (
                <div>Carregando Mapa...</div> // Feedback de carregamento
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateEventPage;