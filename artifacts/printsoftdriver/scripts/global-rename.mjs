// One-pass migration:
//  - Delete 14 printer-themed pages and write 14 new topical pages at new URLs
//  - Rename troubleshooting.html -> knowledge.html
//  - Rename *-guide.html -> *-overview.html (24 files)
//  - Rewrite all internal links across every remaining HTML file
//  - Replace visible text:
//      Troubleshooting -> Knowledge / troubleshooting -> knowledge
//      Guide -> Overview / guide -> overview
//      Printer -> remove or rephrase as appropriate
//  - Write vercel.json with 301 redirects from old URLs to new URLs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://www.printsoftdriver.com';

// ---------------------------------------------------------------------
// 1. Mapping of old URL slugs -> new URL slugs
// ---------------------------------------------------------------------

const PRINTER_RENAMES = {
  'printer-drivers': 'output-device-drivers',
  'brother-printer-drivers': 'brother-sewing-drivers',
  'canon-printer-drivers': 'canon-camera-drivers',
  'dell-printer-drivers': 'dell-monitor-drivers',
  'epson-printer-drivers': 'epson-projector-drivers',
  'hp-printer-drivers': 'hp-laptop-drivers',
  'kyocera-printer-drivers': 'kyocera-mobile-drivers',
  'lexmark-printer-drivers': 'lexmark-document-drivers',
  'ricoh-printer-drivers': 'ricoh-camera-drivers',
  'samsung-printer-drivers': 'samsung-monitor-drivers',
  'xerox-printer-drivers': 'xerox-document-drivers',
  'fix-printer-blank': 'fix-display-blank',
  'fix-printer-offline': 'fix-network-device-offline',
};

const GUIDE_FILES = [
  'arch-linux-driver-guide','card-reader-driver-guide','chromeos-driver-guide',
  'debian-driver-guide','driver-backup-guide','fedora-driver-guide',
  'fingerprint-reader-driver-guide','linux-mint-driver-guide',
  'macos-monterey-driver-guide','macos-sequoia-driver-guide',
  'macos-sonoma-driver-guide','macos-ventura-driver-guide','manjaro-driver-guide',
  'npu-driver-guide','opensuse-driver-guide','pop-os-driver-guide',
  'sensor-hub-driver-guide','touchpad-driver-guide','tpm-driver-guide',
  'ubuntu-driver-guide','webcam-driver-guide','windows-10-driver-guide',
  'windows-11-driver-guide','windows-server-driver-guide',
];

const GUIDE_RENAMES = Object.fromEntries(
  GUIDE_FILES.map(s => [s, s.replace(/-guide$/, '-overview')])
);

const TROUBLESHOOTING_RENAMES = { 'troubleshooting': 'knowledge' };

// All renames combined, plus internal links use file.html
const ALL_RENAMES = { ...PRINTER_RENAMES, ...GUIDE_RENAMES, ...TROUBLESHOOTING_RENAMES };

// ---------------------------------------------------------------------
// 2. Topic content for the 14 new pages (replaces printer pages)
// ---------------------------------------------------------------------

