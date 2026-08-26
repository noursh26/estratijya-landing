Use `Card` for any bounded block of content — service tiles, audience panels, contact blocks.

```jsx
<Card tone="dark" padding="var(--space-8)" interactive>…</Card>
```

- `paper` carries `--shadow-card` and lifts to `--shadow-card-hover` when `interactive`.
- `dark` uses a 4% white wash plus a hairline instead of a shadow — shadows do not read on teal.
- Radius is `--radius-card` (16px); use `--radius-card-lg` for full-width panels.
