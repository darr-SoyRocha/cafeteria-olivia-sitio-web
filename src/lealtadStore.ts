import { createContext, useContext } from 'react';

export type Socio = {
  telefono: string;
  nombre: string;
  puntos: number;
};

export type Recompensa = {
  id: string;
  nombre: string;
  costo: number;
};

// Regla de la demostración: 1 punto por cada $10 de compra confirmada.
export const PESOS_POR_PUNTO = 10;

export const recompensas: Recompensa[] = [
  { id: 'bebida', nombre: 'Bebida de cortesía (americano)', costo: 50 },
  { id: 'postre', nombre: 'Postre de cortesía', costo: 100 },
];

export const puntosPorCompra = (total: number) => Math.floor(total / PESOS_POR_PUNTO);

export type LealtadContexto = {
  socios: Socio[];
  buscar: (telefono: string) => Socio | undefined;
  registrar: (nombre: string, telefono: string) => 'ok' | 'existe';
  sumarPuntos: (telefono: string, puntos: number) => void;
  canjear: (telefono: string, recompensaId: string) => string | null;
};

export const LealtadStore = createContext<LealtadContexto | null>(null);

export function useLealtad(): LealtadContexto {
  const contexto = useContext(LealtadStore);
  if (!contexto) throw new Error('useLealtad debe usarse dentro de LealtadProvider');
  return contexto;
}
