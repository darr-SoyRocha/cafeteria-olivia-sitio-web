import type { ReactNode } from 'react';
import { LealtadStore, recompensas } from './lealtadStore';
import type { LealtadContexto, Socio } from './lealtadStore';
import { esObjeto, usePersistido } from './almacen';

// Los puntos se guardan solo en este navegador: es una demostración, no un programa real de lealtad.
const CLAVE = 'olivia-lealtad-v1';

const esSocio = (x: unknown): x is Socio =>
  esObjeto(x) && typeof x.telefono === 'string' && typeof x.nombre === 'string' && typeof x.puntos === 'number' && Number.isFinite(x.puntos);

const esListaSocios = (x: unknown): x is Socio[] => Array.isArray(x) && x.every(esSocio);

export function LealtadProvider({ children }: { children: ReactNode }) {
  const [socios, setSocios] = usePersistido<Socio[]>(CLAVE, [], esListaSocios);

  const buscar: LealtadContexto['buscar'] = (telefono) => socios.find((s) => s.telefono === telefono);

  const registrar: LealtadContexto['registrar'] = (nombre, telefono) => {
    if (socios.some((s) => s.telefono === telefono)) return 'existe';
    setSocios((actual) => [...actual, { telefono, nombre: nombre.trim(), puntos: 0 }]);
    return 'ok';
  };

  const sumarPuntos: LealtadContexto['sumarPuntos'] = (telefono, puntos) => {
    if (puntos <= 0) return;
    setSocios((actual) => actual.map((s) => (s.telefono === telefono ? { ...s, puntos: s.puntos + puntos } : s)));
  };

  const canjear: LealtadContexto['canjear'] = (telefono, recompensaId) => {
    const socio = socios.find((s) => s.telefono === telefono);
    const recompensa = recompensas.find((r) => r.id === recompensaId);
    if (!socio || !recompensa || socio.puntos < recompensa.costo) return null;
    setSocios((actual) => actual.map((s) => (s.telefono === telefono ? { ...s, puntos: s.puntos - recompensa.costo } : s)));
    return `OL-${recompensa.id.toUpperCase()}-${Date.now().toString(36).slice(-4).toUpperCase()}`;
  };

  return (
    <LealtadStore.Provider value={{ socios, buscar, registrar, sumarPuntos, canjear }}>
      {children}
    </LealtadStore.Provider>
  );
}
