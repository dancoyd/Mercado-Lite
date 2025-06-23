import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './inicio';
import Ingresar from './ingresar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/ingresar" element={<Ingresar />} />
        
      </Routes>
    </Router>
  );
}

export default App;