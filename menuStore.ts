import { createContext, useContext } from 'react';
import type { ItemMenu } from './datosMenu';

export type MenuContexto = {
  items: ItemMenu[];
  actualizarItem: (id: string, cambios: Partial<Pick<ItemMenu, 'precio' | 'disponible'>>) => void;
  restablecer: () => void;
};

export const MenuStore = createContext<MenuContexto | null>(null);

export function useMenu(): MenuContexto {
  const contexto = useContext(MenuStore);
  if (!contexto) throw new Error('useMenu debe usarse dentro de MenuProvider');
  return contexto;
}
