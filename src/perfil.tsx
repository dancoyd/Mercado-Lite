import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './perfil.css';

import defaultAvatar from '../src/assets/avatar-default.png';

const Perfil = () => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No hay token guardado');
          return;
        }

        const res = await fetch('https://mercadolite-api.vercel.app/user/saldo', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error('Error en fetch:', res.status, res.statusText);
          return;
        }

        const data = await res.json();
        console.log('Perfil fetch data:', data);

        setNombreCompleto(data.nombre || '');
        setEmail(data.email || '');
      } catch (err) {
        console.error('Error al cargar perfil:', err);
      }
    };

    fetchPerfil();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const toggleModoEdicion = () => setModoEdicion(prev => !prev);

  return (
    <div className="perfil-container">
      <div className="volver-wrapper">
        <Link to="/opciones" className="volver-flecha">←</Link>
      </div>

      <h2 className="perfil-titulo">Tu perfil</h2>

      <div className="perfil-avatar-wrapper">
        <img
          src={avatar}
          alt="Foto de perfil"
          className="perfil-avatar"
        />
        {modoEdicion && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        )}
      </div>

      <button className="editar-btn" onClick={toggleModoEdicion}>
        {modoEdicion ? 'Guardar' : '✏️'}
      </button>

      <div className="perfil-datos">
        <div className="perfil-dato">
          <label>Nombre completo</label>
          {modoEdicion ? (
            <input
              type="text"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
            />
          ) : (
            <span>{nombreCompleto || 'Cargando...'}</span>
          )}
        </div>

        <div className="perfil-dato">
          <label>Email</label>
          {modoEdicion ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <span>{email || 'Cargando...'}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
