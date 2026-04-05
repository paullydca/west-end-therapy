// node missing-pages.js
// Creates every page that was 404ing on the local clone
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const BASE = __dirname;
const IMG  = 'https://westendtherapy.ca/ws/media-library';
const HERO = `${IMG}/26789bddcacb0b17f2a56440eb68713d/adobestock_436729956.jpeg`;
const WAIT = `${IMG}/5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg`;

function write(rel, content) {
  const full = path.join(BASE, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trimStart(), 'utf8');
  console.log('wrote', rel);
}

// ─── helper: shared service-page layout ──────────────────────────────────────
function svcPage({ title, metaDesc, heroImg = HERO, tagline, h1, intro, issues = [], approaches = [], expect, extraHtml = '' }) {
  const issueItems  = issues.map(i => `<li>${i}</li>`).join('\n            ');
  const approachItems = approaches.map(a => `<li>${a}</li>`).join('\n            ');
  const introParts  = intro.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('\n        ');
  const expectParts = expect ? expect.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('\n        ') : '';

  return `---
import Layout from '../layouts/Layout.astro';
const heroImg = '${heroImg}';
---
<Layout title="${title}" description="${metaDesc}">
  <section class="svc-hero" style={\`background-image:url('\${heroImg}')\`}>
    <div class="svc-hero__overlay"></div>
    <div class="wrap svc-hero__content">
      <p class="eyebrow">${tagline}</p>
      <h1>${h1}</h1>
      <div class="hero-btns">
        <a href="/#intake-form" class="btn btn-teal">Book a Session</a>
        <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-ghost">Email Us</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap svc-layout">
      <div class="svc-main">
        <div class="svc-intro">${introParts}</div>
        ${issues.length ? `<div class="svc-block"><h2>Issues We Help Address</h2><ul class="check-list">${issueItems}</ul></div>` : ''}
        ${approaches.length ? `<div class="svc-block"><h2>Our Therapeutic Approaches</h2><ul class="approach-list">${approachItems}</ul></div>` : ''}
        ${expect ? `<div class="svc-block"><h2>What to Expect</h2>${expectParts}</div>` : ''}
        ${extraHtml}
      </div>
      <aside class="svc-sidebar">
        <div class="sidebar-card cta-card">
          <h3>Ready to Get Started?</h3>
          <p>Fill out our 2-minute intake form and we'll match you with the right therapist.</p>
          <a href="/#intake-form" class="btn btn-teal" style="width:100%;justify-content:center;margin-top:1rem;">Book a Session</a>
          <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-outline" style="width:100%;justify-content:center;margin-top:.75rem;">Email Us</a>
        </div>
        <div class="sidebar-card">
          <h3>Contact</h3>
          <p><a href="tel:+12048099114">(204) 809-9114</a></p>
          <p><a href="mailto:inquiries@westendtherapy.ca">inquiries@westendtherapy.ca</a></p>
          <p style="font-size:.85rem;margin-top:.5rem;">759 Wall St, Winnipeg MB R3G 2T6</p>
        </div>
        <div class="sidebar-card">
          <h3>All Services</h3>
          <ul class="sidebar-links">
            <li><a href="/individual-therapy">Individual Therapy</a></li>
            <li><a href="/couples-therapy">Couples Therapy</a></li>
            <li><a href="/family-therapy">Family Therapy</a></li>
            <li><a href="/child-therapy">Child &amp; Teen Therapy</a></li>
            <li><a href="/therapy-for-teens">Therapy for Teens</a></li>
            <li><a href="/emdr-therapy">EMDR Therapy</a></li>
            <li><a href="/trauma-therapy">Trauma Therapy</a></li>
            <li><a href="/anxiety-therapy">Anxiety Therapy</a></li>
            <li><a href="/depression-therapy">Depression Therapy</a></li>
            <li><a href="/divorce-counselling">Divorce Counselling</a></li>
            <li><a href="/stress-and-burnout-therapy">Stress &amp; Burnout</a></li>
            <li><a href="/anger-management">Anger Management</a></li>
            <li><a href="/play-therapy">Play Therapy</a></li>
            <li><a href="/sex-therapy">Sex Therapy</a></li>
            <li><a href="/online-therapy">Online Therapy</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </section>

  <section class="section pale tc">
    <div class="wrap" style="max-width:680px">
      <h2>Take the First Step Today</h2>
      <p style="margin-top:1rem;margin-bottom:2rem;">Our team of Master's-level therapists is here to support you. Fill out our intake form and we'll get back to you within 24 hours.</p>
      <a href="/#intake-form" class="btn btn-teal">Fill Out Our 2-Minute Intake Form</a>
    </div>
  </section>
</Layout>
<style>
.svc-hero{min-height:420px;background-size:cover;background-position:center;position:relative;display:flex;align-items:center}
.svc-hero__overlay{position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,.55) 0%,rgba(0,0,0,.25) 100%)}
.svc-hero__content{position:relative;z-index:1;padding-block:clamp(3rem,8vw,5rem)}
.svc-hero__content h1{color:#fff;font-size:clamp(1.8rem,5vw,3rem);margin-block:.5rem 1.5rem;text-shadow:0 2px 12px rgba(0,0,0,.25)}
.eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.85);display:block;margin-bottom:.5rem}
.hero-btns{display:flex;flex-wrap:wrap;gap:1rem}
.svc-layout{display:grid;grid-template-columns:1fr 300px;gap:4rem;align-items:start}
@media(max-width:900px){.svc-layout{grid-template-columns:1fr}}
.svc-intro p{font-size:1.05rem;line-height:1.8;margin-bottom:1rem;color:var(--dark)}
.svc-block{margin-top:2.5rem}.svc-block h2{font-size:1.5rem;margin-bottom:1rem}
.svc-block p{font-size:.97rem;line-height:1.8;margin-bottom:1rem;color:var(--dark)}
.check-list,.approach-list{display:grid;gap:.5rem}
.check-list li{padding:.4rem .75rem .4rem 2rem;position:relative;font-size:.92rem;color:var(--dark);line-height:1.6}
.check-list li::before{content:'✓';position:absolute;left:.5rem;color:var(--teal);font-weight:700}
.approach-list li{padding:.4rem .75rem .4rem 1.5rem;position:relative;font-size:.92rem;color:var(--dark)}
.approach-list li::before{content:'→';position:absolute;left:.25rem;color:var(--teal);font-weight:700}
.svc-sidebar{display:flex;flex-direction:column;gap:1.5rem}
.sidebar-card{background:var(--teal-pale);border-radius:6px;padding:1.5rem;border:1px solid var(--border)}
.cta-card{background:var(--teal-light)}
.sidebar-card h3{font-size:1rem;font-family:var(--font-b);font-weight:700;margin-bottom:.75rem}
.sidebar-card p{font-size:.88rem;line-height:1.6;margin-bottom:.25rem}
.sidebar-card a:not(.btn){color:var(--teal)}
.sidebar-links{display:grid;gap:.35rem}
.sidebar-links a{font-size:.88rem;color:var(--teal);font-weight:500}
.sidebar-links a:hover{color:var(--teal-dark);text-decoration:underline}
</style>`;
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. ROOT-LEVEL SERVICE ALIASES  (footer + homepage card links)
// ══════════════════════════════════════════════════════════════════════════════
const aliases = [
  ['individual-therapy',  '/services/individual-therapy'],
  ['couples-therapy',     '/services/couples-therapy'],
  ['family-therapy',      '/services/family-therapy'],
  ['child-therapy',       '/services/child-therapy'],
  ['emdr-therapy',        '/services/emdr-therapy'],
  ['anxiety-therapy',     '/services/anxiety-therapy'],
  ['depression-therapy',  '/services/depression-therapy'],
  ['sex-therapy',         '/services/sex-therapy'],
  ['play-therapy',        '/services/play-therapy'],
  ['anger-management',    '/services/anger-management'],
  ['online-therapy',      '/services/online-therapy'],
  ['grief-therapy',       '/services/grief-therapy'],
];
for (const [slug, target] of aliases) {
  write(`src/pages/${slug}.astro`, `---\nreturn Astro.redirect('${target}', 301);\n---`);
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. NEW SPECIALTY PAGES
// ══════════════════════════════════════════════════════════════════════════════

write('src/pages/trauma-therapy.astro', svcPage({
  title: 'Trauma Therapy Winnipeg | PTSD & EMDR | West End Therapy',
  metaDesc: 'Trauma therapy in Winnipeg. Evidence-based PTSD treatment, EMDR, and trauma-informed counselling at West End Therapy, 759 Wall St.',
  heroImg: HERO,
  tagline: 'Healing from the inside out',
  h1: 'Trauma Therapy in Winnipeg',
  intro: `Trauma can have a lasting impact on both the mind and body. Distressing events such as abuse, accidents, loss, or chronic stress can result in post-traumatic responses that affect mental health and daily functioning. However, trauma isn't defined by the event itself, but by the individual's emotional response to it.

Unresolved trauma can interfere with relationships, work, and daily functioning. It may manifest as depression, difficulty managing emotions, challenges trusting others, insomnia, or physical symptoms. At West End Therapy, our trauma-informed therapists provide a safe, compassionate space to begin healing.`,
  issues: [
    'Post-Traumatic Stress Disorder (PTSD)',
    'Complex and developmental trauma',
    'Intergenerational and cultural trauma',
    'Trauma related to abuse, assault, or neglect',
    'Accident or medical trauma',
    'Grief and traumatic loss',
    'Trauma responses including flashbacks, nightmares, hypervigilance',
    'Emotional numbing or disconnection',
    'Difficulties with trust and relationships following trauma',
  ],
  approaches: [
    'EMDR (Eye Movement Desensitization and Reprocessing)',
    'Trauma-Focused Cognitive Behavioural Therapy (TF-CBT)',
    'Somatic and body-based approaches',
    'Internal Family Systems (IFS)',
    'Attachment-Based Therapy',
    'Narrative Therapy',
  ],
  expect: `Your therapist will begin with a thorough assessment and spend time building safety and trust before any trauma processing begins. Trauma therapy is never rushed — your pace and comfort are the priority.

Many of our therapists are trained in EMDR, one of the most well-researched and effective treatments for trauma. All sessions are available in-person in Winnipeg or online across Manitoba.`,
}));

write('src/pages/therapy-for-teens.astro', svcPage({
  title: 'Therapy for Teens Winnipeg | Adolescent Counselling | West End Therapy',
  metaDesc: 'Teen therapy in Winnipeg for ages 11–21. Compassionate counselling for adolescents facing anxiety, identity, family conflict and more at West End Therapy.',
  heroImg: `${IMG}/a73b4ce36899d3573c196f21c7a0ac87/gwvmbgpp-pq.jpeg`,
  tagline: 'Support through the toughest years',
  h1: 'Therapy for Teens in Winnipeg',
  intro: `The teen years — generally between the ages of 11 and 21 — can be very challenging for both teens and their families. At West End Therapy, we believe that incorporating relational work between parents and teens can be an important part of addressing the struggles that arise during this period.

Individual therapy may be more suitable for older teens (16+) who are gaining independence and need a private space to work through their feelings. For younger teens, we encourage some parent involvement in sessions, and can help the parent-child relationship move toward this over time.`,
  issues: [
    'Anxiety, panic attacks, and excessive worry',
    'Depression and low mood',
    'Identity and self-esteem challenges',
    'School refusal, academic stress, and performance anxiety',
    'Social difficulties and peer conflict',
    'Family conflict and communication breakdown',
    'Grief and loss',
    'Trauma and PTSD symptoms',
    'Behavioural difficulties at home or school',
    'Substance use concerns',
    'ADHD and attention difficulties',
  ],
  approaches: [
    'Emotionally Focused Family Therapy',
    'Cognitive Behavioural Therapy (CBT) adapted for teens',
    'Dialectical Behaviour Therapy (DBT) skills',
    'Narrative Therapy',
    'Attachment-Based approaches',
    'Mindfulness-based strategies',
  ],
  expect: `Your therapist will meet with you and your teen to understand the concerns from everyone's perspective. Depending on the age and situation, sessions may involve the teen individually, the parent-teen pair, or the whole family. We tailor our approach to the unique dynamics of each family and the specific developmental needs of the young person.`,
}));

write('src/pages/divorce-counselling.astro', svcPage({
  title: 'Divorce Counselling Winnipeg | Separation Support | West End Therapy',
  metaDesc: 'Divorce and separation counselling in Winnipeg. Compassionate support for individuals, couples, and families navigating separation at West End Therapy.',
  heroImg: WAIT,
  tagline: 'Navigating separation with support',
  h1: 'Divorce Counselling in Winnipeg',
  intro: `Divorce and separation can be one of the most emotionally challenging experiences a family faces. Whether you're just beginning to consider separation, in the middle of proceedings, or adjusting to life post-divorce, our counselling services are here to support you at every stage.

You may face uncertainty, grief, anger, anxiety, and confusion — these are normal responses, and you don't have to face them alone. We offer a safe, non-judgmental space to explore your emotions, find clarity, and begin healing.`,
  issues: [
    'Processing grief and loss related to the end of a relationship',
    'Managing anger, resentment, or betrayal',
    'Navigating co-parenting after separation',
    'Supporting children through family transitions',
    'Rebuilding identity and sense of self after divorce',
    'Managing anxiety and uncertainty about the future',
    'Establishing healthy post-divorce boundaries',
    'Communication difficulties between separating partners',
    'Trauma related to high-conflict separation',
  ],
  approaches: [
    'Emotionally Focused Therapy (EFT)',
    'Attachment-based approaches',
    'Narrative Therapy',
    'Co-parenting counselling',
    'Grief-focused therapy',
    'Solution-focused brief therapy',
  ],
  expect: `We work with individuals, couples who are separating, and families navigating divorce. Whether you are seeking individual support for yourself or joint sessions to navigate the separation process respectfully, our therapists will work collaboratively with you to establish goals that serve your wellbeing and that of your family.`,
}));

write('src/pages/stress-and-burnout-therapy.astro', svcPage({
  title: 'Stress & Burnout Therapy Winnipeg | West End Therapy',
  metaDesc: 'Stress and burnout counselling in Winnipeg. Evidence-based therapy to restore energy, find balance, and reconnect with your life at West End Therapy.',
  heroImg: HERO,
  tagline: 'Restore balance and reconnect with your life',
  h1: 'Stress & Burnout Therapy in Winnipeg',
  intro: `At West End Therapy, we provide compassionate stress and burnout counselling to help you find balance, restore energy, and reconnect with your life. Whether you're facing overwhelming stress, burnout, or feeling emotionally and physically drained, our therapists offer evidence-based approaches designed to guide you toward healing.

Burnout isn't just about fatigue — it's a deeper state of emotional exhaustion, mental strain, and loss of purpose. When stress becomes chronic, it can affect your energy, relationships, and sense of self.`,
  issues: [
    'Chronic work stress and occupational burnout',
    'Emotional exhaustion and numbness',
    'Cynicism or detachment from work or relationships',
    'Difficulty resting or "switching off"',
    'Physical symptoms of stress (tension, sleep disruption, illness)',
    'Loss of motivation and purpose',
    'Compassion fatigue (common in caregiving professions)',
    'Burnout related to parenting, caregiving, or life transitions',
    'Anxiety and depression linked to chronic stress',
  ],
  approaches: [
    'Cognitive Behavioural Therapy (CBT)',
    'Acceptance and Commitment Therapy (ACT)',
    'Mindfulness-Based Stress Reduction (MBSR)',
    'Somatic approaches to stress',
    'Boundary-setting and values clarification',
    'Self-compassion practices',
  ],
  expect: `Your therapist will work with you to understand the unique sources of your stress and develop a personalized plan. Sessions may include exploring thought patterns that fuel burnout, developing practical strategies for recovery, rebuilding sustainable routines, and reconnecting with what matters most to you.`,
}));

write('src/pages/obsessive-compulsive-disorder-therapy.astro', svcPage({
  title: 'OCD Therapy Winnipeg | Obsessive-Compulsive Disorder | West End Therapy',
  metaDesc: 'OCD therapy in Winnipeg. Evidence-based treatment for Obsessive-Compulsive Disorder including ERP and CBT at West End Therapy.',
  heroImg: HERO,
  tagline: 'Evidence-based support for OCD',
  h1: 'OCD Therapy in Winnipeg',
  intro: `Obsessive-Compulsive Disorder (OCD) is a mental health condition characterized by unwanted, intrusive thoughts (obsessions) and repetitive behaviours or mental acts (compulsions) performed to reduce distress. OCD can be consuming and deeply disruptive to daily life, relationships, and sense of self.

At West End Therapy, our therapists provide evidence-based treatment for OCD in a compassionate, non-judgmental environment. You are not your intrusive thoughts, and effective help is available.`,
  issues: [
    'Intrusive, unwanted thoughts or mental images',
    'Compulsive rituals (checking, cleaning, ordering, counting)',
    'Mental compulsions (reassurance-seeking, mental reviewing)',
    'Contamination OCD',
    'Harm OCD and unwanted violent thoughts',
    'Religious or moral scrupulosity OCD',
    'Relationship OCD (ROCD)',
    'OCD related to health anxiety or illness',
    'Pure-O (primarily obsessional) OCD',
  ],
  approaches: [
    'Exposure and Response Prevention (ERP) — gold-standard OCD treatment',
    'Cognitive Behavioural Therapy (CBT)',
    'Acceptance and Commitment Therapy (ACT)',
    'Inference-Based CBT (I-CBT)',
    'Mindfulness-based strategies',
  ],
  expect: `Effective OCD treatment typically involves Exposure and Response Prevention (ERP), where you gradually face feared situations while refraining from compulsive responses. Your therapist will explain this process carefully and ensure you feel supported throughout. ERP can feel challenging, but research consistently shows it is highly effective for OCD.`,
}));

write('src/pages/attention-deficit-hyperactivity-disorder-therapy.astro', svcPage({
  title: 'ADHD Therapy Winnipeg | Counselling for Attention & Focus | West End Therapy',
  metaDesc: 'ADHD therapy in Winnipeg for children, teens, and adults. Practical, compassionate support for attention, focus, and emotional regulation at West End Therapy.',
  heroImg: HERO,
  tagline: 'Practical support for attention and focus',
  h1: 'ADHD Therapy in Winnipeg',
  intro: `Attention Deficit Hyperactivity Disorder (ADHD) affects how people pay attention, control impulses, and manage activity levels. ADHD can present differently across the lifespan — what looks like hyperactivity in a child may show up as chronic disorganization, difficulty completing tasks, or emotional dysregulation in an adult.

At West End Therapy, we offer compassionate, practical support for children, teens, and adults living with ADHD. Therapy does not replace medication, but it can be a powerful complement — helping you or your child develop strategies, build strengths, and thrive.`,
  issues: [
    'Difficulty sustaining attention and completing tasks',
    'Impulsivity and difficulty waiting',
    'Disorganization and time management struggles',
    'Emotional dysregulation and frustration',
    'Low self-esteem related to ADHD challenges',
    'Relationship difficulties linked to ADHD patterns',
    'School or work performance concerns',
    'Co-occurring anxiety or depression',
    'Parent support for children with ADHD',
  ],
  approaches: [
    'Cognitive Behavioural Therapy (CBT) adapted for ADHD',
    'Executive functioning coaching and skill-building',
    'Mindfulness-based approaches',
    'Parent coaching and behaviour management strategies',
    'Emotionally focused approaches for self-esteem and relationships',
  ],
  expect: `Your therapist will work collaboratively with you to identify specific challenges and develop practical, individualized strategies. For children, we may also work with parents to support the whole family system. Therapy is focused on building skills and confidence, not just managing symptoms.`,
}));

// ══════════════════════════════════════════════════════════════════════════════
// 3. THERAPY APPROACH / MODALITY PAGES
// ══════════════════════════════════════════════════════════════════════════════

function approachPage({ slug, name, acronym, intro, whatIs, benefits, conditions, usedFor }) {
  return `---
import Layout from '../layouts/Layout.astro';
---
<Layout title="${name} in Winnipeg | West End Therapy" description="${name} (${acronym || name}) offered at West End Therapy in Winnipeg. Evidence-based therapy for lasting change.">

  <section class="page-hero">
    <div class="wrap">
      <p class="eyebrow">Therapeutic Approach</p>
      <h1>${name}</h1>
      <p>${intro}</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap approach-layout">
      <div class="approach-main">
        <div class="svc-block">
          <h2>What is ${name}?</h2>
          ${whatIs.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('\n          ')}
        </div>
        ${benefits.length ? `<div class="svc-block"><h2>Benefits</h2><ul class="check-list">${benefits.map(b => `<li>${b}</li>`).join('\n            ')}</ul></div>` : ''}
        ${conditions.length ? `<div class="svc-block"><h2>What It Can Help With</h2><ul class="check-list">${conditions.map(c => `<li>${c}</li>`).join('\n            ')}</ul></div>` : ''}
        <div class="svc-block cta-block">
          <h2>Book a Session</h2>
          <p>Our therapists are trained in ${name} and integrate it alongside other evidence-based approaches. Fill out our intake form and we'll match you with the right fit.</p>
          <a href="/#intake-form" class="btn btn-teal" style="margin-top:1rem;">Book a Session</a>
        </div>
      </div>
      <aside class="svc-sidebar">
        <div class="sidebar-card cta-card">
          <h3>Ready to Start?</h3>
          <p>Fill out our 2-minute intake form and we'll match you with a therapist trained in ${acronym || name}.</p>
          <a href="/#intake-form" class="btn btn-teal" style="width:100%;justify-content:center;margin-top:1rem;">Book a Session</a>
        </div>
        <div class="sidebar-card">
          <h3>Explore More Approaches</h3>
          <ul class="sidebar-links">
            <li><a href="/cognitive-behavioural-therapy">Cognitive Behavioural Therapy</a></li>
            <li><a href="/dialectical-behavioural-therapy">Dialectical Behaviour Therapy</a></li>
            <li><a href="/attachment-based-therapy-winnipeg">Attachment-Based Therapy</a></li>
            <li><a href="/emdr-therapy">EMDR Therapy</a></li>
            <li><a href="/internal-family-systems-therapy-winnipeg">Internal Family Systems</a></li>
            <li><a href="/mindfulness-based-cognitive-therapy-mbct-winnipeg">MBCT</a></li>
            <li><a href="/narrative-therapy-winnipeg">Narrative Therapy</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</Layout>
<style>
.page-hero{background:linear-gradient(135deg,var(--teal-light),var(--teal-pale));padding-block:clamp(3rem,7vw,5rem);border-bottom:1px solid var(--border)}
.eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--teal);margin-bottom:.5rem}
.page-hero h1{margin-block:.25rem .75rem}
.page-hero p{max-width:60ch;font-size:1.05rem}
.approach-layout{display:grid;grid-template-columns:1fr 300px;gap:4rem;align-items:start}
@media(max-width:900px){.approach-layout{grid-template-columns:1fr}}
.approach-main .svc-block{margin-top:2.5rem}.approach-main .svc-block h2{font-size:1.5rem;margin-bottom:1rem}
.approach-main p{font-size:.97rem;line-height:1.8;margin-bottom:1rem;color:var(--dark)}
.check-list{display:grid;gap:.5rem}
.check-list li{padding:.4rem .75rem .4rem 2rem;position:relative;font-size:.92rem;color:var(--dark);line-height:1.6}
.check-list li::before{content:'✓';position:absolute;left:.5rem;color:var(--teal);font-weight:700}
.svc-sidebar{display:flex;flex-direction:column;gap:1.5rem}
.sidebar-card{background:var(--teal-pale);border-radius:6px;padding:1.5rem;border:1px solid var(--border)}
.cta-card{background:var(--teal-light)}
.sidebar-card h3{font-size:1rem;font-family:var(--font-b);font-weight:700;margin-bottom:.75rem}
.sidebar-card p{font-size:.88rem;line-height:1.6;margin-bottom:.25rem}
.sidebar-links{display:grid;gap:.35rem}
.sidebar-links a{font-size:.88rem;color:var(--teal);font-weight:500}
.sidebar-links a:hover{color:var(--teal-dark);text-decoration:underline}
</style>`;
}

write('src/pages/cognitive-behavioural-therapy.astro', approachPage({
  slug: 'cognitive-behavioural-therapy',
  name: 'Cognitive Behavioural Therapy',
  acronym: 'CBT',
  intro: 'One of the most well-researched and effective forms of therapy, helping you identify and change unhelpful thought patterns and behaviours.',
  whatIs: `Cognitive Behavioural Therapy (CBT) is a structured, evidence-based form of psychotherapy that explores the connection between thoughts, feelings, and behaviours. The core insight of CBT is that our thoughts influence how we feel and how we act — and that by identifying and challenging unhelpful thinking patterns, we can change how we feel and respond to life's challenges.\n\nCBT is typically goal-oriented and practical, with skills and strategies you can apply outside of sessions. It has been extensively researched and is recommended for a wide range of mental health concerns.`,
  benefits: ['Practical, skills-based tools you can use day-to-day', 'Relatively short-term with measurable progress', 'Effective for a wide range of concerns', 'Helps you become your own therapist over time', 'Strong evidence base across many conditions'],
  conditions: ['Anxiety disorders and panic attacks', 'Depression and low mood', 'OCD', 'PTSD', 'Phobias', 'Eating disorders', 'Insomnia', 'Anger management', 'Relationship difficulties'],
}));

write('src/pages/dialectical-behavioural-therapy.astro', approachPage({
  slug: 'dialectical-behavioural-therapy',
  name: 'Dialectical Behaviour Therapy',
  acronym: 'DBT',
  intro: 'A skills-based therapy originally developed for intense emotional experiences, now widely used to build distress tolerance, mindfulness, and interpersonal effectiveness.',
  whatIs: `Dialectical Behaviour Therapy (DBT) was originally developed by Dr. Marsha Linehan to treat Borderline Personality Disorder, but is now widely used for anyone struggling with intense emotions, impulsive behaviours, or difficult relationships.\n\nDBT balances acceptance (understanding and validating your experience as it is) with change (developing new skills and behaviours). It teaches four core skill sets: mindfulness, distress tolerance, emotional regulation, and interpersonal effectiveness.`,
  benefits: ['Builds practical, lasting emotional regulation skills', 'Teaches mindfulness in an accessible, skills-based way', 'Reduces self-destructive behaviours', 'Improves relationships and communication', 'Highly effective for intense emotional experiences'],
  conditions: ['Borderline Personality Disorder (BPD)', 'Emotional dysregulation', 'Self-harm and suicidal ideation', 'Eating disorders', 'Substance use concerns', 'PTSD', 'Depression and anxiety', 'Chronic relationship difficulties'],
}));

write('src/pages/attachment-based-therapy-winnipeg.astro', approachPage({
  slug: 'attachment-based-therapy-winnipeg',
  name: 'Attachment-Based Therapy',
  acronym: 'Attachment Therapy',
  intro: 'Rooted in attachment theory, this approach explores how early relationships shape your emotional world and current ways of connecting with others.',
  whatIs: `Attachment-Based Therapy draws on attachment theory — the idea that our earliest bonds with caregivers fundamentally shape how we relate to ourselves and others throughout life. Insecure attachment experiences in childhood can result in patterns of anxiety, avoidance, or disorganization in relationships.\n\nBy exploring these patterns in a safe therapeutic relationship, clients can develop greater self-awareness, heal attachment wounds, and build more secure, satisfying connections with others.`,
  benefits: ['Helps you understand the roots of relationship patterns', 'Builds earned security through the therapeutic relationship', 'Deepens self-awareness and emotional understanding', 'Improves relationships with partners, children, and others', 'Particularly effective for trauma and relational wounds'],
  conditions: ['Relationship difficulties and attachment anxiety', 'Fear of abandonment or rejection', 'Avoidant patterns in relationships', 'Childhood trauma and neglect', 'Parenting challenges', 'Couples therapy', 'Grief and loss'],
}));

write('src/pages/internal-family-systems-therapy-winnipeg.astro', approachPage({
  slug: 'internal-family-systems-therapy-winnipeg',
  name: 'Internal Family Systems',
  acronym: 'IFS',
  intro: 'A powerful, compassionate model that understands the mind as made up of different "parts" — helping you heal inner conflict and reconnect with your core Self.',
  whatIs: `Internal Family Systems (IFS) is a transformative, evidence-based model developed by Dr. Richard Schwartz. IFS understands the mind as a system of distinct sub-personalities or "parts," each with their own perspectives, feelings, and roles.\n\nSome parts carry burdens from difficult past experiences (called exiles), while other parts work to protect us from pain (managers and firefighters). IFS therapy helps you build a compassionate relationship with all your parts and access your core Self — a state of calm, clarity, and confidence — to facilitate healing.`,
  benefits: ['Non-pathologizing — all parts of you are welcome', 'Deeply effective for trauma and shame', 'Builds self-compassion and inner harmony', 'Works well alongside other approaches', 'Helps resolve inner conflict and ambivalence'],
  conditions: ['Trauma and PTSD', 'Depression and anxiety', 'Shame and low self-worth', 'Eating disorders', 'Relationship difficulties', 'Addictions', 'Chronic pain and physical illness', 'Personal growth and self-discovery'],
}));

write('src/pages/mindfulness-based-cognitive-therapy-mbct-winnipeg.astro', approachPage({
  slug: 'mindfulness-based-cognitive-therapy-mbct-winnipeg',
  name: 'Mindfulness-Based Cognitive Therapy',
  acronym: 'MBCT',
  intro: 'A structured program combining mindfulness meditation with cognitive therapy to break the cycle of recurring depression and chronic anxiety.',
  whatIs: `Mindfulness-Based Cognitive Therapy (MBCT) was developed by Zindel Segal, Mark Williams, and John Teasdale as a relapse prevention program for recurrent depression. It combines the principles of Cognitive Behavioural Therapy with mindfulness meditation practices.\n\nMBCT teaches you to pay attention to thoughts and feelings without getting caught up in them — developing a different relationship with your inner experience. Rather than trying to change thoughts, MBCT helps you observe them with curiosity and distance, breaking the automatic patterns that lead to depression and anxiety relapse.`,
  benefits: ['Significantly reduces risk of depression relapse', 'Builds sustained mindfulness skills', 'Reduces rumination and worry', 'Improves emotional regulation', 'Backed by strong clinical research'],
  conditions: ['Recurrent depression', 'Chronic anxiety and worry', 'Stress and burnout', 'Emotional dysregulation', 'Prevention of depression relapse', 'Bipolar disorder (as adjunct)', 'General wellbeing and resilience'],
}));

write('src/pages/narrative-therapy-winnipeg.astro', approachPage({
  slug: 'narrative-therapy-winnipeg',
  name: 'Narrative Therapy',
  acronym: 'Narrative Therapy',
  intro: 'An approach that helps you separate your identity from your problems, explore the stories you tell about yourself, and author a new, preferred story.',
  whatIs: `Narrative Therapy, developed by Michael White and David Epston, is based on the idea that we understand our lives through the stories we tell. The problems we experience are separate from who we are — and the dominant story we've been told (or tell ourselves) about our lives is not the only story available.\n\nNarrative therapy uses techniques such as externalizing problems, exploring exceptions, and re-authoring to help clients reclaim their preferred identity and build a richer, more empowering life story. It is deeply collaborative and honours each person's cultural background and lived experience.`,
  benefits: ['Non-pathologizing — you are not the problem', 'Honours cultural identity and community values', 'Empowers clients as experts on their own lives', 'Particularly effective for trauma, identity, and cultural concerns', 'Works well with individuals, couples, and families'],
  conditions: ['Identity and self-esteem struggles', 'Trauma and abuse', 'Grief and loss', 'Relationship difficulties', 'Cultural identity and belonging', 'Depression and anxiety', 'Family conflict', 'Experiences of oppression or marginalization'],
}));

// ══════════════════════════════════════════════════════════════════════════════
// 4. FILTERED THERAPIST LIST PAGES
// ══════════════════════════════════════════════════════════════════════════════

const allTherapists = [
  { slug:'christine-holowick', name:'Christine Holowick', creds:'MMFT, BSW/RSW', role:'Clinic Director & Therapist', spec:'Individuals (16+), Couples, EMDR', avail:'Closed to new referrals', waitlist:false, img:'9b14074c0dc640b2a34d4622c188f7a4/dsc_0164.jpg', tags:['couples','emdr'] },
  { slug:'caroline-beattie', name:'Caroline Beattie', creds:'MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families with Children/Youth', avail:'Wait List', waitlist:true, img:'eacb74ba64194829865812de8032d02c/cb-profile-pic.jpeg', tags:['couples','children'] },
  { slug:'simon-thome', name:'Simon Thome', creds:'MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families', avail:'Wed 9 AM – 2:45 PM', waitlist:false, img:'54d9a24e941944839d615b6c7c6689f6/st-profile-pic-cropped.jpeg', tags:['couples'] },
  { slug:'melissa-pilz', name:'Melissa Pilz', creds:'MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families', avail:'Wait List', waitlist:true, img:'f9c06e146452457ea000edaf61ca844a/img_9968-jpg.jpg', tags:['couples'] },
  { slug:'julie-kettle', name:'Julie Kettle', creds:'MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families', avail:'Mon 9 AM – 2:45 PM · Tues 3 PM – 9 PM', waitlist:false, img:'eae9b9ec78ae41aea20fa89bf6cb4f58/f97cd037-9510-4342-9e29-40b3401c5f0f_1_201_a.jpeg', tags:['couples'] },
  { slug:'marie-baffoe', name:'Marie Baffoe', creds:'MMFT, MSW/RSW', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families, EMDR', avail:'Wait List', waitlist:true, img:'e917830f941b4992ba58b10d9062ea80/230910ls117.jpg', tags:['couples','emdr','nihb'] },
  { slug:'michael-kurek', name:'Michael Kurek', creds:'MMFT', role:'Associate Therapist', spec:'Adults, Couples, Families, EMDR', avail:'Mon, Tues & Wed 3 – 9 PM', waitlist:false, img:'32690e2670654fbd9f2c62c14bddd621/michael-k-bio-phot.jpg', tags:['couples','emdr'] },
  { slug:'mel-clark', name:'Mel Clark', creds:'MMFT, CCC', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families', avail:'Tues, Wed, Thurs daytimes', waitlist:false, img:'b29ac3153b1a4df29e7f622301b4af19/mel-clark.jpeg', tags:['couples'] },
  { slug:'brianna-bowen', name:'Brianna Bowen', creds:'MSW/RSW', role:'Associate Therapist', spec:'Children & Teens, Adults, Families', avail:'Tues 9 AM – 4 PM', waitlist:false, img:'90022c5db0674e908db3d1c70f8ca96c/img_4751.jpeg', tags:['children','nihb'] },
  { slug:'olivia-barker', name:'Olivia Barker', creds:'MSW/RSW', role:'Associate Therapist', spec:'Individuals (16+), EMDR', avail:'Wait List', waitlist:true, img:'63b7dd85df5c41eb98f227a9e8e5ed7b/image_50791937-1.jpg', tags:['emdr'] },
  { slug:'laura-canfield', name:'Laura Canfield', creds:'BSW/RSW, MMFT Candidate', role:'Associate Therapist', spec:'Individuals (16+), Couples', avail:'Tues & Thu 3 PM – 9 PM · Wed & Fri 9 AM – 2:45 PM', waitlist:false, img:'1b4b54e62ef0466585641842d34d8699/headshot-laura.jpg', tags:['couples'] },
  { slug:'lena-morina', name:'Lena Morina', creds:'MMFT', role:'Associate Therapist', spec:'Families (children 8+) & Teens, Individuals, Couples', avail:'Mon & Wed 5 PM – 9 PM', waitlist:false, img:'29ad796eaa33dd18a6135682541f4c6f/img_4286.jpeg', tags:['couples','children'] },
  { slug:'hyoshin-jang', name:'Hyoshin Jang', creds:'MMFT, BSW/RSW', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families', avail:'Tues, Thurs, Fri eves online', waitlist:false, img:'0d6ba507acd069265f4cf668810bcfab/img_0626.jpeg', tags:['couples'] },
  { slug:'deanna-lutzek', name:'Deanna Lutzek', creds:'MA, CCC', role:'Associate Therapist', spec:'Children (7+), Teens, Adults, EMDR', avail:'Tues 9 AM – 2:45 PM · Fri 4 PM – 7 PM', waitlist:false, img:'4724021c5b218e89c24e1f4162a14b7e/image0.jpeg', tags:['children','emdr'] },
  { slug:'ioanna-charatsari', name:'Ioanna Charatsari', creds:'MMFT', role:'Associate Therapist', spec:'Individuals, Couples, Families (age 6+)', avail:'Tue & Thur 5 PM – 9 PM', waitlist:false, img:'6511fcefc7a0424038d40dddaa532f4f/ioanna-bio-photo2.jpeg', tags:['couples','children'] },
  { slug:'sonja-iserloh', name:'Sonja Iserloh', creds:'MSW/RSW', role:'Associate Therapist', spec:'Individual Adults', avail:'Wed 4 PM – 9 PM', waitlist:false, img:'2c78baf5e22b29f20b9d958c0ec284f3/img_8201.jpeg', tags:[] },
  { slug:'michelle-lewicki', name:'Michelle Lewicki', creds:'MMFT, CCC', role:'Associate Therapist', spec:'Individuals, Couples, Families', avail:'Wed & Thur 4 PM – 9 PM · Sun 12 PM – 5 PM', waitlist:false, img:'b227ee3a6c48c096e2f79d3c90b78aba/michelle-photo.png', tags:['couples'] },
  { slug:'julie-letkeman', name:'Julie Letkeman', creds:'MMFT', role:'Associate Therapist', spec:'Individuals (Adults & Youth 10+), Couples, Families', avail:'Wed 6 PM – 9 PM', waitlist:false, img:'57c95b618c88fe42e1648c96d3e74db5/julie-l-bio-photo.jpg', tags:['couples','children'] },
  { slug:'kristin-millar', name:'Kristin Millar', creds:'MMFT, BSW/RSW', role:'Associate Therapist', spec:'Individuals (Adults & Youth 4+), Couples, Families', avail:'Tue & Wed 5:30 – 9 PM', waitlist:false, img:'fe3316c270838a7b73e566d32ca58fa4/km-picture.jpeg', tags:['couples','children'] },
  { slug:'steven-duvenaud', name:'Steven Duvenaud', creds:'MACP, CCC', role:'Associate Therapist', spec:'Individuals (15+)', avail:'Mon, Tue, Thu & Fri 9 AM – 2:45 PM', waitlist:false, img:'27e7edcaa9b5a30d32428452ada3f65b/steven-photo.jpeg', tags:[] },
  { slug:'lara-solis', name:'Lara Solis', creds:'MSW/RSW', role:'Associate Therapist', spec:'Individuals (16+)', avail:'Mon 3 PM – 9 PM · Sun 10 AM – 5 PM', waitlist:false, img:'94a8c771975d150154728882e9a4ad67/lara-bio-photo.jpeg', tags:['nihb'] },
  { slug:'kelly-ferguson', name:'Kelly Ferguson', creds:'MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples', avail:'Wed 9:45 AM – 4:45 PM', waitlist:false, img:'7c1c23e7dd9c42d6a8712a2e5980bc5d/kelly-f-bio-photo.jpg', tags:['couples'] },
  { slug:'jaymie-friesen', name:'Jaymie Friesen', creds:'MPS, CCC', role:'Associate Therapist', spec:'Individuals (18+)', avail:'Mon 3 PM – 9 PM', waitlist:false, img:'ceae02a67d028082d642408fb71be668/jaymie-bio-photo.jpg', tags:[] },
  { slug:'katrina-forget', name:'Katrina Forget', creds:'MACP, CCC', role:'Associate Therapist', spec:'Children & Youth aged 3+, Parents', avail:'Mon 5 PM – 9 PM · Sat 10 AM – 3 PM', waitlist:false, img:'6f4b5f265199d40aa7c751f7a09b050d/kforget-pic.png', tags:['children'] },
];

function filteredTherapistPage({ pagePath, title, metaDesc, h1, subtitle, filtered }) {
  const cards = filtered.map(t => `
          <a href="/therapists/${t.slug}" class="thx-card">
            <img src="${IMG}/${t.img}" alt="${t.name}" loading="lazy"/>
            <div class="thx-card__body">
              <div class="thx-card__name">${t.name}</div>
              <span class="thx-card__creds">${t.creds}</span>
              <span class="thx-card__role">${t.role}</span>
              <p class="thx-card__spec">${t.spec}</p>
              <div class="thx-card__avail${t.waitlist ? ' waitlist' : ''}">${t.avail}</div>
            </div>
          </a>`).join('');

  return `---
import Layout from '../layouts/Layout.astro';
---
<Layout title="${title}" description="${metaDesc}">
  <section class="page-hero">
    <div class="wrap">
      <h1>${h1}</h1>
      <p>${subtitle}</p>
      <a href="/therapists" class="btn btn-outline" style="margin-top:1.25rem;display:inline-flex;">View All Therapists</a>
    </div>
  </section>
  <section class="section">
    <div class="wrap">
      <div class="thx-grid">${cards}
      </div>
      <div style="text-align:center;margin-top:3rem;">
        <a href="/#intake-form" class="btn btn-teal">Fill Out Our Intake Form</a>
      </div>
    </div>
  </section>
</Layout>
<style>
.page-hero{background:linear-gradient(135deg,var(--teal-light),var(--teal-pale));padding-block:clamp(3rem,7vw,5rem);border-bottom:1px solid var(--border)}
.page-hero h1{margin-block:.5rem .75rem}
.page-hero p{max-width:55ch;font-size:1.05rem}
.thx-card__creds{font-size:.7rem;font-weight:600;letter-spacing:.08em;color:var(--mid);display:block;margin-bottom:.15rem}
</style>`;
}

const accepting = allTherapists.filter(t => !t.waitlist);
write('src/pages/currently-accepting-new-clients.astro', filteredTherapistPage({
  pagePath: 'currently-accepting-new-clients',
  title: 'Therapists Currently Accepting New Clients | West End Therapy',
  metaDesc: 'View West End Therapy therapists who are currently accepting new clients in Winnipeg.',
  h1: 'Currently Accepting New Clients',
  subtitle: 'The following therapists have availability and are accepting new clients. Please note availability changes frequently.',
  filtered: accepting,
}));

const couplesT = allTherapists.filter(t => t.tags.includes('couples'));
write('src/pages/couples-therapists.astro', filteredTherapistPage({
  pagePath: 'couples-therapists',
  title: 'Couples & Relational Therapists Winnipeg | West End Therapy',
  metaDesc: 'Find a couples therapist in Winnipeg at West End Therapy. All therapists are Master\'s-level and trained in relational approaches.',
  h1: 'Relational Therapists',
  subtitle: 'Our couples and relational therapists work with partners and families to improve communication, rebuild connection, and navigate challenges together.',
  filtered: couplesT,
}));

const childT = allTherapists.filter(t => t.tags.includes('children'));
write('src/pages/child-adolescent-therapists.astro', filteredTherapistPage({
  pagePath: 'child-adolescent-therapists',
  title: 'Child & Adolescent Therapists Winnipeg | West End Therapy',
  metaDesc: 'Find a child or teen therapist in Winnipeg at West End Therapy. Compassionate support for children and adolescents.',
  h1: 'Child & Adolescent Therapists',
  subtitle: 'Our child and adolescent therapists specialize in age-appropriate, evidence-based support for young people and their families.',
  filtered: childT,
}));

const emdrT = allTherapists.filter(t => t.tags.includes('emdr'));
write('src/pages/therapists-for-emdr-therapy.astro', filteredTherapistPage({
  pagePath: 'therapists-for-emdr-therapy',
  title: 'EMDR Therapists Winnipeg | West End Therapy',
  metaDesc: 'Find an EMDR-trained therapist in Winnipeg at West End Therapy. Evidence-based trauma processing for PTSD and more.',
  h1: 'EMDR-Practicing Therapists',
  subtitle: 'The following therapists are trained in EMDR (Eye Movement Desensitization and Reprocessing) and offer this evidence-based trauma treatment.',
  filtered: emdrT,
}));

const nihbT = allTherapists.filter(t => t.tags.includes('nihb'));
write('src/pages/NIHB-approved-therapists.astro', filteredTherapistPage({
  pagePath: 'NIHB-approved-therapists',
  title: 'NIHB-Approved Therapists Winnipeg | West End Therapy',
  metaDesc: 'West End Therapy therapists who accept Non-Insured Health Benefits (NIHB) for First Nations and Inuit clients in Winnipeg.',
  h1: 'NIHB-Approved Therapists',
  subtitle: 'The following therapists at West End Therapy accept Non-Insured Health Benefits (NIHB), the federal health benefit program for First Nations and Inuit clients.',
  filtered: nihbT,
}));

// ══════════════════════════════════════════════════════════════════════════════
// 5. FAQ, RATES, OPPORTUNITIES, LEGAL PAGES
// ══════════════════════════════════════════════════════════════════════════════

write('src/pages/faq.astro', `---
import Layout from '../layouts/Layout.astro';
const faqs = [
  { q: "I'm having trouble accessing the building. What do I do?", a: "Our office is accessible by appointment only. Please contact your therapist directly if you are having trouble accessing the building, as we do not have admin staff on site." },
  { q: "Which therapists are currently accepting new clients?", a: "Please visit our Currently Accepting New Clients page for the most up-to-date availability. You can also fill out our 2-minute intake form and we will match you with a therapist who is accepting new clients." },
  { q: "What is the cost per session?", a: "Individual therapy sessions (50 minutes) range from $125–$145. Couples and family sessions range from $145–$185 depending on length. Please see our Rates page for full details, or contact us for more information." },
  { q: "What are your accepted methods of payment?", a: "We accept e-transfer, credit card, and debit. Payment is due at the time of the session." },
  { q: "Are your services covered by health insurance?", a: "Many extended health benefit plans include coverage for therapy services. Coverage varies depending on your plan and the credentials of your therapist. We recommend contacting your insurance provider to confirm your coverage before booking." },
  { q: "Do you direct bill?", a: "We do not currently offer direct billing. We provide a receipt after each session that you can submit to your insurance provider for reimbursement." },
  { q: "Are your therapists licensed?", a: "All of our therapists hold a Master's degree in their field and are registered or licensed with their respective professional body in Manitoba. This includes the Manitoba College of Social Workers (MCSW), the Canadian Association for Couple and Family Therapy (CACFT), and others." },
  { q: "How do I choose a therapist?", a: "Choosing the right therapist is important. We encourage you to read through our therapist bios to find someone whose training, approach, and personality feel like a good fit. You can also fill out our intake form and let us match you with the right therapist for your needs." },
  { q: "What should I expect for the first appointment and after?", a: "Your first session is an opportunity to share what brings you to therapy in a relaxed, non-judgmental setting. Your therapist will listen, ask questions, and begin to understand your situation and goals. Subsequent sessions will build on this, working collaboratively toward the goals you set together." },
  { q: "How often should I go to therapy?", a: "Most clients attend therapy once per week or every two weeks, especially in the beginning. The frequency of sessions is something you and your therapist will determine together based on your needs, goals, and schedule." },
  { q: "What else can I do to improve my emotional and mental health?", a: "Therapy is most effective when combined with other healthy habits. These include regular physical activity, adequate sleep, meaningful social connection, time in nature, creative expression, and practices like journaling or mindfulness. Your therapist can offer guidance tailored to your situation." },
];
---
<Layout title="Frequently Asked Questions | West End Therapy" description="Answers to common questions about therapy at West End Therapy in Winnipeg — rates, insurance, booking, and more.">
  <section class="page-hero">
    <div class="wrap">
      <h1>Frequently Asked Questions</h1>
      <p>Everything you need to know about booking and attending therapy at West End Therapy.</p>
    </div>
  </section>
  <section class="section">
    <div class="wrap faq-wrap">
      {faqs.map((f, i) => (
        <details class="faq-item" open={i === 0}>
          <summary class="faq-q">{f.q}</summary>
          <p class="faq-a">{f.a}</p>
        </details>
      ))}
      <div class="faq-cta">
        <p>Still have questions? We're happy to help.</p>
        <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-teal">Email Us</a>
        <a href="tel:+12048099114" class="btn btn-outline">(204) 809-9114</a>
      </div>
    </div>
  </section>
</Layout>
<style>
.page-hero{background:linear-gradient(135deg,var(--teal-light),var(--teal-pale));padding-block:clamp(3rem,7vw,5rem);border-bottom:1px solid var(--border)}
.page-hero h1{margin-block:.5rem .75rem}.page-hero p{max-width:55ch;font-size:1.05rem}
.faq-wrap{max-width:760px}
.faq-item{border:1px solid var(--border);border-radius:6px;margin-bottom:1rem;background:#fff;overflow:hidden}
.faq-item[open]{border-color:var(--teal)}
.faq-q{padding:1.25rem 1.5rem;font-family:var(--font-h);font-size:1.15rem;font-weight:600;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;color:var(--black)}
.faq-q::after{content:'+';font-family:var(--font-b);font-size:1.4rem;font-weight:300;color:var(--teal);flex-shrink:0;margin-left:1rem}
.faq-item[open] .faq-q::after{content:'−'}
.faq-a{padding:.25rem 1.5rem 1.25rem;font-size:.97rem;line-height:1.75;color:var(--dark);margin:0}
.faq-cta{margin-top:3rem;padding:2rem;background:var(--teal-pale);border-radius:6px;display:flex;flex-wrap:wrap;align-items:center;gap:1rem}
.faq-cta p{font-size:1rem;font-weight:600;flex:1;margin:0}
</style>
`);

write('src/pages/our-rates.astro', `---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Therapy Rates Winnipeg | West End Therapy" description="Therapy session rates at West End Therapy in Winnipeg. Individual, couples, family, child, and EMDR therapy fees.">
  <section class="page-hero">
    <div class="wrap">
      <h1>Our Rates</h1>
      <p>Transparent, competitive pricing for all therapy services at West End Therapy.</p>
    </div>
  </section>
  <section class="section">
    <div class="wrap rates-wrap">
      <div class="rates-grid">
        <div class="rate-card">
          <div class="rate-card__icon">👤</div>
          <h2>Individual Therapy</h2>
          <p class="rate-label">Age 16 and up</p>
          <p class="rate-length">Typical session length: 50–60 minutes<br><em>60–90 minutes for EMDR</em></p>
          <ul class="rate-list">
            <li><span>50-minute session</span><strong>$125 – $145</strong></li>
            <li><span>60-minute session</span><strong>$135 – $180</strong></li>
          </ul>
          <p class="rate-note">Please contact us for further details.</p>
        </div>
        <div class="rate-card">
          <div class="rate-card__icon">💑</div>
          <h2>Relational Therapy</h2>
          <p class="rate-label">Couples & Families</p>
          <p class="rate-length">Typical session length: 60–70 minutes</p>
          <ul class="rate-list">
            <li><span>50–60 minute session</span><strong>$145 – $180</strong></li>
            <li><span>70-minute session</span><strong>$165 – $185</strong></li>
          </ul>
          <p class="rate-note">Please contact us for further details.</p>
        </div>
        <div class="rate-card">
          <div class="rate-card__icon">🧸</div>
          <h2>Child & Adolescent Therapy</h2>
          <p class="rate-label">Play-Based Therapy</p>
          <p class="rate-length">Typical session length: 50 minutes</p>
          <ul class="rate-list">
            <li><span>Per session</span><strong>$145 – $180</strong></li>
          </ul>
          <p class="rate-note">Please contact us for further details.</p>
        </div>
      </div>
      <div class="insurance-note">
        <h2>Insurance & Coverage</h2>
        <p>Many extended health benefit plans include coverage for therapy with registered therapists. We recommend contacting your insurance provider to confirm your coverage before your first session.</p>
        <p>We accept the following insurance plans:</p>
        <ul class="ins-list">
          <li>Manitoba Blue Cross</li><li>Canada Life</li><li>SunLife</li>
          <li>Medavie Blue Cross (RCMP & non-RCMP)</li>
          <li>Treaty Status / First Nations & Inuit Health Branch (NIHB)</li>
        </ul>
        <p style="margin-top:1rem;"><strong>Note:</strong> We do not currently offer direct billing. We provide a receipt after each session for you to submit to your insurance provider.</p>
        <div style="margin-top:2rem;display:flex;flex-wrap:wrap;gap:1rem;">
          <a href="/#intake-form" class="btn btn-teal">Book a Session</a>
          <a href="/faq" class="btn btn-outline">Read Our FAQ</a>
        </div>
      </div>
    </div>
  </section>
</Layout>
<style>
.page-hero{background:linear-gradient(135deg,var(--teal-light),var(--teal-pale));padding-block:clamp(3rem,7vw,5rem);border-bottom:1px solid var(--border)}
.page-hero h1{margin-block:.5rem .75rem}.page-hero p{max-width:55ch;font-size:1.05rem}
.rates-wrap{max-width:900px}
.rates-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-bottom:3rem}
@media(max-width:780px){.rates-grid{grid-template-columns:1fr}}
.rate-card{background:#fff;border:1px solid var(--border);border-radius:8px;padding:2rem;display:flex;flex-direction:column;gap:.5rem}
.rate-card__icon{font-size:2rem;margin-bottom:.25rem}
.rate-card h2{font-size:1.3rem;margin:0}
.rate-label{font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--teal)}
.rate-length{font-size:.88rem;color:var(--mid);line-height:1.5;margin-top:.25rem}
.rate-list{display:flex;flex-direction:column;gap:.5rem;margin-top:1rem;border-top:1px solid var(--border);padding-top:1rem}
.rate-list li{display:flex;justify-content:space-between;align-items:center;font-size:.9rem}
.rate-list span{color:var(--mid)}
.rate-list strong{color:var(--black);font-weight:700}
.rate-note{font-size:.82rem;color:var(--mid);margin-top:.5rem;font-style:italic}
.insurance-note{background:var(--teal-pale);border-radius:8px;padding:2rem;border:1px solid var(--border)}
.insurance-note h2{margin-bottom:1rem}
.insurance-note p{font-size:.97rem;line-height:1.75;margin-bottom:.75rem;color:var(--dark)}
.ins-list{display:grid;grid-template-columns:repeat(2,1fr);gap:.4rem;margin:.75rem 0}
.ins-list li{font-size:.9rem;color:var(--dark);padding-left:1.25rem;position:relative}
.ins-list li::before{content:'✓';position:absolute;left:0;color:var(--teal);font-weight:700}
@media(max-width:500px){.ins-list{grid-template-columns:1fr}}
</style>
`);

write('src/pages/opportunities.astro', `---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Therapist Career Opportunities | West End Therapy Winnipeg" description="Join the West End Therapy team in Winnipeg. We are hiring Associate Therapists — MMFT, MSW, CCC and EMDR-trained welcome.">
  <section class="page-hero">
    <div class="wrap">
      <h1>Career Opportunities</h1>
      <p>Join a supportive, collaborative team of passionate therapists in Winnipeg.</p>
    </div>
  </section>
  <section class="section">
    <div class="wrap opp-wrap">
      <div class="opp-main">
        <div class="job-card">
          <div class="job-badge">Currently Hiring</div>
          <h2>Associate Therapist — EMDR Therapy</h2>
          <p class="job-type">Independent Contractor · Part-time or Full-time · In-Person & Online</p>
          <p>West End Therapy is a private, fee-for-service therapy practice located at 759 Wall Street, Winnipeg. We provide individual, couple, and family therapy via in-person and online sessions. We are looking to expand our team with therapists who are passionate and enthusiastic about what they do.</p>
          <h3>About the Role</h3>
          <p>Associate Therapists are self-employed as Independent Contractors and work with a high degree of independence. All client referrals are provided through West End Therapy intake, and the infrastructure is in place to begin working with clients immediately upon employment. Associate Therapists have scheduled weekly office hours, with part-time and full-time hours available. Associate Therapists may concurrently be employed with another agency or maintain their own private practice.</p>
          <h3>Qualifications</h3>
          <ul class="check-list">
            <li>Master's Degree in Marriage & Family Therapy (MMFT), Social Work (MSW), Counselling Psychology (MA/MACP), or equivalent</li>
            <li>Registered or eligible for registration with applicable Manitoba professional body (MCSW, CACFT, CCPA, etc.)</li>
            <li>EMDR training (Basic or Advanced) is an asset</li>
            <li>Experience with trauma-informed approaches</li>
            <li>Strong clinical skills and commitment to ongoing professional development</li>
            <li>Comfortable working independently and collaboratively</li>
          </ul>
          <h3>What We Offer</h3>
          <ul class="check-list">
            <li>Competitive fee-for-service compensation</li>
            <li>Fully furnished, professional office space at 759 Wall St</li>
            <li>Secure online platform for virtual sessions</li>
            <li>Client referrals provided through our intake system</li>
            <li>Collegial, supportive team environment</li>
            <li>Flexible scheduling</li>
          </ul>
          <div class="job-apply">
            <h3>How to Apply</h3>
            <p>To apply, please send your CV and a brief cover letter to:</p>
            <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-teal">inquiries@westendtherapy.ca</a>
          </div>
        </div>
        <div class="job-card">
          <div class="job-badge">Currently Hiring</div>
          <h2>Associate Therapist — General Practice</h2>
          <p class="job-type">Independent Contractor · Part-time or Full-time · In-Person & Online</p>
          <p>We are also seeking Associate Therapists with experience working with individuals, couples, and/or families. Whether you specialize in a particular population or approach, we welcome applications from therapists who are dedicated to providing high-quality, compassionate care.</p>
          <div class="job-apply">
            <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-teal">Apply Now</a>
            <a href="/contact" class="btn btn-outline">Contact Us</a>
          </div>
        </div>
      </div>
      <aside class="opp-sidebar">
        <div class="sidebar-card cta-card">
          <h3>Apply Today</h3>
          <p>Send your CV and cover letter to our team.</p>
          <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-teal" style="width:100%;justify-content:center;margin-top:1rem;">Email Your Application</a>
        </div>
        <div class="sidebar-card">
          <h3>Contact</h3>
          <p><a href="tel:+12048099114">(204) 809-9114</a></p>
          <p><a href="mailto:inquiries@westendtherapy.ca">inquiries@westendtherapy.ca</a></p>
          <p style="font-size:.85rem;margin-top:.5rem;">759 Wall St<br>Winnipeg, MB R3G 2T6</p>
        </div>
      </aside>
    </div>
  </section>
</Layout>
<style>
.page-hero{background:linear-gradient(135deg,var(--teal-light),var(--teal-pale));padding-block:clamp(3rem,7vw,5rem);border-bottom:1px solid var(--border)}
.page-hero h1{margin-block:.5rem .75rem}.page-hero p{max-width:55ch;font-size:1.05rem}
.opp-wrap{display:grid;grid-template-columns:1fr 300px;gap:4rem;align-items:start}
@media(max-width:900px){.opp-wrap{grid-template-columns:1fr}}
.opp-main{display:flex;flex-direction:column;gap:2rem}
.job-card{background:#fff;border:1px solid var(--border);border-radius:8px;padding:2rem}
.job-badge{display:inline-block;background:var(--teal);color:#fff;font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.25rem .7rem;border-radius:3px;margin-bottom:1rem}
.job-card h2{font-size:1.5rem;margin-bottom:.25rem}
.job-type{font-size:.82rem;font-weight:600;color:var(--teal);margin-bottom:1.25rem;display:block}
.job-card p{font-size:.95rem;line-height:1.75;color:var(--dark);margin-bottom:1rem}
.job-card h3{font-size:1rem;font-family:var(--font-b);font-weight:700;margin:1.5rem 0 .75rem;color:var(--black)}
.check-list{display:grid;gap:.5rem;margin-bottom:1rem}
.check-list li{padding:.35rem .75rem .35rem 2rem;position:relative;font-size:.92rem;color:var(--dark)}
.check-list li::before{content:'✓';position:absolute;left:.5rem;color:var(--teal);font-weight:700}
.job-apply{margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid var(--border);display:flex;flex-wrap:wrap;gap:1rem;align-items:center}
.job-apply h3{width:100%;margin:0 0 .5rem}
.opp-sidebar{display:flex;flex-direction:column;gap:1.5rem}
.sidebar-card{background:var(--teal-pale);border-radius:6px;padding:1.5rem;border:1px solid var(--border)}
.cta-card{background:var(--teal-light)}
.sidebar-card h3{font-size:1rem;font-family:var(--font-b);font-weight:700;margin-bottom:.75rem}
.sidebar-card p{font-size:.88rem;line-height:1.6;margin-bottom:.25rem}
.sidebar-card a:not(.btn){color:var(--teal)}
</style>
`);

const legalStyle = `<style>
.page-hero{background:linear-gradient(135deg,var(--teal-light),var(--teal-pale));padding-block:clamp(3rem,7vw,5rem);border-bottom:1px solid var(--border)}
.page-hero h1{margin-block:.5rem .75rem}.page-hero p{max-width:55ch;font-size:1.05rem}
.legal-wrap{max-width:760px}
.legal-wrap h2{font-size:1.4rem;margin:2.5rem 0 .75rem}
.legal-wrap p{font-size:.97rem;line-height:1.8;margin-bottom:1rem;color:var(--dark)}
.legal-wrap ul{display:grid;gap:.5rem;margin:.5rem 0 1rem 1.5rem;list-style:disc}
.legal-wrap li{font-size:.95rem;color:var(--dark);line-height:1.6}
</style>`;

write('src/pages/privacy-policy.astro', `---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Privacy Policy | West End Therapy" description="Privacy Policy for West End Therapy in Winnipeg, Manitoba.">
  <section class="page-hero"><div class="wrap"><h1>Privacy Policy</h1><p>Last updated: January 2025</p></div></section>
  <section class="section"><div class="wrap legal-wrap">
    <p>West End Therapy ("we," "our," or "us") is committed to protecting the privacy and confidentiality of our clients and website visitors. This Privacy Policy describes how we collect, use, and protect your personal information.</p>
    <h2>Information We Collect</h2>
    <p>We collect personal information that you provide to us directly, including:</p>
    <ul><li>Name, email address, and phone number provided through our intake form or contact form</li><li>Information about your therapy needs and preferences</li><li>Billing information for payment processing</li><li>Clinical notes and session information (for clients only)</li></ul>
    <h2>How We Use Your Information</h2>
    <p>We use the information we collect to:</p>
    <ul><li>Match you with an appropriate therapist and facilitate booking</li><li>Communicate with you about your appointments and care</li><li>Process payment for services rendered</li><li>Comply with legal and professional obligations</li></ul>
    <h2>Confidentiality of Clinical Information</h2>
    <p>All clinical information shared in therapy sessions is strictly confidential. We will not disclose information about you to third parties without your written consent, except as required by law (such as situations involving risk of harm to yourself or others, or as required by court order).</p>
    <h2>Data Security</h2>
    <p>We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. Our client management system and communication tools are PIPEDA-compliant.</p>
    <h2>Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:inquiries@westendtherapy.ca">inquiries@westendtherapy.ca</a> or (204) 809-9114.</p>
  </div></section>
</Layout>
${legalStyle}
`);

write('src/pages/terms-of-service.astro', `---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Terms of Service | West End Therapy" description="Terms of Service for West End Therapy in Winnipeg, Manitoba.">
  <section class="page-hero"><div class="wrap"><h1>Terms of Service</h1><p>Last updated: January 2025</p></div></section>
  <section class="section"><div class="wrap legal-wrap">
    <p>By using the West End Therapy website or engaging our services, you agree to the following terms and conditions. Please read them carefully.</p>
    <h2>Services</h2>
    <p>West End Therapy provides professional therapy and counselling services. All therapists are registered with their respective professional bodies and adhere to the ethical guidelines of those bodies.</p>
    <h2>Appointments and Cancellations</h2>
    <p>We require at least 48 hours notice for cancellations or rescheduling. Late cancellations or no-shows may be subject to a cancellation fee. Your therapist will discuss the specific cancellation policy with you at the outset of therapy.</p>
    <h2>Payment</h2>
    <p>Payment is due at the time of service. We accept e-transfer, credit card, and debit. We provide receipts for all sessions for insurance reimbursement purposes.</p>
    <h2>Emergency Situations</h2>
    <p>West End Therapy is not an emergency service. If you are in crisis or immediate danger, please call 911 or go to your nearest emergency room. The Manitoba Crisis Line is available 24/7 at 1-888-322-3019.</p>
    <h2>Website Use</h2>
    <p>The information on this website is for general informational purposes only and does not constitute professional therapeutic advice. Use of this website does not create a therapist-client relationship.</p>
    <h2>Contact Us</h2>
    <p>If you have questions about these Terms, please contact us at <a href="mailto:inquiries@westendtherapy.ca">inquiries@westendtherapy.ca</a>.</p>
  </div></section>
</Layout>
${legalStyle}
`);

// Also redirect /now-hiring to /opportunities
write('src/pages/now-hiring.astro', `---\nreturn Astro.redirect('/opportunities', 301);\n---`);

console.log('\nAll missing pages created successfully!');
console.log('No dev server restart needed — Astro picks up new files automatically.');
