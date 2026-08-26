Use `LangToggle` in the header of every Estratijiya surface — the brand is bilingual by default, Arabic first for local audiences.

```jsx
<LangToggle lang={lang} onChange={setLang} onDark />
```

Switching must flip `dir` on the document root, not just the copy.