const NEW_TOPICS = [
  {
    slug: 'output-device-drivers',
    eyebrow: 'Output Device Drivers',
    title: 'Output Device Drivers — Sound, Display, Connected Hardware',
    desc: 'A friendly overview of the drivers behind the devices that present information to you — speakers, monitors, projectors, and more.',
    h1: 'Output Device Drivers — The Layer Behind What You See and Hear',
    sub: 'Whenever your computer renders a sound, draws a frame, or sends a signal to an external screen, an output driver is doing the translating.',
    sections: [
      { h: 'What an Output Device Driver Does', img: 'chipset.jpg', alt: 'Computer hardware components',
        p1: 'An output device driver receives data prepared by an application or by the operating system and turns it into the precise stream of bytes that a particular piece of hardware expects. The application speaks general terms; the driver speaks the specific dialect of the device on the other side of the cable.',
        p2: 'Without that translator the application cannot describe what it wants in a way the device can act on. With it, the same word processor can show its document on a built-in display, an external monitor, or a projector without rewriting any code.' },
      { h: 'The Common Output Families', img: 'graphics.jpg', alt: 'Modern display setup',
        p1: 'Display drivers handle internal and external monitors, projectors, and TVs. Audio drivers cover speakers, headsets, and digital outputs. Haptic drivers manage vibration motors. There are also smaller families for things like signal lights and notification LEDs.',
        p2: 'Each family has its own conventions, but they all share the same job: convert software intent into the analogue or digital pattern the device responds to. Reading about one family makes the others much easier to understand.' },
      { h: 'When Output Drivers Need Attention', img: 'support-pro.png', alt: 'Reviewing settings on screen',
        p1: 'Output drivers usually fail in obvious ways: a screen stays black, sound stops, or only one of two displays lights up. The repair path is almost always to reinstall the driver or to update it through the official channel for your operating system.',
        p2: 'A small number of failures need a firmware refresh on the device itself rather than a driver change. The two are different, and our explainer on firmware versus driver is a good companion read if you suspect that is the case.' },
    ],
    related: [
      ['graphics-drivers', 'Graphics Drivers', 'Display output in detail.'],
      ['audio-drivers', 'Audio Drivers', 'Sound output in detail.'],
      ['firmware-vs-driver', 'Firmware vs Driver', 'Two layers, one device.'],
    ],
  },
  {
    slug: 'brother-sewing-drivers',
    eyebrow: 'Vendor Drivers',
    title: 'Brother Sewing Machine Drivers — Calm Setup',
    desc: 'A friendly overview of the desktop software and drivers that link a Brother sewing or embroidery machine to your computer for design transfer.',
    h1: 'Brother Sewing Machine Drivers — Connecting Designs to the Needle',
    sub: 'Computerised Brother sewing and embroidery machines transfer designs from a desktop application — and that link relies on a tidy little driver stack.',
    sections: [
      { h: 'What the Driver Actually Does', img: 'usb.jpg', alt: 'Usb connection between devices',
        p1: 'The driver presents the sewing machine as a familiar device on your computer — typically a removable storage volume or a serial endpoint over Usb. Design files written to that volume are then read by the machine when you select them on its on-board screen.',
        p2: 'There is no rendering work happening on the desktop side: the machine itself decodes the embroidery format. The driver simply makes the storage and signalling reliable so the file arrives intact.' },
      { h: 'The Companion Software', img: 'professional-workspace.png', alt: 'Calm work area with computer',
        p1: 'Brother ships companion design and editing tools that write the correct file format for each machine family. The desktop tool relies on the underlying driver to find the machine and confirm it is ready before sending anything.',
        p2: 'Keeping both sides current — driver and companion tool — is the single best way to avoid the "machine not found" or "design file not recognised" errors that puzzle new users.' },
      { h: 'Calm Reinstall Steps', img: 'laptop.jpg', alt: 'Laptop on a tidy desk',
        p1: 'If the machine no longer appears, disconnect it, remove the driver from Device Manager, restart the computer, then reconnect. The driver is small and reinstalls without fanfare. Reopen the companion tool last.',
        p2: 'No design files are touched by this process — they live on memory cards or in the companion tool\'s library. The driver only handles the connection, not the content.' },
    ],
    related: [
      ['usb-drivers', 'Usb Drivers', 'How Usb devices are recognised.'],
      ['driver-package-anatomy', 'Driver Package Anatomy', 'What\'s inside an installer.'],
      ['firmware-vs-driver', 'Firmware vs Driver', 'Machine-side vs computer-side updates.'],
    ],
  },
  {
    slug: 'canon-camera-drivers',
    eyebrow: 'Vendor Drivers',
    title: 'Canon Camera Drivers — Calm Connection',
    desc: 'How Canon\'s desktop driver and utility stack lets a camera tether to a computer for capture, transfer, and remote control.',
    h1: 'Canon Camera Drivers — Tethering and Transferring with Calm',
    sub: 'Canon\'s desktop driver makes the camera show up as a recognised device so utilities can pull images, push settings, and stream a live preview.',
    sections: [
      { h: 'How the Camera Becomes Visible', img: 'usb.jpg', alt: 'Camera connected to a laptop',
        p1: 'Plugging in a Canon camera over Usb does very little on its own. The desktop driver presents the camera to the operating system as a still-image device, which is the open standard most photo utilities know how to talk to.',
        p2: 'Once that handshake is done, applications such as Canon\'s own utility, plus most third-party tools, can list the photos on the card, copy them, or operate the shutter remotely.' },
      { h: 'Tethered Capture in Plain English', img: 'graphics.jpg', alt: 'Computer screen showing photo grid',
        p1: 'Tethered capture means the camera is shooting and sending each new image straight to the computer. Studios use this for client review, focus checks, and instant backup. The driver is what allows the captured frame to arrive without a memory card detour.',
        p2: 'Reliability matters a lot in a tethered session. Keep the cable short, avoid Usb hubs where possible, and make sure both the desktop driver and the camera firmware are at their current versions.' },
      { h: 'When the Camera Disappears', img: 'support-pro.png', alt: 'Working through a settings panel',
        p1: 'If the camera vanishes mid-session, the cause is almost always loose Usb, a sleeping computer, or a clash with another image-capture utility running in the background. Closing the other utility usually brings the camera back.',
        p2: 'A driver reinstall is the next step if cabling and concurrency are not the cause. The camera-side firmware rarely needs intervention, but it is worth a check after a major desktop OS upgrade.' },
    ],
    related: [
      ['usb-drivers', 'Usb Drivers', 'How Usb devices are recognised.'],
      ['driver-isolation-explained', 'Driver Isolation', 'Why apps stop conflicting.'],
      ['set-default-audio-device', 'Set Default Audio Device', 'A neighbour topic for capture setups.'],
    ],
  },
  {
    slug: 'dell-monitor-drivers',
    eyebrow: 'Vendor Drivers',
    title: 'Dell Monitor Drivers — Colour and Modes',
    desc: 'A friendly overview of the small driver pack that teaches a computer the exact capabilities of a Dell monitor — refresh rates, colour modes, and more.',
    h1: 'Dell Monitor Drivers — Letting Your Computer Know Exactly What Your Screen Can Do',
    sub: 'A monitor without its driver still works, but the operating system has to guess at refresh rates and colour modes. The driver removes the guessing.',
    sections: [
      { h: 'What a Monitor Driver Carries', img: 'graphics.jpg', alt: 'External monitor on a desk',
        p1: 'A Dell monitor driver is mostly a description file. It tells the operating system the supported resolutions, refresh rates, colour spaces, and any vendor-specific modes the panel is capable of. It is small, well under a megabyte in most cases.',
        p2: 'With this description in place, the OS exposes the right list in display settings, applications negotiate the correct colour space, and games can pick the highest refresh rate the panel actually supports.' },
      { h: 'Why It Matters for Colour Work', img: 'professional-workspace.png', alt: 'Colour-managed work setup',
        p1: 'Photo and video work depends on the operating system understanding which colour space the monitor speaks natively. Without the description file the system tends to assume a generic Srgb panel, which can wash out wide-gamut content.',
        p2: 'Installing the driver fixes that without changing any pixel-pushing code. The monitor and the OS agree on a vocabulary, and the colour-managed pipeline behaves as designed.' },
      { h: 'Quiet Install Steps', img: 'laptop.jpg', alt: 'Laptop with external display',
        p1: 'Connect the monitor first, let the OS recognise it as a generic display, then install the Dell driver pack. A reboot is usually offered but rarely required — once installed, the description is read on the next display reset.',
        p2: 'There is no service running afterwards, no tray icon, and no automatic update channel. The driver is a static description, refreshed only when you install a new version yourself.' },
    ],
    related: [
      ['graphics-drivers', 'Graphics Drivers', 'The card-side companion to a monitor driver.'],
      ['firmware-vs-driver', 'Firmware vs Driver', 'Why monitor firmware is its own thing.'],
      ['fix-display-blank', 'Fix Display Blank', 'When the screen stays dark.'],
    ],
  },
  {
    slug: 'epson-projector-drivers',
    eyebrow: 'Vendor Drivers',
    title: 'Epson Projector Drivers — Calm Setup',
    desc: 'A friendly overview of how Epson projector drivers and utilities let a computer talk to a projector over Usb, network, or wireless display.',
    h1: 'Epson Projector Drivers — Sending the Right Signal to the Lamp',
    sub: 'Modern Epson projectors connect over more than just a video cable, and a small driver stack on the desktop is what makes those alternative paths reliable.',
    sections: [
      { h: 'The Three Connection Paths', img: 'graphics.jpg', alt: 'Projector lit on a screen',
        p1: 'A wired video cable needs no driver — it is a passive signal path. But Usb display, wired Ethernet display, and wireless display all pass through driver software that turns the desktop framebuffer into a network packet stream the projector can receive.',
        p2: 'Each path has different latency and resolution characteristics. A driver-aware tool exposes them as choices in a familiar control panel so you do not have to guess which one to use.' },
      { h: 'Why a Wireless Mode Sometimes Stutters', img: 'support-pro.png', alt: 'Reviewing connection options',
        p1: 'Wireless projection rides on the local network. If the network is busy, the picture stutters. The driver does its job; the bandwidth available is the limit. Wired Ethernet display is the cure when the network is congested.',
        p2: 'A reset of the projector\'s network interface, paired with reinstalling the desktop driver, clears most "presentation mode lost" issues without touching anything in your everyday display setup.' },
      { h: 'Quiet Reinstall Routine', img: 'laptop.jpg', alt: 'Laptop next to a projector',
        p1: 'Disconnect, uninstall the projector software pack from the desktop, reboot, then reconnect. The driver is part of the pack and reinstalls along with the utility, ready for the next event.',
        p2: 'The projector\'s own firmware is updated through its on-screen menu, not the desktop driver. The two are independent — keep both current for the smoothest sessions.' },
    ],
    related: [
      ['graphics-drivers', 'Graphics Drivers', 'The display-output companion topic.'],
      ['network-drivers', 'Network Drivers', 'For Ethernet and wireless paths.'],
      ['firmware-vs-driver', 'Firmware vs Driver', 'Two layers, one projector.'],
    ],
  },
  {
    slug: 'hp-laptop-drivers',
    eyebrow: 'Vendor Drivers',
    title: 'HP Laptop Drivers — A Friendly Overview',
    desc: 'A calm overview of the driver bundle HP ships for its laptops — what each part does and why most can stay quietly in the background.',
    h1: 'HP Laptop Drivers — Friendly Notes on the Pre-Installed Bundle',
    sub: 'A new HP laptop arrives with a tidy driver bundle. Most of it is fine to leave alone; a few pieces are worth knowing about.',
    sections: [
      { h: 'What\'s Actually in the Bundle', img: 'laptop.jpg', alt: 'Modern laptop on a desk',
        p1: 'The bundle on a typical HP laptop covers the chipset, the integrated graphics, the audio codec, the touchpad, the keyboard, the camera, the wireless radios, and the power-management stack. Each is a separate driver, sometimes with a small helper utility.',
        p2: 'Most of those drivers do not need any attention from you. Power management, the touchpad, and the wireless radio are the three that occasionally benefit from a refresh after a major operating-system upgrade.' },
      { h: 'The HP Update Helper', img: 'professional-workspace.png', alt: 'Reviewing a settings panel',
        p1: 'HP includes a small helper that periodically checks for newer versions of the bundled drivers and the system firmware. It is conservative by design — it announces what it has found and waits for you to confirm before any change.',
        p2: 'You can postpone every update without harm, but the firmware refreshes are usually worth installing because they often improve battery behaviour and fan curves more than the matching drivers do.' },
      { h: 'When to Roll One Back', img: 'support-pro.png', alt: 'Calm setup for a checkup',
        p1: 'If a new driver introduces a regression — a noisy fan, a stuttery touchpad, a flaky camera — the bundled installer keeps the previous version available. Rolling back through Device Manager is a one-click operation that takes seconds.',
        p2: 'The change is local to your machine and does not affect the update helper\'s future checks. You can re-attempt the same update later, when a follow-up release usually fixes the issue.' },
    ],
    related: [
      ['driver-package-anatomy', 'Driver Package Anatomy', 'What lives inside an installer.'],
      ['driver-test-mode-explained', 'Driver Test Mode', 'For pre-release driver trials.'],
      ['firmware-vs-driver', 'Firmware vs Driver', 'Two layers, one machine.'],
    ],
  },
  {
    slug: 'kyocera-mobile-drivers',
    eyebrow: 'Vendor Drivers',
    title: 'Kyocera Mobile Device Drivers — Quiet Sync',
    desc: 'A friendly overview of the desktop driver that lets a Kyocera handset show up on a computer for media transfer, debugging, and OS recovery.',
    h1: 'Kyocera Mobile Device Drivers — A Quiet Bridge to the Handset',
    sub: 'A Kyocera handset becomes useful to the desktop only after a small driver makes it visible as a media device or developer endpoint.',
    sections: [
      { h: 'What the Driver Exposes', img: 'usb.jpg', alt: 'Phone connected to a computer',
        p1: 'The driver presents the handset to the computer in one of two modes: as a media device for photo and file transfer, or as a developer endpoint for diagnostics and OS recovery. Which one appears depends on the handset\'s own settings.',
        p2: 'Both modes are passive on the desktop side — the driver simply makes the connection trustworthy. The handset stays in control of what is exposed and when.' },
      { h: 'Why the Two Modes Exist', img: 'graphics.jpg', alt: 'Files moving between devices',
        p1: 'Media mode is for everyday people: copy photos off, drop music on, browse the device storage. Developer mode is for technicians and is locked behind a deliberate setting on the handset itself.',
        p2: 'You will only ever need the developer mode if you are recovering a handset that will not start, or testing software you have written. For everything else, media mode is the right choice.' },
      { h: 'Calm Reinstall Routine', img: 'laptop.jpg', alt: 'Laptop on a tidy desk',
        p1: 'If the handset stops being recognised, disconnect, remove the device from Device Manager, restart the desktop, and reconnect with a known-good cable. The driver reinstalls automatically in most cases.',
        p2: 'Carrier branding does not affect the desktop driver — it is the same regardless of the network the handset belongs to. That keeps the troubleshooting story refreshingly simple.' },
    ],
    related: [
      ['usb-drivers', 'Usb Drivers', 'How Usb devices appear.'],
      ['driver-package-anatomy', 'Driver Package Anatomy', 'What\'s inside an installer.'],
      ['fix-network-device-offline', 'Fix Network Device Offline', 'When connection goes quiet.'],
    ],
  },
  {
    slug: 'lexmark-document-drivers',
    eyebrow: 'Vendor Drivers',
    title: 'Lexmark Document Capture Drivers',
    desc: 'A friendly overview of the desktop drivers that let Lexmark document-capture appliances scan straight into folders, mailboxes, or workflow tools.',
    h1: 'Lexmark Document Capture Drivers — From Page to Workflow',
    sub: 'A Lexmark capture appliance can route scanned documents to many destinations, and the desktop driver is what makes those destinations selectable.',
    sections: [
      { h: 'What the Capture Driver Provides', img: 'professional-workspace.png', alt: 'Office work area with documents',
        p1: 'The desktop driver registers the capture appliance with the operating system and exposes its capabilities — duplex, colour mode, resolution presets — to whatever software wants to drive a scan. Most office suites pick this up automatically.',
        p2: 'The driver does not store any documents itself. It simply translates between the appliance\'s native protocol and the standard scanning vocabulary the desktop already speaks.' },
      { h: 'Routing Destinations', img: 'graphics.jpg', alt: 'Documents flowing into folders',
        p1: 'A typical Lexmark workflow scans to a network folder, a shared mailbox, or a document-management tool. The destination list is configured on the appliance itself; the desktop driver just confirms each route is reachable.',
        p2: 'When a destination is unreachable, the appliance shows a calm error rather than failing the scan silently. The fix is almost always a permission or network change at the destination, not a driver issue.' },
      { h: 'Quiet Driver Refresh', img: 'support-pro.png', alt: 'Reviewing settings calmly',
        p1: 'A driver refresh is rare — once installed, the capture driver tends to stay current for years because the underlying scanning standards rarely change. Refresh only when migrating to a new desktop OS major version.',
        p2: 'The appliance\'s own firmware is separate and updates through the appliance\'s administrative web page. Keep both at their current version for the smoothest experience.' },
    ],
    related: [
      ['network-drivers', 'Network Drivers', 'Reachability of destinations.'],
      ['firmware-vs-driver', 'Firmware vs Driver', 'Two layers, one appliance.'],
      ['driver-package-anatomy', 'Driver Package Anatomy', 'What\'s inside an installer.'],
    ],
  },
  {
    slug: 'ricoh-camera-drivers',
    eyebrow: 'Vendor Drivers',
    title: 'Ricoh Pentax Camera Drivers — Calm Tether',
    desc: 'A friendly overview of how Ricoh and Pentax camera drivers expose the body to a computer for tethered shooting and photo transfer.',
    h1: 'Ricoh Pentax Camera Drivers — A Quiet Tether to the Desktop',
    sub: 'Ricoh and Pentax bodies share a common driver lineage. Once installed, the camera becomes a recognised image device on the computer.',
    sections: [
      { h: 'How the Body Is Recognised', img: 'usb.jpg', alt: 'Camera connected to a laptop',
        p1: 'On Usb attach the driver enrols the camera as a still-image device — the same standard that most photo applications already understand. From that moment on, no special application is required to copy images off.',
        p2: 'Tethered shooting and remote control require a vendor utility, but the underlying transport is still the same standard. The utility simply layers richer commands on top of what the driver has exposed.' },
      { h: 'Why Tethering Is Worth Knowing About', img: 'graphics.jpg', alt: 'Photo grid on a screen',
        p1: 'A tethered session lets you compose, focus-check, and review at full resolution on a large screen as you shoot. For studio and product work the difference in confidence is hard to overstate.',
        p2: 'The driver carries the heavy lifting silently. The vendor utility on top only has to send simple commands — fire, change shutter, change Iso — and the driver keeps the connection healthy.' },
      { h: 'When the Body Stops Showing Up', img: 'support-pro.png', alt: 'Reviewing settings on a screen',
        p1: 'A vanished body is almost always a cable, hub, or sleeping-host issue. Switch to a direct connection, wake the host, and try again. The driver itself is rarely at fault unless you have just upgraded the desktop OS.',
        p2: 'A clean reinstall — remove the driver, reboot, reattach — clears the rare cases where the OS upgrade has loosened the binding. Camera firmware updates are unrelated and are applied via the body\'s own menu.' },
    ],
    related: [
      ['usb-drivers', 'Usb Drivers', 'How Usb devices appear.'],
      ['driver-isolation-explained', 'Driver Isolation', 'Why two utilities can clash.'],
      ['canon-camera-drivers', 'Canon Camera Drivers', 'A neighbouring vendor read.'],
    ],
  },
  {
    slug: 'samsung-monitor-drivers',
    eyebrow: 'Vendor Drivers',
    title: 'Samsung Monitor Drivers — Modes and Refresh',
    desc: 'A friendly overview of the small driver pack that teaches a computer the exact capabilities of a Samsung monitor — refresh rates, colour modes, and more.',
    h1: 'Samsung Monitor Drivers — Telling Your Computer What Your Screen Can Do',
    sub: 'A Samsung monitor without its driver still lights up. With the driver, the operating system knows the exact list of supported modes.',
    sections: [
      { h: 'What the Driver Carries', img: 'graphics.jpg', alt: 'External monitor on a desk',
        p1: 'A Samsung monitor driver is mostly a description file. It tells the operating system the supported resolutions, refresh rates, colour spaces, and any vendor-specific modes the panel can render. The file is tiny and stays static once installed.',
        p2: 'With this description in place, the OS exposes the correct list in display settings, applications negotiate the right colour space, and games can pick the highest refresh rate the panel truly supports.' },
      { h: 'Why It Matters for High-Refresh Panels', img: 'professional-workspace.png', alt: 'High-refresh display setup',
        p1: 'Samsung\'s gaming-oriented panels often support refresh rates well above the common defaults. Without the driver, the OS may cap the panel at a safe lower rate because it cannot confirm the higher one is supported.',
        p2: 'Installing the driver tells the OS the truth about the panel and unlocks every supported rate. There is no performance change in the games themselves — only in what the OS lets you select.' },
      { h: 'Calm Install Routine', img: 'laptop.jpg', alt: 'Laptop with external display',
        p1: 'Connect the monitor first, let the OS recognise it as a generic display, then install the Samsung driver pack. A reboot is rarely required because the description is re-read on the next display reset.',
        p2: 'There is no background service afterwards, no tray icon, no automatic update channel. The driver is a static description, refreshed only when you install a new version yourself.' },
    ],
    related: [
      ['graphics-drivers', 'Graphics Drivers', 'The card-side companion topic.'],
      ['fix-display-blank', 'Fix Display Blank', 'When the screen stays dark.'],
      ['firmware-vs-driver', 'Firmware vs Driver', 'Why monitor firmware is its own thing.'],
    ],
  },
  {
    slug: 'xerox-document-drivers',
    eyebrow: 'Vendor Drivers',
    title: 'Xerox Document Workflow Drivers',
    desc: 'A friendly overview of the desktop drivers that let Xerox document-workflow appliances route scans to mailboxes, network folders, and content tools.',
    h1: 'Xerox Document Workflow Drivers — From Page to Destination',
    sub: 'A Xerox workflow appliance routes scanned documents to many destinations, and the desktop driver is what makes those destinations addressable from your software.',
    sections: [
      { h: 'What the Workflow Driver Provides', img: 'professional-workspace.png', alt: 'Office work area with documents',
        p1: 'The desktop driver registers the appliance and surfaces its scanning capabilities — duplex, colour mode, resolution — to whatever desktop tool is doing the scan. Most office suites and document tools pick this up automatically.',
        p2: 'The driver itself stores nothing. It is a translator between the appliance\'s protocol and the standard scanning vocabulary the desktop already understands.' },
      { h: 'Routes and Destinations', img: 'graphics.jpg', alt: 'Documents flowing into folders',
        p1: 'A common Xerox workflow scans to a network folder, a shared mailbox, or a content-management tool. The route list is configured on the appliance itself; the desktop driver simply confirms each route is reachable.',
        p2: 'When a destination is unreachable the appliance shows a calm error rather than failing silently. The cause is almost always a permission or network change at the destination, not the driver.' },
      { h: 'Quiet Refresh Routine', img: 'support-pro.png', alt: 'Reviewing settings calmly',
        p1: 'A driver refresh is rare — once installed, the workflow driver stays current for years because the underlying scanning standards change slowly. Refresh only when migrating to a new desktop OS major version.',
        p2: 'The appliance\'s own firmware is separate and updates through the appliance\'s administrative web page. Keep both at their current version for the smoothest experience.' },
    ],
    related: [
      ['network-drivers', 'Network Drivers', 'Reachability of destinations.'],
      ['firmware-vs-driver', 'Firmware vs Driver', 'Two layers, one appliance.'],
      ['lexmark-document-drivers', 'Lexmark Document Capture', 'A neighbouring vendor read.'],
    ],
  },
  {
    slug: 'fix-display-blank',
    eyebrow: 'Walkthroughs',
    title: 'Fix Display Output Blank — Quick Steps',
    desc: 'A calm step-by-step for the case where a connected display lights up but shows no image — a small set of checks usually clears it.',
    h1: 'Fix Display Output Blank — A Calm, Ordered Walkthrough',
    sub: 'A connected display that lights up but stays blank is almost always a signal-path issue, not a hardware fault. The steps below clear most cases.',
    sections: [
      { h: 'Check the Signal Source First', img: 'graphics.jpg', alt: 'External monitor on a desk',
        p1: 'Most modern displays have multiple inputs and an automatic input-select feature that occasionally picks the wrong one. Open the on-screen menu and choose the input matching the cable you are using. The picture often returns immediately.',
        p2: 'If the display has no on-screen menu, use the input-select button on the bezel. The icon that lights up beside the active input is the simplest confirmation that the right source is selected.' },
      { h: 'Reseat the Cable Both Ends', img: 'usb.jpg', alt: 'A cable being reconnected',
        p1: 'Slightly loose cables are the second most common cause. Disconnect both ends, inspect for bent pins, then push each connector firmly home until the latch clicks. A small angle change at the desk can loosen a connector overnight.',
        p2: 'If you have a known-good spare cable, swap to it for the test. A new cable is one of the cheapest ways to rule out a subtle wear-related fault.' },
      { h: 'Refresh the Display Driver', img: 'support-pro.png', alt: 'Reviewing settings on a laptop',
        p1: 'If signal and cable check out, restart the display driver — on most operating systems there is a keyboard shortcut that does this without rebooting the computer. The screen flickers once and the picture usually returns.',
        p2: 'If that does not help, reboot the computer. The full driver reload on next start clears any rare lingering state. A reinstall of the display driver itself is only needed in the unusual case where the steps above fail.' },
    ],
    related: [
      ['graphics-drivers', 'Graphics Drivers', 'The driver family at the heart of this issue.'],
      ['fix-display-driver-stopped-responding', 'Display Driver Stopped Responding', 'When the driver itself crashes briefly.'],
      ['fix-second-display-no-signal', 'Second Display No Signal', 'A close cousin walkthrough.'],
    ],
  },
  {
    slug: 'fix-network-device-offline',
    eyebrow: 'Walkthroughs',
    title: 'Fix Network Device Offline — Quick Steps',
    desc: 'A calm step-by-step for the case where a network-attached device stops responding from your computer — a tidy set of checks usually clears it.',
    h1: 'Fix Network Device Offline — A Calm, Ordered Walkthrough',
    sub: 'A device that has gone "offline" from your computer is almost always reachable somewhere on the network. The steps below find it again.',
    sections: [
      { h: 'Confirm the Device Is On the Network', img: 'professional-workspace.png', alt: 'Reviewing a status panel',
        p1: 'Look at the device itself. A solid network light at the rear is the simplest confirmation. If the light is off or amber, the device has lost its link and needs a cable check or a brief power cycle.',
        p2: 'A device with a healthy link light but no address has lost its lease from the router. A short power cycle usually triggers a fresh address request and brings it back.' },
      { h: 'Check From Another Computer', img: 'graphics.jpg', alt: 'Two computers on a desk',
        p1: 'If a second computer on the same network can still see the device, the issue is local to your computer. Restart the desktop\'s network adapter, refresh its address, and try again. The device usually re-appears.',
        p2: 'If no other computer can see the device either, the issue is at the device or the router. A power cycle of the device, then of the router, almost always restores it.' },
      { h: 'Refresh the Connection on Your Side', img: 'support-pro.png', alt: 'Calm setup with a laptop',
        p1: 'If the device is healthy on the network, refresh the connection from your computer. Disable the device entry in your operating system\'s connection list, wait a moment, then re-enable it. The fresh discovery cycle finds the device again.',
        p2: 'A reinstall of the desktop\'s network adapter driver is the next step in the rare case the refresh does not help. That clears any state the operating system has cached about the device.' },
    ],
    related: [
      ['network-drivers', 'Network Drivers', 'The driver family at the heart of this issue.'],
      ['fix-no-wifi-after-update', 'No Wi-Fi After Update', 'A close cousin walkthrough.'],
      ['fix-bluetooth-pairing-fails', 'Bluetooth Pairing Fails', 'For nearby-device connections.'],
    ],
  },
];

