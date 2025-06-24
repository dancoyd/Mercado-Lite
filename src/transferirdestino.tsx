import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './transferirdestino.css';

const TransferirDestino = () => {
  const [monto, setMonto] = useState('');
  const navigate = useNavigate();

  // 🔧 [Backend] En el futuro esta info vendrá de la API o del alias seleccionado
  const destinatarioSimulado = {
    nombre: 'Juan Pérez',
    alias: 'juan.p.billetera'
  };

  const manejarConfirmacion = () => {
    if (!monto || Number(monto) <= 0) {
      alert('Por favor, ingresá un monto válido.');
      return;
    }

    // 🔧 [Backend] Esta función registrará la operación real en la base de datos
    console.log(`Transferencia de $${monto} a ${destinatarioSimulado.alias}`);
    navigate('/confirmacion'); // 🔧 Ruta de éxito (podés implementarla después)
  };

  return (
    <div className="transferir-container">
      <div className="volver-wrapper">
        <Link to="/transferir" className="volver-flecha">←</Link>
      </div>

      <h2 className="transferir-titulo">¿Cuánto querés transferir?</h2>

      <div className="destino-info">
        <p className="nombre-destino">{destinatarioSimulado.nombre}</p>
        <p className="alias-destino">@{destinatarioSimulado.alias}</p>
      </div>

      <input
        type="number"
        className="barra-busqueda"
        placeholder="Ingresá un monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />

      <button className="enviar-btn" onClick={manejarConfirmacion}>
        Confirmar
      </button>
    </div>
  );
};

export default TransferirDestino;