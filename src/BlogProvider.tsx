import type { ReactNode } from 'react';
import { blogInicial } from './datosBlog';
import type { EntradaBlog } from './datosBlog';
import { BlogStore } from './blogStore';
import type { BlogContexto } from './blogStore';
import { esObjeto, usePersistido } from './almacen';

const CLAVE = 'olivia-blog-v1';

const esEntrada = (x: unknown): x is EntradaBlog =>
  esObjeto(x) &&
  typeof x.id === 'string' &&
  (x.tipo === 'noticia' || x.tipo === 'evento') &&
  typeof x.titulo === 'string' &&
  typeof x.fecha === 'string' &&
  typeof x.texto === 'string';

const esListaBlog = (x: unknown): x is EntradaBlog[] => Array.isArray(x) && x.every(esEntrada);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [entradas, setEntradas] = usePersistido<EntradaBlog[]>(CLAVE, blogInicial, esListaBlog);

  const agregarEntrada: BlogContexto['agregarEntrada'] = (nueva) => {
    const entrada: EntradaBlog = {
      id: `entrada-${Date.now().toString(36)}`,
      tipo: nueva.tipo,
      titulo: nueva.titulo.trim(),
      fecha: nueva.fecha,
      texto: nueva.texto.trim(),
    };
    setEntradas((actual) => [...actual, entrada]);
  };

  const eliminarEntrada: BlogContexto['eliminarEntrada'] = (id) => {
    setEntradas((actual) => actual.filter((e) => e.id !== id));
  };

  const restablecerBlog = () => setEntradas(blogInicial);

  return (
    <BlogStore.Provider value={{ entradas, agregarEntrada, eliminarEntrada, restablecerBlog }}>
      {children}
    </BlogStore.Provider>
  );
}
