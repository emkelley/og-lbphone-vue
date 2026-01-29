# 0NEGUY's LB Phone - Vue Template

## What is this?
This is a template for creating apps for the LB Phone FiveM resource. Based on the latest version of Vue.js and typescript.

## Installing modules

1. Make sure [node.js](https://nodejs.org/en/download) is installed.
2. Make sure [pnpm](https://pnpm.io/installation) is installed.
3. CD to the project folder and run `pnpm i`, wait for it to complete.

## Development Workflow

We do not keep our app source code in the main resource folder of the FiveM server, only built files. To accommodate this, there is a special build configuration option in the `vite.config.ts` file that allows us to build the app to a specific folder. This should be adjusted to your needs - my settings WILL NOT WORK for you.

## Browser-Only Development

For quick iteration without needing the game running, you can follow these steps. This is useful, but I recommend in-game development with live reloading for a more realistic experience and access to NUI functions, events, and things defined in Lua files.

1. Run `pnpm run dev`
2. Go to `http://localhost:3000` in your browser to see the app.

## In-Game Development with Live Reloading

Development within the game with live reloading is possible but requires a little setup:

### Initial Setup

1. Create a folder for your app in your FiveM server's resources directory. We use `resources/[phone-apps]/app-name` but feel free to use whatever structure works for your project.

2. Copy the `client.lua` and `fxmanifest.lua` files from the `_lua-examples` folder into your new resource folder. These files are pre-configured to support both local development and production modes.

3. **Important: Update your app identifier consistently.** In `client.lua`, the `identifier` variable (line 1) must be unique to your app and consistent everywhere it's referenced. This identifier is used by LB Phone to track your app. If it doesn't match across your code, things will break (e.g., `SendCustomAppMessage` won't work).

4. Update your app's metadata in both lua files:

   In `fxmanifest.lua`:
   - `title` - Resource title
   - `description` - Resource description
   - `author` - Your name/brand

   In `client.lua`:
   - `name` - Display name shown in the app store
   - `description` - App description
   - `developer` - Your name/brand
   - `size` - App size in KB (shown in app store)

5. Update the `outDir` option in `vite.config.ts` to point to a `dist` folder inside your resource:
   ```ts
   outDir: "path/to/your/server/resources/[phone-apps]/app-name/dist"
   ```

### App Images

Your app needs an icon and optionally screenshot images for the app store:

- **Icon** (`public/icon.png`) - The app icon displayed in the phone's app drawer and app store. Keep it square (recommended 512x512 or similar).
- **Screenshots** (`public/screenshot-light.png`, `public/screenshot-dark.png`) - Optional showcase images displayed in the app store. These help users preview your app before downloading.

These files are in the `public` folder and will be copied to `dist` during build. The `client.lua` references them via the `icon` and `images` properties in `AddCustomApp`.

### Running in Local Development Mode

1. Run `pnpm run dev` to start the Vite dev server.
2. In your resource's `fxmanifest.lua`:
   - Ensure line 14 (`ui_page "http://localhost:3000"`) is uncommented
   - Ensure line 15 (`ui_page "dist/index.html"`) is commented out
3. In your resource's `client.lua`:
   - Ensure line 24 (`ui = "http://localhost:3000"`) is uncommented
   - Ensure line 25 (`ui = GetCurrentResourceName() .. "/dist/index.html"`) is commented out
4. Refresh/ensure your resource in-game.

Changes you make in your source code will now hot-reload in the game.

## Production Build

1. Run `pnpm run build` to build the app. The build will output to the configured `outDir`.
2. In your resource's `fxmanifest.lua`:
   - Comment out line 14 (`ui_page "http://localhost:3000"`)
   - Uncomment line 15 (`ui_page "dist/index.html"`)
3. In your resource's `client.lua`:
   - Comment out line 24 (`ui = "http://localhost:3000"`)
   - Uncomment line 25 (`ui = GetCurrentResourceName() .. "/dist/index.html"`)
4. Refresh/ensure your resource in-game.

## LB Phone Composable

The `useLbPhone` composable is a wrapper around the LB Phone API. It is used to interact with the LB Phone API and to get the current state of the LB Phone. This should be used whenever you need to interact with the LB Phone API.