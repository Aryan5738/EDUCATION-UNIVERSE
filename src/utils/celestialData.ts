import { CelestialBodyInfo, CelestialTarget, Language, MoonPhaseData } from '../types/cosmos';

export const UI_TRANSLATIONS: Record<string, Record<Language, string>> = {
  appTitle: {
    en: 'Cosmos 3D - Universe & Solar System',
    hi: 'कॉसमॉस 3D - ब्रह्मांड एवं सौर मंडल',
    pa: 'ਕੌਸਮੌਸ 3D - ਬ੍ਰਹਿਮੰਡ ਅਤੇ ਸੂਰਜੀ ਮੰਡਲ',
  },
  showInfo: {
    en: 'Information & Educational Guide',
    hi: 'जानकारी एवं शैक्षणिक गाइड',
    pa: 'ਜਾਣਕਾਰੀ ਅਤੇ ਸਿੱਖਿਆ ਗਾਈਡ',
  },
  close: {
    en: 'Close',
    hi: 'बंद करें',
    pa: 'ਬੰਦ ਕਰੋ',
  },
  tapToLearn: {
    en: 'Tap on any planet or star to explore • Touch & drag to orbit • Pinch to zoom',
    hi: 'किसी भी ग्रह या तारे पर टैप करके जानें • घुमाने के लिए ड्रैग करें • ज़ੂम करने के लिए पिंच करें',
    pa: 'ਜਾਣਕਾਰੀ ਲਈ ਕਿਸੇ ਵੀ ਗ੍ਰਹਿ ਜਾਂ ਤਾਰੇ ਤੇ ਟੈਪ ਕਰੋ • ਘੁੰਮਾਉਣ ਲਈ ਡਰੈਗ ਕਰੋ • ਜ਼ੂਮ ਲਈ ਪਿੰਚ ਕਰੋ',
  },
  controlsTitle: {
    en: 'Controls & Exploration',
    hi: 'नियंत्रण एवं अन्वेषण',
    pa: 'ਨਿਯੰਤਰਣ ਅਤੇ ਖੋਜ',
  },
  hideControls: {
    en: 'Hide Controls',
    hi: 'नियंत्रण छिपाएं',
    pa: 'ਕੰਟਰੋਲ ਲੁਕਾਓ',
  },
  showControls: {
    en: 'Show Controls',
    hi: 'नियंत्रण दिखाएं',
    pa: 'ਕੰਟਰੋਲ ਦਿਖਾਓ',
  },
  focusTab: {
    en: 'Celestial Bodies',
    hi: 'खगोलीय पिंड',
    pa: 'ਖਗੋਲੀ ਪਿੰਡ',
  },
  timeTab: {
    en: 'Time & Orbits',
    hi: 'समय और कक्षाएँ',
    pa: 'ਸਮਾਂ ਅਤੇ ਔਰਬਿਟ',
  },
  solarTab: {
    en: 'Solar & Stars',
    hi: 'सूर्य व तारे',
    pa: 'ਸੂਰਜ ਅਤੇ ਤਾਰੇ',
  },
  layersTab: {
    en: 'Cosmos Layers',
    hi: 'ब्रह्मांड परतें',
    pa: 'ਬ੍ਰਹਿਮੰਡ ਪਰਤਾਂ',
  },
  speed: {
    en: 'Simulation Speed',
    hi: 'सिमुलेशन गति',
    pa: 'ਸਿਮੂਲੇਸ਼ਨ ਗਤੀ',
  },
  pause: {
    en: 'Pause',
    hi: 'रोकें',
    pa: 'ਰੋਕੋ',
  },
  resume: {
    en: 'Resume',
    hi: 'शुरू करें',
    pa: 'ਚਲਾਓ',
  },
  reset: {
    en: 'Reset',
    hi: 'रीसेट',
    pa: 'ਰੀਸੈਟ',
  },
  stepBack: {
    en: '-1 Day',
    hi: '-1 दिन',
    pa: '-1 ਦਿਨ',
  },
  stepFwd: {
    en: '+1 Day',
    hi: '+1 दिन',
    pa: '+1 ਦਿਨ',
  },
  readAloud: {
    en: 'Listen to Explanation',
    hi: 'विवरण सुनें',
    pa: 'ਵਿਆਖਿਆ ਸੁਣੋ',
  },
  stopAudio: {
    en: 'Stop Audio',
    hi: 'ऑडियो रोकें',
    pa: 'ਆਵਾਜ਼ ਬੰਦ ਕਰੋ',
  },
  solarEclipse: {
    en: 'Solar Eclipse',
    hi: 'सूर्य ग्रहण',
    pa: 'ਸੂਰਜ ਗ੍ਰਹਿਣ',
  },
  lunarEclipse: {
    en: 'Lunar Eclipse',
    hi: 'चंद्र ग्रहण',
    pa: 'ਚੰਦਰ ਗ੍ਰਹਿਣ',
  },
  radius: {
    en: 'Radius / Diameter',
    hi: 'त्रिज्या / व्यास',
    pa: 'ਅਰਧ-ਵਿਆਸ / ਵਿਆਸ',
  },
  surfaceTemp: {
    en: 'Surface Temperature',
    hi: 'सतह का तापमान',
    pa: 'ਸਤ੍ਹਾ ਦਾ ਤਾਪਮਾਨ',
  },
  orbitalPeriod: {
    en: 'Orbital Period',
    hi: 'परिक्रमण काल',
    pa: 'ਔਰਬਿਟਲ ਕਾਲ',
  },
  rotationPeriod: {
    en: 'Rotational Period',
    hi: 'घूर्णन काल',
    pa: 'ਘੁੰਮਣ ਕਾਲ',
  },
  distanceFromSun: {
    en: 'Distance from Sun',
    hi: 'सूर्य से दूरी',
    pa: 'ਸੂਰਜ ਤੋਂ ਦੂਰੀ',
  },
  gravity: {
    en: 'Surface Gravity',
    hi: 'गुरुत्वाकर्षण',
    pa: 'ਗੁਰੂਤਾਕਰਸ਼ਣ',
  },
  educationalFacts: {
    en: 'Educational & Astrophysical Insights',
    hi: 'शैक्षणिक एवं खगोल-भौतिकीय तथ्य',
    pa: 'ਸਿੱਖਿਆਦਾਇਕ ਅਤੇ ਖਗੋਲ-ਵਿਗਿਆਨਕ ਤੱਥ',
  },
};

