// src/pages/login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('https://mercadolite-api.vercel.app/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contraseña }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        toast.success('✅ Sesión iniciada correctamente 🎉');
        navigate('/');
      } else {
        toast.error(`❌ ${data.error || 'Usuario o contraseña incorrectos'}`);
      }
    } catch (err) {
      toast.error('❌ Error de conexión con el servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleLogin}>
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
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Ingresar</button>
        </form>

        <div className="login-footer">
          <p>¿No tenés cuenta? <Link to="/registro">Registrarse</Link></p>
        </div>
      </div>

      {/* Contenedor de notificaciones */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Login;