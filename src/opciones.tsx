import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './opciones.css';

const Opciones = () => {
  return (
    <div className="opciones-container">
      <div className="volver-wrapper">
        <Link to="/" className="volver-flecha">←</Link>
      </div>

      <h2 className="opciones-titulo">Menú</h2>

      <ul className="opciones-lista">
        <li>
          <Link to="/perfil" className="opcion-btn">
            <FaUser className="opcion-icono" /> Perfil
          </Link>
        </li>
        <li>
          <Link to="/configuracion" className="opcion-btn">
            <FaCog className="opcion-icono" /> Configuración
          </Link>
        </li>
        <li>
          <Link to="/cerrarsesion" className="opcion-btn">
            <FaSignOutAlt className="opcion-icono" />  Cerrar sesión
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Opciones;