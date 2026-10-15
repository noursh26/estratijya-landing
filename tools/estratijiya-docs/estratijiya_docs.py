"""Estratijiya IT document generator — Playbook, Internal Assessment, Client Quotation, UI/UX Flow Map (AR + EN).

Usage:
  python3 estratijiya_docs.py --assets ASSETS_DIR --out OUT_DIR [--data project.json] [--only playbook,internal,quotation,flowmap]
ASSETS_DIR must hold the 4 IBMPlexSansArabic-*.ttf files and logo-green.png (from the
estratijya-landing repo, "Estratijiya Design System/assets"). Without --data, blank templates are produced.
The flow map's diagrams need Graphviz (`dot`) on PATH; without it they print as a transitions table.
See SCHEMA at the bottom of this file for project.json.
"""
import os, json, argparse, weasyprint
from PIL import Image

ASSETS = None
A = lambda f: "file://" + os.path.join(ASSETS, f)

CO = {
    "en": dict(name="ESTRATIJIYA SOLUTIONS", addr="Office 501, Dubai, United Arab Emirates",
               email="info@estratijiya.com", phone="+971 50 700 1576", trn="[TRN]"),
    "ar": dict(name="استراتيجية — Estratijiya Solutions", addr="مكتب 501، دبي، الإمارات العربية المتحدة",
               email="info@estratijiya.com", phone="+971 50 700 1576", trn="[الرقم الضريبي]"),
}

CSS = """
@font-face{font-family:Plex;src:url('%(r)s');font-weight:400}
@font-face{font-family:Plex;src:url('%(m)s');font-weight:500}
@font-face{font-family:Plex;src:url('%(s)s');font-weight:600}
@font-face{font-family:Plex;src:url('%(b)s');font-weight:700}
@page{size:A4;margin:16mm 14mm 22mm 14mm;
  @bottom-left{content:element(foot);width:100%%}}
*{box-sizing:border-box}
body{font-family:Plex;font-size:9.4pt;color:#12403C;line-height:1.55;margin:0}
body[dir=rtl]{line-height:1.8}
.foot{position:running(foot);border-top:1px dashed #99B5B6;padding-top:5px;font-size:7.4pt;color:#54736F;display:flex;justify-content:space-between;width:100%%}
.foot b{color:#031B1C;font-weight:600}
.foot .pg::after{content:"%(pg)s " counter(page) " %(of)s " counter(pages)}
.band{background:#031B1C;border-radius:14px;padding:22px 26px;display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.band img{height:30px}
.band .t{color:#EDF4F1;text-align:end;flex:1;margin-inline-start:24px}
.band .t h1{margin:0;font-size:22pt;font-weight:700;color:#64D893;letter-spacing:-.01em;line-height:1.2}
.band .t .s{font-size:8.6pt;color:rgba(237,244,241,.72);margin-top:2px}
.meta{display:flex;gap:26px;margin:0 0 14px;font-size:8.8pt}
.meta span{color:#54736F}.meta b{color:#031B1C;font-weight:700;margin-inline-start:6px}
.cards{display:flex;gap:12px;margin-bottom:18px}
.card{flex:1;background:#EDF4F1;border-radius:12px;padding:14px 16px;font-size:8.6pt}
.card h4{margin:0 0 6px;color:#2FA863;font-size:9.6pt;font-weight:700}
.card .n{font-weight:700;color:#031B1C;font-size:10pt;margin-bottom:3px}
h2{font-size:12pt;color:#031B1C;margin:18px 0 8px;font-weight:700;display:flex;align-items:center;gap:8px;page-break-after:avoid}
h2 .no{color:#2FA863;font-size:10pt;font-weight:600}
h3{font-size:9.8pt;color:#031B1C;margin:12px 0 4px;font-weight:600;page-break-after:avoid}
p{margin:0 0 6px}
ul,ol{margin:0 0 6px;padding-inline-start:18px}li{margin:1px 0}
table{width:100%%;border-collapse:separate;border-spacing:0;margin:4px 0 10px;font-size:8.6pt;page-break-inside:avoid}
th{background:#031B1C;color:#EDF4F1;font-weight:600;text-align:start;padding:7px 10px}
th:first-child{border-start-start-radius:8px}th:last-child{border-start-end-radius:8px}
td{padding:6px 10px;border-bottom:1px solid rgba(3,27,28,.10);vertical-align:top}
tr:nth-child(even) td{background:#F6FAF8}
td.f{height:22px}
.k td:first-child{color:#54736F;width:44%%}
.tot td{font-weight:700;color:#031B1C;background:#E7FAF0!important;border-bottom:none}
.note{background:#E7FAF0;border-inline-start:3px solid #64D893;border-radius:6px;padding:8px 12px;font-size:8.6pt;margin:6px 0 10px}
.box{border:1px solid rgba(3,27,28,.22);border-radius:10px;min-height:56px;padding:8px 12px;color:#99B5B6;font-size:8.4pt;margin-bottom:8px}
.sum{display:flex;gap:14px;align-items:flex-start;margin-top:4px}
.sum .l{flex:1.2}.sum .r{flex:1}
.check li{list-style:none;margin-inline-start:-16px}.check li::before{content:"☐  ";color:#2FA863}.check li.on::before{content:"☑  "}
.small{font-size:7.8pt;color:#54736F}
.sig{display:flex;gap:16px;margin-top:16px}.sig div{flex:1;border-top:1px solid rgba(3,27,28,.22);padding-top:6px;font-size:8.2pt;color:#54736F}
"""


def page(lang, title, sub, body, foot_l, foot_m, extra_css=""):
    rtl = lang == "ar"
    css = CSS % dict(r=A("IBMPlexSansArabic-Regular.ttf"), m=A("IBMPlexSansArabic-Medium.ttf"),
                     s=A("IBMPlexSansArabic-SemiBold.ttf"), b=A("IBMPlexSansArabic-Bold.ttf"),
                     pg="صفحة" if rtl else "Page", of="من" if rtl else "of") + extra_css
    return f"""<!doctype html><html lang="{lang}" dir="{'rtl' if rtl else 'ltr'}"><head><meta charset="utf-8"><style>{css}</style></head>
<body dir="{'rtl' if rtl else 'ltr'}">
<div class="foot"><span>{foot_l}</span><span>{foot_m}</span><span class="pg"></span></div>
<div class="band"><img src="{A('logo-green.png')}"><div class="t"><h1>{title}</h1><div class="s">{sub}</div></div></div>
{body}</body></html>"""


def tbl(head, rows, cls=""):
    h = "".join(f"<th>{x}</th>" for x in head)
    r = "".join("<tr>" + "".join(f"<td{' class=f' if c=='' else ''}>{c}</td>" for c in row) + "</tr>" for row in rows)
    return f'<table class="{cls}"><tr>{h}</tr>{r}</table>'


def H(n, t):
    return f'<h2><span class="no">{n:02d}</span>{t}</h2>'


