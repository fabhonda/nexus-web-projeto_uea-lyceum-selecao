// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import LandingPage from './components/LandingPage';
// import Navbar from './components/NavBar';
// import Aluno from './components/Aluno';
// import RU from './components/RU';
// import Biblioteca from './components/Biblioteca';
// import PesquisaExtensao from './components/PesquisaExtensao';
// import Cadastro from './components/Cadastro';

// const PrivateRoute = ({ element }) => {
//   const isLoggedIn = !!localStorage.getItem('userEmail');
//   return isLoggedIn ? element : <Navigate to="/login" />;
// };

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/cadastro" element={<Cadastro />} />
//         <Route path="/landing" element={<LandingPage />} />
//         <Route path="/aluno" element={<PrivateRoute element={<Aluno />} />} />
//         <Route path="/ru" element={<PrivateRoute element={<RU />} />} />
//         <Route path="/biblioteca" element={<PrivateRoute element={<Biblioteca />} />} />
//         <Route path="/pesquisa-extensao" element={<PrivateRoute element={<PesquisaExtensao />} />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;