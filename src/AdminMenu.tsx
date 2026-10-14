import { useState } from 'react';
import { useMenu } from './menuStore';
import type { Categoria } from './datosMenu';

export default function AdminMenu() {
  const { items, actualizarItem, agregarItem, eliminarItem, restablecer } = useMenu();
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState<Categoria>('bebida');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [aviso, setAviso] = useState('');

  const alta = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valor = Number(precio);
    if (!nombre.trim() || !Number.isFinite(valor) || valor <= 0) return;
    agregarItem({ nombre, categoria, precio: valor, descripcion });
    setAviso(`Se agregó "${nombre.trim()}" al menú.`);
    setNombre('');
    setPrecio('');
    setDescripcion('');
  };

  const baja = (id: string, nombreItem: string) => {
    if (!window.confirm(`¿Eliminar "${nombreItem}" del menú?`)) return;
    eliminarItem(id);
    setAviso(`Se eliminó "${nombreItem}" del menú.`);
  };

  return (
    <>
      <form className="formulario-extra admin-alta" onSubmit={alta}>
        <h3>Agregar producto</h3>
        <div className="formulario-grid">
          <label>Nombre
            <input required value={nombre} onChange={(e) => setNombre(e.target.value)} maxLength={60} />
          </label>
          <label>Categoría
            <select value={categoria} onChange={(e) => setCategoria(e.target.value as Categoria)}>
              <option value="bebida">Bebida</option>
              <option value="postre">Postre</option>
            </select>
          </label>
          <label>Precio ($)
            <input required type="number" min="1" max="9999" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          </label>
          <label>Descripción
            <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} maxLength={90} />
          </label>
        </div>
        <button className="boton-primario" type="submit">Agregar al menú</button>
      </form>

      {aviso && <p className="form-success" role="status">{aviso}</p>}

      <table className="admin-tabla">
        <thead>
          <tr><th>Producto</th><th>Categoría</th><th>Precio ($)</th><th>Disponible</th><th>Acción</th></tr>
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
              <td>
                <button type="button" className="boton-peligro" onClick={() => baja(item.id, item.nombre)} aria-label={`Eliminar ${item.nombre}`}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="admin-acciones">
        <button type="button" className="boton-secundario" onClick={restablecer}>Restablecer menú original</button>
      </div>
    </>
  );
}