# ───────────────────────── 1. Playbook ─────────────────────────
def playbook(l):
    ar = l == "ar"
    T = (lambda a, e: a if ar else e)
    b = ""
    b += f'<p>{T("مرجع ثابت لأي مشروع تقني يصل إلى قسم IT — تطبيق، موقع، نظام إداري. يُقرأ قبل كل اجتماع مع عميل.", "A fixed reference for every technical project that reaches the IT department — app, website or management system. Read it before every client meeting.")}</p>'
    b += H(1, T("مسار المشروع", "Project path"))
    b += tbl([T("المرحلة", "Stage"), T("ماذا يحدث", "What happens"), T("المُخرج", "Output")], [
        [T("١. طلب أولي", "1. First contact"), T("نأخذ الفكرة العامة ونحدد موعد الاجتماع", "We capture the idea and book the meeting"), "—"],
        [T("٢. اجتماع اكتشاف", "2. Discovery meeting"), T("نطرح أسئلة القسم ٠٢", "We ask the section 02 questions"), T("ملاحظات الاجتماع", "Meeting notes")],
        [T("٣. تقييم داخلي", "3. Internal assessment"), T("الميزات، التقنيات، المدة، التكلفة", "Features, stack, duration, cost"), T("الملف ٢", "File 2")],
        [T("٤. عرض سعر", "4. Quotation"), T("نرسل العرض للعميل", "We send the offer to the client"), T("الملف ٣", "File 3")],
        [T("٥. توقيع + ٥٠٪", "5. Signing + 50%"), T("نبدأ التنفيذ", "Work starts"), T("عقد / تحويل", "Contract / transfer")],
        [T("٦. تنفيذ ← اختبار ← تسليم", "6. Build → test → handover"), T("الدفعة الثانية قبل تسليم الكود والصلاحيات", "Second payment before code and credentials handover"), T("المنتج النهائي", "Final product")],
    ])
    b += H(2, T("أسئلة الاجتماع", "Meeting questions"))
    qs = [
        (T("الفكرة والهدف", "Idea and goal"), [T("ما المشكلة التي يحلها المشروع؟ ومن المنافسون؟", "What problem does it solve? Who are the competitors?"), T("ما الذي يعنيه النجاح بالنسبة للعميل؟", "What does success mean for the client?")]),
        (T("المستخدمون والمنصات", "Users and platforms"), [T("من المستخدمون؟ كم دوراً؟ العدد المتوقع؟", "Who are the users? How many roles? Expected volume?"), T("ويب، أندرويد، iOS، لوحة تحكم؟", "Web, Android, iOS, admin panel?"), T("عربي، إنكليزي، أو الاثنان؟", "Arabic, English, or both?")]),
        (T("الميزات", "Features"), [T("ما الأساسي للإطلاق الأول، وما الذي يُؤجّل؟", "What is essential for launch, and what can wait?"), T("دفع، خرائط، إشعارات، شات، ملفات، تقارير؟", "Payments, maps, notifications, chat, files, reports?"), T("ربط مع أنظمة قائمة (ERP، واتساب، SMS، API)؟", "Integration with existing systems (ERP, WhatsApp, SMS, APIs)?")]),
        (T("التصميم والمحتوى", "Design and content"), [T("هل توجد هوية بصرية جاهزة؟ أمثلة يفضّلها؟", "Is there a brand identity? Reference designs?"), T("من يوفّر المحتوى والصور؟", "Who provides content and images?")]),
        (T("الميزانية والتشغيل", "Budget and operations"), [T("ميزانية تقريبية؟ موعد إطلاق ملزم؟", "Indicative budget? Hard launch date?"), T("الاستضافة عندنا أم عنده؟ من يملك الحسابات؟", "Hosting with us or with them? Who owns the accounts?"), T("هل يحتاج صيانة ودعماً بعد التسليم؟", "Do they need maintenance and support after delivery?")]),
    ]
    for h, items in qs:
        b += f"<h3>{h}</h3><ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul>"
    b += H(3, T("تقييم التعقيد", "Complexity rating"))
    b += tbl([T("المعيار", "Criterion"), T("بسيط", "Simple"), T("متوسط", "Medium"), T("معقّد", "Complex")], [
        [T("عدد الشاشات", "Screens"), T("أقل من ١٠", "Under 10"), "10–30", T("أكثر من ٣٠", "Over 30")],
        [T("أدوار المستخدمين", "User roles"), T("دور واحد", "One"), "2–3", T("صلاحيات مفصّلة", "Granular permissions")],
        [T("تكاملات خارجية", "External integrations"), T("لا يوجد", "None"), "1–2", T("٣ أو أكثر", "3+")],
        ["Real-time", T("لا", "No"), T("جزئي", "Partial"), T("أساسي", "Core")],
        [T("دفع إلكتروني", "Online payment"), T("لا", "No"), T("بوابة واحدة", "One gateway"), T("عدة بوابات / اشتراكات", "Multiple / subscriptions")],
        ["Offline", T("لا", "No"), T("تخزين مؤقت", "Caching"), T("مزامنة كاملة", "Full sync")],
        [T("ذكاء اصطناعي", "AI"), T("لا", "No"), T("ميزة واحدة", "One feature"), T("جوهر المشروع", "Core of the product")],
    ])
    b += f'<p class="small">{T("أغلب البنود في عمود واحد = تصنيف المشروع.", "Where most rows land = the project rating.")}</p>'
    b += H(4, T("التقنيات الافتراضية", "Default stack"))
    b += tbl([T("الطبقة", "Layer"), T("الافتراضي", "Default"), T("متى نغيّر", "When we change it")], [
        ["Backend", "Next.js", T("Laravel / PHP نادراً: بطلب العميل أو استضافة PHP فقط", "Laravel / PHP rarely: client request or PHP-only hosting")],
        [T("واجهة الويب", "Web front end"), "Next.js", "—"],
        [T("الموبايل", "Mobile"), T("Flutter (أندرويد + iOS)", "Flutter (Android + iOS)"), "—"],
        [T("قاعدة البيانات", "Database"), T("حسب المشروع", "Per project"), "—"],
        [T("الإشعارات", "Push"), "Firebase (FCM)", "—"],
        [T("الاستضافة", "Hosting"), "VPS + Docker", T("Shared Hosting للمواقع والمشاريع الصغيرة", "Shared hosting for small sites and projects")],
    ])
    b += H(5, T("قواعد ثابتة", "Fixed rules"))
    b += "<ul>" + "".join(f"<li>{x}</li>" for x in [
        T("المدة الداخلية دائماً أقل من المدة المكتوبة للعميل (هامش أمان).", "Internal duration is always shorter than the client-facing one (safety margin)."),
        T("الدفع: ٥٠٪ عند التوقيع، ٥٠٪ قبل التسليم النهائي.", "Payment: 50% on signing, 50% before final handover."),
        T("أي ميزة خارج العرض = عرض سعر منفصل.", "Any feature outside the quote = a separate quote."),
        T("نسلّم المرحلة الأولى فقط، والإضافات مرحلة ثانية.", "We deliver Phase 1 only; extras become Phase 2."),
        T("تأخير العميل (محتوى، موافقات) يمدّد المدة تلقائياً.", "Client delays (content, approvals) extend the timeline automatically."),
    ]) + "</ul>"
    b += H(6, T("منهجية التسعير", "Pricing method"))
    b += f'<div class="note"><b>{T("المعادلة:", "Formula:")}</b> {T("(مجموع الساعات × سعر الساعة) + التكاليف الخارجية + هامش الربح", "(total hours × hourly rate) + external costs + profit margin")}</div>'
    b += tbl([T("نوع المشروع", "Project type"), T("السعر من (AED)", "From (AED)"), T("السعر إلى (AED)", "To (AED)"), T("المدة التقريبية", "Typical duration")], [
        [T("موقع تعريفي", "Company website"), "", "", ""],
        [T("نظام إداري / لوحة تحكم", "Management system / dashboard"), "", "", ""],
        [T("تطبيق موبايل بسيط", "Simple mobile app"), "", "", ""],
        [T("تطبيق موبايل + لوحة تحكم", "Mobile app + dashboard"), "", "", ""],
        [T("منصة متكاملة (ويب + موبايل + Real-time)", "Full platform (web + mobile + real-time)"), "", "", ""],
    ])
    b += f'<p class="small">{T("تُعبّأ من الإدارة. إضافات تُسعّر منفصلة: استضافة سنوية، صيانة شهرية، نشر على المتاجر، ميزات AI، تصميم هوية.", "Filled in by management. Priced separately: yearly hosting, monthly maintenance, store publishing, AI features, brand design.")}</p>'
    return page(l, T("دليل تقييم المشاريع", "Project Assessment Playbook"),
                T("قسم تقنية المعلومات — للاستخدام الداخلي", "IT Department — Internal use"), b,
                T("<b>دليل تقييم المشاريع</b>", "<b>Project Assessment Playbook</b>"), T("استراتيجية · دبي", "ESTRATIJIYA · DUBAI"))



