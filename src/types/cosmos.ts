export type Language = 'en' | 'hi' | 'pa';

export type CelestialTarget =
  | 'overview'
  | 'sun'
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'moon'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'polaris'
  | 'milkyway'
  | 'eclipse';

export type SpectralType = 'G2V' | 'O5' | 'M0';

export interface LocalizedString {
  en: string;
  hi: string;
  pa: string;
}

export interface LocalizedArray {
  en: string[];
  hi: string[];
  pa: string[];
}

export interface CelestialBodyInfo {
  id: CelestialTarget;
  name: LocalizedString;
  type: LocalizedString;
  radiusKm: LocalizedString;
  surfaceTemp: LocalizedString;
  orbitalPeriod: LocalizedString;
  rotationPeriod: LocalizedString;
  distanceFromSun: LocalizedString;
  gravity: LocalizedString;
  summary: LocalizedString;
  facts: LocalizedArray;
}

export interface MoonPhaseData {
  phaseName: LocalizedString;
  illuminationFraction: number; // 0 to 1
  phaseAngleDeg: number;
  cycleDay: number; // 0 to 29.53
  isSolarEclipse: boolean;
  isLunarEclipse: boolean;
}

export interface SimulationState {
  language: Language;
  isPaused: boolean;
  timeSpeed: number;
  simulatedTime: number;
  focusTarget: CelestialTarget;
  cameraDistance: number;
  showOrbits: boolean;
  showConstellations: boolean;
  showStarfield: boolean;
  showAtmosphere: boolean;
  showNightLights: boolean;
  showGrid: boolean;
  showLabels: boolean;
  spectralType: SpectralType;
  solarFlareIntensity: number;
  activeFlareBurst: boolean;
  eclipseAlignment: 'none' | 'solar' | 'lunar';
  showDetailModal: boolean;
}