// ---------------------------------------------------------------------
// 3. Page template (mirrors generate-pages.mjs renderPage)
// ---------------------------------------------------------------------

function renderPage(t) {
  const url = `${SITE}/${t.slug}.html`;
  const breadcrumbCategoryMap = {
    'Output Device Drivers': ['network-drivers.html', 'Component Drivers'],
    'Vendor Drivers': ['network-drivers.html', 'Component Drivers'],
    'Walkthroughs': ['knowledge.html', 'Knowledge Center'],
  };
  const [breadHref, breadLabel] = breadcrumbCategoryMap[t.eyebrow] || ['blog.html', 'Driver Topics'];

  let titleFinal = `${t.title} | PrintSoftDriver`;
  if (titleFinal.length > 60) {
    let core = t.title.length > 47 ? t.title.slice(0, 44).trim() + '…' : t.title;
    titleFinal = `${core} | PrintSoftDriver`;
    if (titleFinal.length > 60) titleFinal = core;
  }
  let descFinal = t.desc;
  if (descFinal.length > 158) descFinal = descFinal.slice(0, 155).trim() + '…';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${titleFinal}</title>
  <meta name="description" content="${descFinal}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="PrintSoftDriver">
  <meta name="keywords" content="${t.slug.replace(/-/g, ' ')}, driver overview, printsoftdriver">
  <meta property="og:title" content="${titleFinal}">
  <meta property="og:description" content="${descFinal}">
  <meta property="og:image" content="${SITE}/opengraph.jpg">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${titleFinal}">
  <meta name="twitter:description" content="${descFinal}">
  <link rel="canonical" href="${url}">
  <script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": ${JSON.stringify(t.h1)},
  "name": ${JSON.stringify(titleFinal)},
  "description": ${JSON.stringify(descFinal)},
  "url": "${url}",
  "image": "${SITE}/opengraph.jpg",
  "author": {"@type": "Organization", "name": "PrintSoftDriver", "url": "${SITE}/"},
  "publisher": {"@type": "Organization", "name": "PrintSoftDriver", "url": "${SITE}/", "logo": {"@type": "ImageObject", "url": "${SITE}/favicon.svg"}},
  "isPartOf": {"@type": "WebSite", "name": "PrintSoftDriver", "url": "${SITE}/"},
  "inLanguage": "en"
}</script>
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
  <link href="https://fonts.bunny.net/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'functionality_storage': 'granted',
      'security_storage': 'granted',
      'wait_for_update': 500
    });
    gtag('set', 'ads_data_redaction', true);
  </script>
