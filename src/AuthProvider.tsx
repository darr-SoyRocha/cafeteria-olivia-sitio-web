import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { AuthStore } from './authStore';
import type { AuthContexto } from './authStore';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [correo, setCorreo] = useState<string | null>(null);
  const [esAdmin, setEsAdmin] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    // Con la sesión activa se consulta la tabla de administradores: iniciar sesión no basta para editar.
    const aplicar = async (sesion: Session | null) => {
      if (!sesion) {
        if (!activo) return;
        setCorreo(null);
        setEsAdmin(false);
        setCargando(false);
        return;
      }
      const { data } = await supabase.from('administradores').select('user_id').eq('user_id', sesion.user.id).maybeSingle();
      if (!activo) return;
      setCorreo(sesion.user.email ?? null);
      setEsAdmin(!!data);
      setCargando(false);
    };

    supabase.auth.getSession().then(({ data }) => aplicar(data.session));
    const { data: suscripcion } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      // Se difiere para no hacer consultas dentro del propio callback de autenticación.
      setTimeout(() => void aplicar(sesion), 0);
    });

    return () => {
      activo = false;
      suscripcion.subscription.unsubscribe();
    };
  }, []);

  const entrar: AuthContexto['entrar'] = async (correoIngresado, contrasena) => {
    const { error } = await supabase.auth.signInWithPassword({ email: correoIngresado.trim(), password: contrasena });
    if (!error) return null;
    return error.status === 400 ? 'Correo o contraseña incorrectos.' : 'No se pudo iniciar sesión. Intenta de nuevo en unos minutos.';
  };

  const salir: AuthContexto['salir'] = async () => {
    await supabase.auth.signOut();
  };

  return <AuthStore.Provider value={{ correo, esAdmin, cargando, entrar, salir }}>{children}</AuthStore.Provider>;
}
