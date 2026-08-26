const { Button, Card, Divider, Logo, NavLink, LangToggle, SectionHeader, StatBlock, StepCard, ServiceCard, CheckList, DeliverableCard, ValueRow, PartnerChip } = window.EstratijiyaDesignSystem_92e519;
const A = "../../assets";

const shell = { maxWidth: "var(--container)", marginInline: "auto", paddingInline: "var(--gutter-lg)" };
const section = (dark) => ({ paddingBlock: "var(--section-y)", background: dark ? "var(--surface-dark)" : "var(--surface-page)" });

function Header({ copy, lang, setLang, active, go }) {
  const [solid, setSolid] = React.useState(false);
  React.useEffect(() => {
    const el = document.getElementById("scroller");
    const onScroll = () => setSolid(el.scrollTop > 40);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const ids = ["about", "services", "results", "contact"];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, background: solid ? "rgba(3,27,28,.86)" : "transparent", backdropFilter: solid ? `blur(var(--blur-glass))` : "none", borderBottom: `1px solid ${solid ? "var(--border-on-dark)" : "transparent"}`, transition: "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)" }}>
      <div style={{ ...shell, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-8)", paddingBlock: "var(--space-5)" }}>
        <Logo tone="white" height={26} assetBase={A} />
        <nav style={{ display: "flex", gap: "var(--space-8)" }}>
          {copy.nav.map((label, i) => (
            <NavLink key={label} href={`#${ids[i]}`} active={active === ids[i]} onClick={(e) => { e.preventDefault(); go(ids[i]); }}>{label}</NavLink>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <LangToggle lang={lang} onChange={setLang} onDark />
          <Button size="sm" onClick={() => go("contact")}>{copy.cta}</Button>
        </div>
      </div>
    </header>
  );
}

function Hero({ copy, go }) {
  const h = copy.hero;
  return (
    <section style={{ position: "relative", background: "var(--surface-ink)", overflow: "hidden", paddingBlock: "var(--space-32) var(--space-20)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${A}/cover.png)`, backgroundSize: "cover", backgroundPosition: "center right", opacity: 0.55 }} />
      <div style={{ position: "absolute", inset: 0, background: "var(--scrim-start)" }} />
      <div style={{ ...shell, position: "relative", display: "grid", gap: "var(--space-8)", maxWidth: 1240 }}>
        <span style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--tracking-wider)", color: "var(--green-500)" }}>{h.eyebrow}</span>
        <h1 style={{ font: "var(--weight-bold) var(--text-6xl)/var(--leading-tight) var(--font-core)", letterSpacing: "var(--tracking-tight)", color: "var(--text-on-dark)", maxInlineSize: "18ch", margin: 0 }}>{h.title}</h1>
        <p style={{ font: "var(--type-body-lg)", color: "var(--green-500)", fontWeight: "var(--weight-semibold)" }}>{h.tagline}</p>
        <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
          <Button size="lg" onClick={() => go("contact")}>{h.primary}</Button>
          <Button size="lg" variant="secondary" onDark onClick={() => go("method")}>{h.secondary}</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-10)", marginBlockStart: "var(--space-12)", flexWrap: "wrap" }}>
          {h.stats.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 ? <Divider onDark vertical style={{ height: 56 }} /> : null}
              <StatBlock prefix={s.prefix} value={s.value} label={s.label} onDark />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ copy }) {
  const a = copy.about, v = copy.vision;
  return (
    <section id="about" style={section(false)}>
      <div style={{ ...shell, display: "grid", gap: "var(--space-24)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "var(--space-16)", alignItems: "center" }}>
          <div style={{ display: "grid", gap: "var(--space-6)" }}>
            <SectionHeader number={a.n} eyebrow={a.eyebrow} title={<>{a.titleA}<br /><span style={{ color: "var(--text-accent)" }}>{a.titleB}</span></>} />
            <h3 style={{ font: "var(--type-h3)" }}>{a.lead}</h3>
            <p style={{ font: "var(--type-body-lg)", color: "var(--text-muted)", maxInlineSize: "var(--measure)" }}>{a.body}</p>
          </div>
          <div style={{ borderRadius: "var(--radius-media)", overflow: "hidden", aspectRatio: "4/5", background: `url(${A}/city.png) center/cover` }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "var(--space-16)", alignItems: "center" }}>
          <div style={{ borderRadius: "var(--radius-media)", overflow: "hidden", aspectRatio: "4/5", background: `url(${A}/corridor.png) center/cover` }} />
          <div style={{ display: "grid", gap: "var(--space-6)" }}>
            <SectionHeader number={v.n} eyebrow={v.eyebrow} title={v.title} />
            <p style={{ font: "var(--type-body-lg)", color: "var(--text-muted)", maxInlineSize: "var(--measure)" }}>{v.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Method({ copy }) {
  const m = copy.method;
  const [open, setOpen] = React.useState(m.steps[0].i);
  return (
    <section id="method" style={section(true)}>
      <div style={{ ...shell, display: "grid", gap: "var(--space-12)" }}>
        <div style={{ display: "grid", gap: "var(--space-4)" }}>
          <SectionHeader onDark number={m.n} eyebrow={m.eyebrow} title={m.title} lede={m.kicker} />
          <span style={{ font: "var(--type-small)", color: "var(--text-on-dark-muted)" }}>{m.hint}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-4)" }}>
          {m.steps.map((s) => (
            <StepCard key={s.i} index={s.i} title={s.t} detail={s.d} expanded={open === s.i} onToggle={() => setOpen(open === s.i ? null : s.i)} onDark />
          ))}
        </div>
      </div>
    </section>
  );
}

function Services({ copy }) {
  const s = copy.services;
  return (
    <section id="services" style={section(false)}>
      <div style={{ ...shell, display: "grid", gap: "var(--space-12)" }}>
        <SectionHeader number={s.n} eyebrow={s.eyebrow} title={s.title} lede={s.lede} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-6)" }}>
          {s.items.map((it) => <ServiceCard key={it.t} title={it.t} description={it.d} href="#services" />)}
        </div>
        <Card tone="accent" padding="var(--space-12)" outlined={false} radius="var(--radius-card-lg)">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "var(--space-10)", alignItems: "center" }}>
            <div style={{ display: "grid", gap: "var(--space-2)" }}>
              <span style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--green-700)" }}>{s.featured.eyebrow}</span>
              <h3 style={{ font: "var(--type-h2)", letterSpacing: "var(--tracking-tight)" }}>{s.featured.t}</h3>
            </div>
            <div style={{ display: "grid", gap: "var(--space-5)", justifyItems: "start" }}>
              <p style={{ font: "var(--type-body-lg)", color: "var(--text-body)" }}>{s.featured.d}</p>
              <Button variant="dark" href="#services">{copy.cta}</Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

Object.assign(window, { Header, Hero, About, Method, Services, shell, section, A });
