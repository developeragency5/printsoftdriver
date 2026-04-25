import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://www.printsoftdriver.com';

// =====================================================================
// 50 NEW PAGE TOPICS
//   Each topic is fully self-contained: title, description, hero,
//   3 unique body sections, related links, hub category.
//   All wording avoids scareware triggers, all-caps acronyms, and
//   forbidden brand words (Microsoft / Bing / Google / Windows Hello).
// =====================================================================

const TOPICS = [
  // ---------- ERROR CODES (10) ----------
  {
    slug: 'error-code-12-explained',
    category: 'errors',
    title: 'Code 12 Explained — Resource Conflict',
    desc: 'Why Device Manager shows code 12, what a resource conflict really means, and the calm steps to give a device its room back.',
    eyebrow: 'Device Manager Codes',
    h1: 'Code 12 — When Two Devices Want the Same Resource',
    sub: 'A friendly look at resource conflicts and how to give every device the address space it needs.',
    sections: [
      { h: 'What Code 12 Is Telling You', img: 'chipset.jpg', alt: 'Motherboard chipset',
        p1: 'Code 12 means the operating system tried to start a device but could not find an unused range of memory or input/output addresses for it. Two pieces of hardware are effectively asking for the same parking spot, and the system has stopped one of them rather than risk corruption.',
        p2: 'On modern hardware this is rare because firmware allocates resources automatically. When it does happen the cause is almost always a Bios option, a stale registry entry, or an add-in card whose firmware has not been updated.' },
      { h: 'Where Resource Conflicts Come From', img: 'hardware.jpg', alt: 'Internal hardware components',
        p1: 'PCIe and legacy buses share a finite pool of memory ranges. When you add a new card or reconfigure firmware, the system rebuilds the map at boot. If the map is constrained — for example by a "Compatibility" mode or a leftover Plug-and-Play assignment — there may simply be no room for the newest device.',
        p2: 'The same effect can come from manually-pinned resources: a setting that says "always give this card the address range I picked." That assignment overrides the firmware and locks the slot.' },
      { h: 'Calm Steps to Resolve It', img: 'professional-workspace.png', alt: 'Workstation setup',
        p1: 'First, restart with the device installed but disabled, then re-enable it. The firmware gets a chance to re-allocate from a clean slate. Second, check the Bios settings for an option called "Above 4G Decoding" or "Memory Mapping" and toggle it.',
        p2: 'If neither helps, remove and re-install the affected device with the cable unplugged, then plug it back in after the operating system finishes loading. That sequence sidesteps any cached resource map.' },
    ],
    related: [
      ['error-code-10-explained', 'Code 10 Explained', 'Common stop reason for a single device.'],
      ['error-code-43-explained', 'Code 43 Explained', 'When a device is reported as misbehaving.'],
      ['driver-chipset', 'Chipset Drivers', 'Why these drivers map every other component.'],
    ],
  },
  {
    slug: 'error-code-14-explained',
    category: 'errors',
    title: 'Code 14 Explained — Restart Required',
    desc: 'Why a device is asking for a restart, what changes between boot and shutdown, and the safe ways to apply the change.',
    eyebrow: 'Device Manager Codes',
    h1: 'Code 14 — The Polite Request to Restart',
    sub: 'A short, calm guide to the simplest of the device codes — a clean reboot is almost always the answer.',
    sections: [
      { h: 'Why a Restart Is Sometimes the Only Path', img: 'cpu-chip.jpg', alt: 'CPU chip on motherboard',
        p1: 'Some driver components install files that are already loaded into memory. The new file lands on disk fine, but the running version stays active until the system is restarted. Code 14 is the operating system saying "your install finished, just give me a reboot to switch over."',
        p2: 'It is not an error in the usual sense — it is a status message. The device is not failing; it is simply waiting for its replacement parts to take effect.' },
      { h: 'What Actually Happens at Restart', img: 'kernel-mode.jpg', alt: 'Operating system internals',
        p1: 'During shutdown the system unloads every driver. At the next boot the loader picks the latest registered version of each driver from disk. If a newer file was placed there during your install, that is what gets used.',
        p2: 'This is also why "log off and back on" usually does not clear the message. Drivers live below the user session, so only a real restart cycles them.' },
      { h: 'When You Cannot Restart Right Now', img: 'laptop.jpg', alt: 'Laptop screen showing settings',
        p1: 'If you cannot reboot immediately, the device usually keeps working with the previous driver until you do. Save your work and pick a quiet moment — the message will clear on its own once the system comes back up.',
        p2: 'Avoid disabling and re-enabling the device through Device Manager as a substitute. That cycle does not always reload the driver from disk and can leave the install in a half-applied state.' },
    ],
    related: [
      ['error-code-18-explained', 'Code 18 Explained', 'When the system asks you to reinstall.'],
      ['roll-back-driver', 'Roll Back a Driver', 'How to revert if the new version misbehaves.'],
      ['driver-store-explained', 'Driver Store Explained', 'Where drivers live between installs.'],
    ],
  },
  {
    slug: 'error-code-18-explained',
    category: 'errors',
    title: 'Code 18 Explained — Reinstall the Driver',
    desc: 'What code 18 means, why a clean reinstall fixes it, and the safest order of operations for swapping drivers.',
    eyebrow: 'Device Manager Codes',
    h1: 'Code 18 — When a Clean Reinstall Is the Cure',
    sub: 'A practical walkthrough of removing a driver cleanly and putting it back without leaving registry breadcrumbs behind.',
    sections: [
      { h: 'What the System Has Already Decided', img: 'storage.jpg', alt: 'Storage drive',
        p1: 'Code 18 appears when the operating system has noticed that the registered driver files do not match what it expected. Rather than guess, it stops the device and asks for a fresh install of the package.',
        p2: 'The most common causes are an interrupted update, a driver removed by uninstall software but left registered, or a manual file edit that broke the package signature.' },
      { h: 'The Safe Reinstall Order', img: 'professional-workspace.png', alt: 'Calm troubleshooting setup',
        p1: 'Download the replacement driver before you remove anything. Disconnect the device if it is external. In Device Manager, right-click the entry and choose Uninstall — tick "delete the driver software" so the package leaves the store.',
        p2: 'Restart, then run the installer you downloaded earlier. The fresh package registers cleanly and Device Manager picks it up automatically. Plug the device back in only after the install finishes.' },
      { h: 'When Reinstalling Does Not Help', img: 'tech-support.jpg', alt: 'Reading documentation',
        p1: 'If code 18 returns immediately after reinstall, the package itself may be incompatible with your operating system version. Check the maker\'s download page and pick the build that matches your release line.',
        p2: 'On rare occasions a faulty driver service from another package interferes with the reinstall. Booting in safe mode and trying again from there gives the new driver a quiet environment to register.' },
    ],
    related: [
      ['uninstall-driver-cleanly', 'Uninstall a Driver Cleanly', 'The full clean-removal walkthrough.'],
      ['error-code-39-explained', 'Code 39 Explained', 'Closely-related "driver missing" message.'],
      ['driver-store-cleanup', 'Driver Store Cleanup', 'Tidy up after lots of driver swaps.'],
    ],
  },
  {
    slug: 'error-code-19-explained',
    category: 'errors',
    title: 'Code 19 Explained — Registry Configuration',
    desc: 'Why code 19 points at the registry, what got out of sync, and how to repair the configuration without manual edits.',
    eyebrow: 'Device Manager Codes',
    h1: 'Code 19 — When the Registry Configuration Goes Stale',
    sub: 'A calm look at the registry entries the operating system reads at boot and how to refresh them safely.',
    sections: [
      { h: 'Why the Registry Even Stores Driver Settings', img: 'kernel-mode.jpg', alt: 'Driver loader internals',
        p1: 'Every driver writes a small block of configuration into the system registry — service name, image path, start type, and a list of upper and lower filter drivers that wrap around it. Code 19 means the operating system read this block and found it inconsistent.',
        p2: 'Most often the issue is a duplicated entry: a previous driver was upgraded and the old line was never removed. The loader sees two definitions for the same device and stops, rather than guess which one to use.' },
      { h: 'How to Refresh Without Editing by Hand', img: 'cpu-chip.jpg', alt: 'Hardware closeup',
        p1: 'You almost never need to edit the registry directly. Uninstalling the device through Device Manager (with "delete driver" ticked) removes both the file copy and the registry block. The next install creates a fresh, single block.',
        p2: 'If the device cannot be uninstalled because it shows the error, restart into safe mode, uninstall there, then reboot normally and let the operating system re-detect the device.' },
      { h: 'Software That Tends to Leave Stale Entries', img: 'support-pro.png', alt: 'Reviewing system reports',
        p1: 'Disk imaging tools, Vpn clients, and security suites are common offenders — they install upper filter drivers that wrap network and storage devices. When uninstalled imperfectly they can leave a filter line referencing a missing driver, which produces code 19 on next boot.',
        p2: 'After removing one of these tools, a quick browse of Device Manager for any newly-flagged devices catches the problem early and avoids surprises later.' },
    ],
    related: [
      ['error-code-39-explained', 'Code 39 Explained', 'Driver missing entirely.'],
      ['driver-verifier-explained', 'Driver Verifier Explained', 'Tool for diagnosing driver behaviour.'],
      ['inf-files-explained', 'Inf Files Explained', 'How drivers describe themselves to the system.'],
    ],
  },
  {
    slug: 'error-code-21-explained',
    category: 'errors',
    title: 'Code 21 Explained — Device Removal Pending',
    desc: 'Why code 21 appears during driver swaps, what is taking so long, and when waiting versus restarting is the right call.',
    eyebrow: 'Device Manager Codes',
    h1: 'Code 21 — A Device That Is Halfway Out the Door',
    sub: 'A brief explainer of the "removal pending" state and the safest way to clear it.',
    sections: [
      { h: 'A State, Not a Failure', img: 'hardware.jpg', alt: 'Hardware ports',
        p1: 'Code 21 is a transitional message — the operating system is in the middle of unloading a device but has not finished. Most of the time you will only see it for a moment after a driver uninstall or a hot-swap.',
        p2: 'If the message persists, something has held a reference to the device — usually a background service that has not yet released its handle. Until that handle is freed, the operating system cannot complete the removal.' },
      { h: 'How to Encourage a Stuck Removal to Complete', img: 'professional-workspace.png', alt: 'Reviewing service list',
        p1: 'Open the Services panel and look for entries related to the device family — print spoolers, audio engines, Vpn services, virtual disk providers. Stopping the relevant service usually releases the handle and lets the removal finish.',
        p2: 'If you cannot identify which service is holding things up, a restart is always safe. The next boot loads a fresh state with no pending removals.' },
      { h: 'When Code 21 Means a Hardware Issue', img: 'tech-support.jpg', alt: 'Calm reading at desk',
        p1: 'A device that shows code 21 every time and never finishes removal can indicate a flaky cable or port — the system keeps re-detecting it during the unload, which restarts the cycle. Try a different port or cable to see if the loop stops.',
        p2: 'For internal devices, opening the case and reseating the card breaks the loop and lets the next boot start fresh.' },
    ],
    related: [
      ['error-code-22-explained', 'Code 22 Explained', 'When a device has been disabled outright.'],
      ['fix-usb-not-recognised', 'Fix: Usb Not Recognised', 'Adjacent walkthrough for hot-swap issues.'],
      ['plug-and-play-explained', 'Plug and Play Explained', 'How devices come and go from the system.'],
    ],
  },
  {
    slug: 'error-code-22-explained',
    category: 'errors',
    title: 'Code 22 Explained — Device Disabled',
    desc: 'Why a device shows as disabled, who likely turned it off, and how to bring it back without breaking other settings.',
    eyebrow: 'Device Manager Codes',
    h1: 'Code 22 — When a Device Has Simply Been Switched Off',
    sub: 'The most reassuring of the device codes. Calm explainer for the "disabled" state and how to re-enable safely.',
    sections: [
      { h: 'What Disabled Actually Means', img: 'input.jpg', alt: 'Keyboard and mouse setup',
        p1: 'Disabled is a deliberate state — somebody, or some piece of software, asked the operating system not to start this device. The hardware is still present, the driver is still installed, and re-enabling it requires no reinstall.',
        p2: 'It is the most reassuring of the device codes because nothing is wrong. The fix is one click in Device Manager once you confirm the device should be on.' },
      { h: 'Who Tends to Disable Devices', img: 'support-pro.png', alt: 'Reviewing settings',
        p1: 'Battery-life utilities sometimes disable webcams, microphones, and Bluetooth radios when on battery to save power. Privacy-focused suites disable cameras and microphones until you ask for them. Group policy in managed environments can disable removable storage and Wi-Fi.',
        p2: 'Knowing which family is responsible avoids a tug-of-war later — re-enable the device, then look at the responsible utility\'s settings to stop it from disabling again on next boot.' },
      { h: 'Re-Enabling Without Side Effects', img: 'laptop.jpg', alt: 'Working on a laptop',
        p1: 'In Device Manager, right-click the entry and choose Enable. The device comes back online immediately in most cases. If it returns to a disabled state on the next reboot, the responsible utility is overriding you.',
        p2: 'On laptops, the function key for the affected radio (Wi-Fi, Bluetooth) is sometimes mapped to disable the device at the operating system level rather than the firmware level. A second tap of the same key often re-enables it.' },
    ],
    related: [
      ['error-code-24-explained', 'Code 24 Explained', 'When a device is reported as not present.'],
      ['fix-bluetooth-not-working', 'Fix: Bluetooth Not Working', 'Adjacent walkthrough.'],
      ['driver-bluetooth', 'Bluetooth Drivers', 'Background on how the radio is exposed.'],
    ],
  },
  {
    slug: 'error-code-24-explained',
    category: 'errors',
    title: 'Code 24 Explained — Device Not Present',
    desc: 'Why a device shows as "not present" while still listed, and how to tell whether the cause is hardware, firmware, or driver.',
    eyebrow: 'Device Manager Codes',
    h1: 'Code 24 — Listed but Not Reachable',
    sub: 'A calm explainer of the "ghost" state where the operating system remembers a device that is no longer responding.',
    sections: [
      { h: 'The Operating System Has Memory', img: 'storage.jpg', alt: 'Storage components',
        p1: 'Code 24 shows up when the operating system has a record of a device but cannot find it on the bus right now. The most common reasons are a removable device that has been unplugged, an internal card that was removed, or a port that has lost power.',
        p2: 'The entry stays visible because some users want to keep the configuration around for the next time the device is connected. Without it, every reconnection would feel like a fresh install.' },
      { h: 'Distinguishing the Causes', img: 'hardware.jpg', alt: 'Internal hardware',
        p1: 'If the device is external, plug it back in and see whether the entry switches to a normal state. If it does, the original message was simply stale and can be ignored.',
        p2: 'If the device is internal and you have not removed it, check the cable and reseat the card. A loose connection can present as code 24 because the operating system can no longer see the device on the bus.' },
      { h: 'Cleaning Up Ghost Entries', img: 'professional-workspace.png', alt: 'Clean workspace',
        p1: 'When an old device truly is gone for good, you can hide retired entries in Device Manager by enabling "Show hidden devices" and uninstalling the ones you no longer use. This keeps the list tidy and avoids confusion later.',
        p2: 'Be cautious before removing entries you do not recognise — some are paired devices that come and go, and removing them forces a fresh pairing on next use.' },
    ],
    related: [
      ['error-code-22-explained', 'Code 22 Explained', 'When the device is deliberately disabled.'],
      ['plug-and-play-explained', 'Plug and Play Explained', 'How devices announce themselves.'],
      ['driver-storage-disk', 'Storage Drivers', 'When the missing device is a drive.'],
    ],
  },
  {
    slug: 'error-code-32-explained',
    category: 'errors',
    title: 'Code 32 Explained — Service Start Type Disabled',
    desc: 'What code 32 means, why a driver service is set to disabled, and how to restore the right start type without breaking other components.',
    eyebrow: 'Device Manager Codes',
    h1: 'Code 32 — When a Driver Service Is Switched Off at the Source',
    sub: 'Plain-English guide to driver start types and how to restore the default for a service that has been turned off.',
    sections: [
      { h: 'Start Types in One Paragraph', img: 'kernel-mode.jpg', alt: 'System internals',
        p1: 'Every driver registers a start type — boot, system, automatic, manual, or disabled. The first three load very early in the boot sequence; manual loads on demand; disabled means the service will not load at all. Code 32 appears when a device needs its driver but the service is set to disabled.',
        p2: 'The setting is stored in the registry and survives reboots. Until something changes the start type, the device will keep showing the same message.' },
      { h: 'Who Disables Services', img: 'support-pro.png', alt: 'Reviewing service settings',
        p1: 'Group policy in managed setups sometimes disables specific driver services as part of a hardening profile. Some general optimisation tools also disable services they consider unused, occasionally too aggressively.',
        p2: 'The fix is to set the start type back to its default. For most user-facing devices the default is automatic or manual — never disabled.' },
      { h: 'Restoring the Default Safely', img: 'professional-workspace.png', alt: 'Reviewing services list',
        p1: 'Open the Services panel, find the entry that matches the device, and change Startup type back to Automatic or Manual. Apply, then restart. The next boot loads the driver and the device clears its code.',
        p2: 'If you cannot identify which service belongs to the device, uninstalling and reinstalling the driver re-registers the service with its default start type. That sidesteps any need to edit by hand.' },
    ],
    related: [
      ['error-code-33-explained', 'Code 33 Explained', 'Translator failure variant of the same family.'],
      ['driver-verifier-explained', 'Driver Verifier Explained', 'For deeper diagnosis after the fix.'],
      ['driver-kernel-mode', 'Kernel-Mode Drivers', 'How early-boot drivers fit into the picture.'],
    ],
  },
  {
    slug: 'error-code-33-explained',
    category: 'errors',
    title: 'Code 33 Explained — Translator Did Not Respond',
    desc: 'Why code 33 surfaces deep in the I/O path, what a translator is, and how to recover from a translator-related stop.',
    eyebrow: 'Device Manager Codes',
    h1: 'Code 33 — Deep in the Driver Stack',
    sub: 'A friendly look at one of the more obscure device codes and the layers of software involved when it appears.',
    sections: [
      { h: 'What a Translator Even Is', img: 'cpu-chip.jpg', alt: 'CPU and chipset',
        p1: 'In the layered driver model, a translator sits between a low-level bus driver and the device-specific driver above it. It converts requests from one format to another so that a generic upper driver can talk to a wide range of underlying buses.',
        p2: 'Code 33 means a translator that was expected to respond did not. The device-specific driver loaded but cannot finish initialisation because its lower layer has not completed setup.' },
      { h: 'Common Triggers', img: 'hardware.jpg', alt: 'Internal hardware',
        p1: 'The most common cause is a chipset driver that is missing or out of date — the bus underneath the translator is not fully exposed. Less commonly, a host controller in the firmware has been disabled in Bios.',
        p2: 'On hot-swap buses, a brief power glitch during enumeration can also leave a translator in an incomplete state until the next clean boot.' },
      { h: 'Working Back Up the Stack', img: 'professional-workspace.png', alt: 'Documentation review',
        p1: 'Start by updating the chipset driver from your motherboard maker\'s download page. That refreshes the bus and translator drivers in one step. After the install, restart and check whether code 33 has cleared.',
        p2: 'If the message persists, look in Device Manager for any other devices showing a code further up the stack. Solving those first often clears code 33 as a side effect.' },
    ],
    related: [
      ['driver-chipset', 'Chipset Drivers', 'The foundation translators sit on.'],
      ['error-code-32-explained', 'Code 32 Explained', 'Adjacent service-related code.'],
      ['wdm-vs-wdf-drivers', 'Wdm vs Wdf Drivers', 'Background on the driver model.'],
    ],
  },
  {
    slug: 'error-code-37-explained',
    category: 'errors',
    title: 'Code 37 Explained — Driver Init Did Not Succeed',
    desc: 'What code 37 means at the technical level, the most likely root causes, and a calm sequence of fixes to try.',
    eyebrow: 'Device Manager Codes',
    h1: 'Code 37 — When a Driver Loads but Cannot Initialise',
    sub: 'A walkthrough of the difference between loading and initialising, and the safe order of recovery steps.',
    sections: [
      { h: 'Load Versus Initialise', img: 'kernel-mode.jpg', alt: 'Loading sequence concept',
        p1: 'A driver loading means its file is in memory and the operating system has called its entry point. Initialising means the driver has set up its internal state and registered with the system as ready. Code 37 sits in between — the file loaded fine, but the entry point returned an error.',
        p2: 'The most common reason is a mismatch between the driver build and the operating system release line. A driver built for one major version may load on another but refuse to initialise.' },
      { h: 'Where to Check First', img: 'support-pro.png', alt: 'Reading version info',
        p1: 'Open the driver entry in Device Manager, switch to the Driver tab, and note the version. Then visit your device maker\'s download page and confirm the listed driver covers your operating system release. If your release is newer than the latest published driver, that is the issue.',
        p2: 'Sometimes the maker offers a beta or preview build for the newer release. These are usually safe to try and clear code 37 in one install.' },
      { h: 'When the Device Itself Has Changed', img: 'professional-workspace.png', alt: 'Calm troubleshooting setup',
        p1: 'Hardware revisions sometimes change the device ID slightly. The current driver does not recognise the new ID and refuses to initialise. The fix is the same: a newer driver from the maker or, in some cases, a different driver branch covering the new revision.',
        p2: 'If you are running pre-release operating system builds, expect a higher rate of code 37 messages. Drivers catch up with each release; the message usually clears with the next maker update.' },
    ],
    related: [
      ['error-code-31-explained', 'Code 31 Explained', 'Closely related "did not load" message.'],
      ['driver-signing-explained', 'Driver Signing Explained', 'Why some drivers refuse to load.'],
      ['inf-files-explained', 'Inf Files Explained', 'How drivers declare which devices they cover.'],
    ],
  },

  // ---------- OS GUIDES (8) ----------
  {
    slug: 'debian-driver-guide',
    category: 'os',
    title: 'Debian Driver Guide — Stable Linux Drivers',
    desc: 'How drivers work on Debian — the kernel modules, the firmware repository, and the gentle path to vendor extras.',
    eyebrow: 'Linux Driver Guides',
    h1: 'Debian and Drivers — A Steady, Predictable Story',
    sub: 'How Debian handles in-kernel drivers, separate firmware, and the small set of cases where you reach outside the repository.',
    sections: [
      { h: 'Most Drivers Are Already in the Kernel', img: 'kernel-mode.jpg', alt: 'Linux kernel concept',
        p1: 'Debian ships a kernel built with a wide selection of drivers compiled as loadable modules. For everyday hardware — Ethernet, audio, common Wi-Fi, storage controllers — installing the operating system is the entire driver story. The kernel detects the device and loads the matching module automatically.',
        p2: 'Because the modules ship with the kernel image, they update on the same schedule. There is rarely any need to chase drivers separately.' },
      { h: 'The Separate Firmware Story', img: 'storage.jpg', alt: 'Storage and firmware concept',
        p1: 'Some devices need a small firmware blob loaded at boot before the kernel module can finish initialising the hardware. Debian keeps these blobs in a separate firmware-linux package family, available from the standard repositories.',
        p2: 'Installing the right firmware package is usually enough to bring up Wi-Fi cards and certain Bluetooth radios that did not appear out of the box.' },
      { h: 'When You Reach for Vendor Extras', img: 'professional-workspace.png', alt: 'Working with documentation',
        p1: 'Discrete graphics cards from the major makers sometimes benefit from the proprietary driver. Debian provides packages for both the open-source and proprietary stacks; switching is usually a one-line install followed by a reboot.',
        p2: 'For specialty hardware not covered by Debian packages, Dkms can build a vendor-supplied module against your running kernel and rebuild it automatically across kernel updates.' },
    ],
    related: [
      ['ubuntu-driver-guide', 'Ubuntu Driver Guide', 'Closest cousin in approach.'],
      ['dkms-explained', 'Dkms Explained', 'How out-of-tree modules survive kernel updates.'],
      ['linux-mint-driver-guide', 'Linux Mint Driver Guide', 'Friendly Debian-based variant.'],
    ],
  },
  {
    slug: 'linux-mint-driver-guide',
    category: 'os',
    title: 'Linux Mint Driver Guide — Friendly Defaults',
    desc: 'How Linux Mint handles drivers, the role of its Driver Manager tool, and when to switch to a proprietary build.',
    eyebrow: 'Linux Driver Guides',
    h1: 'Linux Mint and Drivers — Pick One, Click Apply',
    sub: 'A relaxed look at the Driver Manager utility and the small number of decisions Mint asks you to make.',
    sections: [
      { h: 'The Driver Manager Tool', img: 'laptop.jpg', alt: 'Linux desktop',
        p1: 'Linux Mint ships with a graphical Driver Manager that scans your hardware and lists every driver the system can offer for it. For each device it shows the open-source and proprietary options side by side, with a short note explaining what each one is good for.',
        p2: 'You pick a row, click Apply Changes, enter your password, and wait for the install. A reboot finishes the swap. There is no shell editing required.' },
      { h: 'When the Open Stack Is the Right Choice', img: 'graphics-card.jpg', alt: 'Graphics card concept',
        p1: 'For most users on integrated graphics, the open-source stack is faster, more reliable, and updates with the rest of the system. Mint defaults to it and that default is usually the right one.',
        p2: 'If you do creative work or play newer titles, the proprietary graphics driver may give you noticeably better performance — Driver Manager is the place to switch.' },
      { h: 'Beyond the Driver Manager', img: 'professional-workspace.png', alt: 'Workspace setup',
        p1: 'Some unusual hardware needs a vendor-supplied module that is not in any repository. Mint inherits Dkms from its Ubuntu base, so building such a module against your running kernel is straightforward and survives kernel updates.',
        p2: 'For everything else, the rule of thumb is "if Driver Manager does not list it, you do not need it" — Mint\'s defaults cover the overwhelming majority of consumer hardware.' },
    ],
    related: [
      ['ubuntu-driver-guide', 'Ubuntu Driver Guide', 'Mint\'s upstream and closest relative.'],
      ['debian-driver-guide', 'Debian Driver Guide', 'The deeper foundation underneath.'],
      ['dkms-explained', 'Dkms Explained', 'How vendor modules survive kernel updates.'],
    ],
  },
  {
    slug: 'opensuse-driver-guide',
    category: 'os',
    title: 'openSUSE Driver Guide — Tumbleweed and Leap',
    desc: 'How drivers work in openSUSE Tumbleweed and Leap, where vendor extras come from, and why YaST simplifies the picture.',
    eyebrow: 'Linux Driver Guides',
    h1: 'openSUSE and Drivers — Two Pace Lanes, One Approach',
    sub: 'A short guide to drivers in Tumbleweed and Leap, with notes on the YaST control centre and the SUSE-specific repositories.',
    sections: [
      { h: 'Tumbleweed Versus Leap, in One Paragraph', img: 'cpu-chip.jpg', alt: 'CPU concept',
        p1: 'Tumbleweed is rolling — the kernel and drivers move forward continuously and you get the latest in-tree drivers as the kernel team merges them. Leap is point-release based and tracks SUSE Linux Enterprise, so its kernel and drivers stay stable for the lifetime of each release.',
        p2: 'For driver coverage, Tumbleweed is best for very new hardware and Leap is best for systems where you value steady behaviour over the latest features.' },
      { h: 'YaST and the Repositories', img: 'support-pro.png', alt: 'YaST control concept',
        p1: 'YaST is openSUSE\'s control centre. It exposes the package manager, repository management, and a hardware overview. For drivers, the most useful piece is the repository panel — it lets you add the openSUSE community Packman and Nvidia repositories with a click.',
        p2: 'Once those repositories are added, installing the proprietary graphics driver, multimedia codecs, or unusual firmware is a single search-and-install in YaST.' },
      { h: 'Out-of-Tree Modules and Dkms', img: 'professional-workspace.png', alt: 'Working at desk',
        p1: 'Both Tumbleweed and Leap support Dkms for out-of-tree modules. The pattern is the same as on other Linux distributions — install the package, reboot, and the module rebuilds against new kernels automatically.',
        p2: 'For specialty hardware, the openSUSE Build Service often hosts community packages that wrap a vendor module in a proper Rpm — a tidier alternative to manual Dkms in many cases.' },
    ],
    related: [
      ['fedora-driver-guide', 'Fedora Driver Guide', 'Closely-related Rpm-based approach.'],
      ['arch-linux-driver-guide', 'Arch Linux Driver Guide', 'Rolling-release cousin.'],
      ['dkms-explained', 'Dkms Explained', 'How vendor modules survive kernel updates.'],
    ],
  },
  {
    slug: 'pop-os-driver-guide',
    category: 'os',
    title: 'Pop!_OS Driver Guide — Hardware-Friendly Defaults',
    desc: 'How Pop!_OS handles drivers — the dual ISO approach, the System76 firmware tools, and the calm hardware story.',
    eyebrow: 'Linux Driver Guides',
    h1: 'Pop!_OS and Drivers — Designed Around the Hardware',
    sub: 'A relaxed look at how Pop!_OS handles graphics drivers, hybrid laptops, and the tools System76 ships for its own machines.',
    sections: [
      { h: 'Two Installer Images, One Decision', img: 'graphics-card.jpg', alt: 'Graphics concept',
        p1: 'Pop!_OS publishes two installer images — one with the open-source graphics stack and one with the Nvidia proprietary driver bundled. Picking the right image at install time avoids the post-install switch and gets you to a working desktop on the first boot.',
        p2: 'On hybrid laptops with both an integrated and a discrete graphics chip, the Nvidia image also includes the helpers that switch between the two depending on power state.' },
      { h: 'Firmware Updates Through a Tool', img: 'support-pro.png', alt: 'Firmware tool concept',
        p1: 'For System76 hardware, Pop!_OS ships a firmware manager that surfaces firmware updates from the device maker through the same desktop notifications as software updates. For other hardware, the standard fwupd tool covers most components.',
        p2: 'Keeping firmware current often resolves issues that look like driver problems — fingerprint readers, Bluetooth radios, and storage controllers are common beneficiaries.' },
      { h: 'Dkms, Tensorman, and Specialty Tooling', img: 'professional-workspace.png', alt: 'Working with tools',
        p1: 'Pop!_OS inherits Dkms from its Ubuntu base, so vendor-supplied modules build cleanly against running kernels. For machine-learning users, Pop!_OS also ships tooling that wraps Tensorflow and Cuda environments without touching system drivers.',
        p2: 'The general feel is hardware-aware out of the box — much of the friction other distributions ask you to handle is already smoothed over.' },
    ],
    related: [
      ['ubuntu-driver-guide', 'Ubuntu Driver Guide', 'Pop!_OS upstream.'],
      ['linux-mint-driver-guide', 'Linux Mint Driver Guide', 'Friendly cousin.'],
      ['dkms-explained', 'Dkms Explained', 'How vendor modules survive kernel updates.'],
    ],
  },
  {
    slug: 'manjaro-driver-guide',
    category: 'os',
    title: 'Manjaro Driver Guide — Arch Made Friendly',
    desc: 'How Manjaro handles drivers with the Mhwd tool, when to switch graphics drivers, and how Arch heritage affects updates.',
    eyebrow: 'Linux Driver Guides',
    h1: 'Manjaro and Drivers — One Command, Most Cases',
    sub: 'A short guide to the Mhwd tool, the kernel selection panel, and the Arch heritage that powers the rest.',
    sections: [
      { h: 'Mhwd in One Paragraph', img: 'cpu-chip.jpg', alt: 'Hardware concept',
        p1: 'Manjaro Hardware Detection (Mhwd) is the tool that picks drivers for you. It scans the system, lists matching driver packages, and installs them with a single command. The Settings Manager exposes the same logic in a friendly window.',
        p2: 'For most users, running Mhwd once at install time is the entire driver story. For graphics, you can switch between open-source and proprietary stacks any time without reinstalling.' },
      { h: 'The Kernel Selection Panel', img: 'kernel-mode.jpg', alt: 'Kernel concept',
        p1: 'Manjaro lets you install multiple kernels side by side. The Settings Manager has a panel that lists current and previous releases, marks which one boots by default, and lets you remove old ones cleanly. This is unusual and very useful when a kernel update breaks a driver.',
        p2: 'You can keep an older known-good kernel installed as a fallback, switch to it from the bootloader if needed, and continue working until the new kernel is patched.' },
      { h: 'Arch Heritage in Practice', img: 'professional-workspace.png', alt: 'Documentation work',
        p1: 'Underneath, Manjaro is Arch — the Arch Wiki applies to most issues and the Aur is available for unusual packages. The difference is that Manjaro buffers the rolling updates by a week or two, so most rough edges are smoothed before they reach you.',
        p2: 'For Dkms modules from Aur, the same rebuild-on-kernel-update behaviour applies as on plain Arch.' },
    ],
    related: [
      ['arch-linux-driver-guide', 'Arch Linux Driver Guide', 'The upstream that Manjaro buffers.'],
      ['fedora-driver-guide', 'Fedora Driver Guide', 'Closely-paced rolling cousin.'],
      ['dkms-explained', 'Dkms Explained', 'How out-of-tree modules survive kernel updates.'],
    ],
  },
  {
    slug: 'macos-ventura-driver-guide',
    category: 'os',
    title: 'macOS Ventura Driver Guide — Quiet Hardware',
    desc: 'How macOS Ventura handles drivers — built-in support, system extensions, and the small number of vendor extras.',
    eyebrow: 'macOS Driver Guides',
    h1: 'macOS Ventura — Most Drivers Are Already There',
    sub: 'A short guide to how Ventura handles built-in drivers, signed system extensions, and rare vendor add-ons.',
    sections: [
      { h: 'Built-In Coverage Is the Norm', img: 'laptop.jpg', alt: 'Laptop screen',
        p1: 'macOS ships drivers for the hardware that runs on every supported Mac and the most common external accessories. For everyday use — keyboards, trackpads, audio, displays, USB drives — there is nothing to install.',
        p2: 'Plug in a typical Usb-C dock, an Sd card reader, or a Bluetooth headset, and Ventura recognises and configures it automatically.' },
      { h: 'System Extensions, Signed and Approved', img: 'kernel-mode.jpg', alt: 'System extensions concept',
        p1: 'When third-party software needs to extend the operating system — Vpn clients, network filters, certain backup tools — it does so through system extensions. These run in user space, are signed by their developer, and require explicit approval in System Settings on first install.',
        p2: 'The approval flow is short and the operating system explains what is being asked. Once approved, the extension loads automatically from then on.' },
      { h: 'Where Vendor Drivers Still Apply', img: 'professional-workspace.png', alt: 'Documentation review',
        p1: 'A small number of categories still ship vendor drivers — professional audio interfaces, large-format printers, and specialty peripherals. The maker\'s download page is the source of truth for compatibility.',
        p2: 'After installing a vendor extension, a reboot finishes the registration. The Mac App Store handles updates for many of these going forward.' },
    ],
    related: [
      ['macos-sonoma-driver-guide', 'macOS Sonoma Driver Guide', 'Newer release, same approach.'],
      ['macos-monterey-driver-guide', 'macOS Monterey Driver Guide', 'Older release reference.'],
      ['kext-vs-system-extension', 'Kext vs System Extension', 'Background on the model shift.'],
    ],
  },
  {
    slug: 'macos-monterey-driver-guide',
    category: 'os',
    title: 'macOS Monterey Driver Guide — Calm Defaults',
    desc: 'How macOS Monterey handles drivers, the kext sunset, and the small set of vendor add-ons that still apply.',
    eyebrow: 'macOS Driver Guides',
    h1: 'macOS Monterey — A Calm Driver Story',
    sub: 'A short guide for users still running Monterey: built-in coverage, the kext sunset, and the safe approach to vendor extras.',
    sections: [
      { h: 'What Comes Built In', img: 'laptop.jpg', alt: 'Laptop concept',
        p1: 'Monterey ships drivers for the hardware on every Mac it supports plus the most common external accessories. Most users never have to install a driver — keyboards, trackpads, audio, displays, and standard storage devices are all covered out of the box.',
        p2: 'External accessories that follow standard classes — Usb mass storage, Hid keyboards and mice, audio class — work the moment you plug them in.' },
      { h: 'The Kext Sunset', img: 'kernel-mode.jpg', alt: 'Driver model concept',
        p1: 'Monterey continues the multi-year transition away from kernel extensions toward user-space system extensions. New third-party drivers are expected to use the newer model. Older Kexts still load but require explicit approval and a reduced security mode.',
        p2: 'For most users this means fewer prompts and a more stable system. For those who depend on a legacy Kext-based driver, the maker\'s page should clarify whether a system extension version is available.' },
      { h: 'Where Vendor Drivers Still Apply', img: 'professional-workspace.png', alt: 'Working at desk',
        p1: 'Professional audio, large-format devices, and a small set of specialty peripherals still need maker-supplied drivers. The install flow is similar to Ventura: download, run the installer, approve in System Preferences, restart.',
        p2: 'For everything else, plugging in is the install. That is the part of the macOS story that has not changed across recent releases.' },
    ],
    related: [
      ['macos-ventura-driver-guide', 'macOS Ventura Driver Guide', 'Direct successor.'],
      ['macos-sonoma-driver-guide', 'macOS Sonoma Driver Guide', 'Two releases newer.'],
      ['kext-vs-system-extension', 'Kext vs System Extension', 'Background on the transition.'],
    ],
  },
  {
    slug: 'windows-server-driver-guide',
    category: 'os',
    title: 'Server Operating System Driver Guide',
    desc: 'How drivers work on server operating systems — signing requirements, in-box coverage, and the value of using the maker\'s build.',
    eyebrow: 'Server Driver Guides',
    h1: 'Drivers on Server Operating Systems — A Calmer World',
    sub: 'How server-class operating systems handle drivers, why signing is stricter, and where to source maker-built drivers safely.',
    sections: [
      { h: 'Stricter Signing, Calmer Rules', img: 'kernel-mode.jpg', alt: 'Server concept',
        p1: 'Server operating systems enforce driver signing more strictly than desktop ones. Unsigned drivers will refuse to load even with elevated privileges, which keeps the running system clean of unverified code.',
        p2: 'For administrators this means sourcing drivers only from the hardware maker\'s download page. The packages are signed, validated, and approved for server-class use.' },
      { h: 'In-Box Coverage and What It Misses', img: 'storage.jpg', alt: 'Server storage concept',
        p1: 'Server installs include drivers for common server hardware — Ethernet adapters, storage controllers, baseline graphics. For day-to-day operation that is enough, but specific server models often need maker-built drivers to expose full features.',
        p2: 'Examples include hardware Raid controllers, advanced network teaming, and out-of-band management interfaces. The maker\'s "support pack" usually wraps these into a single coherent install.' },
      { h: 'Update Cadence and Stability', img: 'professional-workspace.png', alt: 'Server room concept',
        p1: 'Server drivers update less often than desktop ones — by design. Once a configuration is validated, administrators tend to leave it alone unless a known issue requires action.',
        p2: 'When updates are needed, the maker often publishes coordinated firmware-and-driver bundles. Applying both at once keeps the system in a known-good state and avoids subtle mismatch problems.' },
    ],
    related: [
      ['driver-signing-explained', 'Driver Signing Explained', 'Why server platforms enforce so strictly.'],
      ['signed-vs-unsigned-drivers', 'Signed vs Unsigned Drivers', 'Background on the security model.'],
      ['firmware-vs-driver', 'Firmware vs Driver', 'Why server vendors bundle both.'],
    ],
  },

  // ---------- FIX WALKTHROUGHS (10) ----------
  {
    slug: 'fix-mouse-not-responding',
    category: 'fix',
    title: 'Fix: Mouse Not Responding',
    desc: 'A calm walkthrough for an unresponsive mouse — battery, port, driver, and the order to try them in.',
    eyebrow: 'Fix Walkthrough',
    h1: 'Fix: When the Mouse Stops Responding',
    sub: 'A short, friendly checklist for an unresponsive mouse, in the order most likely to solve it quickly.',
    sections: [
      { h: 'Start With the Boring Things', img: 'input.jpg', alt: 'Mouse on desk',
        p1: 'Before assuming a driver issue, check the basics. For a wireless mouse, swap the batteries or charge it for a few minutes. For a wired one, try a different Usb port — preferably one directly on the system, not on a hub.',
        p2: 'A surprising fraction of "driver" reports turn out to be a flat battery, a tired Usb port, or a cable that has worked itself loose. Two minutes of swapping rules these out.' },
      { h: 'Re-Detect the Device', img: 'support-pro.png', alt: 'Reading device list',
        p1: 'If the basics check out, open Device Manager (you can navigate with the keyboard if needed), find the entry for the mouse, and right-click it. Choose "Scan for hardware changes" to force a re-detection cycle.',
        p2: 'For Bluetooth mice, remove the device from the Bluetooth panel, then pair it again. Stale pairing data is a common reason a working mouse stops being recognised after an operating system update.' },
      { h: 'Refresh the Driver Cleanly', img: 'professional-workspace.png', alt: 'Calm troubleshooting',
        p1: 'If the mouse is still unresponsive, uninstall its entry in Device Manager and reboot. The operating system will redetect the device and load a fresh copy of its driver from the driver store. For most generic mice this is enough.',
        p2: 'For high-end mice with their own utility software, reinstalling that utility from the maker\'s page often fixes button-mapping issues that survive a basic driver refresh.' },
    ],
    related: [
      ['fix-keyboard-not-typing', 'Fix: Keyboard Not Typing', 'Adjacent input-device walkthrough.'],
      ['driver-input-devices', 'Input Device Drivers', 'Background on Hid and friends.'],
      ['fix-usb-not-recognised', 'Fix: Usb Not Recognised', 'When the port is the issue.'],
    ],
  },
  {
    slug: 'fix-keyboard-not-typing',
    category: 'fix',
    title: 'Fix: Keyboard Not Typing',
    desc: 'A calm walkthrough for a keyboard that types nothing — connection, layout, driver, in that order.',
    eyebrow: 'Fix Walkthrough',
    h1: 'Fix: When the Keyboard Stops Typing',
    sub: 'Practical checklist for the most common reasons a keyboard goes silent, with calm steps to bring it back.',
    sections: [
      { h: 'Connection Before Configuration', img: 'input.jpg', alt: 'Keyboard on desk',
        p1: 'For wired keyboards, try a different Usb port — directly on the system if possible. For wireless ones, check the receiver is in a Usb port that has not gone to sleep, and confirm batteries are charged.',
        p2: 'Mechanical keyboards with detachable cables are particularly prone to a working-loose Usb-C connector. Reseating the cable on both ends takes ten seconds and resolves a surprising number of cases.' },
      { h: 'Check the Layout, Not Just the Driver', img: 'support-pro.png', alt: 'Reading settings',
        p1: 'A keyboard that types unexpected characters or seems to ignore some keys is often experiencing a layout mismatch rather than a driver issue. Open the language and input panel and confirm the active layout matches the physical layout of your keyboard.',
        p2: 'Switching layouts mid-session can be a single keystroke combination, so an accidental change is easy. Returning to the right layout in the panel restores normal typing immediately.' },
      { h: 'Refresh the Driver Cleanly', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'If the keyboard genuinely is not registering keystrokes after the connection is solid, uninstall the entry in Device Manager and reboot. The next boot redetects the device and loads a fresh driver, which clears most stuck state.',
        p2: 'For gaming keyboards with companion software, reinstalling the companion utility often resolves macro and lighting issues that the basic driver refresh leaves untouched.' },
    ],
    related: [
      ['fix-mouse-not-responding', 'Fix: Mouse Not Responding', 'Sister input-device walkthrough.'],
      ['driver-input-devices', 'Input Device Drivers', 'Background on Hid keyboards.'],
      ['fix-keyboard-backlight', 'Fix: Keyboard Backlight', 'Adjacent walkthrough.'],
    ],
  },
  {
    slug: 'fix-display-driver-stopped-responding',
    category: 'fix',
    title: 'Fix: Display Driver Stopped Responding',
    desc: 'Why a graphics driver pauses and recovers, what causes the cycle, and how to make it happen less often.',
    eyebrow: 'Fix Walkthrough',
    h1: 'Fix: When the Display Driver Pauses and Recovers',
    sub: 'A friendly walkthrough of the timeout-and-recover cycle and the small number of root causes that produce it.',
    sections: [
      { h: 'What That Notification Means', img: 'graphics-card.jpg', alt: 'Graphics card concept',
        p1: 'Modern graphics drivers have a built-in safety net. If the driver stops responding for a few seconds, the operating system resets it rather than letting the screen freeze. You see a brief black flash and a notification that the driver was reset.',
        p2: 'A single occurrence is usually nothing — a heavy frame in a game, a power glitch, a momentary scheduling hiccup. Repeated occurrences point at a real cause worth investigating.' },
      { h: 'The Usual Suspects', img: 'cpu-chip.jpg', alt: 'Graphics chip closeup',
        p1: 'Heat is a common culprit. A laptop running with restricted airflow or a desktop with dusty intakes can push the graphics chip to throttle, and an overshoot triggers the timeout. Cleaning vents and giving the system room to breathe often resolves it.',
        p2: 'Another common cause is a recent driver update that does not agree with a specific application. Rolling back to the previous driver and waiting for the next release is a calm response in this case.' },
      { h: 'A Calm Sequence to Try', img: 'professional-workspace.png', alt: 'Working at desk',
        p1: 'First, update to the latest driver from your card maker\'s download page — most timeout issues are resolved in regular driver updates. Second, check that the system is not overheating with a free temperature monitor.',
        p2: 'If the cycle continues only with one specific application, the application or its plug-ins are the most likely cause. The maker\'s support forum often has a known-issue thread with workaround steps.' },
    ],
    related: [
      ['fix-screen-flicker', 'Fix: Screen Flicker', 'Adjacent display walkthrough.'],
      ['graphics-drivers', 'Graphics Drivers', 'Foundation knowledge.'],
      ['nvidia-graphics-drivers', 'Nvidia Graphics Drivers', 'Vendor-specific notes.'],
    ],
  },
  {
    slug: 'fix-bluetooth-pairing-fails',
    category: 'fix',
    title: 'Fix: Bluetooth Pairing Fails',
    desc: 'Why pairing sometimes does not complete, the small set of root causes, and the steps that fix nine cases out of ten.',
    eyebrow: 'Fix Walkthrough',
    h1: 'Fix: When Bluetooth Pairing Will Not Complete',
    sub: 'A short, friendly walkthrough for pairing flows that get stuck partway through, with the most reliable fixes first.',
    sections: [
      { h: 'Put the Device in Pairing Mode, Then Wait', img: 'bluetooth.jpg', alt: 'Bluetooth concept',
        p1: 'Bluetooth pairing mode is usually a short window — sixty to ninety seconds. If you start the pairing flow on the system before the device is in pairing mode, the device will not appear in the list. Always trigger pairing on the device first, then start the search on the system.',
        p2: 'Headphones and earbuds often need a long press of the power button (five to ten seconds) rather than a tap. Refer to the device\'s quick-start guide for the exact gesture.' },
      { h: 'Clear the Cache and Try Again', img: 'support-pro.png', alt: 'Reading device list',
        p1: 'If pairing fails repeatedly, remove any half-paired entries for the device from the Bluetooth panel before trying again. A leftover entry from a failed previous attempt can confuse the next try.',
        p2: 'On the device side, "factory reset" or "clear pairing list" gestures are well-documented in the maker\'s instructions. Doing both sides clears any one-sided memory and gives the next attempt a fresh start.' },
      { h: 'Check Radio Coexistence', img: 'professional-workspace.png', alt: 'Workspace setup',
        p1: 'Bluetooth shares the 2.4GHz band with Wi-Fi. On laptops with an older combo radio, heavy Wi-Fi traffic can prevent pairing from completing. Pausing Wi-Fi for the pairing attempt sometimes resolves it.',
        p2: 'Updating the Bluetooth driver from the laptop maker\'s page often improves coexistence behaviour and resolves pairing issues that come and go without an obvious pattern.' },
    ],
    related: [
      ['fix-bluetooth-not-working', 'Fix: Bluetooth Not Working', 'Adjacent walkthrough.'],
      ['driver-bluetooth', 'Bluetooth Drivers', 'Foundation knowledge.'],
      ['fix-headphones-not-detected', 'Fix: Headphones Not Detected', 'When the device pairs but no audio.'],
    ],
  },
  {
    slug: 'fix-no-wifi-after-update',
    category: 'fix',
    title: 'Fix: No Wi-Fi After an Update',
    desc: 'Why an update can leave Wi-Fi missing, the safe ways to recover, and how to avoid the same situation next time.',
    eyebrow: 'Fix Walkthrough',
    h1: 'Fix: Wi-Fi Missing After an Update',
    sub: 'A calm walkthrough for the worst-time-possible Wi-Fi outage, with a recovery path that does not need an internet connection.',
    sections: [
      { h: 'Why Updates Sometimes Cause This', img: 'network.jpg', alt: 'Network adapter concept',
        p1: 'Operating system updates occasionally include a newer driver for the Wi-Fi adapter. If that newer driver is not yet a perfect fit for your specific card, the result is no Wi-Fi until you address it.',
        p2: 'It is rarely a hardware issue — the card is fine. The fix is usually to roll back to the previous driver, wait for a corrected one, or fetch a maker-built driver and install it offline.' },
      { h: 'Roll Back the Driver First', img: 'support-pro.png', alt: 'Reviewing settings',
        p1: 'Open Device Manager, find the Wi-Fi adapter, open Properties, and switch to the Driver tab. If "Roll Back Driver" is available, that returns the previous version with a single click. A reboot finishes the swap and Wi-Fi typically returns.',
        p2: 'If the rollback option is not available, the previous driver is no longer cached. In that case the next step is fetching the maker-built driver on another device and copying it across.' },
      { h: 'When You Need a Driver and Have No Wi-Fi', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'Use a phone, tablet, or another computer to download the Wi-Fi driver from your laptop maker\'s page. Save it to a Usb drive and copy it to the affected machine. Run the installer, reboot, and Wi-Fi should be back.',
        p2: 'For future protection, keep a copy of your current Wi-Fi driver saved to a Usb drive — the next time an update misbehaves, the recovery path is already prepared.' },
    ],
    related: [
      ['fix-wifi-drops', 'Fix: Wi-Fi Drops', 'Closely related walkthrough.'],
      ['network-drivers', 'Network Drivers', 'Foundation knowledge.'],
      ['roll-back-driver', 'Roll Back a Driver', 'How to use the rollback option.'],
    ],
  },
  {
    slug: 'fix-sleep-mode-not-working',
    category: 'fix',
    title: 'Fix: Sleep Mode Not Working',
    desc: 'Why a system refuses to sleep, the small set of common root causes, and a calm path to restoring proper sleep.',
    eyebrow: 'Fix Walkthrough',
    h1: 'Fix: When the System Will Not Sleep',
    sub: 'A short, friendly walkthrough for sleep that fails to engage or wakes immediately afterwards.',
    sections: [
      { h: 'A Wake Source Is Usually the Reason', img: 'kernel-mode.jpg', alt: 'Power management concept',
        p1: 'When a system refuses to sleep, or wakes up immediately, almost always something is asking it to stay awake. The operating system records this in a wake-source list — common entries are network adapters set to wake on incoming traffic, Usb devices that present activity, and timers from background services.',
        p2: 'The fix is to identify the source and disable the offending wake permission. Most systems have a "powercfg" or equivalent utility that prints the current wake-source list.' },
      { h: 'Common Wake Sources to Check', img: 'support-pro.png', alt: 'Reviewing power settings',
        p1: 'Wake on Lan, set on the Ethernet adapter, is a frequent culprit on desktops. Most home users do not need it and disabling it allows sleep to engage. Wireless mice with sensitive sensors can also prevent sleep — moving the mouse to a flat surface helps.',
        p2: 'Some scheduled tasks request wake permission to run maintenance. The Task Scheduler shows which tasks have this flag and lets you remove it for any you do not need.' },
      { h: 'When the Driver Itself Is the Problem', img: 'professional-workspace.png', alt: 'Calm troubleshooting',
        p1: 'Storage drivers and graphics drivers occasionally hold the system awake by reporting activity even when idle. Updating both from the maker\'s page often resolves stubborn cases. A roll-back is appropriate if the issue began with a recent update.',
        p2: 'For laptops, the maker often ships a "modern standby" tuning utility — installing it from their page restores expected sleep behaviour on hardware designed for that mode.' },
    ],
    related: [
      ['fix-slow-after-update', 'Fix: Slow After an Update', 'Adjacent walkthrough.'],
      ['driver-storage-disk', 'Storage Drivers', 'Foundation knowledge.'],
      ['driver-chipset', 'Chipset Drivers', 'How power management is exposed.'],
    ],
  },
  {
    slug: 'fix-laptop-fan-loud',
    category: 'fix',
    title: 'Fix: Laptop Fan Loud',
    desc: 'A calm walkthrough for a laptop that runs the fan at full speed — drivers, dust, profiles, and the order to try them.',
    eyebrow: 'Fix Walkthrough',
    h1: 'Fix: When the Laptop Fan Is Always Loud',
    sub: 'Practical checklist for fans that run at top speed all the time, with the most likely fixes ordered first.',
    sections: [
      { h: 'Background Activity Before Hardware', img: 'cpu-chip.jpg', alt: 'CPU concept',
        p1: 'Open the task list and sort by CPU. A consistently loud fan almost always traces back to a process pinning a core. Common culprits are background indexing, an updater stuck in a loop, or a browser tab running heavy scripts.',
        p2: 'Pausing or quitting the offending process gives the fan a chance to slow down within a minute or two. If a particular process is responsible every day, look in its settings for a scheduling option.' },
      { h: 'Power Plan and Fan Profile', img: 'support-pro.png', alt: 'Reading settings',
        p1: 'Many laptops ship with vendor utilities that expose a power-and-fan profile. Switching from "Performance" to "Balanced" or "Quiet" can change the fan curve dramatically without affecting everyday work.',
        p2: 'Operating system power plans set the upper bound for processor frequency. Reducing the maximum to ninety-nine percent disables turbo and often produces a noticeably quieter system.' },
      { h: 'Dust and Drivers Together', img: 'professional-workspace.png', alt: 'Calm laptop setup',
        p1: 'Dusty intakes are the silent cause of loud fans. A can of compressed air, used carefully and with the laptop off, restores airflow and lets the fan slow down. Do this with the system unplugged.',
        p2: 'On the driver side, an out-of-date chipset driver can mismanage power states. Updating the chipset driver from the laptop maker\'s page sometimes lowers idle power and quiets the fan as a side effect.' },
    ],
    related: [
      ['fix-battery-not-charging', 'Fix: Battery Not Charging', 'Adjacent power walkthrough.'],
      ['driver-chipset', 'Chipset Drivers', 'Why these drivers affect power.'],
      ['fix-slow-after-update', 'Fix: Slow After an Update', 'Related performance walkthrough.'],
    ],
  },
  {
    slug: 'fix-battery-not-charging',
    category: 'fix',
    title: 'Fix: Battery Not Charging',
    desc: 'Why a laptop battery may stop charging, the small set of likely causes, and the calm sequence of fixes to try.',
    eyebrow: 'Fix Walkthrough',
    h1: 'Fix: When the Battery Will Not Charge',
    sub: 'A short, friendly walkthrough for batteries that show "plugged in, not charging" or refuse to take a charge at all.',
    sections: [
      { h: 'Hardware Before Software', img: 'laptop.jpg', alt: 'Laptop concept',
        p1: 'Try a different power adapter and a different outlet first. A worn cable or a brick that no longer delivers full wattage can present as "not charging" while the system still runs. The simplest test is a known-good adapter from the same maker.',
        p2: 'If the laptop accepts another adapter and starts charging, the original adapter or its cable is the cause. Replacement adapters from the maker are inexpensive insurance.' },
      { h: 'The Charging Driver Layer', img: 'kernel-mode.jpg', alt: 'Power driver concept',
        p1: 'Modern laptops expose the battery to the operating system through a small driver. If that driver gets confused, the battery icon may show "not charging" even though the battery is healthy and the adapter is fine.',
        p2: 'In Device Manager, expand Batteries. Uninstall the "control method battery" entry, then restart. The operating system reinstalls it cleanly on next boot, which often clears the false alarm.' },
      { h: 'Battery Health and Vendor Tools', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'Generate a battery report through the operating system\'s built-in tool. The report shows full-charge capacity versus design capacity. If full-charge capacity has dropped below sixty percent of design, the battery itself is at end of life.',
        p2: 'Most laptop makers ship a battery health utility that exposes more detail and offers calibration cycles. Their support page also lists the official replacement procedure for in-warranty machines.' },
    ],
    related: [
      ['fix-laptop-fan-loud', 'Fix: Laptop Fan Loud', 'Adjacent power walkthrough.'],
      ['driver-chipset', 'Chipset Drivers', 'Background on power exposure.'],
      ['fix-sleep-mode-not-working', 'Fix: Sleep Mode Not Working', 'Closely related power topic.'],
    ],
  },
  {
    slug: 'fix-second-display-no-signal',
    category: 'fix',
    title: 'Fix: Second Display Shows No Signal',
    desc: 'A calm walkthrough for a second monitor that stays dark — cable, port, source, and driver, in that order.',
    eyebrow: 'Fix Walkthrough',
    h1: 'Fix: When the Second Display Stays Dark',
    sub: 'Practical checklist for the always-confusing "no signal" message on a perfectly good monitor.',
    sections: [
      { h: 'Cable, Port, Source — Always First', img: 'graphics-card.jpg', alt: 'Display port concept',
        p1: 'Try a different cable. Try a different port on the system. Try a different input on the monitor. Two of these three are nearly always the cause when "no signal" appears on a monitor that worked yesterday.',
        p2: 'For Hdmi, downgrading from a 4K-rated cable to a known-good Hdmi 1.4 cable temporarily isolates whether bandwidth is the problem.' },
      { h: 'The Operating System Side', img: 'support-pro.png', alt: 'Reading display settings',
        p1: 'Open the display settings panel and click "Detect" — the operating system sometimes does not notice a monitor that was connected after boot. If detection succeeds, the monitor is fine and the previous failure was a hot-plug issue.',
        p2: 'Check the resolution and refresh rate set for the second monitor. A rate the monitor cannot accept causes the same "no signal" message a bad cable would. Drop to a safer combination first, then ramp up.' },
      { h: 'When the Driver Side Is Suspect', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'Update the graphics driver from the card maker\'s download page. Many "no signal" cases on second displays trace back to a driver that does not yet support a specific monitor or hub.',
        p2: 'For laptops with discrete graphics, confirm which output port is wired to which graphics chip. Some ports are wired only to the integrated chip, which may not be active in the current power profile.' },
    ],
    related: [
      ['fix-external-monitor-not-detected', 'Fix: External Monitor Not Detected', 'Sister walkthrough.'],
      ['fix-second-monitor-blurry', 'Fix: Second Monitor Blurry', 'Resolution-side cousin.'],
      ['graphics-drivers', 'Graphics Drivers', 'Background on the driver layer.'],
    ],
  },
  {
    slug: 'fix-audio-static-noise',
    category: 'fix',
    title: 'Fix: Audio Static or Hiss',
    desc: 'Why audio sometimes carries static or hiss, the most likely root causes, and a calm path to clean playback.',
    eyebrow: 'Fix Walkthrough',
    h1: 'Fix: When Audio Comes Through With Static',
    sub: 'A short, friendly walkthrough for audio that has a constant hiss, occasional static, or repeating clicks.',
    sections: [
      { h: 'Cable and Connection First', img: 'audio.jpg', alt: 'Audio cable concept',
        p1: 'Try a different cable, a different jack, or — for headsets — a different Usb port. Half of all "audio static" reports trace to a cable on the way out or a jack with poor contact.',
        p2: 'For Bluetooth audio, signal strength is everything. A short walk closer to the source often clears static-style artefacts that turn out to be radio dropouts.' },
      { h: 'Sample Rate and Format', img: 'support-pro.png', alt: 'Reading audio settings',
        p1: 'In the audio device properties, the playback format is configurable. A mismatch — for example a Usb headset rated for 48 kHz being asked to play at 96 kHz — can introduce subtle hiss. Setting the format to a value the device clearly supports often clears it.',
        p2: 'Disabling exclusive-mode access and audio enhancements is also worth trying. Either of those layers can introduce artefacts on certain content.' },
      { h: 'Driver and Layout Refresh', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'Update the audio driver from the laptop or motherboard maker\'s page. The chipset-bundled audio driver is usually the right one rather than a generic class driver, and it often resolves stubborn static issues.',
        p2: 'If the noise is only on a specific application, the issue is more likely to be in that application\'s audio path. Reinstalling the application or its audio plug-ins is a calm next step.' },
    ],
    related: [
      ['fix-no-sound', 'Fix: No Sound', 'Sister audio walkthrough.'],
      ['audio-drivers', 'Audio Drivers', 'Foundation knowledge.'],
      ['realtek-audio-drivers', 'Realtek Audio Drivers', 'Most common audio chip family.'],
    ],
  },

  // ---------- DEEP-DIVE CONCEPT EXPLAINERS (10) ----------
  {
    slug: 'driver-package-anatomy',
    category: 'concept',
    title: 'Driver Package Anatomy — Inside the Install',
    desc: 'What is inside a driver package — Inf, Cat, Sys, support files — and why each piece matters during install and load.',
    eyebrow: 'Driver Concepts',
    h1: 'Driver Package Anatomy — A Tour Inside an Install',
    sub: 'A friendly look at the files that travel together as a driver package, and what each one does.',
    sections: [
      { h: 'The Three Headline Files', img: 'storage.jpg', alt: 'File package concept',
        p1: 'A typical driver package contains an Inf file, a Cat file, and one or more Sys files. The Inf is the description: it tells the operating system which devices the package covers, where to put which files, and which registry keys to write. The Cat is the catalogue of digital signatures.',
        p2: 'The Sys files are the drivers themselves — the actual code that runs once the operating system loads the package. Everything else in the folder supports these three.' },
      { h: 'What Else Is in the Folder', img: 'support-pro.png', alt: 'Reading file list',
        p1: 'Larger packages also include Dll files for user-mode helpers, image and Xml resources for the install user interface, and documentation. None of these are required for the device to function — they support the install experience and runtime helpers.',
        p2: 'Vendor utility software (control panels, monitoring tools) may travel in the same archive but is technically separate from the driver itself. The operating system can install the driver without the utility, and vice versa.' },
      { h: 'How the Pieces Come Together', img: 'professional-workspace.png', alt: 'Working with files',
        p1: 'When you run the installer, it copies files into a staging folder and asks the operating system to install the package. The operating system reads the Inf, validates against the Cat, copies Sys files to the system folder, writes registry entries, and tells matching devices to bind to the new driver.',
        p2: 'Understanding this flow helps with troubleshooting — when a device shows a code, the issue is usually one specific step in this sequence rather than the whole package being bad.' },
    ],
    related: [
      ['inf-files-explained', 'Inf Files Explained', 'Deep dive on the description file.'],
      ['driver-signing-explained', 'Driver Signing Explained', 'Where the Cat fits in.'],
      ['driver-store-explained', 'Driver Store Explained', 'Where staged packages live.'],
    ],
  },
  {
    slug: 'driver-isolation-explained',
    category: 'concept',
    title: 'Driver Isolation — Less Shared Mess',
    desc: 'What driver isolation means, why operating systems push for it, and how it changes the way drivers run side by side.',
    eyebrow: 'Driver Concepts',
    h1: 'Driver Isolation — Why Drivers Live in Their Own Lane',
    sub: 'A friendly look at the move toward isolated drivers and what it means for stability and updates.',
    sections: [
      { h: 'The Old Shared Approach', img: 'kernel-mode.jpg', alt: 'Driver layers concept',
        p1: 'For a long time, drivers shared more with the rest of the system than was strictly necessary. They wrote configuration into shared registry hives, dropped helpers into the system folder, and assumed other drivers behaved well. When one misbehaved, the effects spread.',
        p2: 'Isolation is the principle of giving each driver its own quiet corner — its own configuration block, its own private files, and a clear boundary around what it can touch.' },
      { h: 'What Isolation Looks Like in Practice', img: 'cpu-chip.jpg', alt: 'Component isolation',
        p1: 'Modern driver packages put their files in their own folder rather than sprinkling them through the system folder. They register their configuration under a key that belongs to their package only. They run in a constrained environment that limits the surface area for accidents.',
        p2: 'For users, the visible benefit is that uninstalling one driver no longer leaves behind a trail of files for other drivers to trip over.' },
      { h: 'Why It Matters During Updates', img: 'professional-workspace.png', alt: 'Calm troubleshooting',
        p1: 'Isolated drivers can be replaced atomically — the old version comes out, the new version goes in, and there is no shared state for the swap to disturb. That is one reason graphics driver updates have become much smoother over the last several releases.',
        p2: 'For administrators, isolation also makes it possible to roll back a single driver without touching anything else, which keeps the rest of the system stable during the recovery.' },
    ],
    related: [
      ['driver-package-anatomy', 'Driver Package Anatomy', 'What lives inside a package.'],
      ['driver-store-explained', 'Driver Store Explained', 'Where isolated packages live.'],
      ['driver-user-mode', 'User-Mode Drivers', 'A more isolated driver tier.'],
    ],
  },
  {
    slug: 'driver-version-numbers',
    category: 'concept',
    title: 'Driver Version Numbers — What They Mean',
    desc: 'What the four numbers in a driver version tell you, why they jump around, and how to compare versions sensibly.',
    eyebrow: 'Driver Concepts',
    h1: 'Driver Version Numbers — A Friendly Decode',
    sub: 'A short look at the four-part driver version, what each part typically signals, and how to compare them.',
    sections: [
      { h: 'The Four Parts in One Paragraph', img: 'support-pro.png', alt: 'Reading version info',
        p1: 'Driver versions are usually four numbers separated by dots — major, minor, build, revision. Maker conventions vary, but the typical pattern is that the first two parts move slowly (year or platform release), the third reflects a build branch, and the fourth is a small revision counter inside that branch.',
        p2: 'When two versions look surprisingly different, it is usually the third number that has changed. The first two are often constant for a long stretch of releases.' },
      { h: 'When Higher Is Not Better', img: 'kernel-mode.jpg', alt: 'Version concept',
        p1: 'It is tempting to assume the highest version is always best. In practice, makers branch their drivers — there may be a "studio" branch optimised for steady behaviour and a "game-ready" branch optimised for the latest titles, with different versions in each.',
        p2: 'The highest number on the maker\'s page is usually the right one for general use. For specific use cases, the maker\'s release notes are the source of truth.' },
      { h: 'Comparing Versions Sensibly', img: 'professional-workspace.png', alt: 'Documentation review',
        p1: 'When troubleshooting, check the driver version in Device Manager and compare it to the latest on the maker\'s page. If yours is older, an update may be appropriate. If yours is newer, you may be on a beta branch — switching to the stable branch can be the right move.',
        p2: 'For Linux modules, the version is the kernel module version printed by Modinfo. Maker repositories usually list the corresponding distro package versions on their support page.' },
    ],
    related: [
      ['driver-package-anatomy', 'Driver Package Anatomy', 'What ships with each version.'],
      ['when-to-update-drivers', 'When to Update Drivers', 'Decision framework.'],
      ['when-not-to-update-drivers', 'When NOT to Update Drivers', 'Counterpoint.'],
    ],
  },
  {
    slug: 'msi-vs-msi-x-interrupts',
    category: 'concept',
    title: 'Msi vs Msi-X Interrupts — Driver Internals',
    desc: 'What message-signalled interrupts are, the difference between Msi and Msi-X, and why drivers care about the choice.',
    eyebrow: 'Driver Concepts',
    h1: 'Msi vs Msi-X Interrupts — The Quiet Modernisation',
    sub: 'A short, friendly explainer of how modern devices signal the operating system and why drivers prefer the newer style.',
    sections: [
      { h: 'How Devices Used to Get Attention', img: 'cpu-chip.jpg', alt: 'CPU interrupts concept',
        p1: 'Older devices got the operating system\'s attention by toggling a dedicated wire — an interrupt request line. The lines were shared, hand-out was complex, and a misbehaving device could affect everyone on the same line.',
        p2: 'Message-signalled interrupts replace the wire with a memory write. The device writes a small value to a special address; the system sees the write and runs the right handler. Cleaner, faster, and naturally per-device.' },
      { h: 'Msi vs Msi-X', img: 'kernel-mode.jpg', alt: 'Driver concept',
        p1: 'Msi gives a device up to thirty-two interrupt vectors but they must be allocated as a contiguous block. Msi-X allows up to two thousand and forty-eight vectors, each independently configured. For multi-queue devices like high-end network adapters and Nvme drives, Msi-X is essential.',
        p2: 'A modern driver checks what the device supports and asks for Msi-X first, falling back to Msi and then legacy lines only if neither newer style is available.' },
      { h: 'Why Drivers Care', img: 'professional-workspace.png', alt: 'Documentation review',
        p1: 'With Msi-X, each queue on a multi-queue device can interrupt a different processor core. Network drivers spread incoming traffic across cores; storage drivers spread completions; the result is far better scaling under load.',
        p2: 'A driver that incorrectly falls back to legacy interrupts on hardware that supports Msi-X can be the silent cause of poor performance — Device Manager properties show which mode is in use for any given driver.' },
    ],
    related: [
      ['driver-chipset', 'Chipset Drivers', 'Foundation for interrupt routing.'],
      ['pcie-driver-basics', 'PCIe Driver Basics', 'Bus underneath modern interrupts.'],
      ['driver-kernel-mode', 'Kernel-Mode Drivers', 'Where interrupt handlers run.'],
    ],
  },
  {
    slug: 'dma-and-drivers',
    category: 'concept',
    title: 'Dma and Drivers — Letting Hardware Move Data',
    desc: 'What direct memory access is, why drivers set it up, and how the protections around it have grown over time.',
    eyebrow: 'Driver Concepts',
    h1: 'Dma and Drivers — When Hardware Moves Data Itself',
    sub: 'A friendly explainer of direct memory access — why it is fast, what drivers do to enable it, and how it is kept safe.',
    sections: [
      { h: 'Why Dma Exists', img: 'storage.jpg', alt: 'Memory transfer concept',
        p1: 'Without direct memory access, every byte that moves between a device and main memory passes through the processor. That is fine for small amounts of data but a poor use of the processor for bulk transfers.',
        p2: 'Dma lets the device move data directly. The driver sets up a transfer description in memory and tells the device "go do this." The processor is free to do other work until the device signals completion.' },
      { h: 'How a Driver Sets Up a Transfer', img: 'kernel-mode.jpg', alt: 'Driver concept',
        p1: 'The driver allocates a buffer, gets its physical address, and hands the address to the device. The device reads or writes the buffer using its own bus master capability. When done, it signals an interrupt — usually Msi or Msi-X on modern hardware.',
        p2: 'The driver then maps the result back into the requesting process, completes the request, and the data is delivered. For high-throughput devices this happens millions of times per second.' },
      { h: 'Iommus and the Safety Story', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'Modern systems include an input-output memory management unit. It sits between devices and main memory, ensuring that a device can only read and write addresses the operating system has explicitly granted it. This neutralises a whole class of accidental and deliberate overreach.',
        p2: 'For driver developers it adds a small amount of bookkeeping. For users it is mostly invisible — but it is the reason that recent systems handle the most aggressive Dma scenarios without trouble.' },
    ],
    related: [
      ['msi-vs-msi-x-interrupts', 'Msi vs Msi-X Interrupts', 'Adjacent driver internals.'],
      ['driver-storage-disk', 'Storage Drivers', 'Heaviest Dma users.'],
      ['driver-kernel-mode', 'Kernel-Mode Drivers', 'Where Dma handlers live.'],
    ],
  },
  {
    slug: 'pcie-driver-basics',
    category: 'concept',
    title: 'PCIe Driver Basics — The Bus Beneath',
    desc: 'What the PCIe bus exposes, how drivers attach, and why generation and lane count matter for some devices.',
    eyebrow: 'Driver Concepts',
    h1: 'PCIe Driver Basics — The Bus That Carries Most Modern Hardware',
    sub: 'A short explainer of the PCIe bus from a driver-author point of view — capabilities, lanes, generations, and link training.',
    sections: [
      { h: 'What the Bus Exposes', img: 'cpu-chip.jpg', alt: 'PCIe slot concept',
        p1: 'PCIe gives every attached device a small block of configuration space — vendor and device identifiers, class codes, and a list of capabilities the device supports. Drivers read this block to decide whether to attach and which features to enable.',
        p2: 'Once a driver attaches, it talks to the device through one or more memory-mapped registers and through Dma transfers. The bus also handles power management and reset signals on behalf of the driver.' },
      { h: 'Lanes and Generations', img: 'graphics-card.jpg', alt: 'Lane width concept',
        p1: 'PCIe links come in widths — one, four, eight, sixteen lanes. Each generation roughly doubles the per-lane bandwidth. A device negotiates with the slot at boot to pick the best width and generation both ends support.',
        p2: 'For some devices the link width is critical — a graphics card pinched into a four-lane slot performs noticeably worse than the same card in a sixteen-lane slot. For others, like most network adapters, the link is rarely the bottleneck.' },
      { h: 'When the Driver Notices Link Issues', img: 'professional-workspace.png', alt: 'Reading link state',
        p1: 'Drivers expose link width and generation through their properties. If a device negotiates a lower link than expected, the driver can warn — common causes are a slot that physically supports fewer lanes than it looks, or a Bios setting that splits lanes between slots.',
        p2: 'For Nvme drives in particular, link state is worth a check — a fast drive in a slow slot is a common source of unexpected throughput numbers.' },
    ],
    related: [
      ['driver-chipset', 'Chipset Drivers', 'How the chipset exposes PCIe.'],
      ['msi-vs-msi-x-interrupts', 'Msi vs Msi-X Interrupts', 'How PCIe devices signal events.'],
      ['driver-storage-disk', 'Storage Drivers', 'Common PCIe drivers in practice.'],
    ],
  },
  {
    slug: 'acpi-and-drivers',
    category: 'concept',
    title: 'Acpi and Drivers — Power and Devices',
    desc: 'What Acpi describes, how drivers use it for power management, and why Bios tables matter for driver behaviour.',
    eyebrow: 'Driver Concepts',
    h1: 'Acpi and Drivers — How the System Talks About Itself',
    sub: 'A short explainer of the Advanced Configuration and Power Interface — what it describes and how drivers use it.',
    sections: [
      { h: 'What Acpi Provides', img: 'kernel-mode.jpg', alt: 'Acpi concept',
        p1: 'Acpi is a description provided by firmware for the operating system to read at boot. It lists the devices on the platform that are not auto-discoverable, the power states each one supports, and the methods to switch between states.',
        p2: 'Without Acpi, the operating system would have to guess about platform-specific devices like the embedded controller, the lid switch, or the power button. With it, drivers know exactly what is there and how to control it.' },
      { h: 'How Drivers Use Acpi Methods', img: 'cpu-chip.jpg', alt: 'Power management concept',
        p1: 'Drivers call Acpi methods to put their devices into low-power states, to wake them, to read sensors, and to handle hot-plug events. The methods are described in firmware tables and executed by an interpreter inside the operating system.',
        p2: 'When the operating system tells a device to suspend, it is often executing an Acpi method on the driver\'s behalf. The result is consistent power management across very different hardware platforms.' },
      { h: 'When Acpi Tables Are the Issue', img: 'professional-workspace.png', alt: 'Documentation review',
        p1: 'Buggy Acpi tables in firmware can cause devices to misbehave on suspend, wake at unexpected times, or report wrong sensor values. Bios updates from the system maker are the right way to address these — operating system patches sometimes work around them but cannot rewrite them.',
        p2: 'For Linux users, the dmesg output at boot lists Acpi-related warnings. Persistent ones often correlate with known issues that the system maker has acknowledged on their support page.' },
    ],
    related: [
      ['driver-chipset', 'Chipset Drivers', 'Closely related platform layer.'],
      ['firmware-vs-driver', 'Firmware vs Driver', 'How the two layers interact.'],
      ['fix-sleep-mode-not-working', 'Fix: Sleep Mode Not Working', 'Common Acpi-related symptom.'],
    ],
  },
  {
    slug: 'firmware-vs-driver',
    category: 'concept',
    title: 'Firmware vs Driver — Two Layers, One Device',
    desc: 'What firmware does versus what a driver does, why both matter, and how they interact during operation.',
    eyebrow: 'Driver Concepts',
    h1: 'Firmware vs Driver — Two Layers Working Together',
    sub: 'A friendly explainer of the difference between firmware that lives on the device and the driver on the host.',
    sections: [
      { h: 'Where Each One Lives', img: 'cpu-chip.jpg', alt: 'Hardware concept',
        p1: 'Firmware is software that runs on the device itself — on the chip, in the embedded controller, in the network adapter. It comes with the device and is updated by a vendor utility.',
        p2: 'A driver runs on the host — the operating system loads it, it manages the device on the host\'s behalf, and it speaks to the firmware over the bus. The two work as a team.' },
      { h: 'Who Does What', img: 'kernel-mode.jpg', alt: 'Layered software concept',
        p1: 'Firmware handles the low-level details — exactly when to clock signal lines, how to manage on-device memory, how to recover from a transient hardware glitch. The host driver does not see any of that.',
        p2: 'The driver handles everything the host needs to know — buffer management, request scheduling, exposing the device to applications. The firmware does not need to know any of that. Each side stays in its lane.' },
      { h: 'When Updates Cross the Boundary', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'Some maker support packages update both firmware and drivers in one step. They work best when applied together — a new driver may rely on new firmware features, and the wrong combination can produce odd behaviour.',
        p2: 'For users, the cleanest approach is to follow the maker\'s recommended bundle. Mixing a new driver with old firmware (or the other way around) is not always wrong, but it is the kind of mismatch that produces head-scratching issues.' },
    ],
    related: [
      ['driver-package-anatomy', 'Driver Package Anatomy', 'What ships with a driver.'],
      ['acpi-and-drivers', 'Acpi and Drivers', 'Closely related firmware story.'],
      ['windows-server-driver-guide', 'Server Operating System Driver Guide', 'Where bundles matter most.'],
    ],
  },
  {
    slug: 'boot-time-driver-loading',
    category: 'concept',
    title: 'Boot-Time Driver Loading — Order Matters',
    desc: 'How the operating system loads drivers in early boot, why some load before others, and what happens when one is missing.',
    eyebrow: 'Driver Concepts',
    h1: 'Boot-Time Driver Loading — A Choreographed Sequence',
    sub: 'A short look at the early-boot driver sequence — start types, load groups, and the safety net for missing drivers.',
    sections: [
      { h: 'Start Types Determine Order', img: 'kernel-mode.jpg', alt: 'Boot sequence concept',
        p1: 'Drivers register a start type — boot, system, automatic, manual. Boot drivers load before the rest of the operating system has even initialised; they include the driver for the disk that holds the operating system itself. System drivers load next; automatic drivers follow once the operating system is up.',
        p2: 'The order is not arbitrary. A storage driver must be present before the operating system can read its own files. A graphics driver only loads later because the early console is enough until then.' },
      { h: 'Load Groups and Dependencies', img: 'cpu-chip.jpg', alt: 'Hardware boot concept',
        p1: 'Within each start type, drivers belong to load groups. The bus drivers load before the device drivers that sit on top of those buses. Within a load group, individual dependencies can be expressed so that a driver waits for another to finish.',
        p2: 'This is how the operating system avoids loading a network adapter driver before the chipset driver has exposed the bus the adapter sits on.' },
      { h: 'When a Boot Driver Is Missing', img: 'professional-workspace.png', alt: 'Calm troubleshooting',
        p1: 'If a boot driver is missing or fails to load, the operating system has a recovery story — it boots into a safe environment with only essential drivers loaded, where you can repair the install and restore the missing driver.',
        p2: 'For automatic drivers that fail, the operating system continues booting and reports the failure once you log in. The most common cause is a corrupt driver file, which is easy to address by reinstalling the package.' },
    ],
    related: [
      ['driver-kernel-mode', 'Kernel-Mode Drivers', 'Where boot drivers live.'],
      ['error-code-32-explained', 'Code 32 Explained', 'Closely related start-type message.'],
      ['driver-store-explained', 'Driver Store Explained', 'Where boot drivers come from.'],
    ],
  },
  {
    slug: 'driver-test-mode-explained',
    category: 'concept',
    title: 'Driver Test Mode — Loading Pre-Release Code',
    desc: 'What test mode does, when developers and power users enable it, and what it costs in terms of trust and signing.',
    eyebrow: 'Driver Concepts',
    h1: 'Driver Test Mode — Loading Pre-Release Drivers Safely',
    sub: 'A short explainer of test signing mode, the watermark, and the trade-offs to consider before turning it on.',
    sections: [
      { h: 'Why Test Mode Exists', img: 'kernel-mode.jpg', alt: 'Test mode concept',
        p1: 'Driver developers need to load their own work before submitting it for the formal signing flow. Test mode is the operating system\'s way of allowing this — it accepts drivers signed with a developer-issued certificate as long as the system is running in this mode.',
        p2: 'For end users, the same mode lets you load a pre-release driver provided by a maker for evaluation before it has gone through their full signing pipeline.' },
      { h: 'The Watermark and the Trade-Off', img: 'support-pro.png', alt: 'Reading documentation',
        p1: 'When test mode is on, the operating system shows a watermark in the corner of the screen as a constant reminder. This is intentional — running with test mode on is a different security posture and the watermark prevents you from forgetting.',
        p2: 'Some commercial software refuses to run in test mode, treating it as an indication that the system is not in a normal trust state. This is a fair stance for high-stakes applications.' },
      { h: 'Turning It On and Off', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'Test mode is enabled and disabled with a single elevated command and a restart. There is no setting tucked away in the user interface — the explicit command makes it harder to enable by accident.',
        p2: 'Once you no longer need a pre-release driver, switching test mode off is a one-line command. The system returns to the normal trust posture and the watermark goes away.' },
    ],
    related: [
      ['driver-signing-explained', 'Driver Signing Explained', 'The normal trust model.'],
      ['signed-vs-unsigned-drivers', 'Signed vs Unsigned Drivers', 'Background on signing.'],
      ['driver-verifier-explained', 'Driver Verifier Explained', 'Tool for catching driver issues.'],
    ],
  },

  // ---------- COMPONENT/VENDOR DRIVERS (7) ----------
  {
    slug: 'asmedia-controller-drivers',
    category: 'vendor',
    title: 'ASMedia Controller Drivers — Usb and Storage',
    desc: 'What ASMedia controllers do, where they live in modern systems, and how drivers expose their features.',
    eyebrow: 'Controller Drivers',
    h1: 'ASMedia Controller Drivers — Quiet but Everywhere',
    sub: 'A friendly look at the ASMedia controllers that sit behind many Usb ports and Sata channels on modern motherboards.',
    sections: [
      { h: 'What ASMedia Makes', img: 'usb.jpg', alt: 'Usb port closeup',
        p1: 'ASMedia is one of the major suppliers of host controllers — the chips that sit between the chipset and your Usb ports, Sata sockets, and certain expansion cards. If your motherboard has Usb 3.2 ports, there is a fair chance an ASMedia controller is involved.',
        p2: 'The driver story is usually the operating system\'s in-box class driver for the standard parts and an ASMedia-specific driver for advanced features. Both work together; you do not have to pick.' },
      { h: 'When You Need a Specific Driver', img: 'storage.jpg', alt: 'Storage controller',
        p1: 'For everyday use the in-box driver is fine. If you have an Asmedia Usb 3.2 host controller and need its full performance, or you have an ASMedia Sata controller in Raid mode, the maker driver from your motherboard\'s download page is the right pick.',
        p2: 'The motherboard maker bundles the right ASMedia driver into their support pack. Using their version rather than a generic ASMedia download avoids potential mismatch with their firmware.' },
      { h: 'Common Symptoms of an Outdated Driver', img: 'professional-workspace.png', alt: 'Calm troubleshooting',
        p1: 'Slower-than-expected Usb 3.2 transfer speeds and intermittent disconnects on specific external drives are the typical signs. Updating to the bundle on the motherboard maker\'s page resolves most of them.',
        p2: 'For Sata Raid configurations, the matching driver is essential — using the in-box driver instead of the ASMedia one in Raid mode produces unpredictable behaviour.' },
    ],
    related: [
      ['usb-drivers', 'Usb Drivers', 'Foundation knowledge.'],
      ['driver-storage-disk', 'Storage Drivers', 'Sata-side context.'],
      ['driver-chipset', 'Chipset Drivers', 'Closely related platform driver.'],
    ],
  },
  {
    slug: 'mediatek-wireless-drivers',
    category: 'vendor',
    title: 'MediaTek Wireless Drivers — Wi-Fi and Bluetooth',
    desc: 'How MediaTek wireless modules work, what their drivers expose, and why they show up in many modern laptops.',
    eyebrow: 'Wireless Drivers',
    h1: 'MediaTek Wireless Drivers — Coming to More Laptops',
    sub: 'A friendly look at MediaTek\'s combo Wi-Fi/Bluetooth modules and the drivers that expose them.',
    sections: [
      { h: 'A Quietly Common Choice', img: 'network.jpg', alt: 'Wireless module concept',
        p1: 'MediaTek\'s wireless modules have moved into the mainstream. Many recent laptops ship with a MediaTek Wi-Fi 6 or Wi-Fi 6E combo card alongside the more familiar offerings from other makers.',
        p2: 'For users this is a non-event — the operating system has good in-box support for these modules, and most setups never need to think about the driver again.' },
      { h: 'When the Maker Driver Helps', img: 'support-pro.png', alt: 'Reading driver info',
        p1: 'For new modules in a brand-new laptop, the maker-supplied driver from the laptop maker\'s page is usually a step ahead of the in-box one. It exposes the latest power-saving features and any Wi-Fi 6E channels not yet enabled in the in-box driver.',
        p2: 'On older laptops, the in-box driver is usually enough. If you are happy with throughput and stability, there is no reason to chase updates.' },
      { h: 'Bluetooth on the Same Module', img: 'bluetooth.jpg', alt: 'Bluetooth concept',
        p1: 'Combo Wi-Fi/Bluetooth modules share a single antenna pair. The Bluetooth driver is usually a separate package from the Wi-Fi one, even though both belong to the same physical chip.',
        p2: 'When updating wireless drivers, install both packages from the laptop maker\'s page. Updating only one half can leave the coexistence behaviour misconfigured and produce intermittent issues.' },
    ],
    related: [
      ['intel-wifi-drivers', 'Intel Wi-Fi Drivers', 'The most common alternative.'],
      ['atheros-wifi-drivers', 'Atheros Wi-Fi Drivers', 'Another wireless family.'],
      ['driver-bluetooth', 'Bluetooth Drivers', 'Foundation for the radio half.'],
    ],
  },
  {
    slug: 'qualcomm-wireless-drivers',
    category: 'vendor',
    title: 'Qualcomm Wireless Drivers — High-End Wi-Fi',
    desc: 'Where Qualcomm wireless modules show up, what their drivers offer, and how they relate to the Atheros family.',
    eyebrow: 'Wireless Drivers',
    h1: 'Qualcomm Wireless Drivers — From Atheros to Today',
    sub: 'A short explainer of the Qualcomm wireless lineage and the drivers that expose modern Wi-Fi 6 and Wi-Fi 7 features.',
    sections: [
      { h: 'A Familiar Name on Top of an Old One', img: 'network.jpg', alt: 'Wireless concept',
        p1: 'Qualcomm wireless modules trace their lineage back to Atheros, which Qualcomm acquired years ago. Many drivers still carry both names internally, and Linux support traditionally references the Atheros project even when the chip is a more recent Qualcomm part.',
        p2: 'For users, this means broad support across operating systems and a steady stream of driver updates from both the operating system vendors and Qualcomm directly.' },
      { h: 'Modern Wi-Fi Features', img: 'support-pro.png', alt: 'Wireless features concept',
        p1: 'Recent Qualcomm modules support Wi-Fi 6E and Wi-Fi 7, with multi-link operation, wider channels, and improved power management. The driver exposes these features as the access point and operating system support catches up.',
        p2: 'For best results in a multi-band environment, install the maker-supplied driver from the laptop maker\'s page. The in-box driver is functional but often a release behind on the newest features.' },
      { h: 'Where the Drivers Live', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'On the desktop side, Qualcomm wireless drivers are bundled by the laptop maker. On the Linux side, support is in the kernel for most parts, with firmware blobs in the linux-firmware package family.',
        p2: 'For the newest modules on Linux, an updated kernel and firmware package may be needed. Most distributions track these promptly and updates arrive through normal channels.' },
    ],
    related: [
      ['atheros-wifi-drivers', 'Atheros Wi-Fi Drivers', 'The lineage on which today\'s Qualcomm builds.'],
      ['intel-wifi-drivers', 'Intel Wi-Fi Drivers', 'Most common alternative.'],
      ['mediatek-wireless-drivers', 'MediaTek Wireless Drivers', 'Another wireless family.'],
    ],
  },
  {
    slug: 'asix-ethernet-drivers',
    category: 'vendor',
    title: 'ASIX Ethernet Drivers — Usb-Ethernet Adapters',
    desc: 'What ASIX makes, where their adapters appear, and how the drivers expose Usb-attached gigabit networking.',
    eyebrow: 'Ethernet Drivers',
    h1: 'ASIX Ethernet Drivers — Ethernet Through a Usb Port',
    sub: 'A friendly look at the ASIX chips inside many Usb-Ethernet adapters and docking stations, and the drivers that expose them.',
    sections: [
      { h: 'A Very Common Adapter Inside', img: 'network.jpg', alt: 'Usb Ethernet adapter',
        p1: 'If you have a Usb-Ethernet adapter, an Sff laptop dock with an Ethernet port, or a small travel hub with networking, there is a good chance an ASIX chip is doing the work. ASIX is one of the dominant suppliers of Usb-Ethernet bridge chips.',
        p2: 'The operating system has solid in-box support — most adapters work the moment they are plugged in. The maker driver is rarely required for everyday connectivity.' },
      { h: 'When the ASIX Driver Helps', img: 'support-pro.png', alt: 'Reading driver info',
        p1: 'For 2.5 gigabit and faster ASIX adapters, the maker driver often unlocks the higher line rates and exposes advanced features like Wake on Lan and Vlan tagging. Without it, the adapter may negotiate down to gigabit even when the network supports more.',
        p2: 'The ASIX support page hosts drivers organised by chip series. The chip is typically printed on the adapter\'s label or on a sticker inside its case.' },
      { h: 'Common Symptoms of a Mismatched Driver', img: 'professional-workspace.png', alt: 'Calm troubleshooting',
        p1: 'Lower-than-expected throughput, intermittent disconnects under load, and missing advanced settings are the most common signs that a more specific driver would help. Installing the right ASIX driver often resolves all three.',
        p2: 'On Linux, the in-kernel driver covers most ASIX parts directly. Distributions ship them as part of the standard kernel modules with no extra package required.' },
    ],
    related: [
      ['network-drivers', 'Network Drivers', 'Foundation knowledge.'],
      ['usb-drivers', 'Usb Drivers', 'How Usb-attached devices fit in.'],
      ['realtek-network-drivers', 'Realtek Network Drivers', 'Common alternative chip family.'],
    ],
  },
  {
    slug: 'nuvoton-sensor-drivers',
    category: 'vendor',
    title: 'Nuvoton Sensor Drivers — Super I/O and Sensors',
    desc: 'What Nuvoton sensor chips do on motherboards, where their drivers expose temperature and fan data, and why monitoring tools depend on them.',
    eyebrow: 'Sensor Drivers',
    h1: 'Nuvoton Sensor Drivers — The Quiet Reporters',
    sub: 'A friendly look at the Nuvoton chips behind motherboard temperature, voltage, and fan readings.',
    sections: [
      { h: 'What Lives on the Super I/O Chip', img: 'chipset.jpg', alt: 'Motherboard sensors',
        p1: 'Most desktop motherboards include a small chip called the Super Input/Output controller. It hosts the legacy serial and parallel ports plus a sensor block — temperatures, fan speeds, voltages, and a few control outputs. Nuvoton is one of the dominant suppliers in this area.',
        p2: 'The sensor block is what monitoring tools read to show you processor temperature, system fan rpm, and rail voltages. Without a driver to expose it, those readings would not be visible.' },
      { h: 'Why Monitoring Tools Need the Right Driver', img: 'support-pro.png', alt: 'Monitoring tool concept',
        p1: 'Different Nuvoton chips arrange their registers slightly differently. A monitoring tool needs to know which chip is on your board to read each value from the right place. The motherboard maker\'s utility is preconfigured for the right chip.',
        p2: 'Open-source tools like Open Hardware Monitor maintain a database of chip layouts and can usually auto-detect, but on rare boards a manual selection is needed.' },
      { h: 'Linux Support', img: 'professional-workspace.png', alt: 'Linux concept',
        p1: 'On Linux, the lm_sensors project covers most Nuvoton chips through kernel modules. After running sensors-detect, the relevant module loads automatically at boot and standard tools can read the values.',
        p2: 'For unusual boards, manual configuration through the lm_sensors documentation is straightforward. Once configured, the readings are stable across kernel updates.' },
    ],
    related: [
      ['driver-chipset', 'Chipset Drivers', 'Closely related platform driver.'],
      ['fix-laptop-fan-loud', 'Fix: Laptop Fan Loud', 'Where sensor readings help.'],
      ['sensor-hub-driver-guide', 'Sensor Hub Driver Guide', 'Adjacent sensor topic on laptops.'],
    ],
  },
  {
    slug: 'silicon-image-controller-drivers',
    category: 'vendor',
    title: 'Silicon Image Controller Drivers',
    desc: 'Where Silicon Image controllers appear in older systems and how their drivers handle Sata and Pata storage.',
    eyebrow: 'Controller Drivers',
    h1: 'Silicon Image Controller Drivers — Steady Storage from Earlier Eras',
    sub: 'A short look at the Silicon Image storage controllers found on many older add-in cards and motherboard secondary channels.',
    sections: [
      { h: 'A Long History on Add-In Cards', img: 'storage.jpg', alt: 'Storage card concept',
        p1: 'Silicon Image was a major supplier of storage host controllers during the early Sata era. Many add-in cards branded by other companies were Silicon Image inside, and they provided extra Sata channels and basic Raid features.',
        p2: 'These cards are still in service in plenty of older systems. For new builds they are uncommon, but the driver story remains relevant for legacy hardware.' },
      { h: 'Drivers for Modern Operating Systems', img: 'support-pro.png', alt: 'Reading version info',
        p1: 'The operating system in-box driver covers basic operation in Ahci mode for most Silicon Image controllers. For Raid configurations, the original maker driver is often needed and may be hard to find for the very oldest parts.',
        p2: 'When in doubt, a card running in plain Ahci mode through the in-box driver is the most reliable configuration on modern operating systems. Raid features tied to old drivers should be migrated to operating system level Raid where possible.' },
      { h: 'When to Replace the Card', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'For users hitting the limits of an old Silicon Image card — slow throughput, missing Trim support on Ssds — a modern Asmedia or Marvell card with current driver support is a good upgrade. The cards are inexpensive and the driver story is much smoother.',
        p2: 'Migrating data is a one-time operation; the resulting system runs faster and stays in active driver maintenance for far longer.' },
    ],
    related: [
      ['driver-storage-disk', 'Storage Drivers', 'Foundation knowledge.'],
      ['asmedia-controller-drivers', 'ASMedia Controller Drivers', 'Modern equivalent.'],
      ['driver-chipset', 'Chipset Drivers', 'Closely related platform driver.'],
    ],
  },
  {
    slug: 'jmicron-controller-drivers',
    category: 'vendor',
    title: 'JMicron Controller Drivers — Bridges and Storage',
    desc: 'Where JMicron bridge and storage controllers appear, what their drivers do, and how to keep them current.',
    eyebrow: 'Controller Drivers',
    h1: 'JMicron Controller Drivers — Bridges Between Buses',
    sub: 'A friendly look at the JMicron chips inside many external enclosures and motherboard secondary storage channels.',
    sections: [
      { h: 'A Bridge Specialist', img: 'storage.jpg', alt: 'Bridge chip concept',
        p1: 'JMicron is best known for bridge chips — the small controllers that translate between Usb and Sata, between Sata and m.2 form factors, or between Usb and m.2 directly. Many external Ssd and Hdd enclosures are JMicron inside.',
        p2: 'The driver story is usually the operating system\'s in-box class driver for everyday operation. The JMicron-specific driver becomes relevant when you want firmware-update access or full Smart reporting through the bridge.' },
      { h: 'When You Need the Specific Driver', img: 'support-pro.png', alt: 'Reading driver info',
        p1: 'Smart data through a bridge is the most common reason to install the JMicron driver. The in-box class driver passes basic commands but often hides the deeper Smart attributes that monitoring tools want to see.',
        p2: 'The JMicron support page lists drivers by chip model. The chip is usually printed inside the enclosure on a small sticker, or visible through Device Manager once the enclosure is plugged in.' },
      { h: 'Common Symptoms', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'Smart attributes that show as "not available" on a drive that supports them is the classic sign of a bridge using only the in-box driver. After installing the JMicron-specific driver, the same monitoring tool typically shows the full attribute list.',
        p2: 'On Usb 3.2 enclosures, throughput well below the rated speed can also point at a generic driver. The maker driver often unlocks the controller\'s burst rate.' },
    ],
    related: [
      ['driver-storage-disk', 'Storage Drivers', 'Foundation knowledge.'],
      ['usb-drivers', 'Usb Drivers', 'How bridges fit on the Usb side.'],
      ['asmedia-controller-drivers', 'ASMedia Controller Drivers', 'Closely related controller family.'],
    ],
  },

  // ---------- HOW-TO GUIDES (5) ----------
  {
    slug: 'enable-driver-event-logging',
    category: 'howto',
    title: 'Enable Driver Event Logging — A Calm Setup',
    desc: 'How to turn on event logging for a driver, what to capture, and how to read the log without getting overwhelmed.',
    eyebrow: 'How-To Guides',
    h1: 'Enable Driver Event Logging — Without the Mess',
    sub: 'A short, friendly walkthrough of enabling extra driver event logging when you need a deeper look.',
    sections: [
      { h: 'Why Event Logging Helps', img: 'support-pro.png', alt: 'Reading log files',
        p1: 'Drivers normally log only major events — startup, shutdown, fatal stops. When troubleshooting an intermittent issue, the default log is often too sparse to be useful. Enabling extra event logging captures the smaller decisions the driver makes along the way.',
        p2: 'The result is much more data, but with the right filters in place, the relevant events are easy to find. The trade-off in disk space is small for the duration of an investigation.' },
      { h: 'Turning on Verbose Events', img: 'kernel-mode.jpg', alt: 'Driver internals',
        p1: 'Many drivers expose a registry value or configuration file that controls log verbosity. The maker\'s knowledge base usually documents the specific value to set. After changing it, restart the affected service or the system to pick up the new level.',
        p2: 'Event Tracing for the operating system also offers per-driver logging without registry changes. The Performance Monitor tool can start and stop these traces with a friendly interface.' },
      { h: 'Reading the Log Without Drowning', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'The Event Viewer offers filters by source, level, and time window. Apply them aggressively — looking at "all events" from a verbose driver is overwhelming. Filtering to a fifteen-minute window around the issue you are investigating focuses the view.',
        p2: 'When you finish, return logging to the default level. Verbose logging is meant to be temporary, and leaving it on indefinitely can fill the disk on busy systems.' },
    ],
    related: [
      ['driver-verifier-explained', 'Driver Verifier Explained', 'Adjacent diagnostic tool.'],
      ['read-system-stop-report', 'Read a System Stop Report', 'When the driver hits a hard stop.'],
      ['driver-test-mode-explained', 'Driver Test Mode Explained', 'Related developer feature.'],
    ],
  },
  {
    slug: 'read-system-stop-report',
    category: 'howto',
    title: 'Read a System Stop Report Calmly',
    desc: 'How to find and read a system stop report, what the headline information tells you, and the calm next steps.',
    eyebrow: 'How-To Guides',
    h1: 'Read a System Stop Report Without the Anxiety',
    sub: 'A short, friendly walkthrough of opening a stop report, picking out the relevant lines, and deciding what to do next.',
    sections: [
      { h: 'Where the Report Lives', img: 'storage.jpg', alt: 'Storage and reports',
        p1: 'When the system stops responding and recovers itself, it often writes a small report file to the system folder. The path varies by operating system version but is consistent within a release line. The Event Viewer also lists the most recent stops with a link to the file.',
        p2: 'The report contains the stop code, the driver involved, and a small slice of state captured at the moment of the stop. That is usually enough to point at the cause.' },
      { h: 'The Headline Lines to Read', img: 'support-pro.png', alt: 'Reading documentation',
        p1: 'The stop code (a four-byte hexadecimal value) and the symbolic name beside it are the headline. Each combination has a documented meaning on the maker support pages — for example, a code that points specifically at video drivers narrows the search dramatically.',
        p2: 'The driver listed alongside the stop code is the prime suspect. It may not be the root cause — sometimes a misbehaving driver causes another driver to stop — but it is the right place to start investigating.' },
      { h: 'A Calm Sequence to Try', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'Roll back the suspect driver to its previous version if a recent update preceded the stop. Update the driver from the maker\'s page if your version is older than the latest. Run the operating system memory diagnostic if memory addresses appear in the report.',
        p2: 'A single stop is usually noise — it is when the same code appears multiple times that you have a real pattern worth investigating. Treat the first one calmly and look for repetition before reaching for big changes.' },
    ],
    related: [
      ['driver-verifier-explained', 'Driver Verifier Explained', 'Tool that catches issues earlier.'],
      ['fix-bsod-driver-irql', 'Fix: Driver IRQL Stop', 'Walkthrough for a common stop code.'],
      ['fix-system-thread-exception', 'Fix: System Thread Exception', 'Walkthrough for another common stop code.'],
    ],
  },
  {
    slug: 'extract-driver-from-installer',
    category: 'howto',
    title: 'Extract a Driver From an Installer',
    desc: 'How to pull the driver files out of a maker installer when you need them for offline use or a clean install.',
    eyebrow: 'How-To Guides',
    h1: 'Extract a Driver From an Installer Without Running It',
    sub: 'A short, friendly walkthrough of getting the Inf, Cat, and Sys files out of a maker installer for offline use.',
    sections: [
      { h: 'Why You Might Want To', img: 'storage.jpg', alt: 'Files concept',
        p1: 'Maker installers do a lot — install the driver, register utilities, lay down icons, set start menu entries. Sometimes you only want the driver itself: for a clean install, for use on another machine, or for an offline system that cannot run the full installer.',
        p2: 'The driver files inside almost every maker installer are standard Inf, Cat, and Sys files. Once extracted, the operating system can install them with the built-in "have disk" flow.' },
      { h: 'How to Extract', img: 'support-pro.png', alt: 'Extraction concept',
        p1: 'Most maker installers are self-extracting archives. A general-purpose archive tool (open-source ones work well here) can open them and show the contents. Look for a folder containing the Inf file — that is the driver itself.',
        p2: 'For installers that are not standard archives, run the installer to its first prompt — the staging folder it creates usually contains the driver files. Copy them out before cancelling the install.' },
      { h: 'Installing the Extracted Driver', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'In Device Manager, choose Update Driver and pick "Browse my computer" then "Let me pick" then "Have Disk." Point to the folder containing the Inf file. The operating system reads the Inf, validates the Cat, and installs the driver cleanly.',
        p2: 'This is the same flow administrators use for offline installs in environments that do not allow general-purpose installers to run.' },
    ],
    related: [
      ['driver-package-anatomy', 'Driver Package Anatomy', 'What you are pulling out.'],
      ['inf-files-explained', 'Inf Files Explained', 'Why the Inf is the key file.'],
      ['driver-store-explained', 'Driver Store Explained', 'Where the driver lands afterward.'],
    ],
  },
  {
    slug: 'compare-driver-versions',
    category: 'howto',
    title: 'Compare Driver Versions Sensibly',
    desc: 'How to compare driver versions across systems, what to look at, and the difference between the maker version and the registered one.',
    eyebrow: 'How-To Guides',
    h1: 'Compare Driver Versions Without Confusion',
    sub: 'A short, friendly walkthrough of finding driver versions in different places and lining them up sensibly.',
    sections: [
      { h: 'Three Places to Find a Version', img: 'support-pro.png', alt: 'Reading version info',
        p1: 'A driver version may appear in Device Manager, in the maker control panel, and in the maker installer download page. The three values do not always match exactly — and that is fine, because they describe slightly different things.',
        p2: 'Device Manager shows the version of the driver currently registered with the operating system. The control panel shows the version of the user-mode helpers. The download page lists the package version, which usually matches the driver version unless the package wraps multiple drivers.' },
      { h: 'Why the Numbers Differ', img: 'kernel-mode.jpg', alt: 'Driver versions concept',
        p1: 'A package can contain a driver that updates infrequently and helpers that update often. So a package version may move while the underlying driver version stays the same. Conversely, a driver may carry a small revision update without a new package.',
        p2: 'For troubleshooting, the Device Manager driver version is the one to use when comparing across systems. It reflects what is actually running.' },
      { h: 'A Sensible Comparison Process', img: 'professional-workspace.png', alt: 'Documentation review',
        p1: 'When asked to compare versions across machines, capture the Device Manager driver version, the driver date, and the package version from the maker page if available. Three rows of data, easy to compare side by side.',
        p2: 'If versions match exactly across machines but only one shows the issue, the driver is unlikely to be the cause. That is also useful information.' },
    ],
    related: [
      ['driver-version-numbers', 'Driver Version Numbers', 'What the numbers mean.'],
      ['driver-package-anatomy', 'Driver Package Anatomy', 'How packages relate to drivers.'],
      ['when-to-update-drivers', 'When to Update Drivers', 'Decision framework.'],
    ],
  },
  {
    slug: 'set-default-audio-device',
    category: 'howto',
    title: 'Set the Default Audio Device',
    desc: 'How to set, switch, and pin a default audio device — for speakers, headphones, or a virtual interface.',
    eyebrow: 'How-To Guides',
    h1: 'Set the Default Audio Device — Per App and Globally',
    sub: 'A short, friendly walkthrough of setting global and per-application audio devices, and pinning the choice you want.',
    sections: [
      { h: 'The Global Default', img: 'audio.jpg', alt: 'Audio device list',
        p1: 'In the audio settings panel, every output device on the system is listed. One is marked as the default — the one applications will use unless they specifically pick another. Right-click any device and choose "Set as default" to switch.',
        p2: 'The default communication device is a separate setting and applies to voice calls only. Setting both to the same device is fine and is what most users want.' },
      { h: 'Per-Application Routing', img: 'support-pro.png', alt: 'Reading audio settings',
        p1: 'Modern audio settings include a per-application section. You can route a specific application to a specific device — for example, music to your speakers and meetings to your headset. The choice persists until you change it.',
        p2: 'If an application does not appear in the list, play a few seconds of audio first. The system adds applications to the list once they actually output sound.' },
      { h: 'When the Choice Does Not Stick', img: 'professional-workspace.png', alt: 'Calm workspace',
        p1: 'Some headsets present multiple endpoints — a music endpoint and a chat endpoint, for example. Setting the right one as default takes care; the wrong endpoint may explain why the change appears to not stick.',
        p2: 'For Bluetooth headsets that have a "hands-free" and a "high-fidelity" profile, picking the right profile in the audio settings is also important. Hands-free is the chat profile; high-fidelity is for music.' },
    ],
    related: [
      ['fix-no-sound', 'Fix: No Sound', 'Adjacent walkthrough.'],
      ['audio-drivers', 'Audio Drivers', 'Foundation knowledge.'],
      ['fix-audio-static-noise', 'Fix: Audio Static or Hiss', 'Closely related fix.'],
    ],
  },
];

