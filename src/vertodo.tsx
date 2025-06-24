import React from 'react';
import { Link } from 'react-router-dom';
import './vertodo.css';

const Vertodo = () => {
  const movimientos = [
    { descripcion: 'Transferencia a Ana López', monto: -2500, fecha: '24/06/2025' },
    { descripcion: 'Ingreso con tarjeta', monto: 10000, fecha: '23/06/2025' },
    { descripcion: 'Pago en MercadoLibre', monto: -3200, fecha: '22/06/2025' },
    { descripcion: 'Recarga desde cuenta', monto: 5000, fecha: '21/06/2025' },
  ];

  return (
    <div className="vertodo-container">
      <div className="volver-wrapper">
        <Link to="/" className="volver-flecha">←</Link>
      </div>

      <h2 className="vertodo-titulo">Todos los movimientos</h2>

      <ul className="movimientos-lista">
        {movimientos.map((item, index) => (
          <li key={index} className={`mov-item ${item.monto < 0 ? 'egreso' : 'ingreso'}`}>
            <div className="mov-descripcion">{item.descripcion}</div>
            <div className="mov-datos">
              <span className="mov-monto">{item.monto < 0 ? '-' : '+'}${Math.abs(item.monto).toLocaleString()}</span>
              <span className="mov-fecha">{item.fecha}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vertodo;