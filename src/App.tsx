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
import Login from './login';
import Registro from './registro';
import ProtectedRoute from './ProtectedRoute';









function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
         <Route path="/ingresar" element={<ProtectedRoute><Ingresar /></ProtectedRoute>} />
        <Route path="/transferir" element={<ProtectedRoute><Transferir /></ProtectedRoute>} />
        <Route path="/sacar" element={<ProtectedRoute><Sacar /></ProtectedRoute>} />
        <Route path="/tucvu" element={<ProtectedRoute><Tucvu /></ProtectedRoute>} />
        <Route path="/vertodo" element={<ProtectedRoute><Vertodo /></ProtectedRoute>} />
        <Route path="/opciones" element={<ProtectedRoute><Opciones /></ProtectedRoute>} />
        <Route path="/transferirdestino" element={<ProtectedRoute><TransferirDestino /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path="/configuracion" element={<ProtectedRoute><Configuracion /></ProtectedRoute>} />
        <Route path="/contrasena" element={<ProtectedRoute><Contrasena /></ProtectedRoute>} />
        <Route path="/cerrarsesion" element={<ProtectedRoute><Cerrarsesion /></ProtectedRoute>} />
        <Route path="/notificaciones" element={<ProtectedRoute><Notificaciones /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

      </Routes>
    </Router>
  );
}

export default App;