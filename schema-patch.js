import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, 'src');

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ wrote', filePath.replace(__dirname, ''));
}

function patch(filePath, find, replace) {
  if (!fs.existsSync(filePath)) { console.warn('⚠ not found:', filePath); return; }
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes(find)) { console.warn('⚠ anchor not found in', filePath); return; }
  content = content.replace(find, replace);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ patched', filePath.replace(__dirname, ''));
}

// ─────────────────────────────────────────────
// 1. Layout.astro — global Organization schema + head slot
// ─────────────────────────────────────────────
const layoutPath = path.join(src, 'layouts/Layout.astro');

patch(
  layoutPath,
  `  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n</head>`,
  `  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <script type="application/ld+json">{JSON.stringify({
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "West End Therapy",
    "image": "https://westendtherapy.ca/ws/media-library/5806fd793bd8491daa08742a7fe79f35/wet-logo-final-standard-size-circle.png",
    "telephone": "(204) 809-9114",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "759 Wall St,",
      "addressLocality": "Winnipeg",
      "addressRegion": "MB",
      "postalCode": "R3G 2T6"
    }
  })}</script>
  <slot name="head" />
</head>`
);

// ─────────────────────────────────────────────
// 2. services/[slug].astro — Service + BreadcrumbList schema
// ─────────────────────────────────────────────

const serviceDescriptions = {
  'individual-therapy': 'One-on-one therapy for adults 16+ addressing anxiety, trauma, grief, relationship strain, life transitions, identity, addiction, and mental health.',
  'couples-therapy': 'Couples therapy in Winnipeg helping partners improve communication, heal from betrayal, rebuild trust, and strengthen connection using EFT and evidence-based approaches.',
  'family-therapy': 'Family therapy in Winnipeg addressing communication breakdowns, parenting stress, life transitions, and relational conflict using systemic and attachment-based approaches.',
  'child-therapy': 'Child therapy in Winnipeg for children ages 4–12 experiencing anxiety, trauma, behaviour challenges, grief, and family transitions using play and expressive approaches.',
  'emdr-therapy': 'EMDR therapy in Winnipeg for trauma, PTSD, anxiety, and phobias. EMDR uses bilateral stimulation to help the brain process and heal from distressing memories.',
  'anxiety-therapy': 'Therapy for anxiety in Winnipeg including generalized anxiety, social anxiety, panic disorder, health anxiety, and OCD using CBT, ACT, DBT, and mindfulness approaches.',
  'depression-therapy': 'Therapy for depression in Winnipeg addressing low mood, loss of motivation, persistent sadness, and hopelessness using CBT, ACT, IFS, and interpersonal therapy.',
  'sex-therapy': 'Sex therapy in Winnipeg for individuals and couples addressing sexual dysfunction, desire discrepancy, intimacy concerns, and sexual trauma in a non-judgmental space.',
  'play-therapy': 'Play therapy in Winnipeg for children ages 3–12. Play therapy allows children to express and process emotions through the natural language of play.',
  'anger-management': 'Anger management therapy in Winnipeg for individuals struggling with anger, irritability, or emotional dysregulation using CBT, DBT, and mindfulness approaches.',
  'grief-therapy': 'Grief therapy in Winnipeg for individuals navigating loss, bereavement, complicated grief, and major life transitions using compassion-focused and narrative approaches.',
  'online-therapy': 'Online therapy in Winnipeg and across Manitoba offering secure video sessions for individuals and couples with the same quality of care as in-person therapy.',
};

const servicePrices = {
  'individual-therapy': '125-180',
  'couples-therapy': '150-200',
  'family-therapy': '150-200',
  'child-therapy': '125-180',
  'emdr-therapy': '125-180',
  'anxiety-therapy': '125-180',
  'depression-therapy': '125-180',
  'sex-therapy': '150-200',
  'play-therapy': '125-180',
  'anger-management': '125-180',
  'grief-therapy': '125-180',
  'online-therapy': '125-180',
};

const serviceNames = {
  'individual-therapy': 'Individual Therapy',
  'couples-therapy': 'Couples Therapy',
  'family-therapy': 'Family Therapy',
  'child-therapy': 'Child Therapy',
  'emdr-therapy': 'EMDR Therapy',
  'anxiety-therapy': 'Anxiety Therapy',
  'depression-therapy': 'Depression Therapy',
  'sex-therapy': 'Sex Therapy',
  'play-therapy': 'Play Therapy',
  'anger-management': 'Anger Management',
  'grief-therapy': 'Grief Therapy',
  'online-therapy': 'Online Therapy',
};

