// Run this once: node setup.js
// It creates all src/ and public/ files for the West End Therapy Astro clone.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE = __dirname;
const W = 'westendtherapy.ca/ws/media-library';
const IMG = `https://${W}`;

function write(rel, content) {
  const full = path.join(BASE, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trimStart(), 'utf8');
  console.log('wrote', rel);
}

// ─── global.css ────────────────────────────────────────────────────────────
write('src/styles/global.css', `
:root {
  --teal:#4f6f72;--teal-dark:#3a5558;--teal-light:#e0e6e6;--teal-pale:#f0f4f4;
  --white:#fff;--black:#1a1a1a;--dark:#2e2e2e;--mid:#5a5a5a;--border:#d4dcdc;
  --font-h:'Cormorant',Palatino,'Palatino Linotype','Book Antiqua',Georgia,serif;
  --font-b:'Open Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  --max-w:1200px;--t:0.2s ease;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font-b);font-size:16px;line-height:1.7;color:var(--dark);background:#fff}
img{display:block;max-width:100%}
input,button,textarea,select{font:inherit}
a{color:var(--teal);text-decoration:none;transition:color var(--t)}
a:hover{color:var(--teal-dark)}
ul{list-style:none}
h1,h2,h3,h4,h5,h6{font-family:var(--font-h);font-weight:600;line-height:1.2;color:var(--black)}
h1{font-size:clamp(2.2rem,5vw,3.6rem)}
h2{font-size:clamp(1.6rem,3vw,2.6rem)}
h3{font-size:clamp(1.05rem,2vw,1.4rem)}
p{color:rgba(0,0,0,.54);line-height:1.75}
.wrap{width:100%;max-width:var(--max-w);margin-inline:auto;padding-inline:clamp(1rem,4vw,2.5rem)}
.section{padding-block:clamp(3rem,7vw,5.5rem)}
.pale{background:var(--teal-pale)}
.light{background:var(--teal-light)}
/* Buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;padding:.7rem 2rem;border-radius:50px;font-family:var(--font-b);font-size:.78rem;font-weight:600;letter-spacing:.13em;text-transform:uppercase;border:1.5px solid transparent;cursor:pointer;transition:background var(--t),color var(--t),border-color var(--t)}
.btn-ghost{background:rgba(255,255,255,.15);color:#fff;border-color:rgba(255,255,255,.7);backdrop-filter:blur(4px)}
.btn-ghost:hover{background:rgba(255,255,255,.28);color:#fff}
.btn-teal{background:var(--teal);color:#fff;border-color:var(--teal)}
.btn-teal:hover{background:var(--teal-dark);border-color:var(--teal-dark);color:#fff}
.btn-outline{background:transparent;color:var(--teal);border-color:var(--teal)}
.btn-outline:hover{background:var(--teal);color:#fff}
/* Service grid */
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem}
@media(max-width:1100px){.svc-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:720px){.svc-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:400px){.svc-grid{grid-template-columns:1fr}}
.svc-card{background:var(--teal-light);border-radius:4px;overflow:hidden;display:flex;flex-direction:column;transition:transform var(--t),box-shadow var(--t);color:inherit;text-decoration:none}
.svc-card:hover{transform:translateY(-4px);box-shadow:0 10px 32px rgba(0,0,0,.1)}
.svc-card img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}
.svc-card__body{padding:1.35rem;flex:1;display:flex;flex-direction:column}
.svc-card__name{font-family:var(--font-b);font-size:.72rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--black);display:block;margin-bottom:.5rem}
.svc-card__desc{font-size:.88rem;color:var(--mid);line-height:1.6;flex:1}
.svc-card__more{display:inline-block;margin-top:.75rem;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--teal)}
/* Therapist grid */
.thx-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
@media(max-width:1100px){.thx-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:720px){.thx-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:400px){.thx-grid{grid-template-columns:1fr}}
.thx-card{background:var(--teal-light);border-radius:4px;overflow:hidden;transition:transform var(--t),box-shadow var(--t);color:inherit;text-decoration:none;display:flex;flex-direction:column}
.thx-card:hover{transform:translateY(-4px);box-shadow:0 10px 32px rgba(0,0,0,.1)}
.thx-card img{width:100%;aspect-ratio:3/4;object-fit:cover;object-position:top;display:block}
.thx-card__body{padding:1rem 1.1rem;flex:1}
.thx-card__name{font-family:var(--font-h);font-size:1.1rem;color:var(--black);line-height:1.25}
.thx-card__role{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--teal);margin:.2rem 0 .4rem;display:block}
.thx-card__spec{font-size:.8rem;color:var(--mid);line-height:1.5}
.thx-card__avail{font-size:.75rem;font-weight:600;color:var(--teal-dark);border-top:1px solid var(--border);padding-top:.4rem;margin-top:.4rem}
.thx-card__avail.waitlist{color:#9a5220}
/* Two-col banner */
.twin-banner{display:grid;grid-template-columns:1fr 1fr;background:var(--teal-light)}
@media(max-width:600px){.twin-banner{grid-template-columns:1fr}}
.twin-banner__cell{padding:1.75rem clamp(1.5rem,5vw,4rem);text-align:center;border-right:1px solid var(--border)}
.twin-banner__cell:last-child{border-right:none}
.twin-banner__cell h3{font-family:var(--font-h);font-size:clamp(1.1rem,2.5vw,1.5rem);color:var(--teal-dark);text-transform:lowercase}
/* Cred logos */
.cred-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:2rem;margin-top:2rem}
.cred-row img{height:54px;width:auto;object-fit:contain;opacity:.8;filter:grayscale(10%);transition:opacity var(--t)}
.cred-row img:hover{opacity:1}
/* Form */
.form-group{margin-bottom:1rem}
label{display:block;font-size:.85rem;font-weight:600;color:var(--dark);margin-bottom:.3rem}
input[type="text"],input[type="email"],input[type="tel"],select,textarea{width:100%;padding:.65rem 1rem;border:1.5px solid var(--border);border-radius:4px;background:#fff;color:var(--dark);font-size:.93rem;transition:border-color var(--t)}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--teal)}
textarea{resize:vertical;min-height:110px}
.opt-row{display:flex;flex-wrap:wrap;gap:.35rem 1.1rem;margin-top:.3rem}
.opt-row label{display:flex;align-items:center;gap:.4rem;font-weight:400;cursor:pointer;margin:0;font-size:.85rem}
input[type="radio"],input[type="checkbox"]{width:auto;accent-color:var(--teal);flex-shrink:0}
.fgl{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--teal);display:block;margin-bottom:.35rem}
/* Page hero */
.page-hero{background:linear-gradient(135deg,var(--teal-light),var(--teal-pale));padding-block:clamp(3rem,7vw,5rem);border-bottom:1px solid var(--border)}
.page-hero h1{margin-block:.5rem .75rem}
.page-hero p{max-width:55ch;font-size:1.05rem}
/* Land acknowledgement */
.land-ack{background:var(--teal-pale);border-top:1px solid var(--border);padding:1.5rem clamp(1rem,4vw,2.5rem);text-align:center;font-size:.83rem;color:var(--mid);font-style:italic;line-height:1.65}
.tc{text-align:center}
.mt1{margin-top:1rem}
.mt2{margin-top:2rem}
`);

