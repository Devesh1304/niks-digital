import { useEffect, useRef, useState } from 'react';
import { translations } from './i18n';
import ContactPage from './ContactPage.jsx';
import NetworkBackground from './NetworkBackground.jsx';
import AboutPage from './AboutPage.jsx';
import ServicesPage from './ServicesPage.jsx';
import ProductsPage from './ProductsPage.jsx';
import './index.css';

const PHONE = '+919979705570';
const PHONE_DISPLAY = '99797 05570';
const WA_LINK = `https://wa.me/919979705570?text=${encodeURIComponent("Hi NIK'S DIGITAL! I'd like to discuss digital branding.")}`;
const CITIES = ['Lunawada', 'Godhra', 'Vadodara'];

/* Animates a number from 0 to target once the element scrolls into view */
function CountUp({ target, suffix = '', loop = false, duration: speed })  {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let frame = 0;
    let timer = 0;
    let visible = false;
    let busy = false;
    let done = false;

    const run = () => {
      busy = true;
      const t0 = performance.now();
      const duration = speed || (loop ? 6000 : 1800);
      const step = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        setValue(Math.floor(p * target));
        if (p < 1) {
          frame = requestAnimationFrame(step);
          return;
        }
        if (!loop) {
          busy = false;
          done = true;
          return;
        }
        // Loop: hold at the target, reset to 0, and count again while on screen
        timer = setTimeout(() => {
          setValue(0);
          busy = false;
          if (visible) run();
        }, 1200);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !busy && !done) run();
    }, { threshold: 0.5 });
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [target, loop]);

  return <span ref={ref}>{value}{suffix}</span>;
}
/* Fades elements in as they scroll into view */
export function Reveal({ children, className = '' }) {
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

function Navbar({ t, lang, setLang, onContactPage, active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['home', '#home', t.home],
    ['about', '#/about', t.about],
    ['services', '#/services', t.services],
    ['products', '#/products', t.products],
    ['why', '#why', t.why],
    ['creatives', '#creatives', t.gallery],
    ['contact', '#/contact', t.contact],
  ];

  // On the contact page, section links jump back to the home page first
  const hrefFor = (href) => (onContactPage && !href.startsWith('#/') ? `./${href}` : href);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href={hrefFor('#home')} className="brand">
        <img src="logo.png" alt="NIK'S DIGITAL" />
      </a>

      <nav className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(([key, href, label]) => (
          <a
            key={key}
            href={hrefFor(href)}
            onClick={() => setOpen(false)}
            className={active === key ? 'active' : undefined}
            aria-current={active === key ? 'page' : undefined}
          >{label}</a>
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

  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    try { localStorage.setItem('nd-lang', lang); } catch { /* storage unavailable */ }
    document.documentElement.lang = lang === 'gu' ? 'gu' : 'en';
  }, [lang]);

  // Which nav item is active on each sub-page
  const pageKeys = {
    '#/about': 'about',
    '#/contact': 'contact',
    '#/services': 'services',
    '#/products': 'products',
  };

  // On the home page, the nav item follows the section in view
  const [section, setSection] = useState('home');

  useEffect(() => {
    if (route.startsWith('#/')) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setSection(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['home', 'why', 'creatives', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [route]);

  const subPages = {
    '#/about': <AboutPage t={t} />,
    '#/contact': <ContactPage t={t} lang={lang} />,
    '#/services': <ServicesPage t={t} />,
    '#/products': <ProductsPage t={t} />,
  };

  if (subPages[route]) {
    return (
      <>
        <NetworkBackground fixed />
        <Navbar t={t} lang={lang} setLang={setLang} onContactPage active={pageKeys[route]} />
        {subPages[route]}
      </>
    );
  }

  return (
    <>
      <NetworkBackground fixed />
      <Navbar t={t} lang={lang} setLang={setLang} active={section} />

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
            <div className="stat">
              <strong><CountUp target={50} suffix="+" loop /></strong>
              <span>{t.statCities}</span>
              <span className="stat-bar" />
            </div>
            <div className="stat">
              <strong><CountUp target={50} suffix="+" loop /></strong>
              <span>{t.statServices}</span>
              <span className="stat-bar" />
            </div>
            <div className="stat">
              <strong><CountUp target={24} suffix="×7" /></strong>
              <span>{t.statDisplay}</span>
              <span className="stat-bar" />
            </div>
            <div className="stat">
              <strong><CountUp target={100} suffix="%" /></strong>
              <span>{t.statCampaigns}</span>
              <span className="stat-bar" />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="hm-products">
        <Reveal className="section-head">
          <span className="eyebrow">{t.products}</span>
          <h2>{t.homePage.productsTitle}</h2>
          <p>{t.homePage.productsSub}</p>
        </Reveal>
        <div className="service-grid hm-product-grid">
          {t.productsPage.items.map((item, i) => (
            <Reveal key={item.title} className="service-card hm-product">
              <img src={`posters/${item.image}`} alt={item.title} loading="lazy" />
              <div className="hm-product-body">
                <span className="service-num">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a href="#/products" className="btn btn-neon hm-learn">{t.homePage.learnMore}</a>
              </div>
              <span className="service-line" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="hm-banner">
        <Reveal className="hm-banner-inner">
          <h2>{t.homePage.banner}</h2>
          <p>{t.homePage.bannerSub}</p>
        </Reveal>
      </section>

      {/* Encourage digital branding for growth */}
      <section className="hm-grow">
        <Reveal className="hm-grow-inner">
          <h2>{t.homePage.growTitle}</h2>
          <p>{t.homePage.growText}</p>
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-neon">{t.homePage.growBtn}</a>
        </Reveal>
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
              <span className="point-icon" aria-hidden="true">{['🤝', '⭐', '📈', '🏆'][i]}</span>
              <h3>{p}</h3>
              <span className="point-bar" />
            </Reveal>
          ))}
        </div>
        <Reveal className="poster-frame">
          <img src="posters/branding.jpg" alt="Strong brand, strong business" loading="lazy" />
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
          <img src="posters/comparison.jpg" alt="Rental offers vs digital display" loading="lazy" />
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
          <img src="posters/cost-saving.jpg" alt="Reduce long-term expenses" loading="lazy" />
        </Reveal>
      </section>

      {/* Creatives */}
      <section className="creatives" id="creatives">
        <Reveal className="section-head">
          <h2>{t.creativesTitle}</h2>
          <p>{t.creativesSub}</p>
        </Reveal>
        <div className="creative-grid">
          <Reveal><img src="posters/digital-growth.jpg" alt="Transform your business digitally" loading="lazy" /></Reveal>
          <Reveal><img src="posters/why-customers.jpg" alt="Why customers choose your shop" loading="lazy" /></Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className="hm-industries">
        <Reveal className="section-head">
          <h2>{t.homePage.industriesTitle}</h2>
          <p>{t.homePage.industriesSub}</p>
        </Reveal>
        <Reveal className="hm-chips">
          {t.homePage.industries.map((name) => (
            <span key={name} className="sv-chip">{name}</span>
          ))}
        </Reveal>
      </section>

      {/* Why choose us */}
      <section className="sv-why">
        <Reveal className="section-head">
          <h2>{t.homePage.whyTitle}</h2>
          <p>{t.homePage.whySub}</p>
        </Reveal>
        <div className="cp-cards">
          {t.homePage.why.map(([title, text], i) => (
            <Reveal key={title} className="cp-card">
              <div className="cp-icon">{['🎨', '🔧', '⚡', '♾️', '🤝', '📍'][i]}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="ab-cta">
        <Reveal className="ab-cta-box">
          <h2>{t.homePage.ctaTitle}</h2>
          <p>{t.homePage.ctaText}</p>
          <div className="cp-action-row">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-neon">{t.homePage.ctaBtn}</a>
            <a href="#/contact" className="btn btn-solid">{t.contact}</a>
          </div>
        </Reveal>
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
              <a href="tel:+919737667050">+91 97376 67050</a>
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
        <img src="logo.png" alt="NIK'S DIGITAL" className="footer-logo" />
        <p className="footer-tag">{t.footerTag}</p>
        <div className="footer-cities">Lunawada · Godhra · Vadodara</div><div className="footer-social"><a href="https://www.instagram.com/_niksdigital?fqnt=aDZmcjloejI0ajc3" target="_blank" rel="noopener" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg></a><a href="https://whatsapp.com/channel/0029Vb9iQpzEwEjtGaKsMw3z" target="_blank" rel="noopener" aria-label="WhatsApp Channel"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.27 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.77-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z"/></svg></a></div>
        <p className="copy">© {new Date().getFullYear()} NIK'S DIGITAL. {t.rights}</p><p className="copy dev-credit">Designed &amp; developed by D. Kachhia</p>
      </footer>

      <a href={WA_LINK} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp"><svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.27 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.77-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z"/></svg></a>
    </>
  );
}
