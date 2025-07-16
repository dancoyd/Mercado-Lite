import React from 'react';
import { Link } from 'react-router-dom';
import './opciones.css';

const Opciones = () => {
  return (
    <div className="opciones-container">
      <div className="volver-wrapper">
        <Link to="/" className="volver-flecha">←</Link>
      </div>

      <h2 className="opciones-titulo">Opciones</h2>

      <ul className="opciones-lista">
          <Link to="/perfil" className="opcion-btn">Perfil</Link>
          <Link to="/configuracion" className="opcion-btn">Configuracion</Link>
        <li><button className="opcion-btn">Cerrar sesión</button></li>
      </ul>
    </div>
  );
};

export default Opciones;