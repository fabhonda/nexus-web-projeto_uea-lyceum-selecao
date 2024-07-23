import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import exampleImage from '../../img/est-uea_foto-divulgacao.jpeg'; // Caminho relativo correto para a imagem
import exampleImage2 from '../../img/7618724.jpg';

const LandingPage = () => {
  const isLoggedIn = !!localStorage.getItem('userEmail');

  return (
    <div className="landing-page-content">
      <div className="section">
        <div className="text-container">
          <header className="header">
            <h1>Bem-vindo(a) ao protótipo de releitura do Lyceum 2.0 da UEA!</h1>
          </header>
          {!isLoggedIn && (
            <div className="buttons-container">
              <Link to="/login">
                <button className="landing-button">Login</button>
              </Link>
              <Link to="/cadastro">
                <button className="landing-button">Cadastro</button>
              </Link>
            </div>
          )}
        </div>
        <div className="image-container">
          <img src={exampleImage} alt="Example" className="landing-image" />
        </div>
      </div>
      <div className="section">
        <div className="image-container">
          <img src={exampleImage2} alt="Example" className="landing-image" />
        </div>
        <div className="text-container">
          <header className="header">
            <h1>Texto inverso para a segunda seção</h1>
          </header>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;