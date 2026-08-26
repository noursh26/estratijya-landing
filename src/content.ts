/* All page copy in one place. Voice rules from the design system readme:
   short declarative sentences, terminal full stops, numbered sections,
   first-person plural, no superlatives, no emoji, no exclamation marks. */

export const nav = [
  { id: 'diagnosis', label: 'Diagnosis', no: '01' },
  { id: 'method', label: 'Method', no: '02' },
  { id: 'build', label: 'What we build', no: '03' },
  { id: 'work', label: 'The work', no: '04' },
  { id: 'principles', label: 'Principles', no: '05' },
  { id: 'difference', label: 'Difference', no: '06' },
  { id: 'invitation', label: 'Invitation', no: '07' },
]

export const hero = {
  lines: ['Every growth', 'starts with', 'Estratijiya.'],
}

export const marquee = [
  'Your growth. Our system.',
  'A number before. A number after.',
  'We find what is missing, and build it.',
]

export const diagnosis = {
  no: '01',
  kicker: 'The real problem',
  /* One full-screen panel per symptom. Each is a claim followed by its
     consequence — the brand's two-part sentence shape. */
  panels: [
    {
      no: '01',
      title: ['Work without', 'a system.'],
      text: 'Every result depends on who happened to be in the room that day.',
      image: 'assets/symptoms/s1-system.jpg',
    },
    {
      no: '02',
      title: ['An opportunity', 'arrives, then waits.'],
      text: 'No owner, no date, no next step. It cools until it is gone.',
      image: 'assets/symptoms/s2-waiting.jpg',
    },
    {
      no: '03',
      title: ['A message that', 'is not yours.'],
      text: 'Marketing says one thing, sales says another, the client hears neither.',
      image: 'assets/symptoms/s3-message.jpg',
    },
    {
      no: '04',
      title: ['Decisions made', 'on impression.'],
      text: 'Without a number before, there is nothing for a number after to answer to.',
      image: 'assets/symptoms/s4-impression.jpg',
    },
    {
      no: '05',
      title: ['Growth that', 'cannot be repeated.'],
      text: 'A good quarter is not a system. It is a coincidence you cannot schedule.',
      image: 'assets/symptoms/s5-repeat.jpg',
    },
  ],
  cta: 'See the cause',
  ctaTarget: 'method',
}

export const method = {
  no: '02',
  kicker: 'How we move',
  title: 'Four moves. One connected system.',
  /* One card per move. One sentence each — the deck carries the weight. */
  steps: [
    {
      no: '01', title: 'We diagnose.',
      text: 'We start from the cause, not from the request. We ask why until we reach it.',
      image: 'assets/method/m1-diagnose.jpg',
    },
    {
      no: '02', title: 'We plan.',
      text: 'Every step gets an owner, a date, and a measure before anyone starts moving.',
      image: 'assets/method/m2-plan.jpg',
      // pushed down onto the drawing: the uncropped frame catches a face and a
      // legible logo, and the brand allows neither
      crop: { '--z': '1.85', '--zx': '2%', '--zy': '-19%' },
    },
    {
      no: '03', title: 'We execute.',
      text: 'With our own divisions, inside your company, alongside your own team.',
      image: 'assets/method/m3-execute.jpg',
    },
    {
      no: '04', title: 'We measure.',
      text: 'A number before. A number after. What moved decides what we change next.',
      image: 'assets/method/m4-measure.jpg',
    },
  ],
  hint: 'Scroll to deal the cards',
}

export const build = {
  no: '03',
  kicker: 'What we build',
  /* Deliberately terse: on the dial the photograph does the talking, so each
     division gets a name and a single line and nothing else. */
  units: [
    { no: '01', name: 'Studies & Strategy',      line: 'The foundation, before anything is built.',  image: 'assets/units/unit-strategy.jpg' },
    { no: '02', name: 'Building the System',     line: 'The system beneath the work.',               image: 'assets/units/unit-system.jpg' },
    { no: '03', name: 'Sales',                   line: 'From opportunity to repeatable revenue.',    image: 'assets/units/unit-sales.jpg' },
    { no: '04', name: 'Marketing & Brand',       line: 'A brand that sounds like the company.',      image: 'assets/units/unit-brand.jpg' },
    { no: '05', name: 'Technology & AI',         line: 'Time back, errors out.',                     image: 'assets/units/unit-tech.jpg' },
    { no: '06', name: 'Supervision & Execution', line: 'The plan turned into reality.',              image: 'assets/units/unit-supervision.jpg' },
    { no: '07', name: 'Personal Branding',       line: 'The founder is the first impression.',       image: 'assets/units/unit-personal.jpg' },
  ],
}

