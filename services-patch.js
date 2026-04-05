// Run: node services-patch.js
// Creates all local /services/[slug] pages and updates the services index
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE = __dirname;
const IMG = 'https://westendtherapy.ca/ws/media-library';

function write(rel, content) {
  const full = path.join(BASE, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trimStart(), 'utf8');
  console.log('wrote', rel);
}

const HERO_IMG = `${IMG}/26789bddcacb0b17f2a56440eb68713d/adobestock_436729956.jpeg`;
const WAITING  = `${IMG}/5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg`;

// ─── FULL SERVICE DATA ────────────────────────────────────────────────────────
const services = [
  {
    slug: 'individual-therapy',
    name: 'Individual Therapy',
    tagline: 'One-on-one support tailored to you',
    metaDesc: 'Individual therapy in Winnipeg for adults 16+. Compassionate, evidence-based counselling for anxiety, trauma, depression, relationships and more.',
    heroImg: HERO_IMG,
    intro: `Individual Therapy is typically offered to those aged 16 and over. At West End Therapy, we aim to create a safe space that is inclusive and supportive of individuals of diverse backgrounds, identities and ways of thinking.\n\nOur therapists are experienced in supporting individuals facing a wide range of issues. Whether you're navigating a difficult time or seeking personal development, we'll help you find the right therapist for your needs.`,
    issues: [
      'Managing stress and difficult emotions',
      'Experiencing ambivalence, strain or loss in intimate relationships',
      'Grief and loss',
      'The effects of trauma, complex trauma, or intergenerational trauma',
      'Navigating setting and maintaining boundaries in relationships',
      'Living with neuro-divergence',
      'Mental health issues (mood disorders, anxiety, personality disorder)',
      'Substance use and behavioural addictions',
      'Life transitions and adjusting to different phases of the life cycle',
      'Struggles with identity and/or sense of self',
      'Issues related to attachment style, including sensitivity to rejection or avoidance of emotional intimacy',
    ],
    approaches: [
      'Emotionally Focused Therapy (EFT)',
      'Cognitive Behavioural Therapy (CBT)',
      'Dialectical Behaviour Therapy (DBT)',
      'EMDR (Eye Movement Desensitization and Reprocessing)',
      'Narrative Therapy',
      'Mindfulness-Based Approaches',
      'Internal Family Systems (IFS)',
      'Attachment-Based Therapy',
    ],
    expect: `Your first session is an opportunity to share what brings you to therapy in a relaxed, non-judgmental setting. Your therapist will listen carefully and begin to understand your situation, your goals, and what kind of support would be most helpful. Together, you'll develop a plan that honours your pace and priorities.\n\nAll sessions are available in-person at our Winnipeg clinic or online across Manitoba.`,
  },
  {
    slug: 'couples-therapy',
    name: 'Couples Therapy',
    tagline: 'Rebuild connection and grow together',
    metaDesc: 'Couples therapy in Winnipeg. Compassionate, evidence-based relationship counselling to improve communication, rebuild trust, and reconnect.',
    heroImg: WAITING,
    intro: `At West End Therapy, we offer compassionate and evidence-based couples therapy to help partners reconnect, heal, and grow together. Whether you're navigating conflict, rebuilding trust, or simply looking to strengthen your relationship, our experienced Winnipeg therapists are here to support you.\n\nWe provide a safe environment where couples of all backgrounds can explore their challenges and work toward lasting change.`,
    issues: [
      'Difficulty communicating during conflicts',
      'Caught in a "negative cycle" of reactivity to one another',
      'Struggling with emotional or physical intimacy',
      'Recovering from infidelity or breach of trust',
      'Navigating major life transitions (parenthood, loss, career changes)',
      'Disagreements around parenting, finances, or household responsibilities',
      'Feeling disconnected or emotionally distant',
      'Considering separation and wanting to make an informed decision',
      'Pre-marital counselling and relationship enrichment',
    ],
    approaches: [
      'Emotionally Focused Couples Therapy (EFCT)',
      'Gottman Method Couples Therapy',
      'Attachment-Based Therapy',
      'Narrative Therapy',
      'Solution-Focused Brief Therapy',
    ],
    expect: `In most cases, your therapist will meet with you as a couple and also schedule an individual session with each partner. This helps your therapist gain an understanding of each partner's perspective and gather a clearer picture of the relationship.\n\nYour therapist will then collaborate with you to establish therapeutic goals and the initial focus of therapy. Your first session is an opportunity to reflect on how you feel in your relationship, explore barriers, and consider what healing might look like.`,
  },
  {
    slug: 'family-therapy',
    name: 'Family Therapy',
    tagline: 'Strengthen bonds and navigate challenges as a unit',
    metaDesc: 'Family therapy in Winnipeg for all family configurations. Compassionate, systemic counselling to improve communication and resolve conflict.',
    heroImg: WAITING,
    intro: `At West End Therapy, we recognize that family relationships are among the most significant in our lives. Family therapy provides a space for family members to come together, improve communication, resolve conflicts, and strengthen the bonds that hold them together.\n\nOur therapists work with all family configurations — blended families, single-parent families, multi-generational families, and more. We take a systemic approach, understanding that each family member's wellbeing is deeply connected to the health of the family system as a whole.`,
    issues: [
      'Communication breakdowns between family members',
      'Parent-child conflict or difficulties with adolescents',
      'Blended family adjustment challenges',
      'Navigating grief, loss, or major life transitions as a family',
      'Supporting a family member with mental health or addiction concerns',
      'Rebuilding trust after conflict or estrangement',
      'Co-parenting difficulties after separation or divorce',
      'Intergenerational trauma and its impact on family dynamics',
    ],
    approaches: [
      'Structural Family Therapy',
      'Emotionally Focused Family Therapy',
      'Narrative Therapy',
      'Bowenian Family Systems Therapy',
      'Solution-Focused Brief Therapy',
    ],
    expect: `Family therapy sessions typically involve two or more family members attending together. Your therapist may also meet with individual family members at times to better understand different perspectives. Sessions are designed to be collaborative, with your therapist helping to facilitate conversations that might be difficult to have on your own.\n\nThe goal is to help your family develop healthier patterns of communication and connection that last well beyond the therapy room.`,
  },
  {
    slug: 'child-therapy',
    name: 'Child & Teen Therapy',
    tagline: 'Compassionate, age-appropriate support for young people',
    metaDesc: 'Child and teen therapy in Winnipeg. Evidence-based counselling for children aged 3+ and adolescents facing anxiety, trauma, behavioural and emotional challenges.',
    heroImg: WAITING,
    intro: `At West End Therapy, we specialize in providing compassionate and effective child therapy services tailored to the unique needs of children and their families in Winnipeg. Our team of experienced child therapists uses evidence-based approaches to support your child's emotional and mental well-being.\n\nChildren, like adults, experience a range of emotions and life challenges, but they often lack the language or coping skills to express what they are going through. We believe in providing a safe, supportive environment for children to explore and express their feelings.`,
    issues: [
      'Anxiety and excessive worry',
      'Emotional dysregulation and difficulty managing big feelings',
      'Behavioural challenges at home or school',
      'ADHD and attention difficulties',
      'Trauma, including abuse, neglect, or exposure to domestic violence',
      'Grief and loss',
      'Social difficulties and peer relationships',
      'School refusal or academic struggles',
      'Family transitions such as divorce or remarriage',
      'Low self-esteem and confidence issues',
    ],
    approaches: [
      'Play Therapy',
      'Cognitive Behavioural Therapy (CBT) adapted for children',
      'Trauma-Focused CBT (TF-CBT)',
      'Art and Expressive Therapies',
      'Attachment-Based Therapy',
      'Family Systems approaches',
    ],
    expect: `Before beginning therapy with your child, your therapist will typically meet with you as a parent or guardian to understand your child's history and current concerns. This helps ensure the therapy is tailored to your child's specific needs.\n\nWe work collaboratively with parents and caregivers, keeping you informed and involved throughout the process. Our child-friendly office environment is designed to help young clients feel comfortable and at ease from the moment they arrive.`,
  },
  {
    slug: 'emdr-therapy',
    name: 'EMDR Therapy',
    tagline: 'Evidence-based trauma processing and healing',
    metaDesc: 'EMDR therapy in Winnipeg at West End Therapy. Eye Movement Desensitization and Reprocessing for PTSD, trauma, anxiety and more.',
    heroImg: WAITING,
    intro: `Eye Movement Desensitization and Reprocessing (EMDR) is an empirically-validated reprocessing therapy designed to help individuals recover from traumatic stress, including post-traumatic stress disorder (PTSD).\n\nThis effective treatment works by using bilateral stimulation — typically via eye movements — to reduce the emotional intensity tied to trauma memories and other distressing life experiences. By helping the brain reprocess and store these memories differently, EMDR enables healthier emotional and behavioural responses in the present.`,
    issues: [
      'Post-Traumatic Stress Disorder (PTSD)',
      'Complex trauma and childhood trauma',
      'Anxiety, panic attacks, and phobias',
      'Depression linked to traumatic experiences',
      'Grief and loss',
      'Performance anxiety',
      'Low self-esteem rooted in past experiences',
      'Attachment wounds',
      'Experiences of abuse, assault, or neglect',
    ],
    approaches: [
      'Standard EMDR Protocol (8-phase approach)',
      'EMDR for Complex Trauma',
      'Attachment-Focused EMDR',
      'EMDR integrated with other trauma-informed approaches',
    ],
    expect: `EMDR therapy typically begins with several sessions focused on history-taking, preparation, and building coping resources. Your therapist will explain the process in detail and ensure you feel safe and ready before any trauma processing begins.\n\nDuring processing sessions, you will briefly focus on a distressing memory while simultaneously experiencing bilateral stimulation (such as guided eye movements). Most clients experience a significant reduction in the distress associated with traumatic memories over the course of treatment.\n\nWest End Therapy has multiple EMDR-trained therapists available in Winnipeg.`,
  },
  {
    slug: 'anxiety-therapy',
    name: 'Anxiety Therapy',
    tagline: 'Practical tools to find calm and move forward',
    metaDesc: 'Anxiety therapy in Winnipeg. Evidence-based counselling for generalized anxiety, panic, social anxiety, phobias and OCD at West End Therapy.',
    heroImg: HERO_IMG,
    intro: `Anxiety is one of the most common mental health challenges, and one that can profoundly affect every area of your life — your relationships, your work, your sleep, and your sense of self. At West End Therapy, our therapists understand that anxiety is not simply a matter of "worrying too much." It is a complex, often debilitating experience that deserves compassionate, expert support.\n\nWe offer evidence-based anxiety therapy in Winnipeg to help you understand the roots of your anxiety, develop practical coping strategies, and build a calmer, more grounded life.`,
    issues: [
      'Generalized Anxiety Disorder (GAD)',
      'Panic attacks and Panic Disorder',
      'Social anxiety and social phobia',
      'Specific phobias',
      'Health anxiety',
      'Obsessive-Compulsive Disorder (OCD)',
      'Separation anxiety',
      'Anxiety related to trauma or life transitions',
      'Performance anxiety',
    ],
    approaches: [
      'Cognitive Behavioural Therapy (CBT)',
      'Acceptance and Commitment Therapy (ACT)',
      'Exposure and Response Prevention (ERP)',
      'Mindfulness-Based Cognitive Therapy (MBCT)',
      'EMDR for trauma-related anxiety',
      'Somatic and body-based approaches',
    ],
    expect: `Your therapist will begin by helping you understand your anxiety — where it comes from, what triggers it, and how it shows up in your body and thoughts. From there, you'll work together to develop a toolkit of strategies that help you manage anxious moments and gradually reduce the hold anxiety has on your life.\n\nTherapy for anxiety is typically active and skills-focused, and many clients notice meaningful improvement within a relatively short period of time.`,
  },
  {
    slug: 'depression-therapy',
    name: 'Depression Therapy',
    tagline: 'Compassionate support to restore energy and reconnect with life',
    metaDesc: 'Depression therapy in Winnipeg. Compassionate, evidence-based counselling for depression, low mood, burnout and related concerns at West End Therapy.',
    heroImg: HERO_IMG,
    intro: `Depression is more than persistent sadness — it can affect your energy, motivation, concentration, relationships, and sense of hope for the future. At West End Therapy, we offer compassionate, evidence-based therapy for depression that goes beyond symptom management to explore the deeper roots of low mood and help you rediscover a sense of meaning and vitality.\n\nOur therapists understand that depression looks different for everyone. Whether you're experiencing a first episode or have been living with depression for years, we'll meet you where you are.`,
    issues: [
      'Persistent low mood or sadness',
      'Loss of interest in activities once enjoyed',
      'Fatigue and low energy',
      'Difficulty concentrating or making decisions',
      'Changes in sleep or appetite',
      'Feelings of worthlessness or excessive guilt',
      'Withdrawal from relationships and social activities',
      'Postpartum depression',
      'Seasonal Affective Disorder (SAD)',
      'Depression related to grief, trauma, or life transitions',
    ],
    approaches: [
      'Cognitive Behavioural Therapy (CBT)',
      'Behavioural Activation',
      'Interpersonal Therapy (IPT)',
      'Mindfulness-Based Cognitive Therapy (MBCT)',
      'EMDR for trauma-related depression',
      'Emotionally Focused approaches',
    ],
    expect: `Your therapist will work with you to understand the unique factors contributing to your depression and develop a personalized treatment plan. Sessions may include exploring thought patterns, building behavioural strategies, processing underlying emotional pain, and developing sustainable self-care practices.\n\nMany clients find that therapy for depression provides not only relief from symptoms but also greater self-understanding and resilience for the future.`,
  },
  {
    slug: 'sex-therapy',
    name: 'Sex Therapy',
    tagline: 'Confidential support for intimacy and sexual wellbeing',
    metaDesc: 'Sex therapy in Winnipeg. Confidential, non-judgmental support for sexual concerns, intimacy issues, and sexual dysfunction at West End Therapy.',
    heroImg: WAITING,
    intro: `Sexual wellbeing is an important part of overall mental and relational health, yet many people feel too embarrassed or ashamed to seek help. At West End Therapy, we offer a non-judgmental, confidential space to address a wide range of sexual concerns for individuals and couples.\n\nOur sex therapists are trained professionals who approach sexual health with the same care and expertise they bring to all areas of mental health. There is nothing shameful about seeking support — your sexual wellbeing matters.`,
    issues: [
      'Low sexual desire or mismatched libido in couples',
      'Sexual dysfunction (difficulty with arousal, orgasm, or performance)',
      'Pain during sex (vaginismus, dyspareunia)',
      'Sexual anxiety or avoidance',
      'Recovery from sexual trauma or abuse',
      'Exploring sexual identity or orientation',
      'Concerns related to pornography use',
      'Intimacy difficulties following illness, injury, or life changes',
      'Opening or navigating non-traditional relationship structures',
    ],
    approaches: [
      'Sensate Focus exercises',
      'Cognitive Behavioural Therapy for sexual concerns',
      'Emotionally Focused approaches to intimacy',
      'Trauma-informed therapy',
      'Psychoeducation and skills-based interventions',
    ],
    expect: `Sex therapy is primarily talk-based — there is no physical examination or physical contact involved. Sessions are confidential, respectful, and focused entirely on your goals.\n\nYour therapist will begin with a thorough assessment of your concerns and history, and will collaborate with you to develop a tailored treatment plan. Many clients find that just a few sessions make a significant difference.`,
  },
  {
    slug: 'play-therapy',
    name: 'Play Therapy',
    tagline: "Supporting children through the language of play",
    metaDesc: 'Play therapy in Winnipeg for children aged 3+. Helping children express emotions, process experiences, and develop coping skills through play at West End Therapy.',
    heroImg: WAITING,
    intro: `Play is the natural language of childhood. Through play, children make sense of their world, process difficult experiences, and develop essential emotional and social skills. Play therapy is a form of therapy that uses play as the primary means of communication, allowing children to express thoughts and feelings they may not yet have words for.\n\nAt West End Therapy, our play therapists are trained to use play therapeutically to support children aged 3 and up who are facing emotional, behavioural, or developmental challenges.`,
    issues: [
      'Anxiety and excessive worry or fearfulness',
      'Trauma and adverse childhood experiences',
      'Grief and loss (including death of a pet or family member)',
      'Behavioural difficulties at home or school',
      'ADHD and attention challenges',
      'Difficulties with emotional regulation',
      'Social skills challenges',
      'Family transitions (divorce, new siblings, relocation)',
      'Attachment and relationship difficulties',
    ],
    approaches: [
      'Child-Centred Play Therapy (CCPT)',
      'Directive Play Therapy techniques',
      'Sand tray therapy',
      'Art and expressive play',
      'Filial therapy (involving parents in the play therapy process)',
    ],
    expect: `A play therapy session takes place in a specially designed playroom stocked with a range of therapeutic play materials. Your child's therapist will follow the child's lead, creating a safe and accepting space where the child is free to express themselves through play.\n\nParents and caregivers are an important part of the process. Your therapist will keep you informed about your child's progress and may involve you in some sessions or provide guidance on how to support your child at home.`,
  },
  {
    slug: 'anger-management',
    name: 'Anger Management',
    tagline: 'Understand anger and build healthier responses',
    metaDesc: 'Anger management therapy in Winnipeg. Evidence-based counselling to understand the roots of anger and develop healthier emotional responses at West End Therapy.',
    heroImg: HERO_IMG,
    intro: `Anger is a normal, healthy emotion — but when it becomes frequent, intense, or hard to control, it can damage relationships, careers, and overall wellbeing. At West End Therapy, we offer anger management therapy that goes beyond simply "controlling" your temper to help you understand what is driving your anger and develop more constructive ways of expressing and responding to it.\n\nOur therapists take a compassionate, non-judgmental approach to working with anger. We understand that anger is often a signal of unmet needs, underlying pain, or past experiences that deserve attention.`,
    issues: [
      'Frequent or intense anger responses that feel out of proportion',
      'Difficulty controlling angry outbursts',
      'Anger that damages relationships at home or work',
      'Road rage or situational anger',
      'Anger related to trauma or past experiences',
      'Passive-aggressive patterns or difficulty expressing anger assertively',
      'Anger associated with depression, anxiety, or grief',
    ],
    approaches: [
      'Cognitive Behavioural Therapy (CBT)',
      'Emotion-focused approaches',
      'Mindfulness-based strategies',
      'Communication and assertiveness skills',
      'Trauma-informed therapy',
    ],
    expect: `Your therapist will begin by helping you understand your anger — its triggers, patterns, and underlying causes. You'll learn practical skills for recognizing warning signs, taking space when needed, and expressing yourself in ways that honour both your feelings and your relationships.\n\nMany clients find that addressing the emotional roots of their anger leads to not only better anger management, but also greater self-awareness, improved relationships, and reduced stress overall.`,
  },
  {
    slug: 'grief-therapy',
    name: 'Grief Counselling',
    tagline: 'A compassionate space to process loss and find your way forward',
    metaDesc: 'Grief counselling in Winnipeg. Compassionate, non-judgmental support for all types of loss at West End Therapy.',
    heroImg: WAITING,
    intro: `Grief is one of the most profound and universal human experiences, yet it is often one of the most isolating. Whether you have lost a loved one, a relationship, a job, a stage of life, or a sense of who you are, grief is a natural response to loss — and it deserves proper support.\n\nAt West End Therapy, our counsellors offer a compassionate, non-judgmental space to process all forms of grief and loss. There is no "right" way to grieve, and our therapists honour the unique ways that loss shows up for each person.`,
    issues: [
      'Death of a loved one (recent or long ago)',
      'Anticipatory grief (losing someone to terminal illness)',
      'Pregnancy loss, miscarriage, or infertility',
      'Loss of a relationship (divorce, separation, estrangement)',
      'Loss of health, identity, or physical ability',
      'Loss of a pet',
      'Grief related to immigration or cultural displacement',
      'Complicated or prolonged grief',
      'Grief that has become entangled with depression or anxiety',
    ],
    approaches: [
      'Attachment-informed grief therapy',
      'Narrative approaches to meaning-making',
      'Emotionally Focused Therapy',
      'Mindfulness-based approaches',
      'Continuing bonds theory',
      'EMDR for traumatic loss',
    ],
    expect: `Grief therapy does not aim to "move you past" your grief or help you forget those you have lost. Instead, your therapist will provide a safe, unhurried space to explore your loss, honour what you are grieving, and gradually find ways to carry your loss while also re-engaging with life.\n\nMany people find that grief therapy brings not only relief but also a deeper understanding of themselves and the relationships that matter most to them.`,
  },
  {
    slug: 'online-therapy',
    name: 'Online Therapy',
    tagline: 'Secure, convenient therapy from wherever you are',
    metaDesc: 'Online therapy across Manitoba. Secure video counselling sessions with West End Therapy\'s expert Winnipeg therapists — no travel required.',
    heroImg: HERO_IMG,
    intro: `At West End Therapy, we believe that quality mental health care should be accessible to everyone in Manitoba — not just those who live near our Winnipeg clinic or can attend in-person sessions. That's why we offer secure, confidential online therapy to clients across the province.\n\nOnline therapy (also called teletherapy or virtual therapy) delivers the same quality of evidence-based care as in-person sessions, through a secure video platform. Research consistently shows that online therapy is as effective as in-person therapy for most concerns.`,
    issues: [
      'All concerns addressed in our in-person therapy services',
      'Ideal for clients outside of Winnipeg or in rural Manitoba',
      'Convenient for busy schedules, parents of young children, or those with mobility challenges',
      'Available for individual, couples, and family therapy',
    ],
    approaches: [
      'All therapeutic approaches available in person are also available online',
      'Secure, PIPEDA-compliant video platform',
      'Flexible scheduling including evenings and weekends',
    ],
    expect: `Online sessions are conducted through a secure, private video platform. You'll need a device with a camera and microphone (phone, tablet, or computer) and a reliable internet connection. We recommend finding a private, comfortable space where you won't be interrupted.\n\nIf you're unsure whether online therapy is right for you, we're happy to discuss your options. Many of our therapists offer both in-person and online sessions.`,
  },
];

