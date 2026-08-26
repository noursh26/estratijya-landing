Use `StepCard` for the six-step method rail. Exactly one card expanded at a time.

```jsx
<StepCard index="01" title="Discovery & Analysis" detail="We understand your current position, competitors, gaps, and strengths." expanded onToggle={() => setOpen("01")} />
```

The expanded card takes a mint hairline and a 10% mint wash; collapsed cards stay quiet. Add the hint line "Tap any step to read the detail" above the rail.