// ─── Layout.astro ────────────────────────────────────────────────────────────
write('src/layouts/Layout.astro', `---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';
interface Props { title: string; description?: string; }
const { title, description = 'West End Therapy offers counselling and therapy in Winnipeg for individuals, couples, and families.' } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta name="description" content={description}/>
<title>{title} | West End Therapy — Winnipeg Counselling</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet"/>
<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
</head>
<body>
<Header/>
<main><slot/></main>
<Footer/>
</body>
</html>
`);

// ─── Header.astro ────────────────────────────────────────────────────────────
write('src/components/Header.astro', `---
const LOGO = 'https://westendtherapy.ca/ws/media-library/5806fd793bd8491daa08742a7fe79f35/wet-logo-final-standard-size-circle.png';
const nav = [
  { label:'Home', href:'/' },
  { label:'Our Therapists', href:'/therapists' },
  { label:'Services', href:'/services' },
  { label:'About Us', href:'/about' },
  { label:'Blog', href:'/blog' },
  { label:'Opportunities', href:'/opportunities' },
  { label:'Contact Us', href:'/contact' },
];
const { pathname } = Astro.url;
---
<header class="site-header">
  <div class="hdr-inner wrap">
    <a href="/" class="hdr-logo">
      <img src={LOGO} alt="West End Therapy" width="72" height="72"/>
    </a>
    <nav class="hdr-nav" aria-label="Main navigation">
      {nav.map(n => (
        <a href={n.href} class:list={['hdr-link', { active: pathname === n.href || (n.href !== '/' && pathname.startsWith(n.href)) }]}>
          {n.label}
        </a>
      ))}
    </nav>
    <button class="hamburger" aria-label="Toggle menu" aria-expanded="false" id="ham-btn">
      <span/><span/><span/>
    </button>
  </div>
</header>
<nav class="mobile-nav" id="mobile-nav" aria-hidden="true">
  {nav.map(n => <a href={n.href} class="mob-link">{n.label}</a>)}
</nav>
<style>
.site-header{position:sticky;top:0;z-index:100;background:#fff;border-bottom:1px solid var(--border)}
.hdr-inner{display:flex;align-items:center;justify-content:space-between;gap:1rem;height:var(--header-h,90px)}
.hdr-logo img{width:72px;height:72px;object-fit:contain;border-radius:50%;display:block}
.hdr-logo{flex-shrink:0}
.hdr-nav{display:flex;align-items:center;gap:.25rem}
.hdr-link{font-family:var(--font-b);font-size:.82rem;font-weight:600;letter-spacing:.04em;color:var(--teal);padding:.35rem .6rem;border-radius:3px;transition:background var(--t),color var(--t)}
.hdr-link:hover,.hdr-link.active{background:var(--teal-pale);color:var(--teal-dark)}
.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:.4rem;border-radius:3px}
.hamburger span{display:block;width:22px;height:2px;background:var(--teal);border-radius:2px;transition:transform .2s,opacity .2s}
.mobile-nav{display:none;position:fixed;top:90px;left:0;right:0;background:#fff;border-bottom:1px solid var(--border);padding:1rem;z-index:99;box-shadow:0 6px 20px rgba(0,0,0,.08);flex-direction:column;gap:.3rem}
.mobile-nav.open{display:flex}
.mob-link{font-size:.95rem;font-weight:600;color:var(--teal);padding:.6rem .75rem;border-radius:3px;transition:background var(--t)}
.mob-link:hover{background:var(--teal-pale)}
.hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.hamburger.open span:nth-child(2){opacity:0}
.hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
@media(max-width:900px){.hdr-nav{display:none}.hamburger{display:flex}}
</style>
<script>
const btn=document.getElementById('ham-btn');
const nav=document.getElementById('mobile-nav');
btn?.addEventListener('click',()=>{
  const open=btn.classList.toggle('open');
  nav?.classList.toggle('open');
  btn.setAttribute('aria-expanded',String(open));
  nav?.setAttribute('aria-hidden',String(!open));
});
</script>
`);

