import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import { defineConfig, type ConfigEnv } from "vite";

export default defineConfig(({ command }: ConfigEnv) => ({
  base: command === "build" ? "/ui/dist" : undefined,
  define: {
    global: "window",
  },
  build: {
    sourcemap: false,
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          // Split vendor chunks for better caching
          if (id.includes("node_modules")) {
            if (id.includes("vue")) {
              return "vue-vendor";
            }
            return "vendor";
          }
        },
        // Optimize chunk size
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    // this is very specific to 0NEGUY and will not work for you - comment this out if you aren't 0NEGUY
    outDir: "D:\\ChaseRoleplay\\resources\\[phone-apps]\\[personal]\\app-rideme\\dist",
    // Optimize for production
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
  ],
}));
