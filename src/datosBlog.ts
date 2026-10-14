export type TipoEntrada = 'noticia' | 'evento';

export type EntradaBlog = {
  id: string;
  tipo: TipoEntrada;
  titulo: string;
  fecha: string; // formato AAAA-MM-DD
  texto: string;
};

export const blogInicial: EntradaBlog[] = [
  {
    id: 'apertura-menu-otono',
    tipo: 'noticia',
    titulo: 'Llega el menú de otoño',
    fecha: '2026-10-01',
    texto: 'Estrenamos bebidas de temporada con canela y piloncillo. Pregunta por ellas en el mostrador o arma tu pedido en línea.',
  },
  {
    id: 'taller-latte-art',
    tipo: 'evento',
    titulo: 'Taller de latte art para principiantes',
    fecha: '2026-10-17',
    texto: 'Sábado por la tarde: aprenderás a texturizar la leche y dibujar un corazón en tu taza. Cupo limitado.',
  },
  {
    id: 'horario-dia-muertos',
    tipo: 'noticia',
    titulo: 'Horario especial por Día de Muertos',
    fecha: '2026-10-28',
    texto: 'Del 1 al 2 de noviembre habrá pan de muerto y chocolate caliente. Te compartiremos el horario con anticipación.',
  },
];
