export type Categoria = 'bebida' | 'postre';

export type ItemMenu = {
  id: string;
  categoria: Categoria;
  nombre: string;
  precio: number;
  descripcion: string;
  disponible: boolean;
  imagen: string;
};

export const menuInicial: ItemMenu[] = [
  { id: 'americano', categoria: 'bebida', nombre: 'Americano', precio: 60, descripcion: 'Café intenso y equilibrado.', disponible: true, imagen: '/images/americano.jpg' },
  { id: 'latte', categoria: 'bebida', nombre: 'Latte', precio: 80, descripcion: 'Espresso suave con leche cremosa.', disponible: true, imagen: '/images/latte.jpg' },
  { id: 'cappuccino', categoria: 'bebida', nombre: 'Cappuccino', precio: 85, descripcion: 'Espuma de leche y espresso.', disponible: true, imagen: '/images/cappuccino.jpg' },
  { id: 'espresso', categoria: 'bebida', nombre: 'Espresso', precio: 70, descripcion: 'Pequeño, intenso y aromático.', disponible: true, imagen: '/images/espresso.jpg' },
  { id: 'moka', categoria: 'bebida', nombre: 'Moka', precio: 90, descripcion: 'Espresso, chocolate y leche.', disponible: false, imagen: '/images/moka.jpg' },
  { id: 'chocolate', categoria: 'bebida', nombre: 'Chocolate caliente', precio: 80, descripcion: 'Chocolate cremoso y reconfortante.', disponible: true, imagen: '/images/chocolate.jpg' },
  { id: 'croissant', categoria: 'postre', nombre: 'Croissant', precio: 35, descripcion: 'Horneado, ligero y crujiente.', disponible: true, imagen: '/images/croissant.jpg' },
  { id: 'muffin', categoria: 'postre', nombre: 'Muffin', precio: 50, descripcion: 'Dulce, suave y recién horneado.', disponible: true, imagen: '/images/muffin.jpg' },
  { id: 'pastel-chocolate', categoria: 'postre', nombre: 'Rebanada de pastel de chocolate', precio: 60, descripcion: 'Húmedo y delicioso, con extra de chocolate.', disponible: true, imagen: '/images/pastel-chocolate.jpg' },
  { id: 'pastel-cafe', categoria: 'postre', nombre: 'Rebanada de pastel de capuchino', precio: 60, descripcion: 'Intenso y sabroso.', disponible: false, imagen: '/images/pastel-cafe.jpg' },
  { id: 'sandwich', categoria: 'postre', nombre: 'Sándwich', precio: 65, descripcion: 'Una opción práctica y deliciosa.', disponible: true, imagen: '/images/sandwich.jpg' },
];
