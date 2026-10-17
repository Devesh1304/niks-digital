import { Reveal } from './App.jsx';

const PHONE = '+919979705570';
const PHONE_DISPLAY = '+91 99797 05570';
const WA_LINK = `https://wa.me/919979705570?text=${encodeURIComponent("Hi NIK'S DIGITAL! I'd like to discuss digital branding.")}`;

const LOCATIONS = [
  { city: 'Vadodara', query: 'Vadodara, Gujarat' },
  { city: 'Godhra', query: 'Godhra, Gujarat' },
  { city: 'Lunawada', query: 'Lunawada, Gujarat' },
];

const mapsLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export default function ContactPage({ t, lang }) {
  const c = t.contactPage;

  return (
    <>
      {/* Header band */}
      <section className="cp-hero">
        <div className="hero-glow" />
        <Reveal className="cp-hero-inner">
          <span className="eyebrow">{c.eyebrow}</span>
          <h1>{c.title}</h1>
          <p>{c.sub}</p>
        </Reveal>
      </section>

      {/* Quick actions */}
      <section className="cp-actions">
        <Reveal className="cp-action-row">
          <a href={`tel:${PHONE}`} className="btn btn-neon">{c.callNow}</a>
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-solid">{c.whatsappNow}</a>
          <a href="./#contact" className="btn btn-neon">{c.formCta}</a>
        </Reveal>
      </section>

      {/* Contact cards */}
      <section className="cp-cards-wrap">
        <div className="cp-cards">
          <Reveal className="cp-card">
            <div className="cp-icon">📞</div>
            <h3>{c.callTitle}</h3>
            <p>{c.callText}</p>
            <a href={`tel:${PHONE}`} className="cp-value">{PHONE_DISPLAY}</a>
            <a href={`tel:${PHONE}`} className="btn btn-neon cp-btn">{c.callNow}</a>
          </Reveal>

          <Reveal className="cp-card">
            <div className="cp-icon">💬</div>
            <h3>{c.waTitle}</h3>
            <p>{c.waText}</p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="cp-value">{PHONE_DISPLAY}</a>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-solid cp-btn">{c.whatsappNow}</a>
          </Reveal>

          <Reveal className="cp-card">
            <div className="cp-icon">🕒</div>
            <h3>{c.hoursTitle}</h3>
            <p className="cp-value">{c.hours}</p>
            <p className="cp-note">{c.hoursNote}</p>
          </Reveal>
        </div>

        <div className="cp-locations">
          {LOCATIONS.map((loc) => (
            <Reveal key={loc.city} className="cp-card cp-location">
              <div className="cp-icon">📍</div>
              <h3>{loc.city}</h3>
              <p>{c.officeLabel}</p>
              <a href={mapsLink(loc.query)} target="_blank" rel="noreferrer" className="btn btn-neon cp-btn">{c.openMaps}</a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="cp-map-section">
        <Reveal className="section-head">
          <h2>{c.mapTitle}</h2>
          <p>{c.mapSub}</p>
        </Reveal>
        <Reveal className="cp-map">
          <iframe
            title="NIK'S DIGITAL locations"
            src="https://www.google.com/maps?q=Lunawada,+Gujarat&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="footer">
        <img src="logo.png" alt="NIK'S DIGITAL" className="footer-logo" />
        <p className="footer-tag">{t.footerTag}</p>
        <div className="footer-cities">Vadodara · Godhra · Lunawada</div>
        <p className="copy">© {new Date().getFullYear()} NIK'S DIGITAL. {t.rights}</p>
      </footer>

      <a href={WA_LINK} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">💬</a>
    </>
  );
}