# ───────────────────────── data helpers ─────────────────────────
LANG = "en"


def L(v, ph="…"):
    """Localised value: {"ar":..,"en":..} or plain string/number. Missing → [placeholder]."""
    if isinstance(v, dict):
        v = v.get(LANG) or v.get("en") or v.get("ar")
    if v is None or v == "":
        return f"[{ph}]" if ph else ""
    return str(v)


def num(v):
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


def money(v):
    n = num(v)
    if n is None:
        return "" if v in (None, "") else str(v)
    return f"{n:,.2f}" if n % 1 else f"{n:,.0f}"


def words(n):
    try:
        from num2words import num2words
        w = num2words(int(round(n)), lang=LANG)
        return (w.upper() + " DIRHAMS ONLY") if LANG == "en" else (w + " درهماً إماراتياً فقط")
    except Exception:
        return f"{money(n)} AED"


# ───────────────────────── 2. Internal assessment ─────────────────────────
def internal(l, d=None):
    global LANG
    LANG = l
    d = d or {}
    ar = l == "ar"
    T = (lambda a, e: a if ar else e)
    blank = not d
    pr = d.get("project", {})
    cl = d.get("client", {})
    no = d.get("project_no") or "EST-IT-[000]"
    b = f'<div class="meta"><span>{T("رقم المشروع", "Project No")}<b>{no}</b></span><span>{T("التاريخ", "Date")}<b>{L(d.get("date"), "DD/MM/YYYY")}</b></span><span>{T("الحالة", "Status")}<b>{T("سرّي — داخلي", "Confidential — internal")}</b></span></div>'
    b += H(1, T("بيانات المشروع", "Project details"))
    vals = [cl.get("name"), cl.get("contact"), pr.get("meeting_date"), pr.get("type"), pr.get("complexity"), pr.get("pm")]
    labels = [T("العميل", "Client"), T("شخص التواصل", "Contact person"), T("تاريخ الاجتماع", "Meeting date"),
              T("نوع المشروع", "Project type"), T("التعقيد (بسيط / متوسط / معقّد)", "Complexity (simple / medium / complex)"), T("مدير المشروع", "Project manager")]
    b += tbl([T("البند", "Item"), T("القيمة", "Value")], [[lab, "" if blank or v is None else L(v)] for lab, v in zip(labels, vals)], "k")
    b += H(2, T("ملخص الطلب", "Request summary"))
    if pr.get("summary"):
        b += f"<p>{L(pr['summary'])}</p>"
    else:
        b += f'<div class="box">{T("سطران أو ثلاثة: ماذا يريد العميل ولماذا", "Two or three lines: what the client wants and why")}</div>'
    b += H(3, T("الميزات", "Features"))
    feats = d.get("features") or []
    rows = [[str(i), L(f.get("name")), L(f.get("phase"), ""), L(f.get("complexity"), ""), money(f.get("hours")), L(f.get("notes"), "")] for i, f in enumerate(feats, 1)]
    if blank:
        rows = [[str(i), "", "", "", "", ""] for i in range(1, 9)]
    hrs = sum(num(f.get("hours")) or 0 for f in feats)
    if feats and hrs:
        rows.append([f"<b>{T('المجموع', 'Total')}</b>", "", "", "", f"<b>{money(hrs)}</b>", ""])
    b += tbl(["#", T("الميزة", "Feature"), T("المرحلة (١ / لاحقاً)", "Phase (1 / later)"), T("التعقيد", "Complexity"), T("الساعات", "Hours"), T("ملاحظات", "Notes")], rows)
    b += H(4, T("التقنيات المختارة", "Chosen stack"))
    st = d.get("stack")
    if st:
        rows = [[L(s.get("layer")), L(s.get("choice")), L(s.get("reason"), "")] for s in st]
    else:
        rows = [[x, "", ""] for x in ["Backend", T("الويب", "Web"), T("الموبايل", "Mobile"), T("قاعدة البيانات", "Database"),
                                      T("الاستضافة (VPS + Docker / Shared)", "Hosting (VPS + Docker / Shared)"), T("خدمات خارجية", "Third-party services")]]
    b += tbl([T("الطبقة", "Layer"), T("الاختيار", "Choice"), T("السبب", "Reason")], rows)
    b += H(5, T("خطة التنفيذ", "Execution plan"))
    plan = d.get("plan")
    if plan:
        rows = [[L(p.get("phase")), L(p.get("owner"), ""), money(p.get("internal_days")), money(p.get("client_days"))] for p in plan]
        ti = sum(num(p.get("internal_days")) or 0 for p in plan)
        tc = sum(num(p.get("client_days")) or 0 for p in plan)
        rows.append([f"<b>{T('المجموع', 'Total')}</b>", "", f"<b>{money(ti)}</b>", f"<b>{money(tc)}</b>"])
    else:
        rows = [[x, "", "", ""] for x in [T("تحليل + تصميم UI/UX", "Analysis + UI/UX"), T("Backend + قاعدة البيانات", "Backend + database"),
                                          T("الويب / لوحة التحكم", "Web / admin panel"), T("تطبيق الموبايل", "Mobile app"),
                                          T("اختبار وتصحيح", "Testing and fixes"), T("نشر + تسليم + تدريب", "Deploy + handover + training")]] + [[f"<b>{T('المجموع', 'Total')}</b>", "", "", ""]]
    b += tbl([T("المرحلة", "Phase"), T("المسؤول", "Owner"), T("المدة الداخلية (يوم)", "Internal (days)"), T("المدة للعميل (يوم)", "Client-facing (days)")], rows)
    b += H(6, T("التسعير", "Pricing"))
    pc = d.get("pricing", {})
    keys = ["hours", "rate", "dev_cost", "external", "margin_pct", "before_discount", "max_discount"]
    labels = [T("مجموع الساعات", "Total hours"), T("سعر الساعة", "Hourly rate"), T("تكلفة التطوير", "Development cost"),
              T("تكاليف خارجية (سيرفر، دومين، متاجر، APIs)", "External costs (server, domain, stores, APIs)"),
              T("هامش الربح ٪", "Profit margin %"), T("السعر قبل الخصم", "Price before discount"), T("أقصى خصم مسموح", "Maximum allowed discount")]
    rows = [[lab, money(pc.get(k)) if k != "margin_pct" or pc.get(k) is None else f"{money(pc.get(k))}%"] for lab, k in zip(labels, keys)]
    rows.append([f"<b>{T('السعر النهائي للعميل', 'Final client price')}</b>", f"<b>{money(pc.get('final'))}</b>"])
    b += tbl([T("البند", "Item"), T("القيمة (AED)", "Value (AED)")], rows, "k")
    b += H(7, T("مخاطر وملاحظات", "Risks and notes"))
    rk = d.get("risks")
    if rk:
        b += "<ul>" + "".join(f"<li>{L(r)}</li>" for r in rk) + "</ul>"
    else:
        b += f'<div class="box">{T("أي شيء قد يؤخر المشروع أو يرفع تكلفته", "Anything that could delay the project or raise its cost")}</div>'
    b += H(8, T("القرار", "Decision"))
    dec = d.get("decision")
    opts = [T("موافقة — نرسل عرض السعر", "Approved — send the quotation"), T("يحتاج مراجعة مع العميل", "Needs review with the client"), T("اعتذار", "Decline")]
    b += '<ul class="check">' + "".join(f'<li class="on"><b>{o}</b></li>' if dec == i else f"<li>{o}</li>" for i, o in enumerate(opts)) + "</ul>"
    b += f'<div class="sig"><div>{T("أعدّه", "Prepared by")}{": " + L(d.get("prepared_by")) if d.get("prepared_by") else ""}</div><div>{T("اعتمده", "Approved by")}</div><div>{T("التاريخ", "Date")}</div></div>'
    title_sub = (L(pr.get("name")) + T(" — سرّي", " — Confidential")) if pr.get("name") else T("[اسم المشروع] — سرّي", "[Project name] — Confidential")
    return page(l, T("التقييم الداخلي", "Internal Assessment"), title_sub, b,
                f"<b>{no}</b> · {L(cl.get('name'), T('اسم العميل', 'Client name'))}", T("للاستخدام الداخلي فقط", "Internal use only"))


