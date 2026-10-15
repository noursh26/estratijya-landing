# Estratijiya IT documents generator

Builds the four IT-department documents in the Estratijiya identity (logo, IBM Plex Sans Arabic, deep teal + mint), in Arabic and English:

1. **Project Assessment Playbook** — fixed reference, not per project
2. **Internal Assessment** — per project, confidential
3. **Quotation** — per project, sent to the client
4. **UI/UX Flow Map** — per project, internal: every screen, flow, branch and state of the app, as diagrams + steps + screen cards + tables (no visual design)

## Run

```bash
pip install -r requirements.txt
python3 estratijiya_docs.py \
  --assets "../../Estratijiya Design System/assets" \
  --out out \
  --data example-project.json \
  --only internal,quotation,flowmap
```

- No `--data` → blank templates.
- `--assets` needs the four `IBMPlexSansArabic-*.ttf` files under `fonts/` copied next to `logo-green.png` (see the skill), or any folder holding all five files.
- Data format: see `SCHEMA` at the bottom of `estratijiya_docs.py` and `example-project.json`.
- The flow map's diagrams need Graphviz (`dot`): `apt-get install -y graphviz`. Without it they print as a transitions table.
- Quotation totals (discount, 5% VAT, total, total in words) are computed from the services.
