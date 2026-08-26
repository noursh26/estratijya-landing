function Site() {
  const [lang, setLang] = React.useState("en");
  const [active, setActive] = React.useState("about");
  const copy = window.SITE_COPY[lang];
  React.useEffect(() => {
    document.documentElement.dir = copy.dir;
    document.documentElement.lang = lang;
  }, [lang, copy.dir]);
  const go = (id) => {
    const el = document.getElementById(id);
    const scroller = document.getElementById("scroller");
    if (el && scroller) scroller.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
    setActive(id);
  };
  return (
    <div id="scroller" dir={copy.dir} style={{ height: "100vh", overflowY: "auto", background: "var(--surface-page)", fontFamily: copy.dir === "rtl" ? "var(--font-arabic)" : "var(--font-core)" }}>
      <Header copy={copy} lang={lang} setLang={setLang} active={active} go={go} />
      <Hero copy={copy} go={go} />
      <About copy={copy} />
      <Method copy={copy} />
      <Services copy={copy} />
      <Audience copy={copy} />
      <Results copy={copy} />
      <Partners copy={copy} />
      <Contact copy={copy} />
      <Footer copy={copy} />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Site />);
