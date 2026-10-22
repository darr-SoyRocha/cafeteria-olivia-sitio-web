import { useState } from 'react';
import AdminMenu from './AdminMenu';
import AdminBlog from './AdminBlog';
import { useAuth } from './authStore';

export default function Admin() {
  const { correo, esAdmin, cargando, entrar, salir } = useAuth();
  const [correoForm, setCorreoForm] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [pestana, setPestana] = useState<'menu' | 'blog'>('menu');

  const iniciar = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEnviando(true);
    const fallo = await entrar(correoForm, contrasena);
    setEnviando(false);
    setContrasena('');
    setError(fallo ?? '');
  };

  return (
    <section id="admin" className="admin">
      <div className="seccion-titulo">
        <span className="etiqueta">ADMINISTRACIÓN</span>
        <h2>Panel de administración</h2>
        <p>Gestiona el menú y las publicaciones del blog sin tocar el código.</p>
      </div>

      {cargando ? (
        <p className="pedido-vacio admin-estado">Comprobando sesión…</p>
      ) : !correo ? (
        <form className="admin-acceso" onSubmit={iniciar}>
          <label>Correo
            <input type="email" autoComplete="username" value={correoForm} onChange={(e) => setCorreoForm(e.target.value)} required />
          </label>
          <label>Contraseña
            <input type="password" autoComplete="current-password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
          </label>
          <button className="boton-primario" type="submit" disabled={enviando}>{enviando ? 'Entrando…' : 'Entrar'}</button>
          {error && <p className="form-error" role="alert">{error}</p>}
        </form>
      ) : !esAdmin ? (
        <div className="admin-acceso">
          <p className="form-error" role="alert">La cuenta {correo} no tiene permisos de administrador.</p>
          <button type="button" className="boton-secundario" onClick={() => void salir()}>Cerrar sesión</button>
        </div>
      ) : (
        <div className="admin-panel">
          <div className="admin-pestanas" role="tablist" aria-label="Secciones de administración">
            <button type="button" role="tab" aria-selected={pestana === 'menu'} className={pestana === 'menu' ? 'activo' : ''} onClick={() => setPestana('menu')}>Menú</button>
            <button type="button" role="tab" aria-selected={pestana === 'blog'} className={pestana === 'blog' ? 'activo' : ''} onClick={() => setPestana('blog')}>Blog</button>
          </div>
          {pestana === 'menu' ? <AdminMenu /> : <AdminBlog />}
          <div className="admin-acciones">
            <span className="admin-sesion">Sesión: {correo}</span>
            <button type="button" className="boton-secundario" onClick={() => void salir()}>Cerrar sesión</button>
          </div>
        </div>
      )}
    </section>
  );
}
