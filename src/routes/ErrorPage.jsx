import React from 'react'
import { Link } from 'react-router-dom';
import './ErrorPage.css'

const ErrorPage = () => {
  return (
    <div className='error-body'>
      <div className='frase-erro'>
          <h1>Erro 404</h1>
          <div>Ocorreu um erro ao tentar acessar essa página. Ela pode não existir ou estar temporáriamente desabilitada.</div>
      </div>
      <Link to={'/'} className='pagina-principal'><h4>Voltar para página principal</h4></Link>
    </div>
  )
}

export default ErrorPage