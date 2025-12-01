import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowDown, FaCreditCard, FaExchangeAlt, FaEye } from 'react-icons/fa';
import './inicio.css';

interface Usuario {
  nombre: string;
}

const Inicio = () => {
  const [saldo, setSaldo] = useState<number | null>(null);
  const [movimientos, setMovimientos] = useState<string[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const fetchDatosUsuario = async () => {
      try {
        // Obtener saldo y datos del usuario
        const resSaldo = await fetch('https://mercadolite-api.vercel.app/user/saldo', {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        if (!resSaldo.ok) throw new Error('Error al obtener datos del usuario');

        const dataSaldo = await resSaldo.json();
        setUsuario({ nombre: dataSaldo.nombre });
        setSaldo(Number(dataSaldo.saldo)); // forzar a número

        // Obtener historial de transferencias
        const resHist = await fetch('https://mercadolite-api.vercel.app/historial/historial', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!resHist.ok) throw new Error('Error al obtener historial');

        const dataHist = await resHist.json();

        // Tomar las últimas 5 transferencias y mapear a texto
        const ultimas5 = dataHist.historial
          .sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
          .slice(0, 5)
          .map((h: any) => {
            if (h.tipo === 'enviada') {
              return `Transferencia hecha a "${h.receptor.alias}"`;
            } else {
              return `Transferencia recibida de "${h.emisor.alias}"`;
            }
          });

        setMovimientos(ultimas5);

      } catch (err) {
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    fetchDatosUsuario();
  }, []);

  if (cargando) return <div>Cargando...</div>;

  return (
    <div className="inicio-container">
      <header className="top-header">
        {usuario ? (
          <div className="user-info">
            <span className="nombre">{usuario.nombre}</span>
          </div>
        ) : (
          <div className="no-session-menu">
            <div className="menu-container">
              <h1>MercadoLite</h1>
              <p>Bienvenido a tu plataforma de transferencias segura y rápida.</p>
              <Link to="/login" className="accion-btn iniciar-sesion">
                Iniciar sesión
              </Link>
              <Link to="/registro" className="accion-btn registrarse">
                Registrarse
              </Link>
            </div>
          </div>
        )}

        {usuario && <Link to="/opciones" className="menu-btn">☰ Menú</Link>}
      </header>

      {usuario && (
        <>
          <section className="saldo-section">
            <p>Saldo disponible</p>
            <h1>
              {saldo !== null
                ? `$${Number(saldo).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : 'Cargando...'}
            </h1>
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
              <Link to="/vertodo" className="ver-todos">
                <FaEye style={{ marginRight: '0.5rem' }} />
                Ver todos
              </Link>
            </div>
            <ul>
              {movimientos.length > 0 ? (
                movimientos.map((item, index) => <li key={index}>{item}</li>)
              ) : (
                <li>No hay movimientos</li>
              )}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default Inicio;