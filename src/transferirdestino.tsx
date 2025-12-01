import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './transferirdestino.css';

const TransferirDestino = () => {
  const [monto, setMonto] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const alias = location.state?.alias || '';

  useEffect(() => {
    if (!alias) {
      toast.error('❌ No se recibió un alias válido. Volvé a intentar.');
      navigate('/transferir');
    }
  }, [alias, navigate]);

  const manejarConfirmacion = async () => {
    if (!alias) {
      toast.error('❌ No se recibió un alias válido. Volvé a intentar.');
      navigate('/transferir');
      return;
    }

    if (!monto || Number(monto) <= 0) {
      toast.warning('⚠️ Por favor, ingresá un monto válido.');
      setMonto('');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('https://mercadolite-api.vercel.app/user/transferir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          aliasDestino: alias,
          monto: Number(monto),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(`❌ ${data.error || 'Error al transferir'}`);
        setMonto('');
        if (data.error?.toLowerCase().includes('no existe')) {
          navigate('/transferir');
        }
        return;
      }

      const stored = localStorage.getItem('ultimas_transferencias');
      let ultimos = stored ? JSON.parse(stored) : [];
      ultimos = ultimos.filter((c: any) => c.alias !== alias);
      ultimos.unshift({ alias });
      ultimos = ultimos.slice(0, 5);
      localStorage.setItem('ultimas_transferencias', JSON.stringify(ultimos));

      toast.success(`✅ Transferencia de $${monto} a ${alias} realizada con éxito 🎉`);
      navigate('/');
    } catch (err: any) {
      toast.error(`❌ ${err.message}`);
      navigate('/transferir');
    }
  };

  if (!alias) return null;

  return (
    <div className="transferir-container">
      <div className="volver-wrapper">
        <Link to="/transferir" className="volver-flecha">←</Link>
      </div>

      <h2 className="transferir-titulo">¿Cuánto querés transferir?</h2>

      <div className="destino-info">
        <p className="alias-destino">@{alias}</p>
      </div>

      <input
        type="number"
        className="barra-busqueda"
        placeholder="Ingresá un monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />

      <button className="enviar-btn" onClick={manejarConfirmacion}>
        Confirmar y transferir
      </button>

      {/* Contenedor de notificaciones */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default TransferirDestino;