# ───────────────────────── 3. Client quotation ─────────────────────────
def quotation(l, d=None):
    global LANG
    LANG = l
    d = d or {}
    ar = l == "ar"
    T = (lambda a, e: a if ar else e)
    c = dict(CO[l])
    comp = d.get("company", {})
    if comp.get("trn"):
        c["trn"] = comp["trn"]
    cl = d.get("client", {})
    q = d.get("quotation", {})
    no = d.get("quote_no") or "EST-[000]"
    b = f'<div class="meta"><span>{T("رقم العرض", "Quotation No")}<b>{no}</b></span><span>{T("تاريخ العرض", "Date")}<b>{L(d.get("date"), "DD Mon YYYY")}</b></span><span>{T("صالح حتى", "Valid until")}<b>{L(d.get("valid_until"), T("+15 يوماً", "+15 days"))}</b></span></div>'
    b += f'''<div class="cards">
<div class="card"><h4>{T("مقدّم العرض", "Quotation from")}</h4><div class="n">{c["name"]}</div>{c["addr"]}<br>{T("الرقم الضريبي", "TRN")}: {c["trn"]}<br>{c["email"]} · {c["phone"]}</div>
<div class="card"><h4>{T("مقدّم إلى", "Quotation for")}</h4><div class="n">{L(cl.get("name"), T("اسم العميل", "Client name"))}</div>{L(cl.get("company"), T("الشركة", "Company"))}<br>{L(cl.get("country"), T("الدولة", "Country"))}<br>{L(cl.get("email"), T("البريد", "Email"))} · {L(cl.get("phone"), T("الهاتف", "Phone"))}</div></div>'''
    b += H(1, T("نظرة عامة", "Project overview"))
    if q.get("overview"):
        b += f"<p>{L(q['overview'])}</p>"
    else:
        b += f'<div class="box">{T("جملة أو جملتان: ماذا سنبني، وأي مشكلة يحلّها.", "One or two sentences: what we will build and the problem it solves.")}</div>'
    b += H(2, T("الخدمات", "Services"))
    sv = q.get("services") or []
    VAT = 0.05
    sub = disc = vat = 0
    rows = []
    for i, s in enumerate(sv, 1):
        rate = num(s.get("rate")) or 0
        pct = num(s.get("discount_pct")) or 0
        dsc = rate * pct / 100
        net = rate - dsc
        tx = net * VAT
        sub += rate; disc += dsc; vat += tx
        rows.append([str(i), f"<b>{L(s.get('name'))}</b>", money(rate), f"{money(pct)}%" if pct else "—", money(tx), f"<b>{money(net + tx)}</b>"])
    if not sv:
        rows = [["1", T("[منصة ويب / لوحة تحكم]", "[Web platform / admin panel]"), "", "", "", ""],
                ["2", T("[تطبيق موبايل — أندرويد و iOS]", "[Mobile app — Android & iOS]"), "", "", "", ""],
                ["3", T("[استضافة ودعم فني لمدة سنة]", "[Hosting & 1-year support]"), "", "", "", ""]]
    b += tbl(["#", T("الخدمة", "Service"), T("السعر", "Rate"), T("الخصم", "Discount"), T("الضريبة ٥٪", "VAT 5%"), T("الإجمالي (AED)", "Total (AED)")], rows)
    b += H(3, T("نطاق العمل", "Scope of work"))
    if sv:
        for i, s in enumerate(sv, 1):
            b += f"<h3>{i}. {L(s.get('name'))}</h3>"
            if s.get("description"):
                b += f"<p>{L(s['description'])}</p>"
            if s.get("scope"):
                b += "<ul>" + "".join(f"<li>{L(x)}</li>" for x in s["scope"]) + "</ul>"
    else:
        for n in (1, 2):
            b += f"<h3>{n}. {T('[اسم الخدمة]', '[Service name]')}</h3><ul>" + f"<li>[{T('ميزة أساسية', 'Key feature')}]</li>" * 3 + "</ul>"
        b += f'<h3>3. {T("الاستضافة والدعم", "Hosting & support")}</h3><ul><li>{T("[نوع السيرفر ومواصفاته]، SSL، نسخ احتياطي يومي، مراقبة.", "[Server type and specs], SSL, daily backups, monitoring.")}</li><li>{T("دعم فني لمدة [١٢] شهراً من تاريخ التوقيع.", "Technical support for [12] months from signing.")}</li></ul>'
    tech = L(q.get("technology"), "") or f'Next.js · Flutter · [{T("قاعدة البيانات", "Database")}] · [{T("الاستضافة", "Hosting")}]'
    ni = L(q.get("not_included"), "") or T("[مثال: ميزات AI، العمل دون إنترنت، تكاملات إضافية]", "[e.g. AI features, offline sync, extra integrations]")
    b += f'<div class="note"><b>{T("التقنيات:", "Technology:")}</b> {tech}<br><b>{T("غير مشمول في هذه المرحلة:", "Not included in this phase:")}</b> {ni} — {T("تُسعّر منفصلة عند الطلب.", "quoted separately on request.")}</div>'
    b += H(4, T("المدة", "Timeline"))
    days = q.get("timeline_days")
    dd = days or "[XX]"
    b += "<p>" + T(f"{dd} يوم عمل من تاريخ التوقيع واستلام كامل المحتوى المطلوب من العميل.", f"{dd} working days from signing and receiving all required content from the client.") + "</p>"
    b += H(5, T("ملخص الدفع", "Payment summary"))
    bk = comp.get("bank", {})
    bank = tbl([T("بيانات الحساب", "Bank details"), ""], [[T("اسم الحساب", "Account name"), bk.get("account_name", "[…]")], [T("رقم الحساب", "Account no."), bk.get("account_no", "[…]")], ["IBAN", bk.get("iban", "[…]")], [T("البنك", "Bank"), bk.get("bank", "[…]")]], "k")
    total = sub - disc + vat
    if sv:
        srows = [[T("المجموع الفرعي", "Subtotal"), money(sub)], [T("الخصم", "Discount"), f"({money(disc)})" if disc else "—"], [T("الضريبة (٥٪)", "VAT (5%)"), money(vat)]]
        tot, wd = money(total), words(total)
    else:
        srows = [[T("المجموع الفرعي", "Subtotal"), ""], [T("الخصم", "Discount"), ""], [T("الضريبة (٥٪)", "VAT (5%)"), ""]]
        tot, wd = "", T("[...] درهماً فقط.", "[...] Dirhams only.")
    summ = tbl([T("البند", "Item"), "AED"], srows, "k").replace("</table>", f'<tr class="tot"><td>{T("الإجمالي", "Total")}</td><td>{tot}</td></tr></table>')
    b += f'<div class="sum"><div class="l">{bank}</div><div class="r">{summ}<p class="small">{T("المبلغ كتابةً:", "Total in words:")} {wd}</p></div></div>'
    b += H(6, T("الشروط", "Terms"))
    terms = [
        T("٥٠٪ عند التوقيع، ويُعدّ التحويل قبولاً لهذا العرض.", "50% on signing; the transfer counts as acceptance of this quotation."),
        T("٥٠٪ المتبقية بعد الموافقة النهائية وقبل تسليم الكود والصلاحيات.", "Remaining 50% after final approval, before handover of source code and credentials."),
        T("أي ميزة أو تعديل غير مذكور هنا يُسعّر منفصلاً.", "Features or changes not listed here are quoted separately."),
        T("يوفّر العميل المحتوى والصور والوسائط.", "The client provides all content, images and media."),
        T("تأخّر ملاحظات العميل أو المحتوى أو الصلاحيات يمدّد المدة بقدره.", "Delays in client feedback, content or access extend the timeline accordingly."),
        T("يملك العميل ١٠٠٪ من الكود وقاعدة البيانات والبيانات، دون رسوم لكل مستخدم.", "The client owns 100% of the source code, database and data, with no per-user licence fees."),
        T("جلسة تدريب واحدة مشمولة؛ إدارة المحتوى بعد التسليم غير مشمولة.", "One training session is included; content management after delivery is not."),
        T("يلتزم الطرفان بسرية جميع معلومات المشروع.", "Both parties keep all project information confidential."),
    ] + [L(x) for x in q.get("extra_terms", [])]
    b += "<ol>" + "".join(f"<li>{x}</li>" for x in terms) + "</ol>"
    b += f'<p class="small" style="text-align:center;margin-top:12px">{T("مستند صادر إلكترونياً، لا يتطلب توقيعاً.", "This is an electronically generated document; no signature is required.")} · {c["email"]} · {c["phone"]}</p>'
    return page(l, T("عرض سعر", "Quotation"), T("قسم تقنية المعلومات والذكاء الاصطناعي", "IT & AI Division"), b,
                f"<b>{no}</b> · {L(cl.get('name'), T('اسم العميل', 'Client name'))}", T("مستند صادر إلكترونياً", "Electronically generated document"))


