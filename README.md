# 0NEGUY's LB Phone - Vue Template

## What is this?
This is a template for creating apps for the LB Phone FiveM resource. Based on the latest version of Vue.js and typescript.

## Installing modules

1. Make sure [node.js](https://nodejs.org/en/download) is installed.
2. Make sure [pnpm](https://pnpm.io/installation) is installed.
3. CD to the project folder and run `pnpm i`, wait for it to complete.

## Development Workflow
This is dependent on your workflow, but here is how I do it:

We do not keep our app source code in the main resource folder of the FiveM server, only built files. To accomodate this, there is a special build configuration option in the `vite.config.ts` file that allows us to build the app to a specific folder. This should be adjusted to your needs - my settings WILL NOT WORK for you.

## Local Development

1. Run `pnpm run dev`
2. Go to `http://localhost:3000` in your browser to see the app in your browser.
3. Comment out line 15 and uncomment line 16 in fxmanifest.lua
4. Comment out line 25 and uncomment line 24 in client.lua.
5. Refresh and ensure the resource

## Production Build

1. Run `pnpm run build` to build the app. The build will be in the `dist` folder.
2. Comment out line 16 and uncomment line 15 in fxmanifest.lua
3. Comment out line 24 and uncomment line 25 in client.lua.
4. Refresh and ensure the resource

## LB Phone Composable

The `useLbPhone` composable is a wrapper around the LB Phone API. It is used to interact with the LB Phone API and to get the current state of the LB Phone. This should be used whenever you need to interact with the LB Phone API.