const serviceSchemaBlock = `
const serviceSchema = [
  {
    "@context": "https://schema.org",
    "@type": ["Service", "MedicalTherapy"],
    "@id": \`https://westendtherapy.ca/services/\${slug}/#service\`,
    "name": service.name,
    "url": \`https://westendtherapy.ca/services/\${slug}/\`,
    "description": service.intro,
    "provider": { "@id": "https://westendtherapy.ca/#practice" },
    "areaServed": [
      { "@type": "City", "name": "Winnipeg" },
      { "@type": "AdministrativeArea", "name": "Manitoba" }
    ],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "CAD",
      "availability": "https://schema.org/InStock"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://westendtherapy.ca/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://westendtherapy.ca/services/" },
      { "@type": "ListItem", "position": 3, "name": service.name, "item": \`https://westendtherapy.ca/services/\${slug}/\` }
    ]
  }
];`;

const servicesSlugPath = path.join(src, 'pages/services/[slug].astro');
if (fs.existsSync(servicesSlugPath)) {
  let content = fs.readFileSync(servicesSlugPath, 'utf8');
  if (!content.includes('serviceSchema')) {
    // Insert schema const after "const { slug } = Astro.params;"
    content = content.replace(
      `const { slug } = Astro.params;`,
      `const { slug } = Astro.params;\n${serviceSchemaBlock}`
    );
    // Insert schema slot usage after the opening <Layout tag line
    content = content.replace(
      /(<Layout[^>]*>)/,
      `$1\n  <script slot="head" type="application/ld+json" set:html={JSON.stringify(serviceSchema)}></script>`
    );
    fs.writeFileSync(servicesSlugPath, content, 'utf8');
    console.log('✓ patched src/pages/services/[slug].astro');
  } else {
    console.log('⏭ services/[slug].astro already has schema');
  }
} else {
  console.warn('⚠ services/[slug].astro not found');
}

// ─────────────────────────────────────────────
// 3. therapists.astro — CollectionPage + ItemList schema
// ─────────────────────────────────────────────