// =====================================================================
// PAGE TEMPLATE — derived from realtek-network-drivers.html
// =====================================================================

function renderPage(t) {
  const url = `${SITE}/${t.slug}.html`;
  const breadcrumbCategoryMap = {
    errors: ['troubleshooting.html', 'Troubleshooting'],
    os: ['system-drivers.html', 'Operating Systems'],
    fix: ['troubleshooting.html', 'Troubleshooting'],
    concept: ['blog.html', 'Driver Concepts'],
    vendor: ['network-drivers.html', 'Component Drivers'],
    howto: ['blog.html', 'How-To Guides'],
  };
  const [breadHref, breadLabel] = breadcrumbCategoryMap[t.category] || ['blog.html', 'Driver Guides'];

  // Defensive: trim title to ≤60 chars (incl. brand suffix)
  let titleFinal = `${t.title} | PrintSoftDriver`;
  if (titleFinal.length > 60) {
    let core = t.title.length > 47 ? t.title.slice(0, 44).trim() + '…' : t.title;
    titleFinal = `${core} | PrintSoftDriver`;
    if (titleFinal.length > 60) titleFinal = core;
  }

  // Description: 130-160 chars ideal
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
  <meta name="keywords" content="${t.slug.replace(/-/g, ' ')}, driver guide, printsoftdriver">
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
  "author": {
    "@type": "Organization",
    "name": "PrintSoftDriver",
    "url": "${SITE}/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PrintSoftDriver",
    "url": "${SITE}/",
    "logo": {
      "@type": "ImageObject",
      "url": "${SITE}/favicon.svg"
    }
  },
  "isPartOf": {
    "@type": "WebSite",
    "name": "PrintSoftDriver",
    "url": "${SITE}/"
  },
  "inLanguage": "en"
}</script>
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
  <link href="https://fonts.bunny.net/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
