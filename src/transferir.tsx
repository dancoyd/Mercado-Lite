import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './transferir.css';

const Transferir = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  // 🔧 [Simulación] Lista local de contactos.
  const contactosRecientes = [
    { nombre: 'Ana López', alias: 'ana.lopez.billetera' },
    { nombre: 'Martín Gómez', alias: 'martin.g.billetera' },
    { nombre: 'Carla Fernández', alias: 'carla.fz.billetera' }
  ];

  // 🔧 [Backend] Esta función será reemplazada por una llamada real a la API.
  const manejarEnvio = () => {
    // 🔧 [Simulación desactivada] Esto será reemplazado por validación real:
    // const destino = contactosRecientes.find(c => c.alias === input.trim());
    // if (destino) {
    //   navigate(`/transferir/${destino.alias}`);
    // } else {
    //   alert('No se encontró el usuario.');
    // }

    // ✅ Mientras tanto: ruta directa
    navigate('/transferirdestino');
  };

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
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') manejarEnvio();
        }}
      />

      <button className="enviar-btn" onClick={manejarEnvio}>
        Continuar
      </button>

      <div className="recientes-section">
        <h3 className="recientes-subtitulo">Recientes</h3>
        <ul className="lista-contactos">
          {contactosRecientes.map((contacto, index) => (
            <li key={index} className="contacto-item">
              {/* 🔧 [Futuro] Reemplazar por ruta dinámica: `/transferir/${contacto.alias}` */}
              <Link to="/transferirdestino" className="contacto-link">
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