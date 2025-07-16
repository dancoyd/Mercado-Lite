import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './contrasena.css';

const Contrasena = () => {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmacion, setConfirmacion] = useState('');

  const handleSubmit = () => {
    if (!actual || !nueva || !confirmacion) {
      alert('Por favor completá todos los campos.');
    } else if (nueva !== confirmacion) {
      alert('Las contraseñas nuevas no coinciden.');
    } else {
      alert('✅ Contraseña actualizada (simulado).');
      // 🔧 Aquí podrías hacer la llamada real a tu backend.
    }
  };

  return (
    <div className="contrasena-container">
      <div className="volver-wrapper">
        <Link to="/configuracion" className="volver-flecha">←</Link>
      </div>

      <h2 className="contrasena-titulo">Cambiar contraseña</h2>

      <div className="contrasena-formulario">
        <label>Contraseña actual</label>
        <input
          type="password"
          value={actual}
          onChange={(e) => setActual(e.target.value)}
          placeholder="••••••••"
        />

        <label>Nueva contraseña</label>
        <input
          type="password"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          placeholder="••••••••"
        />

        <label>Confirmar nueva contraseña</label>
        <input
          type="password"
          value={confirmacion}
          onChange={(e) => setConfirmacion(e.target.value)}
          placeholder="••••••••"
        />

        <button className="guardar-btn" onClick={handleSubmit}>
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default Contrasena;