<!-- Consent defaults -->
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
      <a href="troubleshooting.html">Troubleshooting</a>
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
    <a href="troubleshooting.html">Troubleshooting</a>
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
      <h2>Related Guides on PrintSoftDriver</h2>
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
        <a href="troubleshooting.html" class="btn btn-outline-dark">Troubleshooting Guides</a>
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
      <p>Your friendly, plain-English guide to the world of device drivers. We translate the technical so you can spend more time using your computer and less time fighting it.</p>
    </div>
    <div class="footer-col">
      <h4>Site Links</h4>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="troubleshooting.html">Troubleshooting</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="sitemap.html">Sitemap</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Driver Guides</h4>
      <ul>
        <li><a href="printer-drivers.html">Device Drivers</a></li>
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

// =====================================================================
// Generate all 50 pages
// =====================================================================

console.log(`Generating ${TOPICS.length} pages...`);
const slugs = new Set();
for (const t of TOPICS) {
  if (slugs.has(t.slug)) {
    console.error(`!! Duplicate slug: ${t.slug}`);
    process.exit(1);
  }
  slugs.add(t.slug);
  const file = path.join(ROOT, `${t.slug}.html`);
  fs.writeFileSync(file, renderPage(t));
}
console.log(`Wrote ${TOPICS.length} files.`);

