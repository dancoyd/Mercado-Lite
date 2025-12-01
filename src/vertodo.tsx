import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './vertodo.css';

interface Movimiento {
  descripcion: string;
  monto: number;
  fecha: string;
}

const Vertodo = () => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const fetchHistorial = async () => {
      try {
        const res = await fetch('https://mercadolite-api.vercel.app/historial/historial', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Error al obtener historial');

        const data = await res.json();

        // Mapear a formato requerido (solo fecha)
        const historialFormateado = data.historial
          .sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
          .map((h: any) => {
            const fecha = new Date(h.fecha);
            const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${
              (fecha.getMonth() + 1).toString().padStart(2, '0')
            }/${fecha.getFullYear()}`;

            if (h.tipo === 'enviada') {
              return {
                descripcion: `Transferencia hecha a "${h.receptor.alias}"`,
                monto: -h.monto,
                fecha: fechaFormateada
              };
            } else {
              return {
                descripcion: `Transferencia recibida de "${h.emisor.alias}"`,
                monto: h.monto,
                fecha: fechaFormateada
              };
            }
          });

        setMovimientos(historialFormateado);
      } catch (err) {
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    fetchHistorial();
  }, []);

  if (cargando) return <div>Cargando...</div>;

  return (
    <div className="vertodo-container">
      <div className="volver-wrapper">
        <Link to="/" className="volver-flecha">←</Link>
      </div>

      <h2 className="vertodo-titulo">Todos los movimientos</h2>

      <ul className="movimientos-lista">
        {movimientos.length > 0 ? (
          movimientos.map((item, index) => (
            <li key={index} className={`mov-item ${item.monto < 0 ? 'egreso' : 'ingreso'}`}>
              <div className="mov-descripcion">{item.descripcion}</div>
              <div className="mov-datos">
                <span className="mov-monto">
                  {item.monto < 0 ? '-' : '+'}${Math.abs(item.monto).toLocaleString()}
                </span>
                <span className="mov-fecha">{item.fecha}</span>
              </div>
            </li>
          ))
        ) : (
          <li>No hay movimientos</li>
        )}
      </ul>
    </div>
  );
};

export default Vertodo;
