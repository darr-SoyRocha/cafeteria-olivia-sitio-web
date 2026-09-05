import { useState } from 'react';

export function Opiniones() {
  const [opiniones, setOpiniones] = useState<string[]>([
    'Excelente café y delicioso pastel, me encantó ♥',
    'El latte estuvo delicioso, volveré pronto :)',
  ]);
  const [nuevaOpinion, setNuevaOpinion] = useState('');

  const agregarOpinion = () => {
    if (nuevaOpinion.trim() !== '') {
      setOpiniones([...opiniones, nuevaOpinion.trim()]);
      setNuevaOpinion('');
    }
  };

  return (
    <section id="opiniones" className="opiniones">
      <div className="seccion-titulo">
        <span className="etiqueta">CONOCE LO QUE DICEN NUESTROS CLIENTES</span>
        <h2>Reseñas y opiniones</h2>
      </div>

      <div className="opiniones-contenido">
        <div className="opiniones-lista">
          {opiniones.map((opinion, index) => (
            <article className="opinion-card" key={`${opinion}-${index}`}>
              <div className="estrellas">★★★★★</div>
              <p>“{opinion}”</p>
              <span className="opinion-autor">Cliente frecuente</span>
            </article>
          ))}
        </div>

        <div className="opinion-form">
          <h3>Comparte tu experiencia</h3>
          <p>Tu opinión nos ayuda a seguir mejorando.</p>
          <textarea
            value={nuevaOpinion}
            onChange={(e) => setNuevaOpinion(e.target.value)}
            placeholder="Escribe tu opinión aquí..."
            rows={5}
          />
          <button className="boton-primario" onClick={agregarOpinion}>
            Enviar reseña
          </button>
        </div>
      </div>
    </section>
  );
}
