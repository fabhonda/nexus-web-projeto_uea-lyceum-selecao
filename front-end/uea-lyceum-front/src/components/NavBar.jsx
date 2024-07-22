import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '/img/uea_logo_horizontal_verde.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica de logout (limpar tokens, etc.)
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/landing"> {/* Envolve a logo em um Link */}
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <ul>
        {/* Remove o item de lista para Home */}
        <li><Link to="/aluno">Aluno</Link></li>
        <li><Link to="/ru">RU</Link></li>
        <li><Link to="/biblioteca">Biblioteca</Link></li>
        <li><Link to="/pesquisa-extensao">Pesquisa/Extensão</Link></li>
        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;