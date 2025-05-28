import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import EditIcon from '../assets/edit.svg';
import Fechar from '../assets/fechar.svg';
import Check from '../assets/check.svg';
import NoImg from '../assets/sem-fotos.svg';
import './EventPage.css';
import { useUser } from '../contexts/UserContext.jsx';

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

  function buscarEndereco() {
    let cep = form.cep;
    let url = 'https://viacep.com.br/ws/' + cep + '/json/';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setForm(prev => ({
          ...prev,
          street: data.logradouro,
          city: data.localidade,
          state: data.uf,
          country: "Brasil",
          district: data.bairro
        }));
      })
      .catch(error => console.error(error));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      ...form,
      date: form.date + "T00:00:00", // transformar para formato LocalDateTime ISO
      userId: user.userId // pega o id do usuário logado
    };

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
          alert('Erro ao criar evento');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Erro na requisição');
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
            <button className='btn-verde' onClick={handleSubmit}><img src={Check} /></button>
            <button onClick={() => navigate('/home')}><img src={Fechar} /></button>
          </div>
        </div>

        <textarea
          className='event-description-txt'
          placeholder='Descrição do evento'
          name='description'
          value={form.description}
          onChange={handleChange}
        />

        <div className='endr-section'>
          <h3>Endereço</h3>
          <form className='form-endereco' onSubmit={handleSubmit}>
            <div className='input-endereco cep'>
              <label>CEP: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
              <input
                type="text"
                name='cep'
                value={form.cep}
                onChange={handleChange}
                onBlur={buscarEndereco}
                required
              />
            </div>

            <div className='input-endereco cidade'>
              <label>Cidade:</label>
              <input type="text" name='city' value={form.city} onChange={handleChange} required />
            </div>

            <div className='input-endereco estado'>
              <label>Estado:</label>
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
              <label>País:</label>
              <input type="text" name='country' value={form.country} onChange={handleChange} required />
            </div>

            <div className='input-endereco bairro'>
              <label>Bairro:</label>
              <input type="text" name='district' value={form.district} onChange={handleChange} required />
            </div>

            <div className='input-endereco rua'>
              <label>Rua:</label>
              <input type="text" name='street' value={form.street} onChange={handleChange} required />
            </div>

            <div className='input-endereco numero'>
              <label>Número: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
              <input type="number" name='number' value={form.number} onChange={handleChange} required />
            </div>

            <div className='input-endereco'>
              <label>Categoria:</label>
              <input type="text" name='category' value={form.category} onChange={handleChange} />
            </div>

            <div className='input-endereco'>
              <label>Data do Evento:</label>
              <input type="date" name='date' value={form.date} onChange={handleChange} required />
            </div>

            <div className='input-endereco'>
              <label>URL da Imagem (opcional):</label>
              <input type="text" name='imgUrl' value={form.imgUrl} onChange={handleChange} />
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateEventPage;
