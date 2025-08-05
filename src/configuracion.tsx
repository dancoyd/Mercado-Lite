import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiBell, FiSun } from 'react-icons/fi';
import './configuracion.css';

const Configuracion = () => {
  return (
    <div className="configuracion-container">
      <div className="volver-wrapper">
        <Link to="/opciones" className="volver-flecha">
          <FiArrowLeft className="icono-volver" />
        </Link>
      </div>

      <h2 className="configuracion-titulo">Configuración</h2>

      <ul className="configuracion-lista">
        <li>
          <Link to="/contrasena" className="config-btn">
            <FiLock className="config-icon" />
            Contraseña
          </Link>
        </li>
        <li>
          <Link to="/notificaciones" className="config-btn">
            <FiBell className="config-icon" />
            Notificaciones
          </Link>
        </li>
        <li>
          <button className="config-btn">
            <FiSun className="config-icon" />
            Tema
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Configuracion;