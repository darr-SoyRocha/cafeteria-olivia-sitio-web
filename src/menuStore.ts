import { createContext, useContext } from 'react';
import type { Categoria, ItemMenu } from './datosMenu';

export type NuevoItem = {
  nombre: string;
  categoria: Categoria;
  precio: number;
  descripcion: string;
};

export type MenuContexto = {
  items: ItemMenu[];
  error: string | null;
  actualizarItem: (id: string, cambios: Partial<Pick<ItemMenu, 'precio' | 'disponible'>>) => void;
  agregarItem: (nuevo: NuevoItem) => void;
  eliminarItem: (id: string) => void;
  restablecer: () => void;
};

export const MenuStore = createContext<MenuContexto | null>(null);

export function useMenu(): MenuContexto {
  const contexto = useContext(MenuStore);
  if (!contexto) throw new Error('useMenu debe usarse dentro de MenuProvider');
  return contexto;
}
