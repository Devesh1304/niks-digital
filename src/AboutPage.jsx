import { Reveal } from './App.jsx';

const WA_LINK = `https://wa.me/919979705570?text=${encodeURIComponent("Hi NIK'S DIGITAL! I'd like a free consultation.")}`;

export default function AboutPage({ t }) {
  const a = t.aboutPage;

  return (
    <>
      {/* Header band */}
      <section className="cp-hero">
        <div className="hero-glow" />
        <Reveal className="cp-hero-inner">
          <span className="eyebrow">{a.eyebrow}</span>
          <h1>{a.title}</h1>
          <p>{a.sub}</p>
          <div className="cp-action-row" style={{ marginTop: 30 }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-neon">{a.ctaConsult}</a>
            <a href="./#/contact" className="btn btn-solid">{a.ctaContact}</a>
          </div>
        </Reveal>
      </section>

      {/* Who we are */}
      <section className="ab-who">
        <div className="ab-who-grid">
          <Reveal>
            <span className="eyebrow">{a.whoLabel}</span>
            <h2>{a.whoTitle}</h2>
            <p>{a.whoText1}</p>
            <p>{a.whoText2}</p>
          </Reveal>
          <Reveal className="ab-mv">
            <div className="cp-card">
              <div className="cp-icon">🎯</div>
              <h3>{a.missionTitle}</h3>
              <p>{a.missionText}</p>
            </div>
            <div className="cp-card">
              <div className="cp-icon">🔭</div>
              <h3>{a.visionTitle}</h3>
              <p>{a.visionText}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="ab-stats-wrap">
        <div className="stats-strip">
          {a.stats.map(([value, label]) => (
            <div key={label} className="stat">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="ab-why">
        <Reveal className="section-head">
          <span className="eyebrow">{a.whyLabel}</span>
          <h2>{a.whyTitle}</h2>
          <p>{a.whySub}</p>
        </Reveal>
        <div className="cp-cards">
          {a.why.map(([title, text], i) => (
            <Reveal key={title} className="cp-card">
              <div className="cp-icon">{['📈', '🎬', '🤖', '🌿', '⚡', '🤝'][i]}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="ab-process">
        <Reveal className="section-head">
          <span className="eyebrow">{a.processLabel}</span>
          <h2>{a.processTitle}</h2>
          <p>{a.processSub}</p>
        </Reveal>
        <div className="ab-steps">
          {a.steps.map(([title, text], i) => (
            <Reveal key={title} className="ab-step">
              <span className="ab-step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="ab-cta">
        <Reveal className="ab-cta-box">
          <h2>{a.ctaTitle}</h2>
          <p>{a.ctaText}</p>
          <div className="cp-action-row">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-neon">{a.ctaConsult}</a>
            <a href="./#/contact" className="btn btn-solid">{a.ctaContact}</a>
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
