<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useLbPhone } from "../composables/useLbPhone.ts";
import AppHeader from "../components/AppHeader.vue";

const router = useRouter();

// Demo items for dynamic routing example
const demoItems = [
  { id: 1, title: "First Item", color: "#007AFF" },
  { id: 2, title: "Second Item", color: "#34C759" },
  { id: 3, title: "Third Item", color: "#FF9500" },
];

const direction = ref("N");
const position = ref({ x: 0, y: 0, z: 0 });
const notificationText = ref("Notification text");

const {
  setPopUp,
  setContextMenu,
  selectGIF,
  selectGallery,
  selectEmoji,
  fetchNui,
  sendNotification,
  colorPicker,
  useCamera,
} = useLbPhone();

onMounted(() => {
  fetchNui?.("getDirection")?.then((dir: any) => {
    direction.value = dir;
  });

  fetchNui?.("getPosition")?.then((pos: any) => {
    if (pos) {
      position.value = pos;
    }
  });

  window.addEventListener(
    "message",
    (
      e: MessageEvent<{
        type?: string;
        direction?: string;
        position?: { x: number; y: number; z: number };
      }>,
    ) => {
      if (e.data?.type === "updateDirection" && e.data.direction) {
        direction.value = e.data.direction;
      }
      if (e.data?.type === "updatePosition" && e.data.position) {
        position.value = e.data.position;
      }
    },
  );
});

watch(notificationText, (newValue) => {
  if (newValue === "") notificationText.value = "Notification text";
});

const showPopupMenu = () => {
  setPopUp({
    title: "Popup Menu",
    description: "Confirm your choice",
    buttons: [
      {
        title: "Cancel",
        color: "red",
        cb: () => console.log("Cancel"),
      },
      {
        title: "Confirm",
        color: "blue",
        cb: () => console.log("Confirm"),
      },
    ],
  });
};

const showContextMenu = () => {
  setContextMenu({
    title: "Context menu",
    buttons: [
      {
        title: "Phone Notification",
        color: "blue",
        cb: () => sendNotification({ title: notificationText.value }),
      },
      {
        title: "GTA Notification",
        color: "red",
        cb: () => fetchNui("drawNotification", { message: notificationText.value }),
      },
    ],
  });
};

const selectGIFHandler = () => {
  selectGIF((gif: any) => {
    console.log(typeof gif);
    setPopUp({
      title: "Selected GIF",
      attachment: { src: gif },
      buttons: [{ title: "OK" }],
    });
  });
};

const selectGalleryHandler = () => {
  selectGallery({
    includeVideos: true,
    includeImages: true,
    cb: (data: any) => {
      setPopUp({
        title: "Selected media",
        attachment: data,
        buttons: [{ title: "OK" }],
      });
    },
  });
};

const selectEmojiHandler = () => {
  selectEmoji((emoji: any) => {
    setPopUp({
      title: "Selected emoji",
      description: emoji,
      buttons: [{ title: "OK" }],
    });
  });
};

const colorPickerHandler = () => {
  colorPicker((color: any) => {
    setPopUp({
      title: "Selected color",
      description: color,
      buttons: [{ title: "OK" }],
    });
  });
};

const useCameraHandler = () => {
  useCamera(
    (url: any) => {
      setPopUp({
        title: "Media taken",
        attachment: { src: url },
        buttons: [{ title: "OK" }],
      });
    },
    {
      default: {
        type: "Photo", // 'Photo' | 'Video' | 'Landscape'
        flash: false,
        camera: "rear", // 'rear' | 'front'
      },
      permissions: {
        toggleFlash: true,
        flipCamera: true,
        takePhoto: true,
        takeVideo: true,
        takeLandscapePhoto: true,
      },
    },
  );
};
</script>

