import config from './config.js';
import { loadLocalText, normalizeNewlines } from './utils/textLoader.js';
import { PositionCalculator } from './modules/positionCalculator.js';
import { renderBackground } from './modules/backgroundRenderer.js';
import { CharDropper } from './modules/charDropper.js';
import { Crystalizer } from './modules/crystalizer.js';

let flags = { ...config.flags };

function setupDebugUI() {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '12px';
  container.style.left = '12px';
  container.style.padding = '10px 12px';
  container.style.background = 'rgba(0,0,0,0.6)';
  container.style.color = '#fff';
  container.style.fontFamily = 'Doto, sans-serif';
  container.style.fontSize = '14px';
  container.style.zIndex = '9999';

  container.innerHTML = `
    <div>Font: Doto (w400)</div>
    <label><input id="bgToggle" type="checkbox" checked /> Background</label>
    <label style="margin-left:8px"><input id="dropToggle" type="checkbox" checked /> Dropper</label>
    <label style="margin-left:8px"><input id="crysToggle" type="checkbox" checked /> Crystalizer</label>
    <button id="exportBtn" style="margin-left:8px">Export PNG</button>
  `;

  document.body.appendChild(container);

  const bgToggle = document.getElementById('bgToggle');
  const dropToggle = document.getElementById('dropToggle');
  const crysToggle = document.getElementById('crysToggle');
  const exportBtn = document.getElementById('exportBtn');
  bgToggle.addEventListener('change', () => (flags.enableBackground = bgToggle.checked));
  dropToggle.addEventListener('change', () => (flags.enableDropper = dropToggle.checked));
  crysToggle.addEventListener('change', () => (flags.enableCrystalizer = crysToggle.checked));
  exportBtn.addEventListener('click', () => {
    const old = document.querySelector('canvas');
    if (!old) return;
    const link = document.createElement('a');
    link.download = 'ice-and-snow-poster.png';
    link.href = old.toDataURL('image/png');
    link.click();
  });
}

window.addEventListener('load', async () => {
  setupDebugUI();
});

// p5 instance-mode sketch
new p5((p) => {
  let preloadText = '';
  let positionCalculator;
  let charDropper;
  let crystalizer;

  p.preload = async () => {
    try {
      const txt = await loadLocalText('../IceNSnow_text.txt');
      preloadText = normalizeNewlines(txt);
    } catch (err) {
      console.error(err);
      preloadText = 'Error loading text.';
    }
  };

  p.setup = () => {
    const canvas = p.createCanvas(config.canvas.width, config.canvas.height);
    canvas.parent('p5-container');
    p.background(config.canvas.backgroundColor);
    p.fill(255);
    p.noStroke();
    p.textFont('Doto');

    positionCalculator = new PositionCalculator(config);
    charDropper = new CharDropper(p, config, positionCalculator);
    crystalizer = new Crystalizer(config);

    const feed = () => {
      if (!flags.enableDropper) return;
      const batch = config.dropper.spawnBatchSize ?? 1;
      for (let k = 0; k < batch; k++) {
        const nextIndex = Math.floor(p.random(preloadText.length));
        const ch = preloadText[nextIndex];
        if (ch && ch !== '\n') {
          charDropper.addCharacter(ch);
        }
      }
    };
    const interval = config.dropper.spawnIntervalMs ?? 100;
    setInterval(feed, interval);

    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
  };

  p.draw = () => {
    p.background(0);
    if (flags.enableBackground) {
      renderBackground(p, preloadText, config);
    }
    if (flags.enableDropper) {
      charDropper.draw(p);
    }
    if (flags.enableCrystalizer) {
      crystalizer.draw(p, charDropper.bodies, charDropper.engine);
    }
  };
});

