# Cafetería Olivia — US-01 a US-10

Sitio web desarrollado con React + TypeScript + Vite.

Esta versión conserva el diseño visual, paleta, componentes y las imágenes locales del proyecto de referencia de Cafetería Olivia, y además integra las historias US-06 a US-10.

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

## Estructura principal

```text
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
```

## Ejecutar

```bash
npm install
npm run dev
```

## Compilar

```bash
npm run build
```
