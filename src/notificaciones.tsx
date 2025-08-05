import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./notificaciones.css";

const Notificaciones = () => {
  const [activadas, setActivadas] = useState(true);
  const [transferencias, setTransferencias] = useState(true);
  const [promos, setPromos] = useState(false);

  useEffect(() => {
    if (!activadas) {
      setTransferencias(false);
      setPromos(false);
    }
  }, [activadas]);

  return (
    <div className="notificaciones-container">
      <div className="volver-wrapper">
        <Link to="/configuracion" className="volver-flecha">←</Link>
      </div>

      <h2 className="notificaciones-titulo">Notificaciones</h2>

      <div className="notificaciones-lista">
        <label className="noti-item">
          <input
            type="checkbox"
            checked={activadas}
            onChange={() => setActivadas(!activadas)}
          />
          Activar notificaciones generales
        </label>

        <label className="noti-item">
          <input
            type="checkbox"
            checked={transferencias}
            onChange={() => setTransferencias(!transferencias)}
            disabled={!activadas}
          />
          Avisos por transferencias
        </label>

        <label className="noti-item">
          <input
            type="checkbox"
            checked={promos}
            onChange={() => setPromos(!promos)}
            disabled={!activadas}
          />
          Recibir promociones y novedades
        </label>
      </div>
    </div>
  );
};

export default Notificaciones;