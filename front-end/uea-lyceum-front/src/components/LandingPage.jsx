import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import exampleImage from '../../img/8550547.jpg';
import exampleImage2 from '../../img/7618724.jpg'; 
import exampleImage3 from '../../img/carteira.png'; 
import exampleImage4 from '../../img/livros.png'; 
import exampleImage5 from '../../img/3515462.jpg'; 

const LandingPage = () => {
  const isLoggedIn = !!localStorage.getItem('userEmail');

  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <section className="section">
          <div className="text-container">
            <header className="header">
              <h1>Bem-vindo(a) ao Lyceum 2.0 da UEA!</h1>
              <h2 className="h2-text">Descubra um mundo de facilidades e informações na ponta dos seus dedos!
                Acesse suas disciplinas matriculadas, carteirinha universitária, lista de refeições do Restaurante Universitário (RU),
                livros da biblioteca, lista de projetos e muito mais, em um só lugar!</h2>
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
        </section>
        <section className="section">
          <div className="image-container">
            <img src={exampleImage3} alt="Example" className="landing-image" />
          </div>
          <div className="text-container">
            <header className="header">
              <h1>Acesso rápido e fácil à sua carteirinha digital</h1>
              <h2 className="h2-text">Perdeu sua carteirinha do Restaurante Universitário (RU) ou ainda não recebeu a versão física? Sem problemas!
                Aqui você pode visualizar e usar a versão digital da sua carteirinha diretamente no site ou baixá-la para usar sempre que precisar.
              </h2>
            </header>
          </div>
        </section>
        <section className="section">
          <div className="text-container">
            <header className="header">
              <h1>Confira a lista de refeições do RU</h1>
              <h2 className="h2-text">Fique por dentro do cardápio do RU em todas as unidades! Acesse facilmente a lista de refeições diárias
                - café da manhã, almoço e jantar. Saiba o que será servido e planeje suas refeições com antecedência,
                garantindo uma alimentação balanceada e conveniente durante sua jornada acadêmica.
              </h2>
            </header>
          </div>
          <div className="image-container">
            <img src={exampleImage} alt="Example" className="landing-image" width="500" height="auto" />
          </div>
        </section>
        <section className="section">
          <div className="image-container">
            <img src={exampleImage4} alt="Example" className="landing-image" />
          </div>
          <div className="text-container">
            <header className="header">
              <h1>Explore os livros disponíveis na biblioteca</h1>
              <h2 className="h2-text">Acesse facilmente o catálogo de livros disponíveis na biblioteca física.
                Verifique a disponibilidade e planeje suas leituras para aproveitar ao máximo os recursos oferecidos.
              </h2>
            </header>
          </div>
        </section>
        <section className="section">
          <div className="text-container">
            <header className="header">
              <h1>Gerencie seus projetos e gere relatórios</h1>
              <h2 className="h2-text">Gerencie seus projetos de forma simples e eficiente: cadastre, edite e exclua projetos,
                visualize gráficos interativos sobre seus projetos realizados por ano e gere um relatório PDF com apenas um clique!
                Nossa ferramenta facilita a inclusão dessas experiências no seu currículo e a obtenção de horas complementares na universidade!
              </h2>
            </header>
          </div>
          <div className="image-container">
            <img src={exampleImage5} alt="Example" className="landing-image" width="500" height="auto" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;