// ─── WRITE SERVICES INDEX PAGE ────────────────────────────────────────────────
write('src/pages/services.astro', `---
import Layout from '../layouts/Layout.astro';
const IMG_BASE = '${IMG}';
const services = [
${services.map(s => `  { slug:'${s.slug}', name:${JSON.stringify(s.name)}, desc:${JSON.stringify(s.tagline)}, img:${JSON.stringify(s.heroImg.replace(IMG+'/', ''))} }`).join(',\n')}
];
---
<Layout title="Therapy Services" description="West End Therapy offers individual, couples, family, EMDR, child, anxiety and depression therapy in Winnipeg and online across Manitoba.">

  <section class="page-hero">
    <div class="wrap">
      <p class="eyebrow">What We Offer</p>
      <h1>Our Therapy Services</h1>
      <p>Evidence-based, compassionate care for every stage of life. All sessions available in-person and online.</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="svc-grid">
        {services.map(s => (
          <a href={'/services/' + s.slug} class="svc-card">
            <img src={IMG_BASE + '/' + s.img} alt={s.name} loading="lazy"/>
            <div class="svc-card__body">
              <span class="svc-card__name">{s.name}</span>
              <p class="svc-card__desc">{s.desc}</p>
              <span class="svc-card__more">Learn More →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>

  <section class="section pale tc">
    <div class="wrap" style="max-width:700px">
      <h2>Not sure which service is right for you?</h2>
      <p style="margin-top:1rem;margin-bottom:2rem;">Fill out our 2-minute intake form and we'll match you with the right therapist and service for your unique needs.</p>
      <a href="/#intake-form" class="btn btn-teal">Fill Out Our Intake Form</a>
      &ensp;
      <a href="/therapists" class="btn btn-outline">Meet Our Therapists</a>
    </div>
  </section>

</Layout>
<style>
.page-hero{background:linear-gradient(135deg,var(--teal-light),var(--teal-pale));padding-block:clamp(3rem,7vw,5rem);border-bottom:1px solid var(--border)}
.eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--teal);margin-bottom:.5rem}
.page-hero h1{margin-block:.25rem .75rem}
.page-hero p{max-width:55ch;font-size:1.05rem}
</style>
`);

