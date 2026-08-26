function Audience({ copy }) {
  const a = copy.audience;
  return (
    <section style={{ ...section(false), background: "var(--surface-page-alt)" }}>
      <div style={{ ...shell, display: "grid", gap: "var(--space-12)" }}>
        <SectionHeader number={a.n} eyebrow={a.eyebrow} title={a.title} lede={a.lede} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
          <Card padding="var(--space-10)" radius="var(--radius-card-lg)" style={{ display: "grid", gap: "var(--space-5)", borderColor: "var(--green-300)" }}>
            <span style={{ justifySelf: "start", padding: "6px 14px", borderRadius: "var(--radius-pill)", background: "var(--surface-accent)", color: "var(--text-on-accent)", font: "var(--type-eyebrow)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase" }}>{a.a.tag}</span>
            <h3 style={{ font: "var(--type-h3)" }}>{a.a.t}</h3>
            <p style={{ color: "var(--text-muted)" }}>{a.a.d}</p>
            <Divider />
            <CheckList items={a.a.items} />
          </Card>
          <Card padding="var(--space-10)" radius="var(--radius-card-lg)" style={{ display: "grid", gap: "var(--space-5)", alignContent: "start" }}>
            <h3 style={{ font: "var(--type-h3)", marginBlockStart: 40 }}>{a.b.t}</h3>
            <p style={{ color: "var(--text-muted)" }}>{a.b.d}</p>
            <Divider />
            <CheckList items={a.b.items} />
          </Card>
        </div>
      </div>
    </section>
  );
}

function Results({ copy }) {
  const r = copy.results;
  return (
    <section id="results" style={section(true)}>
      <div style={{ ...shell, display: "grid", gap: "var(--space-12)" }}>
        <SectionHeader onDark number={r.n} eyebrow={r.eyebrow} title={r.title} lede={r.lede} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-8)" }}>
          {r.items.map((it) => <DeliverableCard key={it.i} index={it.i} title={it.t} body={it.d} onDark />)}
        </div>
        <p style={{ font: "var(--type-h3)", color: "var(--text-on-dark)", textAlign: "center", marginBlockStart: "var(--space-6)" }}>{r.close}</p>
      </div>
    </section>
  );
}

const PARTNERS = ["Kilani", "Royal Golf", "Tojan", "The Date Room", "Ana Al Madina", "Qusai Ironman", "Leo Designs", "Candles Land", "ARC Design", "DAL", "Petravex", "Bolu Pınar", "Pink & Greens", "Visualiz"];

function Partners({ copy }) {
  const p = copy.partners;
  return (
    <section style={{ ...section(false), paddingBlock: "var(--section-y-tight)", overflow: "hidden" }}>
      <div style={{ ...shell, display: "grid", gap: "var(--space-8)", justifyItems: "center", textAlign: "center" }}>
        <SectionHeader number={p.n} title={p.title} lede={p.lede} align="center" />
      </div>
      <div style={{ marginBlock: "var(--space-10)", display: "flex", gap: "var(--space-3)", width: "max-content", animation: "marquee 38s linear infinite" }}>
        {[...PARTNERS, ...PARTNERS].map((n, i) => <PartnerChip key={i} name={n} onDark={false} />)}
      </div>
      <p style={{ ...shell, font: "var(--type-body-lg)", color: "var(--text-muted)", textAlign: "center" }}>{p.close}</p>
    </section>
  );
}

function Contact({ copy }) {
  const c = copy.contact;
  return (
    <section id="contact" style={{ position: "relative", background: "var(--surface-ink)", overflow: "hidden", paddingBlock: "var(--section-y)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${A}/signage.png)`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.35 }} />
      <div style={{ position: "absolute", inset: 0, background: "var(--scrim-bottom)" }} />
      <div style={{ ...shell, position: "relative", display: "grid", gap: "var(--space-6)", justifyItems: "center", textAlign: "center" }}>
        <SectionHeader onDark number={c.n} title={c.title} align="center" />
        <p style={{ font: "var(--type-body-lg)", color: "var(--text-on-dark-muted)", maxInlineSize: "58ch" }}>{c.body}</p>
        <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", justifyContent: "center" }}>
          <Button size="lg" href="mailto:info@estratijiya.com">{c.primary}</Button>
          <Button size="lg" variant="secondary" onDark href="https://wa.me/971507001576">{c.secondary}</Button>
        </div>
      </div>
    </section>
  );
}

function Footer({ copy }) {
  const f = copy.footer;
  return (
    <footer style={{ background: "var(--surface-ink)", borderBlockStart: "1px solid var(--border-on-dark)", paddingBlock: "var(--space-16) var(--space-8)" }}>
      <div style={{ ...shell, display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: "var(--space-12)" }}>
        <div style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
          <Logo tone="white" height={26} assetBase={A} />
          <span style={{ color: "var(--green-500)", fontWeight: "var(--weight-semibold)" }}>{f.tagline}</span>
          <span style={{ font: "var(--type-small)", color: "var(--text-on-dark-muted)" }}>{f.address}</span>
        </div>
        <div style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
          <h4 style={{ color: "var(--text-on-dark)", font: "var(--type-h4)" }}>{f.links}</h4>
          {copy.nav.map((n) => <a key={n} href="#about" style={{ font: "var(--type-small)", color: "var(--text-on-dark-muted)" }}>{n}</a>)}
        </div>
        <div style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
          <h4 style={{ color: "var(--text-on-dark)", font: "var(--type-h4)" }}>{f.touch}</h4>
          {[["info@estratijiya.com", "mailto:info@estratijiya.com"], ["+971 50 700 1576", "tel:+971507001576"], ["estratijiya.com", "https://estratijiya.com"], ["WhatsApp: +971 50 700 1576", "https://wa.me/971507001576"]].map(([t, h]) => (
            <a key={t} href={h} style={{ font: "var(--type-small)", color: "var(--text-on-dark-muted)" }}>{t}</a>
          ))}
        </div>
      </div>
      <div style={{ ...shell, display: "flex", justifyContent: "space-between", gap: "var(--space-6)", marginBlockStart: "var(--space-12)", paddingBlockStart: "var(--space-6)", borderBlockStart: "1px solid var(--border-on-dark)", font: "var(--type-small)", color: "var(--text-on-dark-muted)" }}>
        <span>{f.rights}</span>
        <span style={{ letterSpacing: "var(--tracking-wider)" }}>ESTRATIJIYA · DUBAI</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Audience, Results, Partners, Contact, Footer });
