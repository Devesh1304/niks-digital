import { useEffect, useRef, useState } from 'react';
import { translations } from './i18n';
import './index.css';

const PHONE = '+919979705570';
const PHONE_DISPLAY = '99797 05570';
const WA_LINK = `https://wa.me/919979705570?text=${encodeURIComponent("Hi NIK'S DIGITAL! I'd like to discuss digital branding.")}`;
const CITIES = ['Lunawada', 'Godhra', 'Vadodara'];

/* Animates a number from 0 to target once the element scrolls into view */
function CountUp({ target, suffix = '' }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const duration = 1800;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        setValue(Math.floor(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value}{suffix}</span>;
}

/* Fades elements in as they scroll into view */
function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShown(true);
    }, { threshold: 0.12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${shown ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function Navbar({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['#home', t.home],
    ['#services', t.services],
    ['#why', t.why],
    ['#creatives', t.gallery],
    ['#contact', t.contact],
  ];

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="brand">
        <img src="/logo.png" alt="NIK'S DIGITAL" />
      </a>

      <nav className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>

      <div className="nav-actions">
        <a href={`tel:${PHONE}`} className="nav-call">{t.callNow}</a>
        <div className="lang-toggle">
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          <button className={lang === 'gu' ? 'active' : ''} onClick={() => setLang('gu')}>ગુ</button>
        </div>
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

export default function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('nd-lang') || 'en'; } catch { return 'en'; }
  });
  const t = translations[lang];

  useEffect(() => {
    try { localStorage.setItem('nd-lang', lang); } catch { /* storage unavailable */ }
    document.documentElement.lang = lang === 'gu' ? 'gu' : 'en';
  }, [lang]);

  return (
    <>
      <Navbar t={t} lang={lang} setLang={setLang} />

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-glow" />
        <div className="hero-inner">
          <Reveal>
            <span className="eyebrow">Smart Branding · Smart Solutions</span>
            <h1>{t.heroTitle}</h1>
            <p className="hero-sub">{t.heroSub}</p>
            <div className="hero-cta">
              <a href="#services" className="btn btn-neon">{t.heroCta}</a>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-solid">{t.heroCta2}</a>
            </div>
          </Reveal>

          <div className="stats-strip">
            <div className="stat"><strong><CountUp target={3} /></strong><span>{t.statCities}</span></div>
            <div className="stat"><strong><CountUp target={6} /></strong><span>{t.statServices}</span></div>
            <div className="stat"><strong><CountUp target={24} suffix="×7" /></strong><span>{t.statDisplay}</span></div>
            <div className="stat"><strong><CountUp target={100} suffix="%" /></strong><span>{t.statCampaigns}</span></div>
          </div>
        </div>
      </section>

      {/* Brand strength */}
      <section className="brand">
        <Reveal className="section-head">
          <h2>{t.brandTitle}</h2>
          <p>{t.brandSub}</p>
        </Reveal>
        <div className="brand-points">
          {t.brandPoints.map((p, i) => (
            <Reveal key={p} className="point-card">
              <span className="point-index">0{i + 1}</span>
              <h3>{p}</h3>
            </Reveal>
          ))}
        </div>
        <Reveal className="poster-frame">
          <img src="/posters/branding.jpg" alt="Strong brand, strong business" loading="lazy" />
        </Reveal>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <Reveal className="section-head">
          <h2>{t.servicesTitle}</h2>
          <p>{t.servicesSub}</p>
        </Reveal>
        <div className="service-grid">
          {t.svc.map(([title, desc], i) => (
            <Reveal key={title} className="service-card">
              <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="service-line" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="compare" id="why">
        <Reveal className="section-head">
          <h2>{t.compareTitle}</h2>
          <p>{t.compareSub}</p>
        </Reveal>
        <div className="compare-grid">
          <Reveal className="compare-col left">
            <h3>{t.compareLeft}</h3>
            <ul>
              {t.compareLeftItems.map(([h, d]) => (
                <li key={h}><strong>{h}</strong><span>{d}</span></li>
              ))}
            </ul>
          </Reveal>
          <div className="vs">VS</div>
          <Reveal className="compare-col right">
            <h3>{t.compareRight}</h3>
            <ul>
              {t.compareRightItems.map(([h, d]) => (
                <li key={h}><strong>{h}</strong><span>{d}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal className="poster-frame">
          <img src="/posters/comparison.jpg" alt="Rental offers vs digital display" loading="lazy" />
        </Reveal>
      </section>

      {/* Savings */}
      <section className="savings">
        <Reveal className="section-head">
          <h2>{t.saveTitle}</h2>
          <p>{t.saveSub}</p>
        </Reveal>
        <div className="savings-grid">
          <Reveal className="save-left">
            <h3>{t.saveLeftLabel}</h3>
            <ul>
              {t.saveLeft.map((item) => (
                <li key={item}><span className="cross">✕</span>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="save-center">
            <div className="coin">₹</div>
            <h3>{t.saveCenter}</h3>
            <p>{t.saveCenterSub}</p>
          </Reveal>
          <Reveal className="save-right">
            {t.saveRight.map(([h, d]) => (
              <div key={h} className="save-item">
                <strong>{h}</strong>
                <span>{d}</span>
              </div>
            ))}
          </Reveal>
        </div>
        <Reveal className="poster-frame">
          <img src="/posters/cost-saving.jpg" alt="Reduce long-term expenses" loading="lazy" />
        </Reveal>
      </section>

      {/* Creatives */}
      <section className="creatives" id="creatives">
        <Reveal className="section-head">
          <h2>{t.creativesTitle}</h2>
          <p>{t.creativesSub}</p>
        </Reveal>
        <div className="creative-grid">
          <Reveal><img src="/posters/digital-growth.jpg" alt="Transform your business digitally" loading="lazy" /></Reveal>
          <Reveal><img src="/posters/why-customers.jpg" alt="Why customers choose your shop" loading="lazy" /></Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="contact">
        <Reveal className="section-head">
          <h2>{t.contactTitle}</h2>
          <p>{t.contactSub}</p>
        </Reveal>
        <div className="contact-grid">
          <Reveal className="contact-info">
            <div className="info-block">
              <h4>{t.offices}</h4>
              <ul className="cities">
                {CITIES.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <div className="info-block">
              <h4>{t.callUs}</h4>
              <a href={`tel:${PHONE}`}>+91 {PHONE_DISPLAY}</a>
            </div>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-neon whatsapp">WhatsApp</a>
          </Reveal>

          <Reveal>
            <form className="contact-form" onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const msg = `Hi NIK'S DIGITAL! I'm ${f.get('name')} (${f.get('phone')}). Business: ${f.get('business')}. ${f.get('message')}`;
              window.open(`https://wa.me/919979705570?text=${encodeURIComponent(msg)}`, '_blank');
              e.currentTarget.reset();
            }}>
              <input name="name" placeholder={t.formName} required />
              <input name="phone" type="tel" placeholder={t.formPhone} required />
              <input name="business" placeholder={t.formBusiness} />
              <textarea name="message" rows="4" placeholder={t.formMsg} />
              <button type="submit" className="btn btn-neon">{t.formSend}</button>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <img src="/logo.png" alt="NIK'S DIGITAL" className="footer-logo" />
        <p className="footer-tag">{t.footerTag}</p>
        <div className="footer-cities">Lunawada · Godhra · Vadodara</div>
        <p className="copy">© {new Date().getFullYear()} NIK'S DIGITAL. {t.rights}</p>
      </footer>

      <a href={WA_LINK} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">💬</a>
    </>
  );
}
