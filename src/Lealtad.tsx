import { useState } from 'react';
import { PESOS_POR_PUNTO, recompensas, useLealtad } from './lealtadStore';

const soloDigitos = (valor: string) => valor.replace(/\D/g, '');

export default function Lealtad() {
  const { buscar, registrar, canjear, socios } = useLealtad();
  const [nombre, setNombre] = useState('');
  const [telefonoAlta, setTelefonoAlta] = useState('');
  const [telefonoConsulta, setTelefonoConsulta] = useState('');
  const [activo, setActivo] = useState('');
  const [mensaje, setMensaje] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null);
  const [cupon, setCupon] = useState('');

  // El socio activo se vuelve a leer del almacén para reflejar puntos sumados desde Pedido.
  const socio = activo ? buscar(activo) : undefined;

  const alta = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (telefonoAlta.length !== 10) {
      setMensaje({ tipo: 'error', texto: 'El teléfono debe tener 10 dígitos.' });
      return;
    }
    const resultado = registrar(nombre, telefonoAlta);
    if (resultado === 'existe') {
      setMensaje({ tipo: 'error', texto: 'Ese teléfono ya está registrado. Consulta tus puntos con el formulario de la derecha.' });
      return;
    }
    setMensaje({ tipo: 'ok', texto: `¡Bienvenido(a), ${nombre.trim()}! Tu cuenta quedó registrada con 0 puntos.` });
    setActivo(telefonoAlta);
    setNombre('');
    setTelefonoAlta('');
    setCupon('');
  };

  const consulta = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCupon('');
    if (!buscar(telefonoConsulta)) {
      setActivo('');
      setMensaje({ tipo: 'error', texto: 'No encontramos ese teléfono. Regístrate primero.' });
      return;
    }
    setMensaje(null);
    setActivo(telefonoConsulta);
  };

  const canje = (recompensaId: string) => {
    if (!socio) return;
    const codigo = canjear(socio.telefono, recompensaId);
    if (codigo) setCupon(codigo);
  };

  const siguiente = socio ? recompensas.find((r) => r.costo > socio.puntos) : undefined;

  return (
    <section id="lealtad" className="lealtad">
      <div className="seccion-titulo">
        <span className="etiqueta">CLIENTE FRECUENTE</span>
        <h2>Programa de lealtad</h2>
        <p>Suma 1 punto por cada ${PESOS_POR_PUNTO} de tus pedidos confirmados y cámbialos por cortesías.</p>
      </div>

      <div className="lealtad-contenido">
        <form className="formulario-extra" onSubmit={alta}>
          <h3>Regístrate</h3>
          <label>Nombre
            <input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" />
          </label>
          <label>Teléfono (10 dígitos)
            <input required inputMode="numeric" value={telefonoAlta} onChange={(e) => setTelefonoAlta(soloDigitos(e.target.value).slice(0, 10))} placeholder="3411234567" />
          </label>
          <button className="boton-primario" type="submit">Crear mi cuenta</button>
        </form>

        <form className="formulario-extra" onSubmit={consulta}>
          <h3>Consulta tus puntos</h3>
          <label>Teléfono registrado
            <input required inputMode="numeric" value={telefonoConsulta} onChange={(e) => setTelefonoConsulta(soloDigitos(e.target.value).slice(0, 10))} placeholder="3411234567" />
          </label>
          <button className="boton-secundario" type="submit">Consultar</button>
        </form>
      </div>

      {mensaje && <p className={mensaje.tipo === 'ok' ? 'form-success lealtad-aviso' : 'form-error lealtad-aviso'}>{mensaje.texto}</p>}

      {socio && (
        <div className="lealtad-tarjeta" aria-live="polite">
          <p className="lealtad-nombre">{socio.nombre}</p>
          <p className="lealtad-puntos"><strong>{socio.puntos}</strong> puntos</p>
          {siguiente ? (
            <p className="lealtad-meta">Te faltan {siguiente.costo - socio.puntos} puntos para: {siguiente.nombre}.</p>
          ) : (
            <p className="lealtad-meta">Ya puedes canjear cualquier cortesía.</p>
          )}
          <ul className="lealtad-recompensas">
            {recompensas.map((r) => (
              <li key={r.id}>
                <span>{r.nombre} · {r.costo} puntos</span>
                <button type="button" className="boton-secundario" disabled={socio.puntos < r.costo} onClick={() => canje(r.id)}>Canjear</button>
              </li>
            ))}
          </ul>
          {cupon && <p className="form-success">Cupón generado: <strong>{cupon}</strong>. Preséntalo en el mostrador.</p>}
        </div>
      )}

      <p className="lealtad-nota">
        Demostración: los puntos se guardan solo en este navegador{socios.length > 0 ? ` (${socios.length} ${socios.length === 1 ? 'cuenta registrada' : 'cuentas registradas'})` : ''} y no se comparten entre dispositivos.
      </p>
    </section>
  );
}
