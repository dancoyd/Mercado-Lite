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
        
      </Routes>
    </Router>
  );
}

export default App;