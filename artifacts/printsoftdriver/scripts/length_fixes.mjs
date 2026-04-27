#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";

const fixes = [
  ["corsair-peripheral-drivers.html",
   "Premium Peripheral Driver and Software Overview | PrintSoftDriver",
   "Premium Peripheral Driver Overview | PrintSoftDriver"],
  ["debian-driver-overview.html",
   "Debian Driver Overview — Stable Linux Drivers | PrintSoftDriver",
   "Debian Driver Overview — Linux Reference | PrintSoftDriver"],
  ["fix-bsod-driver-irql.html",
   "Fix: DRIVER_IRQL_NOT_LESS_OR_EQUAL Blue Screen | PrintSoftDriver",
   "Fix: DRIVER_IRQL_NOT_LESS_OR_EQUAL Blue Screen Code"],
  ["fix-driver-power-state-failure.html",
   "Fix: DRIVER_POWER_STATE_FAILURE Blue Screen | PrintSoftDriver",
   "Fix: DRIVER_POWER_STATE_FAILURE Blue Screen Code"],
  ["fix-system-thread-exception.html",
   "Fix: SYSTEM_THREAD_EXCEPTION_NOT_HANDLED Blue Screen | PrintSoftDriver",
   "Fix: SYSTEM_THREAD_EXCEPTION_NOT_HANDLED Code"],
  ["fix-system-thread-exception.html",
   "Fix: SYSTEM_THREAD_EXCEPTION_NOT_HANDLED blue screen | PrintSoftDriver",
   "Fix: SYSTEM_THREAD_EXCEPTION_NOT_HANDLED Code"],
  ["macos-sequoia-driver-overview.html",
   "macOS Sequoia Driver Overview for Beginners | PrintSoftDriver",
   "macOS Sequoia Driver Overview — Reference | PrintSoftDriver"],
  ["manjaro-driver-overview.html",
   "Manjaro Driver Overview — Arch Made Friendly | PrintSoftDriver",
   "Manjaro Driver Overview — Arch Reference | PrintSoftDriver"],
  ["razer-peripheral-drivers.html",
   "Gaming Peripheral Driver and Software Overview | PrintSoftDriver",
   "Gaming Peripheral Driver Overview | PrintSoftDriver"],
  ["signed-vs-unsigned-drivers.html",
   "Signed vs Unsigned Drivers — A Plain Overview | PrintSoftDriver",
   "Signed vs Unsigned Drivers — Plain Reference | PrintSoftDriver"],
];

for (const [file, oldT, newT] of fixes) {
  const path = "artifacts/printsoftdriver/" + file;
  const src = readFileSync(path, "utf8");
  const out = src.split(oldT).join(newT);
  if (src !== out) {
    writeFileSync(path, out, "utf8");
    console.log(`${file}: title len ${oldT.length} -> ${newT.length}`);
  } else {
    console.log(`${file}: NO MATCH`);
  }
}

// Fix the 1 long description (161 chars)
const f = "artifacts/printsoftdriver/update-drivers-oem-tool.html";
const src = readFileSync(f, "utf8");

const newDescAttr = "What your laptop manufacturer OEM update tool — Support Assistant and similar OEM tools — actually does, and when to trust them with drivers.";
let out = src;

out = out.replace(
  /<meta\s+name="description"[^>]*>/,
  (m) => m.replace(/content="[^"]*"/, `content="${newDescAttr}"`)
);
out = out.replace(
  /<meta\s+property="og:description"[^>]*>/,
  (m) => m.replace(/content="[^"]*"/, `content="${newDescAttr}"`)
);
out = out.replace(
  /<meta\s+name="twitter:description"[^>]*>/,
  (m) => m.replace(/content="[^"]*"/, `content="${newDescAttr}"`)
);
out = out.replace(
  /("description"\s*:\s*)"[^"]*"/,
  (_m, p1) => `${p1}"${newDescAttr.replace(/"/g, '\\"')}"`
);

if (src !== out) {
  writeFileSync(f, out, "utf8");
  console.log(`update-drivers-oem-tool.html: desc updated (len=${newDescAttr.length})`);
} else {
  console.log(`update-drivers-oem-tool.html: desc UNCHANGED`);
}
