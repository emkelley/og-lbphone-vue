/// <reference types="vite/client" />

// vite-plugin-pages module declaration
declare module "~pages" {
  import type { RouteRecordRaw } from "vue-router";
  const routes: RouteRecordRaw[];
  export default routes;
}

// LB Phone SDK Types
export interface PopUpButton {
  title: string;
  color?: "red" | "blue" | "green";
  cb?: () => void;
}

export interface PopUpAttachment {
  src: string;
}

export interface PopUpOptions {
  title: string;
  description?: string;
  attachment?: PopUpAttachment;
  buttons?: PopUpButton[];
}

export interface ContextMenuButton {
  title: string;
  color?: "red" | "blue" | "green";
  cb?: () => void;
}

export interface ContextMenuOptions {
  title: string;
  buttons?: ContextMenuButton[];
}

export interface NotificationOptions {
  title: string;
  description?: string;
  icon?: string;
}

export interface GalleryOptions {
  includeVideos?: boolean;
  includeImages?: boolean;
  cb: (data: { src: string }) => void;
}

export type CameraType = "Photo" | "Video" | "Landscape";
export type CameraPosition = "rear" | "front";

export interface CameraDefaults {
  type?: CameraType;
  flash?: boolean;
  camera?: CameraPosition;
}

export interface CameraPermissions {
  toggleFlash?: boolean;
  flipCamera?: boolean;
  takePhoto?: boolean;
  takeVideo?: boolean;
  takeLandscapePhoto?: boolean;
}

export interface CameraOptions {
  default?: CameraDefaults;
  permissions?: CameraPermissions;
}

export interface DisplaySettings {
  theme?: "light" | "dark";
}

export interface PhoneSettings {
  display?: DisplaySettings;
}

// Global window extensions for LB Phone SDK
declare global {
  interface Window {
    invokeNative?: (...args: unknown[]) => unknown;
    fetchNui?: <T = unknown>(event: string, data?: unknown) => Promise<T>;
    setPopUp?: (options: PopUpOptions) => void;
    setContextMenu?: (options: ContextMenuOptions) => void;
    sendNotification?: (options: NotificationOptions) => void;
    selectGIF?: (callback: (gif: string) => void) => void;
    selectGallery?: (options: GalleryOptions) => void;
    selectEmoji?: (callback: (emoji: string) => void) => void;
    colorPicker?: (callback: (color: string) => void) => void;
    useCamera?: (callback: (url: string) => void, options?: CameraOptions) => void;
    getSettings?: () => Promise<PhoneSettings>;
    onSettingsChange?: (callback: (settings: PhoneSettings) => void) => void;
  }
}

export {};
