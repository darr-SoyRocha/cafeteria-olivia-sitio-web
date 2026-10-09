import { useMenu } from './menuStore';
import type { ItemMenu } from './datosMenu';

export function Menu() {
  const { items } = useMenu();
  const bebidas = items.filter((item) => item.categoria === 'bebida');
  const postres = items.filter((item) => item.categoria === 'postre');

  return (
    <section id="menu" className="menu">
      <div className="seccion-titulo">
        <span className="etiqueta">NUESTRO MENÚ</span>
        <h2>Favoritos de la casa</h2>
        <p>Selecciona a tu gusto.</p>
      </div>

      <h3 className="menu-subtitulo">Bebidas</h3>
      <div className="menu-grid">
        {bebidas.map((item) => (
          <MenuCard key={item.id} item={item} icono="☕" />
        ))}
      </div>

      <h3 className="menu-subtitulo">Postres</h3>
      <div className="menu-grid">
        {postres.map((item) => (
          <MenuCard key={item.id} item={item} icono="🍰" />
        ))}
      </div>
    </section>
  );
}

function MenuCard({ item, icono }: { item: ItemMenu; icono: string }) {
  return (
    <article className={`menu-card ${item.disponible ? '' : 'agotado'}`}>
      <div className="menu-card-header">
        <h4>{item.nombre}</h4>
        <span className={`badge ${item.disponible ? 'badge-disponible' : 'badge-agotado'}`}>
          {item.disponible ? 'Disponible' : 'Agotado'}
        </span>
      </div>
      <div className="menu-card-precio">
        <img src={item.imagen} alt={item.nombre} />
        <span>{icono}</span>
        <span>${item.precio}</span>
      </div>
      <p>{item.descripcion}</p>
    </article>
  );
}
