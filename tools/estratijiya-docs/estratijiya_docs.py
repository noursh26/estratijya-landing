"""Estratijiya IT document generator — Playbook, Internal Assessment, Client Quotation (AR + EN).

Usage:
  python3 estratijiya_docs.py --assets ASSETS_DIR --out OUT_DIR [--data project.json] [--only playbook,internal,quotation]
ASSETS_DIR must hold the 4 IBMPlexSansArabic-*.ttf files and logo-green.png (from the
estratijya-landing repo, "Estratijiya Design System/assets"). Without --data, blank templates are produced.
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


def page(lang, title, sub, body, foot_l, foot_m):
    rtl = lang == "ar"
    css = CSS % dict(r=A("IBMPlexSansArabic-Regular.ttf"), m=A("IBMPlexSansArabic-Medium.ttf"),
                     s=A("IBMPlexSansArabic-SemiBold.ttf"), b=A("IBMPlexSansArabic-Bold.ttf"),
                     pg="صفحة" if rtl else "Page", of="من" if rtl else "of")
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


# ───────────────────────── CLI ─────────────────────────
NAMES = {
    "playbook": ("1 - دليل تقييم المشاريع", "1 - Project Assessment Playbook"),
    "internal": ("2 - التقييم الداخلي", "2 - Internal Assessment"),
    "quotation": ("3 - عرض سعر", "3 - Quotation"),
}


def main():
    global ASSETS
    ap = argparse.ArgumentParser()
    ap.add_argument("--assets", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--data")
    ap.add_argument("--only", default="playbook,internal,quotation")
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
            fn = {"playbook": lambda l: playbook(l), "internal": lambda l: internal(l, data), "quotation": lambda l: quotation(l, data)}[key]
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
"""

if __name__ == "__main__":
    main()
