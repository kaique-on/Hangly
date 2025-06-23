# Hangly – Front-End

![React.js](https://img.shields.io/badge/React.js-2023-blue.svg)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

> Plataforma digital para promover encontros presenciais entre pessoas com interesses em comum, incentivando conexões reais e o bem-estar social.

---

## 📘 Sobre o Projeto

O **Hangly** é um aplicativo web voltado para **reduzir o isolamento social** gerado pelas interações exclusivamente digitais. A proposta é criar uma plataforma segura e intuitiva para **conectar pessoas com afinidades** e promover **encontros presenciais**.

Este repositório contém o **front-end do projeto**, desenvolvido com **React.js**, que se comunica com uma API back-end (Java + Spring Boot), utilizando PostgreSQL via Docker como banco de dados.

---

## 🚀 Funcionalidades Implementadas

- 🔐 Login e cadastro com autenticação JWT
- 📍 Integração com API de CEP e Google Maps
- 🗓️ Criação e visualização de eventos com filtros por localização/interesse
- 👤 Página de perfil com edição de dados e preferências
- 📱 Layout responsivo para mobile e desktop
- 📦 Integração com APIs RESTful

---

## 🛠️ Tecnologias Utilizadas

- [React.js](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- [Google Maps API](https://developers.google.com/maps)
- [Figma (Design)](https://figma.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)

---

## 📁 Estrutura de Diretórios

```
src/
├── assets/         # Imagens e ícones
├── components/     # Componentes reutilizáveis
├── pages/          # Telas principais (Login, Home, Perfil, etc.)
├── services/       # Configuração de Axios
├── routes/         # Arquivo de rotas da aplicação
├── utils/          # Funções auxiliares
└── App.jsx         # Componente principal
```

---

## ⚙️ Como Rodar o Projeto

### ✅ Pré-requisitos

- Node.js v18+
- Yarn ou npm

### ▶️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/hangly-frontend.git
cd hangly-frontend

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

> ⚠️ Certifique-se de que o back-end esteja rodando corretamente e o `.env` esteja configurado.

---

## 📄 Exemplo de `.env`

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_GOOGLE_MAPS_API_KEY=sua_api_key
```

---

## 📊 Resultados Alcançados

- Interfaces funcionais: login, cadastro, home, perfil e criação de eventos
- Integração com backend via Axios
- Filtros e paginação de eventos
- Validação e feedback para formulários
- Experiência de uso adaptada para mobile

---

## 🧩 Próximos Passos

- 💬 Chat e mensagens entre usuários
- 🖼️ Upload de imagens para perfis/eventos
- 🌙 Modo escuro
- ✅ Testes com Jest e Cypress
- 🔐 Segurança aprimorada

---

## 🔐 Segurança

- Tokens armazenados com segurança
- Rotas protegidas por autenticação
- Validações de entrada no front e back-end

---

## 👥 Contribuidores

- Kaique Nascimento de Oliveira  
*(adicione aqui mais nomes, se houver)*

---

## 📜 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais informações.

---

## 📎 Recursos Complementares

- 📘 [Definition of Done (PDF)](https://drive.google.com/file/d/1W-6WSrotUA5AyFWm7u6HjiTsOh2Ct7Ro/view?usp=sharing)
- 🎥 [Demonstração de Testes (vídeo)](https://drive.google.com/file/d/14pFvYVh1jMKuGNQ4R5LeIcosocTpcW5C/view?usp=sharing)
```

---