/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CelestialTarget, Language, MoonPhaseData, SimulationState } from './types/cosmos';
import { CosmosEngine } from './scene/CosmosScene';
import { CelestialTelemetry } from './components/CelestialTelemetry';
import { MoonPhaseWidget } from './components/MoonPhaseWidget';
import { ControlOverlay } from './components/ControlOverlay';
import { NavigationToolbar } from './components/NavigationToolbar';
import { EducationalModal } from './components/EducationalModal';
import { UI_TRANSLATIONS } from './utils/celestialData';
import { Sparkles } from 'lucide-react';

const DEFAULT_SIM_STATE: SimulationState = {
  language: 'en',
  isPaused: false,
  timeSpeed: 1.0,
  simulatedTime: 0,
  focusTarget: 'overview',
  cameraDistance: 80,
  showOrbits: true,
  showConstellations: true,
  showStarfield: true,
  showAtmosphere: true,
  showNightLights: true,
  showGrid: false,
  showLabels: true,
  spectralType: 'G2V',
  solarFlareIntensity: 1.0,
  activeFlareBurst: false,
  eclipseAlignment: 'none',
  showDetailModal: false,
};

const DEFAULT_MOON_PHASE: MoonPhaseData = {
  phaseName: {
    en: 'Waxing Gibbous',
    hi: 'शुक्ल पक्ष कुबड़ा चांद',
    pa: 'ਵੱਧਦਾ ਤਿੰਨ-ਚੌਥਾਈ ਚੰਨ',
  },
  illuminationFraction: 0.72,
  phaseAngleDeg: 125,
  cycleDay: 10.3,
  isSolarEclipse: false,
  isLunarEclipse: false,
};

export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<CosmosEngine | null>(null);

  // Pointer drag tracking to differentiate tap vs orbit drag on touch devices
  const pointerStartPos = useRef<{ x: number; y: number } | null>(null);

  const [simState, setSimState] = useState<SimulationState>(DEFAULT_SIM_STATE);
  const [moonPhase, setMoonPhase] = useState<MoonPhaseData>(DEFAULT_MOON_PHASE);
  const [simDays, setSimDays] = useState<number>(0);
  const [showHelperTooltip, setShowHelperTooltip] = useState<boolean>(true);

  // Initialize Three.js WebGL engine once
  useEffect(() => {
    if (!mountRef.current) return;

    const handleTelemetry = (phase: MoonPhaseData, days: number) => {
      setMoonPhase(phase);
      setSimDays(days);
    };

    const engine = new CosmosEngine(mountRef.current, DEFAULT_SIM_STATE, handleTelemetry);
    engineRef.current = engine;

    const timer = setTimeout(() => setShowHelperTooltip(false), 9000);

    return () => {
      clearTimeout(timer);
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  // Sync state changes with the running 3D engine without re-instantiating WebGL
  const updateState = useCallback((partial: Partial<SimulationState>) => {
    setSimState((prev) => {
      const updated = { ...prev, ...partial };
      if (engineRef.current) {
        engineRef.current.updateState(updated);
      }
      return updated;
    });
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    updateState({ language: lang });
  }, [updateState]);

  const stepTime = useCallback((daysDelta: number) => {
    if (engineRef.current) {
      engineRef.current.updateState({ simulatedTime: simDays + daysDelta });
      setSimDays((prev) => prev + daysDelta);
    }
  }, [simDays]);

  const resetTime = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.updateState({ simulatedTime: 0 });
      setSimDays(0);
    }
  }, []);

  const handleAlignEclipse = useCallback((type: 'solar' | 'lunar') => {
    updateState({
      eclipseAlignment: type,
      focusTarget: 'eclipse',
      showDetailModal: true,
    });
  }, [updateState]);

  // Touch and pointer interactions: detect tap vs drag
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStartPos.current || !engineRef.current) return;

    const dx = Math.abs(e.clientX - pointerStartPos.current.x);
    const dy = Math.abs(e.clientY - pointerStartPos.current.y);

    // If movement is under 8px, it was an intentional tap/click!
    if (dx < 8 && dy < 8) {
      const clickedTarget = engineRef.current.handlePointerDown(e.clientX, e.clientY);
      if (clickedTarget) {
        updateState({
          focusTarget: clickedTarget,
          showDetailModal: true, // Automatically open educational info on click/touch!
        });
      }
    }
    pointerStartPos.current = null;
  };

  const handleZoom = useCallback((factor: number) => {
    engineRef.current?.zoom(factor);
  }, []);

  const handleRotateOrbit = useCallback((deltaAngleRad: number) => {
    engineRef.current?.rotateOrbit(deltaAngleRad);
  }, []);

  const handleToggleAutoRotate = useCallback(() => {
    return engineRef.current?.toggleAutoRotate() ?? false;
  }, []);

  const handleSetViewAngle = useCallback((angle: 'top' | 'equator' | 'front') => {
    engineRef.current?.setViewAngle(angle);
  }, []);

  const t = UI_TRANSLATIONS;
  const lang = simState.language;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#020409] select-none font-sans">
      {/* 1. Full-bleed WebGL 3D Canvas Container */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0 touch-none"
      />

      {/* 2. Top-Left: Celestial Physical Telemetry & Facts with Language switcher & Dismiss ('✕') */}
      <CelestialTelemetry
        focusTarget={simState.focusTarget}
        language={lang}
        onSelectTarget={(target: CelestialTarget) => updateState({ focusTarget: target, showDetailModal: true })}
        onSelectLanguage={setLanguage}
        onOpenDetails={() => updateState({ showDetailModal: true })}
        simulatedDays={simDays}
      />

      {/* 3. Top-Right: Dynamic Moon Phase & Eclipse Widget with Dismiss ('✕') */}
      <MoonPhaseWidget
        moonPhase={moonPhase}
        language={lang}
        onAlignEclipse={handleAlignEclipse}
      />

      {/* 4. Right Side: Floating Zoom & 360° Rotate Navigation Toolbar */}
      <NavigationToolbar
        language={lang}
        onZoom={handleZoom}
        onRotateOrbit={handleRotateOrbit}
        onToggleAutoRotate={handleToggleAutoRotate}
        onSetViewAngle={handleSetViewAngle}
      />

      {/* 4. Bottom Center: Unified Collapsible Control Dock with all planets & multilingual labels */}
      <ControlOverlay
        state={simState}
        onChangeState={updateState}
        onStepTime={stepTime}
        onResetTime={resetTime}
      />

      {/* 5. Comprehensive Educational Information Modal (Opens on click/tap, has '✕' Close & Read Aloud) */}
      <EducationalModal
        target={simState.focusTarget}
        language={lang}
        isOpen={simState.showDetailModal}
        onClose={() => updateState({ showDetailModal: false })}
        onSelectTarget={(target: CelestialTarget) => updateState({ focusTarget: target })}
        onSelectLanguage={setLanguage}
      />

      {/* 6. Helpful Gesture Tip Banner (Dismissable & Multilingual) */}
      {showHelperTooltip && !simState.showDetailModal && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 pointer-events-auto transition-opacity duration-300 max-w-[92vw]">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] text-slate-300 shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <span className="truncate">{t.tapToLearn[lang]}</span>
            <button
              onClick={() => setShowHelperTooltip(false)}
              className="ml-2 text-slate-400 hover:text-white cursor-pointer font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
