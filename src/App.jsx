import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Nosotros from "./pages/Nosotros"
import Servicios from "./pages/Servicios"
import Ubicacion from "./pages/Ubicacion"
import Contacto from "./pages/Contacto"
import Scroll from "./components/ui/Scroll"
import LibroReclamaciones from "./pages/LibroReclamaciones"
import MainLayout from "./components/layout/MainLayout"
import ServicioDetalle from "./components/layout/ServicioDetalle"

function App() {
  return (
    <>
      <Scroll />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/ubicanos" element={<Ubicacion />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/libro-reclamaciones" element={<LibroReclamaciones />} />
          <Route path="/servicios/:slug" element={<ServicioDetalle />} />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