export const CELESTIAL_BODIES: Record<CelestialTarget, CelestialBodyInfo> = {
  overview: {
    id: 'overview',
    name: {
      en: 'The Solar System & Cosmos',
      hi: 'सौर मंडल एवं संपूर्ण ब्रह्मांड',
      pa: 'ਸੂਰਜੀ ਮੰਡਲ ਅਤੇ ਸਮੁੱਚਾ ਬ੍ਰਹਿਮੰਡ',
    },
    type: {
      en: 'Gravitationally Bound Planetary System',
      hi: 'गुरुत्वाकर्षण से बंधी ग्रहीय प्रणाली',
      pa: 'ਗੁਰੂਤਾਕਰਸ਼ਣ ਨਾਲ ਬੱਝੀ ਗ੍ਰਹਿ ਪ੍ਰਣਾਲੀ',
    },
    radiusKm: {
      en: 'Heliosphere ~120 AU (~18 Billion km)',
      hi: 'हेलियोस्फीयर ~120 AU (~18 अरब किमी)',
      pa: 'ਹੀਲੀਓਸਫੀਅਰ ~120 AU (~18 ਅਰਬ ਕਿਮੀ)',
    },
    surfaceTemp: {
      en: 'Deep Space: 2.7 Kelvin (-270.45 °C)',
      hi: 'अंतरिक्ष: 2.7 केल्विन (-270.45 °C)',
      pa: 'ਡੂੰਘਾ ਪੁਲਾੜ: 2.7 ਕੈਲਵਿਨ (-270.45 °C)',
    },
    orbitalPeriod: {
      en: 'Galactic Year: ~230 Million Earth Years',
      hi: 'गैलेक्टिक वर्ष: ~23 करोड़ वर्ष',
      pa: 'ਗਲੈਕਟਿਕ ਸਾਲ: ~23 ਕਰੋੜ ਸਾਲ',
    },
    rotationPeriod: {
      en: 'Differential Rotation (Sun: 25-35 days)',
      hi: 'विभेदक घूर्णन (सूर्य: 25-35 दिन)',
      pa: 'ਅੰਤਰ ਘੁੰਮਣ (ਸੂਰਜ: 25-35 ਦਿਨ)',
    },
    distanceFromSun: {
      en: 'Center to Kuiper Belt & Oort Cloud',
      hi: 'केंद्र से काइपर बेल्ट व ऊर्ट बादल',
      pa: 'ਕੇਂਦਰ ਤੋਂ ਕਾਈਪਰ ਬੈਲਟ ਅਤੇ ਓਅਰਟ ਬੱਦਲ',
    },
    gravity: {
      en: 'Governed by Sun (99.86% total mass)',
      hi: 'सूर्य द्वारा नियंत्रित (99.86% कुल द्रव्यमान)',
      pa: 'ਸੂਰਜ ਦੁਆਰਾ ਨਿਯੰਤਰਿਤ (99.86% ਕੁੱਲ ਪੁੰਜ)',
    },
    summary: {
      en: 'The Solar System formed 4.57 billion years ago from the gravitational collapse of a giant molecular cloud. It consists of the Sun, eight planets, moons, dwarf planets, and millions of asteroids and comets orbiting in the ecliptic plane.',
      hi: 'सौर मंडल का निर्माण 4.57 अरब वर्ष पहले एक विशाल आणविक बादल के ढहने से हुआ था। इसमें सूर्य, आठ मुख्य ग्रह, उपग्रह, क्षुद्रग्रह और धूमकेतु शामिल हैं।',
      pa: 'ਸੂਰਜੀ ਮੰਡਲ ਦਾ ਨਿਰਮਾਣ ਲਗਭਗ 4.57 ਅਰਬ ਸਾਲ ਪਹਿਲਾਂ ਇੱਕ ਵਿਸ਼ਾਲ ਧੂੜ ਦੇ ਬੱਦਲ ਦੇ ਗੁਰੂਤਾਕਰਸ਼ਣ ਕਾਰਨ ਹੋਇਆ ਸੀ। ਇਸ ਵਿੱਚ ਸੂਰਜ, ਅੱਠ ਗ੍ਰਹਿ, ਉਪਗ੍ਰਹਿ ਅਤੇ ਅਣਗਿਣਤ ਤਾਰੇ ਸ਼ਾਮਲ ਹਨ।',
    },
    facts: {
      en: [
        'Over 99.86% of the Solar System’s entire mass is concentrated in the Sun.',
        'All eight planets orbit in almost the same flat plane because they formed from a rotating protoplanetary disc.',
        'The Solar System is located in the Orion Arm of the barred spiral Milky Way galaxy.',
      ],
      hi: [
        'सौर मंडल का 99.86% से अधिक द्रव्यमान अकेले सूर्य में समाया हुआ है।',
        'सभी आठ ग्रह लगभग एक ही समतल कक्षा में घूमते हैं क्योंकि वे घूमती हुई डिस्क से बने थे।',
        'हमारा सौर मंडल मिल्की वे (आकाशगंगा) की ओरियन भुजा में स्थित है।',
      ],
      pa: [
        'ਸੂਰਜੀ ਮੰਡਲ ਦਾ 99.86% ਤੋਂ ਵੱਧ ਪੁੰਜ ਇਕੱਲੇ ਸੂਰਜ ਵਿੱਚ ਕੇਂਦਰਿਤ ਹੈ।',
        'ਸਾਰੇ ਅੱਠ ਗ੍ਰਹਿ ਲਗਭਗ ਇੱਕੋ ਪੱਧਰੀ ਔਰਬਿਟ ਵਿੱਚ ਘੁੰਮਦੇ ਹਨ ਕਿਉਂਕਿ ਉਹ ਇੱਕ ਘੁੰਮਦੀ ਡਿਸਕ ਤੋਂ ਬਣੇ ਸਨ।',
        'ਸਾਡਾ ਸੂਰਜੀ ਮੰਡਲ ਮਿਲਕੀ ਵੇਅ ਗਲੈਕਸੀ ਦੀ ਓਰੀਅਨ ਭੁਜਾ ਵਿੱਚ ਸਥਿਤ ਹੈ।',
      ],
    },
  },
  sun: {
    id: 'sun',
    name: {
      en: 'The Sun (Sol)',
      hi: 'सूर्य (सूरज)',
      pa: 'ਸੂਰਜ (ਸੋਲ)',
    },
    type: {
      en: 'G-Type Main-Sequence Star (Yellow Dwarf)',
      hi: 'जी-टाइप मुख्य अनुक्रम तारा (पीला बौना)',
      pa: 'ਜੀ-ਕਿਸਮ ਮੁੱਖ ਤਾਰਾ (ਪੀਲਾ ਬੌਣਾ ਤਾਰਾ)',
    },
    radiusKm: {
      en: '696,340 km (109 × Earth radius)',
      hi: '696,340 किमी (पृथ्वी से 109 गुना)',
      pa: '696,340 ਕਿਮੀ (ਧਰਤੀ ਤੋਂ 109 ਗੁਣਾ)',
    },
    surfaceTemp: {
      en: 'Photosphere: 5,778 K (Core: 15,000,000 K)',
      hi: 'सतह: 5,778 K (कोर: 1.5 करोड़ K)',
      pa: 'ਸਤ੍ਹਾ: 5,778 K (ਕੇਂਦਰ: 1.5 ਕਰੋੜ K)',
    },
    orbitalPeriod: {
      en: '~230 Million Years around Galactic Center',
      hi: '~23 करोड़ वर्ष (आकाशगंगा केंद्र के चारों ओर)',
      pa: '~23 ਕਰੋੜ ਸਾਲ (ਗਲੈਕਸੀ ਕੇਂਦਰ ਦੁਆਲੇ)',
    },
    rotationPeriod: {
      en: '25.4 days at Equator, 35 days at Poles',
      hi: 'भूमध्य रेखा पर 25.4 दिन, ध्रुवों पर 35 दिन',
      pa: 'ਭੂਮੱਧ ਰੇਖਾ ਤੇ 25.4 ਦਿਨ, ਧਰੁਵਾਂ ਤੇ 35 ਦਿਨ',
    },
    distanceFromSun: {
      en: '0 AU (Center of System)',
      hi: '0 AU (सौर मंडल का केंद्र)',
      pa: '0 AU (ਸਿਸਟਮ ਦਾ ਕੇਂਦਰ)',
    },
    gravity: {
      en: '274 m/s² (28 × Earth gravity)',
      hi: '274 m/s² (पृथ्वी से 28 गुना)',
      pa: '274 m/s² (ਧਰਤੀ ਨਾਲੋਂ 28 ਗੁਣਾ)',
    },
    summary: {
      en: 'The Sun is the powerhouse of our Solar System, fueled by nuclear fusion in its core where 600 million tons of hydrogen are converted into helium each second. It drives Earth’s weather, ocean currents, seasons, and all life.',
      hi: 'सूर्य हमारे सौर मंडल का ऊर्जा स्रोत है। इसके केंद्र में हर सेकंड 60 करोड़ टन हाइड्रोजन हीलियम में संलयित होकर प्रचंड ऊर्जा और प्रकाश पैदा करती है।',
      pa: 'ਸੂਰਜ ਸਾਡੇ ਸੂਰਜੀ ਮੰਡਲ ਦਾ ਧੁਰਾ ਹੈ। ਇਸਦੇ ਕੇਂਦਰ ਵਿੱਚ ਹਰ ਸਕਿੰਟ 60 ਕਰੋੜ ਟਨ ਹਾਈਡ੍ਰੋਜਨ ਹੀਲੀਅਮ ਵਿੱਚ ਬਦਲ ਕੇ ਭਾਰੀ ਊਰਜਾ ਅਤੇ ਰੌਸ਼ਨੀ ਪੈਦਾ ਕਰਦੀ ਹੈ।',
    },
    facts: {
      en: [
        'Photons born in the thermonuclear core take over 100,000 years to reach the surface, but only 8 minutes and 20 seconds to reach Earth.',
        'Solar prominences and Coronal Mass Ejections (CMEs) fling billions of tons of magnetized plasma across the Solar System.',
        'Sunspots are temporary phenomena on the photosphere where intense magnetic fields inhibit convection, lowering local temperature.',
      ],
      hi: [
        'सूर्य के केंद्र में बने फोटॉन को सतह तक आने में 100,000 साल लगते हैं, पर वहां से पृथ्वी तक सिर्फ 8 मिनट 20 सेकंड लगते हैं।',
        'कोरोना से निकलने वाले सौर तूफान (CME) अरबों टन प्लाज्मा अंतरिक्ष में फेंकते हैं।',
        'सनस्पॉट (सौर कलंक) वे ठंडे क्षेत्र हैं जहां तीव्र चुंबकीय क्षेत्र संवहन को रोक देते हैं।',
      ],
      pa: [
        'ਸੂਰਜ ਦੇ ਕੇਂਦਰ ਵਿੱਚ ਬਣੇ ਪ੍ਰਕਾਸ਼ ਕਣਾਂ (ਫੋਟੌਨ) ਨੂੰ ਸਤ੍ਹਾ ਤੇ ਆਉਣ ਲਈ 1 ਲੱਖ ਸਾਲ ਲੱਗਦੇ ਹਨ, ਪਰ ਉੱਥੋਂ ਧਰਤੀ ਤੱਕ ਸਿਰਫ਼ 8 ਮਿੰਟ 20 ਸਕਿੰਟ ਲੱਗਦੇ ਹਨ।',
        'ਸੂਰਜੀ ਤੂਫ਼ਾਨ (CME) ਅਰਬਾਂ ਟਨ ਚੁੰਬਕੀ ਪਲਾਜ਼ਮਾ ਪੁਲਾੜ ਵਿੱਚ ਉਛਾਲਦੇ ਹਨ।',
        'ਸਨਸਪੌਟ ਉਹ ਖੇਤਰ ਹਨ ਜਿੱਥੇ ਤੇਜ਼ ਚੁੰਬਕੀ ਤਾਕਤ ਕਾਰਨ ਸਤ੍ਹਾ ਦਾ ਤਾਪਮਾਨ ਆਲੇ-ਦੁਆਲੇ ਨਾਲੋਂ ਠੰਡਾ ਹੁੰਦਾ ਹੈ।',
      ],
    },
  },
  mercury: {
    id: 'mercury',
    name: {
      en: 'Mercury (Hermes)',
      hi: 'बुध ग्रह',
      pa: 'ਬੁੱਧ ਗ੍ਰਹਿ',
    },
    type: {
      en: 'Terrestrial Planet (Smallest)',
      hi: 'स्थलीय ग्रह (सबसे छोटा ग्रह)',
      pa: 'ਧਰਾਤਲੀ ਗ੍ਰਹਿ (ਸਭ ਤੋਂ ਛੋਟਾ ਗ੍ਰਹਿ)',
    },
    radiusKm: {
      en: '2,439.7 km (0.38 × Earth)',
      hi: '2,439.7 किमी (पृथ्वी का 0.38 गुना)',
      pa: '2,439.7 ਕਿਮੀ (ਧਰਤੀ ਦਾ 0.38 ਗੁਣਾ)',
    },
    surfaceTemp: {
      en: '-180 °C (Night) to 430 °C (Day)',
      hi: '-180 °C (रात) से 430 °C (दिन)',
      pa: '-180 °C (ਰਾਤ) ਤੋਂ 430 °C (ਦਿਨ)',
    },
    orbitalPeriod: {
      en: '87.97 Earth Days (Fastest planet)',
      hi: '87.97 दिन (सबसे तेज़ ग्रह)',
      pa: '87.97 ਦਿਨ (ਸਭ ਤੋਂ ਤੇਜ਼ ਗ੍ਰਹਿ)',
    },
    rotationPeriod: {
      en: '58.6 Earth Days (3:2 spin-orbit resonance)',
      hi: '58.6 दिन',
      pa: '58.6 ਦਿਨ',
    },
    distanceFromSun: {
      en: '57.9 Million km (0.39 AU)',
      hi: '5.79 करोड़ किमी (0.39 AU)',
      pa: '5.79 ਕਰੋੜ ਕਿਮੀ (0.39 AU)',
    },
    gravity: {
      en: '3.7 m/s² (38% of Earth)',
      hi: '3.7 m/s² (पृथ्वी का 38%)',
      pa: '3.7 m/s² (ਧਰਤੀ ਦਾ 38%)',
    },
    summary: {
      en: 'Mercury is the closest planet to the Sun and the smallest in the Solar System. Lacking a substantial atmosphere to trap heat, it endures the most extreme temperature fluctuations of any planet.',
      hi: 'बुध सूर्य का सबसे नजदीकी और सबसे छोटा ग्रह है। वायुमंडल न होने के कारण यहां दिन में अत्यधिक गर्मी और रात में भीषण ठंड होती है।',
      pa: 'ਬੁੱਧ ਸੂਰਜ ਦੇ ਸਭ ਤੋਂ ਨੇੜਲਾ ਅਤੇ ਸਭ ਤੋਂ ਛੋਟਾ ਗ੍ਰਹਿ ਹੈ। ਕੋਈ ਵਾਯੂਮੰਡਲ ਨਾ ਹੋਣ ਕਾਰਨ ਇੱਥੇ ਦਿਨ ਵਿੱਚ ਬਹੁਤ ਗਰਮੀ ਅਤੇ ਰਾਤ ਨੂੰ ਬਰਫ਼ੀਲੀ ਠੰਡ ਹੁੰਦੀ ਹੈ।',
    },
    facts: {
      en: [
        'A year on Mercury is just 88 Earth days, but one solar day (noon to noon) lasts 176 Earth days.',
        'Mercury has an enormous metallic iron core that makes up roughly 85% of the planet’s radius.',
        'Water ice exists inside deep, permanently shadowed craters at Mercury’s poles.',
      ],
      hi: [
        'बुध पर एक साल सिर्फ 88 दिनों का होता है, पर एक दिन-रात 176 दिनों का होता है।',
        'बुध का कोर लोहे का बना है जो इसके 85% हिस्से को घेरता है।',
        'बुध के ध्रुवों के गहरे गड्ढों में बर्फ जमी हुई पाई गई है।',
      ],
      pa: [
        'ਬੁੱਧ ਦਾ ਇੱਕ ਸਾਲ ਸਿਰਫ਼ 88 ਦਿਨਾਂ ਦਾ ਹੁੰਦਾ ਹੈ, ਪਰ ਇੱਕ ਦਿਨ 176 ਧਰਤੀ ਦਿਨਾਂ ਦੇ ਬਰਾਬਰ ਹੁੰਦਾ ਹੈ।',
        'ਇਸਦਾ 85% ਕੇਂਦਰੀ ਹਿੱਸਾ ਠੋਸ ਲੋਹੇ ਦਾ ਬਣਿਆ ਹੋਇਆ ਹੈ।',
        'ਇਸਦੇ ਧਰੁਵਾਂ ਦੇ ਸਦਾ ਹਨੇਰੇ ਵਾਲੇ ਖੱਡਿਆਂ ਵਿੱਚ ਜੰਮੀ ਹੋਈ ਬਰਫ਼ ਮੌਜੂਦ ਹੈ।',
      ],
    },
  },
  venus: {
    id: 'venus',
    name: {
      en: 'Venus (Aphrodite)',
      hi: 'शुक्र ग्रह (भोर का तारा)',
      pa: 'ਸ਼ੁੱਕਰ ਗ੍ਰਹਿ (ਸਵੇਰ ਦਾ ਤਾਰਾ)',
    },
    type: {
      en: 'Terrestrial Planet (Hottest Planet)',
      hi: 'स्थलीय ग्रह (सबसे गर्म ग्रह)',
      pa: 'ਧਰਾਤਲੀ ਗ੍ਰਹਿ (ਸਭ ਤੋਂ ਗਰਮ ਗ੍ਰਹਿ)',
    },
    radiusKm: {
      en: '6,051.8 km (0.95 × Earth)',
      hi: '6,051.8 किमी (पृथ्वी की जुड़वां बहन)',
      pa: '6,051.8 ਕਿਮੀ (ਧਰਤੀ ਵਰਗਾ ਆਕਾਰ)',
    },
    surfaceTemp: {
      en: '465 °C (738 K) - Hot enough to melt lead',
      hi: '465 °C (सीसा पिघलाने जितनी गर्मी)',
      pa: '465 °C (ਸਿੱਕਾ ਪਿਘਲਾਉਣ ਜਿੰਨੀ ਗਰਮੀ)',
    },
    orbitalPeriod: {
      en: '224.7 Earth Days',
      hi: '224.7 दिन',
      pa: '224.7 ਦਿਨ',
    },
    rotationPeriod: {
      en: '243 Earth Days (Retrograde / Clockwise)',
      hi: '243 दिन (उल्टी दिशा में घूर्णन)',
      pa: '243 ਦਿਨ (ਪੁੱਠੀ ਦਿਸ਼ਾ ਵਿੱਚ ਘੁੰਮਣਾ)',
    },
    distanceFromSun: {
      en: '108.2 Million km (0.72 AU)',
      hi: '10.82 करोड़ किमी (0.72 AU)',
      pa: '10.82 ਕਰੋੜ ਕਿਮੀ (0.72 AU)',
    },
    gravity: {
      en: '8.87 m/s² (91% of Earth)',
      hi: '8.87 m/s² (पृथ्वी का 91%)',
      pa: '8.87 m/s² (ਧਰਤੀ ਦਾ 91%)',
    },
    summary: {
      en: 'Venus is Earth’s "twin" in size and mass, but has experienced a runaway greenhouse effect. Its suffocating carbon dioxide atmosphere and sulfuric acid clouds trap heat, making it the hottest planet in the Solar System.',
      hi: 'शुक्र आकार में पृथ्वी जैसा है, पर इसका घना कार्बन डाइऑक्साइड वायुमंडल भीषण ग्रीनहाउस प्रभाव पैदा करता है, जिससे यह सबसे गर्म ग्रह बन गया है।',
      pa: 'ਸ਼ੁੱਕਰ ਆਕਾਰ ਵਿੱਚ ਧਰਤੀ ਵਰਗਾ ਹੈ ਪਰ ਇਸਦਾ ਵਾਯੂਮੰਡਲ 96% ਕਾਰਬਨ ਡਾਈਆਕਸਾਈਡ ਅਤੇ ਤੇਜ਼ਾਬ ਦੇ ਬੱਦਲਾਂ ਨਾਲ ਭਰਿਆ ਹੋਇਆ ਹੈ, ਜਿਸ ਕਾਰਨ ਇਹ ਸਭ ਤੋਂ ਗਰਮ ਗ੍ਰਹਿ ਹੈ।',
    },
    facts: {
      en: [
        'Venus spins backwards (retrograde) compared to almost all other planets—on Venus, the Sun rises in the west and sets in the east.',
        'Atmospheric pressure at the surface is 92 times that of Earth—equivalent to being 900 meters underwater.',
        'Venus has thousands of volcanoes, and its thick clouds reflect 70% of sunlight, making it the brightest object in our night sky after the Moon.',
      ],
      hi: [
        'शुक्र उल्टी दिशा में घूमता है—यहां सूर्य पश्चिम से उगता है और पूर्व में डूबता है।',
        'शुक्र की सतह पर हवा का दबाव पृथ्वी के समुद्र में 900 मीटर नीचे जितना भारी है।',
        'यह रात के आसमान में चंद्रमा के बाद सबसे चमकीला पिंड है।',
      ],
      pa: [
        'ਸ਼ੁੱਕਰ ਪੁੱਠੀ ਦਿਸ਼ਾ ਵਿੱਚ ਘੁੰਮਦਾ ਹੈ—ਇੱਥੇ ਸੂਰਜ ਪੱਛਮ ਵਿੱਚ ਚੜ੍ਹਦਾ ਹੈ ਅਤੇ ਪੂਰਬ ਵਿੱਚ ਛਿਪਦਾ ਹੈ।',
        'ਇਸਦੀ ਸਤ੍ਹਾ ਤੇ ਹਵਾ ਦਾ ਦਬਾਅ ਧਰਤੀ ਨਾਲੋਂ 92 ਗੁਣਾ ਜ਼ਿਆਦਾ ਹੈ।',
        'ਚੰਦਰਮਾ ਤੋਂ ਬਾਅਦ ਰਾਤ ਦੇ ਅਸਮਾਨ ਵਿੱਚ ਇਹ ਸਭ ਤੋਂ ਵੱਧ ਚਮਕਣ ਵਾਲਾ ਗ੍ਰਹਿ ਹੈ।',
      ],
    },
  },
  earth: {
    id: 'earth',
    name: {
      en: 'Earth (Terra)',
      hi: 'पृथ्वी (धरती माता)',
      pa: 'ਧਰਤੀ (ਪ੍ਰਿਥਵੀ)',
    },
    type: {
      en: 'Terrestrial Planet (Habitable Ocean World)',
      hi: 'स्थलीय ग्रह (जीवन युक्त महासागरीय ग्रह)',
      pa: 'ਧਰਾਤਲੀ ਗ੍ਰਹਿ (ਜੀਵਨ ਭਰਪੂਰ ਗ੍ਰਹਿ)',
    },
    radiusKm: {
      en: '6,371.0 km (Equatorial: 6,378 km)',
      hi: '6,371 किमी',
      pa: '6,371 ਕਿਮੀ',
    },
    surfaceTemp: {
      en: 'Average 15 °C (288 K) [-89 °C to 57 °C]',
      hi: 'औसत 15 °C (-89 °C से 57 °C)',
      pa: 'ਔਸਤ 15 °C (-89 °C ਤੋਂ 57 °C)',
    },
    orbitalPeriod: {
      en: '365.256 Days (1.000 Year)',
      hi: '365.25 दिन (1 वर्ष)',
      pa: '365.25 ਦਿਨ (1 ਸਾਲ)',
    },
    rotationPeriod: {
      en: '23h 56m 04s (1 Sidereal Day)',
      hi: '23 घंटे 56 मिनट 4 सेकंड',
      pa: '23 ਘੰਟੇ 56 ਮਿੰਟ 4 ਸਕਿੰਟ',
    },
    distanceFromSun: {
      en: '149.6 Million km (1.000 AU)',
      hi: '14.96 करोड़ किमी (1.000 AU)',
      pa: '14.96 ਕਰੋੜ ਕਿਮੀ (1.000 AU)',
    },
    gravity: {
      en: '9.807 m/s² (1.00 g standard)',
      hi: '9.8 m/s² (मानक गुरुत्वाकर्षण)',
      pa: '9.8 m/s² (ਮਿਆਰੀ ਗੁਰੂਤਾਕਰਸ਼ਣ)',
    },
    summary: {
      en: 'Earth is our home, the third planet from the Sun, and the only known place in the universe confirmed to harbor life. With 71% of its surface covered by liquid water oceans, dynamic plate tectonics, and a protective magnetic field, it is an oasis in the cosmos.',
      hi: 'पृथ्वी हमारा घर है और ब्रह्मांड में जीवन का ज्ञात एकमात्र ठिकाना है। 71% तरल पानी से ढकी सतह, सुरक्षात्मक वायुमंडल और चुंबकीय क्षेत्र इसे एक अनोखा ग्रह बनाते हैं।',
      pa: 'ਧਰਤੀ ਸਾਡਾ ਘਰ ਹੈ ਅਤੇ ਪੂਰੇ ਬ੍ਰਹਿਮੰਡ ਵਿੱਚ ਜੀਵਨ ਵਾਲਾ ਇਕਲੌਤਾ ਗਿਆਤ ਗ੍ਰਹਿ ਹੈ। ਇਸਦੀ 71% ਸਤ੍ਹਾ ਪਾਣੀ ਨਾਲ ਢੱਕੀ ਹੋਈ ਹੈ ਅਤੇ ਚੁੰਬਕੀ ਢਾਲ ਜੀਵਨ ਦੀ ਰੱਖਿਆ ਕਰਦੀ ਹੈ।',
    },
    facts: {
      en: [
        'Earth’s 23.44° axial tilt gives rise to the four seasons as the Northern and Southern hemispheres take turns leaning toward the Sun.',
        'The swirling molten iron outer core generates a geodynamo magnetic field that shields us from lethal solar cosmic radiation.',
        'Earth is the only planet not named after a Greek or Roman deity—its name derives from Old English and Germanic roots.',
      ],
      hi: [
        'पृथ्वी की 23.44° झुकी हुई धुरी के कारण ही साल भर में मौसम (ऋतुएं) बदलते हैं।',
        'पिघले लोहे का कोर पृथ्वी का चुंबकीय कवच बनाता है जो सौर तूफानों से हमारी रक्षा करता है।',
        'पृथ्वी सौर मंडल का सबसे घना ग्रह है।',
      ],
      pa: [
        'ਧਰਤੀ ਦਾ 23.44° ਝੁਕਾਅ ਹੀ ਸਾਲ ਭਰ ਵਿੱਚ ਮੌਸਮਾਂ (ਗਰਮੀ, ਸਰਦੀ, ਬਸੰਤ) ਦੇ ਬਦਲਣ ਦਾ ਕਾਰਨ ਬਣਦਾ ਹੈ।',
        'ਪਿਘਲੇ ਲੋਹੇ ਦਾ ਅੰਦਰੂਨੀ ਕੇਂਦਰ ਚੁੰਬਕੀ ਢਾਲ ਪੈਦਾ ਕਰਦਾ ਹੈ ਜੋ ਸੂਰਜੀ ਰੇਡੀਏਸ਼ਨ ਤੋਂ ਸਾਡੀ ਰਾਖੀ ਕਰਦੀ ਹੈ।',
        'ਧਰਤੀ ਸੂਰਜੀ ਮੰਡਲ ਦਾ ਸਭ ਤੋਂ ਵੱਧ ਘਣਤਾ ਵਾਲਾ ਗ੍ਰਹਿ ਹੈ।',
      ],
    },
  },
  moon: {
    id: 'moon',
    name: {
      en: 'The Moon (Luna)',
      hi: 'चंद्रमा (चंदा मामा)',
      pa: 'ਚੰਦਰਮਾ (ਚੰਨ)',
    },
    type: {
      en: 'Natural Satellite (Earth’s Only Moon)',
      hi: 'प्राकृतिक उपग्रह (पृथ्वी का चंद्रमा)',
      pa: 'ਕੁਦਰਤੀ ਉਪਗ੍ਰਹਿ (ਧਰਤੀ ਦਾ ਚੰਨ)',
    },
    radiusKm: {
      en: '1,737.4 km (0.27 × Earth)',
      hi: '1,737.4 किमी (पृथ्वी का एक-चौथाई)',
      pa: '1,737.4 ਕਿਮੀ (ਧਰਤੀ ਦਾ ਚੌਥਾ ਹਿੱਸਾ)',
    },
    surfaceTemp: {
      en: '-173 °C (Night) to 127 °C (Day)',
      hi: '-173 °C (रात) से 127 °C (दिन)',
      pa: '-173 °C (ਰਾਤ) ਤੋਂ 127 °C (ਦਿਨ)',
    },
    orbitalPeriod: {
      en: '27.32 Days (Sidereal) / 29.53 Days (Synodic Phase)',
      hi: '27.3 दिन (परिक्रमा) / 29.5 दिन (कलाएं)',
      pa: '27.3 ਦਿਨ (ਚੱਕਰ) / 29.5 ਦਿਨ (ਕਲਾਵਾਂ)',
    },
    rotationPeriod: {
      en: '27.32 Days (Tidally Locked to Earth)',
      hi: '27.32 दिन (ज्वारीय रूप से बंधा हुआ)',
      pa: '27.32 ਦਿਨ (ਸਦਾ ਇੱਕੋ ਪਾਸਾ ਧਰਤੀ ਵੱਲ)',
    },
    distanceFromSun: {
      en: '1.00 AU (~384,400 km from Earth)',
      hi: '1.00 AU (पृथ्वी से 384,400 किमी)',
      pa: '1.00 AU (ਧਰਤੀ ਤੋਂ 384,400 ਕਿਮੀ)',
    },
    gravity: {
      en: '1.62 m/s² (16.6% of Earth gravity)',
      hi: '1.62 m/s² (पृथ्वी का 1/6 भाग)',
      pa: '1.62 m/s² (ਧਰਤੀ ਦਾ ਛੇਵਾਂ ਹਿੱਸਾ)',
    },
    summary: {
      en: 'The Moon is Earth’s constant cosmic companion. Formed 4.5 billion years ago when a Mars-sized planet named Theia smashed into proto-Earth, the Moon stabilizes Earth’s wobble and drives oceanic tides.',
      hi: 'चंद्रमा पृथ्वी का एकमात्र प्राकृतिक उपग्रह है। यह 4.5 अरब साल पहले एक विशाल टक्कर से बना था। चंद्रमा की गुरुत्वाकर्षण शक्ति ही समुद्र में ज्वਾਰ-भाटा लाती है।',
      pa: 'ਚੰਦਰਮਾ ਧਰਤੀ ਦਾ ਇਕਲੌਤਾ ਕੁਦਰਤੀ ਉਪਗ੍ਰਹਿ ਹੈ। ਇਸਦੇ ਗੁਰੂਤਾਕਰਸ਼ਣ ਕਾਰਨ ਹੀ ਸਮੁੰਦਰਾਂ ਵਿੱਚ ਲਹਿਰਾਂ (ਜਵਾਰ-ਭਾਟਾ) ਉੱਠਦੀਆਂ ਹਨ।',
    },
    facts: {
      en: [
        'The Moon is tidally locked to Earth, rotating at the exact same rate it orbits, meaning the same face always points toward us.',
        'The dark smooth patches are "maria" (ancient basaltic lava plains), while the bright rugged terrain is cratered highland crust.',
        'Human footprints left by Apollo astronauts will remain undisturbed for millions of years because there is no wind or water erosion.',
      ],
      hi: [
        'चंद्रमा का घूर्णन और परिक्रमा काल समान है, इसलिए हमें हमेशा इसका एक ही चेहरा दिखाई देता है।',
        'चंद्रमा के काले धब्बे वास्तव में प्राचीन लावा के मैदान (मारिया) हैं।',
        'अपोलो अंतरिक्ष यात्रियों के पैरों के निशान लाखों सालों तक ऐसे ही रहेंगे क्योंकि वहां हवा या बारिश नहीं होती।',
      ],
      pa: [
        'ਚੰਦਰਮਾ ਧਰਤੀ ਵੱਲ ਸਦਾ ਇੱਕੋ ਪਾਸਾ ਰੱਖਦਾ ਹੈ ਕਿਉਂਕਿ ਇਸਦਾ ਘੁੰਮਣ ਅਤੇ ਚੱਕਰ ਕੱਟਣ ਦਾ ਸਮਾਂ ਬਿਲਕੁਲ ਬਰਾਬਰ ਹੈ।',
        'ਚੰਨ ਦੇ ਕਾਲੇ ਦਾਗ ਦਰਅਸਲ ਪੁਰਾਣੇ ਜਵਾਲਾਮੁਖੀ ਲਾਵੇ ਦੇ ਮੈਦਾਨ ਹਨ।',
        'ਚੰਨ ਤੇ ਹਵਾ ਅਤੇ ਪਾਣੀ ਨਾ ਹੋਣ ਕਰਕੇ ਪੁਲਾੜ ਯਾਤਰੀਆਂ ਦੇ ਪੈਰਾਂ ਦੇ ਨਿਸ਼ਾਨ ਲੱਖਾਂ ਸਾਲਾਂ ਤੱਕ ਕਾਇਮ ਰਹਿਣਗੇ।',
      ],
    },
  },
  mars: {
    id: 'mars',
    name: {
      en: 'Mars (Ares)',
      hi: 'मंगल ग्रह (लाल ग्रह)',
      pa: 'ਮੰਗਲ ਗ੍ਰਹਿ (ਲਾਲ ਗ੍ਰਹਿ)',
    },
    type: {
      en: 'Terrestrial Planet (The Red Planet)',
      hi: 'स्थलीय ग्रह (रेड प्लैनेट)',
      pa: 'ਧਰਾਤਲੀ ਗ੍ਰਹਿ (ਲਾਲ ਗ੍ਰਹਿ)',
    },
    radiusKm: {
      en: '3,389.5 km (0.53 × Earth)',
      hi: '3,389.5 किमी (पृथ्वी का आधा)',
      pa: '3,389.5 ਕਿਮੀ (ਧਰਤੀ ਦਾ ਅੱਧਾ)',
    },
    surfaceTemp: {
      en: 'Average -63 °C (-140 °C to 20 °C)',
      hi: 'औसत -63 °C',
      pa: 'ਔਸਤ -63 °C',
    },
    orbitalPeriod: {
      en: '687 Earth Days (1.88 Earth Years)',
      hi: '687 दिन (1.88 वर्ष)',
      pa: '687 ਦਿਨ (1.88 ਸਾਲ)',
    },
    rotationPeriod: {
      en: '24h 37m 22s (1 Sol)',
      hi: '24 घंटे 37 मिनट',
      pa: '24 ਘੰਟੇ 37 ਮਿੰਟ',
    },
    distanceFromSun: {
      en: '227.9 Million km (1.52 AU)',
      hi: '22.79 करोड़ किमी (1.52 AU)',
      pa: '22.79 ਕਰੋੜ ਕਿਮੀ (1.52 AU)',
    },
    gravity: {
      en: '3.72 m/s² (38% of Earth gravity)',
      hi: '3.72 m/s² (पृथ्वी का 38%)',
      pa: '3.72 m/s² (ਧਰਤੀ ਦਾ 38%)',
    },
    summary: {
      en: 'Mars is a cold desert world with a thin carbon dioxide atmosphere. Its surface is rich in iron oxide (rust), giving it a signature red hue. It hosts the tallest volcano and deepest canyon in the Solar System.',
      hi: 'मंगल ग्रह पर लोहे की जंग (आयरन ऑक्साइड) होने के कारण यह लाल दिखता है। सौर मंडल का सबसे बड़ा ज्वालामुखी और सबसे गहरी घाटी यहीं स्थित हैं।',
      pa: 'ਮੰਗਲ ਗ੍ਰਹਿ ਦੀ ਮਿੱਟੀ ਵਿੱਚ ਲੋਹੇ ਦੇ ਜੰਗਾਲ ਕਾਰਨ ਇਹ ਲਾਲ ਰੰਗ ਦਾ ਦਿਸਦਾ ਹੈ। ਸੂਰਜੀ ਮੰਡਲ ਦਾ ਸਭ ਤੋਂ ਉੱਚਾ ਪਹਾੜ ਓਲੰਪਸ ਮੌਂਸ ਇੱਥੇ ਹੀ ਹੈ।',
    },
    facts: {
      en: [
        'Olympus Mons is a shield volcano standing 21.9 km high—nearly three times the height of Mount Everest.',
        'Valles Marineris is a colossal canyon system over 4,000 km long and up to 7 km deep, dwarfing Earth’s Grand Canyon.',
        'Mars has two tiny irregularly shaped moons named Phobos and Deimos, likely captured asteroids.',
      ],
      hi: [
        'ओलंपस मॉन्स माउंट एवरेस्ट से तीन गुना ऊंचा ज्वालामुखी है।',
        'वैलेस मेरिनेरिस 4,000 किमी लंबी घाटी है, जो ग्रैंड कैनियन से दस गुना बड़ी है।',
        'मंगल के दो छोटे चंद्रमा हैं: फोबोस और डीमोस।',
      ],
      pa: [
        'ਓਲੰਪਸ ਮੌਂਸ ਜਵਾਲਾਮੁਖੀ ਮਾਊਂਟ ਐਵਰੈਸਟ ਨਾਲੋਂ ਤਿੰਨ ਗੁਣਾ ਉੱਚਾ (22 ਕਿਲੋਮੀਟਰ) ਹੈ।',
        'ਵੈਲਸ ਮੈਰੀਨੇਰਿਸ 4000 ਕਿਲੋਮੀਟਰ ਲੰਬੀ ਵਿਸ਼ਾਲ ਘਾਟੀ ਹੈ।',
        'ਮੰਗਲ ਦੇ ਦੋ ਛੋਟੇ ਚੰਦਰਮਾ ਹਨ: ਫੋਬੋਸ ਅਤੇ ਡੀਮੋਸ।',
      ],
    },
  },
  jupiter: {
    id: 'jupiter',
    name: {
      en: 'Jupiter (Zeus)',
      hi: 'बृहस्पति (ग्रहराज गुरु)',
      pa: 'ਬ੍ਰਹਿਸਪਤੀ (ਗ੍ਰਹਿਆਂ ਦਾ ਰਾਜਾ)',
    },
    type: {
      en: 'Gas Giant (Largest Planet)',
      hi: 'गैस दानव (सबसे बड़ा ग्रह)',
      pa: 'ਗੈਸ ਦੈਂਤ (ਸਭ ਤੋਂ ਵੱਡਾ ਗ੍ਰਹਿ)',
    },
    radiusKm: {
      en: '69,911 km (11.0 × Earth radius)',
      hi: '69,911 किमी (11 गुना पृथ्वी)',
      pa: '69,911 ਕਿਮੀ (ਧਰਤੀ ਨਾਲੋਂ 11 ਗੁਣਾ)',
    },
    surfaceTemp: {
      en: '-110 °C at cloud tops (Core: 24,000 K)',
      hi: '-110 °C (बादलों की सतह)',
      pa: '-110 °C (ਬੱਦਲਾਂ ਦੀ ਸਤ੍ਹਾ)',
    },
    orbitalPeriod: {
      en: '11.86 Earth Years',
      hi: '11.86 वर्ष',
      pa: '11.86 ਸਾਲ',
    },
    rotationPeriod: {
      en: '9h 55m (Fastest planetary spin)',
      hi: '9 घंटे 55 मिनट (सबसे तेज)',
      pa: '9 ਘੰਟੇ 55 ਮਿੰਟ (ਸਭ ਤੋਂ ਤੇਜ਼ ਘੁੰਮਣ)',
    },
    distanceFromSun: {
      en: '778.5 Million km (5.20 AU)',
      hi: '77.85 करोड़ किमी (5.20 AU)',
      pa: '77.85 ਕਰੋੜ ਕਿਮੀ (5.20 AU)',
    },
    gravity: {
      en: '24.79 m/s² (2.53 × Earth gravity)',
      hi: '24.79 m/s² (पृथ्वी से 2.5 गुना)',
      pa: '24.79 m/s² (ਧਰਤੀ ਨਾਲੋਂ 2.5 ਗੁਣਾ)',
    },
    summary: {
      en: 'Jupiter is the colossus of our Solar System, possessing more than twice the mass of all other planets combined. Made primarily of hydrogen and helium, its stormy atmosphere is crowned by the Great Red Spot.',
      hi: 'बृहस्पति सौर मंडल का सबसे भारी और विशाल ग्रह है। इसके अंदर 1,300 पृथ्वी समा सकती हैं। इसका प्रसिद्ध "ग्रेट रेड स्पॉट" सदियों पुराना भयानक तूफान है।',
      pa: 'ਬ੍ਰਹਿਸਪਤੀ ਸੂਰਜੀ ਮੰਡਲ ਦਾ ਸਭ ਤੋਂ ਵੱਡਾ ਗ੍ਰਹਿ ਹੈ। ਇਸਦੇ ਅੰਦਰ 1300 ਧਰਤੀਆਂ ਸਮਾ ਸਕਦੀਆਂ ਹਨ। ਇਸਦਾ ਗ੍ਰੇਟ ਰੈੱਡ ਸਪੌਟ ਸੈਂਕੜੇ ਸਾਲਾਂ ਪੁਰਾਣਾ ਤੂਫ਼ਾਨ ਹੈ।',
    },
    facts: {
      en: [
        'The Great Red Spot is an anticyclonic storm larger than Earth that has been raging continuously for at least 350 years.',
        'Jupiter acts as a cosmic vacuum cleaner, its massive gravity deflecting or capturing comets and asteroids that might otherwise strike Earth.',
        'Jupiter has 95 recognized moons, including Ganymede (the largest moon in the Solar System, bigger than Mercury) and Europa (with a global ocean beneath ice).',
      ],
      hi: [
        'ग्रेट रेड स्पॉट पृथ्वी से बड़ा तूफान है जो कम से कम 350 वर्षों से लगातार चल रहा है।',
        'बृहस्पति अपनी विशाल गुरुत्वाकर्षण शक्ति से पृथ्वी को खतरनाक धूमकेतुओं से बचाता है।',
        'इसके 95 ज्ञात चंद्रमा हैं, जिनमें गैनीमीड सौर मंडल का सबसे बड़ा चंद्रमा है।',
      ],
      pa: [
        'ਗ੍ਰੇਟ ਰੈੱਡ ਸਪੌਟ ਧਰਤੀ ਤੋਂ ਵੀ ਵੱਡਾ ਇੱਕ ਚੱਕਰਵਾਤੀ ਤੂਫ਼ਾਨ ਹੈ ਜੋ 350 ਸਾਲਾਂ ਤੋਂ ਚੱਲ ਰਿਹਾ ਹੈ।',
        'ਬ੍ਰਹਿਸਪਤੀ ਧਰਤੀ ਨੂੰ ਖ਼ਤਰਨਾਕ ਉਲਕਾਪਿੰਡਾਂ ਤੋਂ ਬਚਾਉਣ ਲਈ ਢਾਲ ਦਾ ਕੰਮ ਕਰਦਾ ਹੈ।',
        'ਇਸਦੇ 95 ਚੰਦਰਮਾ ਹਨ, ਜਿਨ੍ਹਾਂ ਵਿੱਚੋਂ ਗੈਨੀਮੀਡ ਬੁੱਧ ਗ੍ਰਹਿ ਤੋਂ ਵੀ ਵੱਡਾ ਹੈ।',
      ],
    },
  },
  saturn: {
    id: 'saturn',
    name: {
      en: 'Saturn (Cronus)',
      hi: 'शनि ग्रह (छल्लों वाला ग्रह)',
      pa: 'ਸ਼ਨੀ ਗ੍ਰਹਿ (ਛੱਲਿਆਂ ਵਾਲਾ ਗ੍ਰਹਿ)',
    },
    type: {
      en: 'Gas Giant (Jewel of the Solar System)',
      hi: 'गैस दानव (वलय युक्त सुंदर ग्रह)',
      pa: 'ਗੈਸ ਦੈਂਤ (ਸਭ ਤੋਂ ਸੁੰਦਰ ਗ੍ਰਹਿ)',
    },
    radiusKm: {
      en: '58,232 km (9.14 × Earth)',
      hi: '58,232 किमी (पृथ्वी से 9 गुना)',
      pa: '58,232 ਕਿਮੀ (ਧਰਤੀ ਨਾਲੋਂ 9 ਗੁਣਾ)',
    },
    surfaceTemp: {
      en: '-140 °C (133 K)',
      hi: '-140 °C',
      pa: '-140 °C',
    },
    orbitalPeriod: {
      en: '29.45 Earth Years',
      hi: '29.45 वर्ष',
      pa: '29.45 ਸਾਲ',
    },
    rotationPeriod: {
      en: '10h 33m',
      hi: '10 घंटे 33 मिनट',
      pa: '10 ਘੰਟੇ 33 ਮਿੰਟ',
    },
    distanceFromSun: {
      en: '1.43 Billion km (9.58 AU)',
      hi: '1.43 अरब किमी (9.58 AU)',
      pa: '1.43 ਅਰਬ ਕਿਮੀ (9.58 AU)',
    },
    gravity: {
      en: '10.44 m/s² (1.06 × Earth gravity)',
      hi: '10.44 m/s²',
      pa: '10.44 m/s²',
    },
    summary: {
      en: 'Saturn is instantly recognized by its spectacular system of rings made of billions of icy rock fragments. It is the least dense planet in the Solar System, so light it would float in water.',
      hi: 'शनि अपने खूबसूरत चमकीले छल्लों के लिए मशहूर है जो बर्फ और चट्टानों के टुकड़ों से बने हैं। इसका घनत्व पानी से भी कम है, यानी यह पानी में तैर सकता है।',
      pa: 'ਸ਼ਨੀ ਆਪਣੇ ਚਮਕੀਲੇ ਛੱਲਿਆਂ ਕਾਰਨ ਜਾਣਿਆ ਜਾਂਦਾ ਹੈ ਜੋ ਬਰਫ਼ ਅਤੇ ਪੱਥਰਾਂ ਦੇ ਬਣੇ ਹਨ। ਇਸਦੀ ਘਣਤਾ ਪਾਣੀ ਨਾਲੋਂ ਵੀ ਘੱਟ ਹੈ, ਜੇ ਪਾਣੀ ਦਾ ਵੱਡਾ ਸਮੁੰਦਰ ਹੋਵੇ ਤਾਂ ਸ਼ਨੀ ਤੈਰ ਜਾਵੇਗਾ।',
    },
    facts: {
      en: [
        'Saturn’s rings span 282,000 km across, yet they are paper-thin—averaging only about 10 meters in thickness.',
        'Saturn has 146 confirmed moons, the most of any planet; its giant moon Titan has a thick nitrogen atmosphere and lakes of liquid methane.',
        'A persistent hexagonal atmospheric cloud pattern spins at Saturn’s north pole.',
      ],
      hi: [
        'शनि के छल्ले 282,000 किमी चौड़े हैं, लेकिन उनकी मोटाई औसतन सिर्फ 10 मीटर है।',
        'शनि के पास 146 चंद्रमा हैं। इसके चंद्रमा टाइटन पर तरल मीथेन की झीलें हैं।',
        'शनि के उत्तरी ध्रुव पर एक अजीबोगरीब छह कोनों वाला (षट्कोणीय) तूफान घूमता है।',
      ],
      pa: [
        'ਸ਼ਨੀ ਦੇ ਛੱਲੇ 282,000 ਕਿਲੋਮੀਟਰ ਚੌੜੇ ਹਨ ਪਰ ਇਹਨਾਂ ਦੀ ਮੋਟਾਈ ਸਿਰਫ਼ 10 ਮੀਟਰ ਦੇ ਕਰੀਬ ਹੈ।',
        'ਸ਼ਨੀ ਦੇ 146 ਚੰਦਰਮਾ ਹਨ। ਟਾਈਟਨ ਚੰਦਰਮਾ ਤੇ ਮੀਥੇਨ ਗੈਸ ਦੀਆਂ ਤਰਲ ਝੀਲਾਂ ਮੌਜੂਦ ਹਨ।',
        'ਸ਼ਨੀ ਦੇ ਉੱਤਰੀ ਧਰੁਵ ਤੇ ਛੇ ਕੋਨਿਆਂ ਵਾਲਾ (ਹੈਕਸਾਗਨ) ਤੂਫ਼ਾਨ ਘੁੰਮਦਾ ਹੈ।',
      ],
    },
  },
  uranus: {
    id: 'uranus',
    name: {
      en: 'Uranus (Caelus)',
      hi: 'अरुण ग्रह (यूरेनस)',
      pa: 'ਯੂਰੇਨਸ (ਅਰੁਣ ਗ੍ਰਹਿ)',
    },
    type: {
      en: 'Ice Giant (Tilted World)',
      hi: 'बर्फ दानव (झुका हुआ ग्रह)',
      pa: 'ਬਰਫ਼ੀਲਾ ਦੈਂਤ (ਲੰਮਾ ਪਿਆ ਗ੍ਰਹਿ)',
    },
    radiusKm: {
      en: '25,362 km (4.0 × Earth)',
      hi: '25,362 किमी (पृथ्वी से 4 गुना)',
      pa: '25,362 ਕਿਮੀ (ਧਰਤੀ ਨਾਲੋਂ 4 ਗੁਣਾ)',
    },
    surfaceTemp: {
      en: '-224 °C (49 K) - Coldest atmosphere',
      hi: '-224 °C (सौर मंडल का सबसे ठंडा वातावरण)',
      pa: '-224 °C (ਸਭ ਤੋਂ ਠੰਡਾ ਵਾਯੂਮੰਡਲ)',
    },
    orbitalPeriod: {
      en: '84.0 Earth Years',
      hi: '84 वर्ष',
      pa: '84 ਸਾਲ',
    },
    rotationPeriod: {
      en: '17h 14m (Retrograde, 97.77° tilt)',
      hi: '17 घंटे 14 मिनट (98° झुकाव)',
      pa: '17 ਘੰਟੇ 14 ਮਿੰਟ (98° ਝੁਕਿਆ)',
    },
    distanceFromSun: {
      en: '2.87 Billion km (19.2 AU)',
      hi: '2.87 अरब किमी (19.2 AU)',
      pa: '2.87 ਅਰਬ ਕਿਮੀ (19.2 AU)',
    },
    gravity: {
      en: '8.87 m/s² (90% of Earth gravity)',
      hi: '8.87 m/s²',
      pa: '8.87 m/s²',
    },
    summary: {
      en: 'Uranus is an ice giant with a pale cyan-blue color caused by atmospheric methane absorbing red light. It uniquely orbits rolling on its side with an extreme 98° axial tilt.',
      hi: 'यूरेनस एक ठंडा बर्फीला ग्रह है। इसकी धुरी 98 डिग्री तक झुकी हुई है, जिसके कारण यह कक्षा में गेंद की तरह लुढ़कते हुए चक्कर लगाता है।',
      pa: 'ਯੂਰੇਨਸ ਇੱਕ ਠੰਡਾ ਬਰਫ਼ੀਲਾ ਗ੍ਰਹਿ ਹੈ। ਇਸਦੀ ਧੁਰੀ 98 ਡਿਗਰੀ ਝੁਕੀ ਹੋਈ ਹੈ, ਜਿਸ ਕਰਕੇ ਇਹ ਸੂਰਜ ਦੁਆਲੇ ਗੇਂਦ ਵਾਂਗ ਰਿੜ੍ਹਦਾ ਹੋਇਆ ਘੁੰਮਦਾ ਹੈ।',
    },
    facts: {
      en: [
        'Uranus was the first planet discovered using a modern telescope, spotted by William Herschel in 1781.',
        'Because of its 98° tilt, each pole experiences 42 years of continuous sunlight followed by 42 years of darkness.',
        'Uranus has 13 faint, dark rings and 28 known moons named after characters created by William Shakespeare and Alexander Pope.',
      ],
      hi: [
        'यूरेनस आधुनिक दूरबीन द्वारा खोजा जाने वाला पहला ग्रह था (विलियम हर्शल, 1781)।',
        'इसके 98° झुकाव के कारण यहां के ध्रुवों पर 42 साल लगातार दिन और 42 साल लगातार रात रहती है।',
        'इसके चंद्रमाओं के नाम शेक्सपियर के नाटकों के पात्रों पर रखे गए हैं।',
      ],
      pa: [
        'ਯੂਰੇਨਸ ਦੂਰਬੀਨ ਨਾਲ ਖੋਜਿਆ ਜਾਣ ਵਾਲਾ ਪਹਿਲਾ ਗ੍ਰਹਿ ਸੀ (1781 ਵਿੱਚ ਵਿਲੀਅਮ ਹਰਸ਼ਲ ਦੁਆਰਾ)।',
        'ਇਸਦੇ 98° ਝੁਕਾਅ ਕਾਰਨ ਇਸਦੇ ਧਰੁਵਾਂ ਤੇ 42 ਸਾਲ ਲਗਾਤਾਰ ਦਿਨ ਅਤੇ 42 ਸਾਲ ਲਗਾਤਾਰ ਰਾਤ ਰਹਿੰਦੀ ਹੈ।',
        'ਇਸਦੇ 28 ਚੰਦਰਮਾ ਹਨ ਜਿਨ੍ਹਾਂ ਦੇ ਨਾਮ ਸ਼ੈਕਸਪੀਅਰ ਦੇ ਪਾਤਰਾਂ ਤੇ ਰੱਖੇ ਗਏ ਹਨ।',
      ],
    },
  },
  neptune: {
    id: 'neptune',
    name: {
      en: 'Neptune (Poseidon)',
      hi: 'वरुण ग्रह (नेपच्यून)',
      pa: 'ਨੈਪਚਿਊਨ (ਵਰੁਣ ਗ੍ਰਹਿ)',
    },
    type: {
      en: 'Ice Giant (Windiest Planet)',
      hi: 'बर्फ दानव (सबसे तूफानी ग्रह)',
      pa: 'ਬਰਫ਼ੀਲਾ ਦੈਂਤ (ਸਭ ਤੋਂ ਤੇਜ਼ ਹਵਾਵਾਂ ਵਾਲਾ ਗ੍ਰਹਿ)',
    },
    radiusKm: {
      en: '24,622 km (3.86 × Earth)',
      hi: '24,622 किमी',
      pa: '24,622 ਕਿਮੀ',
    },
    surfaceTemp: {
      en: '-214 °C (59 K)',
      hi: '-214 °C',
      pa: '-214 °C',
    },
    orbitalPeriod: {
      en: '164.8 Earth Years',
      hi: '164.8 वर्ष',
      pa: '164.8 ਸਾਲ',
    },
    rotationPeriod: {
      en: '16h 06m',
      hi: '16 घंटे 6 मिनट',
      pa: '16 ਘੰਟੇ 6 ਮਿੰਟ',
    },
    distanceFromSun: {
      en: '4.50 Billion km (30.07 AU)',
      hi: '4.5 अरब किमी (30 AU)',
      pa: '4.5 ਅਰਬ ਕਿਮੀ (30 AU)',
    },
    gravity: {
      en: '11.15 m/s² (1.14 × Earth gravity)',
      hi: '11.15 m/s²',
      pa: '11.15 m/s²',
    },
    summary: {
      en: 'Neptune is the eighth and farthest known major planet from the Sun. An intense azure-blue ice giant, it whips up the fastest supersonic winds in the Solar System, exceeding 2,100 km/h.',
      hi: 'नेपच्यून सौर मंडल का सबसे दूर स्थित ग्रह है। यह गहरा नीला ग्रह है जहां सौर मंडल की सबसे तेज आंधी चलती है (2,100 किमी/घंटा)।',
      pa: 'ਨੈਪਚਿਊਨ ਸੂਰਜ ਤੋਂ ਸਭ ਤੋਂ ਦੂਰ ਸਥਿਤ ਅੱਠਵਾਂ ਗ੍ਰਹਿ ਹੈ। ਇਸ ਗੂੜ੍ਹੇ ਨੀਲੇ ਗ੍ਰਹਿ ਤੇ ਪੂਰੇ ਸੂਰਜੀ ਮੰਡਲ ਦੀਆਂ ਸਭ ਤੋਂ ਤੇਜ਼ ਹਵਾਵਾਂ (2100 ਕਿਮੀ/ਘੰਟਾ) ਚੱਲਦੀਆਂ ਹਨ।',
    },
    facts: {
      en: [
        'Neptune was discovered through mathematical prediction rather than empirical observation when perturbations in Uranus’s orbit revealed its location in 1846.',
        'Winds in Neptune’s dynamic atmosphere can reach supersonic speeds of 2,160 km/h (1,340 mph)—faster than the speed of sound on Earth.',
        'Its largest moon Triton orbits backwards (retrograde) and shoots liquid nitrogen cryovolcanic geysers 8 km into space.',
      ],
      hi: [
        'नेपच्यून को गणितीय गणनाओं द्वारा पहले ही खोज लिया गया था, बाद में दूरबीन से देखा गया।',
        'यहां हवा की गति 2,160 किमी/घंटा तक पहुंच सकती है, जो ध्वनि की गति से भी तेज है।',
        'इसके चंद्रमा ट्राइटन पर नाइट्रोजन गैस के बर्फीले फव्वारे (गीजर) फूटते हैं।',
      ],
      pa: [
        'ਨੈਪਚਿਊਨ ਨੂੰ ਪਹਿਲਾਂ ਗਣਿਤ ਦੇ ਫਾਰਮੂਲਿਆਂ ਨਾਲ ਲੱਭਿਆ ਗਿਆ ਸੀ, ਬਾਅਦ ਵਿੱਚ ਦੂਰਬੀਨ ਨਾਲ ਪੁਸ਼ਟੀ ਹੋਈ।',
        'ਇੱਥੇ ਹਵਾਵਾਂ ਦੀ ਰਫ਼ਤਾਰ ਆਵਾਜ਼ ਦੀ ਗਤੀ ਤੋਂ ਵੀ ਤੇਜ਼ (2,160 ਕਿਮੀ/ਘੰਟਾ) ਹੋ ਜਾਂਦੀ ਹੈ।',
        'ਇਸਦਾ ਵੱਡਾ ਚੰਨ ਟ੍ਰਾਈਟਨ ਉਲਟੀ ਦਿਸ਼ਾ ਵਿੱਚ ਘੁੰਮਦਾ ਹੈ ਅਤੇ ਉਸ ਤੇ ਨਾਈਟ੍ਰੋਜਨ ਦੇ ਬਰਫ਼ੀਲੇ ਫੁਹਾਰੇ ਚੱਲਦੇ ਹਨ।',
      ],
    },
  },
  polaris: {
    id: 'polaris',
    name: {
      en: 'Polaris (The North Star)',
      hi: 'ध्रुव तारा (पोलारिस)',
      pa: 'ਧਰੁਵ ਤਾਰਾ (ਉੱਤਰੀ ਤਾਰਾ)',
    },
    type: {
      en: 'Yellow Supergiant Star & Celestial Anchor',
      hi: 'पीला महादानव तारा (दिशा सूचक तारा)',
      pa: 'ਪੀਲਾ ਮਹਾਦੈਂਤ ਤਾਰਾ (ਉੱਤਰ ਦਿਸ਼ਾ ਦਾ ਰਾਹਬਰ)',
    },
    radiusKm: {
      en: '37.5 × Sun radius (~26 Million km)',
      hi: 'सूर्य से 37.5 गुना बड़ा',
      pa: 'ਸੂਰਜ ਨਾਲੋਂ 37.5 ਗੁਣਾ ਵੱਡਾ',
    },
    surfaceTemp: {
      en: '6,015 K',
      hi: '6,015 K',
      pa: '6,015 K',
    },
    orbitalPeriod: {
      en: 'Tri-star multiple system (Polaris Aa, Ab, B)',
      hi: 'त्रि-तारा प्रणाली',
      pa: 'ਤਿੰਨ ਤਾਰਿਆਂ ਦੀ ਪ੍ਰਣਾਲੀ',
    },
    rotationPeriod: {
      en: '119 days',
      hi: '119 दिन',
      pa: '119 ਦਿਨ',
    },
    distanceFromSun: {
      en: '433 Light Years (4.1 Quadrillion km)',
      hi: '433 प्रकाश वर्ष',
      pa: '433 ਪ੍ਰਕਾਸ਼ ਸਾਲ',
    },
    gravity: {
      en: 'Mass ~5.4 × Sun',
      hi: 'द्रव्यमान सूर्य से 5.4 गुना',
      pa: 'ਪੁੰਜ ਸੂਰਜ ਨਾਲੋਂ 5.4 ਗੁਣਾ',
    },
    summary: {
      en: 'Polaris is aligned almost exactly with Earth’s northern rotational axis. Because Earth spins beneath it, Polaris remains practically stationary in the night sky, acting as a navigational beacon for sailors and astronomers for millennia.',
      hi: 'ध्रुव तारा पृथ्वी की उत्तरी धुरी के बिल्कुल सीध में स्थित है। पृथ्वी के घूमने के बावजूद यह आकाश में स्थिर नजर आता है, इसलिए सदियों से नाविक इसका उपयोग उत्तर दिशा जानने के लिए करते रहे हैं।',
      pa: 'ਧਰੁਵ ਤਾਰਾ ਧਰਤੀ ਦੇ ਉੱਤਰੀ ਧਰੁਵ ਦੀ ਸੇਧ ਵਿੱਚ ਹੈ। ਧਰਤੀ ਦੇ ਘੁੰਮਣ ਦੇ ਬਾਵਜੂਦ ਇਹ ਰਾਤ ਨੂੰ ਅਸਮਾਨ ਵਿੱਚ ਇੱਕੋ ਥਾਂ ਟਿਕਿਆ ਰਹਿੰਦਾ ਹੈ, ਇਸੇ ਕਰਕੇ ਸਦੀਆਂ ਤੋਂ ਰਾਹੀ ਉੱਤਰ ਦਿਸ਼ਾ ਪਛਾਨਣ ਲਈ ਇਸਦੀ ਵਰਤੋਂ ਕਰਦੇ ਰਹੇ ਹਨ।',
    },
    facts: {
      en: [
        'Polaris is not a single star, but a triple star system: a central Cepheid variable supergiant with two smaller companion stars.',
        'Due to the precession of Earth’s equinoxes (axial wobble over 26,000 years), Polaris will not always be the pole star—in 12,000 years, brilliant Vega will take its place.',
        'You can easily locate Polaris by following the "pointer stars" Merak and Dubhe in the bowl of the Big Dipper (Ursa Major).',
      ],
      hi: [
        'ध्रुव तारा अकेला नहीं है, बल्कि तीन तारों की एक प्रणाली है।',
        'पृथ्वी की धुरी के धीमे झुकाव (26,000 वर्ष चक्र) के कारण 12,000 साल बाद वेगा तारा हमारा ध्रुव तारा बनेगा।',
        'सप्तऋषि (बिग डिपर) के आगे के दो तारों की सीध में देखने पर ध्रुव तारा आसानी से मिल जाता है।',
      ],
      pa: [
        'ਧਰੁਵ ਤਾਰਾ ਇਕੱਲਾ ਨਹੀਂ ਬਲਕਿ ਤਿੰਨ ਤਾਰਿਆਂ ਦਾ ਇਕੱਠ ਹੈ।',
        'ਧਰਤੀ ਦੇ ਧੁਰੇ ਦੇ ਚੱਕਰ ਕਾਰਨ 12,000 ਸਾਲ ਬਾਅਦ ਵੇਗਾ ਤਾਰਾ ਸਾਡਾ ਧਰੁਵ ਤਾਰਾ ਬਣੇਗਾ।',
        'ਸਪਤ ਰਿਸ਼ੀ (ਵੱਡਾ ਚਮਚਾ) ਤਾਰਾਮੰਡਲ ਦੇ ਦੋ ਮੋਹਰੀ ਤਾਰਿਆਂ ਦੀ ਸੇਧ ਵਿੱਚ ਦੇਖ ਕੇ ਧਰੁਵ ਤਾਰੇ ਨੂੰ ਆਸਾਨੀ ਨਾਲ ਲੱਭਿਆ ਜਾ ਸਕਦਾ ਹੈ।',
      ],
    },
  },
  milkyway: {
    id: 'milkyway',
    name: {
      en: 'Milky Way Core & Sagittarius A*',
      hi: 'आकाशगंगा केंद्र एवं सुपरमैसिव ब्लैक होल',
      pa: 'ਮਿਲਕੀ ਵੇਅ ਕੋਰ ਅਤੇ ਵਿਸ਼ਾਲ ਬਲੈਕ ਹੋਲ',
    },
    type: {
      en: 'Galactic Center & Supermassive Black Hole',
      hi: 'गैलेक्टिक केंद्र एवं विशाल कृष्ण विवर',
      pa: 'ਗਲੈਕਸੀ ਕੇਂਦਰ ਅਤੇ ਮਹਾ-ਵਿਸ਼ਾਲ ਬਲੈਕ ਹੋਲ',
    },
    radiusKm: {
      en: 'Sagittarius A* Event Horizon: ~12 Million km',
      hi: 'इवेंट होराइजन: ~1.2 करोड़ किमी',
      pa: 'ਇਵੈਂਟ ਹੋਰਾਈਜ਼ਨ: ~1.2 ਕਰੋੜ ਕਿਮੀ',
    },
    surfaceTemp: {
      en: 'Accretion Disk: Millions of Kelvin',
      hi: 'लाखों केल्विन (गैस डिस्क)',
      pa: 'ਲੱਖਾਂ ਕੈਲਵਿਨ (ਗੈਸ ਡਿਸਕ)',
    },
    orbitalPeriod: {
      en: 'Milky Way rotation: ~230 Myr per lap',
      hi: '~23 करोड़ वर्ष',
      pa: '~23 ਕਰੋੜ ਸਾਲ',
    },
    rotationPeriod: {
      en: 'Spin parameter a ~ 0.9 (Near speed of light)',
      hi: 'लगभग प्रकाश की गति से घूर्णन',
      pa: 'ਲਗਭਗ ਪ੍ਰਕਾਸ਼ ਦੀ ਗਤੀ ਤੇ ਘੁੰਮਣਾ',
    },
    distanceFromSun: {
      en: '26,670 Light Years (~250 Quadrillion km)',
      hi: '26,670 प्रकाश वर्ष',
      pa: '26,670 ਪ੍ਰਕਾਸ਼ ਸਾਲ',
    },
    gravity: {
      en: 'Mass = 4.15 Million Suns (8.2 × 10³⁶ kg)',
      hi: 'द्रव्यमान: 41.5 लाख सूर्यों के बराबर',
      pa: 'ਪੁੰਜ: 41.5 ਲੱਖ ਸੂਰਜਾਂ ਦੇ ਬਰਾਬਰ',
    },
    summary: {
      en: 'At the heart of our Milky Way galaxy lies Sagittarius A*, a supermassive black hole with 4.15 million times the mass of our Sun. Its crushing gravitational well anchors over 200 billion stars in cosmic orbital balance.',
      hi: 'हमारी आकाशगंगा के केंद्र में सैजिटेरियस A* नाम का एक सुपरमैसिव ब्लैक होल स्थित है, जिसका द्रव्यमान 41.5 लाख सूर्यों के बराबर है। यह 200 अरब से अधिक तारों को अपनी कक्षा में बांधे रखता है।',
      pa: 'ਸਾਡੀ ਮਿਲਕੀ ਵੇਅ ਗਲੈਕਸੀ ਦੇ ਕੇਂਦਰ ਵਿੱਚ ਇੱਕ ਅਤਿ ਵਿਸ਼ਾਲ ਬਲੈਕ ਹੋਲ ਹੈ ਜਿਸਦਾ ਪੁੰਜ 41.5 ਲੱਖ ਸੂਰਜਾਂ ਦੇ ਬਰਾਬਰ ਹੈ। ਇਹ 200 ਅਰਬ ਤੋਂ ਵੱਧ ਤਾਰਿਆਂ ਨੂੰ ਆਪਣੇ ਗੁਰੂਤਾਕਰਸ਼ਣ ਵਿੱਚ ਬੰਨ੍ਹ ਕੇ ਰੱਖਦਾ ਹੈ।',
    },
    facts: {
      en: [
        'A black hole’s gravity is so intense that nothing—not even light itself—can escape past its boundary, known as the Event Horizon.',
        'The Event Horizon Telescope (EHT) captured the direct shadow image of Sagittarius A* in 2022, confirming Einstein’s General Theory of Relativity.',
        'Stars near the galactic center (the S-stars) whip around the black hole at breakneck speeds up to 24 million km/h (8% speed of light).',
      ],
      hi: [
        'ब्लैक होल का गुरुत्वाकर्षण इतना प्रचंड होता है कि प्रकाश भी इससे बचकर बाहर नहीं निकल सकता।',
        '2022 में इवेंट होराइजन टेलीस्कोप ने सैजिटेरियस A* की पहली ऐतिहासिक तस्वीर खींचकर आइंस्टीन के सापेक्षता सिद्धांत को साबित किया।',
        'ब्लैक होल के पास के तारे प्रकाश की गति के 8% की रफ्तार से इसके चक्कर लगाते हैं।',
      ],
      pa: [
        'ਬਲੈਕ ਹੋਲ ਦਾ ਗੁਰੂਤਾਕਰਸ਼ਣ ਇੰਨਾ ਜ਼ਬਰਦਸਤ ਹੁੰਦਾ ਹੈ ਕਿ ਰੌਸ਼ਨੀ ਵੀ ਇਸਦੇ ਅੰਦਰੋਂ ਬਾਹਰ ਨਹੀਂ ਨਿਕਲ ਸਕਦੀ।',
        'ਸਾਲ 2022 ਵਿੱਚ ਵਿਸ਼ਵ ਦੇ ਵਿਗਿਆਨੀਆਂ ਨੇ ਇਸ ਬਲੈਕ ਹੋਲ ਦੀ ਅਸਲ ਤਸਵੀਰ ਖਿੱਚ ਕੇ ਇਤਿਹਾਸ ਰਚਿਆ ਸੀ।',
        'ਇਸਦੇ ਨੇੜਲੇ ਤਾਰੇ ਲਗਭਗ 2.4 ਕਰੋੜ ਕਿਲੋਮੀਟਰ ਪ੍ਰਤੀ ਘੰਟਾ ਦੀ ਅਥਾਹ ਰਫ਼ਤਾਰ ਨਾਲ ਇਸ ਦੁਆਲੇ ਚੱਕਰ ਕੱਟਦੇ ਹਨ।',
      ],
    },
  },
  eclipse: {
    id: 'eclipse',
    name: {
      en: 'Orbital Syzygy & Eclipses',
      hi: 'खगोलीय युति एवं ग्रहण (सूर्य व चंद्र ग्रहण)',
      pa: 'ਖਗੋਲੀ ਸੰਯੋਗ ਅਤੇ ਗ੍ਰਹਿਣ (ਸੂਰਜ ਤੇ ਚੰਨ ਗ੍ਰਹਿਣ)',
    },
    type: {
      en: 'Cosmic Shadow Alignment (Syzygy)',
      hi: 'छाया संरेखण परिघटना',
      pa: 'ਪ੍ਰਛਾਵਾਂ ਸੰਯੋਜਨ ਵਰਤਾਰਾ',
    },
    radiusKm: {
      en: 'Umbra cone diameter ~100-250 km on Earth',
      hi: 'छाया शंकु ~100-250 किमी',
      pa: 'ਪ੍ਰਛਾਵਾਂ ਚੱਕਰ ~100-250 ਕਿਮੀ',
    },
    surfaceTemp: {
      en: 'Corona visible at 1,000,000 K during Totality',
      hi: 'पूर्ण ग्रहण में कोरोना का तापमान 10 लाख K',
      pa: 'ਪੂਰਨ ਗ੍ਰਹਿਣ ਵੇਲੇ ਕੋਰੋਨਾ ਦਾ ਤਾਪਮਾਨ 10 ਲੱਖ K',
    },
    orbitalPeriod: {
      en: 'Saros Cycle: 18 years, 11 days, 8 hours',
      hi: 'सरोस चक्र: 18 वर्ष 11 दिन',
      pa: 'ਸਾਰੋਸ ਚੱਕਰ: 18 ਸਾਲ 11 ਦਿਨ',
    },
    rotationPeriod: {
      en: 'N/A (Geometric alignment)',
      hi: 'लागू नहीं',
      pa: 'ਲਾਗੂ ਨਹੀਂ',
    },
    distanceFromSun: {
      en: 'Sun-Moon-Earth colinear axis',
      hi: 'सूर्य-चंद्रमा-पृथ्वी एक सीध में',
      pa: 'ਸੂਰਜ-ਚੰਨ-ਧਰਤੀ ਇੱਕ ਸੇਧ ਵਿੱਚ',
    },
    gravity: {
      en: 'Combined tidal pull creates spring tides',
      hi: 'संयुक्त ज्वारीय बल (वृहत् ज्वार)',
      pa: 'ਸਾਂਝਾ ਖਿੱਚ ਬਲ (ਵੱਡਾ ਜਵਾਰ-ਭਾਟਾ)',
    },
    summary: {
      en: 'An eclipse is an awe-inspiring celestial phenomenon that occurs when three astronomical bodies line up in a straight line (syzygy). In a Solar Eclipse, the Moon occults the Sun; in a Lunar Eclipse, Earth casts its shadow onto the Moon.',
      hi: 'ग्रहण तब होता है जब सूर्य, पृथ्वी और चंद्रमा एक सीधी रेखा में आ जाते हैं। सूर्य ग्रहण में चंद्रमा सूर्य को ढक लेता है, जबकि चंद्र ग्रहण में पृथ्वी की छाया चंद्रमा पर पड़ती है।',
      pa: 'ਗ੍ਰਹਿਣ ਉਸ ਵੇਲੇ ਲੱਗਦਾ ਹੈ ਜਦੋਂ ਸੂਰਜ, ਚੰਨ ਅਤੇ ਧਰਤੀ ਇੱਕ ਸਿੱਧੀ ਲਾਈਨ ਵਿੱਚ ਆ ਜਾਂਦੇ ਹਨ। ਸੂਰਜ ਗ੍ਰਹਿਣ ਵੇਲੇ ਚੰਨ ਸੂਰਜ ਨੂੰ ਢੱਕ ਲੈਂਦਾ ਹੈ, ਅਤੇ ਚੰਨ ਗ੍ਰਹਿਣ ਵੇਲੇ ਧਰਤੀ ਦਾ ਪ੍ਰਛਾਵਾਂ ਚੰਨ ਤੇ ਪੈਂਦਾ ਹੈ।',
    },
    facts: {
      en: [
        'By astonishing coincidence, the Sun is 400 times larger than the Moon, but also 400 times farther away, giving them virtually identical angular sizes (~0.5°) in our sky.',
        'Because the Moon’s orbit is tilted 5.14° relative to Earth’s orbit around the Sun, eclipses do not occur every month—only when the Moon crosses the ecliptic nodes.',
        'During a Total Lunar Eclipse, Rayleigh scattering filters blue light out, painting the Moon in deep sunset copper-red—a "Blood Moon".',
      ],
      hi: [
        'अद्भुत संयोग: सूर्य चंद्रमा से 400 गुना बड़ा है, लेकिन वह चंद्रमा से 400 गुना दूर भी है, जिससे दोनों आकाश में एक ही आकार के दिखते हैं।',
        'चंद्रमा की कक्षा 5° झुकी होने के कारण हर अमावस्या या पूर्णिमा को ग्रहण नहीं लगता।',
        'चंद्र ग्रहण के समय पृथ्वी के वायुमंडल से छनकर लाल रोशनी चंद्रमा पर पड़ती है, जिसे "ब्लड मून" कहते हैं।',
      ],
      pa: [
        'ਕੁਦਰਤ ਦਾ ਅਦਭੁਤ ਸੰਯੋਗ: ਸੂਰਜ ਚੰਦਰਮਾ ਨਾਲੋਂ 400 ਗੁਣਾ ਵੱਡਾ ਹੈ, ਪਰ ਉਹ 400 ਗੁਣਾ ਦੂਰ ਵੀ ਹੈ, ਇਸ ਕਰਕੇ ਅਸਮਾਨ ਵਿੱਚ ਦੋਵੇਂ ਇੱਕੋ ਆਕਾਰ ਦੇ ਦਿਸਦੇ ਹਨ।',
        'ਚੰਦਰਮਾ ਦਾ ਔਰਬਿਟ 5.14° ਝੁਕਿਆ ਹੋਣ ਕਾਰਨ ਹਰ ਮਹੀਨੇ ਗ੍ਰਹਿਣ ਨਹੀਂ ਲੱਗਦਾ।',
        'ਚੰਨ ਗ੍ਰਹਿਣ ਵੇਲੇ ਧਰਤੀ ਦੇ ਵਾਯੂਮੰਡਲ ਵਿੱਚੋਂ ਛਣ ਕੇ ਲਾਲ ਰੰਗ ਚੰਨ ਤੇ ਪੈਂਦਾ ਹੈ, ਜਿਸਨੂੰ "ਬਲੱਡ ਮੂਨ" (ਖ਼ੂਨੀ ਚੰਨ) ਕਿਹਾ ਜਾਂਦਾ ਹੈ।',
      ],
    },
  },
};

