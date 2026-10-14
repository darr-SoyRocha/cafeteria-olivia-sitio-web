import type { ReactNode } from 'react';
import { menuInicial } from './datosMenu';
import type { ItemMenu } from './datosMenu';
import { MenuStore } from './menuStore';
import type { MenuContexto } from './menuStore';
import { esObjeto, usePersistido } from './almacen';

// v2 guarda la lista completa (permite productos nuevos y eliminados); v1 solo guardaba precio y disponibilidad.
const CLAVE = 'olivia-menu-v2';

const esItem = (x: unknown): x is ItemMenu =>
  esObjeto(x) &&
  typeof x.id === 'string' &&
  (x.categoria === 'bebida' || x.categoria === 'postre') &&
  typeof x.nombre === 'string' &&
  typeof x.precio === 'number' &&
  Number.isFinite(x.precio) &&
  typeof x.descripcion === 'string' &&
  typeof x.disponible === 'boolean';

const esListaMenu = (x: unknown): x is ItemMenu[] => Array.isArray(x) && x.every(esItem);

const crearId = (nombre: string) =>
  `${nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now().toString(36)}`;

export function MenuProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = usePersistido<ItemMenu[]>(CLAVE, menuInicial, esListaMenu);

  const actualizarItem: MenuContexto['actualizarItem'] = (id, cambios) => {
    setItems((actual) => actual.map((it) => (it.id === id ? { ...it, ...cambios } : it)));
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
    setItems((actual) => [...actual, item]);
  };

  const eliminarItem: MenuContexto['eliminarItem'] = (id) => {
    setItems((actual) => actual.filter((it) => it.id !== id));
  };

  const restablecer = () => setItems(menuInicial);

  return (
    <MenuStore.Provider value={{ items, actualizarItem, agregarItem, eliminarItem, restablecer }}>
      {children}
    </MenuStore.Provider>
  );
}
