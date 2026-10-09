export function Ubicacion() {
  const direccion = 'C. Hidalgo 52, Tamazula, 49650 Tamazula de Gordiano, Jalisco';
  const mapsQuery = encodeURIComponent(`Cafetería Olivia, ${direccion}`);

  const horarios = [
    { dia: 'Lunes a viernes', horas: '8:00 am – 9:00 pm' },
    { dia: 'Sábado', horas: '9:00 am – 10:00 pm' },
    { dia: 'Domingo', horas: '9:00 am – 6:00 pm' },
  ];

  return (
    <section id="ubicacion" className="ubicacion">
      <div className="seccion-titulo">
        <span className="etiqueta">VISÍTANOS</span>
        <h2>Ubicación y horarios</h2>
        <p>Te esperamos con una taza recién hecha.</p>
      </div>

      <div className="ubicacion-contenido">
        <div className="ubicacion-mapa">
          <iframe
            title="Mapa de Cafetería Olivia"
            src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="ubicacion-info">
          <div className="ubicacion-bloque">
            <h3>Dirección</h3>
            <p>{direccion}</p>
            <a
              className="boton-secundario"
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noreferrer"
            >
              Cómo llegar
            </a>
          </div>

          <div className="ubicacion-bloque">
            <h3>Horario de atención</h3>
            <ul className="lista-horarios">
              {horarios.map((h) => (
                <li key={h.dia}>
                  <span>{h.dia}</span>
                  <span>{h.horas}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
