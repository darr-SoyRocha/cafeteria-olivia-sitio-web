import { useState } from 'react';
import { useBlog } from './blogStore';
import type { TipoEntrada } from './datosBlog';

export default function AdminBlog() {
  const { entradas, agregarEntrada, eliminarEntrada, restablecerBlog } = useBlog();
  const [tipo, setTipo] = useState<TipoEntrada>('noticia');
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [texto, setTexto] = useState('');
  const [aviso, setAviso] = useState('');

  const publicar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!titulo.trim() || !texto.trim() || !fecha) return;
    agregarEntrada({ tipo, titulo, fecha, texto });
    setAviso(`Se publicó "${titulo.trim()}".`);
    setTitulo('');
    setFecha('');
    setTexto('');
  };

  const baja = (id: string, tituloEntrada: string) => {
    if (!window.confirm(`¿Eliminar la publicación "${tituloEntrada}"?`)) return;
    eliminarEntrada(id);
    setAviso(`Se eliminó "${tituloEntrada}".`);
  };

  return (
    <>
      <form className="formulario-extra admin-alta" onSubmit={publicar}>
        <h3>Nueva publicación</h3>
        <div className="formulario-grid">
          <label>Tipo
            <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoEntrada)}>
              <option value="noticia">Noticia</option>
              <option value="evento">Evento</option>
            </select>
          </label>
          <label>Fecha
            <input required type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </label>
        </div>
        <label>Título
          <input required value={titulo} onChange={(e) => setTitulo(e.target.value)} maxLength={80} />
        </label>
        <label>Texto
          <textarea required rows={3} value={texto} onChange={(e) => setTexto(e.target.value)} maxLength={300} />
        </label>
        <button className="boton-primario" type="submit">Publicar</button>
      </form>

      {aviso && <p className="form-success" role="status">{aviso}</p>}

      <table className="admin-tabla">
        <thead>
          <tr><th>Título</th><th>Tipo</th><th>Fecha</th><th>Acción</th></tr>
        </thead>
        <tbody>
          {[...entradas].sort((a, b) => b.fecha.localeCompare(a.fecha)).map((e) => (
            <tr key={e.id}>
              <td>{e.titulo}</td>
              <td>{e.tipo === 'evento' ? 'Evento' : 'Noticia'}</td>
              <td>{e.fecha}</td>
              <td><button type="button" className="boton-peligro" onClick={() => baja(e.id, e.titulo)} aria-label={`Eliminar ${e.titulo}`}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="admin-acciones">
        <button type="button" className="boton-secundario" onClick={restablecerBlog}>Restablecer publicaciones originales</button>
      </div>
    </>
  );
}
