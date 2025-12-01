import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './transferir.css';

interface Contacto {
  alias: string;
}

const Transferir = () => {
  const [input, setInput] = useState('');
  const [ultimosContactos, setUltimosContactos] = useState<Contacto[]>([]);
  const navigate = useNavigate();

  // Cargar últimos contactos desde backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('https://mercadolite-api.vercel.app/historial/historial', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.historial && Array.isArray(data.historial)) {
          // Filtramos solo transferencias enviadas y únicos alias
          const enviados: string[] = [];
          const contactos: Contacto[] = [];

          data.historial.forEach((mov: any) => {
            if (mov.tipo === 'enviada' && !enviados.includes(mov.receptor.alias)) {
              enviados.push(mov.receptor.alias);
              contactos.push({ alias: mov.receptor.alias });
            }
          });

          setUltimosContactos(contactos.slice(0, 5));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const manejarEnvio = (aliasDestino?: string) => {
    const miAlias = localStorage.getItem('alias') || '';
    const destino = aliasDestino || input.trim();

    if (!destino) {
      toast.warning('⚠️ Por favor ingresá un alias.');
      return;
    } else if (destino === miAlias) {
      toast.error('❌ No podés transferirte a vos mismo.');
      return;
    }

    navigate('/transferirdestino', { state: { alias: destino } });
  };

  return (
    <div className="transferir-container">
      <div className="volver-wrapper">
        <Link to="/" className="volver-flecha">←</Link>
      </div>

      <h2 className="transferir-titulo">¿A quién querés transferirle?</h2>

      <input
        type="text"
        placeholder="Alias"
        className="barra-busqueda"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') manejarEnvio(); }}
      />

      <button className="enviar-btn" onClick={() => manejarEnvio()}>Continuar</button>

      {/* Últimos contactos */}
      {ultimosContactos.length > 0 && (
        <div className="recientes-section">
          <h3 className="recientes-subtitulo">Últimos contactos</h3>
          <ul className="lista-contactos">
            {ultimosContactos.map((contacto, index) => (
              <li key={index} className="contacto-item">
                <span
                  className="chip"
                  onClick={() => manejarEnvio(contacto.alias)}
                >
                  @{contacto.alias}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Contenedor de notificaciones */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Transferir;