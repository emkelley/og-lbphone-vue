import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import {
  copyFileSync,
  cpSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  rmSync,
  existsSync,
} from "fs";
import { join } from "path";
import { defineConfig, type ConfigEnv } from "vite";

const DEPLOY_DIR = "path/to/your/deploy/directory";

export default defineConfig(({ command }: ConfigEnv) => ({
  base: command === "build" ? "./" : undefined,
  define: {
    global: "window",
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes("node_modules")) {
            if (id.includes("vue")) {
              return "vue-vendor";
            }
            return "vendor";
          }
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    target: "es2015",
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    esbuildOptions: {
      mainFields: ["module", "main"],
      resolveExtensions: [".ts", ".tsx", ".js", ".jsx"],
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    vue(),
    Pages({
      dirs: "src/pages",
    }),
    {
      name: "delete-dist",
      buildStart() {
        if (existsSync(DEPLOY_DIR)) {
          rmSync(DEPLOY_DIR, { recursive: true });
        }
      },
    },
    {
      name: "minify-json",
      closeBundle() {
        const distDir = "dist";
        for (const file of readdirSync(distDir)) {
          if (file.endsWith(".json")) {
            const filePath = join(distDir, file);
            const content = JSON.parse(readFileSync(filePath, "utf-8"));
            writeFileSync(filePath, JSON.stringify(content));
          }
        }
      },
    },
    {
      name: "deploy-to-resource",
      closeBundle() {
        mkdirSync(`${DEPLOY_DIR}/dist`, { recursive: true });
        cpSync("dist", `${DEPLOY_DIR}/dist`, { recursive: true });
        for (const file of readdirSync("lua")) {
          if (file.endsWith(".lua")) {
            copyFileSync(join("lua", file), join(DEPLOY_DIR, file));
          }
        }
        console.log(`\nDeployed to ${DEPLOY_DIR}`);
      },
    },
  ],
}));