// =====================================================================
// Update sitemap.html — append a new section listing the 50 pages,
// grouped by category, before the </main> close.
// =====================================================================

const sitemapPath = path.join(ROOT, 'sitemap.html');
const sitemapHtml = fs.readFileSync(sitemapPath, 'utf8');

// Build new section
const grouped = {};
for (const t of TOPICS) (grouped[t.category] ||= []).push(t);

const catLabels = {
  errors: 'More Device Manager Codes',
  os: 'More Operating System Guides',
  fix: 'More Fix Walkthroughs',
  concept: 'More Driver Concepts',
  vendor: 'More Component &amp; Vendor Drivers',
  howto: 'More How-To Guides',
};

const newSitemapBlock = `
        <div class="sitemap-section">
          <h2>Latest Additions <span class="sitemap-count">(${TOPICS.length})</span></h2>
          ${Object.entries(grouped).map(([cat, items]) => `
          <h3 style="margin:18px 0 8px;font-size:1rem;opacity:.85;">${catLabels[cat] || cat}</h3>
          <ul class="sitemap-list">
            ${items.map(t => `<li><a href="${t.slug}.html">${t.h1.split('—')[0].trim()}</a></li>`).join('\n            ')}
          </ul>`).join('')}
        </div>
`;

// Idempotent: only insert if not already present
let newSitemap;
if (sitemapHtml.includes('Latest Additions')) {
  console.log('Sitemap already has Latest Additions block; skipping.');
  newSitemap = sitemapHtml;
} else {
  const sitemapMarker = '<footer id="site-footer"';
  if (!sitemapHtml.includes(sitemapMarker)) {
    console.error('!! Sitemap insert marker not found.');
    process.exit(1);
  }
  newSitemap = sitemapHtml.replace(sitemapMarker, newSitemapBlock + '\n' + sitemapMarker);
}
fs.writeFileSync(sitemapPath, newSitemap);
console.log('Sitemap updated.');

