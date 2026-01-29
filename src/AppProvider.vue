<script setup lang="ts">
import Frame from "./components/Frame.vue";

defineProps<{
  devMode: boolean;
}>();
</script>

<template>
  <div>
    <div v-if="devMode" class="dev-wrapper">
      <Frame>
        <slot />
      </Frame>
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>
