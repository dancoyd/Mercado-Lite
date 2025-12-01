import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ingresar.css';

const Ingresar = () => {
  const [monto, setMonto] = useState<number | ''>('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarConfirmar = async () => {
    if (monto === '' || monto <= 0) {
      alert('Debe elegir un monto válido mayor a 0');
      setMonto(''); 
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás logueado');
      setMonto(''); 
      return;
    }

    setCargando(true);

    try {
      const res = await fetch('https://mercadolite-api.vercel.app/user/ingresar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ monto }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al ingresar dinero');
      }

      alert(`Se agregaron $${Number(monto).toLocaleString()} a tu cuenta`);
      setMonto(''); 
      navigate('/'); // volver al inicio
    } catch (err) {
      console.error(err);
      alert('Error ingresando dinero');
      setMonto(''); 
    } finally {
      setCargando(false);
    }
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = Number(e.target.value);
    setMonto(valor);
  };

  return (
    <div className="ingresar-container">
      <div className="volver-wrapper">
        <Link to="/" className="volver-flecha">←</Link>
      </div>

      <h2 className="ingresar-titulo">Ingresar dinero</h2>

      <div className="ingresar-form" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        marginTop: '3rem'
      }}>
        <input
          type="number"
          min={1}
          step={1}
          value={monto}
          onChange={manejarCambio}
          placeholder="Monto a ingresar"
          style={{
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid #dcdcdc',
            width: '250px',
            fontSize: '1.2rem',
            textAlign: 'center'
          }}
        />

        <button
          onClick={manejarConfirmar}
          disabled={cargando}
          style={{
            padding: '1rem 2rem',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#2f80ed',
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: cargando ? 'not-allowed' : 'pointer',
            width: '200px'
          }}
        >
          {cargando ? 'Procesando...' : 'Confirmar'}
        </button>
      </div>
    </div>
  );
};

export default Ingresar;