import { Reveal } from './App.jsx';

const WA_LINK = `https://wa.me/919979705570?text=${encodeURIComponent("Hi NIK'S DIGITAL! I'd like a quote for a digital display.")}`;
const ICONS = ['🖥️', '📺'];
const ADV_ICONS = ['♾️', '⚡', '🌙', '🌿', '💰', '🛠️'];

export default function ProductsPage({ t }) {
  const p = t.productsPage;

  return (
    <>
      {/* Header band */}
      <section className="cp-hero">
        <div className="hero-glow" />
        <Reveal className="cp-hero-inner">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.title}</h1>
          <p>{p.sub}</p>
          <div className="cp-action-row" style={{ marginTop: 30 }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-neon">{p.quoteBtn}</a>
            <a href="./#/contact" className="btn btn-solid">{t.contact}</a>
          </div>
        </Reveal>
      </section>

      <section className="sv-intro">
        <Reveal><p>{p.intro}</p></Reveal>
      </section>

      {/* Product cards */}
      <section className="pd-list">
        {p.items.map((item, i) => (
          <Reveal key={item.title} className={`pd-card ${i % 2 === 1 ? 'reverse' : ''}`}>
            <div className="pd-media">
              <img src={`posters/${item.image}`} alt={item.title} loading="lazy" />
            </div>
            <div className="pd-body">
              <span className="pd-tag">{ICONS[i]} {item.tag}</span>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>

              <div className="pd-row">
                <div className="pd-panel">
                  <h4>{p.featuresLabel}</h4>
                  <ul className="sv-checks">
                    {item.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
                <div className="pd-panel">
                  <h4>{p.sizesLabel}</h4>
                  <p className="pd-sizes">{p.sizesValue}</p>
                </div>
              </div>

              <div className="cp-action-row pd-actions">
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-neon">{p.quoteBtn}</a>
                <a href="./#/contact" className="btn btn-solid">{p.specsBtn}</a>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Advantages */}
      <section className="sv-why">
        <Reveal className="section-head">
          <h2>{p.advantagesTitle}</h2>
          <p>{p.advantagesSub}</p>
        </Reveal>
        <div className="cp-cards">
          {p.advantages.map(([title, text], i) => (
            <Reveal key={title} className="cp-card">
              <div className="cp-icon">{ADV_ICONS[i]}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="sv-faq">
        <Reveal className="section-head">
          <h2>{p.faqTitle}</h2>
        </Reveal>
        <div className="sv-faq-list">
          {p.faqs.map(([q, a]) => (
            <Reveal key={q}>
              <details className="sv-faq-item">
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <Reveal className="ab-cta-box">
          <h2>{p.ctaTitle}</h2>
          <p>{p.ctaText}</p>
          <div className="cp-action-row">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-neon">{p.quoteBtn}</a>
            <a href="./#/contact" className="btn btn-solid">{t.contact}</a>
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <img src="logo.png" alt="NIK'S DIGITAL" className="footer-logo" />
        <p className="footer-tag">{t.footerTag}</p>
        <div className="footer-cities">Vadodara · Godhra · Lunawada</div>
        <p className="copy">© {new Date().getFullYear()} NIK'S DIGITAL. {t.rights}</p>
      </footer>

      <a href={WA_LINK} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp"><svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.27 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.77-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z"/></svg></a>
    </>
  );
}