// ─── Footer.astro ────────────────────────────────────────────────────────────
write('src/components/Footer.astro', `---
const LOGO = 'https://westendtherapy.ca/ws/media-library/43b07bc5ac6c5215507cc1e8a9d0f441/wet-logo-final-standard-size-circle.png';
const services = [
  ['Anger Management','/anger-management'],['Couple Therapy','/couples-therapy'],
  ['Child Therapy','/child-therapy'],['Divorce Therapy','/divorce-counselling'],
  ['EMDR Therapy','/emdr-therapy'],['Family Therapy','/family-therapy'],
  ['Individual Therapy','/individual-therapy'],['Online Therapy','/online-therapy'],
  ['Play Therapy','/play-therapy'],['Sex Therapy','/sex-therapy'],
  ['Trauma Therapy','/trauma-therapy'],['Therapy for Teens','/therapy-for-teens'],
];
---
<footer class="site-footer">
  <div class="wrap ftr-grid">
    <div class="ftr-col ftr-about">
      <a href="/"><img src={LOGO} alt="West End Therapy" class="ftr-logo"/></a>
      <p>Locally owned since 2020, we provide expert therapy and mental health services at <a href="https://maps.app.goo.gl/8cHBVMuQ6hXhFEZKA" target="_blank" rel="noopener">759 Wall St, Winnipeg</a>. Specializing in individual, couples, family, and child therapy.</p>
      <div class="ftr-contact">
        <p><strong>Email:</strong> <a href="mailto:inquiries@westendtherapy.ca">inquiries@westendtherapy.ca</a></p>
        <p><strong>Call:</strong> <a href="tel:+12048099114">(204) 809-9114</a></p>
      </div>
      <a href="/#intake-form" class="btn btn-teal" style="margin-top:1rem;font-size:.72rem;">2 Minute Intake Form</a>
      <div class="ftr-social">
        <a href="https://www.facebook.com/westendtherapy20/" target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="https://www.instagram.com/westendtherapy20/" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        </a>
      </div>
    </div>
    <div class="ftr-col">
      <h4>Services</h4>
      <ul>
        {services.map(([label,href]) => <li><a href={href}>{label}</a></li>)}
      </ul>
    </div>
    <div class="ftr-col">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/therapists">Our Therapists</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/opportunities">Opportunities</a></li>
        <li><a href="/contact">Contact Us</a></li>
        <li><a href="/terms-of-service">Terms of Service</a></li>
        <li><a href="/privacy-policy">Privacy Policy</a></li>
      </ul>
    </div>
  </div>
  <div class="land-ack">
    With gratitude, we acknowledge that we are gathered on Treaty 1 territory, the homeland of the Red River Métis, and the traditional territories of the Anishinaabeg, Cree, Oji-Cree, Dakota and Dene peoples.
  </div>
</footer>
<style>
.site-footer{background:var(--teal-dark);color:rgba(255,255,255,.85);margin-top:0}
.ftr-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem;padding-block:3.5rem}
@media(max-width:900px){.ftr-grid{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.ftr-grid{grid-template-columns:1fr}}
.ftr-logo{width:80px;height:80px;object-fit:contain;border-radius:50%;margin-bottom:1rem}
.ftr-about p{font-size:.88rem;color:rgba(255,255,255,.7);margin-bottom:.5rem;line-height:1.65}
.ftr-about a{color:rgba(255,255,255,.85);transition:color var(--t)}
.ftr-about a:hover{color:#fff}
.ftr-contact{margin-top:.75rem;display:flex;flex-direction:column;gap:.3rem}
.ftr-contact p{font-size:.85rem;color:rgba(255,255,255,.7)}
.ftr-contact strong{color:rgba(255,255,255,.9)}
.ftr-social{display:flex;gap:1rem;margin-top:1.25rem}
.ftr-social a{color:rgba(255,255,255,.7);transition:color var(--t);display:flex;align-items:center}
.ftr-social a:hover{color:#fff}
.ftr-col h4{font-family:var(--font-b);font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:1rem}
.ftr-col ul{display:flex;flex-direction:column;gap:.4rem}
.ftr-col a{font-size:.85rem;color:rgba(255,255,255,.7);transition:color var(--t)}
.ftr-col a:hover{color:#fff}
.land-ack{background:rgba(0,0,0,.2);border-top:1px solid rgba(255,255,255,.1);padding:1.25rem clamp(1rem,4vw,2.5rem);text-align:center;font-size:.8rem;color:rgba(255,255,255,.55);font-style:italic;line-height:1.65}
</style>
`);

// ─── index.astro (Home) ──────────────────────────────────────────────────────
const HERO_BG = `https://westendtherapy.ca/ws/media-library/26789bddcacb0b17f2a56440eb68713d/adobestock_436729956.jpeg`;
const WAITING_ROOM = `https://westendtherapy.ca/ws/media-library/5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg`;
const LGBTQ = `https://westendtherapy.ca/ws/media-library/d783265d81c0ce4393398a49a9aaafbd/lgbtqia2s.png`;
const PSYCH_TODAY = `https://westendtherapy.ca/ws/media-library/ff949bc5a2272a6273983fb9dd730109/psychology-today-logo.png`;
const MCSW = `https://westendtherapy.ca/ws/media-library/273d6eb37ae61934ca969443a541df05/mcsw.jpg`;
const CCC = `https://westendtherapy.ca/ws/media-library/794734932a8723f010378bc091389ffb/ccc-logo_colour.png`;
const CACFT = `https://westendtherapy.ca/ws/media-library/fb8df6b7dfbfe4beb9e149b56116693f/cacft.jpg`;
const IMAGES_JPG = `https://westendtherapy.ca/ws/media-library/4631492ee0159a9d1a393753dd3e309d/images.jpg`;

