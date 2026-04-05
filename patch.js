// Run: node patch.js
// Fixes: therapist images, individual therapist pages, blog, services layout
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

// ─── ALL 24 THERAPISTS WITH REAL IMAGES ──────────────────────────────────────
const therapists = [
  { slug:'christine-holowick', name:'Christine Holowick', creds:'MMFT, BSW/RSW', role:'Clinic Director & Therapist', spec:'Individuals (16+), Couples, EMDR', avail:'Closed to new referrals', waitlist:false, img:'9b14074c0dc640b2a34d4622c188f7a4/dsc_0164.jpg',
    bio:'Christine is the founder and clinical director of West End Therapy. She holds a Master of Marriage and Family Therapy and is a Registered Social Worker. She specialises in couples therapy, individual therapy for adults, and EMDR. Christine brings a warm, collaborative style to her practice and is passionate about helping clients build healthier relationships and overcome the effects of trauma.' },
  { slug:'caroline-beattie', name:'Caroline Beattie', creds:'MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families with Children/Youth', avail:'Wait List', waitlist:true, img:'eacb74ba64194829865812de8032d02c/cb-profile-pic.jpeg',
    bio:'Caroline holds a Master of Marriage and Family Therapy. She works with individuals, couples, and families including children and youth. Her approach is strengths-based and relational, drawing on attachment theory and emotionally focused frameworks to help clients build connection and resilience.' },
  { slug:'simon-thome', name:'Simon Thome', creds:'MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families · English & French', avail:'Wed 9 AM – 2:45 PM · Evenings Wait List', waitlist:false, img:'54d9a24e941944839d615b6c7c6689f6/st-profile-pic-cropped.jpeg',
    bio:'Simon holds a Master of Marriage and Family Therapy and provides sessions in both English and French. He works with individuals, couples, and families using a systems-based approach. Simon is interested in exploring how cultural and contextual factors shape our experiences and relationships.' },
  { slug:'melissa-pilz', name:'Melissa Pilz', creds:'MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families', avail:'Wait List', waitlist:true, img:'f9c06e146452457ea000edaf61ca844a/img_9968-jpg.jpg',
    bio:'Melissa holds a Master of Marriage and Family Therapy. She works with individuals, couples, and families using an emotionally focused and attachment-based lens. Melissa is passionate about helping clients navigate life transitions, relational difficulties, and personal growth.' },
  { slug:'julie-kettle', name:'Julie Kettle', creds:'MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families', avail:'Mon 9 AM – 2:45 PM · Tues 3 PM – 9 PM', waitlist:false, img:'eae9b9ec78ae41aea20fa89bf6cb4f58/f97cd037-9510-4342-9e29-40b3401c5f0f_1_201_a.jpeg',
    bio:'Julie holds a Master of Marriage and Family Therapy and has experience working with adults, couples, and families. She uses an integrative, client-centred approach that incorporates elements of narrative, solution-focused, and emotionally focused therapy.' },
  { slug:'marie-baffoe', name:'Marie Baffoe', creds:'MMFT, MSW/RSW', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families, EMDR', avail:'Wait List', waitlist:true, img:'e917830f941b4992ba58b10d9062ea80/230910ls117.jpg',
    bio:'Marie holds both a Master of Marriage and Family Therapy and a Master of Social Work. She is trained in EMDR and works with individuals, couples, and families. Marie brings a culturally sensitive approach and is committed to creating an inclusive and affirming therapeutic space.' },
  { slug:'michael-kurek', name:'Michael Kurek', creds:'MMFT', role:'Associate Therapist', spec:'Adults, Couples, Families, EMDR', avail:'Mon, Tues & Wed 3 – 9 PM', waitlist:false, img:'32690e2670654fbd9f2c62c14bddd621/michael-k-bio-phot.jpg',
    bio:'Michael holds a Master of Marriage and Family Therapy and is trained in EMDR. He works with adults, couples, and families, drawing on systems theory and trauma-informed approaches. Michael is particularly interested in helping clients who are navigating the impact of trauma on their daily lives and relationships.' },
  { slug:'mel-clark', name:'Mel Clark', creds:'MMFT, CCC', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families', avail:'Tues, Wed, Thurs daytimes · Mon eve wait list', waitlist:false, img:'b29ac3153b1a4df29e7f622301b4af19/mel-clark.jpeg',
    bio:'Mel holds a Master of Marriage and Family Therapy and is a Canadian Certified Counsellor. Mel works with individuals, couples, and families using a person-centred and systemic approach, with a focus on creating a warm, non-judgmental space for clients to explore their concerns.' },
  { slug:'brianna-bowen', name:'Brianna Bowen', creds:'MSW/RSW', role:'Associate Therapist', spec:'Children & Teens, Adults, Families', avail:'Tues 9 AM – 4 PM · Tues eves Wait List', waitlist:false, img:'90022c5db0674e908db3d1c70f8ca96c/img_4751.jpeg',
    bio:'Brianna holds a Master of Social Work and is a Registered Social Worker. She specialises in working with children, teens, adults, and families. Brianna uses a trauma-informed, strength-based approach and is passionate about supporting young people and their families through difficult times.' },
  { slug:'olivia-barker', name:'Olivia Barker', creds:'MSW/RSW', role:'Associate Therapist', spec:'Individuals (16+), EMDR', avail:'Wait List', waitlist:true, img:'63b7dd85df5c41eb98f227a9e8e5ed7b/image_50791937-1.jpg',
    bio:'Olivia holds a Master of Social Work and is trained in EMDR. She works with individuals aged 16 and over using trauma-informed, attachment-based approaches. Olivia is committed to helping clients process difficult experiences and build greater resilience and self-understanding.' },
  { slug:'laura-canfield', name:'Laura Canfield', creds:'BSW/RSW, MMFT Candidate', role:'Associate Therapist', spec:'Individuals (16+), Couples', avail:'Tues & Thu 3 PM – 9 PM · Wed & Fri 9 AM – 2:45 PM', waitlist:false, img:'1b4b54e62ef0466585641842d34d8699/headshot-laura.jpg',
    bio:'Laura holds a Bachelor of Social Work and is currently completing her Master of Marriage and Family Therapy. She works with individuals and couples using a collaborative, systemic lens. Laura is passionate about helping clients navigate relationship challenges and personal growth.' },
  { slug:'lena-morina', name:'Lena Morina', creds:'MMFT', role:'Associate Therapist', spec:'Families (children 8+) & Teens, Individuals, Couples · English & Albanian', avail:'Mon & Wed 5 PM – 9 PM', waitlist:false, img:'29ad796eaa33dd18a6135682541f4c6f/img_4286.jpeg',
    bio:'Lena holds a Master of Marriage and Family Therapy and provides sessions in both English and Albanian. She works with families including children aged 8 and over, teens, individuals, and couples. Lena brings a multicultural perspective to her practice.' },
  { slug:'hyoshin-jang', name:'Hyoshin Jang', creds:'MMFT, BSW/RSW', role:'Associate Therapist', spec:'Individuals (16+), Couples, Families · English & Korean', avail:'Tues, Thurs, Fri eves online · Saturdays wait list', waitlist:false, img:'0d6ba507acd069265f4cf668810bcfab/img_0626.jpeg',
    bio:'Hyoshin holds a Master of Marriage and Family Therapy and a Bachelor of Social Work. She provides sessions in both English and Korean. Hyoshin works with individuals, couples, and families using a systemic and culturally aware approach.' },
  { slug:'deanna-lutzek', name:'Deanna Lutzek', creds:'MA, CCC', role:'Associate Therapist', spec:'Children (7+), Teens, Adults, EMDR', avail:'Tues 9 AM – 2:45 PM · Fri 4 PM – 7 PM', waitlist:false, img:'4724021c5b218e89c24e1f4162a14b7e/image0.jpeg',
    bio:'Deanna holds a Master of Arts in Counselling Psychology and is a Canadian Certified Counsellor. She is trained in EMDR and works with children aged 7 and over, teens, and adults. Deanna uses trauma-informed approaches to help clients process difficult experiences.' },
  { slug:'ioanna-charatsari', name:'Ioanna Charatsari', creds:'MMFT', role:'Associate Therapist', spec:'Individuals, Couples, Families (age 6+) · English & Greek', avail:'Tue & Thur 5 PM – 9 PM', waitlist:false, img:'6511fcefc7a0424038d40dddaa532f4f/ioanna-bio-photo2.jpeg',
    bio:'Ioanna holds a Master of Marriage and Family Therapy and provides sessions in both English and Greek. She works with individuals, couples, and families including children aged 6 and over. Ioanna brings a systemic, culturally sensitive approach to her work.' },
  { slug:'sonja-iserloh', name:'Sonja Iserloh', creds:'MSW/RSW', role:'Associate Therapist', spec:'Individual Adults', avail:'Wed 4 PM – 9 PM', waitlist:false, img:'2c78baf5e22b29f20b9d958c0ec284f3/img_8201.jpeg',
    bio:'Sonja holds a Master of Social Work and is a Registered Social Worker. She works with individual adults using a person-centred, trauma-informed approach. Sonja is passionate about supporting clients through anxiety, depression, life transitions, and personal challenges.' },
  { slug:'michelle-lewicki', name:'Michelle Lewicki', creds:'MMFT, CCC', role:'Associate Therapist', spec:'Individuals, Couples, Families', avail:'Wed & Thur 4 PM – 9 PM · Sun 12 PM – 5 PM', waitlist:false, img:'b227ee3a6c48c096e2f79d3c90b78aba/michelle-photo.png',
    bio:'Michelle holds a Master of Marriage and Family Therapy and is a Canadian Certified Counsellor. She works with individuals, couples, and families using a relational, strengths-based approach. Michelle is particularly interested in supporting clients through relationship transitions and personal development.' },
  { slug:'julie-letkeman', name:'Julie Letkeman', creds:'MMFT', role:'Associate Therapist', spec:'Individuals (Adults & Youth 10+), Couples, Families', avail:'Wed 6 PM – 9 PM', waitlist:false, img:'57c95b618c88fe42e1648c96d3e74db5/julie-l-bio-photo.jpg',
    bio:'Julie holds a Master of Marriage and Family Therapy. She works with individuals including youth aged 10 and over, couples, and families. Julie uses a collaborative, systemic approach to help clients navigate challenges and build stronger connections.' },
  { slug:'kristin-millar', name:'Kristin Millar', creds:'MMFT, BSW/RSW', role:'Associate Therapist', spec:'Individuals (Adults & Youth 4+), Couples, Families', avail:'Tue & Wed 5:30 – 9 PM · Biweekly Fri & Sat 9 AM – 3 PM', waitlist:false, img:'fe3316c270838a7b73e566d32ca58fa4/km-picture.jpeg',
    bio:'Kristin holds a Master of Marriage and Family Therapy and a Bachelor of Social Work. She works with individuals including young children aged 4 and over, couples, and families. Kristin draws on play therapy techniques and systemic approaches in her work with younger clients.' },
  { slug:'steven-duvenaud', name:'Steven Duvenaud', creds:'MACP, CCC', role:'Associate Therapist', spec:'Individuals (15+)', avail:'Mon, Tue, Thu & Fri 9 AM – 2:45 PM · Wed 3 PM – 9 PM', waitlist:false, img:'27e7edcaa9b5a30d32428452ada3f65b/steven-photo.jpeg',
    bio:'Steven holds a Master of Arts in Counselling Psychology and is a Canadian Certified Counsellor. He works with individuals aged 15 and over using cognitive-behavioural, person-centred, and mindfulness-based approaches. Steven is passionate about supporting clients through anxiety, depression, and life transitions.' },
  { slug:'lara-solis', name:'Lara Solis', creds:'MSW/RSW', role:'Associate Therapist', spec:'Individuals (16+) · English & Tagalog', avail:'Mon 3 PM – 9 PM · Biweekly Tue & Sat · Sun 10 AM – 5 PM', waitlist:false, img:'94a8c771975d150154728882e9a4ad67/lara-bio-photo.jpeg',
    bio:'Lara holds a Master of Social Work and is a Registered Social Worker. She provides sessions in both English and Tagalog. Lara works with individuals aged 16 and over using a culturally sensitive, trauma-informed approach. She is passionate about supporting newcomers and marginalized communities.' },
  { slug:'kelly-ferguson', name:'Kelly Ferguson', creds:'MMFT', role:'Associate Therapist', spec:'Individuals (16+), Couples', avail:'Wed 9:45 AM – 4:45 PM', waitlist:false, img:'7c1c23e7dd9c42d6a8712a2e5980bc5d/kelly-f-bio-photo.jpg',
    bio:'Kelly holds a Master of Marriage and Family Therapy. She works with individuals and couples using a systemic, emotionally focused approach. Kelly is interested in helping clients navigate relationship challenges, attachment wounds, and personal growth.' },
  { slug:'jaymie-friesen', name:'Jaymie Friesen', creds:'MPS, CCC', role:'Associate Therapist', spec:'Individuals (18+)', avail:'Mon 3 PM – 9 PM', waitlist:false, img:'ceae02a67d028082d642408fb71be668/jaymie-bio-photo.jpg',
    bio:'Jaymie holds a Master of Psychotherapy and Spirituality and is a Canadian Certified Counsellor. She works with adults using an integrative, holistic approach that honours the spiritual dimension of human experience. Jaymie is passionate about supporting clients through grief, life transitions, and meaning-making.' },
  { slug:'katrina-forget', name:'Katrina Forget', creds:'MACP, CCC', role:'Associate Therapist', spec:'Children & Youth aged 3+, Parents', avail:'Mon 5 PM – 9 PM · Sat 10 AM – 3 PM', waitlist:false, img:'6f4b5f265199d40aa7c751f7a09b050d/kforget-pic.png',
    bio:'Katrina holds a Master of Arts in Counselling Psychology and is a Canadian Certified Counsellor. She specialises in working with children and youth aged 3 and over, as well as their parents. Katrina uses play-based, attachment-informed approaches to support children through emotional and behavioural challenges.' },
];

