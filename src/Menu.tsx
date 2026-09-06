type ItemMenu = {
  nombre: string;
  precio: number;
  descripcion: string;
  disponible: boolean;
  imagen: string;
};

export function Menu() {
  const bebidas: ItemMenu[] = [
    { nombre: 'Americano', precio: 60, descripcion: 'Café intenso y equilibrado.', disponible: true, imagen: 'americano.jpg' },
    { nombre: 'Latte', precio: 80, descripcion: 'Espresso suave con leche cremosa.', disponible: true, imagen: 'latte.jpg' },
    { nombre: 'Cappuccino', precio: 85, descripcion: 'Espuma de leche y espresso.', disponible: true, imagen: 'cappuccino.jpg'},
    { nombre: 'Espresso', precio: 70, descripcion: 'Pequeño, intenso y aromático.', disponible: true, imagen: 'espresso.jpg' },
    { nombre: 'Moka', precio: 90, descripcion: 'Espresso, chocolate y leche.', disponible: false, imagen: 'moka.jpg' },
    { nombre: 'Chocolate caliente', precio: 80, descripcion: 'Chocolate cremoso y reconfortante.', disponible: true, imagen: 'chocolate caliente.jpg' },
  ];

  const postres: ItemMenu[] = [
    { nombre: 'Croissant', precio: 35, descripcion: 'Horneado, ligero y crujiente.', disponible: true, imagen: 'croissant.jpg' },
    { nombre: 'Muffin', precio: 50, descripcion: 'Dulce, suave y recién horneado.', disponible: true, imagen: 'muffin.jpg' },
    { nombre: 'Rebanada de pastel de chocolate', precio: 60, descripcion: 'Húmedo y delicioso, con extra de chocolate.', disponible: true, imagen: 'pastel de chocolate.jpg' },
    { nombre: 'Rebanada de pastel de capuchino', precio: 60, descripcion: 'Intenso y sabroso.', disponible: false, imagen: 'pastel cafe.jpg' },
    { nombre: 'Sándwich', precio: 65, descripcion: 'Una opción práctica y deliciosa.', disponible: true, imagen: 'sandwich.jpg' },
  ];

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
          <MenuCard key={item.nombre} item={item} icono="☕" />
        ))}
      </div>

      <h3 className="menu-subtitulo">Postres</h3>
      <div className="menu-grid">
        {postres.map((item) => (
          <MenuCard key={item.nombre} item={item} icono="🍰" />
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
        <span
          className={`badge ${item.disponible ? 'badge-disponible' : 'badge-agotado'}`}
        >
          {item.disponible ? 'Disponible' : 'Agotado'}
        </span>
      </div>
      <div className="menu-card-precio">
        <img src={`images/${item.imagen}`} alt={item.nombre} />
        <span>{icono}</span>
        <span>${item.precio}</span>
      </div>
      <p>{item.descripcion}</p>
    </article>
  );
}
