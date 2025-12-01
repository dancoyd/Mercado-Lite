// src/pages/Registro.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './registro.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('❌ Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch('https://mercadolite-api.vercel.app/user/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email,
          alias: email.split('@')[0], // Genera un alias automático
          contraseña: password,       // Backend espera "contraseña"
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('✅ Registro exitoso! Redirigiendo a login...');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        toast.error(`❌ ${data.error || 'Error al registrarse'}`);
      }
    } catch (err) {
      toast.error('❌ Error de conexión con el servidor');
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-box">
        <h2>Registro</h2>

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

      {/* Contenedor de notificaciones */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Registro;