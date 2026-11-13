import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../data/initialData';
import { createWhatsAppUrl } from '../utils/helpers';
import { 
  Armchair, 
  Phone, 
  MessageCircle, 
  Hammer, 
  TreePine, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

export const FurnitureSection: React.FC = () => {
  const { language, t } = useLanguage();
  const furniture = BUSINESS_CONFIG.furnitureDivision;

  const handleWhatsAppClick = () => {
    const msg = language === 'hi'
      ? "नमस्ते संजय जी, मैं 'जगन्नाथ फर्नीचर विभाग' से लकड़ी के फर्नीचर (दरवाजे, बेड, सोफा, अलमारी आदि) बनवाने / ऑर्डर देने के संबंध में जानकारी चाहता हूँ।"
      : "Hello Sanjay Ji, I would like to inquire regarding custom wooden furniture orders and woodwork with Jagannath Furniture Division.";

    window.open(createWhatsAppUrl(furniture.whatsApp, msg), '_blank');
  };

  return (
    <section id="furniture" className="py-20 bg-rosewood-900 text-cream-100 relative overflow-hidden border-b border-brass-600/30">
      {/* Woodgrain / subtle craft pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c69214_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      
      {/* Warm glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-brass-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Distinction Banner: Explaining Separate Division */}
        <div className="mb-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rosewood-950 border border-brass-500/40 text-brass-300 text-xs font-semibold">
          <Info className="w-3.5 h-3.5 text-brass-400" />
          <span>{t('furnitureNotice')}</span>
        </div>

        {/* Main Furniture Card Container */}
        <div className="bg-gradient-to-br from-rosewood-950 via-rosewood-900 to-rosewood-950 rounded-3xl border-2 border-brass-500/40 p-8 sm:p-12 shadow-royal-lg relative overflow-hidden">
          
          {/* Subtle Woodwork Accent Icon in Background */}
          <div className="absolute -right-8 -bottom-8 opacity-5 text-brass-400 pointer-events-none">
            <TreePine className="w-72 h-72" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brass-400 tracking-wider uppercase">
                  <Hammer className="w-4 h-4 text-brass-500" />
                  <span>{t('furnitureBadge')}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  {t('furnitureTitle')}
                </h2>

                <div className="w-20 h-1 bg-gradient-to-r from-brass-500 to-transparent mt-1" />
              </div>

              {/* Exact Description Provided in Requirements */}
              <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed font-sans">
                {furniture.description[language]}
              </p>

              {/* Sanchalak Card */}
              <div className="p-5 rounded-2xl bg-rosewood-900/90 border border-brass-600/30 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brass-600/20 border border-brass-400/50 flex items-center justify-center text-brass-300 flex-shrink-0">
                    <Armchair className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] text-brass-400 uppercase tracking-wider block font-semibold">
                      {t('furnitureSanchalakLabel')}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                      {furniture.sanchalak[language]}
                    </h3>
                  </div>
                </div>

                {/* Specialties bullet points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-cream-300 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brass-400 flex-shrink-0" />
                    <span>{language === 'hi' ? 'ठोस शीशम, सागवान व साल की लकड़ी' : 'Pure Solid Sheesham & Teakwood'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brass-400 flex-shrink-0" />
                    <span>{language === 'hi' ? 'कस्टम ऑर्डर अनुसार दीवान, सोफा, बेड' : 'Bespoke Beds, Sofas, Diwans & Wardrobes'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brass-400 flex-shrink-0" />
                    <span>{language === 'hi' ? 'परंपरागत नक्काशी व मजबूत जोड़' : 'Heritage Hand-carved Joints'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brass-400 flex-shrink-0" />
                    <span>{language === 'hi' ? 'घर व प्रतिष्ठान हेतु ऑर्डर कार्य' : 'Residential & Commercial Woodwork'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Contact Card (4 cols) */}
            <div className="lg:col-span-4 bg-rosewood-950 p-6 sm:p-7 rounded-2xl border border-brass-500/50 shadow-royal space-y-5 text-center">
              
              <div className="space-y-1">
                <span className="text-xs text-brass-400 font-bold uppercase tracking-wider block">
                  {language === 'hi' ? 'सीधा संपर्क सूत्र' : 'Direct Contact'}
                </span>
                <div className="font-serif text-2xl font-bold text-white">
                  {furniture.phone}
                </div>
                <p className="text-[11px] text-cream-300/80">
                  {language === 'hi' ? 'श्री संजय शर्मा (संचालक)' : 'Shree Sanjay Sharma (Manager)'}
                </p>
              </div>

              <div className="w-full h-px bg-rosewood-800" />

              {/* Direct Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={handleWhatsAppClick}
                  type="button"
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{t('furnitureWhatsAppBtn')}</span>
                </button>

                <a
                  href={`tel:${furniture.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-rosewood-900 hover:bg-rosewood-800 text-cream-100 hover:text-white font-medium text-sm border border-brass-600/40 transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4 text-brass-400" />
                  <span>{t('furnitureCallBtn')}</span>
                </a>
              </div>

              {/* Note */}
              <div className="pt-2 text-[10px] text-cream-300/60 leading-tight">
                {language === 'hi'
                  ? '*फर्नीचर का कार्य आर्डर पर सीधे बातचीत करके किया जाता है। दुकान पर आकर भी नमूने व काष्ठ सामग्री देख सकते हैं।'
                  : '*All custom furniture orders are finalized through direct consultation. You may also visit our workshop in Zamania Kasba.'}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