// =====================================================================
// Update troubleshooting.html — add cross-links to the 10 new fix guides
// (helps Semrush "only one internal link" warning by giving each new
// fix page at least 2 links pointing to it: sitemap + hub.)
// =====================================================================

const tsPath = path.join(ROOT, 'troubleshooting.html');
const tsHtml = fs.readFileSync(tsPath, 'utf8');
const fixTopics = TOPICS.filter(t => t.category === 'fix');
const newFixBlock = `
<section class="page-section bg-surface">
  <div class="section-inner">
    <div class="section-header reveal">
      <span class="section-eyebrow">More Fix Walkthroughs</span>
      <h2>Recently Added Walkthroughs</h2>
      <p>Calm, plain-English walkthroughs for the issues we hear about most.</p>
    </div>
    <div class="related-grid reveal">
      ${fixTopics.map(t => `<a class="related-card" href="${t.slug}.html"><h3>${t.h1.split('—')[0].trim()}</h3><p>${t.sub.length > 80 ? t.sub.slice(0, 77) + '…' : t.sub}</p></a>`).join('\n      ')}
    </div>
  </div>
</section>
`;
const tsMarker = '<footer id="site-footer"';
let newTs;
if (tsHtml.includes('Recently Added Walkthroughs')) {
  console.log('Troubleshooting already has new block; skipping.');
  newTs = tsHtml;
} else if (!tsHtml.includes(tsMarker)) {
  console.error('!! Troubleshooting insert marker not found.');
  process.exit(1);
} else {
  newTs = tsHtml.replace(tsMarker, newFixBlock + '\n' + tsMarker);
}
fs.writeFileSync(tsPath, newTs);
console.log('Troubleshooting hub updated.');

