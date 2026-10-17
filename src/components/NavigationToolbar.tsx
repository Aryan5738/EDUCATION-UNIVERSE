import React, { useState } from 'react';
import { Language } from '../types/cosmos';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Compass,
  Play,
  Pause,
  Eye,
  Maximize2,
} from 'lucide-react';

interface Props {
  language: Language;
  onZoom: (factor: number) => void;
  onRotateOrbit: (deltaAngleRad: number) => void;
  onToggleAutoRotate: () => boolean;
  onSetViewAngle: (angle: 'top' | 'equator' | 'front') => void;
}

export const NavigationToolbar: React.FC<Props> = ({
  language,
  onZoom,
  onRotateOrbit,
  onToggleAutoRotate,
  onSetViewAngle,
}) => {
  const [isAutoRotating, setIsAutoRotating] = useState(false);

  const labels = {
    zoomIn: { en: 'Zoom In', hi: 'ज़ूम इन (+)', pa: 'ਜ਼ੂਮ ਇਨ (+)' },
    zoomOut: { en: 'Zoom Out', hi: 'ज़ूम आउट (-)', pa: 'ਜ਼ੂਮ ਆਊਟ (-)' },
    rotateLeft: { en: 'Rotate Left', hi: 'बाएं घुमाएं', pa: 'ਖੱਬੇ ਘੁੰਮਾਓ' },
    rotateRight: { en: 'Rotate Right', hi: 'दाएं घुमाएं', pa: 'ਸੱਜੇ ਘੁੰਮਾਓ' },
    autoRotate: { en: '360° Orbit', hi: '360° घूर्णन', pa: '360° ਸਵੈ-ਘੁੰਮਾਓ' },
    topView: { en: 'Top View', hi: 'शीर्ष दृश्य', pa: 'ਉੱਤਰੀ ਦ੍ਰਿਸ਼' },
    frontView: { en: '3D Reset View', hi: '3D दृश्य रीसेट', pa: '3D ਦ੍ਰਿਸ਼ ਰੀਸੈਟ' },
  };

  const handleAutoRotate = () => {
    const newState = onToggleAutoRotate();
    setIsAutoRotating(newState);
  };

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-auto">
      <div className="bg-[#0f172a]/95 border border-slate-800 rounded-2xl shadow-2xl p-1.5 flex flex-col gap-1.5 text-slate-300">
        {/* Zoom In Button */}
        <button
          onClick={() => onZoom(-0.25)}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-sky-600 active:bg-sky-700 text-slate-200 hover:text-white transition-all shadow-sm cursor-pointer border border-slate-800 hover:border-sky-500"
          title={labels.zoomIn[language]}
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Out Button */}
        <button
          onClick={() => onZoom(0.25)}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-sky-600 active:bg-sky-700 text-slate-200 hover:text-white transition-all shadow-sm cursor-pointer border border-slate-800 hover:border-sky-500"
          title={labels.zoomOut[language]}
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <div className="w-full h-px bg-slate-800/80 my-0.5" />

        {/* Rotate Left */}
        <button
          onClick={() => onRotateOrbit(-0.25)}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-800"
          title={labels.rotateLeft[language]}
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Rotate Right */}
        <button
          onClick={() => onRotateOrbit(0.25)}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-800"
          title={labels.rotateRight[language]}
        >
          <RotateCw className="w-4 h-4" />
        </button>

        <div className="w-full h-px bg-slate-800/80 my-0.5" />

        {/* 360° Cinema Auto-Rotate Toggle */}
        <button
          onClick={handleAutoRotate}
          className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
            isAutoRotating
              ? 'bg-amber-500 text-white border-amber-400 shadow-md ring-1 ring-amber-400/40'
              : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
          }`}
          title={labels.autoRotate[language]}
        >
          {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Top-Down Polar Angle */}
        <button
          onClick={() => onSetViewAngle('top')}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-800"
          title={labels.topView[language]}
        >
          <Compass className="w-4 h-4 text-indigo-400" />
        </button>

        {/* Reset 3D View Angle */}
        <button
          onClick={() => onSetViewAngle('front')}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-800"
          title={labels.frontView[language]}
        >
          <Eye className="w-4 h-4 text-emerald-400" />
        </button>
      </div>
    </div>
  );
};
