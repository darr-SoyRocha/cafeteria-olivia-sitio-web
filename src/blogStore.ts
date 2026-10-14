import { createContext, useContext } from 'react';
import type { EntradaBlog, TipoEntrada } from './datosBlog';

export type NuevaEntrada = {
  tipo: TipoEntrada;
  titulo: string;
  fecha: string;
  texto: string;
};

export type BlogContexto = {
  entradas: EntradaBlog[];
  agregarEntrada: (nueva: NuevaEntrada) => void;
  eliminarEntrada: (id: string) => void;
  restablecerBlog: () => void;
};

export const BlogStore = createContext<BlogContexto | null>(null);

export function useBlog(): BlogContexto {
  const contexto = useContext(BlogStore);
  if (!contexto) throw new Error('useBlog debe usarse dentro de BlogProvider');
  return contexto;
}
