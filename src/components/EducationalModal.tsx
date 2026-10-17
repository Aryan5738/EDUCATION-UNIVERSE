import React, { useState, useEffect } from 'react';
import { CelestialBodyInfo, CelestialTarget, Language } from '../types/cosmos';
import { CELESTIAL_BODIES, UI_TRANSLATIONS } from '../utils/celestialData';
import {
  X,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Globe,
  Sun,
  Moon,
  Sparkles,
  Compass,
  Layers,
  Thermometer,
  RotateCw,
  Orbit,
  ArrowRight,
} from 'lucide-react';

interface Props {
  target: CelestialTarget;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onSelectTarget: (target: CelestialTarget) => void;
  onSelectLanguage: (lang: Language) => void;
}

const ALL_TARGETS: CelestialTarget[] = [
  'sun',
  'mercury',
  'venus',
  'earth',
  'moon',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'polaris',
  'milkyway',
  'eclipse',
  'overview',
];

export const EducationalModal: React.FC<Props> = ({
  target,
  language,
  isOpen,
  onClose,
  onSelectTarget,
  onSelectLanguage,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const data: CelestialBodyInfo = CELESTIAL_BODIES[target] || CELESTIAL_BODIES.overview;
  const t = UI_TRANSLATIONS;

  // Stop audio on target or language change, or when closing
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  }, [target, language, isOpen]);

  if (!isOpen) return null;

  // Voice narration using Web Speech API
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToRead = `${data.name[language]}. ${data.summary[language]}. ${data.facts[language].join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);

    // Pick appropriate voice tag
    if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (language === 'pa') {
      utterance.lang = 'pa-IN';
    } else {
      utterance.lang = 'en-US';
    }
    utterance.rate = 0.95;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const currentIndex = ALL_TARGETS.indexOf(target);
  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + ALL_TARGETS.length) % ALL_TARGETS.length;
    onSelectTarget(ALL_TARGETS[prevIdx]);
  };
  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % ALL_TARGETS.length;
    onSelectTarget(ALL_TARGETS[nextIdx]);
  };

  const getTargetIcon = (id: CelestialTarget) => {
    switch (id) {
      case 'sun':
        return <Sun className="w-5 h-5 text-amber-400" />;
      case 'moon':
        return <Moon className="w-5 h-5 text-slate-300" />;
      case 'earth':
        return <Globe className="w-5 h-5 text-emerald-400" />;
      case 'saturn':
      case 'uranus':
        return <Layers className="w-5 h-5 text-amber-300" />;
      case 'polaris':
      case 'milkyway':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      default:
        return <Compass className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 pointer-events-auto">
      {/* Dimmed backdrop - click to close */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 transition-opacity"
      />

      {/* Main Educational Card */}
      <div className="relative z-10 w-full max-w-2xl max-h-[88vh] flex flex-col bg-[#0b1329] border border-slate-700/80 rounded-2xl shadow-2xl text-slate-200 overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-[#0f172a]/95">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
              {getTargetIcon(target)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {data.name[language]}
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  {data.type[language]}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {data.name.en} • {data.name.hi} • {data.name.pa}
              </p>
            </div>
          </div>

          {/* Language Switcher & Close button */}
          <div className="flex items-center gap-2">
            {/* Language toggle pills */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-medium">
              <button
                onClick={() => onSelectLanguage('en')}
                className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                  language === 'en' ? 'bg-sky-500 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onSelectLanguage('hi')}
                className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                  language === 'hi' ? 'bg-sky-500 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => onSelectLanguage('pa')}
                className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                  language === 'pa' ? 'bg-sky-500 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                ਪੰਜਾਬੀ
              </button>
            </div>

            {/* Close button with high-contrast icon and tooltip */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/50 transition-colors cursor-pointer"
              title={t.close[language]}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-sm leading-relaxed no-scrollbar">
          {/* Audio narration button banner */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-xs text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.educationalFacts[language]}</span>
            </span>

            <button
              onClick={handleToggleSpeech}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                isPlayingAudio
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                  : 'bg-sky-500/20 text-sky-300 border-sky-500/40 hover:bg-sky-500/30'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  <span>{t.stopAudio[language]}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-sky-400" />
                  <span>{t.readAloud[language]}</span>
                </>
              )}
            </button>
          </div>

          {/* Overview Summary */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <p className="text-slate-200 text-sm leading-relaxed font-sans">
              {data.summary[language]}
            </p>
          </div>

          {/* Physical Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>{t.radius[language]}</span>
              </div>
              <span className="text-white font-medium block truncate">{data.radiusKm[language]}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.surfaceTemp[language]}</span>
              </div>
              <span className="text-amber-300 font-medium block truncate">{data.surfaceTemp[language]}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                <Orbit className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.orbitalPeriod[language]}</span>
              </div>
              <span className="text-slate-200 font-medium block truncate">{data.orbitalPeriod[language]}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                <RotateCw className="w-3.5 h-3.5 text-indigo-400" />
                <span>{t.rotationPeriod[language]}</span>
              </div>
              <span className="text-slate-200 font-medium block truncate">{data.rotationPeriod[language]}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.distanceFromSun[language]}</span>
              </div>
              <span className="text-slate-200 font-medium block truncate">{data.distanceFromSun[language]}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>{t.gravity[language]}</span>
              </div>
              <span className="text-slate-200 font-medium block truncate">{data.gravity[language]}</span>
            </div>
          </div>

          {/* Deep Educational Facts List */}
          <div className="space-y-2 pt-1">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>{t.educationalFacts[language]}</span>
            </h3>
            <div className="space-y-2">
              {data.facts[language].map((fact, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="font-mono text-sky-400 font-bold mt-0.5">•</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="flex items-center justify-between p-3.5 border-t border-slate-800 bg-[#0f172a]/95">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors cursor-pointer border border-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors cursor-pointer border border-slate-700"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors shadow-md cursor-pointer"
          >
            {t.close[language]}
          </button>
        </div>
      </div>
    </div>
  );
};
