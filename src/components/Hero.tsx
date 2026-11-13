import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../data/initialData';
import { createWhatsAppUrl } from '../utils/helpers';
import { 
  Award, 
  Music, 
  Wrench, 
  Sparkles, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();

  const handleConsultClick = () => {
    const msg = language === 'hi'
      ? "नमस्ते संतोष जी, मुझे नए वाद्य यंत्र खरीदने / मरम्मत करवाने हेतु परामर्श चाहिए।"
      : "Hello Santosh Ji, I would like consultation regarding purchasing an instrument or getting repair work done.";
    window.open(createWhatsAppUrl(BUSINESS_CONFIG.musicDivision.primaryWhatsApp, msg), '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-rosewood-950 text-cream-100 pt-10 pb-16 lg:py-20 border-b border-brass-600/30">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c69214_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brass-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-rosewood-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Layout */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Top Heritage Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rosewood-900/80 border border-brass-500/40 text-brass-300 text-xs sm:text-sm font-semibold tracking-wide shadow-gold-glow whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-brass-400" />
            <span>{t('heroBadge')}</span>
          </div>

          {/* Main Hero Headline - Balanced 2 Lines */}
          <h1 className="max-w-3xl mx-auto font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.25] text-balance">
            {language === 'hi' ? (
              <>
                जहाँ हर सुर में <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brass-300 via-brass-500 to-amber-200">
                  चार पीढ़ियों का विश्वास बसता है
                </span>
              </>
            ) : (
              <>
                Where Every Note Carries <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brass-300 via-brass-500 to-amber-200">
                  Four Generations of Trust
                </span>
              </>
            )}
          </h1>

          {/* Subheadline - Concise 2-line description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-cream-300/90 font-light leading-relaxed text-balance">
            {t('heroSubtitle')}
          </p>

          {/* Single Horizontal Row on Desktop: Proprietor Badge + 3 CTA Buttons */}
          <div className="pt-2 flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-3.5 flex-wrap">
            
            {/* Proprietor Identification Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-rosewood-900/90 border border-brass-500/40 text-xs text-brass-300 shadow-sm whitespace-nowrap">
              <Award className="w-4 h-4 text-brass-400 flex-shrink-0" />
              <span>
                <strong className="text-white font-medium">
                  {language === 'hi' ? 'संचालक:' : 'Proprietor:'}
                </strong>{' '}
                {BUSINESS_CONFIG.musicDivision.proprietorShort[language]}
              </span>
            </div>

            {/* CTA 1: Explore Instruments */}
            <a
              href="#instruments"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brass-600 to-brass-700 hover:from-brass-500 hover:to-brass-600 text-rosewood-950 font-bold text-xs sm:text-sm shadow-royal hover:shadow-gold-glow transition-all active:scale-95 whitespace-nowrap"
            >
              <Music className="w-4 h-4" />
              <span>{t('heroCtaStock')}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* CTA 2: View Repair Fees */}
            <a
              href="#repairs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rosewood-900 hover:bg-rosewood-800 text-cream-100 hover:text-white font-semibold text-xs sm:text-sm border border-brass-600/40 hover:border-brass-500/70 transition-all active:scale-95 shadow-sm whitespace-nowrap"
            >
              <Wrench className="w-4 h-4 text-brass-400" />
              <span>{t('heroCtaRepair')}</span>
            </a>

            {/* CTA 3: Call Santosh Ji */}
            <button
              onClick={handleConsultClick}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rosewood-800/90 hover:bg-rosewood-700 text-brass-300 hover:text-white font-medium text-xs sm:text-sm border border-rosewood-700 transition-all active:scale-95 whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>{t('heroCallNow')}</span>
            </button>

          </div>

          {/* Quick Assurance Micro-points */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-cream-300">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-brass-400" />
              <span>{language === 'hi' ? 'दुकान पर लाइव सुर परीक्षण' : 'In-store Live Pitch Tuning'}</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-brass-400" />
              <span>{language === 'hi' ? 'हस्तनिर्मित पूड़ी व रीड्स' : 'Handmade Skin Pudis & Reeds'}</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-brass-400" />
              <span>{language === 'hi' ? 'सोनार टोली, ज़मानिया कस्बा' : 'Sonar Toli, Zamania Kasba'}</span>
            </div>
          </div>

        </div>

        {/* 4 Feature Value Pillars */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-rosewood-900/70 border border-brass-600/25 hover:border-brass-500/50 transition-all shadow-royal">
            <div className="w-10 h-10 rounded-xl bg-brass-600/20 text-brass-400 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-1">
              {t('featGenerations')}
            </h3>
            <p className="text-xs text-cream-300/80">
              {t('featGenerationsSub')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rosewood-900/70 border border-brass-600/25 hover:border-brass-500/50 transition-all shadow-royal">
            <div className="w-10 h-10 rounded-xl bg-brass-600/20 text-brass-400 flex items-center justify-center mb-3">
              <Music className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-1">
              {t('featMusician')}
            </h3>
            <p className="text-xs text-cream-300/80">
              {t('featMusicianSub')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rosewood-900/70 border border-brass-600/25 hover:border-brass-500/50 transition-all shadow-royal">
            <div className="w-10 h-10 rounded-xl bg-brass-600/20 text-brass-400 flex items-center justify-center mb-3">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-1">
              {t('featFastRepair')}
            </h3>
            <p className="text-xs text-cream-300/80">
              {t('featFastRepairSub')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rosewood-900/70 border border-brass-600/25 hover:border-brass-500/50 transition-all shadow-royal">
            <div className="w-10 h-10 rounded-xl bg-brass-600/20 text-brass-400 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-1">
              {t('featAuthentic')}
            </h3>
            <p className="text-xs text-cream-300/80">
              {t('featAuthenticSub')}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
