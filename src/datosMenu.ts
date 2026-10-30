
export type Categoria =
  | 'cafe'
  | 'bebida'
  | 'panaderia'
  | 'postre';

export type ItemMenu = {
  id: string;
  categoria: Categoria;
  nombre: string;
  precio: number;
  descripcion: string;
  disponible: boolean;
  imagen?: string;
};

export const menuInicial: ItemMenu[] = [
  // CAFÉS CALIENTES
  {
    id: 'americano',
    categoria: 'cafe',
    nombre: 'Americano',
    precio: 60,
    descripcion: 'Café intenso y equilibrado.',
    disponible: true,
    imagen: '/images/americano.jpg'
  },
  {
    id: 'latte',
    categoria: 'cafe',
    nombre: 'Latte',
    precio: 80,
    descripcion: 'Espresso suave con leche cremosa.',
    disponible: true,
    imagen: '/images/latte.jpg'
  },
  {
    id: 'cappuccino',
    categoria: 'cafe',
    nombre: 'Cappuccino',
    precio: 85,
    descripcion: 'Espuma de leche y espresso.',
    disponible: true,
    imagen: '/images/cappuccino.jpg'
  },
  {
    id: 'espresso',
    categoria: 'cafe',
    nombre: 'Espresso',
    precio: 70,
    descripcion: 'Pequeño, intenso y aromático.',
    disponible: true,
    imagen: '/images/espresso.jpg'
  },
  {
    id: 'moka',
    categoria: 'cafe',
    nombre: 'Moka',
    precio: 90,
    descripcion: 'Espresso, chocolate y leche.',
    disponible: false,
    imagen: '/images/moka.jpg'
  },

  // BEBIDAS
  {
    id: 'chocolate',
    categoria: 'bebida',
    nombre: 'Chocolate caliente',
    precio: 80,
    descripcion: 'Chocolate cremoso y reconfortante.',
    disponible: true,
    imagen: '/images/chocolate.jpg'
  },
  {
    id: 'frappe',
    categoria: 'bebida',
    nombre: 'Frappé de café',
    precio: 85,
    descripcion: 'Bebida fría de café con hielo y leche.',
    disponible: true,
    imagen: '/images/frappe.jpg'
  },
  {
    id: 'cafe-helado',
    categoria: 'bebida',
    nombre: 'Café helado',
    precio: 75,
    descripcion: 'Café refrescante servido con hielo.',
    disponible: true,
    imagen: '/images/cafe-helado.jpg'
  },

  // PANADERÍA Y ALIMENTOS
  {
    id: 'croissant',
    categoria: 'panaderia',
    nombre: 'Croissant',
    precio: 35,
    descripcion: 'Horneado, ligero y crujiente.',
    disponible: true,
    imagen: '/images/croissant.jpg'
  },
  {
    id: 'muffin',
    categoria: 'panaderia',
    nombre: 'Muffin',
    precio: 50,
    descripcion: 'Dulce, suave y recién horneado.',
    disponible: true,
    imagen: '/images/muffin.jpg'
  },
  {
    id: 'sandwich',
    categoria: 'panaderia',
    nombre: 'Sándwich',
    precio: 65,
    descripcion: 'Una opción práctica y deliciosa.',
    disponible: true,
    imagen: '/images/sandwich.jpg'
  },

  // PASTELES Y POSTRES
  {
    id: 'pastel-chocolate',
    categoria: 'postre',
    nombre: 'Rebanada de pastel de chocolate',
    precio: 60,
    descripcion: 'Húmedo y delicioso, con extra de chocolate.',
    disponible: true,
    imagen: '/images/pastel-chocolate.jpg'
  },
  {
    id: 'pastel-cafe',
    categoria: 'postre',
    nombre: 'Rebanada de pastel de capuchino',
    precio: 60,
    descripcion: 'Intenso y sabroso.',
    disponible: false,
    imagen: '/images/pastel-cafe.jpg'
  },
  {
    id: 'cheesecake',
    categoria: 'postre',
    nombre: 'Cheesecake',
    precio: 65,
    descripcion: 'Pastel cremoso de queso con una base crujiente.',
    disponible: true,
    imagen: '/images/cheesecake.jpg'
  },
  {
    id: 'brownie',
    categoria: 'postre',
    nombre: 'Brownie de chocolate',
    precio: 45,
    descripcion: 'Bizcocho suave de chocolate con textura húmeda.',
    disponible: true,
    imagen: '/images/brownie.jpg'
  }
];