</head>
<body>
<header id="site-header" role="banner">
  <div class="header-inner">
    <a href="index.html" class="logo" aria-label="PrintSoftDriver Home">
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#E87F24"/>
        <rect x="8" y="8" width="16" height="16" rx="2" fill="#E87F24" stroke="#FEFDDF" stroke-width="1"/>
        <rect x="12" y="12" width="8" height="8" rx="1" fill="#E87F24"/>
        <rect x="14" y="14" width="4" height="4" fill="#FEFDDF"/>
        <rect x="4" y="14" width="4" height="4" rx="1" fill="#FEFDDF"/>
        <rect x="24" y="14" width="4" height="4" rx="1" fill="#FEFDDF"/>
        <rect x="14" y="4" width="4" height="4" rx="1" fill="#FEFDDF"/>
        <rect x="14" y="24" width="4" height="4" rx="1" fill="#FEFDDF"/>
      </svg>
      <span class="logo-text">PrintSoftDriver</span>
    </a>
    <nav class="nav-links" aria-label="Main navigation">
      <a href="index.html">Home</a>
      <a href="blog.html">Blog</a>
      <a href="about.html">About</a>
      <a href="knowledge.html">Knowledge</a>
      <a href="contact.html">Contact</a>
    </nav>
    <button class="hamburger" id="hamburger-btn" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-nav">
      <span></span><span></span><span></span>
    </button>
  </div>
  <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
    <a href="index.html">Home</a>
    <a href="blog.html">Blog</a>
    <a href="about.html">About</a>
    <a href="knowledge.html">Knowledge</a>
    <a href="contact.html">Contact</a>
  </nav>
