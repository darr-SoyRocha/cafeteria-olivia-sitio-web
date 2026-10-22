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
import Blog from './Blog';
import Lealtad from './Lealtad';
import { MenuProvider } from './MenuProvider';
import { BlogProvider } from './BlogProvider';
import { LealtadProvider } from './LealtadProvider';
import { AuthProvider } from './AuthProvider';
import { useState } from 'react';
import './App.css';

export function Header() {
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  return (
    <header className="header">
      <a className="logo" href="#inicio" onClick={cerrar}>
        <span>☕🍰</span>
        <span>Cafetería Olivia</span>
      </a>
      <button type="button" className="nav-boton" aria-expanded={abierto} aria-controls="nav-principal" aria-label={abierto ? 'Cerrar navegación' : 'Abrir navegación'} onClick={() => setAbierto((v) => !v)}>
        {abierto ? '✕' : '☰'}
      </button>
      <nav id="nav-principal" className={`nav ${abierto ? 'abierto' : ''}`} aria-label="Navegación principal">
        <a href="#inicio" onClick={cerrar}>Inicio</a>
        <a href="#menu" onClick={cerrar}>Menú</a>
        <a href="#pedido" onClick={cerrar}>Pedido</a>
        <a href="#ubicacion" onClick={cerrar}>Ubicación</a>
        <a href="#opiniones" onClick={cerrar}>Opiniones</a>
        <a href="#blog" onClick={cerrar}>Blog</a>
        <a href="#lealtad" onClick={cerrar}>Lealtad</a>
        <a href="#reservaciones" onClick={cerrar}>Reservaciones</a>
        <a href="#galeria" onClick={cerrar}>Galería</a>
        <a href="#newsletter" onClick={cerrar}>Newsletter</a>
        <a href="#redes" onClick={cerrar}>Redes</a>
        <a href="#admin" onClick={cerrar}>Admin</a>
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
    <AuthProvider>
    <MenuProvider>
    <BlogProvider>
    <LealtadProvider>
    <div className="app">
      <Header />

      <main>
        <Inicio />
        <Menu />
        <Pedido />
        <Ubicacion />
        <Opiniones />
        <Blog />
        <Lealtad />
        <Reservaciones />
        <Galeria />
        <Newsletter />
        <RedesSociales />
        <Admin />
      </main>

      <Footer />

      <WhatsApp />
    </div>
    </LealtadProvider>
    </BlogProvider>
    </MenuProvider>
    </AuthProvider>
  );
}
