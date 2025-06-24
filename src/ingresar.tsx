
import React from 'react';
import { Link } from 'react-router-dom';
import './ingresar.css';

const Ingresar = () => {
  return (
    <div className="ingresar-container">
      <div className="volver-wrapper">
        <Link to="/" className="volver-flecha">←</Link>
      </div>

      <h2 className="ingresar-titulo">¿Cómo querés ingresar dinero?</h2>

      <div className="opciones">
        <Link to="/ingresar/transferencia" className="opcion">
          Transferencia bancaria
        </Link>
        <Link to="/ingresar/efectivo" className="opcion">
          Depósito en efectivo
        </Link>
        <Link to="/ingresar/tarjeta" className="opcion">
          Cargar con tarjeta
        </Link>
      </div>
    </div>
  );
};

export default Ingresar;