# ───────────────────────── 4. UI/UX flow map ─────────────────────────
# Block-based: every section is a list of blocks, and each project uses whatever block types
# its flows need (diagram, steps, screen, table, list, note, p, h). See SCHEMA.
import re, math, html as _html, subprocess, shutil, sys

FM_CSS = """
.dgw{direction:ltr;page-break-inside:avoid;break-before:avoid;margin:8px 0 2px}
.dg{position:relative}
.dg svg{position:absolute;left:0;top:0}
.dg .nd{position:absolute;display:flex;flex-direction:column;justify-content:center;text-align:center;line-height:1.25;color:#031B1C;padding:0 5px}
.dg .nd .c{display:block;font-weight:700;color:#2FA863;letter-spacing:.02em}
.dg .el{position:absolute;text-align:center;white-space:nowrap;background:#fff;border-radius:3px;padding:0 2px;color:#12403C}
.dg .cl{position:absolute;border-radius:10px;background:rgba(237,244,241,.55);border:1px solid rgba(3,27,28,.10)}
.dg .cl span{position:absolute;top:3px;font-weight:600;color:#54736F}
.k-terminal{background:#031B1C;color:#64D893!important;border-radius:999px;font-weight:600}
.k-screen{background:#fff;border:1.2px solid #031B1C;border-radius:7px}
.k-action{background:#E7FAF0;border:1px solid #64D893;border-radius:7px}
.k-system{background:#EDF4F1;border:1px dashed #54736F;border-radius:3px}
.k-decision{background:#FFF6DF;border:1.2px solid #E0A526;border-radius:12px;font-weight:600}
.k-error{background:#FDEDEC;border:1px solid #D9534F;border-radius:7px}
.k-external{background:#F6FAF8;border:1px dotted #54736F;border-radius:7px}
.lgd{display:flex;flex-wrap:wrap;gap:4px 12px;justify-content:center;font-size:7pt;color:#54736F;margin:2px 0 12px}
.lgd i{display:inline-block;width:14px;height:8px;margin-inline-end:4px;vertical-align:middle}
.cap{text-align:center;font-size:7.6pt;color:#54736F;margin:0 0 2px}
table.st td:first-child{width:22px;color:#2FA863;font-weight:700}
table.st tr.alt td{background:#fff!important;font-size:8pt;color:#54736F;padding-top:2px;border-bottom:1px solid rgba(3,27,28,.06)}
table.st tr.alt b{color:#B77F00}
.scr{border:1px solid rgba(3,27,28,.16);border-radius:12px;padding:10px 14px 4px;margin:8px 0 12px;page-break-inside:avoid}
.scr .hd{display:flex;align-items:baseline;gap:8px;margin-bottom:4px}
.scr .code{background:#031B1C;color:#64D893;font-weight:700;font-size:8pt;border-radius:6px;padding:1px 7px}
.scr .nm{font-weight:700;color:#031B1C;font-size:10pt}
.scr .tg{color:#54736F;font-size:8pt;margin-inline-start:auto}
.scr h5{margin:6px 0 2px;font-size:8.4pt;color:#2FA863;font-weight:700;page-break-after:avoid}
.scr table{margin:2px 0 6px}
.scr ul{margin-bottom:2px}
.note.warn{background:#FFF6DF;border-inline-start-color:#E0A526}
"""

FM_KINDS = {  # kind: (ar, en, swatch css)
    "terminal": ("بداية / نهاية", "Start / end"), "screen": ("شاشة", "Screen"), "action": ("إجراء المستخدم", "User action"),
    "system": ("معالجة النظام", "System process"), "decision": ("قرار / شرط", "Decision"), "error": ("خطأ", "Error"),
    "external": ("خدمة خارجية / إشعار", "External service / notification"),
}
FM_EDGE = {"default": ("#12403C", ""), "ok": ("#2FA863", ""), "error": ("#D9534F", "4,3"), "alt": ("#54736F", "3,3")}
FM_MAX_W, FM_MAX_H, FM_FS = 512.0, 620.0, 7.6


