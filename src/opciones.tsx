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
        <li><button className="opcion-btn">Perfil</button></li>
        <li><button className="opcion-btn">Configuración</button></li>
        <li><button className="opcion-btn">Cerrar sesión</button></li>
      </ul>
    </div>
  );
};

export default Opciones;