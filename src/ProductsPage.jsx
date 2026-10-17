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

      <a href={WA_LINK} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">💬</a>
    </>
  );
}
