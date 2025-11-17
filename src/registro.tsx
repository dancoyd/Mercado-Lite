// src/pages/Registro.tsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './registro.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/user/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email,
          alias: email.split('@')[0], // Genera un alias automático
          contraseña: password,       // Cambiado a "contraseña" para el backend
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Registro exitoso! Redirigiendo a login...');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(data.error || 'Error al registrarse');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-box">
        <h2>Registro</h2>

        {error && <div className="registro-error">{error}</div>}
        {success && <div className="registro-success">{success}</div>}

        <form onSubmit={handleRegistro}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="registro-btn">
            Registrarse
          </button>
        </form>

        <div className="registro-footer">
          <p>¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Registro;