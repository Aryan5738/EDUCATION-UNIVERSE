import React, { useState } from 'react';
import { CelestialBodyInfo, CelestialTarget, Language } from '../types/cosmos';
import { CELESTIAL_BODIES, UI_TRANSLATIONS } from '../utils/celestialData';
import { Globe, Sun, Moon, Info, X, ChevronRight, Sparkles } from 'lucide-react';

interface Props {
  focusTarget: CelestialTarget;
  language: Language;
  onSelectTarget: (target: CelestialTarget) => void;
  onSelectLanguage: (lang: Language) => void;
  onOpenDetails: () => void;
  simulatedDays: number;
}

export const CelestialTelemetry: React.FC<Props> = ({
  focusTarget,
  language,
  onSelectTarget,
  onSelectLanguage,
  onOpenDetails,
  simulatedDays,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const bodyInfo: CelestialBodyInfo = CELESTIAL_BODIES[focusTarget] || CELESTIAL_BODIES.overview;
  const t = UI_TRANSLATIONS;

  const targetIcons: Record<string, React.ReactNode> = {
    overview: <Globe className="w-4 h-4 text-sky-400" />,
    sun: <Sun className="w-4 h-4 text-amber-400" />,
    earth: <Globe className="w-4 h-4 text-emerald-400" />,
    moon: <Moon className="w-4 h-4 text-slate-300" />,
    polaris: <Sparkles className="w-4 h-4 text-purple-400" />,
  };

  const currentYear = (simulatedDays / 365.25).toFixed(2);

  // If dismissed by user, show a sleek floating trigger pill so they can reopen on click or touch
  if (isDismissed) {
    return (
      <div className="absolute top-4 left-4 z-20 pointer-events-auto">
        <button
          onClick={() => setIsDismissed(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0f172a]/95 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 shadow-2xl transition-all cursor-pointer"
        >
          <Info className="w-4 h-4 text-sky-400" />
          <span>{bodyInfo.name[language]}</span>
          <span className="text-[10px] text-sky-400 bg-sky-500/15 px-1.5 py-0.5 rounded border border-sky-500/30">
            {t.showInfo[language]}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 left-4 z-20 pointer-events-auto max-w-sm w-full">
      <div className="bg-[#0f172a]/95 border border-slate-800 rounded-2xl shadow-2xl p-3.5 sm:p-4 text-slate-200">
        {/* Header with Title, Language, and Close ('✕') Button */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 rounded-lg bg-slate-800/80 flex-shrink-0">
              {targetIcons[focusTarget] || <Globe className="w-4 h-4 text-indigo-400" />}
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-white tracking-wide truncate">
                {bodyInfo.name[language]}
              </h1>
              <span className="text-[11px] text-sky-400 font-mono truncate block">
                {bodyInfo.type[language]}
              </span>
            </div>
          </div>

          {/* Language Selector + Close button */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[10px] font-semibold">
              <button
                onClick={() => onSelectLanguage('en')}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                  language === 'en' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onSelectLanguage('hi')}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                  language === 'hi' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिं
              </button>
              <button
                onClick={() => onSelectLanguage('pa')}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                  language === 'pa' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                ਪੰ
              </button>
            </div>

            {/* Remove / Close Button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
              title={t.close[language]}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid grid-cols-2 gap-2 my-2.5 text-[11px] font-mono">
          <div className="bg-slate-900/80 border border-slate-800/60 rounded-lg p-2">
            <span className="text-slate-400 block text-[10px]">{t.radius[language]}</span>
            <span className="text-slate-200 font-medium truncate block">{bodyInfo.radiusKm[language]}</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800/60 rounded-lg p-2">
            <span className="text-slate-400 block text-[10px]">{t.surfaceTemp[language]}</span>
            <span className="text-amber-400 font-medium truncate block">{bodyInfo.surfaceTemp[language]}</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800/60 rounded-lg p-2">
            <span className="text-slate-400 block text-[10px]">{t.orbitalPeriod[language]}</span>
            <span className="text-slate-200 font-medium truncate block">{bodyInfo.orbitalPeriod[language]}</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800/60 rounded-lg p-2">
            <span className="text-slate-400 block text-[10px]">{t.distanceFromSun[language]}</span>
            <span className="text-slate-200 font-medium truncate block">{bodyInfo.distanceFromSun[language]}</span>
          </div>
        </div>

        {/* Big Action: Open Detailed Educational Guide Modal */}
        <button
          onClick={onOpenDetails}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 rounded-xl transition-all shadow-md cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.showInfo[language]}</span>
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Quick Nav Shortcut Pills */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['sun', 'mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'saturn', 'polaris'] as CelestialTarget[]).map(targetId => {
            const b = CELESTIAL_BODIES[targetId];
            return (
              <button
                key={targetId}
                onClick={() => onSelectTarget(targetId)}
                className={`px-2 py-1 text-[10px] rounded capitalize transition-all cursor-pointer whitespace-nowrap font-medium ${
                  focusTarget === targetId
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {b ? b.name[language] : targetId}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
