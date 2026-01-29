<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "../components/AppHeader.vue";
import { useLbPhone } from "../composables/useLbPhone";

const router = useRouter();
const { theme, devMode } = useLbPhone();

// Demo settings state
const username = ref("Player123");
const notificationsEnabled = ref(true);
const soundEnabled = ref(true);

// Dark mode toggle - synced with the app's theme system
const darkModeEnabled = ref(theme.value === "dark");

// Apply theme to document when toggle changes (works in dev mode)
watch(darkModeEnabled, (isDark) => {
  theme.value = isDark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme.value);
});

// Initialize theme attribute on mount
onMounted(() => {
  document.documentElement.setAttribute("data-theme", theme.value);
});
</script>

<template>
  <div class="page-container">
    <AppHeader title="Settings" subtitle="App preferences" showBack @back="router.back()" />

    <div class="page-content">
      <!-- Profile Section -->
      <section class="settings-section">
        <h2 class="section-title">Profile</h2>
        <div class="settings-card">
          <div class="setting-item">
            <label class="setting-label" for="username">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              class="setting-input"
              placeholder="Enter username"
            />
          </div>
        </div>
      </section>

      <!-- Notifications Section -->
      <section class="settings-section">
        <h2 class="section-title">Notifications</h2>
        <div class="settings-card">
          <div class="setting-item row">
            <span class="setting-label">Push Notifications</span>
            <label class="toggle">
              <input type="checkbox" v-model="notificationsEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="setting-item row">
            <span class="setting-label">Sound Effects</span>
            <label class="toggle">
              <input type="checkbox" v-model="soundEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

      <!-- Appearance Section -->
      <section class="settings-section">
        <h2 class="section-title">Appearance</h2>
        <div class="settings-card">
          <div class="setting-item row">
            <div class="setting-info">
              <span class="setting-label">Dark Mode</span>
              <span class="setting-hint">{{
                devMode ? "Dev mode: changes apply immediately" : "Synced with phone settings"
              }}</span>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="darkModeEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

      <!-- Debug Info -->
      <section class="settings-section">
        <h2 class="section-title">Current Values</h2>
        <div class="settings-card debug">
          <code>
            username: {{ username }}<br />
            notifications: {{ notificationsEnabled }}<br />
            sound: {{ soundEnabled }}<br />
            theme: {{ theme }}
          </code>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--background-primary);
}

.page-content {
  position: absolute;
  top: 6.5rem;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  padding: 1rem;
  overflow-y: auto;
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-secondary);
  padding-left: 0.5rem;
}

.settings-card {
  background-color: var(--background-highlight);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.settings-card.debug {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.setting-item.row {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.setting-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.setting-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.setting-hint {
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.setting-input {
  width: 100%;
  height: 2.5rem;
}

/* Toggle Switch */
.toggle {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.75rem;
  flex-shrink: 0;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--text-secondary);
  transition: 0.3s;
  border-radius: 1rem;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 1.25rem;
  width: 1.25rem;
  left: 0.25rem;
  bottom: 0.25rem;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

.toggle input:checked + .toggle-slider {
  background-color: #34c759;
}

.toggle input:checked + .toggle-slider:before {
  transform: translateX(1.25rem);
}
</style>
