import { useState } from 'react';
import AdminMenu from './AdminMenu';
import AdminBlog from './AdminBlog';

// Acceso de demostración: valida en el navegador, no sustituye una autenticación real con backend.
const PIN_DEMO = '1234';

export default function Admin() {
  const [autorizado, setAutorizado] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [pestana, setPestana] = useState<'menu' | 'blog'>('menu');

  const entrar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pin === PIN_DEMO) {
      setAutorizado(true);
      setError(false);
    } else {
      setError(true);
    }
    setPin('');
  };

  return (
    <section id="admin" className="admin">
      <div className="seccion-titulo">
        <span className="etiqueta">ADMINISTRACIÓN</span>
        <h2>Panel de administración</h2>
        <p>Gestiona el menú y las publicaciones del blog sin tocar el código.</p>
      </div>

      {!autorizado ? (
        <form className="admin-acceso" onSubmit={entrar}>
          <label>PIN de administrador
            <input type="password" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="••••" required />
          </label>
          <button className="boton-primario" type="submit">Entrar</button>
          {error && <p className="form-error">PIN incorrecto. Intenta de nuevo.</p>}
        </form>
      ) : (
        <div className="admin-panel">
          <div className="admin-pestanas" role="tablist" aria-label="Secciones de administración">
            <button type="button" role="tab" aria-selected={pestana === 'menu'} className={pestana === 'menu' ? 'activo' : ''} onClick={() => setPestana('menu')}>Menú</button>
            <button type="button" role="tab" aria-selected={pestana === 'blog'} className={pestana === 'blog' ? 'activo' : ''} onClick={() => setPestana('blog')}>Blog</button>
          </div>
          {pestana === 'menu' ? <AdminMenu /> : <AdminBlog />}
          <div className="admin-acciones">
            <button type="button" className="boton-secundario" onClick={() => setAutorizado(false)}>Cerrar sesión</button>
          </div>
        </div>
      )}
    </section>
  );
}
