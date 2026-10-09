import { Inicio } from './inicio';
import { Menu } from './Menu';
import { Ubicacion } from './Ubicacion';
import { Opiniones } from './Opiniones';
import { WhatsApp } from './WhatsApp';
import Reservaciones from './Reservaciones';
import Galeria from './Galeria';
import Newsletter from './Newsletter';
import RedesSociales from './RedesSociales';
import Pedido from './Pedido';
import Admin from './Admin';
import { MenuProvider } from './MenuProvider';
import './App.css';

export function Header() {
  return (
    <header className="header">
      <a className="logo" href="#inicio">
        <span>☕🍰</span>
        <span>Cafetería Olivia</span>
      </a>
      <nav className="nav" aria-label="Navegación principal">
        <a href="#inicio">Inicio</a>
        <a href="#menu">Menú</a>
        <a href="#pedido">Pedido</a>
        <a href="#ubicacion">Ubicación</a>
        <a href="#opiniones">Opiniones</a>
        <a href="#reservaciones">Reservaciones</a>
        <a href="#galeria">Galería</a>
        <a href="#newsletter">Newsletter</a>
        <a href="#redes">Redes</a>
        <a href="#admin">Admin</a>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <article><span><strong>© 2026 Cafetería Olivia</strong> · Café y postres con amor</span></article>
      <article><strong>🍰 Postres</strong><span> · Opciones dulces todos los días.</span></article>
      <article><strong>📍 <a href="#ubicacion">Visítanos</a></strong><span> · Consulta ubicación y horarios.</span></article>
    </footer>
  );
}

export default function App() {
  return (
    <MenuProvider>
    <div className="app">
      <Header />

      <main>
        <Inicio />
        <Menu />
        <Pedido />
        <Ubicacion />
        <Opiniones />
        <Reservaciones />
        <Galeria />
        <Newsletter />
        <RedesSociales />
        <Admin />
      </main>

      <Footer />

      <WhatsApp />
    </div>
    </MenuProvider>
  );
}
