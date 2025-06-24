import React from 'react';
import { Link } from 'react-router-dom';
import './transferir.css';

const Transferir = () => {
  const contactosRecientes = [
    { nombre: 'Ana López', alias: 'ana.lopez.billetera' },
    { nombre: 'Martín Gómez', alias: 'martin.g.billetera' },
    { nombre: 'Carla Fernández', alias: 'carla.fz.billetera' }
  ];

  return (
    <div className="transferir-container">
      <div className="volver-wrapper">
        <Link to="/" className="volver-flecha">←</Link>
      </div>

      <h2 className="transferir-titulo">¿A quién querés transferirle?</h2>
      <input
  type="text"
  placeholder="Alias, CVU, celular o nombre"
  className="barra-busqueda"
/>

      <div className="recientes-section">
        <h3 className="recientes-subtitulo">Recientes</h3>
        <ul className="lista-contactos">
          {contactosRecientes.map((contacto, index) => (
            <li key={index} className="contacto-item">
              <Link to={`/transferir/${contacto.alias}`} className="contacto-link">
                <span className="nombre-contacto">{contacto.nombre}</span>
                <span className="alias-contacto">@{contacto.alias}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Transferir;