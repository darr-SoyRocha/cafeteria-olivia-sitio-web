# Cafetería Olivia — US-01 a US-16 (parcial)

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
- US-11a: Pedido en línea (primera parte): ver los productos disponibles, armar el pedido y revisar el total.
- US-11b: Confirmación del pedido: nombre, teléfono, hora de recogida y notas; genera un folio, muestra el resumen y permite enviarlo por WhatsApp. El pago se hace en tienda.
- US-12: Panel de administración del menú: edita precios y disponibilidad y da de alta y de baja productos; los cambios se reflejan en el menú y en el pedido.
- US-13 (demostración): Programa de lealtad con registro por nombre y teléfono, 1 punto por cada $10 de pedidos confirmados, consulta de puntos y canje de cortesías. Los puntos se guardan solo en el navegador; un programa real requiere backend.
- US-14: Blog de noticias y eventos ordenado por fecha, con filtro por tipo; el administrador puede publicar y eliminar entradas desde el panel.
- US-15: Autenticación real del administrador: inicio de sesión con correo y contraseña (Supabase Auth). Iniciar sesión no basta: la cuenta debe estar registrada en la tabla de administradores.
- US-16 (parcial): El menú y el blog se guardan en una base de datos en el servidor (Supabase), por lo que se ven igual en cualquier dispositivo. Las reglas de seguridad de la base permiten leer a cualquiera y escribir solo a administradores. Los pedidos y los puntos de lealtad siguen guardándose únicamente en el navegador.
- Mejoras del Sprint 5: menú de navegación tipo hamburguesa en celular, número de WhatsApp definido en un solo archivo (src/config.ts), indicador de foco para teclado y título de la página corregido.


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
├── AdminMenu.tsx
├── AdminBlog.tsx
├── Blog.tsx
├── Lealtad.tsx
├── config.ts
├── supabase.ts
├── authStore.ts
├── AuthProvider.tsx
├── datosMenu.ts
├── menuStore.ts
├── MenuProvider.tsx
├── datosBlog.ts
├── blogStore.ts
├── BlogProvider.tsx
├── lealtadStore.ts
├── LealtadProvider.tsx
├── almacen.ts
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

## Servidor (Supabase)

El proyecto usa Supabase para el inicio de sesión del administrador y para guardar el menú y el blog. Las tablas son menu_items, blog_entradas y administradores, todas con seguridad por filas activada. La URL y la llave pública del proyecto están en src/config.ts (la llave pública está pensada para ir en el navegador). Si no hay conexión, el sitio muestra el menú y las publicaciones base.

Para dar de alta a un administrador se crea el usuario en Authentication → Users del panel de Supabase y se agrega su identificador a la tabla administradores.

## Ejecutar

npm install
npm run dev

## Compilar

npm run build
