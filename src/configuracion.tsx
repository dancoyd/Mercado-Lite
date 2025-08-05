import React from 'react';
import { Link } from 'react-router-dom';
import './configuracion.css';

const Configuracion = () => {
  return (
    <div className="configuracion-container">
      <div className="volver-wrapper">
        <Link to="/opciones" className="volver-flecha">←</Link>
      </div>

      <h2 className="configuracion-titulo">Configuración</h2>

      <ul className="configuracion-lista">
        <Link to="/contrasena" className="config-btn">Contrasena</Link>
        <Link to="/notificaciones" className="config-btn">Notificaciones</Link>
        <li><button className="config-btn">Tema</button></li>
      </ul>
    </div>
  );
};

export default Configuracion;