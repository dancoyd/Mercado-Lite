import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './perfil.css';

const Perfil = () => {
  const [nombre, setNombre] = useState('Dan');
  const [apellido, setApellido] = useState('ApellidoEjemplo');
  const [email, setEmail] = useState('dan@ejemplo.com');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);

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
          src={avatar || 'https://via.placeholder.com/120'}
          alt="Foto de perfil"
          className="perfil-avatar"
        />
        {modoEdicion && (
          <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
        )}
      </div>

      <button className="editar-btn" onClick={toggleModoEdicion}>
        {modoEdicion ? 'Guardar' : '✏️'}
      </button>

      <div className="perfil-datos">
        <div className="perfil-dato">
          <label>Nombre</label>
          {modoEdicion ? (
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          ) : (
            <span>{nombre}</span>
          )}
        </div>

        <div className="perfil-dato">
          <label>Apellido</label>
          {modoEdicion ? (
            <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          ) : (
            <span>{apellido}</span>
          )}
        </div>

        <div className="perfil-dato">
          <label>Email</label>
          {modoEdicion ? (
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          ) : (
            <span>{email}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;