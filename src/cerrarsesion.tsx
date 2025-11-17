import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './cerrarsesion.css';

const Cerrarsesion = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="cerrarsesion-container">
      <div className="volver-wrapper">
        <Link to="/opciones" className="volver-flecha">←</Link>
      </div>

      <h2 className="cerrarsesion-titulo">¿Querés cerrar sesión?</h2>

      <p className="cerrarsesion-mensaje">Esto te desconectará de tu cuenta en este dispositivo.</p>

      <div className="cerrarsesion-botones">
        <button className="cerrar-btn" onClick={handleLogout}>Sí, cerrar sesión</button>
        <Link to="/opciones" className="cancelar-btn">Cancelar</Link>
      </div>
    </div>
  );
};

export default Cerrarsesion;