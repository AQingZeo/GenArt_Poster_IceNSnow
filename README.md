# Ice & Snow Poster (p5.js + Matter.js)

Generative A3 poster (2480×3508 px) that renders vertical background text, drops characters with physics, and “crystalizes” identical letters when they touch.

## Quick start

- Serve the folder with any static server (modules + fetch need http/https):
  - Python: `python3 -m http.server 8000`
  - Node: `npx http-server -p 8000`
- Open `http://localhost:8000/` and it will load `index.html`.
- Click Export PNG in the on-canvas debug panel to download a snapshot.

## Controls (debug panel)
- Background: toggle vertical background text.
- Dropper: toggle falling characters.
- Crystalizer: toggle connecting same characters.
- Export PNG: save the current canvas image.

## Configuration
Edit `src/config.js` to tweak behavior. Key knobs:

- Canvas: `canvas.width`, `canvas.height`, `backgroundColor`
- Background text: `backgroundText.opacity` (0–1 or 0–255 alpha)
- Falling speed: `dropper.gravityY` (lower = slower), `dropper.airFriction` (higher = slower), `dropper.friction`
- Dropping interval: `dropper.spawnIntervalMs` (time between spawns), `dropper.spawnBatchSize` (how many per tick)
- Crystalizer: `crystalizer.distanceThresholdPt`, `lineWeightPt`, `requirePassHalf`, `passHalfRatio`
- Font: `font.family`, `font.weight`, `font.sizePt`, `font.capSizePt`

Text source is `IceNSnow_text.txt` (fetched at runtime).

## Project structure
```
index.html           # Loads p5.js, matter.js, and src/main.js (module)
src/
  main.js            # p5 instance setup, feeding, UI, export
  config.js          # Central configuration (edit here)
  utils/textLoader.js
  modules/
    positionCalculator.js   # Precompute x positions per char
    backgroundRenderer.js   # Vertical background text
    charDropper.js          # Matter world + bodies
    crystalizer.js          # Connect identical chars
p5.js, matter.js     # Local copies of libraries
IceNSnow_text.txt    # Input text
```

## Notes
- Must run over a local server; `file://` will break module imports and fetch.
- Google Fonts are loaded in `index.html` (Doto, Jersey 10).

