// src/pages/Home.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // 👈 Agregás esto
import './inicio.css';
import { FaArrowDown, FaArrowUp, FaCreditCard, FaExchangeAlt, FaEye } from 'react-icons/fa';

const Inicio = () => {
  const [saldo, setSaldo] = useState<number | null>(null);
  const [movimientos, setMovimientos] = useState<string[]>([]);
  const [usuario, setUsuario] = useState({
    nombre: 'Juan Pérez',
    alias: 'juan.p.billetera'
  });

  useEffect(() => {
    // Simulación: estos valores eventualmente vendrán del backend
    setSaldo(25000); // ejemplo
    setMovimientos(['Pago en MercadoLibre', 'Transferencia recibida', 'Recarga desde tarjeta']);
  }, []);

  return (
    <div className="inicio-container">
       <header className="top-header">
        <div className="user-info">
          <span className="nombre">{usuario.nombre}</span>
          <span className="alias">@{usuario.alias}</span>
        </div>
<Link to="/opciones" className="menu-btn">
  ☰ Menú
</Link>      </header>



      <section className="saldo-section">
        <p>Saldo disponible</p>
        <h1>{saldo !== null ? `$${saldo.toLocaleString()}` : 'Cargando...'}</h1>
      </section>
 <section className="acciones-footer">
  <Link to="/ingresar" className="accion-btn ingresar">
    <FaArrowDown style={{ marginRight: '0.5rem' }} />
    Ingresar
  </Link>
  <Link to="/transferir" className="accion-btn transferir">
    <FaExchangeAlt style={{ marginRight: '0.5rem' }} />
    Transferir
  </Link>
  <Link to="/tucvu" className="accion-btn cvu">
    <FaCreditCard style={{ marginRight: '0.5rem' }} />
    Tu CVU
  </Link>
</section>

      <section className="movimientos-section">
        <div className="mov-header">
          <h3>Últimos movimientos</h3>
<Link to="/Vertodo" className="ver-todos">
  <FaEye style={{ marginRight: '0.5rem' }} />
  Ver todos
</Link>        </div>
        <ul>
          {movimientos.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

     
    </div>
  );
};

export default Inicio;