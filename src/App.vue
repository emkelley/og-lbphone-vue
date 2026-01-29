<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import AppProvider from "./AppProvider.vue";
import { useLbPhone } from "./composables/useLbPhone";

const { devMode, theme, initTheme, fetchNui } = useLbPhone();

onMounted(() => {
  if (devMode) {
    document.documentElement.style.visibility = "visible";
    document.body.style.visibility = "visible";
  } else {
    initTheme();
    fetchNui("appOpened");
  }
});

onUnmounted(() => {
  if (!devMode) {
    fetchNui("appClosed");
  }
});
</script>

<template>
  <AppProvider :devMode="devMode">
    <router-view />
  </AppProvider>
</template>