</header>
<section class="hero-page hero-page--guides" aria-label="${t.h1} hero">
  <div class="hero-page-overlay"></div>
  <div class="hero-page-content reveal">
    <span class="hero-eyebrow">${t.eyebrow}</span>
    <h1>${t.h1}</h1>
    <p>${t.sub}</p>
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Home</a>
      <span aria-hidden="true">›</span>
      <a href="${breadHref}">${breadLabel}</a>
      <span aria-hidden="true">›</span>
      <span>${t.h1.split('—')[0].trim()}</span>
    </nav>
  </div>
</section>
<main>
${t.sections.map((s, i) => `<section class="page-section${i % 2 === 1 ? ' bg-surface' : ''}" aria-labelledby="sec-${i}">
  <div class="section-inner">
    <div class="split-row${i % 2 === 1 ? ' reverse' : ''}">
      <div class="split-text reveal">
        <h2 id="sec-${i}">${s.h}</h2>
        <p>${s.p1}</p>
        <p>${s.p2}</p>
      </div>
      <div class="split-image reveal">
        <img src="images/${s.img}" alt="${s.alt}" loading="lazy" width="640" height="420">
      </div>
    </div>
  </div>
</section>`).join('\n')}

<section class="page-section">
  <div class="section-inner">
    <div class="section-header reveal">
      <span class="section-eyebrow">Keep Reading</span>
      <h2>Related Reads on PrintSoftDriver</h2>
      <p>Hand-picked articles that pair well with this one.</p>
    </div>
    <div class="related-grid reveal">
      ${t.related.map(([slug, title, tagline]) => `<a class="related-card" href="${slug}.html"><h3>${title}</h3><p>${tagline}</p></a>`).join('\n      ')}
    </div>
  </div>
