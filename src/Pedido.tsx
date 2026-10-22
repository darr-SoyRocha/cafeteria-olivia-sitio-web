import { useState } from 'react';
import { useMenu } from './menuStore';
import { puntosPorCompra, useLealtad } from './lealtadStore';
import { NUMERO_WHATSAPP } from './config';

type Linea = { nombre: string; cantidad: number; subtotal: number };

type PedidoConfirmado = {
  folio: string;
  nombre: string;
  telefono: string;
  hora: string;
  notas: string;
  lineas: Linea[];
  total: number;
  puntos: number | null; // null: el cliente no está registrado en lealtad
};

const crearFolio = () => `OL-${Date.now().toString(36).slice(-5).toUpperCase()}`;

const soloDigitos = (valor: string) => valor.replace(/\D/g, '');

function mensajeWhatsApp(p: PedidoConfirmado) {
  const detalle = p.lineas.map((l) => `- ${l.cantidad} x ${l.nombre} ($${l.subtotal})`).join('\n');
  const notas = p.notas ? `\nNotas: ${p.notas}` : '';
  return `Hola, quiero confirmar mi pedido ${p.folio}.\nNombre: ${p.nombre}\nTeléfono: ${p.telefono}\nRecojo a las: ${p.hora}\n${detalle}\nTotal: $${p.total}${notas}`;
}

export default function Pedido() {
  const { items } = useMenu();
  const { buscar, sumarPuntos } = useLealtad();
  const [cantidades, setCantidades] = useState<Record<string, number>>({});
  const [confirmando, setConfirmando] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [hora, setHora] = useState('');
  const [notas, setNotas] = useState('');
  const [confirmado, setConfirmado] = useState<PedidoConfirmado | null>(null);

  const disponibles = items.filter((item) => item.disponible);
  const seleccionados = disponibles.filter((item) => (cantidades[item.id] ?? 0) > 0);
  const total = seleccionados.reduce((suma, item) => suma + item.precio * cantidades[item.id], 0);
  const piezas = seleccionados.reduce((suma, item) => suma + cantidades[item.id], 0);

  const cambiar = (id: string, delta: number) => {
    setCantidades((actual) => {
      const nueva = Math.max(0, Math.min(20, (actual[id] ?? 0) + delta));
      return { ...actual, [id]: nueva };
    });
  };

  const vaciar = () => {
    setCantidades({});
    setConfirmando(false);
  };

  const confirmar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (seleccionados.length === 0 || telefono.length !== 10) return;

    const puntos = buscar(telefono) ? puntosPorCompra(total) : null;
    if (puntos !== null) sumarPuntos(telefono, puntos);

    setConfirmado({
      folio: crearFolio(),
      nombre: nombre.trim(),
      telefono,
      hora,
      notas: notas.trim(),
      lineas: seleccionados.map((item) => ({ nombre: item.nombre, cantidad: cantidades[item.id], subtotal: item.precio * cantidades[item.id] })),
      total,
      puntos,
    });
    setCantidades({});
    setConfirmando(false);
    setNombre('');
    setTelefono('');
    setHora('');
    setNotas('');
  };

  if (confirmado) {
    const enlace = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensajeWhatsApp(confirmado))}`;
    return (
      <section id="pedido" className="pedido">
        <div className="seccion-titulo">
          <span className="etiqueta">PEDIDO CONFIRMADO</span>
          <h2>¡Gracias, {confirmado.nombre}!</h2>
          <p>Tu folio es <strong>{confirmado.folio}</strong>. Te esperamos a las {confirmado.hora} para entregarte tu pedido.</p>
        </div>

        <div className="pedido-confirmacion">
          <ul>
            {confirmado.lineas.map((l) => (
              <li key={l.nombre}><span>{l.cantidad} × {l.nombre}</span><span>${l.subtotal}</span></li>
            ))}
          </ul>
          <p className="pedido-total"><span>Total a pagar en tienda</span><strong>${confirmado.total}</strong></p>
          {confirmado.notas && <p className="pedido-nota">Notas: {confirmado.notas}</p>}
          {confirmado.puntos !== null ? (
            <p className="form-success">Sumaste {confirmado.puntos} puntos a tu cuenta de lealtad.</p>
          ) : (
            <p className="pedido-nota">¿Quieres acumular puntos? Regístrate en la sección de <a href="#lealtad">lealtad</a> con este mismo teléfono.</p>
          )}
          <div className="admin-acciones">
            <a className="boton-primario" href={enlace} target="_blank" rel="noreferrer">Enviar pedido por WhatsApp</a>
            <button type="button" className="boton-secundario" onClick={() => setConfirmado(null)}>Hacer otro pedido</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pedido" className="pedido">
      <div className="seccion-titulo">
        <span className="etiqueta">PEDIDOS EN LÍNEA</span>
        <h2>Arma tu pedido</h2>
        <p>Elige tus productos disponibles, confirma tus datos y pasa por él a la cafetería.</p>
      </div>

      <div className="pedido-contenido">
        <ul className="pedido-lista">
          {disponibles.map((item) => (
            <li key={item.id} className="pedido-fila">
              <div className="pedido-info">
                <strong>{item.nombre}</strong>
                <span>${item.precio}</span>
              </div>
              <div className="pedido-control">
                <button type="button" onClick={() => cambiar(item.id, -1)} disabled={(cantidades[item.id] ?? 0) === 0} aria-label={`Quitar ${item.nombre}`}>−</button>
                <span aria-live="polite">{cantidades[item.id] ?? 0}</span>
                <button type="button" onClick={() => cambiar(item.id, 1)} aria-label={`Agregar ${item.nombre}`}>+</button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="pedido-resumen" aria-label="Resumen del pedido">
          <h3>Tu pedido</h3>
          {seleccionados.length === 0 ? (
            <p className="pedido-vacio">Aún no has agregado productos.</p>
          ) : (
            <>
              <ul>
                {seleccionados.map((item) => (
                  <li key={item.id}>
                    <span>{cantidades[item.id]} × {item.nombre}</span>
                    <span>${item.precio * cantidades[item.id]}</span>
                  </li>
                ))}
              </ul>
              <p className="pedido-total"><span>Total ({piezas} {piezas === 1 ? 'pieza' : 'piezas'})</span><strong>${total}</strong></p>

              {!confirmando ? (
                <div className="pedido-botones">
                  <button type="button" className="boton-primario" onClick={() => setConfirmando(true)}>Confirmar pedido</button>
                  <button type="button" className="boton-secundario" onClick={vaciar}>Vaciar pedido</button>
                </div>
              ) : (
                <form className="pedido-datos" onSubmit={confirmar}>
                  <label>Nombre
                    <input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" />
                  </label>
                  <label>Teléfono (10 dígitos)
                    <input required inputMode="numeric" value={telefono} onChange={(e) => setTelefono(soloDigitos(e.target.value).slice(0, 10))} minLength={10} maxLength={10} placeholder="3411234567" />
                  </label>
                  <label>Hora de recogida
                    <input required type="time" min="08:00" max="20:30" value={hora} onChange={(e) => setHora(e.target.value)} />
                  </label>
                  <label>Notas (opcional)
                    <textarea rows={2} maxLength={200} value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Sin azúcar, para llevar..." />
                  </label>
                  <div className="pedido-botones">
                    <button type="submit" className="boton-primario">Confirmar y generar folio</button>
                    <button type="button" className="boton-secundario" onClick={() => setConfirmando(false)}>Regresar</button>
                  </div>
                </form>
              )}
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
