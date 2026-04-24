// One-off cleanup:
//   1. Remove all references to brand-named driver pages
//   2. Delete the brand-named HTML files
//   3. Add "Sitemap" link to the nav bar (header + mobile) on every page
//   4. Replace the girl-on-bed image (person-laptop.jpg) on driver-user-mode.html
//   5. Fix sitemap.html cookie-consent buttons so Accept/Reject work
import fs from 'node:fs';
import path from 'node:path';
const ROOT = process.cwd();

const BRAND_SLUGS = [
  'amd-graphics-drivers',
  'asix-ethernet-drivers',
  'asmedia-controller-drivers',
  'atheros-wifi-drivers',
  'broadcom-wifi-drivers',
  'brother-printer-drivers',
  'canon-printer-drivers',
  'conexant-audio-drivers',
  'corsair-peripheral-drivers',
  'dell-printer-drivers',
  'epson-printer-drivers',
  'hp-printer-drivers',
  'intel-graphics-drivers',
  'intel-wifi-drivers',
  'jmicron-controller-drivers',
  'killer-network-drivers',
  'kyocera-printer-drivers',
  'lexmark-printer-drivers',
  'logitech-peripheral-drivers',
  'mediatek-wireless-drivers',
  'nuvoton-sensor-drivers',
  'nvidia-graphics-drivers',
  'qualcomm-wireless-drivers',
  'razer-peripheral-drivers',
  'realtek-audio-drivers',
  'realtek-network-drivers',
  'ricoh-printer-drivers',
  'samsung-printer-drivers',
  'silicon-image-controller-drivers',
  'steelseries-peripheral-drivers',
  'via-hd-audio-drivers',
  'xerox-printer-drivers',
];

const BRAND_FILES = BRAND_SLUGS.map((s) => `${s}.html`);
const BRAND_FILE_SET = new Set(BRAND_FILES);

const allFiles = fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith('.html'))
  .filter((f) => !BRAND_FILE_SET.has(f));

let totalChanges = 0;

for (const file of allFiles) {
  const filePath = path.join(ROOT, file);
  let html = fs.readFileSync(filePath, 'utf8');
  const before = html;

  // 1a. Remove single-line related-card anchors pointing to a brand page
  for (const slug of BRAND_SLUGS) {
    const cardRe = new RegExp(
      `\\s*<a class="related-card" href="${slug}\\.html">[\\s\\S]*?<\\/a>`,
      'g',
    );
    html = html.replace(cardRe, '');
  }

  // 1b. Remove sitemap-style <li>...</li> entries pointing to a brand page
  for (const slug of BRAND_SLUGS) {
    const liRe = new RegExp(
      `\\s*<li>[\\s\\S]*?href="${slug}\\.html"[\\s\\S]*?<\\/li>`,
      'g',
    );
    html = html.replace(liRe, '');
  }

  // 1c. Catch any leftover plain anchors to brand pages — replace with the
  //     anchor text alone so prose stays grammatical.
  for (const slug of BRAND_SLUGS) {
    const anchorRe = new RegExp(
      `<a [^>]*href="${slug}\\.html"[^>]*>([\\s\\S]*?)<\\/a>`,
      'g',
    );
    html = html.replace(anchorRe, '$1');
  }

  // 2. Add "Sitemap" link in nav-links and mobile-nav (between
  //    Troubleshooting and Contact) — only when not already present.
  const navAnchor = '<a href="troubleshooting.html">Troubleshooting</a>\n        <a href="contact.html">Contact</a>';
  const navAnchorReplace = '<a href="troubleshooting.html">Troubleshooting</a>\n        <a href="sitemap.html">Sitemap</a>\n        <a href="contact.html">Contact</a>';
  if (html.includes(navAnchor) && !html.includes('<a href="sitemap.html">Sitemap</a>\n        <a href="contact.html">')) {
    html = html.replace(navAnchor, navAnchorReplace);
  }
  const mobileAnchor = '<a href="troubleshooting.html">Troubleshooting</a>\n      <a href="contact.html">Contact</a>';
  const mobileAnchorReplace = '<a href="troubleshooting.html">Troubleshooting</a>\n      <a href="sitemap.html">Sitemap</a>\n      <a href="contact.html">Contact</a>';
  if (html.includes(mobileAnchor) && !html.includes('<a href="sitemap.html">Sitemap</a>\n      <a href="contact.html">')) {
    html = html.replace(mobileAnchor, mobileAnchorReplace);
  }

  if (html !== before) {
    fs.writeFileSync(filePath, html);
    totalChanges++;
  }
}

