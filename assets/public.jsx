/* ============================================================
   COPACABANA BAKERY — public site app
   ============================================================ */
const { useState: uS, useEffect: uE } = React;
const IMG = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" };

function LangToggle({ lang, setLang }) {
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button className={lang === "es" ? "active" : ""} onClick={() => setLang("es")}>ES</button>
      <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
    </div>
  );
}

function Nav({ lang, setLang, t }) {
  const [open, setOpen] = uS(false);
  const links = [
    ["menu.html", t.nav_menu],
    ["#novedades", t.nav_novedades],
    ["#resenas", t.nav_resenas],
    ["#nosotros", t.nav_nosotros],
    ["#contacto", t.nav_contacto],
  ];
  return (
    <nav className="nav" id="top">
      <div className="nav-inner">
        <Wordmark />
        <div className="nav-links">
          {links.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <button className="nav-burger" aria-label="Menu" onClick={() => setOpen(o => !o)}><span></span></button>
      </div>
      <div className={"mobile-menu" + (open ? " open" : "")}>
        {links.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
        <div style={{ padding: "12px 6px" }}><LangToggle lang={lang} setLang={setLang} /></div>
      </div>
    </nav>
  );
}

function Hero({ t, lang }) {
  const status = useOpenStatus(lang);
  return (
    <header className="hero">
      <div className="hero-grid">
        <div>
          <span className="eyebrow hero-eyebrow">{t.hero_eyebrow}</span>
          <h1>Copa<span className="accent">cabana</span></h1>
          <div className="bakery-tag">— Bakery —</div>
          <p className="slogan">"{t.hero_slogan}"</p>
          <p className="hero-desc">{t.hero_desc}</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="menu.html">{t.hero_cta_menu}</a>
            <a className="btn btn-outline" href="#pasteles">{t.hero_cta_pastel}</a>
          </div>
          <div className="status-pill">
            <span className={"status-dot " + (status.open ? "open" : "closed")}></span>
            <strong>{status.open ? t.open_now : t.closed_now}</strong>
            <span className="sep">·</span>
            <span className="hrs">{status.dayName} {status.hoursLabel}</span>
          </div>
        </div>
        <div className="hero-photo">
          <div className="arch framed">
            <img
              src="assets/photos/hero-banner.jpeg"
              alt={lang === "es" ? "Pan dulce y pasteles de Copacabana Bakery" : "Copacabana Bakery sweet bread and pastries"}
              style={IMG}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function Novedades({ t, lang }) {
  const news = window.NOVEDADES;
  return (
    <section className="section section-novedades" id="novedades">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">{t.novedades_eyebrow}</span>
          <h2 className="section-title">{t.novedades_title}</h2>
          <p className="section-desc">{t.novedades_desc}</p>
        </Reveal>
        <div className="nov-row">
          {news.map(item => (
            <Reveal className="nov-card" key={item.id}>
              <div className="arch-sm">
                {item.photo && <img src={item.photo} alt={item[lang].n} style={IMG} />}
                <span className="badge-new floating">{t.badge_new}</span>
              </div>
              <div className="nov-meta">
                <h3>{item[lang].n}</h3>
              </div>
              <p>{item[lang].d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Menu({ t, lang }) {
  const counts = window.CATEGORIES.map(c => ({
    ...c,
    count: window.MENU.filter(m => m.cat === c.id).length,
  }));
  return (
    <section className="section section-menu-teaser" id="menu">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">{t.menu_eyebrow}</span>
          <h2 className="section-title">{t.menu_title}</h2>
          <p className="section-desc">{t.menu_desc}</p>
        </Reveal>
        <div className="cat-grid">
          {counts.map(c => (
            <a className="cat-card" href={"menu.html#" + c.id} key={c.id}>
              <span className="cat-name">{c[lang]}</span>
              <span className="cat-count">{c.count} {t.menu_items_word}</span>
              <span className="cat-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
        <div className="menu-teaser-cta">
          <a className="btn btn-primary" href="menu.html">{t.menu_cta} →</a>
        </div>
      </div>
    </section>
  );
}

function CustomCakes({ t, lang }) {
  return (
    <section className="section section-qr" id="pasteles">
      <div className="wrap">
        <div className="qr-grid">
          <Reveal>
            <span className="eyebrow">{t.qr_eyebrow}</span>
            <h2>{t.qr_title}</h2>
            <p className="section-desc">{t.qr_desc}</p>
            <ul className="qr-steps">
              <li><span className="num">1</span><span>{t.qr_step1}</span></li>
              <li><span className="num">2</span><span>{t.qr_step2}</span></li>
              <li><span className="num">3</span><span>{t.qr_step3}</span></li>
            </ul>
          </Reveal>
          <Reveal>
            <div className="qr-card">
              <div className="qr-slot">
                <img
                  src="uploads/qr-copacabana-bakery.png"
                  alt={lang === "es" ? "Código QR para enviar tu diseño" : "QR code to send your design"}
                  style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }}
                />
              </div>
              <div className="qr-label">
                {lang === "es" ? "Escanea para enviarnos tu diseño" : "Scan to send us your design"}
              </div>
              <div className="qr-sub">{t.qr_caption}</div>
              <a className="qr-phone" href={window.CONTACT.phoneHref}>{window.CONTACT.phone}</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const CATALOG_PHOTOS = [
  "assets/photos/pastel-catalogo-1.jpeg",
  "assets/photos/pastel-catalogo-2.jpeg",
  "assets/photos/pastel-catalogo-3.jpeg",
  "assets/photos/pastel-catalogo-4.jpeg",
  "assets/photos/pastel-catalogo-5.jpeg",
  "assets/photos/pastel-catalogo-6.jpeg",
  "assets/photos/pastel-catalogo-7.jpeg",
  "assets/photos/pastel-catalogo-8.jpeg",
  "assets/photos/pastel-catalogo-9.jpeg",
];

function Catalog({ t, lang }) {
  const waMsg = lang === "es"
    ? "Hola, vi su catálogo de pasteles y me interesa cotizar uno. ¿Me pueden ayudar?"
    : "Hi, I saw your cake catalog and I'm interested in getting a quote. Can you help me?";
  const waUrl = window.CONTACT.whatsappBase + "?text=" + encodeURIComponent(waMsg);

  return (
    <section className="section section-catalog" id="catalogo">
      <div className="wrap">
        <Reveal className="section-head catalog-head">
          <span className="eyebrow">{t.catalogo_eyebrow}</span>
          <h2 className="section-title">{t.catalogo_title}</h2>
          <p className="section-desc">{t.catalogo_sub}</p>
        </Reveal>
        <Reveal>
          <div className="catalog-grid">
            {[1,2,3,4,5,6,7,8,9].map(n => (
              <div className="catalog-cell" key={n}>
                {n <= CATALOG_PHOTOS.length
                  ? <img src={CATALOG_PHOTOS[n-1]} alt={lang === "es" ? "Pastel " + n : "Cake " + n} style={IMG} />
                  : null}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="catalog-foot">
          <div className="catalog-highlight">
            <span className="ch-num">+150</span>
            <span className="ch-text">{t.catalogo_highlight}</span>
          </div>
          <div className="catalog-actions">
            <a className="btn btn-primary btn-lg" href={window.CONTACT.catalogPdf} target="_blank" rel="noopener">
              <span className="btn-ic" aria-hidden="true">📄</span> {t.catalogo_pdf}
            </a>
            <a className="btn btn-wa" href={waUrl} target="_blank" rel="noopener">
              <span className="btn-ic" aria-hidden="true">💬</span> {t.catalogo_wa}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Reviews({ t, lang }) {
  const reviews = window.REVIEWS || [];
  return (
    <section className="section section-reviews" id="resenas">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">{t.resenas_eyebrow}</span>
          <h2 className="section-title">{t.resenas_title}</h2>
        </Reveal>
        {reviews.length > 0 && (
          <Reveal>
            <div className="reviews-grid">
              {reviews.map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-author">
                    <div className="review-avatar">{r.initial}</div>
                    <span className="review-name">{r.name}</span>
                    <div className="review-g">G</div>
                  </div>
                  <div className="review-stars">{"★".repeat(r.stars)}</div>
                  <p className="review-text">{lang === "en" ? r.en : r.es}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}
        <div className="reviews-cta">
          <a className="btn btn-primary" href="https://www.google.com/maps/place/Copacabana+Bakery/@39.1539023,-77.2007778,17z/data=!4m8!3m7!1s0x89b62cd46822ea27:0x6e48f724bfe1a937!8m2!3d39.1539023!4d-77.1982029!9m1!1b1!16s%2Fg%2F11b7hm633l" target="_blank" rel="noopener">
            {t.resenas_cta}
          </a>
        </div>
      </div>
    </section>
  );
}

function About({ t, lang }) {
  return (
    <section className="section section-about" id="nosotros">
      <div className="wrap">
        <div className="about-grid">
          <Reveal className="about-copy">
            <span className="eyebrow on-dark">{t.nosotros_eyebrow}</span>
            <h2 className="section-title">{t.nosotros_title}</h2>
            <p className="about-p">{t.nosotros_p1}</p>
            <p className="about-p">{t.nosotros_p2}</p>
            <div className="mv-grid">
              <div className="mv-card">
                <div className="mv-label">{t.mision_title}</div>
                <p>{t.mision_text}</p>
              </div>
              <div className="mv-card">
                <div className="mv-label">{t.vision_title}</div>
                <p>{t.vision_text}</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="about-photo">
            <div className="arch framed">
              <img
                src="assets/photos/campechana.jpeg"
                alt={lang === "es" ? "Panadería Copacabana Bakery" : "Copacabana Bakery"}
                style={IMG}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact({ t, lang }) {
  const status = useOpenStatus(lang);
  const rows = window.HOURS_LABEL[lang];
  const todayIdx = status.day === 0 ? 2 : status.day === 6 ? 1 : 0;
  return (
    <section className="section" id="contacto">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">{t.contacto_eyebrow}</span>
          <h2 className="section-title">{t.contacto_title}</h2>
        </Reveal>
        <div className="contact-grid">
          <Reveal className="contact-blocks">
            <div className="contact-block">
              <div className="clabel">{t.contacto_address_label}</div>
              <a className="cval" href={window.CONTACT.mapUrl} target="_blank" rel="noopener">{window.CONTACT.address}</a>
            </div>
            <div className="contact-block">
              <div className="clabel">{t.contacto_phone_label}</div>
              <a className="cval" href={window.CONTACT.phoneHref}>{window.CONTACT.phone}</a>
            </div>
            <div className="contact-block">
              <div className="clabel">{t.contacto_hours_label}</div>
              <div className="hours-table">
                {rows.map((r, i) => (
                  <div key={i} className={"hours-row" + (i === todayIdx ? " is-today" : "")}>
                    <span className="hr-day" data-today={t.today}>{r[0]}</span>
                    <span>{r[1]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="contact-block">
              <div className="clabel">{t.contacto_follow}</div>
              <div className="socials">
                <a className="social-btn" href={window.CONTACT.instagram} target="_blank" rel="noopener">
                  <span className="glyph">◎</span> Instagram
                </a>
                <a className="social-btn" href={window.CONTACT.facebook} target="_blank" rel="noopener">
                  <span className="glyph">f</span> Facebook
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="map-slot">
              <iframe
                title={lang === "es" ? "Ubicación de Copacabana Bakery" : "Copacabana Bakery location"}
                src="https://maps.google.com/maps?q=Copacabana+Bakery+Gaithersburg+MD&t=m&z=15&output=embed"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Wordmark href="#top" />
          <p className="f-tag">{t.footer_tagline}</p>
        </div>
        <div className="f-col">
          <h4>{t.nav_menu}</h4>
          <a href="menu.html">{t.nav_menu}</a>
          <a href="#novedades">{t.nav_novedades}</a>
          <a href="#resenas">{t.nav_resenas}</a>
          <a href="#nosotros">{t.nav_nosotros}</a>
          <a href="#contacto">{t.nav_contacto}</a>
        </div>
        <div className="f-col">
          <h4>{t.contacto_follow}</h4>
          <a href={window.CONTACT.instagram} target="_blank" rel="noopener">Instagram</a>
          <a href={window.CONTACT.facebook} target="_blank" rel="noopener">Facebook</a>
          <a href={window.CONTACT.phoneHref}>{window.CONTACT.phone}</a>
          <span>{window.CONTACT.address}</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Copacabana Bakery. {t.footer_rights}</span>
      </div>
    </footer>
  );
}

function WhatsAppFloat({ lang }) {
  const msg = lang === "es"
    ? "Hola, me gustaría hacer un pedido. ¿Me pueden ayudar?"
    : "Hi, I'd like to place an order. Can you help me?";
  const url = window.CONTACT.whatsappBase + "?text=" + encodeURIComponent(msg);
  return (
    <a className="wa-float" href={url} target="_blank" rel="noopener"
      aria-label={lang === "es" ? "Contactar por WhatsApp" : "Contact via WhatsApp"}>
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

function App() {
  const [lang, setLang] = uS(() => localStorage.getItem("cb_lang") || "es");
  uE(() => {
    localStorage.setItem("cb_lang", lang);
    window.__lang = lang;
    document.documentElement.lang = lang;
  }, [lang]);
  window.__lang = lang;
  const t = window.I18N[lang];
  return (
    <React.Fragment>
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} />
      <div className="papel"></div>
      <Novedades t={t} lang={lang} />
      <Menu t={t} lang={lang} />
      <CustomCakes t={t} lang={lang} />
      <Catalog t={t} lang={lang} />
      <Reviews t={t} lang={lang} />
      <About t={t} lang={lang} />
      <Contact t={t} lang={lang} />
      <Footer t={t} />
      <WhatsAppFloat lang={lang} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
