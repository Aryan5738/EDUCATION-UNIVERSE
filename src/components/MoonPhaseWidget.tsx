import React, { useState } from 'react';
import { Language, MoonPhaseData } from '../types/cosmos';
import { UI_TRANSLATIONS } from '../utils/celestialData';
import { Eye, Sparkles, X, Moon } from 'lucide-react';

interface Props {
  moonPhase: MoonPhaseData;
  language: Language;
  onAlignEclipse: (type: 'solar' | 'lunar') => void;
}

export const MoonPhaseWidget: React.FC<Props> = ({ moonPhase, language, onAlignEclipse }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const illuminationPercent = Math.round(moonPhase.illuminationFraction * 100);
  const t = UI_TRANSLATIONS;

  const renderMoonDisc = () => {
    const r = 20;
    const cx = 24;
    const cy = 24;
    const phaseFraction = moonPhase.illuminationFraction;
    const isWaxing = moonPhase.phaseAngleDeg < 180;

    return (
      <svg width="44" height="44" viewBox="0 0 48 48" className="drop-shadow-md">
        <circle cx={cx} cy={cy} r={r} fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        {phaseFraction > 0.02 && (
          <path
            d={
              phaseFraction >= 0.98
                ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`
                : isWaxing
                ? `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${Math.abs(r * (2 * phaseFraction - 1))} ${r} 0 0 ${phaseFraction >= 0.5 ? 1 : 0} ${cx} ${cy - r}`
                : `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${Math.abs(r * (2 * phaseFraction - 1))} ${r} 0 0 ${phaseFraction >= 0.5 ? 0 : 1} ${cx} ${cy - r}`
            }
            fill="#e2e8f0"
          />
        )}
      </svg>
    );
  };

  if (isDismissed) {
    return (
      <div className="absolute top-4 right-4 z-20 pointer-events-auto">
        <button
          onClick={() => setIsDismissed(false)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0f172a]/95 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 shadow-xl transition-all cursor-pointer"
        >
          <Moon className="w-4 h-4 text-slate-300" />
          <span>{moonPhase.phaseName[language]}</span>
          <span className="text-[10px] text-amber-300 font-mono font-bold">{illuminationPercent}%</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 right-4 z-20 pointer-events-auto max-w-xs w-full">
      <div className="bg-[#0f172a]/95 border border-slate-800 rounded-2xl shadow-2xl p-3 sm:p-3.5 text-slate-200">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0">
              {renderMoonDisc()}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-white block truncate">
                {moonPhase.phaseName[language]}
              </span>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                {illuminationPercent}% • {moonPhase.cycleDay.toFixed(1)} / 29.5 d
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
            title={t.close[language]}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Eclipse Notification Banner if active */}
        {(moonPhase.isSolarEclipse || moonPhase.isLunarEclipse) && (
          <div className="mt-2.5 p-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="font-semibold">
              {moonPhase.isSolarEclipse
                ? `${t.solarEclipse[language]} Active!`
                : `${t.lunarEclipse[language]} Active!`}
            </span>
          </div>
        )}

        {/* Quick Eclipse Alignment Buttons */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-1.5 text-[11px]">
          <button
            onClick={() => onAlignEclipse('solar')}
            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
          >
            <Eye className="w-3 h-3 text-amber-400" />
            <span className="truncate">{t.solarEclipse[language]}</span>
          </button>
          <button
            onClick={() => onAlignEclipse('lunar')}
            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
          >
            <Eye className="w-3 h-3 text-red-400" />
            <span className="truncate">{t.lunarEclipse[language]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