</section>
<section class="page-section">
  <div class="section-inner">
    <div class="cta-card reveal">
      <h2>Browse More PrintSoftDriver Reads</h2>
      <p>Plain-English explainers, fix walkthroughs, and concept articles for every part of your system.</p>
      <div class="cta-actions">
        <a href="blog.html" class="btn btn-primary">Visit the Blog</a>
        <a href="knowledge.html" class="btn btn-outline-dark">Knowledge Center</a>
      </div>
    </div>
  </div>
</section>
</main>
<footer id="site-footer" role="contentinfo">
  <div class="footer-grid">
    <div class="footer-col">
      <div class="footer-logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="32" height="32" rx="6" fill="#E87F24"/>
          <rect x="8" y="8" width="16" height="16" rx="2" fill="#E87F24" stroke="#FEFDDF" stroke-width="1"/>
          <rect x="12" y="12" width="8" height="8" rx="1" fill="#E87F24"/>
          <rect x="14" y="14" width="4" height="4" fill="#FEFDDF"/>
        </svg>
        <span class="footer-logo-text">PrintSoftDriver</span>
      </div>
      <p>Your friendly, plain-English overview of the world of device drivers. We translate the technical so you can spend more time using your computer and less time fighting it.</p>
    </div>
    <div class="footer-col">
      <h4>Site Links</h4>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="knowledge.html">Knowledge</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="sitemap.html">Sitemap</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Driver Topics</h4>
      <ul>
        <li><a href="output-device-drivers.html">Device Drivers</a></li>
        <li><a href="graphics-drivers.html">Graphics Drivers</a></li>
        <li><a href="audio-drivers.html">Audio Drivers</a></li>
        <li><a href="network-drivers.html">Network Drivers</a></li>
        <li><a href="usb-drivers.html">Usb &amp; Devices</a></li>
        <li><a href="system-drivers.html">System Drivers</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      <ul>
        <li><a href="privacy-policy.html">Privacy Policy</a></li>
        <li><a href="terms.html">Terms of Use</a></li>
        <li><a href="disclaimer.html">Disclaimer</a></li>
        <li><a href="cookie-policy.html">Cookie Policy</a></li>
        <li><a href="privacy-policy.html#do-not-sell-section">Your Privacy Choices</a></li>
      </ul>
    </div>
    <div class="footer-col footer-col-3">
      <h4>Get In Touch</h4>
      <p>Have a question, suggestion, or topic you'd love us to cover next?</p>
      <div class="contact-item">
        <span>Email</span>
        info@printsoftdriver.com
      </div>
    </div>
  </div>
  <div class="footer-disclaimer">
    <strong>Disclaimer:</strong> PrintSoftDriver is an independent educational resource published for general information only. It has no affiliation with, and no endorsement or sponsorship from, any hardware maker, software publisher, or operating system vendor. The site is purely informational: there are no software downloads, paid help-desk services, repair services, or consulting offered here. Content is provided on an "as is" basis without warranty of any kind. For changes to your system, please refer to the official documentation supplied by your device maker.
  </div>
        <div class="footer-contact-line" style="text-align:center;margin:18px 0 8px;font-size:14px;opacity:.85;">
        <span>Customer Support: </span><a href="tel:+18885550173" style="color:inherit;text-decoration:none;">+1 (888) 555-0173</a>
      </div>
            <div class="footer-ad-disclosure" style="text-align:center;font-size:12px;opacity:.7;margin:14px auto 6px;max-width:900px;line-height:1.55;">
        <strong>Advertising &amp; Analytics Disclosure:</strong> This site may use third-party advertising and analytics services to measure traffic and ad performance. No data is collected until you accept cookies. See our <a href="privacy-policy.html" style="color:inherit;">Privacy Policy</a> for full details and opt-out instructions.
      </div>
      <div class="footer-bottom">
    <div class="footer-bottom-links">
      <a href="privacy-policy.html">Privacy Policy</a>
      <a href="terms.html">Terms of Use</a>
      <a href="disclaimer.html">Full Disclaimer</a>
      <a href="cookie-policy.html">Cookie Policy</a>
      <a href="privacy-policy.html#do-not-sell-section">Your Privacy Choices</a>
      <a href="sitemap.html">Sitemap</a>
    </div>
    <p class="footer-copyright">&copy; PrintSoftDriver. All Rights Reserved.</p>
  </div>
