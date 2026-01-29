<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
  showBack?: boolean;
}>();

const emit = defineEmits<{
  back: [];
}>();

const handleBack = () => {
  emit("back");
};
</script>

<template>
  <header class="app-header">
    <div class="header-left">
      <button v-if="showBack" class="back-btn" @click="handleBack">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    </div>
    <div class="header-center">
      <h1 v-if="title" class="header-title">{{ title }}</h1>
      <p v-if="subtitle" class="header-subtitle">{{ subtitle }}</p>
    </div>
    <div class="header-right">
      <slot name="right" />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: absolute;
  top: 3rem; /* Offset for dynamic island/status bar safe area */
  left: 0;
  right: 0;

  width: 100%;
  height: 3.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;

  background-color: var(--background-primary);
  border-bottom: 1px solid var(--background-highlight);

  z-index: 100;
}

.header-left,
.header-right {
  width: 3rem;
  display: flex;
  align-items: center;
}

.header-left {
  justify-content: flex-start;
}

.header-right {
  justify-content: flex-end;
}

.header-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.125rem;
}

.header-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.header-subtitle {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.2;
}

.back-btn {
  width: 2rem;
  height: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: none;
  border-radius: 50%;
  padding: 0;

  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.back-btn:hover {
  background-color: var(--background-highlight);
  filter: none;
}

.back-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
