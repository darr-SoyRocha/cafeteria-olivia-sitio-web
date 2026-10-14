import { useEffect, useState } from 'react';

// Lectura segura de localStorage: si algo falla o los datos no son válidos, se usa el valor inicial.
export function leerAlmacen<T>(clave: string, inicial: T, validar: (dato: unknown) => dato is T): T {
  try {
    const guardado = localStorage.getItem(clave);
    if (!guardado) return inicial;
    const dato: unknown = JSON.parse(guardado);
    return validar(dato) ? dato : inicial;
  } catch {
    return inicial;
  }
}

export function usePersistido<T>(clave: string, inicial: T, validar: (dato: unknown) => dato is T) {
  const [valor, setValor] = useState<T>(() => leerAlmacen(clave, inicial, validar));

  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // sin almacenamiento disponible: la sección sigue funcionando en memoria
    }
  }, [clave, valor]);

  return [valor, setValor] as const;
}

export const esObjeto = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null;