// =====================================================================
// Update blog.html — add cross-links to a sampler of new concept/howto pages
// =====================================================================

const blogPath = path.join(ROOT, 'blog.html');
const blogHtml = fs.readFileSync(blogPath, 'utf8');
const conceptTopics = TOPICS.filter(t => t.category === 'concept' || t.category === 'howto');
const newBlogBlock = `
<section class="page-section bg-surface">
  <div class="section-inner">
    <div class="section-header reveal">
      <span class="section-eyebrow">Latest from the Blog</span>
      <h2>Recently Added Articles</h2>
      <p>New explainers and how-to guides covering drivers from foundation to fine detail.</p>
    </div>
    <div class="related-grid reveal">
      ${conceptTopics.map(t => `<a class="related-card" href="${t.slug}.html"><h3>${t.h1.split('—')[0].trim()}</h3><p>${t.sub.length > 80 ? t.sub.slice(0, 77) + '…' : t.sub}</p></a>`).join('\n      ')}
    </div>
  </div>
</section>
`;
const blogMarker = '<footer id="site-footer"';
let newBlog;
if (blogHtml.includes('Recently Added Articles')) {
  console.log('Blog already has new block; skipping.');
  newBlog = blogHtml;
} else if (!blogHtml.includes(blogMarker)) {
  console.error('!! Blog insert marker not found.');
  process.exit(1);
} else {
  newBlog = blogHtml.replace(blogMarker, newBlogBlock + '\n' + blogMarker);
}
fs.writeFileSync(blogPath, newBlog);
console.log('Blog hub updated.');

