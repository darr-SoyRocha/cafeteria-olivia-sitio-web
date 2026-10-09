# Cafetería Olivia — US-01 a US-12

Sitio web desarrollado con React + TypeScript + Vite.

## Historias implementadas

- US-01: Página de inicio.
- US-02: Menú digital con bebidas, postres, precios, disponibilidad e imágenes locales.
- US-03: Diseño responsivo.
- US-04: Ubicación, horarios y Google Maps.
- US-05: Contacto por WhatsApp.
- US-06: Formulario de reservaciones y eventos privados.
- US-07: Reseñas y calificaciones.
- US-08: Galería de fotografías utilizando las imágenes locales del proyecto.
- US-09: Suscripción al newsletter.
- US-10: Enlaces a redes sociales.
- US-11a: Pedido en línea (primera parte): ver los productos disponibles, armar el pedido y revisar el total. Falta el envío del pedido (US-11b).
- US-12 (base): Panel de administración del menú con acceso por PIN de demostración; permite editar precios y disponibilidad, y los cambios se reflejan en el menú y en el pedido. Falta autenticación real con backend.

## Estructura principal

src/
├── App.tsx
├── inicio.tsx
├── Menu.tsx
├── Ubicacion.tsx
├── Opiniones.tsx
├── WhatsApp.tsx
├── Reservaciones.tsx
├── Galeria.tsx
├── Newsletter.tsx
├── RedesSociales.tsx
├── Pedido.tsx
├── Admin.tsx
├── datosMenu.ts
├── menuStore.ts
├── MenuProvider.tsx
├── App.css
├── index.css
└── main.tsx

public/
└── images/
    ├── americano.jpg
    ├── cappuccino.jpg
    ├── chocolate.jpg
    ├── croissant.jpg
    ├── espresso.jpg
    ├── latte.jpg
    ├── moka.jpg
    ├── muffin.jpg
    ├── pastel-cafe.jpg
    ├── pastel-chocolate.jpg
    └── sandwich.jpg

## Ejecutar

npm install
npm run dev

## Compilar

npm run build
