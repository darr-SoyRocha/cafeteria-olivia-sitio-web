import { useState } from 'react';

export default function Reservaciones() {
  const [sent, setSent] = useState(false);

  const submitReservation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="reservaciones" className="reservaciones">
      <div className="seccion-titulo">
        <span className="etiqueta">CONTACTO</span>
        <h2>Reservaciones y eventos</h2>
        <p>Envíanos los datos de tu solicitud y nos pondremos en contacto contigo.</p>
      </div>

      <form className="formulario-extra" onSubmit={submitReservation}>
        <div className="formulario-grid">
          <label>Nombre<input required name="name" placeholder="Tu nombre" /></label>
          <label>Correo electrónico<input required type="email" name="email" placeholder="correo@ejemplo.com" /></label>
          <label>Fecha<input required type="date" name="date" /></label>
          <label>Número de personas<input required type="number" min="1" max="50" name="people" placeholder="2" /></label>
        </div>
        <label>Tipo de solicitud
          <select name="type" defaultValue="Reservación">
            <option>Reservación</option>
            <option>Evento privado</option>
            <option>Otro</option>
          </select>
        </label>
        <label>Mensaje<textarea required name="message" rows={5} placeholder="Cuéntanos qué necesitas..." /></label>
        <button className="boton-primario" type="submit">Enviar solicitud</button>
        {sent && <p className="form-success">Solicitud registrada correctamente.</p>}
      </form>
    </section>
  );
}
