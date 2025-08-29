function isDecimalDot(text, index) {
  const prev = text[index - 1];
  const next = text[index + 1];
  return /[0-9]/.test(prev || '') && /[0-9]/.test(next || '');
}

export function renderBackground(p, text, config) {
  const { width, height, margin } = config.canvas;
  const { fontSizePt, leadingPt, columnStepPt, startFromRight } = config.backgroundText;
  const opacityCfg = config.backgroundText.opacity;
  let alpha = 77; // default ~30%
  if (typeof opacityCfg === 'number') {
    alpha = opacityCfg <= 1 ? Math.round(255 * opacityCfg) : Math.round(opacityCfg);
    alpha = Math.max(0, Math.min(255, alpha));
  }

  p.push();
  p.fill(255, alpha);
  p.noStroke();
  p.textFont('Doto');
  p.textSize(fontSizePt);
  p.textLeading(leadingPt);
  p.textAlign(p.RIGHT, p.TOP);

  const startX = startFromRight ? width - margin : margin;
  const stepX = columnStepPt;
  let x = startX;
  let y = margin;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if ((ch === '.' && !isDecimalDot(text, i)) || ch === ',') {
      // New column
      x += startFromRight ? -stepX : stepX;
      y = margin;
      continue;
    }

    p.text(ch, x, y);
    y += leadingPt;
    if (y > height - margin) {
      x += startFromRight ? -stepX : stepX;
      y = margin;
    }
  }
  p.pop();
}

