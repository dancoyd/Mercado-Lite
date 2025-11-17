import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './tucvu.css';

const Tucvu = () => {
  const [cvu, setCvu] = useState('Cargando...');
  const [alias, setAlias] = useState('Cargando...');

  const copiarTexto = (texto: string) => {
    navigator.clipboard.writeText(texto);
    alert('¡Copiado al portapapeles!');
  };

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No hay token guardado');
          return;
        }

        const res = await fetch('http://localhost:3000/user/saldo', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error('Error en fetch:', res.status, res.statusText);
          return;
        }

        const data = await res.json();
        console.log('Datos saldo:', data);

        setCvu(data.cbu || 'No disponible');
        setAlias(data.alias || 'No disponible');
      } catch (err) {
        console.error('Error al cargar CVU y alias:', err);
      }
    };

    fetchSaldo();
  }, []);

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

export default Tucvu;