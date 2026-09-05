import { Inicio } from './inicio';
import { Menu } from './Menu';
import { Ubicacion } from './Ubicacion';
import { Opiniones } from './Opiniones';
import { WhatsApp } from './WhatsApp';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <a className="logo" href="#inicio">
          <span>☕🍰</span>
          <span>Cafetería Olivia</span>
        </a>
        <nav className="nav">
          <a href="#inicio">Inicio</a>
          <a href="#menu">Menú</a>
          <a href="#ubicacion">Ubicación</a>
          <a href="#opiniones">Opiniones</a>
        </nav>
      </header>

      <main>
        <Inicio />
        <Menu />
        <Ubicacion />
        <Opiniones />
      </main>

      <footer className="footer">
        <p>© 2026 Cafetería Olivia · Café y postres con amor ☕🍰</p>
      </footer>

      <WhatsApp />
    </div>
  );
}
