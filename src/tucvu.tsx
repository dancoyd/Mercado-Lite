import React from 'react';
import { Link } from 'react-router-dom';
import './tucvu.css';

const Cvu = () => {
  const cvu = '0000003100001234567890';
  const alias = 'dan.billetera.virtual';

  const copiarTexto = (texto: string) => {
    navigator.clipboard.writeText(texto);
    alert('¡Copiado al portapapeles!');
  };

  return (
    <div className="cvu-container">
      <div className="volver-wrapper">
        <Link to="/" className="volver-flecha">←</Link>
      </div>

      <h2 className="cvu-titulo">Tu CVU y alias</h2>

      <div className="cvu-info">
        <div className="dato-cvu">
          <label>CVU</label>
          <div className="fila">
            <span className="texto">{cvu}</span>
            <button onClick={() => copiarTexto(cvu)} className="copiar-btn">Copiar</button>
          </div>
        </div>

        <div className="dato-cvu">
          <label>Alias</label>
          <div className="fila">
            <span className="texto">{alias}</span>
            <button onClick={() => copiarTexto(alias)} className="copiar-btn">Copiar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cvu;