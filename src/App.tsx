import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Inicio from './inicio';
import Ingresar from './ingresar';
import Transferir from './transferir';
import Sacar from './sacar';
import Tucvu from './tucvu';
import Vertodo from './vertodo';
import Opciones from './opciones';
import TransferirDestino from './transferirdestino';
import Perfil from './perfil';
import Configuracion from './configuracion';
import Contrasena from './contrasena';
import Cerrarsesion from './cerrarsesion';
import Notificaciones from './notificaciones';








function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/ingresar" element={<Ingresar />} />
        <Route path="/transferir" element={<Transferir />} />
        <Route path="/sacar" element={<Sacar />} />
        <Route path="/tucvu" element={<Tucvu />} />
        <Route path="/vertodo" element={< Vertodo />} />
        <Route path="/opciones" element={<Opciones />} />
        <Route path="/transferirdestino" element={<TransferirDestino />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/contrasena" element={<Contrasena />} />
        <Route path="/cerrarsesion" element={<Cerrarsesion />} />
        <Route path="/notificaciones" element={<Notificaciones />} />


      </Routes>
    </Router>
  );
}

export default App;