const therapistListSchema = `
const therapistListSchema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "url": "https://westendtherapy.ca/therapists/",
    "name": "Our Therapists - West End Therapy Winnipeg",
    "description": "Meet our team of over 20 Master's-level therapists at West End Therapy in Winnipeg. Each therapist is registered with a professional body in Manitoba.",
    "mainEntity": {
      "@type": "ItemList",
      "name": "West End Therapy Team",
      "numberOfItems": 24,
      "itemListElement": [
        {"@type":"ListItem","position":1,"url":"https://westendtherapy.ca/therapists/christine-holowick/","name":"Christine Holowick, MMFT, BSW/RSW"},
        {"@type":"ListItem","position":2,"url":"https://westendtherapy.ca/therapists/caroline-beattie/","name":"Caroline Beattie, MMFT"},
        {"@type":"ListItem","position":3,"url":"https://westendtherapy.ca/therapists/simon-thome/","name":"Simon Thome, MMFT"},
        {"@type":"ListItem","position":4,"url":"https://westendtherapy.ca/therapists/tanya-penner/","name":"Tanya Penner, MMFT"},
        {"@type":"ListItem","position":5,"url":"https://westendtherapy.ca/therapists/natalia-goles/","name":"Natalia Goles, MSW/RSW"},
        {"@type":"ListItem","position":6,"url":"https://westendtherapy.ca/therapists/kendra-neufeld/","name":"Kendra Neufeld, MA, CCC"},
        {"@type":"ListItem","position":7,"url":"https://westendtherapy.ca/therapists/jayda-bossert/","name":"Jayda Bossert, MSW/RSW"},
        {"@type":"ListItem","position":8,"url":"https://westendtherapy.ca/therapists/jessica-friesen/","name":"Jessica Friesen, MSW/RSW"},
        {"@type":"ListItem","position":9,"url":"https://westendtherapy.ca/therapists/ashley-de-young/","name":"Ashley de Young, MA, CCC"},
        {"@type":"ListItem","position":10,"url":"https://westendtherapy.ca/therapists/ellie-jans/","name":"Ellie Jans, MMFT"},
        {"@type":"ListItem","position":11,"url":"https://westendtherapy.ca/therapists/anastasia-sontag/","name":"Anastasia Sontag, MSW/RSW"},
        {"@type":"ListItem","position":12,"url":"https://westendtherapy.ca/therapists/sarah-ann-thiessen/","name":"Sarah Ann Thiessen, MMFT"},
        {"@type":"ListItem","position":13,"url":"https://westendtherapy.ca/therapists/graciela-bustamante/","name":"Graciela Bustamante, MA, CCC"},
        {"@type":"ListItem","position":14,"url":"https://westendtherapy.ca/therapists/kailene-penner/","name":"Kailene Penner, MMFT (Candidate)"},
        {"@type":"ListItem","position":15,"url":"https://westendtherapy.ca/therapists/andrew-thiessen/","name":"Andrew Thiessen, MMFT (Candidate)"},
        {"@type":"ListItem","position":16,"url":"https://westendtherapy.ca/therapists/kristin-hildebrand/","name":"Kristin Hildebrand, MSW/RSW"},
        {"@type":"ListItem","position":17,"url":"https://westendtherapy.ca/therapists/mike-huebner/","name":"Mike Huebner, MMFT"},
        {"@type":"ListItem","position":18,"url":"https://westendtherapy.ca/therapists/cathy-neufeld/","name":"Cathy Neufeld, MA, CCC"},
        {"@type":"ListItem","position":19,"url":"https://westendtherapy.ca/therapists/stephanie-froese/","name":"Stephanie Froese, MMFT"},
        {"@type":"ListItem","position":20,"url":"https://westendtherapy.ca/therapists/jillian-dyck/","name":"Jillian Dyck, MMFT"},
        {"@type":"ListItem","position":21,"url":"https://westendtherapy.ca/therapists/adriana-cienfuegos/","name":"Adriana Cienfuegos, MA, CCC"},
        {"@type":"ListItem","position":22,"url":"https://westendtherapy.ca/therapists/meredith-klassen/","name":"Meredith Klassen, MSW/RSW"},
        {"@type":"ListItem","position":23,"url":"https://westendtherapy.ca/therapists/jody-schroeder/","name":"Jody Schroeder, MA, CCC"},
        {"@type":"ListItem","position":24,"url":"https://westendtherapy.ca/therapists/leah-thiessen/","name":"Leah Thiessen, MMFT (Candidate)"}
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://westendtherapy.ca/" },
      { "@type": "ListItem", "position": 2, "name": "Therapists", "item": "https://westendtherapy.ca/therapists/" }
    ]
  }
];`;

const therapistsPath = path.join(src, 'pages/therapists.astro');
if (fs.existsSync(therapistsPath)) {
  let content = fs.readFileSync(therapistsPath, 'utf8');
  if (!content.includes('therapistListSchema')) {
    // Insert before closing ---
    content = content.replace(/^---\s*$/m, `${therapistListSchema}\n---`);
    // Insert slot after opening Layout tag
    content = content.replace(
      /(<Layout[^>]*>)/,
      `$1\n  <script slot="head" type="application/ld+json" set:html={JSON.stringify(therapistListSchema)}></script>`
    );
    fs.writeFileSync(therapistsPath, content, 'utf8');
    console.log('✓ patched src/pages/therapists.astro');
  } else {
    console.log('⏭ therapists.astro already has schema');
  }
} else {
  console.warn('⚠ therapists.astro not found');
}

// ─────────────────────────────────────────────
// 4. therapists/[slug].astro — Person + BreadcrumbList schema
// ─────────────────────────────────────────────

const therapistPersonSchemaBlock = `
const personSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": \`https://westendtherapy.ca/therapists/\${therapist.slug}/#person\`,
    "name": therapist.name,
    "url": \`https://westendtherapy.ca/therapists/\${therapist.slug}/\`,
    "jobTitle": therapist.title,
    "image": therapist.image ? \`https://westendtherapy.ca/ws/media-library/\${therapist.image}\` : undefined,
    "knowsAbout": therapist.specialties || [],
    "worksFor": { "@id": "https://westendtherapy.ca/#practice" }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://westendtherapy.ca/" },
      { "@type": "ListItem", "position": 2, "name": "Therapists", "item": "https://westendtherapy.ca/therapists/" },
      { "@type": "ListItem", "position": 3, "name": therapist.name, "item": \`https://westendtherapy.ca/therapists/\${therapist.slug}/\` }
    ]
  }
];`;

