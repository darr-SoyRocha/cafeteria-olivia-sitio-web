import { useState } from 'react';
import { useMenu } from './menuStore';

// Acceso de demostración: valida en el navegador, no sustituye una autenticación real con backend.
const PIN_DEMO = '1234';

export default function Admin() {
  const { items, actualizarItem, restablecer } = useMenu();
  const [autorizado, setAutorizado] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const entrar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pin === PIN_DEMO) {
      setAutorizado(true);
      setError(false);
    } else {
      setError(true);
    }
    setPin('');
  };

  return (
    <section id="admin" className="admin">
      <div className="seccion-titulo">
        <span className="etiqueta">ADMINISTRACIÓN</span>
        <h2>Panel del menú</h2>
        <p>Actualiza precios y disponibilidad sin tocar el código.</p>
      </div>

      {!autorizado ? (
        <form className="admin-acceso" onSubmit={entrar}>
          <label>PIN de administrador
            <input type="password" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="••••" required />
          </label>
          <button className="boton-primario" type="submit">Entrar</button>
          {error && <p className="form-error">PIN incorrecto. Intenta de nuevo.</p>}
        </form>
      ) : (
        <div className="admin-panel">
          <table className="admin-tabla">
            <thead>
              <tr><th>Producto</th><th>Categoría</th><th>Precio ($)</th><th>Disponible</th></tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.categoria === 'bebida' ? 'Bebida' : 'Postre'}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="9999"
                      value={item.precio}
                      aria-label={`Precio de ${item.nombre}`}
                      onChange={(e) => {
                        const valor = Number(e.target.value);
                        if (Number.isFinite(valor) && valor > 0) actualizarItem(item.id, { precio: valor });
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.disponible}
                      aria-label={`${item.nombre} disponible`}
                      onChange={(e) => actualizarItem(item.id, { disponible: e.target.checked })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="admin-acciones">
            <button type="button" className="boton-secundario" onClick={restablecer}>Restablecer menú original</button>
            <button type="button" className="boton-secundario" onClick={() => setAutorizado(false)}>Cerrar sesión</button>
          </div>
        </div>
      )}
    </section>
  );
}