<template>
  <div class="page-container">
    <AppHeader title="OG App Template" subtitle="This is a subtitle" />

    <div class="page-content">
      <!-- Navigation Demo Section -->
      <section class="demo-section">
        <h2 class="section-title">Navigation</h2>
        <button class="nav-button" @click="router.push('/settings')">
          <span class="nav-icon">&#9881;</span>
          <span>Settings Page</span>
          <span class="nav-arrow">&#8250;</span>
        </button>
      </section>

      <!-- Dynamic Routing Demo Section -->
      <section class="demo-section">
        <h2 class="section-title">Dynamic Routes</h2>
        <div class="item-list">
          <button
            v-for="item in demoItems"
            :key="item.id"
            class="item-button"
            @click="router.push(`/detail/${item.id}`)"
          >
            <span class="item-color" :style="{ backgroundColor: item.color }"></span>
            <span class="item-title">{{ item.title }}</span>
            <span class="nav-arrow">&#8250;</span>
          </button>
        </div>
      </section>

      <!-- NUI Demo Section -->
      <section class="demo-section">
        <h2 class="section-title">NUI Communication</h2>

        <!-- Mini Map Display -->
        <div class="mini-map-container">
          <div class="mini-map">
            <div
              class="compass-rotating"
              :style="{ transform: `rotate(${-(parseFloat(direction) || 0)}deg)` }"
            >
              <div class="map-grid">
                <div class="grid-line horizontal"></div>
                <div class="grid-line vertical"></div>
              </div>
              <div class="compass-rose">
                <span class="compass-label north">N</span>
                <span class="compass-label east">E</span>
                <span class="compass-label south">S</span>
                <span class="compass-label west">W</span>
              </div>
            </div>
            <!-- Player marker stays fixed, always pointing up -->
            <div class="player-marker">
              <div class="marker-line"></div>
              <div class="marker-dot"></div>
              <div class="marker-direction"></div>
            </div>
          </div>
          <div class="map-info">
            <div class="direction-display">
              <span class="direction-label">Heading:</span>
              <span class="direction-value">{{ direction }}</span>
            </div>
            <div class="position-display">
              <span class="position-label">GPS Position:</span>
              <div class="position-coords">
                <span class="coord"
                  ><span class="coord-label">X:</span> {{ position.x.toFixed(1) }}</span
                >
                <span class="coord"
                  ><span class="coord-label">Y:</span> {{ position.y.toFixed(1) }}</span
                >
                <span class="coord"
                  ><span class="coord-label">Z:</span> {{ position.z.toFixed(1) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- LB Phone APIs Section -->
      <section class="demo-section">
        <h2 class="section-title">LB Phone APIs</h2>
        <div class="button-wrapper">
          <button @click="showPopupMenu">Popup Menu</button>
          <button @click="showContextMenu">Context menu</button>
          <button @click="selectGIFHandler">Gif Selector</button>
          <button @click="selectGalleryHandler">Gallery Selector</button>
          <button @click="selectEmojiHandler">Emoji Selector</button>
          <button @click="colorPickerHandler">Color Picker</button>
          <button @click="useCameraHandler">Camera Component</button>
          <input placeholder="Notification text" v-model="notificationText" />
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
  top: 6.5rem; /* 3rem safe area + 3.5rem header */
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  padding: 1rem;
  overflow-y: auto;
}

.demo-section {
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

.nav-button,
.item-button {
  width: 100%;
  height: auto;
  padding: 0.875rem 1rem;

  display: flex;
  align-items: center;
  gap: 0.75rem;

  background-color: var(--background-highlight);
  border-radius: 0.75rem;

  font-size: 0.875rem;
  font-weight: 500;
  text-transform: none;
}

.nav-icon {
  font-size: 1.25rem;
}

.nav-arrow {
  margin-left: auto;
  font-size: 1.25rem;
  color: var(--text-secondary);
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-color {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.item-title {
  flex: 1;
  text-align: left;
}

/* Mini Map Styles */
.mini-map-container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--background-highlight);
  border-radius: 0.75rem;
}

.mini-map {
  position: relative;
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(0, 122, 255, 0.05) 100%);
  border-radius: 50%;
  border: 2px solid var(--accent);
  flex-shrink: 0;
  overflow: hidden;
}

.compass-rotating {
  position: absolute;
  inset: 0;
  transition: transform 0.15s ease-out;
}

.map-grid {
  position: absolute;
  inset: 0;
  opacity: 0.3;
}

.grid-line {
  position: absolute;
  background-color: var(--text-secondary);
}

.grid-line.horizontal {
  left: 10%;
  right: 10%;
  top: 50%;
  height: 1px;
  transform: translateY(-50%);
}

.grid-line.vertical {
  top: 10%;
  bottom: 10%;
  left: 50%;
  width: 1px;
  transform: translateX(-50%);
}

.compass-rose {
  position: absolute;
  inset: 0;
}

.compass-label {
  position: absolute;
  font-size: 0.5rem;
  font-weight: 700;
  color: var(--text-secondary);
}

.compass-label.north {
  top: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--accent);
}

.compass-label.south {
  bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
}

.compass-label.east {
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
}

.compass-label.west {
  left: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
}

.player-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1.5rem;
  height: 1.5rem;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.marker-line {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 50%;
  background: linear-gradient(to bottom, #ff3b30, #ff3b30 70%, transparent);
  transform: translateX(-50%);
  box-shadow: 0 0 0.25rem rgba(255, 59, 48, 0.6);
}

.marker-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #ff3b30;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0.5rem rgba(255, 59, 48, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.marker-direction {
  position: absolute;
  top: 0.125rem;
  left: 50%;
  width: 0;
  height: 0;
  border-left: 0.3rem solid transparent;
  border-right: 0.3rem solid transparent;
  border-bottom: 0.6rem solid #ff3b30;
  transform: translateX(-50%);
  filter: drop-shadow(0 0 0.25rem rgba(255, 59, 48, 0.6));
}

.map-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.direction-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.direction-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.direction-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.position-display {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.position-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.position-coords {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.coord {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-primary);
  font-family: monospace;
}

.coord-label {
  color: var(--text-secondary);
  font-weight: 400;
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.button-wrapper button,
.button-wrapper input {
  width: 100%;
  height: 2.75rem;
}
</style>
