import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './contrasena.css';

const Contrasena = () => {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const navigate = useNavigate();

  const limpiarTodo = () => {
    setActual('');
    setNueva('');
    setConfirmacion('');
  };

  const handleSubmit = async () => {
    if (!actual || !nueva || !confirmacion) {
      alert('Por favor completá todos los campos.');
      limpiarTodo();
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay sesión activa. Iniciá sesión nuevamente.');
      limpiarTodo();
      navigate('/');
      return;
    }

    try {
      if (nueva === actual) {
        alert('La nueva contraseña no puede ser igual a la anterior.');
        limpiarTodo();
        return;
      }

      if (nueva !== confirmacion) {
        alert('Las contraseñas nuevas no coinciden.');
        limpiarTodo();
        return;
      }

      const respuesta = await fetch('https://mercadolite-api.vercel.app/user/cambiar-contrasena', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contraseñaActual: actual,
          contraseñaNueva: nueva
        })
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        alert(data.error || 'Contraseña actual incorrecta.');
        limpiarTodo();
        return;
      }

      alert('Contraseña cambiada correctamente 🎉');
      limpiarTodo();
      navigate('/configuracion');
      
    } catch (error) {
      alert('Error en el servidor. Intentá de nuevo más tarde.');
      limpiarTodo();
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