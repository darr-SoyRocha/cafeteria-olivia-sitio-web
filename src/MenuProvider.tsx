import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { menuInicial } from './datosMenu';
import type { ItemMenu } from './datosMenu';
import { MenuStore } from './menuStore';
import type { MenuContexto } from './menuStore';
import { supabase } from './supabase';

type FilaMenu = {
  id: string;
  categoria: ItemMenu['categoria'];
  nombre: string;
  precio: number;
  descripcion: string;
  disponible: boolean;
  imagen: string | null;
  orden: number;
};

const aItem = (fila: FilaMenu): ItemMenu => ({
  id: fila.id,
  categoria: fila.categoria,
  nombre: fila.nombre,
  precio: Number(fila.precio),
  descripcion: fila.descripcion,
  disponible: fila.disponible,
  imagen: fila.imagen ?? undefined,
});

const aFila = (item: ItemMenu, orden: number): FilaMenu => ({ ...item, imagen: item.imagen ?? null, orden });

const crearId = (nombre: string) =>
  `${nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now().toString(36)}`;

const leerMenu = async () => {
  const { data, error } = await supabase.from('menu_items').select('*').order('orden');
  return error || !data ? null : (data as FilaMenu[]);
};

const SIN_PERMISO = 'No se pudo guardar el cambio. Revisa tu conexión y que tu sesión siga activa.';

export function MenuProvider({ children }: { children: ReactNode }) {
  // Mientras llega la respuesta del servidor (o si no hay conexión) se muestra el menú base.
  const [items, setItems] = useState<ItemMenu[]>(menuInicial);
  const [error, setError] = useState<string | null>(null);

  const aplicar = useCallback((data: FilaMenu[] | null) => {
    if (!data) {
      setError('No se pudo leer el menú del servidor; se muestra el menú base.');
      return;
    }
    setItems(data.map(aItem));
    setError(null);
  }, []);

  const recargar = useCallback(async () => aplicar(await leerMenu()), [aplicar]);

  useEffect(() => {
    let activo = true;
    leerMenu().then((data) => {
      if (activo) aplicar(data);
    });
    return () => {
      activo = false;
    };
  }, [aplicar]);

  // Si el servidor rechaza el cambio se vuelve a leer la lista real para no mostrar datos falsos.
  const confirmar = async (operacion: PromiseLike<{ error: unknown; data?: unknown[] | null }>) => {
    const { error: fallo, data } = await operacion;
    if (fallo || (data && data.length === 0)) {
      await recargar();
      setError(SIN_PERMISO);
      return;
    }
    setError(null);
  };

  const actualizarItem: MenuContexto['actualizarItem'] = (id, cambios) => {
    setItems((actual) => actual.map((it) => (it.id === id ? { ...it, ...cambios } : it)));
    void confirmar(supabase.from('menu_items').update(cambios).eq('id', id).select('id'));
  };

  const agregarItem: MenuContexto['agregarItem'] = (nuevo) => {
    const item: ItemMenu = {
      id: crearId(nuevo.nombre),
      categoria: nuevo.categoria,
      nombre: nuevo.nombre.trim(),
      precio: nuevo.precio,
      descripcion: nuevo.descripcion.trim(),
      disponible: true,
    };
    const orden = items.length + 1;
    setItems((actual) => [...actual, item]);
    void confirmar(supabase.from('menu_items').insert(aFila(item, orden)).select('id'));
  };

  const eliminarItem: MenuContexto['eliminarItem'] = (id) => {
    setItems((actual) => actual.filter((it) => it.id !== id));
    void confirmar(supabase.from('menu_items').delete().eq('id', id).select('id'));
  };

  const restablecer = () => {
    setItems(menuInicial);
    void (async () => {
      const { error: fallo } = await supabase.from('menu_items').delete().neq('id', '');
      if (!fallo) await confirmar(supabase.from('menu_items').insert(menuInicial.map((it, i) => aFila(it, i + 1))).select('id'));
      else await confirmar(Promise.resolve({ error: fallo }));
    })();
  };

  return (
    <MenuStore.Provider value={{ items, error, actualizarItem, agregarItem, eliminarItem, restablecer }}>
      {children}
    </MenuStore.Provider>
  );
}
