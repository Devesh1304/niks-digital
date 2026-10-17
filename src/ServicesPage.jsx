import { Reveal } from './App.jsx';

const WA_LINK = `https://wa.me/919979705570?text=${encodeURIComponent("Hi NIK'S DIGITAL! I'd like to know more about your services.")}`;
const ICONS = ['📢', '✒️', '🎬', '📱', '🤖', '📈'];

export default function ServicesPage({ t }) {
  const s = t.servicesPage;

  return (
    <>
      {/* Header band */}
      <section className="cp-hero">
        <div className="hero-glow" />
        <Reveal className="cp-hero-inner">
          <span className="eyebrow">{s.eyebrow}</span>
          <h1>{s.title}</h1>
          <p>{s.sub}</p>
          <div className="cp-action-row" style={{ marginTop: 30 }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-neon">{t.heroCta2}</a>
            <button
              type="button"
              className="btn btn-solid"
              onClick={() => document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth' })}
            >{t.heroCta}</button>
          </div>
        </Reveal>
      </section>

      {/* Intro */}
      <section className="sv-intro">
        <Reveal><p>{s.intro}</p></Reveal>
      </section>

      {/* Service blocks */}
      <section className="sv-list" id="services-list">
        {s.items.map((item, i) => (
          <Reveal key={item.title} className={`sv-block ${i % 2 === 1 ? 'reverse' : ''}`}>
            <div className="sv-main">
              <div className="sv-badge">
                <span className="sv-icon">{ICONS[i]}</span>
                <span className="sv-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </div>

            <div className="sv-side">
              <div className="sv-panel">
                <h4>{s.solutionsLabel}</h4>
                <div className="sv-chips">
                  {item.solutions.map((x) => <span key={x} className="sv-chip">{x}</span>)}
                </div>
              </div>
              <div className="sv-panel">
                <h4>{s.benefitsLabel}</h4>
                <ul className="sv-checks">
                  {item.benefits.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Why us */}
      <section className="sv-why">
        <Reveal className="section-head">
          <span className="eyebrow">{s.whySub}</span>
          <h2>{s.whyTitle}</h2>
        </Reveal>
        <div className="cp-cards">
          {s.why.map(([title, text], i) => (
            <Reveal key={title} className="cp-card">
              <div className="cp-icon">{['🎯', '💡', '♻️', '🤝', '📐', '📍'][i]}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="sv-faq">
        <Reveal className="section-head">
          <h2>{s.faqTitle}</h2>
        </Reveal>
        <div className="sv-faq-list">
          {s.faqs.map(([q, a]) => (
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
          <h2>{s.ctaTitle}</h2>
          <p>{s.ctaText}</p>
          <div className="cp-action-row">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-neon">{t.heroCta2}</a>
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
