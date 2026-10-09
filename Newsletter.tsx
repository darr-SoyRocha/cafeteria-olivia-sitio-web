import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section id="newsletter" className="newsletter">
      <div className="seccion-titulo">
        <span className="etiqueta">NUESTRAS NOVEDADES</span>
        <h2>Promociones y novedades</h2>
        <p>Suscríbete para enterarte de promociones y nuevos productos.</p>
      </div>

      <form className="newsletter-form" onSubmit={subscribe}>
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" aria-label="Correo electrónico" />
        <button className="boton-primario" type="submit">Suscribirme</button>
      </form>
      {subscribed && <p className="form-success">¡Suscripción registrada correctamente!<br></br>Recibirás nuestras últimas novedades y promociones por correo electrónico. <br></br>¡Muchas gracias por confiar en nosotros!</p>}
    </section>
  );
}