// =====================================================================
// Update category hub pages with cross-links to relevant new pages
// =====================================================================

const hubAdditions = [
  ['network-drivers.html', TOPICS.filter(t => ['mediatek-wireless-drivers', 'qualcomm-wireless-drivers', 'asix-ethernet-drivers'].includes(t.slug)), 'More Network Driver Reads'],
  ['system-drivers.html', TOPICS.filter(t => t.category === 'os'), 'More Operating System Guides'],
  ['audio-drivers.html', TOPICS.filter(t => t.slug === 'fix-audio-static-noise' || t.slug === 'set-default-audio-device'), 'More Audio-Related Reads'],
  ['usb-drivers.html', TOPICS.filter(t => ['asmedia-controller-drivers', 'jmicron-controller-drivers', 'silicon-image-controller-drivers'].includes(t.slug)), 'More Controller Reads'],
  ['graphics-drivers.html', TOPICS.filter(t => ['fix-display-driver-stopped-responding', 'fix-second-display-no-signal'].includes(t.slug)), 'More Graphics Reads'],
];

for (const [filename, items, eyebrow] of hubAdditions) {
  if (items.length === 0) continue;
  const filePath = path.join(ROOT, filename);
  if (!fs.existsSync(filePath)) continue;
  const html = fs.readFileSync(filePath, 'utf8');
  const block = `
<section class="page-section bg-surface">
  <div class="section-inner">
    <div class="section-header reveal">
      <span class="section-eyebrow">${eyebrow}</span>
      <h2>Recently Added Reads</h2>
      <p>Hand-picked recent additions in this category.</p>
    </div>
    <div class="related-grid reveal">
      ${items.map(t => `<a class="related-card" href="${t.slug}.html"><h3>${t.h1.split('—')[0].trim()}</h3><p>${t.sub.length > 80 ? t.sub.slice(0, 77) + '…' : t.sub}</p></a>`).join('\n      ')}
    </div>
  </div>
</section>
`;
  if (html.includes('Recently Added Reads')) {
    console.log(`${filename} already has new block; skipping.`);
    continue;
  }
  const hubMarker = '<footer id="site-footer"';
  if (!html.includes(hubMarker)) {
    console.warn(`!! ${filename} marker not found; skipping.`);
    continue;
  }
  fs.writeFileSync(filePath, html.replace(hubMarker, block + '\n' + hubMarker));
  console.log(`${filename} updated.`);
}

console.log('\nAll done.');
