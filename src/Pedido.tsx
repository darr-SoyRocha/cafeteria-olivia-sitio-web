import { useState } from 'react';
import { useMenu } from './menuStore';

export default function Pedido() {
  const { items } = useMenu();
  const [cantidades, setCantidades] = useState<Record<string, number>>({});

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

  return (
    <section id="pedido" className="pedido">
      <div className="seccion-titulo">
        <span className="etiqueta">PEDIDOS EN LÍNEA</span>
        <h2>Arma tu pedido</h2>
        <p>Elige tus productos disponibles y revisa tu pedido antes de pasar por él.</p>
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
              <button type="button" className="boton-secundario" onClick={() => setCantidades({})}>Vaciar pedido</button>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
