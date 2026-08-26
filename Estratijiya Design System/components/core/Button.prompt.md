Use `Button` for every Estratijiya call to action — always a full pill, never a square-cornered button.

```jsx
<Button variant="primary" size="lg" href="#cta">Let's talk</Button>
<Button variant="secondary" onDark iconEnd="↗">See How We Work</Button>
```

- `primary` is mint `--green-500` with ink text; it hovers one step darker (`--green-600`) and presses to `scale(.98)`.
- `secondary` is a hairline outline that inherits the ground — pass `onDark` on deep-teal sections.
- `ghost` for tertiary links inside cards; `dark` for ink-filled actions on paper.
- One primary per view. On dark heroes the pair is primary + secondary, side by side.