const therapistSlugPath = path.join(src, 'pages/therapists/[slug].astro');
if (fs.existsSync(therapistSlugPath)) {
  let content = fs.readFileSync(therapistSlugPath, 'utf8');
  if (!content.includes('personSchema')) {
    content = content.replace(
      `const { therapist } = Astro.props;`,
      `const { therapist } = Astro.props;\n${therapistPersonSchemaBlock}`
    );
    content = content.replace(
      /(<Layout[^>]*>)/,
      `$1\n  <script slot="head" type="application/ld+json" set:html={JSON.stringify(personSchema)}></script>`
    );
    fs.writeFileSync(therapistSlugPath, content, 'utf8');
    console.log('✓ patched src/pages/therapists/[slug].astro');
  } else {
    console.log('⏭ therapists/[slug].astro already has schema');
  }
} else {
  console.warn('⚠ therapists/[slug].astro not found');
}

// ─────────────────────────────────────────────
// 5. blog/[slug].astro — Article + BreadcrumbList schema
// ─────────────────────────────────────────────

const blogArticleSchemaBlock = `
const articleSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": \`https://westendtherapy.ca/blog/\${post.slug}/#article\`,
    "headline": post.title,
    "url": \`https://westendtherapy.ca/blog/\${post.slug}/\`,
    "datePublished": post.date,
    "author": post.author
      ? { "@type": "Person", "name": post.author, "worksFor": { "@id": "https://westendtherapy.ca/#practice" } }
      : { "@id": "https://westendtherapy.ca/#practice" },
    "publisher": { "@id": "https://westendtherapy.ca/#practice" },
    "image": post.image ? \`https://westendtherapy.ca/ws/media-library/\${post.image}\` : undefined,
    "description": post.excerpt
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://westendtherapy.ca/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://westendtherapy.ca/blog/" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": \`https://westendtherapy.ca/blog/\${post.slug}/\` }
    ]
  }
];`;

const blogSlugPath = path.join(src, 'pages/blog/[slug].astro');
if (fs.existsSync(blogSlugPath)) {
  let content = fs.readFileSync(blogSlugPath, 'utf8');
  if (!content.includes('articleSchema')) {
    // Insert after "const post = posts.find(...)"
    content = content.replace(
      /const post = posts\.find[^\n]+\n/,
      (match) => match + `${blogArticleSchemaBlock}\n`
    );
    content = content.replace(
      /(<Layout[^>]*>)/,
      `$1\n  <script slot="head" type="application/ld+json" set:html={JSON.stringify(articleSchema)}></script>`
    );
    fs.writeFileSync(blogSlugPath, content, 'utf8');
    console.log('✓ patched src/pages/blog/[slug].astro');
  } else {
    console.log('⏭ blog/[slug].astro already has schema');
  }
} else {
  console.warn('⚠ blog/[slug].astro not found');
}

// ─────────────────────────────────────────────
// 6. Also patch Layout.astro for JSON.stringify issue
//    Astro doesn't evaluate {JSON.stringify(...)} in <script> tags the normal way
//    We need to use set:html instead. Fix the Organization schema block.
// ─────────────────────────────────────────────

if (fs.existsSync(layoutPath)) {
  let content = fs.readFileSync(layoutPath, 'utf8');
  // Fix the inline JSON we added — replace the raw {JSON.stringify(...)} with a proper Astro approach
  // Since Layout doesn't have dynamic data, we just inline the literal JSON
  content = content.replace(
    `<script type="application/ld+json">{JSON.stringify({
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "West End Therapy",
    "image": "https://westendtherapy.ca/ws/media-library/5806fd793bd8491daa08742a7fe79f35/wet-logo-final-standard-size-circle.png",
    "telephone": "(204) 809-9114",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "759 Wall St,",
      "addressLocality": "Winnipeg",
      "addressRegion": "MB",
      "postalCode": "R3G 2T6"
    }
  })}</script>`,
    `<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "West End Therapy",
    "image": "https://westendtherapy.ca/ws/media-library/5806fd793bd8491daa08742a7fe79f35/wet-logo-final-standard-size-circle.png",
    "telephone": "(204) 809-9114",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "759 Wall St,",
      "addressLocality": "Winnipeg",
      "addressRegion": "MB",
      "postalCode": "R3G 2T6"
    }
  }
  </script>`
  );
  fs.writeFileSync(layoutPath, content, 'utf8');
  console.log('✓ fixed Organization schema literal in Layout.astro');
}

console.log('\n✅ Schema patch complete.');
console.log('Restart dev server to see changes: npm run dev');