const services = [
  { href:'/trauma-therapy', img:`${IMG}/d07ef3ff282b47aa077c333d9d9cb0b2/trauma-therapy-winnnipeg.jpg`, alt:'Trauma Therapy', name:'TRAUMA THERAPY', desc:'Whether from childhood, relationships, or recent events, we offer trauma-informed care to support your healing journey.' },
  { href:'/individual-therapy', img:`${IMG}/76702c0005ec9158ccc2d63588937fe8/3llqmbfv4gm.jpeg`, alt:'Individual Therapy', name:'INDIVIDUAL THERAPY', desc:'Struggling with anxiety, trauma, or grief? Our one-on-one approach offers the space to heal, grow, and gain clarity.' },
  { href:'/emdr-therapy', img:`${IMG}/84fde20064f95ccd01a956717c8994b9/anger-therapy11.jpg`, alt:'EMDR Therapy', name:'EMDR THERAPY', desc:'Process trauma, reduce distress, and move forward with evidence-based healing through EMDR Therapy.' },
  { href:'/couples-therapy', img:`${IMG}/ec0880fa0a7a5ce61b0e340d3343bbe5/ccjgyjuudxe.jpeg`, alt:'Couples Therapy', name:'COUPLES THERAPY', desc:'Strengthen your connection, improve communication, and navigate challenges together through Couples Therapy.' },
  { href:'/child-therapy', img:`${IMG}/223a25080bbfae30ea62244d63e452a5/child-therapy11.jpg`, alt:'Child Therapy', name:'CHILD THERAPY', desc:'Help your child navigate big emotions and build healthy coping skills through Child Therapy.' },
  { href:'/therapy-for-teens', img:`${IMG}/a73b4ce36899d3573c196f21c7a0ac87/gwvmbgpp-pq.jpeg`, alt:'Therapy for Teens', name:'THERAPY FOR TEENS', desc:'Support your teen through life\'s challenges with counselling focused on identity, emotions, and healthy development.' },
  { href:'/anger-management', img:`${IMG}/76026e49c895f2883c778b9d16c38242/ct1mx5otn9a.jpeg`, alt:'Anger Management', name:'ANGER MANAGEMENT', desc:'Regain control, build emotional resilience, and respond with intention through Anger Management.' },
  { href:'/play-therapy', img:`${IMG}/0f2a87085a00f7e481c461a8e30f4b2e/zodkrmnkylk.jpeg`, alt:'Play Therapy', name:'PLAY THERAPY', desc:'Help your child express emotions and build confidence in a safe, supportive space through Play Therapy.' },
  { href:'/divorce-counselling', img:`${IMG}/2bb1421bc057eddabe8df298212d3421/wr3comvzjxu.jpeg`, alt:'Divorce Counselling', name:'DIVORCE COUNSELLING', desc:'Navigate the emotional and practical challenges of separation with clarity and support.' },
  { href:'/family-therapy', img:`${IMG}/6581ecfd948910c5e6ad93476b467190/en1is3ksrzw.jpeg`, alt:'Family Therapy', name:'FAMILY THERAPY', desc:'Foster healthier communication, resolve conflict, and strengthen your family bonds through Family Therapy.' },
  { href:'/online-therapy', img:`${IMG}/e99f68acaae6c33f34deb02904c927de/online-therapy.jpg`, alt:'Online Therapy', name:'ONLINE THERAPY', desc:'Access professional support from the comfort of your home with flexible and confidential Online Therapy.' },
  { href:'/sex-therapy', img:`${IMG}/5110321d9ab9b5ecd106565167c91858/d-dh6yuy8-m.jpeg`, alt:'Sex Therapy', name:'SEX THERAPY', desc:'Explore intimacy, improve communication, and address sexual concerns with compassionate guidance.' },
];

