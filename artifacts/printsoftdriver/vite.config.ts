import { defineConfig } from "vite";
import path from "path";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: basePath,
  plugins: [],
  root: path.resolve(import.meta.dirname),
  publicDir: path.resolve(import.meta.dirname, "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
          main: path.resolve(import.meta.dirname, "index.html"),
          blog: path.resolve(import.meta.dirname, "blog.html"),
          about: path.resolve(import.meta.dirname, "about.html"),
          troubleshooting: path.resolve(import.meta.dirname, "troubleshooting.html"),
          contact: path.resolve(import.meta.dirname, "contact.html"),
          privacy: path.resolve(import.meta.dirname, "privacy.html"),
          privacyPolicy: path.resolve(import.meta.dirname, "privacy-policy.html"),
          disclaimer: path.resolve(import.meta.dirname, "disclaimer.html"),
          terms: path.resolve(import.meta.dirname, "terms.html"),
          cookiePolicy: path.resolve(import.meta.dirname, "cookie-policy.html"),
          printerDrivers: path.resolve(import.meta.dirname, "printer-drivers.html"),
          graphicsDrivers: path.resolve(import.meta.dirname, "graphics-drivers.html"),
          audioDrivers: path.resolve(import.meta.dirname, "audio-drivers.html"),
          networkDrivers: path.resolve(import.meta.dirname, "network-drivers.html"),
          usbDrivers: path.resolve(import.meta.dirname, "usb-drivers.html"),
          systemDrivers: path.resolve(import.meta.dirname, "system-drivers.html"),
          fixPrinterBlank: path.resolve(import.meta.dirname, "fix-printer-blank.html"),
          fixNoSound: path.resolve(import.meta.dirname, "fix-no-sound.html"),
          fixWifiDrops: path.resolve(import.meta.dirname, "fix-wifi-drops.html"),
          fixScreenFlicker: path.resolve(import.meta.dirname, "fix-screen-flicker.html"),
          fixUsbNotRecognised: path.resolve(import.meta.dirname, "fix-usb-not-recognised.html"),
          fixSlowAfterUpdate: path.resolve(import.meta.dirname, "fix-slow-after-update.html"),
          sitemap: path.resolve(import.meta.dirname, "sitemap.html"),
          driverKernelMode: path.resolve(import.meta.dirname, "driver-kernel-mode.html"),
          driverUserMode: path.resolve(import.meta.dirname, "driver-user-mode.html"),
          driverStorageDisk: path.resolve(import.meta.dirname, "driver-storage-disk.html"),
          driverInputDevices: path.resolve(import.meta.dirname, "driver-input-devices.html"),
          driverChipset: path.resolve(import.meta.dirname, "driver-chipset.html"),
          driverBluetooth: path.resolve(import.meta.dirname, "driver-bluetooth.html"),
          driverVirtual: path.resolve(import.meta.dirname, "driver-virtual.html"),
        },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: false,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
