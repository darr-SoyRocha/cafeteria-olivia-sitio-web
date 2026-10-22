import { createContext, useContext } from 'react';

export type AuthContexto = {
  correo: string | null;
  esAdmin: boolean;
  cargando: boolean;
  entrar: (correo: string, contrasena: string) => Promise<string | null>;
  salir: () => Promise<void>;
};

export const AuthStore = createContext<AuthContexto | null>(null);

export function useAuth(): AuthContexto {
  const contexto = useContext(AuthStore);
  if (!contexto) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return contexto;
}