write('src/pages/index.astro', `---
import Layout from '../layouts/Layout.astro';
const HERO_BG = '${HERO_BG}';
const WAITING_ROOM = '${WAITING_ROOM}';
const LGBTQ = '${LGBTQ}';
const PSYCH_TODAY = '${PSYCH_TODAY}';
const MCSW = '${MCSW}';
const CCC = '${CCC}';
const CACFT = '${CACFT}';
const IMG_JPG = '${IMAGES_JPG}';
const IMG_BASE = '${IMG}';
const services = ${JSON.stringify(services, null, 2)};
---
<Layout title="Counseling & Therapy Services in Winnipeg">

  <!-- HERO -->
  <section class="hero" style={\`background-image:url('\${HERO_BG}')\`}>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>Counselling &amp; Therapy in Winnipeg</h1>
      <p class="hero-sub">For Individuals, Couples &amp; Families</p>
      <div class="hero-btns">
        <a href="/contact" class="btn btn-ghost">Book A Session</a>
        <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-ghost">Email Us</a>
      </div>
    </div>
  </section>

  <!-- LOCATION BANNER -->
  <div class="twin-banner">
    <div class="twin-banner__cell"><h3>in-person therapy in Winnipeg</h3></div>
    <div class="twin-banner__cell"><h3>online therapy across manitoba</h3></div>
  </div>

  <!-- ACCEPTING SECTION -->
  <section class="section pale">
    <div class="wrap tc">
      <h2>Meet Our Team of Over 20 Master's-Level Therapists</h2>
      <p style="max-width:60ch;margin-inline:auto;margin-top:.75rem;">Click on a photo for the full bio. Please note some therapists have waiting lists.</p>
      <div class="accept-btns">
        <a href="/therapists?accepting=true" class="btn btn-outline mt1">Therapists Currently Accepting</a>
        <a href="/therapists" class="btn btn-teal mt1">Meet Our Team</a>
      </div>
    </div>
  </section>

  <!-- SERVICES SECTION -->
  <section class="section" id="services">
    <div class="wrap">
      <div class="svc-header tc">
        <h2>Services we Offer</h2>
        <p style="max-width:65ch;margin-inline:auto;margin-top:.75rem;">We are a group psychotherapy and relational therapy practice specializing in providing therapy services in Winnipeg and across Manitoba.</p>
      </div>
      <div class="svc-grid" style="margin-top:2.5rem;">
        {services.map(s => (
          <a href={s.href} class="svc-card">
            <img src={s.img} alt={s.alt} loading="lazy"/>
            <div class="svc-card__body">
              <span class="svc-card__name">{s.name}</span>
              <p class="svc-card__desc">{s.desc}</p>
              <span class="svc-card__more">Learn more →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>

  <!-- CTA ROW -->
  <section class="section light tc">
    <div class="wrap">
      <a href="/contact" class="btn btn-teal">Book a Session</a>
      &nbsp;&nbsp;
      <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-outline">Email Us</a>
    </div>
  </section>

  <!-- WAITING ROOM / YOU ARE WELCOME HERE -->
  <section class="welcome-section">
    <img src={WAITING_ROOM} alt="West End Therapy waiting room" class="welcome-img" loading="lazy"/>
    <div class="welcome-text">
      <h2>You are Welcome Here.</h2>
      <p>At our clinic, we believe that a beautiful space sets the stage for the important therapeutic work ahead. Our waiting room is designed to be calm, welcoming and comfortable — because healing begins the moment you walk through the door.</p>
    </div>
  </section>

  <!-- INSURANCE -->
  <section class="section pale">
    <div class="wrap tc">
      <h2>Do you have health insurance?</h2>
      <p style="max-width:65ch;margin-inline:auto;margin-top:.75rem;">All of our therapists are covered by Canada Life and Manitoba Blue Cross. We also have therapists registered with First Nations &amp; Inuit Health Branch, SunLife, and Medavie Blue Cross.</p>
      <p style="max-width:65ch;margin-inline:auto;margin-top:.5rem;">All insurance plans cover different therapist designations. Please consult your plan, and if you have questions, please contact us.</p>
    </div>
  </section>

  <!-- CREDENTIALS -->
  <section class="section">
    <div class="wrap tc">
      <h2>All of our therapists have <em>Master's-Level training</em> and are professional members of their respective professional body in Manitoba.</h2>
      <p style="max-width:65ch;margin-inline:auto;margin-top:1rem;">West End Therapy is committed to creating a welcoming, inclusive space for people of all identities, backgrounds, and lived experiences.</p>
      <div class="cred-row">
        <img src={LGBTQ} alt="LGBTQIA2S+ affirming" loading="lazy"/>
        <img src={PSYCH_TODAY} alt="Psychology Today" loading="lazy"/>
        <img src={MCSW} alt="MCSW" loading="lazy"/>
        <img src={CCC} alt="CCC" loading="lazy"/>
        <img src={CACFT} alt="CACFT" loading="lazy"/>
        <img src={IMG_JPG} alt="Professional body" loading="lazy"/>
      </div>
      <div style="margin-top:2rem;">
        <a href="/contact" class="btn btn-teal">Book a Session</a>
        &nbsp;&nbsp;
        <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-outline">Email Us</a>
      </div>
    </div>
  </section>

  <!-- INTAKE FORM -->
  <section class="section pale" id="intake-form">
    <div class="wrap" style="max-width:760px;">
      <h2 class="tc">2-Minute Intake Form</h2>
      <p class="tc" style="margin-top:.5rem;margin-bottom:2rem;">To connect with a therapist, please fill out the fields below. We will get back to you the same day or within 24 hours.</p>
      <form class="intake-form" netlify name="intake">
        <div class="form-group"><label>Name</label><input type="text" name="name" placeholder="Name" required/></div>
        <div class="form-group"><label>E-mail</label><input type="email" name="email" placeholder="E-mail" required/></div>
        <div class="form-group"><label>Phone Number</label><input type="tel" name="phone" placeholder="Phone Number"/></div>
        <div class="form-group"><label>City/Town</label><input type="text" name="city" placeholder="City/Town"/></div>
        <div class="form-group"><label>Age(s) of potential client(s):</label><input type="text" name="ages" placeholder="Age(s)"/></div>
        <div class="form-group">
          <span class="fgl">Gender</span>
          <div class="opt-row">
            <label><input type="radio" name="gender" value="Female"/> Female</label>
            <label><input type="radio" name="gender" value="Male"/> Male</label>
            <label><input type="radio" name="gender" value="Non-Binary"/> Non-Binary</label>
          </div>
        </div>
        <div class="form-group">
          <span class="fgl">I am seeking:</span>
          <div class="opt-row">
            <label><input type="radio" name="seeking" value="Individual therapy"/> Individual therapy</label>
            <label><input type="radio" name="seeking" value="Couples therapy"/> Couples therapy</label>
            <label><input type="radio" name="seeking" value="Family therapy"/> Family therapy</label>
            <label><input type="radio" name="seeking" value="EMDR therapy"/> EMDR therapy</label>
            <label><input type="radio" name="seeking" value="Child & Adolescent therapy"/> Child &amp; Adolescent therapy</label>
          </div>
        </div>
        <div class="form-group"><label>Reason for seeking therapy / What do you want to work on?</label><textarea name="reason" placeholder="Reason for seeking therapy/What do you want to work on?"></textarea></div>
        <div class="form-group">
          <span class="fgl">When are you available? (check all that apply)</span>
          <div class="opt-row">
            <label><input type="checkbox" name="avail" value="Mornings"/> Mornings</label>
            <label><input type="checkbox" name="avail" value="Afternoons"/> Afternoons</label>
            <label><input type="checkbox" name="avail" value="Evenings"/> Evenings</label>
          </div>
        </div>
        <div class="form-group">
          <span class="fgl">On which days? (check all that apply)</span>
          <div class="opt-row">
            {['Mondays','Tuesdays','Wednesdays','Thursdays','Fridays','Saturdays','Sundays'].map(d => (
              <label><input type="checkbox" name="days" value={d}/> {d}</label>
            ))}
          </div>
        </div>
        <div class="form-group"><label>Please provide any additional info about availability, if needed:</label><textarea name="avail_notes" placeholder="Additional availability info..."></textarea></div>
        <div class="form-group">
          <span class="fgl">Preferred modality (check all that apply):</span>
          <div class="opt-row">
            <label><input type="checkbox" name="modality" value="In-person Sessions"/> In-person Sessions</label>
            <label><input type="checkbox" name="modality" value="Online Sessions"/> Online Sessions</label>
            <label><input type="checkbox" name="modality" value="Phone Sessions"/> Phone Sessions</label>
          </div>
        </div>
        <div class="form-group">
          <span class="fgl">Do you have insurance?</span>
          <div class="opt-row">
            {['Manitoba Blue Cross','Canada Life','Treaty Status / First Nations & Inuit Health Branch','SunLife','Medavie Blue Cross (RCMP)','Medavie Blue Cross (non-RCMP)','My insurance isn\\'t listed here','I do not have insurance'].map(ins => (
              <label><input type="checkbox" name="insurance" value={ins}/> {ins}</label>
            ))}
          </div>
        </div>
        <div class="form-group">
          <span class="fgl">Preferred gender of the therapist:</span>
          <div class="opt-row">
            <label><input type="radio" name="pref_gender" value="Female"/> Female</label>
            <label><input type="radio" name="pref_gender" value="Male"/> Male</label>
            <label><input type="radio" name="pref_gender" value="No preference"/> No preference</label>
          </div>
        </div>
        <div class="form-group"><label>Are there any specific therapist(s) you would like to work with?</label><textarea name="specific_therapist" placeholder="Specific therapist preference..."></textarea></div>
        <div class="form-group"><label>Have we missed anything? Please provide any additional info you'd like us to know:</label><textarea name="extra" placeholder="Additional information..."></textarea></div>
        <div class="form-group">
          <span class="fgl">How did you hear about us?</span>
          <div class="opt-row">
            {['Psychology Today','Google Search','Social Media','Flyer','Friends/Family','Referred by another Service Provider','Chat GPT/AI','Other'].map(src => (
              <label><input type="checkbox" name="source" value={src}/> {src}</label>
            ))}
          </div>
        </div>
        <div class="form-group"><label>If referred, please let us know who referred you:</label><input type="text" name="referrer" placeholder="Referred by..."/></div>
        <div class="form-group"><label>If you selected "Other", how did you hear about us?</label><input type="text" name="other_source" placeholder="How did you hear about us?"/></div>
        <button type="submit" class="btn btn-teal" style="width:100%;justify-content:center;margin-top:.5rem;">Submit</button>
      </form>
    </div>
  </section>

</Layout>
<style>
/* Hero */
.hero{min-height:100vh;background-size:cover;background-position:center;background-repeat:no-repeat;position:relative;display:flex;align-items:center}
.hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.08)}
.hero-content{position:relative;z-index:1;padding:clamp(2rem,8vw,6rem) clamp(1.5rem,6vw,5rem);max-width:680px}
.hero-content h1{font-family:var(--font-h);font-size:clamp(2rem,6vw,4rem);font-weight:600;color:#fff;text-transform:uppercase;letter-spacing:.04em;line-height:1.1;margin-bottom:.75rem;text-shadow:0 2px 12px rgba(0,0,0,.18)}
.hero-sub{font-family:var(--font-b);font-size:clamp(.8rem,2vw,1rem);font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.9);margin-bottom:2rem}
.hero-btns{display:flex;flex-wrap:wrap;gap:1rem}
/* Accept */
.accept-btns{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;margin-top:1.5rem}
/* Welcome section */
.welcome-section{display:grid;grid-template-columns:1fr 1fr;min-height:460px}
@media(max-width:768px){.welcome-section{grid-template-columns:1fr}}
.welcome-img{width:100%;height:100%;object-fit:cover;min-height:320px}
.welcome-text{padding:clamp(2rem,6vw,5rem) clamp(2rem,5vw,4rem);display:flex;flex-direction:column;justify-content:center;background:var(--teal-pale)}
.welcome-text h2{margin-bottom:1.25rem}
.welcome-text p{font-size:.95rem;line-height:1.75}
/* Intake form */
.intake-form{background:#fff;padding:2rem;border-radius:4px;border:1px solid var(--border)}
</style>
`);