// ─── WRITE INDIVIDUAL SERVICE PAGES ──────────────────────────────────────────
for (const svc of services) {
  const issuesList = svc.issues.map(i => `<li>${i}</li>`).join('\n            ');
  const approachList = svc.approaches.map(a => `<li>${a}</li>`).join('\n            ');
  const introParagraphs = svc.intro.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('\n      ');
  const expectParagraphs = svc.expect.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('\n      ');

  write(`src/pages/services/${svc.slug}.astro`, `---
import Layout from '../../layouts/Layout.astro';
const heroImg = ${JSON.stringify(svc.heroImg)};
---
<Layout title=${JSON.stringify(svc.name + ' in Winnipeg | West End Therapy')} description=${JSON.stringify(svc.metaDesc)}>

  <section class="svc-hero" style={\`background-image:url('\${heroImg}')\`}>
    <div class="svc-hero__overlay"></div>
    <div class="wrap svc-hero__content">
      <p class="eyebrow">${svc.tagline}</p>
      <h1>${svc.name} in Winnipeg</h1>
      <div class="hero-btns">
        <a href="/#intake-form" class="btn btn-teal">Book a Session</a>
        <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-ghost">Email Us</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap svc-layout">
      <div class="svc-main">

        <div class="svc-intro">
          ${introParagraphs}
        </div>

        <div class="svc-block">
          <h2>Issues We Help Address</h2>
          <ul class="check-list">
            ${issuesList}
          </ul>
        </div>

        <div class="svc-block">
          <h2>Our Therapeutic Approaches</h2>
          <ul class="approach-list">
            ${approachList}
          </ul>
        </div>

        <div class="svc-block">
          <h2>What to Expect</h2>
          ${expectParagraphs}
        </div>

      </div>
      <aside class="svc-sidebar">
        <div class="sidebar-card cta-card">
          <h3>Ready to Get Started?</h3>
          <p>Fill out our 2-minute intake form and we'll match you with the right therapist.</p>
          <a href="/#intake-form" class="btn btn-teal" style="width:100%;justify-content:center;margin-top:1rem;">Book a Session</a>
          <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-outline" style="width:100%;justify-content:center;margin-top:.75rem;">Email Us</a>
        </div>
        <div class="sidebar-card">
          <h3>Contact Us</h3>
          <p><a href="tel:+12048099114">(204) 809-9114</a></p>
          <p><a href="mailto:inquiries@westendtherapy.ca">inquiries@westendtherapy.ca</a></p>
          <p style="margin-top:.6rem;font-size:.85rem;">759 Wall St<br>Winnipeg, MB R3G 2T6</p>
        </div>
        <div class="sidebar-card">
          <h3>All Services</h3>
          <ul class="sidebar-links">
            <li><a href="/services/individual-therapy">Individual Therapy</a></li>
            <li><a href="/services/couples-therapy">Couples Therapy</a></li>
            <li><a href="/services/family-therapy">Family Therapy</a></li>
            <li><a href="/services/child-therapy">Child &amp; Teen Therapy</a></li>
            <li><a href="/services/emdr-therapy">EMDR Therapy</a></li>
            <li><a href="/services/anxiety-therapy">Anxiety Therapy</a></li>
            <li><a href="/services/depression-therapy">Depression Therapy</a></li>
            <li><a href="/services/sex-therapy">Sex Therapy</a></li>
            <li><a href="/services/play-therapy">Play Therapy</a></li>
            <li><a href="/services/anger-management">Anger Management</a></li>
            <li><a href="/services/grief-therapy">Grief Counselling</a></li>
            <li><a href="/services/online-therapy">Online Therapy</a></li>
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
.svc-block{margin-top:2.5rem}
.svc-block h2{font-size:1.5rem;margin-bottom:1rem;color:var(--black)}
.svc-block p{font-size:.97rem;line-height:1.8;margin-bottom:1rem;color:var(--dark)}
.check-list{display:grid;gap:.5rem}
.check-list li{padding:.4rem .75rem .4rem 2rem;position:relative;font-size:.92rem;color:var(--dark);line-height:1.6}
.check-list li::before{content:'✓';position:absolute;left:.5rem;color:var(--teal);font-weight:700}
.approach-list{display:grid;gap:.5rem}
.approach-list li{padding:.4rem .75rem .4rem 1.5rem;position:relative;font-size:.92rem;color:var(--dark)}
.approach-list li::before{content:'→';position:absolute;left:.25rem;color:var(--teal);font-weight:700}
.svc-sidebar{display:flex;flex-direction:column;gap:1.5rem}
.sidebar-card{background:var(--teal-pale);border-radius:6px;padding:1.5rem;border:1px solid var(--border)}
.cta-card{background:var(--teal-light)}
.sidebar-card h3{font-size:1rem;font-family:var(--font-b);font-weight:700;margin-bottom:.75rem;color:var(--black)}
.sidebar-card p{font-size:.88rem;line-height:1.6;margin-bottom:.25rem}
.sidebar-card a:not(.btn){color:var(--teal)}
.sidebar-links{display:grid;gap:.35rem}
.sidebar-links li::before{display:none}
.sidebar-links a{font-size:.88rem;color:var(--teal);font-weight:500}
.sidebar-links a:hover{color:var(--teal-dark);text-decoration:underline}
</style>
`);
}

console.log(`\nDone! Created services index + ${services.length} individual service pages.`);
console.log('No dev server restart needed — Astro picks up new files automatically.');