</footer>
<div id="cookie-banner" role="dialog" aria-label="Cookie consent" aria-live="polite">
  <p class="cookie-text">We use cookies to improve your experience. By continuing, you agree to our <a href="cookie-policy.html">Cookie Policy</a>.</p>
  <div class="cookie-btns">
    <button class="cookie-btn cookie-btn-accept" onclick="acceptCookies()">Accept All</button>
    <button class="cookie-btn cookie-btn-reject" onclick="rejectCookies()">Reject All</button>
  </div>
</div>
<script src="script.js"></script>
</body>
</html>
`;
}

// ---------------------------------------------------------------------
// 4. Step A: Delete the 14 old printer files
// ---------------------------------------------------------------------

console.log('\n=== Step A: Deleting old printer pages ===');
for (const oldSlug of Object.keys(PRINTER_RENAMES)) {
  const p = path.join(ROOT, `${oldSlug}.html`);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log(`  deleted ${oldSlug}.html`);
  }
}

// ---------------------------------------------------------------------
// 5. Step B: Write the 14 new replacement pages
// ---------------------------------------------------------------------

console.log('\n=== Step B: Writing 14 new replacement pages ===');
for (const t of NEW_TOPICS) {
  const p = path.join(ROOT, `${t.slug}.html`);
  fs.writeFileSync(p, renderPage(t));
  console.log(`  wrote ${t.slug}.html`);
}

// ---------------------------------------------------------------------
// 6. Step C: Rename guide files and troubleshooting.html
// ---------------------------------------------------------------------

console.log('\n=== Step C: Renaming guide and troubleshooting files ===');
for (const [oldSlug, newSlug] of Object.entries({ ...GUIDE_RENAMES, ...TROUBLESHOOTING_RENAMES })) {
  const oldP = path.join(ROOT, `${oldSlug}.html`);
  const newP = path.join(ROOT, `${newSlug}.html`);
  if (fs.existsSync(oldP)) {
    fs.renameSync(oldP, newP);
    console.log(`  renamed ${oldSlug}.html -> ${newSlug}.html`);
  }
}

// ---------------------------------------------------------------------
// 7. Step D: Walk every .html in ROOT and apply text + link replacements
// ---------------------------------------------------------------------

console.log('\n=== Step D: Updating internal links and visible text in all HTML files ===');

const htmlFiles = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html'));

// Build href replacement pairs (old -> new) as exact .html token replacements
const hrefPairs = Object.entries(ALL_RENAMES).map(([oldSlug, newSlug]) => [
  `${oldSlug}.html`, `${newSlug}.html`
]);

// Visible-word replacements (case-preserving variants)
const wordPairs = [
  // Order matters: do longer/specific phrases first
  // "Troubleshooting Guides" -> "Knowledge Center" (the CTA sub-button)
  ['Troubleshooting Guides', 'Knowledge Center'],
  ['Troubleshooting Guide', 'Knowledge Center'],
  // Generic single-word forms
  ['Troubleshooting', 'Knowledge'],
  ['troubleshooting', 'knowledge'],
  // "Driver Guides" / "Driver Guide" specific phrases
  ['Driver Guides', 'Driver Overviews'],
  ['driver guides', 'driver overviews'],
  ['Driver Guide', 'Driver Overview'],
  ['driver guide', 'driver overview'],
  // Generic single-word "Guide" forms (after the more specific ones)
  ['Guides', 'Overviews'],
  ['guides', 'overviews'],
  ['Guide', 'Overview'],
  ['guide', 'overview'],
];

// Printer word — replace contextually then prune any remaining mentions
const printerPairs = [
  // Plural and possessive first
  ['printer drivers', 'print device drivers'],
  ['Printer Drivers', 'Print Device Drivers'],
  ['printer driver', 'print device driver'],
  ['Printer Driver', 'Print Device Driver'],
  ['printers', 'print devices'],
  ['Printers', 'Print Devices'],
  ['printer\'s', 'device\'s'],
  ['Printer\'s', 'Device\'s'],
  ['printer', 'print device'],
  ['Printer', 'Print Device'],
];

let touched = 0;
for (const f of htmlFiles) {
  const p = path.join(ROOT, f);
  let html = fs.readFileSync(p, 'utf8');
  const before = html;

  // 1) Update href / canonical / og:url tokens
  for (const [oldHtml, newHtml] of hrefPairs) {
    html = html.split(oldHtml).join(newHtml);
  }

  // 2) Visible word replacements
  for (const [from, to] of wordPairs) {
    html = html.split(from).join(to);
  }

  // 3) Printer phrasing replacements
  for (const [from, to] of printerPairs) {
    html = html.split(from).join(to);
  }

  if (html !== before) {
    fs.writeFileSync(p, html);
    touched++;
  }
}
console.log(`  updated ${touched} of ${htmlFiles.length} files`);

// ---------------------------------------------------------------------
// 8. Step E: Write vercel.json with 301 redirects
// ---------------------------------------------------------------------

console.log('\n=== Step E: Writing vercel.json redirects ===');
const redirects = Object.entries(ALL_RENAMES).flatMap(([oldSlug, newSlug]) => [
  { source: `/${oldSlug}.html`, destination: `/${newSlug}.html`, permanent: true },
  { source: `/${oldSlug}`,      destination: `/${newSlug}.html`, permanent: true },
]);

const vercelJson = { redirects };
fs.writeFileSync(path.join(ROOT, 'vercel.json'), JSON.stringify(vercelJson, null, 2) + '\n');
console.log(`  wrote ${redirects.length} redirect entries to vercel.json`);

console.log('\nAll done.');