// ─── BLOG POSTS ───────────────────────────────────────────────────────────────
const blogPosts = [
  { slug:'west-end-therapy-expands-team-with-five-new-therapists-to-meet-growing-community-demand', title:'West End Therapy Expands Team with Five New Therapists', date:'2024-11-15', category:'News', excerpt:'West End Therapy is proud to welcome five new therapists to our growing team, expanding our capacity to serve the Winnipeg community with compassionate, evidence-based care.', img:'9b14074c0dc640b2a34d4622c188f7a4/dsc_0164.jpg' },
  { slug:'navigating-your-therapy-journey-a-comprehensive-guide-to-finding-the-right-support', title:'Navigating Your Therapy Journey: A Comprehensive Guide to Finding the Right Support', date:'2024-09-10', category:'Resources', excerpt:'Starting therapy can feel overwhelming. This comprehensive guide walks you through what to expect, how to find the right therapist, and how to get the most from your sessions.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { slug:'supporting-children-s-emotional-development-through-play', title:"Supporting Children's Emotional Development Through Play", date:'2024-07-22', category:'Children & Youth', excerpt:'Play is the primary language of childhood. Learn how play therapy supports emotional development and helps children process difficult experiences in a natural, developmentally appropriate way.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { slug:'west-end-therapy-expands-trauma-therapy-services-with-addition-of-two-new-emdr-therapists', title:'West End Therapy Expands Trauma Therapy Services with Two New EMDR Therapists', date:'2024-06-05', category:'News', excerpt:"We're excited to announce the addition of two new EMDR-trained therapists to our team, strengthening our capacity to provide cutting-edge trauma therapy in Winnipeg.", img:'9b14074c0dc640b2a34d4622c188f7a4/dsc_0164.jpg' },
  { slug:'self-help-strategies-for-managing-low-mood-amp-depression', title:'Self-Help Strategies for Managing Low Mood & Depression', date:'2024-04-18', category:'Mental Health', excerpt:'While therapy is an important tool for addressing depression, there are also practical strategies you can use between sessions to support your mental health and lift your mood.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { slug:'getting-the-most-out-of-couples-therapy-10-guidelines-for-success', title:'Getting the Most Out of Couples Therapy: 10 Guidelines for Success', date:'2024-03-12', category:'Couples', excerpt:'Couples therapy can be transformative — but only when both partners are fully engaged. Here are ten practical guidelines to help you and your partner make the most of your sessions.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { slug:'the-decision-to-seek-therapy-embracing-mental-health-care', title:'The Decision to Seek Therapy: Embracing Mental Health Care', date:'2024-02-08', category:'Resources', excerpt:"Taking the step to seek therapy is one of the most courageous decisions you can make. Here's what you need to know about overcoming the stigma and finding the support you deserve.", img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { slug:'understanding-emdr-vs-talk-therapy-which-approach-is-right-for-you', title:'Understanding EMDR vs. Talk Therapy: Which Approach Is Right for You?', date:'2024-01-20', category:'Therapy Types', excerpt:'EMDR and traditional talk therapy are both effective treatments for trauma and other mental health concerns. Learn the key differences and how to decide which approach might work best for you.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { slug:'when-should-i-see-a-therapist', title:'When Should I See a Therapist?', date:'2023-11-30', category:'Resources', excerpt:"Many people wonder whether their struggles 'are bad enough' to warrant therapy. The short answer: if something is affecting your quality of life, therapy can help. Here's a closer look.", img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { slug:'understanding-the-pursue-withdraw-cycle-in-couples-therapy', title:'Understanding the Pursue-Withdraw Cycle in Couples Therapy', date:'2023-10-14', category:'Couples', excerpt:'One of the most common patterns in relationship conflict is the pursue-withdraw cycle. Understanding this dynamic is a crucial first step toward breaking it and building deeper connection.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { slug:'affair-recovery-in-couples-therapy-a-path-to-healing-and-rebuilding-trust', title:'Affair Recovery in Couples Therapy: A Path to Healing and Rebuilding Trust', date:'2023-09-05', category:'Couples', excerpt:'Recovering from an affair is one of the most challenging journeys a couple can face. With the right support, many couples are able to rebuild trust and create a stronger, more honest relationship.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { slug:'managing-anxiety-practical-tips-for-finding-calm-in-a-chaotic-world', title:'Managing Anxiety: Practical Tips for Finding Calm in a Chaotic World', date:'2023-07-28', category:'Mental Health', excerpt:'Anxiety is one of the most common mental health challenges. Explore evidence-based strategies for managing anxious thoughts and building a calmer, more grounded daily life.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { slug:'doing-new-year-s-resolutions-differently-how-therapy-can-help', title:"Doing New Year's Resolutions Differently: How Therapy Can Help", date:'2023-01-03', category:'Resources', excerpt:"Instead of setting goals you'll abandon by February, consider using the new year as an opportunity to invest in lasting change with the support of a therapist.", img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { slug:'fair-division-of-labour-in-couples', title:'Fair Division of Labour in Couples', date:'2023-05-16', category:'Couples', excerpt:"Disagreements about household responsibilities are among the most common sources of tension in relationships. Here's how to approach the conversation and find a balance that works for both partners.", img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { slug:'winnipeg-therapy-clinic-announces-renovation-and-expansion-of-its-space', title:'Winnipeg Therapy Clinic Announces Renovation and Expansion of Its Space', date:'2023-03-22', category:'News', excerpt:"West End Therapy is excited to announce the renovation and expansion of our Winnipeg clinic, creating a more welcoming and comfortable space for our clients and therapists.", img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
];

// ─── SERVICES DATA ─────────────────────────────────────────────────────────────
const services = [
  { name:'Individual Therapy', slug:'individual-therapy', desc:'One-on-one support for anxiety, depression, trauma, life transitions and more.', img:'26789bddcacb0b17f2a56440eb68713d/adobestock_436729956.jpeg' },
  { name:'Couples Therapy', slug:'couples-therapy', desc:'Rebuild connection, improve communication and resolve conflict together.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { name:'Family Therapy', slug:'family-therapy', desc:'Strengthen family bonds and navigate challenges as a unit.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { name:'Child & Teen Therapy', slug:'child-therapy', desc:'Compassionate, age-appropriate support for children aged 3 and up.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { name:'EMDR Therapy', slug:'emdr-therapy', desc:'Evidence-based trauma processing using Eye Movement Desensitization and Reprocessing.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { name:'Anxiety Therapy', slug:'anxiety-therapy', desc:'Practical tools and deeper insight to manage anxiety and find calm.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { name:'Depression Therapy', slug:'depression-therapy', desc:'Compassionate support to lift mood, restore energy and reconnect with life.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { name:'Sex Therapy', slug:'sex-therapy', desc:'Confidential support for intimacy, sexual concerns and relational wellbeing.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { name:'Play Therapy', slug:'play-therapy', desc:"Supporting children's emotional development through the natural language of play.", img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { name:'Anger Management', slug:'anger-management', desc:'Understand the roots of anger and develop healthier responses.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { name:'Grief Counselling', slug:'grief-therapy', desc:'Compassionate space to process loss and find your way forward.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
  { name:'Online Therapy', slug:'online-therapy', desc:'Secure video sessions available to clients across Manitoba.', img:'5254cef2b1244a5fc2b5e6226a7edcd4/waiting-room-v2.jpeg' },
];

// ─── 1. REWRITE therapists.astro ──────────────────────────────────────────────
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
      <h2 style="margin-bottom:.5rem;">Meet Our Team of Over 20 Master's-Level Therapists</h2>
      <p style="margin-bottom:2rem;">Click on a photo for the full bio. Please note some therapists have waiting lists.</p>
      <div class="thx-grid">
        {therapists.map(t => (
          <a href={'/therapists/' + t.slug} class="thx-card">
            <img src={IMG_BASE + '/' + t.img} alt={t.name} loading="lazy"/>
            <div class="thx-card__body">
              <div class="thx-card__name">{t.name}</div>
              <span class="thx-card__creds">{t.creds}</span>
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
        <a href="/#intake-form" class="btn btn-teal">Book a Session</a>
        &ensp;
        <a href="mailto:inquiries@westendtherapy.ca" class="btn btn-outline">Email Us</a>
      </div>
    </div>
  </section>

</Layout>
<style>
.page-hero{background:linear-gradient(135deg,var(--teal-light),var(--teal-pale));padding-block:clamp(3rem,7vw,5rem);border-bottom:1px solid var(--border)}
.page-hero h1{margin-block:.5rem .75rem}
.page-hero p{max-width:55ch;font-size:1.05rem}
.thx-card__creds{font-size:.7rem;font-weight:600;letter-spacing:.08em;color:var(--mid);display:block;margin-bottom:.15rem}
</style>
`);

// ─── 2. INDIVIDUAL THERAPIST PAGES ────────────────────────────────────────────
write('src/pages/therapists/[slug].astro', `---
import Layout from '../../layouts/Layout.astro';

const IMG_BASE = '${IMG}';
const therapists = ${JSON.stringify(therapists, null, 2)};

export function getStaticPaths() {
  const therapists = ${JSON.stringify(therapists, null, 2)};
  return therapists.map(t => ({ params: { slug: t.slug }, props: { therapist: t } }));
}

const { therapist: t } = Astro.props;
---
<Layout title={t.name + ', ' + t.creds} description={'Book a session with ' + t.name + ' at West End Therapy in Winnipeg.'}>

  <section class="thx-hero">
    <div class="wrap thx-hero__inner">
      <div class="thx-photo-wrap">
        <img src={IMG_BASE + '/' + t.img} alt={t.name} class="thx-photo"/>
      </div>
      <div class="thx-info">
        <span class="thx-role">{t.role}</span>
        <h1>{t.name}</h1>
        <p class="thx-creds">{t.creds}</p>
        <p class="thx-spec">{t.spec}</p>
        <div class:list={['avail-badge', { waitlist: t.waitlist }]}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          {t.avail}
        </div>
        <div class="thx-actions">
          <a href="/#intake-form" class="btn btn-teal">Book a Session</a>
          <a href="/therapists" class="btn btn-outline">← All Therapists</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap bio-wrap">
      <h2>About {t.name.split(' ')[0]}</h2>
      <p class="bio-text">{t.bio}</p>
      <div class="spec-box">
        <h3>Works With</h3>
        <p>{t.spec}</p>
      </div>
      <div class="avail-box">
        <h3>Availability</h3>
        <p>{t.avail}</p>
      </div>
      <div style="margin-top:2.5rem;">
        <a href="/#intake-form" class="btn btn-teal">Request an Appointment</a>
      </div>
    </div>
  </section>

</Layout>
<style>
.thx-hero{background:var(--teal-pale);border-bottom:1px solid var(--border);padding-block:clamp(3rem,6vw,5rem)}
.thx-hero__inner{display:grid;grid-template-columns:320px 1fr;gap:4rem;align-items:start}
@media(max-width:800px){.thx-hero__inner{grid-template-columns:1fr;gap:2rem}}
.thx-photo-wrap{border-radius:6px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.12)}
.thx-photo{width:100%;aspect-ratio:3/4;object-fit:cover;object-position:top;display:block}
.thx-role{font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--teal);display:block;margin-bottom:.75rem}
h1{margin-bottom:.25rem}
.thx-creds{font-size:1rem;color:var(--mid);margin-bottom:.5rem}
.thx-spec{font-size:.95rem;color:var(--dark);margin-bottom:1.25rem;line-height:1.6}
.avail-badge{display:inline-flex;align-items:center;gap:.4rem;font-size:.82rem;font-weight:600;color:var(--teal-dark);background:rgba(79,111,114,.1);border:1px solid var(--border);border-radius:50px;padding:.35rem 1rem;margin-bottom:1.75rem}
.avail-badge.waitlist{color:#9a5220;background:rgba(154,82,32,.08);border-color:rgba(154,82,32,.2)}
.thx-actions{display:flex;flex-wrap:wrap;gap:1rem}
.bio-wrap{max-width:760px}
.bio-text{font-size:1.05rem;line-height:1.85;margin-bottom:2rem;color:var(--dark)}
.spec-box,.avail-box{background:var(--teal-pale);border-left:3px solid var(--teal);padding:1.25rem 1.5rem;border-radius:0 4px 4px 0;margin-bottom:1rem}
.spec-box h3,.avail-box h3{font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--teal);margin-bottom:.35rem}
.spec-box p,.avail-box p{font-size:.92rem;color:var(--dark);margin:0}
</style>
`);

// ─── 3. BLOG INDEX ────────────────────────────────────────────────────────────
write('src/pages/blog/index.astro', `---
import Layout from '../../layouts/Layout.astro';
const IMG_BASE = '${IMG}';
const posts = ${JSON.stringify(blogPosts, null, 2)};
function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-CA', {year:'numeric',month:'long',day:'numeric'});
}
---
<Layout title="Blog" description="Mental health articles, therapy tips, and news from West End Therapy in Winnipeg.">

  <section class="page-hero">
    <div class="wrap">
      <h1>Our Blog</h1>
      <p>Mental health insights, therapy resources, and clinic news from the West End Therapy team.</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="blog-grid">
        {posts.map(post => (
          <a href={'/blog/' + post.slug} class="blog-card">
            <div class="blog-img-wrap">
              <img src={IMG_BASE + '/' + post.img} alt={post.title} loading="lazy"/>
              <span class="blog-cat">{post.category}</span>
            </div>
            <div class="blog-body">
              <time class="blog-date" datetime={post.date}>{fmtDate(post.date)}</time>
              <h3 class="blog-title">{post.title}</h3>
              <p class="blog-excerpt">{post.excerpt}</p>
              <span class="blog-more">Read More →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>

</Layout>
<style>
.page-hero{background:linear-gradient(135deg,var(--teal-light),var(--teal-pale));padding-block:clamp(3rem,7vw,5rem);border-bottom:1px solid var(--border)}
.page-hero h1{margin-block:.5rem .75rem}
.page-hero p{max-width:55ch;font-size:1.05rem}
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
@media(max-width:1000px){.blog-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.blog-grid{grid-template-columns:1fr}}
.blog-card{background:#fff;border:1px solid var(--border);border-radius:6px;overflow:hidden;text-decoration:none;color:inherit;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}
.blog-card:hover{transform:translateY(-4px);box-shadow:0 10px 32px rgba(0,0,0,.1)}
.blog-img-wrap{position:relative;overflow:hidden}
.blog-img-wrap img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;transition:transform .3s}
.blog-card:hover .blog-img-wrap img{transform:scale(1.04)}
.blog-cat{position:absolute;top:.75rem;left:.75rem;background:var(--teal);color:#fff;font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.2rem .6rem;border-radius:3px}
.blog-body{padding:1.35rem;flex:1;display:flex;flex-direction:column}
.blog-date{font-size:.72rem;font-weight:600;letter-spacing:.06em;color:var(--mid);text-transform:uppercase;margin-bottom:.5rem;display:block}
.blog-title{font-family:var(--font-h);font-size:1.2rem;line-height:1.3;color:var(--black);margin-bottom:.6rem;flex:1}
.blog-excerpt{font-size:.85rem;color:var(--mid);line-height:1.6;margin-bottom:1rem}
.blog-more{font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--teal)}
</style>
`);

// ─── 4. BLOG POST TEMPLATE ────────────────────────────────────────────────────
write('src/pages/blog/[slug].astro', `---
import Layout from '../../layouts/Layout.astro';

const IMG_BASE = '${IMG}';
const posts = ${JSON.stringify(blogPosts, null, 2)};

export function getStaticPaths() {
  const posts = ${JSON.stringify(blogPosts, null, 2)};
  return posts.map(p => ({ params: { slug: p.slug }, props: { post: p } }));
}

const { post } = Astro.props;

function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-CA', {year:'numeric',month:'long',day:'numeric'});
}
---
<Layout title={post.title} description={post.excerpt}>

  <section class="post-hero">
    <div class="post-hero-img">
      <img src={IMG_BASE + '/' + post.img} alt={post.title}/>
    </div>
    <div class="wrap post-hero-meta">
      <span class="post-cat">{post.category}</span>
      <h1>{post.title}</h1>
      <time class="post-date">{fmtDate(post.date)}</time>
    </div>
  </section>

  <section class="section">
    <div class="wrap post-wrap">
      <div class="post-content">
        <p class="post-lead">{post.excerpt}</p>
        <p>At West End Therapy, we are committed to providing evidence-based, compassionate care for individuals, couples, and families in Winnipeg and across Manitoba. Our team of Master's-level therapists brings expertise, warmth, and dedication to every session.</p>
        <p>If you would like to learn more or book a session, please fill out our 2-minute intake form and we will match you with the right therapist for your needs.</p>
        <div class="post-cta">
          <a href="/#intake-form" class="btn btn-teal">Book a Session</a>
          <a href="/blog" class="btn btn-outline">← Back to Blog</a>
        </div>
      </div>
      <aside class="post-sidebar">
        <div class="sidebar-card">
          <h3>Ready to Take the Next Step?</h3>
          <p>Connect with one of our compassionate therapists today.</p>
          <a href="/#intake-form" class="btn btn-teal" style="width:100%;justify-content:center;margin-top:1rem;">Book a Free Consult</a>
        </div>
        <div class="sidebar-card">
          <h3>Contact Us</h3>
          <p><a href="tel:+12048099114">(204) 809-9114</a></p>
          <p><a href="mailto:inquiries@westendtherapy.ca">inquiries@westendtherapy.ca</a></p>
          <p style="margin-top:.5rem;font-size:.85rem;">759 Wall St, Winnipeg, MB R3G 2T6</p>
        </div>
      </aside>
    </div>
  </section>

</Layout>
<style>
.post-hero{background:var(--teal-dark);color:#fff;overflow:hidden;position:relative}
.post-hero-img img{width:100%;max-height:420px;object-fit:cover;opacity:.35;display:block}
.post-hero-meta{position:relative;padding-block:2.5rem;margin-top:-60px}
.post-cat{font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--teal-light);display:block;margin-bottom:.6rem}
.post-hero h1{color:#fff;font-size:clamp(1.6rem,4vw,2.8rem);margin-bottom:.75rem;line-height:1.2}
.post-date{font-size:.82rem;color:rgba(255,255,255,.7);letter-spacing:.05em}
.post-wrap{display:grid;grid-template-columns:1fr 300px;gap:4rem;align-items:start}
@media(max-width:900px){.post-wrap{grid-template-columns:1fr}}
.post-content{min-width:0}
.post-lead{font-size:1.15rem;line-height:1.75;color:var(--dark);font-weight:500;margin-bottom:1.5rem}
.post-content p{margin-bottom:1.25rem;font-size:.97rem;line-height:1.8}
.post-cta{display:flex;flex-wrap:wrap;gap:1rem;margin-top:2rem}
.post-sidebar{display:flex;flex-direction:column;gap:1.5rem}
.sidebar-card{background:var(--teal-pale);border-radius:6px;padding:1.5rem;border:1px solid var(--border)}
.sidebar-card h3{font-size:1rem;font-family:var(--font-b);font-weight:700;margin-bottom:.6rem}
.sidebar-card p{font-size:.88rem;line-height:1.6}
.sidebar-card a:not(.btn){color:var(--teal)}
</style>
`);

// ─── 5. FIX SERVICES PAGE ─────────────────────────────────────────────────────
write('src/pages/services.astro', `---
import Layout from '../layouts/Layout.astro';
const IMG_BASE = '${IMG}';
const services = ${JSON.stringify(services, null, 2)};
---
<Layout title="Therapy Services" description="West End Therapy offers individual, couples, family, EMDR, child and teen therapy in Winnipeg and online across Manitoba.">

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
          <a href={'https://westendtherapy.ca/' + s.slug + '/'} class="svc-card" target="_blank" rel="noopener">
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

console.log('\\nAll done! Restart the dev server if needed: npm run dev');
