const socialLinks = [
  { name: 'Instagram', icon: '◎', url: 'https://www.instagram.com/' },
  { name: 'Facebook', icon: 'f', url: 'https://www.facebook.com/' },
  { name: 'TikTok', icon: '♪', url: 'https://www.tiktok.com/' },
] as const;

export default function RedesSociales() {
  return (
    <section id="redes" className="redes">
      <div className="seccion-titulo">
        <span className="etiqueta">REDES SOCIALES</span>
        <h2>Síguenos en redes</h2>
        <p>Encuentra publicaciones, novedades y contenido de Cafetería Olivia.</p>
      </div>

      <div className="redes-grid">
        {socialLinks.map((social) => (
          <a className="red-social-card" href={social.url} target="_blank" rel="noreferrer" key={social.name}>
            <span className="red-social-icon">{social.icon}</span>
            <strong>{social.name}</strong>
            <span>Ver publicaciones →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
