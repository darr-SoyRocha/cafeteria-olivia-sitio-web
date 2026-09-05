import { useState } from 'react';

type Mensaje = {
  autor: 'cliente' | 'olivia';
  texto: string;
};

const NUMERO_WHATSAPP = '523411218786';

const RESPUESTAS_AUTOMATICAS = [
  '¡Gracias por escribirnos! Un miembro del equipo de Cafetería Olivia te responderá en breve por WhatsApp ☕',
  'Recibimos tu mensaje. Nuestro horario de atención es de 8:00 am a 9:00 pm.',
  '¿Quieres apartar una mesa o hacer un pedido para recoger? Cuéntanos para cuántas personas y a qué hora.',
];

export function WhatsApp() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      autor: 'olivia',
      texto: 'Hola 👋 Bienvenido a Cafetería Olivia. ¿En qué te podemos ayudar hoy?',
    },
  ]);
  const [texto, setTexto] = useState('');

  const enviarMensaje = () => {
    const mensaje = texto.trim();
    if (mensaje === '') return;

    const respuesta =
      RESPUESTAS_AUTOMATICAS[mensajes.length % RESPUESTAS_AUTOMATICAS.length];

    setMensajes((prev) => [
      ...prev,
      { autor: 'cliente', texto: mensaje },
      { autor: 'olivia', texto: respuesta },
    ]);
    setTexto('');
  };

  const enlaceWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
    'Hola, quisiera más información sobre Cafetería Olivia.',
  )}`;

  return (
    <div className="whatsapp-widget">
      {abierto && (
        <div className="whatsapp-panel" role="dialog" aria-label="Chat de atención al cliente">
          <div className="whatsapp-panel-header">
            <div>
              <strong>Cafetería Olivia</strong>
              <span>Simulación de atención al cliente</span>
            </div>
            <button
              type="button"
              className="whatsapp-cerrar"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar chat"
            >
              ×
            </button>
          </div>

          <div className="whatsapp-mensajes">
            {mensajes.map((m, i) => (
              <div key={i} className={`whatsapp-mensaje ${m.autor}`}>
                {m.texto}
              </div>
            ))}
          </div>

          <div className="whatsapp-form">
            <input
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
              placeholder="Escribe tu mensaje..."
              aria-label="Escribe tu mensaje"
            />
            <button type="button" onClick={enviarMensaje}>
              Enviar
            </button>
          </div>

          <a
            className="whatsapp-real"
            href={enlaceWhatsApp}
            target="_blank"
            rel="noreferrer"
          >
            Continuar por WhatsApp real →
          </a>
        </div>
      )}

      <button
        type="button"
        className="whatsapp-boton"
        onClick={() => setAbierto((v) => !v)}
        aria-label="Abrir chat de WhatsApp"
      >
        💬
      </button>
    </div>
  );
}
