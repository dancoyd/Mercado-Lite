import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './inicio.css'; // podés crear este archivo o sacarlo si no tenés estilos globales

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);