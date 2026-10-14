import { useState } from 'react';
import { useBlog } from './blogStore';
import type { TipoEntrada } from './datosBlog';

const formatoFecha = (fecha: string) => {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  if (!anio || !mes || !dia) return fecha;
  return new Date(anio, mes - 1, dia).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function Blog() {
  const { entradas } = useBlog();
  const [filtro, setFiltro] = useState<'todas' | TipoEntrada>('todas');

  const visibles = entradas
    .filter((e) => filtro === 'todas' || e.tipo === filtro)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  const filtros: Array<{ valor: 'todas' | TipoEntrada; texto: string }> = [
    { valor: 'todas', texto: 'Todo' },
    { valor: 'noticia', texto: 'Noticias' },
    { valor: 'evento', texto: 'Eventos' },
  ];

  return (
    <section id="blog" className="blog">
      <div className="seccion-titulo">
        <span className="etiqueta">BLOG</span>
        <h2>Noticias y eventos</h2>
        <p>Entérate de lo que pasa en Cafetería Olivia.</p>
      </div>

      <div className="blog-filtros" role="group" aria-label="Filtrar publicaciones">
        {filtros.map((f) => (
          <button key={f.valor} type="button" className={filtro === f.valor ? 'activo' : ''} aria-pressed={filtro === f.valor} onClick={() => setFiltro(f.valor)}>
            {f.texto}
          </button>
        ))}
      </div>

      {visibles.length === 0 ? (
        <p className="pedido-vacio blog-vacio">Todavía no hay publicaciones en esta categoría.</p>
      ) : (
        <div className="blog-lista">
          {visibles.map((e) => (
            <article key={e.id} className="blog-entrada">
              <div className="blog-meta">
                <span className={`badge ${e.tipo === 'evento' ? 'badge-evento' : 'badge-disponible'}`}>{e.tipo === 'evento' ? 'Evento' : 'Noticia'}</span>
                <time dateTime={e.fecha}>{formatoFecha(e.fecha)}</time>
              </div>
              <h3>{e.titulo}</h3>
              <p>{e.texto}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
