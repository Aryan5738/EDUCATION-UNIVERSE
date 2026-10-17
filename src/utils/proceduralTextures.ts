import * as THREE from 'three';

// Procedural noise helper
function pseudoNoise(x: number, y: number, seed: number = 42): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453;
  return n - Math.floor(n);
}

function fbm(x: number, y: number, octaves: number = 4, seed: number = 1): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    // Bilinear interpolated grid noise
    const ix = Math.floor(x * frequency);
    const iy = Math.floor(y * frequency);
    const fx = (x * frequency) - ix;
    const fy = (y * frequency) - iy;

    // Smoothstep
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);

    const n00 = pseudoNoise(ix, iy, seed + i * 13);
    const n10 = pseudoNoise(ix + 1, iy, seed + i * 13);
    const n01 = pseudoNoise(ix, iy + 1, seed + i * 13);
    const n11 = pseudoNoise(ix + 1, iy + 1, seed + i * 13);

    const nx0 = n00 * (1 - sx) + n10 * sx;
    const nx1 = n01 * (1 - sx) + n11 * sx;
    const n = nx0 * (1 - sy) + nx1 * sy;

    value += n * amplitude;
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value / maxValue;
}

/**
 * Procedural Sun photosphere texture with convective granulations and active sunspots
 */
export function createSunTexture(spectral: 'G2V' | 'O5' | 'M0' = 'G2V'): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Base colors depending on spectral type
  let colorCore = '#fffdf0';
  let colorMid = '#ffaa11';
  let colorEdge = '#e04400';
  let colorSpot = '#4a1100';

  if (spectral === 'O5') {
    // Blue Supergiant
    colorCore = '#f0faff';
    colorMid = '#66b2ff';
    colorEdge = '#0044cc';
    colorSpot = '#001a4d';
  } else if (spectral === 'M0') {
    // Red Supergiant
    colorCore = '#ffeedd';
    colorMid = '#ff5522';
    colorEdge = '#880b00';
    colorSpot = '#2a0000';
  }

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  // Sunspot anchors
  const sunspots = [
    { u: 0.28, v: 0.42, r: 0.035 },
    { u: 0.32, v: 0.45, r: 0.02 },
    { u: 0.68, v: 0.58, r: 0.04 },
    { u: 0.72, v: 0.55, r: 0.025 },
    { u: 0.85, v: 0.38, r: 0.03 },
  ];

  for (let y = 0; y < height; y++) {
    const v = y / height;
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const idx = (y * width + x) * 4;

      // Convective granulation noise
      const n1 = fbm(u * 18, v * 9, 4, 101);
      const n2 = fbm(u * 36, v * 18, 3, 202);
      const granules = n1 * 0.7 + n2 * 0.3;

      // Sunspot calculation
      let spotFactor = 1.0;
      for (const spot of sunspots) {
        const du = Math.abs(u - spot.u);
        const wrappedDu = Math.min(du, 1.0 - du);
        const dv = v - spot.v;
        const dist = Math.sqrt(wrappedDu * wrappedDu + dv * dv);
        if (dist < spot.r) {
          const t = dist / spot.r;
          spotFactor = Math.min(spotFactor, Math.pow(t, 0.75));
        }
      }

      // Magnetic filament brightness modulation
      const heat = Math.min(1.0, granules * 1.15) * (0.3 + 0.7 * spotFactor);

      if (spectral === 'G2V') {
        data[idx] = Math.floor(255 * (0.9 + 0.1 * heat));
        data[idx + 1] = Math.floor(255 * (0.55 + 0.45 * heat));
        data[idx + 2] = Math.floor(255 * (0.1 + 0.8 * Math.pow(heat, 2.5)));
      } else if (spectral === 'O5') {
        data[idx] = Math.floor(255 * (0.4 + 0.6 * heat));
        data[idx + 1] = Math.floor(255 * (0.7 + 0.3 * heat));
        data[idx + 2] = Math.floor(255 * (0.95 + 0.05 * heat));
      } else {
        data[idx] = Math.floor(255 * (0.95 + 0.05 * heat));
        data[idx + 1] = Math.floor(255 * (0.35 + 0.55 * heat));
        data[idx + 2] = Math.floor(255 * (0.05 + 0.25 * heat));
      }
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Earth texture with realistic continents, oceans, deserts, mountain ranges, and ice caps
 */
export function createEarthTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const lat = (0.5 - v) * Math.PI; // -PI/2 to +PI/2

    for (let x = 0; x < width; x++) {
      const u = x / width;
      const lon = u * Math.PI * 2; // 0 to 2PI
      const idx = (y * width + x) * 4;

      // Multi-octave continent elevation
      const n1 = fbm(u * 5, v * 2.5, 5, 77);
      const n2 = fbm(u * 12, v * 6, 4, 189);
      const detail = fbm(u * 28, v * 14, 3, 311);

      let elevation = n1 * 0.75 + n2 * 0.2 + detail * 0.05;

      // Polar ice adjustments
      const absLat = Math.abs(lat);
      const polarThreshold = 1.15; // > ~65 degrees
      const isPolar = absLat > polarThreshold;

      if (isPolar) {
        elevation += (absLat - polarThreshold) * 0.6;
      }

      const seaLevel = 0.52;

      if (absLat > 1.35) {
        // Glacial polar ice sheet (Antarctica / Arctic)
        data[idx] = 235 + Math.floor(detail * 20);
        data[idx + 1] = 242 + Math.floor(detail * 13);
        data[idx + 2] = 250;
      } else if (elevation < seaLevel) {
        // Ocean - deep blue to coastal turquoise
        const depth = (seaLevel - elevation) / seaLevel;
        const coastal = Math.max(0, 1 - depth * 4.0);
        data[idx] = Math.floor(10 + coastal * 30);
        data[idx + 1] = Math.floor(45 + coastal * 110);
        data[idx + 2] = Math.floor(115 + coastal * 55);
      } else {
        // Landmass
        const landHeight = (elevation - seaLevel) / (1 - seaLevel);
        const isTropical = Math.abs(lat) < 0.45;
        const isAridDesert = (u > 0.45 && u < 0.65 && lat > 0.1 && lat < 0.55); // Sahara / Arabia proxy

        if (landHeight > 0.65) {
          // Alpine mountains / snow peaks
          data[idx] = 220;
          data[idx + 1] = 215;
          data[idx + 2] = 210;
        } else if (isAridDesert || (landHeight > 0.35 && !isTropical)) {
          // Desert / steppe
          data[idx] = 195 + Math.floor(detail * 35);
          data[idx + 1] = 165 + Math.floor(detail * 25);
          data[idx + 2] = 105 + Math.floor(detail * 15);
        } else {
          // Lush forest / grasslands
          data[idx] = 35 + Math.floor(landHeight * 60);
          data[idx + 1] = 115 + Math.floor(detail * 30) - Math.floor(landHeight * 40);
          data[idx + 2] = 45 + Math.floor(landHeight * 20);
        }
      }

      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Earth night city lights procedural texture
 */
export function createEarthNightTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const lat = (0.5 - v) * Math.PI;

    for (let x = 0; x < width; x++) {
      const u = x / width;
      const idx = (y * width + x) * 4;

      const n1 = fbm(u * 5, v * 2.5, 5, 77);
      const n2 = fbm(u * 12, v * 6, 4, 189);
      const elevation = n1 * 0.75 + n2 * 0.2;
      const seaLevel = 0.52;

      // City lights only on land, between latitudes -50 and +65
      if (elevation > seaLevel && Math.abs(lat) < 1.15) {
        const clusterNoise = fbm(u * 32, v * 16, 3, 909);
        const cityNoise = pseudoNoise(x * 0.7, y * 0.7, 555);

        if (clusterNoise > 0.55 && cityNoise > 0.65) {
          const intensity = Math.pow((clusterNoise - 0.55) / 0.45, 1.8) * (cityNoise * 1.5);
          data[idx] = Math.min(255, Math.floor(255 * intensity));
          data[idx + 1] = Math.min(255, Math.floor(190 * intensity));
          data[idx + 2] = Math.min(255, Math.floor(110 * intensity));
          data[idx + 3] = 255;
          continue;
        }
      }

      data[idx] = 0;
      data[idx + 1] = 0;
      data[idx + 2] = 0;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Earth clouds texture with realistic atmospheric swirls
 */
export function createEarthCloudsTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const lat = (0.5 - v) * Math.PI;

    for (let x = 0; x < width; x++) {
      const u = x / width;
      const idx = (y * width + x) * 4;

      // Cloud swirl bands (ITCZ at equator, mid-latitude storm tracks)
      const latWarp = Math.sin(lat * 6) * 0.04;
      const n1 = fbm((u + latWarp) * 8, v * 4, 4, 404);
      const n2 = fbm(u * 20, v * 10, 3, 505);

      const rawCloud = n1 * 0.7 + n2 * 0.3;
      const cloudCutoff = 0.48;

      if (rawCloud > cloudCutoff) {
        const density = Math.min(1.0, (rawCloud - cloudCutoff) / 0.35);
        data[idx] = 255;
        data[idx + 1] = 255;
        data[idx + 2] = 255;
        data[idx + 3] = Math.floor(density * 225);
      } else {
        data[idx] = 255;
        data[idx + 1] = 255;
        data[idx + 2] = 255;
        data[idx + 3] = 0;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Procedural Moon texture with lunar maria (basalt plains) and impact craters with radial ejecta rays
 */
export function createMoonTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  // Key Maria locations (u, v, radius, darkness)
  const maria = [
    { u: 0.38, v: 0.42, r: 0.16, dark: 0.42 }, // Oceanus Procellarum / Imbrium
    { u: 0.52, v: 0.38, r: 0.09, dark: 0.45 }, // Mare Serenitatis
    { u: 0.58, v: 0.48, r: 0.10, dark: 0.44 }, // Mare Tranquillitatis
    { u: 0.65, v: 0.42, r: 0.07, dark: 0.48 }, // Mare Crisium
    { u: 0.48, v: 0.62, r: 0.08, dark: 0.46 }, // Mare Nubium
  ];

  // Distinct craters with bright rays (e.g. Tycho, Copernicus, Kepler)
  const rayCraters = [
    { u: 0.45, v: 0.75, r: 0.025, rays: 12 }, // Tycho
    { u: 0.36, v: 0.44, r: 0.02, rays: 8 },   // Copernicus
    { u: 0.30, v: 0.46, r: 0.015, rays: 6 },  // Kepler
  ];

  for (let y = 0; y < height; y++) {
    const v = y / height;
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const idx = (y * width + x) * 4;

      // Base highlands regolith noise
      const n1 = fbm(u * 12, v * 6, 5, 888);
      const n2 = fbm(u * 32, v * 16, 4, 999);
      let shade = 0.65 + n1 * 0.25 + n2 * 0.1;

      // Maria shading
      for (const m of maria) {
        const du = Math.abs(u - m.u);
        const wDu = Math.min(du, 1.0 - du);
        const dv = v - m.v;
        const d = Math.sqrt(wDu * wDu + dv * dv);
        if (d < m.r) {
          const t = Math.pow(1 - d / m.r, 1.5);
          shade = shade * (1 - t * (1 - m.dark));
        }
      }

      // Crater rays
      for (const rc of rayCraters) {
        const du = Math.abs(u - rc.u);
        const wDu = Math.min(du, 1.0 - du);
        const dv = v - rc.v;
        const d = Math.sqrt(wDu * wDu + dv * dv);

        if (d < rc.r * 6.0) {
          const angle = Math.atan2(dv, wDu);
          const rayIntensity = Math.pow((Math.cos(angle * rc.rays) + 1) * 0.5, 3.0);
          const falloff = 1 - (d / (rc.r * 6.0));
          shade += rayIntensity * falloff * 0.28;
        }

        // Crater rim and bright central peak
        if (d < rc.r) {
          const rimDist = Math.abs(d - rc.r * 0.85);
          if (rimDist < rc.r * 0.2) {
            shade += 0.35; // Bright rim
          } else if (d < rc.r * 0.25) {
            shade += 0.3; // Central peak
          } else {
            shade -= 0.15; // Dark crater floor
          }
        }
      }

      const val = Math.min(255, Math.max(25, Math.floor(shade * 255)));
      // Subtle warm/brownish-grey regolith tint
      data[idx] = val;
      data[idx + 1] = Math.floor(val * 0.98);
      data[idx + 2] = Math.floor(val * 0.95);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Moon bump/normal map
 */
export function createMoonBumpTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const idx = (y * width + x) * 4;

      const n1 = fbm(u * 16, v * 8, 4, 123);
      const n2 = fbm(u * 40, v * 20, 3, 456);
      const val = Math.floor((n1 * 0.7 + n2 * 0.3) * 255);

      data[idx] = val;
      data[idx + 1] = val;
      data[idx + 2] = val;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Procedural Saturn Ring Texture with Cassini Division and density gradients
 */
export function createSaturnRingsTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 16;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  // Ring zones:
  // 0.0 - 0.2: Transparent inner gap (C Ring boundary)
  // 0.2 - 0.55: B Ring (bright, dense)
  // 0.55 - 0.62: Cassini Division (dark gap)
  // 0.62 - 0.90: A Ring (medium bright with Encke gap)
  // 0.90 - 1.0: Transparent outer edge
  for (let x = 0; x < width; x++) {
    const r = x / width;
    let alpha = 0;
    let brightness = 180;

    if (r > 0.15 && r <= 0.55) {
      // B Ring (brightest)
      const t = (r - 0.15) / 0.4;
      alpha = 0.85 + Math.sin(t * 40) * 0.1;
      brightness = 210 + Math.floor(Math.sin(t * 80) * 20);
    } else if (r > 0.55 && r <= 0.62) {
      // Cassini Division
      alpha = 0.08;
      brightness = 60;
    } else if (r > 0.62 && r <= 0.92) {
      // A Ring with Encke gap around 0.82
      if (r > 0.81 && r < 0.835) {
        alpha = 0.05; // Encke gap
      } else {
        const t = (r - 0.62) / 0.3;
        alpha = 0.65 + Math.sin(t * 30) * 0.08;
        brightness = 190 + Math.floor(Math.sin(t * 50) * 15);
      }
    } else if (r > 0.05 && r <= 0.15) {
      // C Ring (faint, dusty)
      alpha = 0.25;
      brightness = 130;
    }

    for (let y = 0; y < height; y++) {
      const idx = (y * width + x) * 4;
      data[idx] = Math.min(255, Math.floor(brightness * 1.05));
      data[idx + 1] = Math.min(255, Math.floor(brightness * 0.95));
      data[idx + 2] = Math.min(255, Math.floor(brightness * 0.78));
      data[idx + 3] = Math.floor(alpha * 255);
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Procedural gas giant bands for Saturn
 */
export function createSaturnTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const band = Math.sin(v * 28) * 0.15 + Math.sin(v * 12) * 0.25;

    for (let x = 0; x < width; x++) {
      const u = x / width;
      const noise = fbm(u * 16, v * 32, 2, 712) * 0.08;
      const t = 0.5 + band + noise;

      const idx = (y * width + x) * 4;
      // Golden butterscotch / ochre hues
      data[idx] = Math.floor(215 + t * 35);
      data[idx + 1] = Math.floor(185 + t * 30);
      data[idx + 2] = Math.floor(135 + t * 25);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Jupiter texture with dynamic atmospheric bands and Great Red Spot
 */
export function createJupiterTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  // Great Red Spot center in u, v
  const grsU = 0.62;
  const grsV = 0.64;
  const grsRx = 0.06;
  const grsRy = 0.04;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    // Latitudinal shear zones
    const band1 = Math.sin(v * 36) * 0.2;
    const band2 = Math.cos(v * 18) * 0.3;

    for (let x = 0; x < width; x++) {
      const u = x / width;
      const idx = (y * width + x) * 4;

      const turbulent = fbm(u * 14 + band1, v * 24, 3, 333);
      let factor = 0.5 + band1 * 0.4 + band2 * 0.2 + turbulent * 0.2;

      // Check Great Red Spot
      const du = Math.abs(u - grsU);
      const wDu = Math.min(du, 1.0 - du);
      const dv = v - grsV;
      const grsDist = (wDu * wDu) / (grsRx * grsRx) + (dv * dv) / (grsRy * grsRy);

      let isGrs = false;
      if (grsDist < 1.0) {
        isGrs = true;
        const spotFalloff = 1.0 - Math.sqrt(grsDist);
        data[idx] = Math.floor(215 + spotFalloff * 35);
        data[idx + 1] = Math.floor(95 - spotFalloff * 20);
        data[idx + 2] = Math.floor(70 - spotFalloff * 25);
        data[idx + 3] = 255;
      }

      if (!isGrs) {
        // Cream, rust, tan stripes
        data[idx] = Math.floor(190 + factor * 50);
        data[idx + 1] = Math.floor(145 + factor * 40);
        data[idx + 2] = Math.floor(105 + factor * 35);
        data[idx + 3] = 255;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Mars texture with rusty regolith, basaltic plains, and white polar caps
 */
export function createMarsTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const lat = (0.5 - v) * Math.PI;

    for (let x = 0; x < width; x++) {
      const u = x / width;
      const idx = (y * width + x) * 4;

      const n1 = fbm(u * 6, v * 3, 4, 999);
      const n2 = fbm(u * 20, v * 10, 3, 111);
      const terrain = n1 * 0.75 + n2 * 0.25;

      if (Math.abs(lat) > 1.35) {
        // Polar ice caps (dry ice and water ice)
        data[idx] = 245;
        data[idx + 1] = 240;
        data[idx + 2] = 240;
      } else if (terrain < 0.42) {
        // Dark basaltic plains (Syrtis Major / Sinus Meridiani)
        data[idx] = Math.floor(105 + terrain * 50);
        data[idx + 1] = Math.floor(65 + terrain * 40);
        data[idx + 2] = Math.floor(50 + terrain * 30);
      } else {
        // Rust oxidized red regolith
        data[idx] = Math.floor(190 + terrain * 50);
        data[idx + 1] = Math.floor(95 + terrain * 35);
        data[idx + 2] = Math.floor(55 + terrain * 25);
      }
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Nebula texture for cosmic background depth
 */
export function createNebulaTexture(colorHex: string = '#8a2be2'): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, colorHex);
  gradient.addColorStop(0.35, colorHex);
  gradient.addColorStop(0.7, 'rgba(30, 10, 70, 0.4)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Add organic wisps
  for (let i = 0; i < 6; i++) {
    const rx = size * (0.3 + Math.random() * 0.4);
    const ry = size * (0.3 + Math.random() * 0.4);
    const rad = size * (0.15 + Math.random() * 0.2);
    const wispGrad = ctx.createRadialGradient(rx, ry, 0, rx, ry, rad);
    wispGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    wispGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = wispGrad;
    ctx.beginPath();
    ctx.arc(rx, ry, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Procedural Mercury texture with impact craters and grey basaltic crust
 */
export function createMercuryTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const idx = (y * width + x) * 4;

      const n1 = fbm(u * 14, v * 7, 4, 111);
      const n2 = fbm(u * 28, v * 14, 3, 222);
      const c = Math.floor(90 + (n1 * 0.7 + n2 * 0.3) * 110);

      data[idx] = c;
      data[idx + 1] = Math.floor(c * 0.98);
      data[idx + 2] = Math.floor(c * 0.94);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Venus texture with thick yellowish sulfuric clouds
 */
export function createVenusTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const wave = Math.sin(v * 16) * 0.1;
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const idx = (y * width + x) * 4;

      const n1 = fbm((u + wave) * 8, v * 16, 3, 444);
      const t = 0.5 + n1 * 0.5;

      data[idx] = Math.floor(225 + t * 25);
      data[idx + 1] = Math.floor(190 + t * 25);
      data[idx + 2] = Math.floor(120 + t * 20);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Uranus texture with subtle pale cyan bands
 */
export function createUranusTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const band = Math.sin(v * 24) * 0.08;
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const idx = (y * width + x) * 4;

      const n = fbm(u * 8, v * 16, 2, 555) * 0.06;
      const t = 0.5 + band + n;

      data[idx] = Math.floor(140 + t * 30);
      data[idx + 1] = Math.floor(215 + t * 30);
      data[idx + 2] = Math.floor(225 + t * 25);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Neptune texture with vivid azure blue and high-speed storm clouds
 */
export function createNeptuneTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const band = Math.sin(v * 32) * 0.15;
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const idx = (y * width + x) * 4;

      const n = fbm(u * 12 + band, v * 20, 3, 777);
      // Bright white cirrus storm streaks
      const cirrus = Math.pow(Math.max(0, n - 0.62) / 0.38, 2.5);

      const r = Math.floor(25 + n * 45 + cirrus * 180);
      const g = Math.floor(65 + n * 80 + cirrus * 180);
      const b = Math.floor(185 + n * 65 + cirrus * 70);

      data[idx] = Math.min(255, r);
      data[idx + 1] = Math.min(255, g);
      data[idx + 2] = Math.min(255, b);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Black Hole Accretion Disk texture (Doppler beamed glowing plasma ring)
 */
export function createAccretionDiskTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 16;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let x = 0; x < width; x++) {
    const r = x / width;
    let alpha = 0;
    let red = 255;
    let green = 150;
    let blue = 50;

    if (r > 0.28 && r <= 0.88) {
      // Hot accretion ring
      const t = (r - 0.28) / 0.6;
      alpha = Math.sin(t * Math.PI) * 0.95;
      red = Math.floor(255 - t * 40);
      green = Math.floor(180 - t * 100);
      blue = Math.floor(80 - t * 60);
    }

    for (let y = 0; y < height; y++) {
      const idx = (y * width + x) * 4;
      data[idx] = red;
      data[idx + 1] = green;
      data[idx + 2] = blue;
      data[idx + 3] = Math.floor(alpha * 255);
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

