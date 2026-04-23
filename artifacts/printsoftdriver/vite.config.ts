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
          printerDrivers: path.resolve(import.meta.dirname, "printer-drivers.html"),
          graphicsDrivers: path.resolve(import.meta.dirname, "graphics-drivers.html"),
          audioDrivers: path.resolve(import.meta.dirname, "audio-drivers.html"),
          networkDrivers: path.resolve(import.meta.dirname, "network-drivers.html"),
          usbDrivers: path.resolve(import.meta.dirname, "usb-drivers.html"),
          systemDrivers: path.resolve(import.meta.dirname, "system-drivers.html"),
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
