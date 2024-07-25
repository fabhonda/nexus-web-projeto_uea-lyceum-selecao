import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import exampleImage from '../../img/3515462.jpg';
import exampleImage2 from '../../img/7618724.jpg'; 

const LandingPage = () => {
  const isLoggedIn = !!localStorage.getItem('userEmail');

  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <div className="section">
          <div className="text-container">
            <header className="header">
              <h1>Bem-vindo(a) ao Lyceum 2.0 da UEA!</h1>
              <h2 className="h2-text">Aqui você tem acesso às disciplinas matriculadas, carteirinha universitária,
              lista de refeições do do Restaurante Universitário (RU), livros da biblioteca, lista de projetos e muito mais!</h2>
            </header>
            {!isLoggedIn && (
              <div className="buttons-container">
                <Link to="/login">
                  <button className="landing-button-login">Entrar</button>
                </Link>
                <Link to="/cadastro">
                  <button className="landing-button-signup">Ainda não possuo cadastro</button>
                </Link>
              </div>
            )}
          </div>
          <div className="image-container">
            <img src={exampleImage2} alt="Example" className="landing-image" />
          </div>
        </div>
        <div className="section">
          <div className="image-container">
          <img src={exampleImage} alt="Example" className="landing-image" width="500" height="auto" />
          </div>
          <div className="text-container">
            <header className="header">
              <h1> Relatórios em PDF sobre suas atividades!</h1>
              <h2 className="h2-text"> Em um único clique, você consegue gerar um PDF com todos
                os seus projetos participados, facilitando na emissão das
                horas complementares!
              </h2>
            </header>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;