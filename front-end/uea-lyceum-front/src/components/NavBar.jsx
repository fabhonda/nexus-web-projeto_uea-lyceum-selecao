import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '/img/uea_logo_horizontal_verde.png';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/landing">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink
                to="/aluno"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Carteirinha Universitária
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ru"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Cardápio do RU
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/biblioteca"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Biblioteca
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pesquisa-extensao"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Pesquisa/Extensão
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Login
            </NavLink>
          </li>
        )
        }
      </ul>
    </nav>
  );
};

export default Navbar;