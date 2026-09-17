/**
 * Generates a high-resolution dual texture for the 3D Sphere:
 * - Hemisphere 1 (Left 0° - 180°): Official FIFA 26 Trionda Match Ball
 * - Hemisphere 2 (Right 180° - 360°): Luxury Money / Banknote "Capital" design
 * - Golden seam divider separating both worlds
 */
export function createHybridBallCanvas(
  ballImg: HTMLImageElement,
  width = 2048,
  height = 1024
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const halfW = width / 2;

  // ==========================================
  // SIDE 1: THE FOOTBALL (Left Half: 0 to halfW)
  // ==========================================
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, halfW, height);
  ctx.clip();

  // Draw ball image scaled nicely to cover the hemisphere
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, halfW, height);

  // Center the ball image on the left hemisphere
  const imgAspect = ballImg.width / ballImg.height;
  let drawW = halfW;
  let drawH = halfW / imgAspect;
  if (drawH < height) {
    drawH = height;
    drawW = height * imgAspect;
  }
  const drawX = (halfW - drawW) / 2;
  const drawY = (height - drawH) / 2;
  ctx.drawImage(ballImg, drawX, drawY, drawW, drawH);

  // Subtle dark vignette at edges for seamless spherical rounding
  const leftVignette = ctx.createLinearGradient(0, 0, halfW, 0);
  leftVignette.addColorStop(0, 'rgba(0,0,0,0.3)');
  leftVignette.addColorStop(0.1, 'rgba(0,0,0,0)');
  leftVignette.addColorStop(0.9, 'rgba(0,0,0,0)');
  leftVignette.addColorStop(1, 'rgba(0,0,0,0.4)');
  ctx.fillStyle = leftVignette;
  ctx.fillRect(0, 0, halfW, height);
  ctx.restore();

  // ==========================================
  // SIDE 2: THE MONEY / CAPITAL (Right Half: halfW to width)
  // ==========================================
  ctx.save();
  ctx.beginPath();
  ctx.rect(halfW, 0, halfW, height);
  ctx.clip();

  // 1. Banknote Background Deep Gradient
  const bgGrad = ctx.createRadialGradient(
    halfW + halfW / 2,
    height / 2,
    50,
    halfW + halfW / 2,
    height / 2,
    halfW
  );
  bgGrad.addColorStop(0, '#064e3b'); // Emerald green core
  bgGrad.addColorStop(0.5, '#022c22'); // Deep banknote forest
  bgGrad.addColorStop(1, '#011812'); // Dark edge
  ctx.fillStyle = bgGrad;
  ctx.fillRect(halfW, 0, halfW, height);

  // 2. Guilloche Security Wave Engravings
  ctx.lineWidth = 1.2;
  const centerX = halfW + halfW / 2;
  const centerY = height / 2;

  // Concentric decorative waves
  for (let r = 80; r < 520; r += 18) {
    ctx.strokeStyle = r % 36 === 0 ? 'rgba(251, 191, 36, 0.25)' : 'rgba(16, 185, 129, 0.18)';
    ctx.beginPath();
    const steps = 180;
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;
      const wave = Math.sin(theta * 16) * 7 + Math.cos(theta * 8) * 4;
      const x = centerX + (r + wave) * Math.cos(theta);
      const y = centerY + (r + wave) * Math.sin(theta) * 0.9;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Horizontal banknote security sine weaves
  for (let y = 60; y < height; y += 32) {
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.08)';
    ctx.beginPath();
    for (let x = halfW; x <= width; x += 10) {
      const waveY = y + Math.sin((x - halfW) * 0.03) * 8 + Math.cos(x * 0.015) * 5;
      if (x === halfW) ctx.moveTo(x, waveY);
      else ctx.lineTo(x, waveY);
    }
    ctx.stroke();
  }

  // 3. Banknote Ornamental Outer Frame
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 4;
  ctx.strokeRect(halfW + 30, 40, halfW - 60, height - 80);

  ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(halfW + 40, 50, halfW - 80, height - 100);

  // 4. Corner Currency Denominations ("100" & "$")
  const corners = [
    { x: halfW + 70, y: 100, align: 'left' as const },
    { x: width - 70, y: 100, align: 'right' as const },
    { x: halfW + 70, y: height - 80, align: 'left' as const },
    { x: width - 70, y: height - 80, align: 'right' as const },
  ];

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 36px "Cinzel", "Times New Roman", serif';
  corners.forEach((c) => {
    ctx.textAlign = c.align;
    ctx.fillText('$100', c.x, c.y);
  });

  // Micro currency badge subtitle in corners
  ctx.font = 'bold 13px system-ui, sans-serif';
  ctx.fillStyle = 'rgba(110, 231, 183, 0.9)';
  ctx.textAlign = 'left';
  ctx.fillText('CAPITAL ACTIVO', halfW + 70, 122);
  ctx.textAlign = 'right';
  ctx.fillText('RESERVA 100%', width - 70, 122);
  ctx.textAlign = 'left';
  ctx.fillText('EN JUEGO 2026', halfW + 70, height - 60);
  ctx.textAlign = 'right';
  ctx.fillText('ORO / DIVISA', width - 70, height - 60);

  // 5. Central Grand Seal Medallion (The Sovereign Capital Coin)
  // Outer medallion shadow
  const sealGrad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, 230);
  sealGrad.addColorStop(0, '#065f46');
  sealGrad.addColorStop(0.7, '#022c22');
  sealGrad.addColorStop(1, '#011a14');
  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 230, 0, Math.PI * 2);
  ctx.fill();

  // Medallion Golden Rings
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#f59e0b';
  ctx.stroke();

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 218, 0, Math.PI * 2);
  ctx.stroke();

  // Golden Gear / Rosette Teeth
  ctx.fillStyle = '#fbbf24';
  const teeth = 36;
  for (let t = 0; t < teeth; t++) {
    const ang = (t / teeth) * Math.PI * 2;
    const tx = centerX + Math.cos(ang) * 210;
    const ty = centerY + Math.sin(ang) * 210;
    ctx.beginPath();
    ctx.arc(tx, ty, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Inner Medallion Background with Gold Shimmer
  const innerGold = ctx.createLinearGradient(centerX - 150, centerY - 150, centerX + 150, centerY + 150);
  innerGold.addColorStop(0, '#78350f');
  innerGold.addColorStop(0.3, '#d97706');
  innerGold.addColorStop(0.5, '#fef08a');
  innerGold.addColorStop(0.7, '#b45309');
  innerGold.addColorStop(1, '#451a03');

  // Inner Ring
  ctx.lineWidth = 4;
  ctx.strokeStyle = innerGold;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 175, 0, Math.PI * 2);
  ctx.stroke();

  // Giant Embossed Dollar Symbol
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 6;

  ctx.font = '900 170px "Georgia", "Times New Roman", serif';
  ctx.fillStyle = innerGold;
  ctx.fillText('$', centerX, centerY - 12);
  ctx.restore();

  // Top Curved Header Text inside Medallion
  ctx.font = 'bold 20px "Cinzel", "Times New Roman", serif';
  ctx.fillStyle = '#fef08a';
  ctx.textAlign = 'center';
  ctx.fillText('★ CAPITAL EN JUEGO ★', centerX, centerY - 120);

  // Bottom Banner Text inside Medallion
  ctx.font = 'bold 18px "Cinzel", "Times New Roman", serif';
  ctx.fillStyle = '#6ee7b7';
  ctx.fillText('ACTIVO ESTRATÉGICO 100%', centerX, centerY + 105);

  // 6. Banknote Corporate Ribbons (Top & Bottom of Right Side)
  // Top Banner
  ctx.fillStyle = 'rgba(6, 78, 59, 0.9)';
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 2;
  const bannerW = halfW - 240;
  const bannerH = 44;
  const bannerX = centerX - bannerW / 2;
  const bannerY = 85;

  ctx.beginPath();
  ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 10);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 16px "Times New Roman", serif';
  ctx.fillStyle = '#fef08a';
  ctx.textAlign = 'center';
  ctx.fillText('BANCO CENTRAL DE LA EMPRESA', centerX, bannerY + 28);

  // Bottom Banner with Serial Number
  const botBannerY = height - 125;
  ctx.beginPath();
  ctx.roundRect(bannerX, botBannerY, bannerW, bannerH, 10);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 15px monospace';
  ctx.fillStyle = '#a7f3d0';
  ctx.textAlign = 'center';
  ctx.fillText('№ 2026-CAPITAL-ESTRATEGIA-B2B', centerX, botBannerY + 28);

  // 7. Security Microtext Pattern Bands
  ctx.font = '9px monospace';
  ctx.fillStyle = 'rgba(167, 243, 208, 0.45)';
  const microText = 'FUTBOL ES MERCADO • CUSTODIA EL ACTIVO • CONQUISTA EL CAPITAL • ';
  ctx.fillText(microText.repeat(4), centerX, 150);
  ctx.fillText(microText.repeat(4), centerX, height - 145);

  ctx.restore();

  // ==========================================
  // SEAM DIVIDERS (At x = 0 / width, and at x = halfW)
  // Golden zipper / high-tech metallic seam connecting both worlds
  // ==========================================
  const drawSeam = (xPos: number) => {
    ctx.save();
    // Glowing seam gradient
    const seamGrad = ctx.createLinearGradient(xPos - 12, 0, xPos + 12, 0);
    seamGrad.addColorStop(0, 'rgba(0,0,0,0.7)');
    seamGrad.addColorStop(0.3, 'rgba(217, 119, 6, 0.9)');
    seamGrad.addColorStop(0.5, 'rgba(254, 240, 138, 1)');
    seamGrad.addColorStop(0.7, 'rgba(217, 119, 6, 0.9)');
    seamGrad.addColorStop(1, 'rgba(0,0,0,0.7)');

    ctx.fillStyle = seamGrad;
    ctx.fillRect(xPos - 6, 0, 12, height);

    // Stitches / Rivets down the seam
    ctx.fillStyle = '#fef08a';
    for (let y = 15; y < height; y += 28) {
      ctx.beginPath();
      ctx.arc(xPos, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  drawSeam(halfW);
  drawSeam(0);
  drawSeam(width);

  return canvas;
}