// ─── therapists.astro ────────────────────────────────────────────────────────
const therapists = [
  { name:'Christine Holowick, MMFT, BSW/RSW', role:'Clinic Director & Therapist', spec:'Individuals (16+), Couples, EMDR', avail:'Closed to new referrals', img:'9b14074c0dc640b2a34d4622c188f7a4/dsc_0164.jpg', href:'/christine-holowick' },
  { name:'Caroline Beattie, MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families with Children/Youth', avail:'Wait List', waitlist:true, img:'eacb74ba64194829865812de8032d02c/cb-profile-pic.jpeg', href:'/caroline-beattie' },
  { name:'Simon Thome, MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families · English & French', avail:'Wed 9 AM - 2:45 PM · Evenings Wait List', img:'54d9a24e941944839d615b6c7c6689f6/st-profile-pic-cropped.jpeg', href:'/simon-thome' },
  { name:'Melissa Pilz, MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families', avail:'Wait List', waitlist:true, img:'f9c06e146452457ea000edaf61ca844a/img_9968-jpg.jpg', href:'/melissa-pliz' },
  { name:'Julie Kettle, MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families', avail:'Mon 9 AM - 2:45 PM · Tues 3 PM - 9 PM', img:'eae9b9ec78ae41aea20fa89bf6cb4f58/f97cd037-9510-4342-9e29-40b3401c5f0f_1_201_a.jpeg', href:'/julie-kettle' },
  { name:'Marie Baffoe, MMFT, MSW/RSW', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families, EMDR', avail:'Wait List', waitlist:true, img:'e917830f941b4992ba58b10d9062ea80/230910ls117.jpg', href:'/marie-baffoe' },
  { name:'Michael Kurek, MMFT', role:'Associate Therapist', spec:'Adults, Couples, Families, EMDR', avail:'Mon, Tues & Wed 3 - 9 PM', img:'32690e2670654fbd9f2c62c14bddd621/michael-k-bio-phot.jpg', href:'/michael-kurek' },
  { name:'Mel Clark, MMFT, CCC', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families', avail:'Tues, Wed, Thurs daytimes · Mon eve wait list', img:'mel-clark', href:'/mel-clark', placeholder:true },
  { name:'Brianna Bowen, MSW/RSW', role:'Associate Therapist', spec:'Children & Teens, Adults, Families', avail:'Tues 9 AM - 4 PM · Tues eves Wait List', img:'brianna-bowen', href:'/brianna-bowen', placeholder:true },
  { name:'Olivia Barker, MSW/RSW', role:'Associate Therapist', spec:'Individuals (16+), EMDR', avail:'Wait List', waitlist:true, img:'olivia-barker', href:'/olivia-barker', placeholder:true },
  { name:'Laura Canfield, BSW/RSW, MMFT Candidate', role:'Associate Therapist', spec:'Individuals (16+), Couples', avail:'Tues & Thu 3 PM - 9 PM · Wed & Fri 9 AM - 2:45 PM', img:'laura-canfield', href:'/laura-canfield', placeholder:true },
  { name:'Lena Morina, MMFT', role:'Associate Therapist', spec:'Families (children 8+) & Teens, Individuals, Couples · English & Albanian', avail:'Mon & Wed 5 PM - 9 PM', img:'lena-morina', href:'/lena-morina', placeholder:true },
  { name:'Hyoshin Jang, MMFT, BSW/RSW', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families · English & Korean', avail:'Tues, Thurs, Fri eves online · Saturdays wait list', img:'hyoshin-jang', href:'/hyoshin-jang', placeholder:true },
  { name:'Deanna Lutzek, MA, CCC', role:'Associate Therapist', spec:'Children (7+), Teens, Adults, EMDR', avail:'Tues 9 AM - 2:45 PM · Fri 4 PM - 7 PM', img:'deanna-lutzek', href:'/deanna-lutzek', placeholder:true },
  { name:'Ioanna Charatsari, MMFT', role:'Associate Therapist', spec:'Individuals, Couples, Families (age 6+) · English & Greek', avail:'Tue & Thur 5 PM - 9 PM', img:'ioanna-charatsari', href:'/ioanna-charatsari', placeholder:true },
  { name:'Sonja Iserloh, MSW/RSW', role:'Associate Therapist', spec:'Individual Adults', avail:'Wed 4 PM - 9 PM', img:'sonja-iserloh', href:'/sonja-iserloh', placeholder:true },
  { name:'Michelle Lewicki, MMFT, CCC', role:'Associate Therapist', spec:'Individuals, Couples, Families', avail:'Wed & Thur 4 PM - 9 PM · Sun 12 PM - 5 PM', img:'michelle-lewicki', href:'/michelle-lewicki', placeholder:true },
  { name:'Julie Letkeman, MMFT', role:'Associate Therapist', spec:'Individuals (Adults & Youth 10+), Couples, Families', avail:'Wed 6 PM - 9 PM', img:'julie-letkeman', href:'/julie-letkeman', placeholder:true },
  { name:'Kristin Millar, MMFT, BSW/RSW', role:'Associate Therapist', spec:'Individuals (Adults & Youth 4+), Couples, Families', avail:'Tue & Wed 5:30 - 9 PM · Biweekly Fri & Sat 9 AM - 3 PM', img:'kristin-millar', href:'/kristin-millar', placeholder:true },
  { name:'Steven Duvenaud, MACP, CCC', role:'Associate Therapist', spec:'Individuals (15+)', avail:'Mon, Tue, Thu & Fri 9 AM - 2:45 PM · Wed 3 PM - 9 PM', img:'steven-duvenaud', href:'/steven-duvenaud', placeholder:true },
  { name:'Lara Solis, MSW/RSW', role:'Associate Therapist', spec:'Individuals (16+) · English & Tagalog', avail:'Mon 3 PM - 9 PM · Biweekly Tue & Sat · Sun 10 AM - 5 PM', img:'lara-solis', href:'/lara-solis', placeholder:true },
  { name:'Kelly Ferguson, MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples', avail:'Wed 9:45 AM - 4:45 PM', img:'kelly-ferguson', href:'/kelly-ferguson', placeholder:true },
  { name:'Jaymie Friesen, MPS, CCC', role:'Associate Therapist', spec:'Individuals (18+)', avail:'Mon 3 PM - 9 PM', img:'jaymie-friesen', href:'/jaymie-friesen', placeholder:true },
  { name:'Katrina Forget, MACP, CCC', role:'Associate Therapist', spec:'Children & Youth aged 3+, Parents', avail:'Mon 5 PM - 9 PM · Sat 10 AM - 3 PM', img:'katrina-forget', href:'/katrina-forget', placeholder:true },
];

write('src/pages/therapists.astro', `---
import Layout from '../layouts/Layout.astro';
const IMG_BASE = '${IMG}';
const therapists = ${JSON.stringify(therapists, null, 2)};
---
<Layout title="Winnipeg Therapists" description="Meet our team of over 20 Master's-level therapists in Winnipeg offering counselling and therapy.">

  <section class="page-hero">
    <div class="wrap">
      <h1>Winnipeg Therapists</h1>
      <p>Qualified &amp; Compassionate Therapists &amp; Counsellors in Winnipeg</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <h2 style="margin-bottom:.75rem;">Meet Our Team of Over 20 Master's-Level Therapists</h2>
      <p>Click on a photo for the full bio. Please note some therapists have waiting lists.</p>
      <a href="/therapists?accepting=true" class="btn btn-outline mt1" style="display:inline-flex;">View only therapists with current availability</a>
      <div class="thx-grid" style="margin-top:2.5rem;">
        {therapists.map(t => (
          <a href={t.href} class="thx-card">
            {t.placeholder ? (
              <div class="thx-placeholder">{t.name.split(',')[0].split(' ').map(n=>n[0]).join('')}</div>
            ) : (
              <img src={\`\${IMG_BASE}/\${t.img}\`} alt={t.name.split(',')[0]} loading="lazy"/>
            )}
            <div class="thx-card__body">
              <div class="thx-card__name">{t.name}</div>
              <span class="thx-card__role">{t.role}</span>
              <p class="thx-card__spec">{t.spec}</p>
              <div class:list={['thx-card__avail', { waitlist: t.waitlist }]}>{t.avail}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>

  <section class="section pale tc">
    <div class="wrap">
      <h2>All of our therapists have <em>Master's-Level training</em> and are professional members of their respective professional body in Manitoba.</h2>
      <p style="max-width:60ch;margin-inline:auto;margin-top:1rem;">West End Therapy is committed to creating a welcoming, inclusive space for people of all identities, backgrounds, and lived experiences.</p>
      <div style="margin-top:2rem;">
        <a href="/contact" class="btn btn-teal">Book a Session</a>
        &nbsp;&nbsp;
        <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-outline">Email Us</a>
      </div>
    </div>
  </section>

</Layout>
<style>
.page-hero{background:linear-gradient(135deg,var(--teal-light),var(--teal-pale));padding-block:clamp(3rem,7vw,5rem);border-bottom:1px solid var(--border)}
.page-hero h1{margin-block:.5rem .75rem}
.page-hero p{max-width:55ch;font-size:1.05rem}
.thx-placeholder{width:100%;aspect-ratio:3/4;background:linear-gradient(135deg,var(--teal-light),var(--teal));display:flex;align-items:center;justify-content:center;font-family:var(--font-h);font-size:3rem;font-weight:700;color:#fff}
</style>
`);

// ─── contact.astro ───────────────────────────────────────────────────────────
write('src/pages/contact.astro', `---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Contact Us" description="Contact West End Therapy in Winnipeg. Book a session or reach us at 204-809-9114.">

  <section class="page-hero">
    <div class="wrap">
      <h1>Contact Us</h1>
      <p>Ready to take the first step? Reach out and we'll match you with the right therapist.</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap contact-grid">
      <div>
        <h2 style="margin-bottom:1.5rem;">Get in Touch</h2>
        <form netlify name="contact">
          <div class="form-group"><label>Name *</label><input type="text" name="name" required placeholder="Your name"/></div>
          <div class="form-group"><label>Email *</label><input type="email" name="email" required placeholder="your@email.com"/></div>
          <div class="form-group"><label>Phone</label><input type="tel" name="phone" placeholder="204-555-0100"/></div>
          <div class="form-group"><label>Message</label><textarea name="message" placeholder="How can we help?"></textarea></div>
          <button type="submit" class="btn btn-teal" style="width:100%;justify-content:center;">Send Message</button>
        </form>
      </div>
      <aside class="contact-info">
        <div class="info-block">
          <h3>Visit Us</h3>
          <p>759 Wall St<br>Winnipeg, MB R3G 2T6</p>
          <a href="https://maps.app.goo.gl/8cHBVMuQ6hXhFEZKA" target="_blank" rel="noopener" class="btn btn-outline mt1" style="font-size:.72rem;">View on Google Maps</a>
        </div>
        <div class="info-block">
          <h3>Call or Email</h3>
          <p><a href="tel:+12048099114">(204) 809-9114</a></p>
          <p><a href="mailto:inquiries@westendtherapy.ca">inquiries@westendtherapy.ca</a></p>
        </div>
        <div class="info-block">
          <h3>Crisis Resources</h3>
          <p style="font-size:.85rem;">If you are in immediate danger, call <strong>911</strong>.</p>
          <p style="font-size:.85rem;">Manitoba Crisis Line: <a href="tel:18883223019">1-888-322-3019</a> (24/7)</p>
        </div>
      </aside>
    </div>
  </section>

</Layout>
<style>
.page-hero{background:linear-gradient(135deg,var(--teal-light),var(--teal-pale));padding-block:clamp(3rem,7vw,5rem);border-bottom:1px solid var(--border)}
.page-hero h1{margin-block:.5rem .75rem}
.page-hero p{max-width:55ch;font-size:1.05rem}
.contact-grid{display:grid;grid-template-columns:1fr 340px;gap:4rem;align-items:start}
@media(max-width:900px){.contact-grid{grid-template-columns:1fr}}
.info-block{background:var(--teal-pale);border-radius:4px;padding:1.5rem;margin-bottom:1.25rem}
.info-block h3{font-size:1rem;font-family:var(--font-b);font-weight:700;color:var(--black);margin-bottom:.6rem}
.info-block p{font-size:.9rem}
.info-block a{color:var(--teal)}
</style>
`);

// ─── about.astro ─────────────────────────────────────────────────────────────
write('src/pages/about.astro', `---
import Layout from '../layouts/Layout.astro';
const WAITING_ROOM = 'https://westendtherapy.ca/ws/media-library/5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg';
---
<Layout title="About Us" description="About West End Therapy — locally owned group therapy practice in Winnipeg, MB since 2020.">

  <section class="page-hero">
    <div class="wrap">
      <h1>About West End Therapy</h1>
      <p>Locally owned and operated since 2020, serving Winnipeg and Manitoba.</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap about-split">
      <img src={WAITING_ROOM} alt="West End Therapy waiting room" loading="lazy" style="border-radius:4px;"/>
      <div>
        <h2>Our Mission</h2>
        <p style="margin-top:1rem;">West End Therapy was founded in 2020 with a simple but powerful mission: to provide exceptional quality therapy services in a space where people <em>want</em> to come — a place that feels warm, safe, and welcoming from the moment they walk through the door.</p>
        <p style="margin-top:.75rem;">We are a group psychotherapy and relational therapy practice specializing in providing therapy services in Winnipeg and across Manitoba. All of our therapists have Master's-Level training and are professional members of their respective governing bodies.</p>
        <p style="margin-top:.75rem;">We accept direct billing from Canada Life, Manitoba Blue Cross, and many other insurance providers, because we believe financial barriers should never stand between someone and the support they need.</p>
        <a href="/therapists" class="btn btn-teal mt2">Meet Our Team</a>
      </div>
    </div>
  </section>

  <section class="section pale tc">
    <div class="wrap">
      <h2>West End Therapy is committed to creating a welcoming, inclusive space for people of all identities, backgrounds, and lived experiences.</h2>
      <div style="margin-top:2rem;">
        <a href="/contact" class="btn btn-teal">Book a Session</a>
        &nbsp;&nbsp;
        <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-outline">Email Us</a>
      </div>
    </div>
  </section>

</Layout>
<style>
.page-hero{background:linear-gradient(135deg,var(--teal-light),var(--teal-pale));padding-block:clamp(3rem,7vw,5rem);border-bottom:1px solid var(--border)}
.page-hero h1{margin-block:.5rem .75rem}
.page-hero p{max-width:55ch;font-size:1.05rem}
.about-split{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
@media(max-width:768px){.about-split{grid-template-columns:1fr}}
</style>
`);

// ─── 404.astro ───────────────────────────────────────────────────────────────
write('src/pages/404.astro', `---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Page Not Found">
  <section style="padding-block:8rem;text-align:center;">
    <div class="wrap">
      <h1>404 — Page Not Found</h1>
      <p style="margin-top:1rem;margin-bottom:2rem;">Sorry, we couldn't find that page.</p>
      <a href="/" class="btn btn-teal">Go Home</a>
    </div>
  </section>
</Layout>
`);

// ─── favicon ─────────────────────────────────────────────────────────────────
write('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#4f6f72"/><text y=".9em" font-size="70" x="15">🌿</text></svg>`);

// ─── astro.config.mjs ────────────────────────────────────────────────────────
write('astro.config.mjs', `import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://westendtherapy.ca',
});
`);

console.log('\\n✅ All done! Run: npm run dev');