console.log(`Cleaned ${totalChanges} HTML files.`);

// 3. Delete the brand HTML files
let deleted = 0;
for (const file of BRAND_FILES) {
  const fp = path.join(ROOT, file);
  if (fs.existsSync(fp)) {
    fs.unlinkSync(fp);
    deleted++;
  }
}
console.log(`Deleted ${deleted} brand HTML files.`);

// 4. Replace girl image on driver-user-mode.html with a generic laptop photo,
//    then delete the source file so it can never reappear.
const userModeFile = path.join(ROOT, 'driver-user-mode.html');
if (fs.existsSync(userModeFile)) {
  let um = fs.readFileSync(userModeFile, 'utf8');
  um = um.replace(
    /<img src="images\/person-laptop\.jpg" alt="[^"]*"([^>]*)>/g,
    '<img src="images/laptop.jpg" alt="A laptop on a desk"$1>',
  );
  fs.writeFileSync(userModeFile, um);
  console.log('Replaced person-laptop.jpg reference in driver-user-mode.html');
}
const personImg = path.join(ROOT, 'public/images/person-laptop.jpg');
if (fs.existsSync(personImg)) {
  fs.unlinkSync(personImg);
  console.log('Deleted public/images/person-laptop.jpg');
}

// 5. Fix sitemap.html cookie-consent buttons
const sitemapFile = path.join(ROOT, 'sitemap.html');
if (fs.existsSync(sitemapFile)) {
  let sm = fs.readFileSync(sitemapFile, 'utf8');
  sm = sm.replace(
    '<button id="cookie-accept" class="btn btn-primary">Accept All</button>',
    '<button class="cookie-btn cookie-btn-accept" onclick="acceptCookies()">Accept All</button>',
  );
  sm = sm.replace(
    '<button id="cookie-decline" class="btn btn-ghost">Reject All</button>',
    '<button class="cookie-btn cookie-btn-reject" onclick="rejectCookies()">Reject All</button>',
  );
  // Also rename the wrapper class so the CSS for cookie-btns applies
  sm = sm.replace('<div class="cookie-actions">', '<div class="cookie-btns">');
  fs.writeFileSync(sitemapFile, sm);
  console.log('Fixed sitemap.html cookie banner buttons.');
}

// 6. Clean up empty headings / empty <ul>s left behind in sitemap.html and
//    any other files (e.g. an entire "Brand-Specific Driver Guides (19)"
//    column that is now empty).
for (const file of allFiles) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, 'utf8');
  const before = html;

  // Remove empty <ul> ... </ul> (only whitespace inside)
  html = html.replace(/<ul[^>]*>\s*<\/ul>/g, '');
  // Remove "Brand-Specific Driver Guides" heading / sitemap column that is
  // now empty (the heading text contains "Brand-Specific" or "Brand Specific")
  html = html.replace(
    /<h[1-6][^>]*>\s*Brand[\s\-]?Specific[^<]*<\/h[1-6]>/gi,
    '',
  );
  // Drop sitemap column wrappers that contain only whitespace
  html = html.replace(
    /<div class="sitemap-column"[^>]*>\s*<\/div>/g,
    '',
  );
  // Collapse three or more blank lines to one
  html = html.replace(/\n{3,}/g, '\n\n');

  if (html !== before) {
    fs.writeFileSync(fp, html);
  }
}
console.log('Tidied empty markup left behind.');

console.log('\nDone.');
