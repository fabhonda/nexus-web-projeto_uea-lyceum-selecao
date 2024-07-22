// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Navbar from './components/NavBar';

// // Componentes futuros (crie os arquivos .jsx correspondentes)
 import Aluno from './components/Aluno';
// import RU from './components/RU';
// import Biblioteca from './components/Biblioteca';
// import PesquisaExtensao from './components/PesquisaExtensao';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<LandingPage />} />
        /* <Route path="/aluno" element={<Aluno />} />
        {/* // <Route path="/ru" element={<RU />} />
        // <Route path="/biblioteca" element={<Biblioteca />} />
        // <Route path="/pesquisa-extensao" element={<PesquisaExtensao />} /> */}
      </Routes>
    </Router>
  );
};

export default App;