<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppHeader from "../../components/AppHeader.vue";

const route = useRoute();
const router = useRouter();

// Get the dynamic ID from the route params
const itemId = computed(() => route.params.id as string);

// Demo data - in a real app this would come from an API or store
const demoItems: Record<string, { title: string; description: string; color: string }> = {
  "1": {
    title: "First Item",
    description:
      "This is the first demo item. It showcases how to display detailed information based on the route parameter.",
    color: "#007AFF",
  },
  "2": {
    title: "Second Item",
    description:
      "This is the second demo item. Each item has its own unique content loaded dynamically.",
    color: "#34C759",
  },
  "3": {
    title: "Third Item",
    description:
      "This is the third demo item. You can use this pattern for user profiles, product details, etc.",
    color: "#FF9500",
  },
};

const item = computed(() => demoItems[itemId.value]);
const itemNotFound = computed(() => !item.value);
</script>

<template>
  <div class="page-container">
    <AppHeader
      :title="item?.title ?? 'Not Found'"
      :subtitle="`ID: ${itemId}`"
      showBack
      @back="router.back()"
    />

    <div class="page-content">
      <!-- Item Found -->
      <template v-if="item">
        <div class="detail-card">
          <div class="color-badge" :style="{ backgroundColor: item.color }"></div>
          <h2 class="detail-title">{{ item.title }}</h2>
          <p class="detail-description">{{ item.description }}</p>
        </div>

        <div class="info-card">
          <h3 class="info-title">Route Information</h3>
          <div class="info-row">
            <span class="info-label">Route Path:</span>
            <code class="info-value">{{ route.path }}</code>
          </div>
          <div class="info-row">
            <span class="info-label">Param ID:</span>
            <code class="info-value">{{ itemId }}</code>
          </div>
          <div class="info-row">
            <span class="info-label">File Location:</span>
            <code class="info-value">pages/detail/[id].vue</code>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="router.push(`/detail/${Number(itemId) - 1}`)">Previous</button>
          <button @click="router.push(`/detail/${Number(itemId) + 1}`)">Next</button>
        </div>
      </template>

      <!-- Item Not Found -->
      <template v-else>
        <div class="not-found">
          <span class="not-found-icon">?</span>
          <h2 class="not-found-title">Item Not Found</h2>
          <p class="not-found-text">No item exists with ID "{{ itemId }}"</p>
          <button @click="router.push('/')">Go Home</button>
        </div>
      </template>
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
  gap: 1rem;

  padding: 1rem;
  overflow-y: auto;
}

.detail-card {
  background-color: var(--background-highlight);
  border-radius: 0.75rem;
  padding: 1.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
}

.color-badge {
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
}

.detail-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.detail-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.info-card {
  background-color: var(--background-highlight);
  border-radius: 0.75rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin: 0 0 0.25rem 0;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-size: 0.875rem;
  color: var(--text-primary);
}

.info-value {
  font-size: 0.75rem;
  color: var(--text-secondary);
  background-color: var(--background-primary);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
}

.action-buttons button {
  flex: 1;
  height: 2.75rem;
}

/* Not Found State */
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  text-align: center;
}

.not-found-icon {
  width: 4rem;
  height: 4rem;
  background-color: var(--background-highlight);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-secondary);
}

.not-found-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.not-found-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.not-found button {
  margin-top: 0.5rem;
  padding: 0 1.5rem;
  height: 2.5rem;
}
</style>
