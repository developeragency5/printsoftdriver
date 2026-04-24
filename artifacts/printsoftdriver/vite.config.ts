import { defineConfig } from "vite";
import path from "path";
import fs from "fs";

const basePath = process.env.BASE_PATH ?? "/";

function getAllHtmlInputs(rootDir: string): Record<string, string> {
  const inputs: Record<string, string> = {};
  const files = fs.readdirSync(rootDir).filter((f) => f.endsWith(".html"));
  for (const file of files) {
    const key = file.replace(/\.html$/, "").replace(/[^a-zA-Z0-9]/g, "_");
    inputs[key] = path.resolve(rootDir, file);
  }
  return inputs;
}

export default defineConfig(({ command }) => {
  const rawPort = process.env.PORT;
  const isServerCommand = command === "serve";

  if (isServerCommand && !rawPort) {
    throw new Error(
      "PORT environment variable is required for dev/preview but was not provided.",
    );
  }

  const parsedPort = rawPort !== undefined ? Number(rawPort) : undefined;

  if (
    parsedPort !== undefined &&
    (Number.isNaN(parsedPort) || parsedPort <= 0)
  ) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }

  const port = parsedPort ?? 5173;

  return {
  base: basePath,
  plugins: [],
  root: path.resolve(import.meta.dirname),
  publicDir: path.resolve(import.meta.dirname, "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: getAllHtmlInputs(path.resolve(import.meta.dirname)),
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
  };
});
