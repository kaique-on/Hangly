import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'
import EditIcon from '../assets/edit.svg';
import Fechar from '../assets/fechar.svg';
import Check from '../assets/check.svg';
import NoImg from '../assets/sem-fotos.svg';
import './EventPage.css';

const CreateEventPage = () => {

  function buscarEndereco() {
    let cep = document.getElementById('cep').value
    let url = 'https://viacep.com.br/ws/' + cep + '/json/'
    fetch(url)
    .then(Response => Response.json())
    .then(data => {
      document.getElementById('rua').value = data.logradouro
      document.getElementById('cidade').value = data.localidade
      document.getElementById('estado').value = data.uf
      document.getElementById('pais').value = "Brasil"
      document.getElementById('bairro').value = data.bairro
    })
    .catch(error => console.error(error))
  }

  return (
    <div className='create-body'>
        <NavBar pagina={'home'}/>
        <div className='event-body'>
            <div className='banner-img-none'><img src={NoImg} alt="" /></div>
            <div className='event-title-edit'>
                            <div>
                              <input className='event-title-create' placeholder='Insira aqui o nome do evento'></input>
                               <span style={{ color: 'var(--cor-principal)', fontSize: 32  }}>*</span>
                              </div>
                            <div className='edit-btns-x'>
                                <button className='btn-verde'><img src={Check}/></button>
                                <button><img src={Fechar}/></button>
                            </div>
                        </div>
        <textarea oninput="autoGrow(this)" rows="1" className='event-description-txt'>
            
        </textarea>

        <div className='endr-section'>
          <h3>Endereço</h3>
          <form className='form-endereco' action="submit">
            <div className='input-endereco cep'>
              <label htmlFor="">CEP: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
              <input type="number" name='cep' id='cep' required onKeyDown={(e) => {
    if (e.key === 'Enter') buscarEndereco()
  }}
  onBlur={buscarEndereco}/>
            </div>
            <div className='input-endereco cidade'>
              <label htmlFor="">Cidade:</label>
              <input type="text" id='cidade' name='cidade' required/>
            </div>
            <div className='input-endereco estado'>
              <label htmlFor="estado">Estado:</label>
              <select className='input-endereco select' name="estado" id="estado" required>
  <option value="">Selecione um estado</option>
  <option value="AC">Acre</option>
  <option value="AL">Alagoas</option>
  <option value="AP">Amapá</option>
  <option value="AM">Amazonas</option>
  <option value="BA">Bahia</option>
  <option value="CE">Ceará</option>
  <option value="DF">Distrito Federal</option>
  <option value="ES">Espírito Santo</option>
  <option value="GO">Goiás</option>
  <option value="MA">Maranhão</option>
  <option value="MT">Mato Grosso</option>
  <option value="MS">Mato Grosso do Sul</option>
  <option value="MG">Minas Gerais</option>
  <option value="PA">Pará</option>
  <option value="PB">Paraíba</option>
  <option value="PR">Paraná</option>
  <option value="PE">Pernambuco</option>
  <option value="PI">Piauí</option>
  <option value="RJ">Rio de Janeiro</option>
  <option value="RN">Rio Grande do Norte</option>
  <option value="RS">Rio Grande do Sul</option>
  <option value="RO">Rondônia</option>
  <option value="RR">Roraima</option>
  <option value="SC">Santa Catarina</option>
  <option value="SP">São Paulo</option>
  <option value="SE">Sergipe</option>
  <option value="TO">Tocantins</option>
</select>
            </div>
            <div className='input-endereco pais'>
              <label htmlFor="">País:</label>
              <input type="" id='pais' name='pais' value={"Brasil"} required/>
            </div>
            <div className='input-endereco bairro'>
              <label htmlFor="">Bairro:</label>
              <input type="text" id='bairro' name='bairro' required/>
            </div>
            <div className='input-endereco rua'>
              <label htmlFor="">Rua:</label>
              <input type="text" name='rua' id='rua' required/>
            </div>
            <div className='input-endereco numero'>
              <label htmlFor="">Número: <span style={{ color: 'var(--cor-principal)' }}>*</span></label>
              <input type="number" id='numero' name='numero' required/>
            </div>

          </form>
        </div>
        </div>

        <Footer/>
    </div>
  )
}

export default CreateEventPage