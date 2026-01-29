<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const time = ref<string>("00:00");
let interval: ReturnType<typeof setInterval> | null = null;

const updateTime = (): void => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  time.value = `${hours}:${minutes}`;
};

onMounted(() => {
  updateTime(); // Initialize time on mount
  interval = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<template>
  <div class="phone-frame">
    <div class="phone-time">{{ time }}</div>
    <div class="phone-notch"></div>
    <div class="phone-indicator"></div>
    <div class="phone-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.phone-frame {
  position: absolute;
  z-index: 0;

  width: 92%;
  height: 98%;

  border-radius: 60px;
  box-shadow:
    0 0 0.1em 0.25em #050506,
    0 0 0 0.4em hsl(254, 30%, 85%);
}

.phone-content {
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  border-radius: 60px;
}

.phone-notch {
  position: absolute;
  top: 0.75rem;
  left: 50%;
  transform: translateX(-50%);

  height: 2.25rem;

  width: 30%;
  background-color: black;

  border-radius: 25px;
  cursor: pointer;
}

.phone-indicator {
  position: absolute;

  left: 0;
  right: 0;
  bottom: 0.5rem;
  margin: auto;

  width: 9rem;
  height: 0.313rem;

  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.25rem;

  background: transparent;
  backdrop-filter: grayscale(1) invert(1) contrast(100);

  cursor: pointer;
}

.phone-time {
  position: absolute;
  top: 0;
  width: 100%;

  padding: 1.2rem 3.5rem;

  z-index: 9;

  pointer-events: none;

  font-weight: 500;
  font-size: 1rem;

  color: black;

  font-family: "Poppins", sans-serif;
}
</style>
