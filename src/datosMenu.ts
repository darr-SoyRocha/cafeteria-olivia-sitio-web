
export type Categoria = 'caliente' | 'fria' | 'panaderia' | 'postre';

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
  // Bebidas calientes
  {
    id: 'americano',
    categoria: 'caliente',
    nombre: 'Americano',
    precio: 60,
    descripcion: 'Café intenso y equilibrado.',
    disponible: true,
    imagen: '/images/americano.jpg'
  },
  {
    id: 'latte',
    categoria: 'caliente',
    nombre: 'Latte',
    precio: 80,
    descripcion: 'Espresso suave con leche cremosa.',
    disponible: true,
    imagen: '/images/latte.jpg'
  },
  {
    id: 'cappuccino',
    categoria: 'caliente',
    nombre: 'Cappuccino',
    precio: 85,
    descripcion: 'Espuma de leche y espresso.',
    disponible: true,
    imagen: '/images/cappuccino.jpg'
  },
  {
    id: 'espresso',
    categoria: 'caliente',
    nombre: 'Espresso',
    precio: 70,
    descripcion: 'Pequeño, intenso y aromático.',
    disponible: true,
    imagen: '/images/espresso.jpg'
  },
  {
    id: 'moka',
    categoria: 'caliente',
    nombre: 'Moka',
    precio: 90,
    descripcion: 'Espresso, chocolate y leche.',
    disponible: false,
    imagen: '/images/moka.jpg'
  },
  {
    id: 'chocolate',
    categoria: 'caliente',
    nombre: 'Chocolate caliente',
    precio: 80,
    descripcion: 'Chocolate cremoso y reconfortante.',
    disponible: true,
    imagen: '/images/chocolate.jpg'
  },
  {
    id: 'macchiato',
    categoria: 'caliente',
    nombre: 'Macchiato',
    precio: 75,
    descripcion: 'Espresso con un toque de leche.',
    disponible: true,
    imagen: '/images/macchiato.jpg'
  },
  {
    id: 'cafe-vainilla',
    categoria: 'caliente',
    nombre: 'Café con vainilla',
    precio: 85,
    descripcion: 'Café con leche y un toque de vainilla.',
    disponible: true,
    imagen: '/images/cafe-vainilla.jpg'
  },

  // Bebidas frías
  {
    id: 'cafe-helado',
    categoria: 'fria',
    nombre: 'Café helado',
    precio: 75,
    descripcion: 'Café preparado con hielo.',
    disponible: true,
    imagen: '/images/cafe-helado.jpg'
  },
  {
    id: 'frappe-cafe',
    categoria: 'fria',
    nombre: 'Frappé de café',
    precio: 90,
    descripcion: 'Bebida fría de café con hielo.',
    disponible: true,
    imagen: '/images/frappe-cafe.jpg'
  },
  {
    id: 'frappe-chocolate',
    categoria: 'fria',
    nombre: 'Frappé de chocolate',
    precio: 95,
    descripcion: 'Bebida fría con chocolate cremoso.',
    disponible: true,
    imagen: '/images/frappe-chocolate.jpg'
  },
  {
    id: 'frappe-vainilla',
    categoria: 'fria',
    nombre: 'Frappé de vainilla',
    precio: 90,
    descripcion: 'Bebida fría cremosa con sabor a vainilla.',
    disponible: true,
    imagen: '/images/frappe-vainilla.jpg'
  },
  {
    id: 'te-helado',
    categoria: 'fria',
    nombre: 'Té helado',
    precio: 55,
    descripcion: 'Té refrescante servido con hielo.',
    disponible: true,
    imagen: '/images/te-helado.jpg'
  },
  {
    id: 'limonada',
    categoria: 'fria',
    nombre: 'Limonada',
    precio: 50,
    descripcion: 'Bebida fresca preparada con limón.',
    disponible: true,
    imagen: '/images/limonada.jpg'
  },

  // Panadería y alimentos
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
  {
    id: 'chapata',
    categoria: 'panaderia',
    nombre: 'Chapata',
    precio: 80,
    descripcion: 'Pan suave preparado con ingredientes frescos.',
    disponible: true,
    imagen: '/images/chapata.jpg'
  },
  {
    id: 'pan-ajo',
    categoria: 'panaderia',
    nombre: 'Pan de ajo',
    precio: 45,
    descripcion: 'Pan horneado con mantequilla y ajo.',
    disponible: true,
    imagen: '/images/pan-ajo.jpg'
  },

  // Pasteles y postres
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
    descripcion: 'Pastel de queso suave y cremoso.',
    disponible: true,
    imagen: '/images/cheesecake.jpg'
  },
  {
    id: 'brownie',
    categoria: 'postre',
    nombre: 'Brownie',
    precio: 45,
    descripcion: 'Postre de chocolate suave y delicioso.',
    disponible: true,
    imagen: '/images/brownie.jpg'
  },
  ];
