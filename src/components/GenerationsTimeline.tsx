import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import type { GenerationInfo } from '../types';
import { 
  Sparkles, 
  Crown, 
  HeartHandshake, 
  UserCheck
} from 'lucide-react';

export const GenerationsTimeline: React.FC = () => {
  const { language, t } = useLanguage();
  const { generations, generationImages } = useData();

  return (
    <section id="legacy" className="py-20 bg-cream-100 relative overflow-hidden border-b border-brass-600/20">
      {/* Decorative background watermark */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brass-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rosewood-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brass-100 border border-brass-400/40 text-rosewood-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brass-700" />
            <span>{t('legacySectionBadge')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-rosewood-950">
            {t('legacySectionTitle')}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brass-500 to-transparent mx-auto mt-2" />

          <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed font-sans">
            {t('legacySectionSub')}
          </p>
        </div>

        {/* 4 Generation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {generations.map((gen, idx) => (
            <GenerationCard 
              key={gen.id} 
              gen={gen} 
              index={idx}
              customImage={generationImages[gen.id]}
            />
          ))}
        </div>

        {/* Honor Summary Callout */}
        <div className="mt-14 max-w-4xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-rosewood-900 via-rosewood-950 to-rosewood-900 text-cream-100 border border-brass-500/40 shadow-royal-lg text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-brass-600/30 border border-brass-400 mx-auto flex items-center justify-center">
            <Crown className="w-6 h-6 text-brass-300" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
            {language === 'hi' 
              ? 'आदर, निष्ठा और समर्पण की जीवित विरासत' 
              : 'A Living Heritage of Devotion, Sincerity & Acoustic Pureness'}
          </h3>
          <p className="text-xs sm:text-sm text-cream-300/90 max-w-2xl mx-auto leading-relaxed">
            {language === 'hi'
              ? 'गाज़ीपुर के ज़मानिया कस्बे में चार पीढ़ियों से सुरों की अखंड साधना जारी है। स्व. श्री जगन्नाथ मिस्त्री जी के नाम पर स्थापित यह प्रतिष्ठान आज भी शुद्धता और प्रामाणिकता की कसौटी पर अडिग है।'
              : 'For four unbroken generations in Zamania Kasba, Ghazipur, our family has nurtured the pure resonance of acoustic music. Named in eternal gratitude to Late Shree Jagannath Mistri, our craftsmanship endures with unmatched pride.'}
          </p>
        </div>

      </div>
    </section>
  );
};

interface GenerationCardProps {
  gen: GenerationInfo;
  index: number;
  customImage?: string;
}

const GenerationCard: React.FC<GenerationCardProps> = ({ gen, index, customImage }) => {
  const { language } = useLanguage();
  const [imageError, setImageError] = useState(false);

  // Active portrait image: either owner uploaded custom image, or default path
  const imageSrc = customImage || gen.defaultImage;

  // Heritage roman numerals
  const romanNumerals = ["I", "II", "III", "IV"];

  return (
    <div className="group relative bg-white rounded-3xl border-2 border-brass-300/40 hover:border-brass-500/70 p-6 sm:p-8 shadow-royal hover:shadow-royal-lg transition-all duration-300 flex flex-col justify-between">
      
      {/* Top corner roman badge */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream-200 border border-brass-400 text-rosewood-900 font-serif font-bold text-xs flex items-center justify-center shadow-inner">
        {romanNumerals[index] || gen.id}
      </div>

      <div>
        {/* Header: Generation Title & Name */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
          
          {/* Royal Gold-Framed Portrait Container */}
          <div className="relative flex-shrink-0">
            {/* Outer gold ornamental frame */}
            <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-2xl p-1 bg-gradient-to-b from-brass-300 via-brass-500 to-rosewood-700 shadow-royal overflow-hidden relative">
              <div className="w-full h-full rounded-xl overflow-hidden bg-rosewood-950 flex items-center justify-center relative">
                
                {/* Fallback silhouette / crest if image is not present or error */}
                {(!imageSrc || imageError) ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-b from-rosewood-900 to-rosewood-950">
                    <div className="w-12 h-12 rounded-full bg-brass-600/30 border border-brass-400/60 flex items-center justify-center mb-1 text-brass-300">
                      {gen.id === 1 ? <Crown className="w-6 h-6" /> : 
                       gen.id === 2 ? <HeartHandshake className="w-6 h-6" /> : 
                       gen.id === 3 ? <Sparkles className="w-6 h-6" /> : 
                       <UserCheck className="w-6 h-6" />}
                    </div>
                    <span className="text-[10px] text-brass-300 font-serif font-bold uppercase tracking-wider">
                      Gen {gen.id}
                    </span>
                    <span className="text-[9px] text-cream-300/80 line-clamp-1 mt-0.5">
                      {gen.personName[language].split(' ')[1] || 'Mistri'}
                    </span>
                  </div>
                ) : (
                  <img
                    src={imageSrc}
                    alt={gen.personName[language]}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Subtle gold sheen overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <span className="text-[9px] text-brass-300 font-bold tracking-widest px-1 py-0.5 bg-black/60 rounded backdrop-blur-xs">
                    {gen.generationTitle[language].split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle vintage medal corner */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-brass-600 text-rosewood-950 flex items-center justify-center border-2 border-white text-[10px] font-bold shadow">
              {gen.id}
            </div>
          </div>

          {/* Name, Title & Role */}
          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <span className="inline-block px-3 py-1 rounded-full bg-brass-100 text-rosewood-900 text-xs font-bold tracking-wide border border-brass-300/60">
              {gen.generationTitle[language]}
            </span>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-rosewood-950">
              {gen.personName[language]}
            </h3>

            <div className="text-xs font-semibold text-brass-700 flex items-center justify-center sm:justify-start gap-1">
              <Sparkles className="w-3 h-3 text-brass-600" />
              <span>{gen.badge[language]}</span>
            </div>
          </div>

        </div>

        {/* Generational Description Text */}
        <p className="text-charcoal text-sm leading-relaxed mb-6 font-normal">
          {gen.description[language]}
        </p>
      </div>

      {/* Specialties Tags */}
      <div className="pt-4 border-t border-cream-300/70">
        <span className="block text-[11px] font-bold text-charcoal-muted uppercase tracking-wider mb-2">
          {language === 'hi' ? 'विशेष दक्षता व योगदान' : 'Key Expertise & Contribution'}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {gen.specialties[language].map((spec, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg bg-cream-200/80 text-rosewood-900 text-xs font-medium border border-brass-300/30"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};
