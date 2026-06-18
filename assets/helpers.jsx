/* Shared helpers + components for Copacabana Bakery (exported to window) */
const { useState, useEffect, useRef } = React;

function money(n) { return "$" + n.toFixed(2); }

/* Compute open/closed against store hours, ticking each minute */
function useOpenStatus(lang) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const span = window.HOURS[day];
  const open = span && mins >= span[0] && mins < span[1];
  const fmt = (m) => {
    let h = Math.floor(m / 60), mm = m % 60;
    const ap = h >= 12 ? "pm" : "am";
    h = h % 12; if (h === 0) h = 12;
    return `${h}:${mm.toString().padStart(2, "0")} ${ap}`;
  };
  return {
    open: !!open,
    dayName: window.I18N[lang].days[day],
    hoursLabel: span ? `${fmt(span[0])} – ${fmt(span[1])}` : "—",
    day,
  };
}

/* Brand wordmark */
function Wordmark({ tag = true, className = "", href = "#top" }) {
  return (
    <a className={"brand-mark " + className} href={href}>
      <span className="b1">Copacabana</span>
      {tag && <span className="b2">Bakery</span>}
    </a>
  );
}

/* Reveal-on-scroll wrapper */
function Reveal({ children, as = "div", className = "", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); } });
    }, { threshold: 0.12 });
    io.observe(el);
    const fb = setTimeout(() => el.classList.add("in"), 1400);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, []);
  const Tag = as;
  return <Tag ref={ref} className={"reveal " + className} {...rest}>{children}</Tag>;
}

document.documentElement.classList.add("js");

Object.assign(window, { money, useOpenStatus, Wordmark, Reveal });
