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
            <a href="tel:+919737667050" className="cp-value">+91 97376 67050</a>
            <a href={`tel:${PHONE}`} className="btn btn-neon cp-btn">{c.callNow}</a>
          </Reveal>

          <Reveal className="cp-card">
            <div className="cp-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.27 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.77-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z"/></svg></div>
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
        <div className="footer-cities">Vadodara · Godhra · Lunawada</div><div className="footer-social"><a href="https://www.instagram.com/_niksdigital?fqnt=aDZmcjloejI0ajc3" target="_blank" rel="noopener" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg></a><a href="https://whatsapp.com/channel/0029Vb9iQpzEwEjtGaKsMw3z" target="_blank" rel="noopener" aria-label="WhatsApp Channel"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.27 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.77-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z"/></svg></a></div>
        <p className="copy">© {new Date().getFullYear()} NIK'S DIGITAL. {t.rights}</p><p className="copy dev-credit">Designed &amp; developed by D. Kachhia</p>
      </footer>

      <a href={WA_LINK} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp"><svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.27 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.77-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z"/></svg></a>
    </>
  );
}
