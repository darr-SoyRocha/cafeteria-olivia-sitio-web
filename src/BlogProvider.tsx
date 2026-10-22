import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { blogInicial } from './datosBlog';
import type { EntradaBlog } from './datosBlog';
import { BlogStore } from './blogStore';
import type { BlogContexto } from './blogStore';
import { supabase } from './supabase';

const leerBlog = async () => {
  const { data, error } = await supabase.from('blog_entradas').select('id, tipo, titulo, fecha, texto');
  return error || !data ? null : (data as EntradaBlog[]);
};

const SIN_PERMISO = 'No se pudo guardar el cambio. Revisa tu conexión y que tu sesión siga activa.';

export function BlogProvider({ children }: { children: ReactNode }) {
  const [entradas, setEntradas] = useState<EntradaBlog[]>(blogInicial);
  const [error, setError] = useState<string | null>(null);

  const aplicar = useCallback((data: EntradaBlog[] | null) => {
    if (!data) {
      setError('No se pudo leer el blog del servidor; se muestran las publicaciones base.');
      return;
    }
    setEntradas(data);
    setError(null);
  }, []);

  const recargar = useCallback(async () => aplicar(await leerBlog()), [aplicar]);

  useEffect(() => {
    let activo = true;
    leerBlog().then((data) => {
      if (activo) aplicar(data);
    });
    return () => {
      activo = false;
    };
  }, [aplicar]);

  const confirmar = async (operacion: PromiseLike<{ error: unknown; data?: unknown[] | null }>) => {
    const { error: fallo, data } = await operacion;
    if (fallo || (data && data.length === 0)) {
      await recargar();
      setError(SIN_PERMISO);
      return;
    }
    setError(null);
  };

  const agregarEntrada: BlogContexto['agregarEntrada'] = (nueva) => {
    const entrada: EntradaBlog = {
      id: `entrada-${Date.now().toString(36)}`,
      tipo: nueva.tipo,
      titulo: nueva.titulo.trim(),
      fecha: nueva.fecha,
      texto: nueva.texto.trim(),
    };
    setEntradas((actual) => [...actual, entrada]);
    void confirmar(supabase.from('blog_entradas').insert(entrada).select('id'));
  };

  const eliminarEntrada: BlogContexto['eliminarEntrada'] = (id) => {
    setEntradas((actual) => actual.filter((e) => e.id !== id));
    void confirmar(supabase.from('blog_entradas').delete().eq('id', id).select('id'));
  };

  const restablecerBlog = () => {
    setEntradas(blogInicial);
    void (async () => {
      const { error: fallo } = await supabase.from('blog_entradas').delete().neq('id', '');
      if (!fallo) await confirmar(supabase.from('blog_entradas').insert(blogInicial).select('id'));
      else await confirmar(Promise.resolve({ error: fallo }));
    })();
  };

  return (
    <BlogStore.Provider value={{ entradas, error, agregarEntrada, eliminarEntrada, restablecerBlog }}>
      {children}
    </BlogStore.Provider>
  );
}
