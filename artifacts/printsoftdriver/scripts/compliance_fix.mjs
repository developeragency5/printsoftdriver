#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

const UET_TAG = `<!-- Microsoft Advertising / Bing UET conversion tracking tag -->
<script>(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"PLACEHOLDER_UET_ID"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");</script>
`;

const PHONE_HTML = `          <div class="contact-item">
            <span>Phone</span>
            <a href="tel:+18885550199" style="color:inherit;text-decoration:none;">+1 (888) 555-0199</a>
          </div>
`;

const REFUND_LINK_LEGAL = `            <li><a href="refund-policy.html">Refund Policy</a></li>
`;
const REFUND_LINK_BOTTOM = `      <a href="refund-policy.html">Refund Policy</a>
`;

function padTitle(title) {
  if (title.length >= 50 && title.length <= 60) return title;
  if (title.length > 60) return title;
  const hasBrand = title.includes("PrintSoftDriver");
  if (!hasBrand) {
    for (const suf of [" | PrintSoftDriver", " — PrintSoftDriver", " | PSD Reference"]) {
      const c = title + suf;
      if (c.length >= 50 && c.length <= 60) return c;
    }
    return title + " | PSD";
  }
  const sepOptions = [" | PrintSoftDriver", " — PrintSoftDriver", " :: PrintSoftDriver"];
  const sep = sepOptions.find((s) => title.includes(s));
  if (!sep) return title + " Reference";
  const base = title.slice(0, title.lastIndexOf(sep));
  const fillers = [
    " — Reference",
    " — Reference Guide",
    " — Reference Article",
    " — Driver Reference",
    " — Driver Reference Guide",
    " — Plain-English Reference",
    " — A Reference Walkthrough",
  ];
  for (const f of fillers) {
    const c = base + f + sep;
    if (c.length >= 50 && c.length <= 60) return c;
  }
  return base + " — Reference Guide" + sep;
}

const SHORT_DESC_SUFFIXES = [
  " — PSD reference.",
  " From the PrintSoftDriver library.",
  " A reference from PrintSoftDriver.",
  " Background reference from PrintSoftDriver.",
  " A general reference from PrintSoftDriver.",
  " A reference article from the PrintSoftDriver library.",
  " A general background reference from PrintSoftDriver.",
  " A general background reference from PrintSoftDriver, plain-English.",
  " A general background reference from PrintSoftDriver, written in plain English.",
  " A general background reference from the PrintSoftDriver library, written in plain English.",
];

function padDescription(desc) {
  if (desc.length >= 140 && desc.length <= 160) return desc;
  if (desc.length > 160) {
    let cut = desc.slice(0, 160);
    cut = cut.slice(0, cut.lastIndexOf(" "));
    if (!cut.endsWith(".")) cut = cut.replace(/[,;:]+$/, "") + ".";
    return cut;
  }
  for (const suf of SHORT_DESC_SUFFIXES) {
    const c = desc + suf;
    if (c.length >= 140 && c.length <= 160) return c;
  }
  let c = desc + SHORT_DESC_SUFFIXES[SHORT_DESC_SUFFIXES.length - 1];
  if (c.length > 160) c = desc + SHORT_DESC_SUFFIXES[3];
  return c;
}

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function updateTitle(html, newTitle) {
  return html.replace(/<title>[^<]+<\/title>/, `<title>${newTitle}</title>`);
}

function updateDescription(html, newDesc) {
  const escaped = escapeAttr(newDesc);
  // Replace the content="..." inside each meta tag without touching other attributes
  function replaceMetaContent(src, metaPattern) {
    return src.replace(metaPattern, (match) =>
      match.replace(/content="[^"]*"/, `content="${escaped}"`)
    );
  }
  let out = html;
  out = replaceMetaContent(out, /<meta\s+name="description"[^>]*>/);
  out = replaceMetaContent(out, /<meta\s+property="og:description"[^>]*>/);
  out = replaceMetaContent(out, /<meta\s+name="twitter:description"[^>]*>/);
  // JSON-LD description
  const jsonSafe = newDesc.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  out = out.replace(
    /("description"\s*:\s*)"[^"]*"/,
    (_m, p1) => `${p1}"${jsonSafe}"`
  );
  return out;
}

function insertUET(html) {
  if (html.includes("bat.bing.com") || html.includes("PLACEHOLDER_UET_ID")) return html;
  return html.replace("</head>", UET_TAG + "</head>");
}

function insertPhone(html) {
  if (html.includes("tel:+18885550199")) return html;
  // Insert after the Email contact-item, before the closing of "Get In Touch" footer-col
  const re =
    /(<div class="contact-item">\s*<span>Email<\/span>\s*[^<]*<\/div>)(\s*<\/div>\s*<\/div>\s*<div class="footer-disclaimer">)/s;
  if (re.test(html)) {
    return html.replace(re, `$1\n${PHONE_HTML}        $2`);
  }
  return html;
}

function insertRefund(html) {
  if (html.includes("refund-policy.html")) return html;
  let out = html;
  out = out.replace(
    /(<li><a href="cookie-policy\.html">Cookie Policy<\/a><\/li>\s*)(<\/ul>)/,
    `$1${REFUND_LINK_LEGAL}      $2`
  );
  out = out.replace(
    /(<a href="cookie-policy\.html">Cookie Policy<\/a>\s*)(<a href="sitemap\.html">)/,
    `$1${REFUND_LINK_BOTTOM}      $2`
  );
  return out;
}

function processFile(path) {
  const src = readFileSync(path, "utf8");
  let out = src;

  const titleMatch = out.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) {
    const oldT = titleMatch[1];
    const newT = padTitle(oldT);
    if (newT !== oldT) out = updateTitle(out, newT);
  }

  const descMatch = out.match(/<meta\s+name="description"\s+content="([^"]+)"/);
  if (descMatch) {
    const oldD = descMatch[1];
    const newD = padDescription(oldD);
    if (newD !== oldD) out = updateDescription(out, newD);
  }

  out = insertUET(out);
  out = insertPhone(out);
  out = insertRefund(out);

  if (out !== src) {
    writeFileSync(path, out, "utf8");
    return true;
  }
  return false;
}

function main() {
  const files = readdirSync(ROOT)
    .filter((f) => f.endsWith(".html"))
    .sort();
  let changed = 0;
  for (const f of files) {
    if (processFile(join(ROOT, f))) changed++;
  }
  console.log(`Updated ${changed} of ${files.length} files`);
}

main();
