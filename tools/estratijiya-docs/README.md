# Estratijiya IT documents generator

Builds the three IT-department documents in the Estratijiya identity (logo, IBM Plex Sans Arabic, deep teal + mint), in Arabic and English:

1. **Project Assessment Playbook** — fixed reference, not per project
2. **Internal Assessment** — per project, confidential
3. **Quotation** — per project, sent to the client

## Run

```bash
pip install -r requirements.txt
python3 estratijiya_docs.py \
  --assets "../../Estratijiya Design System/assets" \
  --out out \
  --data example-project.json \
  --only internal,quotation
```

- No `--data` → blank templates.
- `--assets` needs the four `IBMPlexSansArabic-*.ttf` files under `fonts/` copied next to `logo-green.png` (see the skill), or any folder holding all five files.
- Data format: see `SCHEMA` at the bottom of `estratijiya_docs.py` and `example-project.json`.
- Quotation totals (discount, 5% VAT, total, total in words) are computed from the services.