export function calculateMoonPhase(
  earthAngle: number,
  moonAngle: number,
  moonInclinationY: number = 0
): MoonPhaseData {
  let diff = (moonAngle - earthAngle) % (Math.PI * 2);
  if (diff < 0) diff += Math.PI * 2;

  const phaseAngleDeg = (diff * 180) / Math.PI;
  const illuminationFraction = (1 - Math.cos(diff)) / 2;
  const cycleDay = (diff / (Math.PI * 2)) * 29.53;

  let phaseName: { en: string; hi: string; pa: string } = {
    en: 'New Moon',
    hi: 'अमावस्या (नया चांद)',
    pa: 'ਮੱਸਿਆ (ਨਵਾਂ ਚੰਨ)',
  };

  if (phaseAngleDeg >= 350 || phaseAngleDeg < 10) {
    phaseName = { en: 'New Moon', hi: 'अमावस्या (नया चांद)', pa: 'ਮੱਸਿਆ (ਨਵਾਂ ਚੰਨ)' };
  } else if (phaseAngleDeg >= 10 && phaseAngleDeg < 80) {
    phaseName = { en: 'Waxing Crescent', hi: 'शुक्ल पक्ष द्वितीया (बाल चंद्र)', pa: 'ਵੱਧਦਾ ਦੂਜ ਦਾ ਚੰਨ' };
  } else if (phaseAngleDeg >= 80 && phaseAngleDeg < 100) {
    phaseName = { en: 'First Quarter', hi: 'प्रथम चतुर्थांश (आधा चांद)', pa: 'ਪਹਿਲਾ ਚੌਥਾਈ (ਅੱਧਾ ਚੰਨ)' };
  } else if (phaseAngleDeg >= 100 && phaseAngleDeg < 170) {
    phaseName = { en: 'Waxing Gibbous', hi: 'शुक्ल पक्ष कुबड़ा चांद', pa: 'ਵੱਧਦਾ ਤਿੰਨ-ਚੌਥਾਈ ਚੰਨ' };
  } else if (phaseAngleDeg >= 170 && phaseAngleDeg < 190) {
    phaseName = { en: 'Full Moon', hi: 'पूर्णिमा (पूरा चांद)', pa: 'ਪੂਰਨਮਾਸ਼ੀ (ਪੂਰਾ ਚੰਨ)' };
  } else if (phaseAngleDeg >= 190 && phaseAngleDeg < 260) {
    phaseName = { en: 'Waning Gibbous', hi: 'कृष्ण पक्ष कुबड़ा चांद', pa: 'ਘਟਦਾ ਤਿੰਨ-ਚੌਥਾਈ ਚੰਨ' };
  } else if (phaseAngleDeg >= 260 && phaseAngleDeg < 280) {
    phaseName = { en: 'Third Quarter', hi: 'अंतिम चतुर्थांश (आधा चांद)', pa: 'ਆਖ਼ਰੀ ਚੌਥਾਈ (ਅੱਧਾ ਚੰਨ)' };
  } else {
    phaseName = { en: 'Waning Crescent', hi: 'कृष्ण पक्ष कृष्ण चंद्र', pa: 'ਘਟਦਾ ਆਖ਼ਰੀ ਚੰਨ' };
  }

  const isSyzygyNew = phaseAngleDeg <= 6 || phaseAngleDeg >= 354;
  const isSyzygyFull = Math.abs(phaseAngleDeg - 180) <= 6;
  const isNodeCrossing = Math.abs(moonInclinationY) < 0.65;

  const isSolarEclipse = isSyzygyNew && isNodeCrossing;
  const isLunarEclipse = isSyzygyFull && isNodeCrossing;

  return {
    phaseName,
    illuminationFraction,
    phaseAngleDeg,
    cycleDay,
    isSolarEclipse,
    isLunarEclipse,
  };
}