export const work = {
  no: '04',
  kicker: 'The real work',
  title: 'What we actually delivered.',
  lede: 'One client. One period.',
  items: [
    { no: '01', title: 'We built the foundation.',       text: 'The reality first, then the strategy, then the work systems that outlast us.', image: 'assets/work/w1-foundation.jpg' },
    { no: '02', title: 'Five full hiring stages.',       text: 'From job description to final offer — hiring planned and managed for 15+ roles.', image: 'assets/work/w2-hiring.jpg' },
    { no: '03', title: 'Client management, automated.',  text: 'Systems connected, HubSpot and Zoho set up, follow-up automated to the closed deal.', image: 'assets/work/w3-automation.jpg' },
    { no: '04', title: 'Decisions grounded in numbers.', text: 'Supplier comparisons, spec analysis, financial models, investment documents.', image: 'assets/work/w4-numbers.jpg' },
    { no: '05', title: 'A sales funnel from zero.',      text: 'Channels built and the customer journey designed, first contact to signature.', image: 'assets/work/w5-funnel.jpg' },
    { no: '06', title: 'Identity, campaigns, content.',  text: 'Visual identity, Google and Meta campaigns, monthly content management.', image: 'assets/work/w6-identity.jpg' },
  ],
  close: 'And all of this — with one company. At one time.',
}

export const principles = {
  no: '05',
  kicker: 'What we believe',
  lines: [
    'Every company is a system.',
    'Every system creates patterns.',
    'Every pattern reveals a story.',
    'Every story begins with a decision.',
  ],
  values: ['Clarity', 'Structure', 'Mastery', 'Partnership', 'Accountability', 'Growth'],
}

export const difference = {
  no: '06',
  kicker: 'The difference',
  title: 'Built for the work after the workshop.',
  rows: [
    { title: 'Strategy before activity.', text: 'We solve the right problem before creating more work.', image: 'assets/units/scene-horizon.jpg' },
    { title: 'We build what is missing.', text: 'No off-the-shelf menu. The system follows the diagnosis.', image: 'assets/units/scene-blocks.jpg' },
    { title: 'Inside the company, with your team.', text: 'Change works when it becomes part of how people already work.', image: 'assets/units/scene-plane.jpg' },
    { title: 'Every division connected.', text: 'Operations, sales, marketing, and technology move as one system.', image: 'assets/units/scene-network.jpg' },
    { title: 'Execution, not recommendations.', text: 'The work does not stop at a deck. We stay through delivery.', image: 'assets/units/scene-towers.jpg' },
    { title: 'A number before. A number after.', text: 'Growth is visible only when the measure changes.', image: 'assets/units/unit-supervision.jpg' },
  ],
}

export const invitation = {
  no: '07',
  kicker: 'The invitation',
  title: 'One turn. One session.',
  lede: 'Turn the dial. Whatever it stops on is yours — a working session with a partner, at our expense, with nothing owed in return.',
  hint: 'Drag the dial, or press to turn it.',
  prizes: [
    { label: 'Diagnostic Session', detail: '90 minutes with a partner, on the cause behind your numbers.' },
    { label: 'Growth Audit', detail: 'A written read of where the growth is leaking, and why.' },
    { label: 'Strategy Sprint', detail: 'One working session against your single largest constraint.' },
    { label: 'Operating Review', detail: 'Your system mapped — roles, handoffs, and the gaps between them.' },
    { label: 'Brand Read', detail: 'How your market currently hears you, next to how you intended.' },
    { label: 'Priority Intake', detail: 'First position in the next intake, whenever you decide to start.' },
  ],
  claim: 'Claim it',
  again: 'Turn again',
}

export const contact = {
  no: '08',
  kicker: 'Your next move',
  title: 'Start with clarity.',
  text: 'Tell us what is not moving. We will tell you what we would look at first.',
  email: 'info@estratijiya.com',
  phone: '+971 50 700 1576',
  whatsapp: 'https://wa.me/971507001576',
}
