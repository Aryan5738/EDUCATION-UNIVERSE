import React, { useState, useEffect } from 'react';
import { CelestialTarget, SimulationState, SpectralType } from '../types/cosmos';
import { CELESTIAL_BODIES, UI_TRANSLATIONS } from '../utils/celestialData';
import {
  Play,
  Pause,
  RotateCcw,
  Flame,
  Globe,
  Sun,
  Moon,
  Layers,
  ChevronDown,
  ChevronUp,
  Sliders,
  Sparkles,
  Compass,
  StepForward,
  StepBack,
} from 'lucide-react';

interface Props {
  state: SimulationState;
  onChangeState: (partial: Partial<SimulationState>) => void;
  onStepTime: (days: number) => void;
  onResetTime: () => void;
}

type TabKey = 'focus' | 'time' | 'solar' | 'layers';

export const ControlOverlay: React.FC<Props> = ({
  state,
  onChangeState,
  onStepTime,
  onResetTime,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('focus');
  const lang = state.language;
  const t = UI_TRANSLATIONS;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        setCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const targets: { id: CelestialTarget; icon: React.ReactNode }[] = [
    { id: 'overview', icon: <Globe className="w-3.5 h-3.5 text-sky-400" /> },
    { id: 'sun', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'mercury', icon: <Compass className="w-3.5 h-3.5 text-slate-400" /> },
    { id: 'venus', icon: <Compass className="w-3.5 h-3.5 text-amber-300" /> },
    { id: 'earth', icon: <Globe className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'moon', icon: <Moon className="w-3.5 h-3.5 text-slate-300" /> },
    { id: 'mars', icon: <Compass className="w-3.5 h-3.5 text-rose-400" /> },
    { id: 'jupiter', icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" /> },
    { id: 'saturn', icon: <Layers className="w-3.5 h-3.5 text-amber-200" /> },
    { id: 'uranus', icon: <Compass className="w-3.5 h-3.5 text-cyan-300" /> },
    { id: 'neptune', icon: <Compass className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'polaris', icon: <Sparkles className="w-3.5 h-3.5 text-purple-300" /> },
    { id: 'milkyway', icon: <Sparkles className="w-3.5 h-3.5 text-pink-400" /> },
    { id: 'eclipse', icon: <Flame className="w-3.5 h-3.5 text-indigo-400" /> },
  ];

  return (
    <div
      className={`fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 transition-transform duration-300 ease-in-out pointer-events-auto ${
        collapsed ? 'translate-y-[calc(100%-42px)]' : 'translate-y-0'
      }`}
      style={{ width: 'min(960px, 96vw)' }}
    >
      {/* Collapse/Expand Bar Header */}
      <div className="flex justify-center -mb-px">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0f172a] border border-b-0 border-slate-700/80 rounded-t-xl text-xs font-semibold text-slate-300 hover:text-white transition-colors shadow-lg cursor-pointer select-none"
          title="Press 'H' or tap to toggle HUD"
        >
          {collapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.showControls[lang]}</span>
              <kbd className="ml-1 px-1 py-0.5 text-[9px] bg-slate-800 rounded text-slate-400 border border-slate-700">H</kbd>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.hideControls[lang]}</span>
              <kbd className="ml-1 px-1 py-0.5 text-[9px] bg-slate-800 rounded text-slate-400 border border-slate-700">H</kbd>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Control Dock (Solid rgba surface to prevent WebGL stalls) */}
      <div className="bg-[#0f172a]/95 border border-slate-700/80 rounded-2xl shadow-2xl p-3 sm:p-4 text-slate-200">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 gap-2">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('focus')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'focus'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.focusTab[lang]}</span>
            </button>
            <button
              onClick={() => setActiveTab('time')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'time'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t.timeTab[lang]}</span>
            </button>
            <button
              onClick={() => setActiveTab('solar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'solar'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{t.solarTab[lang]}</span>
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'layers'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t.layersTab[lang]}</span>
            </button>
          </div>

          {/* Quick Play/Pause Mini Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onChangeState({ isPaused: !state.isPaused })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                state.isPaused
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
            >
              {state.isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{state.isPaused ? t.resume[lang] : t.pause[lang]}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: All Celestial Bodies */}
        {activeTab === 'focus' && (
          <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
            {targets.map((tgt) => {
              const b = CELESTIAL_BODIES[tgt.id];
              const label = b ? b.name[lang] : tgt.id;
              return (
                <button
                  key={tgt.id}
                  onClick={() => onChangeState({ focusTarget: tgt.id, showDetailModal: true })}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${
                    state.focusTarget === tgt.id
                      ? 'bg-slate-800 text-white border-sky-400 shadow-sm ring-1 ring-sky-400/30 font-semibold'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {tgt.icon}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 2: Time & Orbits */}
        {activeTab === 'time' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-center">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{t.speed[lang]}:</span>
                <span className="font-mono text-sky-400 font-semibold">{state.timeSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="-20"
                max="50"
                step="0.5"
                value={state.timeSpeed}
                onChange={(e) => onChangeState({ timeSpeed: parseFloat(e.target.value) })}
                className="w-full accent-sky-400 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-1.5 justify-center">
              {[-5, 0.5, 1, 5, 20].map((spd) => (
                <button
                  key={spd}
                  onClick={() => onChangeState({ timeSpeed: spd, isPaused: false })}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                    state.timeSpeed === spd
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {spd > 0 ? `+${spd}x` : `${spd}x`}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => onStepTime(-1)}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs rounded-lg text-slate-300 transition-colors cursor-pointer"
              >
                <StepBack className="w-3.5 h-3.5" />
                <span>{t.stepBack[lang]}</span>
              </button>
              <button
                onClick={() => onStepTime(1)}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs rounded-lg text-slate-300 transition-colors cursor-pointer"
              >
                <StepForward className="w-3.5 h-3.5" />
                <span>{t.stepFwd[lang]}</span>
              </button>
              <button
                onClick={onResetTime}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs rounded-lg text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.reset[lang]}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Solar & Stars */}
        {activeTab === 'solar' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-center">
            <div>
              <span className="text-xs text-slate-400 block mb-1.5">
                {lang === 'hi' ? 'तारा वर्णक्रमीय प्रकार:' : lang === 'pa' ? 'ਤਾਰਾ ਸਪੈਕਟ੍ਰਲ ਕਿਸਮ:' : 'Spectral Star Classification:'}
              </span>
              <div className="flex items-center gap-1.5">
                {[
                  { type: 'G2V' as SpectralType, label: lang === 'hi' ? 'पीला (G2V)' : lang === 'pa' ? 'ਪੀਲਾ (G2V)' : 'Yellow (G2V)', color: 'border-amber-400 text-amber-300' },
                  { type: 'O5' as SpectralType, label: lang === 'hi' ? 'नीला (O5)' : lang === 'pa' ? 'ਨੀਲਾ (O5)' : 'Blue Giant (O5)', color: 'border-sky-400 text-sky-300' },
                  { type: 'M0' as SpectralType, label: lang === 'hi' ? 'लाल (M0)' : lang === 'pa' ? 'ਲਾਲ (M0)' : 'Red Giant (M0)', color: 'border-rose-400 text-rose-300' },
                ].map((s) => (
                  <button
                    key={s.type}
                    onClick={() => onChangeState({ spectralType: s.type })}
                    className={`flex-1 py-1.5 px-2 text-xs rounded-lg border transition-all cursor-pointer font-medium ${
                      state.spectralType === s.type
                        ? `bg-slate-800 shadow-sm ${s.color}`
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {lang === 'hi' ? 'सौर ज्वाला पैमाना:' : lang === 'pa' ? 'ਸੂਰਜੀ ਤੂਫ਼ਾਨ ਪੈਮਾਨਾ:' : 'Flare Prominence Scale:'}
                </span>
                <span className="font-mono text-amber-400 font-semibold">{state.solarFlareIntensity.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={state.solarFlareIntensity}
                onChange={(e) => onChangeState({ solarFlareIntensity: parseFloat(e.target.value) })}
                className="w-full accent-amber-400 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => {
                  onChangeState({ activeFlareBurst: true });
                  setTimeout(() => onChangeState({ activeFlareBurst: false }), 3600);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-200" />
                <span>
                  {lang === 'hi' ? 'सौर तूफान (CME) सक्रिय करें' : lang === 'pa' ? 'ਸੂਰਜੀ ਤੂਫ਼ਾਨ (CME) ਸ਼ੁਰੂ ਕਰੋ' : 'Trigger Coronal CME'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Cosmos Layers Toggles */}
        {activeTab === 'layers' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
            <button
              onClick={() => onChangeState({ showStarfield: !state.showStarfield })}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border transition-colors cursor-pointer ${
                state.showStarfield
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-semibold'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'hi' ? 'तारा क्षेत्र' : lang === 'pa' ? 'ਤਾਰਾ ਖੇਤਰ' : 'Starfield'}: {state.showStarfield ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => onChangeState({ showOrbits: !state.showOrbits })}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border transition-colors cursor-pointer ${
                state.showOrbits
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-semibold'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'कक्षाएं' : lang === 'pa' ? 'ਔਰਬਿਟ' : 'Orbits'}: {state.showOrbits ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => onChangeState({ showConstellations: !state.showConstellations })}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border transition-colors cursor-pointer ${
                state.showConstellations
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-semibold'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>{lang === 'hi' ? 'तारामंडल' : lang === 'pa' ? 'ਤਾਰਾਮੰਡਲ' : 'Constellations'}: {state.showConstellations ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => onChangeState({ showAtmosphere: !state.showAtmosphere })}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border transition-colors cursor-pointer ${
                state.showAtmosphere
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-semibold'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'वायुमंडल' : lang === 'pa' ? 'ਵਾਯੂਮੰਡਲ' : 'Atmosphere'}: {state.showAtmosphere ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => onChangeState({ showNightLights: !state.showNightLights })}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border transition-colors cursor-pointer ${
                state.showNightLights
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-semibold'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'शहर की रोशनी' : lang === 'pa' ? 'ਸ਼ਹਿਰੀ ਰੌਸ਼ਨੀ' : 'Night Lights'}: {state.showNightLights ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => onChangeState({ showGrid: !state.showGrid })}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border transition-colors cursor-pointer ${
                state.showGrid
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-semibold'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'ग्रिड' : lang === 'pa' ? 'ਗਰਿੱਡ' : 'Grid'}: {state.showGrid ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
