# Eggtart Game

A production-ready **Phaser 4 + TypeScript + Vite** game boilerplate, structured after the
[official Phaser template](https://github.com/phaserjs/template-vite-ts) with a few best-practice
additions: responsive scaling, Arcade physics wired up, centralized constants, and a small playable
demo scene.

- **Phaser** `4.2.0` · **Vite** `6` · **TypeScript** `5.7` (strict)
- No telemetry, no binary assets (art is authored as SVG).

## Quick start

```bash
npm install
npm run dev        # dev server at http://localhost:8080
```

| Script | Does |
| --- | --- |
| `npm run dev` | Start the Vite dev server (HMR). |
| `npm run build` | Production build to `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run typecheck` | Type-check without emitting (`tsc --noEmit`). |

## Project structure

```
public/
  favicon.svg
  style.css
  assets/               # static files served as-is (background, logo, player)
src/
  main.ts               # DOM entry — boots the game into #game-container
  game/
    main.ts             # Phaser.Game config (size, scale, physics, scene list)
    constants.ts        # GAME_WIDTH/HEIGHT + SceneKeys registry
    scenes/
      Boot.ts           # loads assets the Preloader needs
      Preloader.ts      # progress bar + loads game assets
      MainMenu.ts       # title screen — click to start
      Game.ts           # playable demo (WASD/arrows move a physics sprite)
      GameOver.ts       # end screen — click to return to menu
vite/
  config.dev.mjs        # dev config
  config.prod.mjs       # prod config (terser, Phaser split into its own chunk)
```

**Scene flow:** `Boot → Preloader → MainMenu → Game → GameOver → MainMenu`

## Extending it

**Add a scene:** create `src/game/scenes/MyScene.ts`, add its key to `SceneKeys` in
[constants.ts](src/game/constants.ts), then register the class in the `scene` array in
[game/main.ts](src/game/main.ts). Transition with `this.scene.start(SceneKeys.MyScene)`.

**Add an asset:** drop the file in `public/assets/` and load it in a scene's `preload()`
(e.g. `this.load.image('key', 'file.png')`). Files in `public/` are served from the root.

**Enable gravity:** set `physics.arcade.gravity.y` in [game/main.ts](src/game/main.ts);
flip `debug: true` to see physics bodies.

## Phaser 4 notes

Phaser 4 keeps the Phaser 3 API but ships a rebuilt WebGL renderer (RenderNode architecture),
a unified **Filter** system (FX + masks merged), `SpriteGPULayer` for huge sprite counts, and
GL texture orientation (Y=0 at the bottom). If you port v3 code, the main things to watch are
custom WebGL pipelines (now render nodes), `setTintFill()` → `setTint()` + `setTintMode()`, and
removed `Mesh`/`Plane` objects. See the official
[v3 → v4 migration guide](https://github.com/phaserjs/phaser/blob/master/changelog/v4/4.0/MIGRATION-GUIDE.md).
