import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { menuInicial } from './datosMenu';
import type { ItemMenu } from './datosMenu';
import { MenuStore } from './menuStore';
import type { MenuContexto } from './menuStore';

const CLAVE = 'olivia-menu-v1';

function cargarMenu(): ItemMenu[] {
  try {
    const guardado = localStorage.getItem(CLAVE);
    if (!guardado) return menuInicial;
    const lista = JSON.parse(guardado) as Array<Pick<ItemMenu, 'id' | 'precio' | 'disponible'>>;
    // Solo se respetan precio y disponibilidad; el resto sale siempre de datosMenu.ts
    return menuInicial.map((base) => {
      const cambio = lista.find((x) => x.id === base.id);
      return cambio && Number.isFinite(cambio.precio) ? { ...base, precio: cambio.precio, disponible: !!cambio.disponible } : base;
    });
  } catch {
    return menuInicial;
  }
}

export function MenuProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemMenu[]>(cargarMenu);

  useEffect(() => {
    try {
      const resumen = items.map(({ id, precio, disponible }) => ({ id, precio, disponible }));
      localStorage.setItem(CLAVE, JSON.stringify(resumen));
    } catch {
      // sin almacenamiento disponible: el menú sigue funcionando en memoria
    }
  }, [items]);

  const actualizarItem: MenuContexto['actualizarItem'] = (id, cambios) => {
    setItems((actual) => actual.map((it) => (it.id === id ? { ...it, ...cambios } : it)));
  };

  const restablecer = () => setItems(menuInicial);

  return <MenuStore.Provider value={{ items, actualizarItem, restablecer }}>{children}</MenuStore.Provider>;
}
