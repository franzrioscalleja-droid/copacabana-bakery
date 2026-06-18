/* ============================================================
   COPACABANA BAKERY — full menu page
   ============================================================ */
const { useState: mS, useEffect: mE } = React;
const MIMG = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" };

function MenuNav({ lang, setLang, t }) {
  return (
    <nav className="nav" id="top">
      <div className="nav-inner">
        <a className="brand-mark" href="index.html">
          <span className="b1">Copacabana</span>
          <span className="b2">Bakery</span>
        </a>
        <div className="nav-links">
          <a href="index.html">{t.back_home}</a>
          <a href="index.html#novedades">{t.nav_novedades}</a>
          <a href="index.html#contacto">{t.nav_contacto}</a>
          <div className="lang-toggle" role="group" aria-label="Language">
            <button className={lang === "es" ? "active" : ""} onClick={() => setLang("es")}>ES</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
        </div>
        <a className="menu-back-mobile" href="index.html">← {t.back_home}</a>
      </div>
    </nav>
  );
}

function MenuPage() {
  const [lang, setLang] = mS(() => localStorage.getItem("cb_lang") || "es");
  const [active, setActive] = mS(window.CATEGORIES[0].id);
  mE(() => { localStorage.setItem("cb_lang", lang); window.__lang = lang; document.documentElement.lang = lang; }, [lang]);
  window.__lang = lang;
  const t = window.I18N[lang];

  mE(() => {
    const h = (location.hash || "").replace("#", "");
    if (h && window.CATEGORIES.some(c => c.id === h)) {
      setActive(h);
      const el = document.getElementById("cat-" + h);
      if (el) window.scrollTo({ top: el.offsetTop - 130, behavior: "auto" });
    }
  }, []);

  mE(() => {
    const secs = window.CATEGORIES.map(c => document.getElementById("cat-" + c.id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.replace("cat-", "")); });
    }, { rootMargin: "-140px 0px -65% 0px", threshold: 0 });
    secs.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, [lang]);

  const goCat = (id) => {
    setActive(id);
    const el = document.getElementById("cat-" + id);
    if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <MenuNav lang={lang} setLang={setLang} t={t} />

      <header className="menu-hero">
        <div className="wrap">
          <span className="eyebrow on-dark">{t.menu_page_eyebrow}</span>
          <h1>{t.menu_page_title}</h1>
          <p>{t.menu_page_desc}</p>
        </div>
      </header>

      <div className="cat-bar">
        <div className="wrap cat-bar-inner">
          {window.CATEGORIES.map(c => (
            <button key={c.id} className={"cat-pill" + (active === c.id ? " active" : "")} onClick={() => goCat(c.id)}>
              {c[lang]}
            </button>
          ))}
        </div>
      </div>

      <main className="menu-main">
        <div className="wrap">
          {window.CATEGORIES.map(c => {
            const items = window.MENU.filter(m => m.cat === c.id);
            if (!items.length) return null;
            return (
              <section className="menu-cat" id={"cat-" + c.id} key={c.id}>
                <div className="menu-cat-head">
                  <h2>{c[lang]}</h2>
                  <span className="menu-cat-count">{items.length} {t.menu_items_word}</span>
                </div>
                <div className="big-grid">
                  {items.map(item => (
                    <article className="big-card" key={item.id}>
                      <div className="big-photo">
                        {item.photo && <img src={item.photo} alt={item[lang].n} style={MIMG} />}
                      </div>
                      <div className="big-body">
                        <h3>{item[lang].n}</h3>
                        <p>{item[lang].d}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <a className="brand-mark" href="index.html">
              <span className="b1">Copacabana</span>
              <span className="b2">Bakery</span>
            </a>
            <p className="f-tag">{t.footer_tagline}</p>
          </div>
          <div className="f-col">
            <h4>{t.nav_menu}</h4>
            <a href="index.html">{t.back_home}</a>
            <a href="index.html#pasteles">{t.nav_pasteles}</a>
            <a href="index.html#contacto">{t.nav_contacto}</a>
          </div>
          <div className="f-col">
            <h4>{t.contacto_follow}</h4>
            <a href={window.CONTACT.instagram} target="_blank" rel="noopener">Instagram</a>
            <a href={window.CONTACT.facebook} target="_blank" rel="noopener">Facebook</a>
            <a href={window.CONTACT.phoneHref}>{window.CONTACT.phone}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Copacabana Bakery. {t.footer_rights}</span>
          <a href="index.html" style={{ color: "#b59f78", textDecoration: "none" }}>{t.back_home} →</a>
        </div>
      </footer>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<MenuPage />);
