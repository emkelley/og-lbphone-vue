import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import App from "./App.vue";

import "./colors.css";
import "./index.css";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const devMode = !window.invokeNative;
if (window.name === "" || devMode) {
  if (devMode) {
    createApp(App).use(router).mount("#app");
  } else {
    window.addEventListener("message", (event: MessageEvent) => {
      if (event.data === "componentsLoaded") {
        createApp(App).use(router).mount("#app");
      }
    });
  }
}
