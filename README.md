# Hangly – Front-End

![React.js](https://img.shields.io/badge/React.js-2025-blue.svg)
![Status](https://img.shields.io/badge/status-in%20development-yellow.svg)

> A digital platform designed to promote face-to-face meetings between people with shared interests, encouraging real connections and social well-being.

---

## 📘 About the Project

**Hangly** is a web application focused on **reducing social isolation** caused by purely digital interactions. The goal is to create a safe and intuitive platform to **connect people with similar interests** and promote **in-person gatherings**.

This repository contains the **front-end of the project**, developed with **React.js**, which communicates with a back-end API (Java + Spring Boot), using PostgreSQL via Docker as the database.

To view the project's back-end repository, visit: https://github.com/valadao-davi/HanglyBackend

---

## 🚀 Implemented Features

- 🔐 Login and registration with JWT authentication
- 📍 Integration with the Brazilian ZIP Code API (CEP) and Google Maps
- 🗓️ Event creation and viewing with filters by location/interest
- 👤 Profile page with personal data and preference editing
- 📦 Integration with RESTful APIs

---

## 🛠️ Technologies Used

- [React.js](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- [Google Maps API](https://developers.google.com/maps)
- [Figma (Design)](https://figma.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)

---

## 📁 Project Structure

```
src/
├── assets/              # Images and icons
├── components/          # Reusable UI components
├── contexts/            # Context API (authentication and user)
├── routes/              # Application pages (views)
├── App.jsx              # Main React component
├── App.css              # Global application styles
├── index.js             # React application entry point
└── main.jsx             # DOM rendering entry point
```

---

## ⚙️ How to Run the Project

### ✅ Prerequisites

- Node.js v18+
- Yarn or npm

### ▶️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hangly-frontend.git
cd hangly-frontend

# Install dependencies
npm install

# Run the application
npm run dev
```

> ⚠️ Make sure the back-end is running and the `.env` file is properly configured.

---

## 📄 Example `.env` File

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_GOOGLE_MAPS_API_KEY=your_api_key
```

---

## 🧩 Next Steps

- 💬 User chat and messaging
- 🖼️ Image upload for profiles/events
- 🌙 Dark mode support
- ✅ Unit and e2e testing with Jest and Cypress
- 🔐 Enhanced security features
- Improved mobile experience

---

## 🔐 Security

- Secure token storage
- Route protection via authentication
- Front-end and back-end input validations

---

## 👥 Contributors

- Davi Silva Valadão  
- Kaique Nascimento de Oliveira  

---

## 📎 Additional Resources

- 📘 [Definition of Done (PDF)](https://drive.google.com/file/d/1W-6WSrotUA5AyFWm7u6HjiTsOh2Ct7Ro/view?usp=sharing)  
- 🎥 [Test Demonstration (Video)](https://drive.google.com/file/d/14pFvYVh1jMKuGNQ4R5LeIcosocTpcW5C/view?usp=sharing)