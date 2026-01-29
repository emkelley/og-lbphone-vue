import { ref, type Ref } from "vue";
import type {
  PopUpOptions,
  ContextMenuOptions,
  NotificationOptions,
  GalleryOptions,
  CameraOptions,
  PhoneSettings,
} from "../env.d";

// Shared reactive state (singleton)
const theme: Ref<"light" | "dark"> = ref("light");
const devMode: boolean = !window.invokeNative;

export interface UseLbPhoneReturn {
  // State
  devMode: boolean;
  theme: Ref<"light" | "dark">;
  // UI
  setPopUp: (options: PopUpOptions) => void;
  setContextMenu: (options: ContextMenuOptions) => void;
  sendNotification: (options: NotificationOptions) => void;
  // Media
  selectGIF: (callback: (gif: string) => void) => void;
  selectGallery: (options: GalleryOptions) => void;
  selectEmoji: (callback: (emoji: string) => void) => void;
  colorPicker: (callback: (color: string) => void) => void;
  useCamera: (callback: (url: string) => void, options?: CameraOptions) => void;
  // NUI
  fetchNui: <T = unknown>(event: string, data?: unknown) => Promise<T> | undefined;
  // Settings
  getSettings: () => Promise<PhoneSettings> | undefined;
  onSettingsChange: (callback: (settings: PhoneSettings) => void) => void;
  initTheme: () => void;
}

export function useLbPhone(): UseLbPhoneReturn {
  // UI utilities
  const setPopUp = (options: PopUpOptions): void => {
    window.setPopUp?.(options);
  };

  const setContextMenu = (options: ContextMenuOptions): void => {
    window.setContextMenu?.(options);
  };

  const sendNotification = (options: NotificationOptions): void => {
    window.sendNotification?.(options);
  };

  // Media utilities
  const selectGIF = (callback: (gif: string) => void): void => {
    window.selectGIF?.(callback);
  };

  const selectGallery = (options: GalleryOptions): void => {
    window.selectGallery?.(options);
  };

  const selectEmoji = (callback: (emoji: string) => void): void => {
    window.selectEmoji?.(callback);
  };

  const colorPicker = (callback: (color: string) => void): void => {
    window.colorPicker?.(callback);
  };

  const useCamera = (callback: (url: string) => void, options?: CameraOptions): void => {
    window.useCamera?.(callback, options);
  };

  // NUI communication
  const fetchNui = <T = unknown>(event: string, data?: unknown): Promise<T> | undefined => {
    return window.fetchNui?.<T>(event, data);
  };

  // Settings
  const getSettings = (): Promise<PhoneSettings> | undefined => {
    return window.getSettings?.();
  };

  const onSettingsChange = (callback: (settings: PhoneSettings) => void): void => {
    window.onSettingsChange?.(callback);
  };

  // Theme management with reactive state
  const initTheme = (): void => {
    if (devMode) return;

    getSettings()?.then((settings) => {
      if (settings?.display?.theme) {
        theme.value = settings.display.theme;
      }
    });

    onSettingsChange((settings) => {
      if (settings?.display?.theme) {
        theme.value = settings.display.theme;
      }
    });
  };

  return {
    // State
    devMode,
    theme,
    // UI
    setPopUp,
    setContextMenu,
    sendNotification,
    // Media
    selectGIF,
    selectGallery,
    selectEmoji,
    colorPicker,
    useCamera,
    // NUI
    fetchNui,
    // Settings
    getSettings,
    onSettingsChange,
    initTheme,
  };
}