def E(v, ph=""):
    """Localised + HTML-escaped text; **bold** becomes <b>."""
    s = _html.escape(L(v, ph), quote=False)
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)


def _node_size(n):
    txt = L(n.get("label"), "")
    cw = FM_FS * 0.56
    pad = 18 if n.get("kind") == "decision" else 12
    tw = len(txt) * cw
    w = max(58.0, min(124.0, tw + pad))
    lines = max(1, math.ceil(tw * 1.12 / (w - pad)))
    h = lines * FM_FS * 1.3 + 10 + (FM_FS * 1.1 if n.get("code") else 0)
    return w, max(h, 24.0)


def _dot_layout(b, sizes):
    nodes, edges = b.get("nodes", []), b.get("edges", [])
    ids = {n["id"] for n in nodes}
    for e in edges:
        for k in ("from", "to"):
            if e.get(k) not in ids:
                raise SystemExit(f"flow_map diagram: edge refers to unknown node '{e.get(k)}'")
    q = lambda s: '"' + str(s).replace('"', r'\"') + '"'
    g = [f"digraph G {{ graph [rankdir={b.get('dir', 'TB')}, nodesep=0.22, ranksep=0.32, fontname=Helvetica, fontsize=8, margin=0];",
         "node [shape=box, fixedsize=true, label=\"\"]; edge [fontname=Helvetica, fontsize=7, arrowsize=0.6];"]
    for n in nodes:
        w, h = sizes[n["id"]]
        g.append(f"{q(n['id'])} [width={w / 72:.3f}, height={h / 72:.3f}];")
    for gi, grp in enumerate(b.get("groups", [])):
        lab = "X" * max(4, int(len(L(grp.get("label"), "")) * 0.9))
        g.append(f"subgraph cluster_{gi} {{ label={q(lab)}; labeljust=l; margin=10; " + " ".join(q(i) for i in grp.get("nodes", [])) + "}")
    for i, e in enumerate(edges):
        lab = L(e.get("label"), "")
        extra = f", id=e{i}"
        extra += f", label={q('x' * max(2, int(len(lab) * 0.95)))}" if lab else ""
        if e.get("constraint") is False:
            extra += ", constraint=false"
        g.append(f"{q(e['from'])} -> {q(e['to'])} [{extra.lstrip(', ')}];")
    g.append("}")
    out = subprocess.run(["dot", "-Tjson0"], input="\n".join(g), capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def diagram(b, T):
    nodes = b.get("nodes", [])
    if not nodes:
        return ""
    if not shutil.which("dot"):
        print("WARNING: graphviz 'dot' not found — diagram printed as a list of transitions", file=sys.stderr)
        byid = {n["id"]: n for n in nodes}
        rows = [[E(byid[e["from"]].get("label")), E(e.get("label")), E(byid[e["to"]].get("label"))] for e in b.get("edges", [])]
        return tbl([T("من", "From"), T("عند", "When"), T("إلى", "To")], rows)
    sizes = {n["id"]: _node_size(n) for n in nodes}
    lay = _dot_layout(b, sizes)
    x0, y0, W, H = map(float, lay["bb"].split(","))
    s = min(1.0, FM_MAX_W / W, FM_MAX_H / H)
    if s < 0.72:
        print(f"WARNING: diagram '{L(b.get('title'), '')}' scaled to {s:.2f} — consider splitting it", file=sys.stderr)
    rtl = LANG == "ar"
    X = lambda x: ((W - x) if rtl else x) * s
    Y = lambda y: (H - y) * s
    byid = {n["id"]: n for n in nodes}
    gv = {o["_gvid"]: o for o in lay.get("objects", [])}
    html = ""
    for o in lay.get("objects", []):  # clusters first, so they sit underneath
        if "bb" in o and o.get("name", "").startswith("cluster_"):
            gi = int(o["name"].split("_")[1])
            a, bt, c, tp = map(float, o["bb"].split(","))
            l, r = sorted((X(a), X(c)))
            html += f'<div class="cl" style="left:{l:.1f}pt;top:{Y(tp):.1f}pt;width:{r - l:.1f}pt;height:{(tp - bt) * s:.1f}pt"><span dir="{LANG == 'ar' and 'rtl' or 'ltr'}" style="font-size:{7.2 * s:.1f}pt;{'right' if rtl else 'left'}:8px">{E(b["groups"][gi].get("label"))}</span></div>'
    svg = []
    for e in lay.get("edges", []):
        eid = str(e.get("id", ""))
        src = b["edges"][int(eid[1:])] if eid.startswith("e") else {}
        col, dash = FM_EDGE.get(src.get("kind", "default"), FM_EDGE["default"])
        end, pts = None, []
        for tok in e.get("pos", "").split():
            if tok.startswith("e,"):
                _, ex, ey = tok.split(","); end = (X(float(ex)), Y(float(ey)))
            elif tok.startswith("s,"):
                continue
            else:
                px, py = tok.split(","); pts.append((X(float(px)), Y(float(py))))
        if not pts:
            continue
        d = f"M{pts[0][0]:.1f},{pts[0][1]:.1f}" + "".join(
            f" C{pts[i][0]:.1f},{pts[i][1]:.1f} {pts[i + 1][0]:.1f},{pts[i + 1][1]:.1f} {pts[i + 2][0]:.1f},{pts[i + 2][1]:.1f}"
            for i in range(1, len(pts) - 2, 3))
        svg.append(f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{0.9 * max(s, .7):.2f}"' + (f' stroke-dasharray="{dash}"' if dash else "") + "/>")
        tip, frm = (end, pts[-1]) if end else (pts[-1], pts[-2] if len(pts) > 1 else pts[-1])
        ang = math.atan2(tip[1] - frm[1], tip[0] - frm[0])
        al, aw = 6.0 * max(s, .7), 2.6 * max(s, .7)
        bx, by = tip[0] - al * math.cos(ang), tip[1] - al * math.sin(ang)
        p1 = (bx + aw * math.sin(ang), by - aw * math.cos(ang))
        p2 = (bx - aw * math.sin(ang), by + aw * math.cos(ang))
        if end:
            svg.append(f'<line x1="{frm[0]:.1f}" y1="{frm[1]:.1f}" x2="{bx:.1f}" y2="{by:.1f}" stroke="{col}" stroke-width="{0.9 * max(s, .7):.2f}"/>')
        svg.append(f'<polygon points="{tip[0]:.1f},{tip[1]:.1f} {p1[0]:.1f},{p1[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}" fill="{col}"/>')
        if src.get("label") and e.get("lp"):
            lx, ly = map(float, e["lp"].split(","))
            fs = 6.6 * s
            ec = col if src.get("kind") in ("error", "ok") else "#12403C"
            html += f'<div class="el" dir="{'rtl' if rtl else 'ltr'}" style="left:{X(lx):.1f}pt;top:{Y(ly) - fs * 0.75:.1f}pt;font-size:{fs:.1f}pt;color:{ec};transform:translateX(-50%)">{E(src["label"])}</div>'
    for o in lay.get("objects", []):
        if "pos" not in o or o["name"] not in byid:
            continue
        n = byid[o["name"]]
        cx, cy = map(float, o["pos"].split(","))
        w, h = sizes[n["id"]]
        kind = n.get("kind", "screen")
        code = f'<span class="c" style="font-size:{FM_FS * 0.86 * s:.1f}pt">{E(n["code"])}</span>' if n.get("code") else ""
        html += (f'<div class="nd k-{kind}" dir="{'rtl' if rtl else 'ltr'}" style="left:{X(cx) - w * s / 2:.1f}pt;top:{Y(cy) - h * s / 2:.1f}pt;width:{w * s:.1f}pt;height:{h * s:.1f}pt;font-size:{FM_FS * s:.1f}pt">'
                 f'{code}<span>{E(n.get("label"))}</span></div>')
    out = f'<div class="dgw"><div class="dg" style="margin-left:{max(0, (FM_MAX_W + 4 - W * s) / 2):.1f}pt;width:{W * s:.1f}pt;height:{H * s:.1f}pt"><svg width="{W * s:.1f}pt" height="{H * s:.1f}pt" viewBox="0 0 {W * s:.1f} {H * s:.1f}">{"".join(svg)}</svg>{html}</div></div>'
    if b.get("caption"):
        out += f'<p class="cap">{E(b["caption"])}</p>'
    used = [k for k in FM_KINDS if any(n.get("kind", "screen") == k for n in nodes)]
    if b.get("legend", True) and len(used) > 1:
        out += '<div class="lgd">' + "".join(f'<span><i class="k-{k}"></i>{T(*FM_KINDS[k])}</span>' for k in used) + "</div>"
    return out


def _pair(x, a, b):
    return (x.get(a), x.get(b)) if isinstance(x, dict) else (x[0], x[1] if len(x) > 1 else "")


def screen(b, T):
    tag = " · ".join(E(b[k]) for k in ("platform", "role") if b.get(k))
    o = f'<div class="scr"><div class="hd"><span class="code">{E(b.get("code"), "—")}</span><span class="nm">{E(b.get("name"))}</span><span class="tg">{tag}</span></div>'
    if b.get("purpose"):
        o += f"<p>{E(b['purpose'])}</p>"
    for key, ar, en in (("entry", "الوصول إليها", "Reached from"), ("elements", "العناصر", "Elements")):
        if b.get(key):
            o += f"<h5>{T(ar, en)}</h5><ul>" + "".join(f"<li>{E(x)}</li>" for x in b[key]) + "</ul>"
    if b.get("actions"):
        o += f'<h5>{T("الإجراءات", "Actions")}</h5>' + tbl([T("الإجراء", "Action"), T("ماذا يحدث", "What happens")], [[E(a), E(c)] for a, c in (_pair(x, "do", "then") for x in b["actions"])])
    if b.get("validation"):
        o += f'<h5>{T("قواعد التحقق", "Validation")}</h5><ul>' + "".join(f"<li>{E(x)}</li>" for x in b["validation"]) + "</ul>"
    if b.get("states"):
        o += f'<h5>{T("الحالات", "States")}</h5>' + tbl([T("الحالة", "State"), T("ما يظهر للمستخدم", "What the user sees")], [[E(a), E(c)] for a, c in (_pair(x, "state", "shows") for x in b["states"])])
    if b.get("notes"):
        o += f'<h5>{T("ملاحظات", "Notes")}</h5><ul>' + "".join(f"<li>{E(x)}</li>" for x in b["notes"]) + "</ul>"
    return o + "</div>"


def steps(b, T):
    cols = b.get("cols") or [T("المستخدم", "User"), T("النظام", "System"), T("النتيجة / الشاشة التالية", "Result / next screen")]
    arrow = "↲" if LANG == "ar" else "↳"
    head = "".join(f"<th>{E(c)}</th>" for c in ["#"] + list(cols))
    rows = ""
    for i, s in enumerate(b.get("items", []), 1):
        rows += f'<tr><td>{i}</td><td>{E(s.get("user"))}</td><td>{E(s.get("system"))}</td><td>{E(s.get("next"))}</td></tr>'
        for a in s.get("alt", []):
            rows += f'<tr class="alt"><td></td><td colspan="3">{arrow} <b>{E(a.get("if"))}:</b> {E(a.get("then"))}</td></tr>'
    return f'<table class="st"><tr>{head}</tr>{rows}</table>'


def fm_blocks(blocks, T):
    o = ""
    for b in blocks:
        t = b.get("type", "p")
        if b.get("title") and t not in ("h",):
            o += f"<h3>{E(b['title'])}</h3>"
        if t == "p":
            o += f"<p>{E(b.get('text'))}</p>"
        elif t == "h":
            o += f"<h3>{E(b.get('text') or b.get('title'))}</h3>"
        elif t == "list":
            tg = "ol" if b.get("ordered") else "ul"
            o += f"<{tg}>" + "".join(f"<li>{E(x)}</li>" for x in b.get("items", [])) + f"</{tg}>"
        elif t == "note":
            o += f'<div class="note{" warn" if b.get("tone") == "warn" else ""}">{E(b.get("text"))}</div>'
        elif t == "table":
            o += tbl([E(h) for h in b.get("head", [])], [[E(c) for c in row] for row in b.get("rows", [])], "k" if b.get("style") == "kv" else "")
        elif t == "steps":
            o += steps(b, T)
        elif t == "diagram":
            o += diagram(b, T)
        elif t == "screen":
            o += screen(b, T)
        else:
            raise SystemExit(f"flow_map: unknown block type '{t}'")
    return o


def flowmap(l, d=None):
    global LANG
    LANG = l
    d = d or {}
    T = (lambda a, e: a if l == "ar" else e)
    fm = d.get("flow_map") or {}
    pr, cl = d.get("project", {}), d.get("client", {})
    no = d.get("project_no") or "EST-IT-[000]"
    b = (f'<div class="meta"><span>{T("رقم المشروع", "Project No")}<b>{no}</b></span><span>{T("التاريخ", "Date")}<b>{L(d.get("date"), "DD/MM/YYYY")}</b></span>'
         f'<span>{T("الإصدار", "Version")}<b>{E(fm.get("version") or "1.0")}</b></span><span>{T("الحالة", "Status")}<b>{T("سرّي — داخلي", "Confidential — internal")}</b></span></div>')
    sections = fm.get("sections") or []
    if not fm:
        b += f'<div class="note">{T("قالب فارغ: تُبنى الخريطة من أقسام، وكل قسم يستخدم ما يناسبه: مخطط، خطوات، بطاقات شاشات، جداول، قوائم.", "Blank template: the map is built from sections, each using what fits it: diagrams, steps, screen cards, tables, lists.")}</div>'
        for i, (a, e) in enumerate([("المستخدمون والمنصات", "Users and platforms"), ("خريطة التنقل العامة", "Navigation map"),
                                     ("الفلوهات حسب كل دور", "Flows per role"), ("تفاصيل الشاشات", "Screen details"),
                                     ("الإشعارات والروابط العميقة", "Notifications and deep links"), ("الحالات الطرفية", "Edge cases"),
                                     ("افتراضات وأسئلة مفتوحة", "Assumptions and open questions")], 1):
            b += H(i, T(a, e)) + '<div class="box"></div>'
    else:
        if fm.get("summary"):
            b += f"<p>{E(fm['summary'])}</p>"
        n = 0
        scr = [(si, bl) for si, s in enumerate(sections) for bl in s.get("blocks", []) if bl.get("type") == "screen"]
        if scr and fm.get("screen_index", True):
            n += 1
            first = n + 1
            b += H(n, T("فهرس الشاشات", "Screen index"))
            b += tbl([T("الرمز", "Code"), T("الشاشة", "Screen"), T("المنصة / الدور", "Platform / role"), T("القسم", "Section")],
                     [[f"<b>{E(x.get('code'))}</b>", E(x.get("name")), " · ".join(E(x[k]) for k in ("platform", "role") if x.get(k)), f"{first + si:02d}"] for si, x in scr])
        for s in sections:
            n += 1
            b += H(n, E(s.get("title")))
            if s.get("intro"):
                b += f"<p>{E(s['intro'])}</p>"
            b += fm_blocks(s.get("blocks", []), T)
        if fm.get("assumptions") or fm.get("open_questions"):
            n += 1
            b += H(n, T("افتراضات وأسئلة مفتوحة", "Assumptions and open questions"))
            if fm.get("assumptions"):
                b += f'<h3>{T("افتراضات (غير مؤكدة من العميل)", "Assumptions (not confirmed by the client)")}</h3><ul>' + "".join(f"<li>{E(x)}</li>" for x in fm["assumptions"]) + "</ul>"
            if fm.get("open_questions"):
                b += f'<h3>{T("أسئلة للعميل", "Questions for the client")}</h3><ul class="check">' + "".join(f"<li>{E(x)}</li>" for x in fm["open_questions"]) + "</ul>"
    sub = (L(pr.get("name")) + T(" — سرّي", " — Confidential")) if pr.get("name") else T("[اسم المشروع] — سرّي", "[Project name] — Confidential")
    return page(l, T("خريطة تدفق UI/UX", "UI/UX Flow Map"), sub, b,
                f"<b>{no}</b> · {L(cl.get('name'), T('اسم العميل', 'Client name'))}", T("للاستخدام الداخلي فقط", "Internal use only"), FM_CSS)


# ───────────────────────── CLI ─────────────────────────
NAMES = {
    "playbook": ("1 - دليل تقييم المشاريع", "1 - Project Assessment Playbook"),
    "internal": ("2 - التقييم الداخلي", "2 - Internal Assessment"),
    "quotation": ("3 - عرض سعر", "3 - Quotation"),
    "flowmap": ("4 - خريطة تدفق UI-UX", "4 - UI-UX Flow Map"),
}


def main():
    global ASSETS
    ap = argparse.ArgumentParser()
    ap.add_argument("--assets", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--data")
    ap.add_argument("--only", default="playbook,internal,quotation,flowmap")
    a = ap.parse_args()
    ASSETS = os.path.abspath(a.assets)
    logo = os.path.join(ASSETS, "logo-green.png")
    im = Image.open(logo)
    if im.width > 600:  # keep PDFs small
        im = im.resize((420, int(420 * im.height / im.width)), Image.LANCZOS)
        im.quantize(16).save(logo, optimize=True)
    data = json.load(open(a.data, encoding="utf-8")) if a.data else None
    os.makedirs(a.out, exist_ok=True)
    tag = ""
    if data:
        cn = data.get("client", {}).get("name")
        cn = cn.get("en") if isinstance(cn, dict) else cn
        tag = f" - {cn}" if cn else ""
    for key in a.only.split(","):
        for l, nm in zip(("ar", "en"), NAMES[key]):
            fn = {"playbook": lambda l: playbook(l), "internal": lambda l: internal(l, data), "quotation": lambda l: quotation(l, data),
                  "flowmap": lambda l: flowmap(l, data)}[key]
            path = os.path.join(a.out, f"{nm}{'' if key == 'playbook' else tag} ({l.upper()}).pdf")
            weasyprint.HTML(string=fn(l)).write_pdf(path)
            print(path)


SCHEMA = r"""
Every text field is either a plain string (same in both languages) or {"ar": "...", "en": "..."}.
Leave anything unknown out — it prints as a [placeholder]. Numbers are plain numbers (AED).
{
  "project_no": "EST-IT-001", "quote_no": "EST-001",
  "date": "13 Oct 2026", "valid_until": "28 Oct 2026", "prepared_by": "Nour",
  "company": {"trn": "...", "bank": {"account_name": "...", "account_no": "...", "iban": "...", "bank": "..."}},
  "client": {"name": {"ar":"","en":""}, "company": {...}, "country": {...}, "email": "", "phone": "", "contact": {...}},
  "project": {"name": {...}, "type": {...}, "complexity": {...}, "pm": "...", "meeting_date": "...", "summary": {...}},
  "features": [{"name": {...}, "phase": {...}, "complexity": {...}, "hours": 40, "notes": {...}}],
  "stack": [{"layer": {...}, "choice": "Next.js", "reason": {...}}],
  "plan": [{"phase": {...}, "owner": "...", "internal_days": 5, "client_days": 7}],
  "pricing": {"hours": 0, "rate": 0, "dev_cost": 0, "external": 0, "margin_pct": 0, "before_discount": 0, "max_discount": 0, "final": 0},
  "risks": [{...}],
  "decision": 0,            // 0 approved, 1 needs review, 2 decline, omit = unticked
  "quotation": {
    "overview": {...},
    "services": [{"name": {...}, "rate": 20000, "discount_pct": 10, "description": {...}, "scope": [{...}]}],
    "technology": "Next.js · Flutter · PostgreSQL · VPS + Docker",
    "not_included": {...}, "timeline_days": 35, "extra_terms": [{...}]
  }
}
Quotation totals (discount, 5% VAT, total, total in words) are computed from services.

"flow_map" (file 4, internal). Build it from blocks — pick per section whatever the flow needs:
  "flow_map": {
    "version": "1.0", "summary": {...},
    "screen_index": true,            // auto table of every "screen" block (default true)
    "sections": [{"title": {...}, "intro": {...}, "blocks": [ BLOCK, ... ]}],
    "assumptions": [{...}],          // things inferred, not confirmed by the client
    "open_questions": [{...}]
  }
  BLOCK types (any block may also carry "title" → small heading above it):
    {"type":"p", "text":{...}}                    {"type":"h", "text":{...}}
    {"type":"list", "items":[{...}], "ordered":false}
    {"type":"note", "text":{...}, "tone":"warn"}  // tone optional
    {"type":"table", "head":[{...}], "rows":[[{...}, ...]], "style":"kv"}   // any matrix: permissions, notifications, states…
    {"type":"steps", "cols":[user, system, next]?, "items":[{"user":{...}, "system":{...}, "next":{...},
                                                    "alt":[{"if":{...}, "then":{...}}]}]}
    {"type":"screen", "code":"C-01", "name":{...}, "platform":{...}, "role":{...}, "purpose":{...},
       "entry":[{...}], "elements":[{...}], "actions":[{"do":{...}, "then":{...}}], "validation":[{...}],
       "states":[{"state":{...}, "shows":{...}}], "notes":[{...}]}
    {"type":"diagram", "dir":"TB"|"LR", "caption":{...}, "legend":true,
       "nodes":[{"id":"otp", "kind":"screen|action|system|decision|error|external|terminal", "code":"C-02", "label":{...}}],
       "edges":[{"from":"otp", "to":"home", "label":{...}, "kind":"default|ok|error|alt", "constraint":true}],
       "groups":[{"label":{...}, "nodes":["otp", ...]}]}     // optional swim-lanes (app / dashboard / server)
  Text supports **bold**. Arabic diagrams are mirrored right-to-left automatically. Keep one diagram to
  roughly 14 nodes or fewer — split bigger flows (the generator warns when a diagram has to shrink a lot).
"""

if __name__ == "__main__":
    main()
