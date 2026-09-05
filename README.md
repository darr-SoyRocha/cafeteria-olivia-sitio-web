# ☕ Cafetería Olivia — Sitio Web

Este es el sitio web que armamos para **Cafetería Olivia**, como parte de la Actividad Integradora de Proyectos 2 ("Sprint, el corazón de SCRUM"). Tomamos el Product Backlog y Sprint Backlog que ya habíamos trabajado y lo llevamos a código real con **React + TypeScript + Vite**.

## Equipo

- Diego Rocha
- Yan Vicente Silva Huerta
- Leonardo Filiberto López Arvizu

## Qué tiene el sitio

- **Inicio** — la presentación de la cafetería, con sus botones para ir al menú o a las opiniones.
- **Menú** — bebidas y postres, con precio, descripción y si está disponible o agotado.
- **Ubicación y horarios** — dónde estamos, mapa y a qué hora abrimos cada día.
- **Opiniones** — lo que dicen los clientes, más un formulario para dejar tu propia reseña.
- **WhatsApp** — un botón flotante que simula la atención al cliente (con respuestas automáticas) y también deja abrir WhatsApp real para escribirnos.

## Cómo correrlo en tu compu

Necesitas tener Node.js instalado (versión 18 o más nueva).

```bash
npm install
npm run dev
```

Y ya, se abre en `http://localhost:5173`.

Si quieres ver la versión final optimizada:

```bash
npm run build
npm run preview
```

## Cómo está organizado

```
src/
  App.tsx         El layout general: header, menú de navegación, secciones y footer
  inicio.tsx       Sección de inicio
  Menu.tsx         Sección de menú
  Ubicacion.tsx    Sección de ubicación y horarios
  Opiniones.tsx    Sección de reseñas
  WhatsApp.tsx     El botoncito flotante de WhatsApp
  App.css / index.css   Los estilos de todo el sitio
```

## Sobre el proceso

El Product Backlog, las fichas de cada historia y la calendarización de los sprints están documentados aparte, en el reporte que subimos a la plataforma del curso. El avance del equipo lo llevamos en Trello.
