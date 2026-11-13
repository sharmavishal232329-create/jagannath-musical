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
  Info,
  UserCheck
} from 'lucide-react';

export const FurnitureSection: React.FC = () => {
  const { language, t } = useLanguage();
  const furniture = BUSINESS_CONFIG.furnitureDivision;

  const handleSanjayWhatsApp = () => {
    const msg = language === 'hi'
      ? "नमस्ते संजय जी, मैं 'जगन्नाथ फर्नीचर विभाग' से लकड़ी के काम/फर्नीचर (दरवाजे, बेड, सोफा, अलमारी आदि) बनवाने के संबंध में जानकारी चाहता हूँ।"
      : "Hello Sanjay Ji, I would like to inquire about custom wooden furniture orders with Jagannath Furniture Division.";

    window.open(createWhatsAppUrl(furniture.proprietor1.whatsAppRaw, msg), '_blank');
  };

  const handleSahebWhatsApp = () => {
    const msg = language === 'hi'
      ? "नमस्ते साहेब जी, मैं 'जगन्नाथ फर्नीचर विभाग' से लकड़ी के काम/फर्नीचर (दरवाजे, बेड, सोफा, अलमारी आदि) बनवाने के संबंध में जानकारी चाहता हूँ।"
      : "Hello Saheb Ji, I would like to inquire about custom wooden furniture orders with Jagannath Furniture Division.";

    window.open(createWhatsAppUrl(furniture.proprietor2.whatsAppRaw, msg), '_blank');
  };

  return (
    <section id="furniture" className="py-20 bg-rosewood-900 text-cream-100 relative overflow-hidden border-b border-brass-600/30">
      {/* Woodgrain / subtle craft pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c69214_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      
      {/* Warm glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-brass-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Distinction Banner: Explaining Separate Division */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rosewood-950 border border-brass-500/40 text-brass-300 text-xs font-semibold">
          <Info className="w-3.5 h-3.5 text-brass-400" />
          <span>{t('furnitureNotice')}</span>
        </div>

        {/* Main Furniture Card Container */}
        <div className="bg-gradient-to-br from-rosewood-950 via-rosewood-900 to-rosewood-950 rounded-3xl border-2 border-brass-500/40 p-6 sm:p-10 lg:p-12 shadow-royal-lg relative overflow-hidden space-y-8">
          
          {/* Subtle Woodwork Accent Icon in Background */}
          <div className="absolute -right-8 -bottom-8 opacity-5 text-brass-400 pointer-events-none">
            <TreePine className="w-72 h-72" />
          </div>

          {/* Section Header & Description */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-brass-400 tracking-wider uppercase">
              <Hammer className="w-4 h-4 text-brass-500" />
              <span>{t('furnitureBadge')}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {t('furnitureTitle')}
            </h2>

            <div className="w-20 h-1 bg-gradient-to-r from-brass-500 to-transparent" />

            <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed font-sans pt-1">
              {furniture.description[language]}
            </p>
          </div>

          {/* Two Dedicated Proprietor Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 relative z-10">
            
            {/* Proprietor 1: Shree Sanjay Sharma */}
            <div className="bg-rosewood-950/90 rounded-2xl border-2 border-brass-500/40 hover:border-brass-400/80 p-6 shadow-royal transition-all duration-300 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-brass-600/20 border border-brass-400/50 flex items-center justify-center text-brass-300 flex-shrink-0">
                    <Armchair className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] text-brass-400 uppercase tracking-wider block font-semibold">
                      {language === 'hi' ? 'संचालक / व्यवस्थापक' : 'Proprietor & Manager'}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                      {furniture.proprietor1.name[language]}
                    </h3>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rosewood-900/60 border border-rosewood-800 text-xs">
                  <span className="text-[10px] text-cream-300/70 uppercase block font-medium">
                    {language === 'hi' ? 'व्हाट्सएप संपर्क सूत्र' : 'Direct WhatsApp Number'}
                  </span>
                  <span className="font-serif text-lg font-bold text-brass-300 block mt-0.5">
                    {furniture.proprietor1.whatsApp}
                  </span>
                  <span className="text-[11px] text-cream-300/80 block mt-0.5">
                    {language === 'hi' ? 'कस्टम फर्नीचर ऑर्डर व डिज़ाइन परामर्श' : 'Custom Woodwork Design Consultation'}
                  </span>
                </div>
              </div>

              {/* Action Button: WhatsApp */}
              <div>
                <button
                  onClick={handleSanjayWhatsApp}
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>
                    {language === 'hi' ? 'संजय जी से व्हाट्सएप पर पूछें' : 'WhatsApp Sanjay Ji'}
                  </span>
                </button>
              </div>
            </div>

            {/* Proprietor 2: Shree Saheb Sharma */}
            <div className="bg-rosewood-950/90 rounded-2xl border-2 border-brass-500/40 hover:border-brass-400/80 p-6 shadow-royal transition-all duration-300 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-brass-600/20 border border-brass-400/50 flex items-center justify-center text-brass-300 flex-shrink-0">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] text-brass-400 uppercase tracking-wider block font-semibold">
                      {language === 'hi' ? 'संचालक / ग्राहक संपर्क' : 'Proprietor & Direct Lines'}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                      {furniture.proprietor2.name[language]}
                    </h3>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rosewood-900/60 border border-rosewood-800 text-xs">
                  <span className="text-[10px] text-cream-300/70 uppercase block font-medium">
                    {language === 'hi' ? 'कॉल एवं व्हाट्सएप नंबर' : 'Calling & WhatsApp Number'}
                  </span>
                  <span className="font-serif text-lg font-bold text-brass-300 block mt-0.5">
                    {furniture.proprietor2.phone}
                  </span>
                  <span className="text-[11px] text-cream-300/80 block mt-0.5">
                    {language === 'hi' ? 'सीधी फोन बातचीत अथवा व्हाट्सएप' : 'Available on Direct Call & WhatsApp'}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Click-to-Call & WhatsApp */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${furniture.proprietor2.phoneRaw}`}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-rosewood-900 hover:bg-rosewood-800 text-cream-100 hover:text-white font-semibold text-xs border border-brass-600/50 transition-all active:scale-95 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-brass-400" />
                  <span>{language === 'hi' ? 'कॉल करें' : 'Call Saheb Ji'}</span>
                </a>

                <button
                  onClick={handleSahebWhatsApp}
                  type="button"
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

          </div>

          {/* Hallmarks of Furniture Craftsmanship */}
          <div className="pt-2 border-t border-rosewood-800/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-cream-300">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-rosewood-900/50 border border-brass-600/20">
                <CheckCircle2 className="w-4 h-4 text-brass-400 flex-shrink-0" />
                <span>{language === 'hi' ? 'ठोस शीशम, सागवान व साल की लकड़ी' : 'Solid Sheesham & Teakwood'}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-rosewood-900/50 border border-brass-600/20">
                <CheckCircle2 className="w-4 h-4 text-brass-400 flex-shrink-0" />
                <span>{language === 'hi' ? 'कस्टम ऑर्डर: दीवान, सोफा, बेड, अलमारी' : 'Bespoke Beds, Sofas, Diwans'}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-rosewood-900/50 border border-brass-600/20">
                <CheckCircle2 className="w-4 h-4 text-brass-400 flex-shrink-0" />
                <span>{language === 'hi' ? 'परंपरागत नक्काशी व मजबूत जोड़' : 'Heritage Hand-carved Joints'}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-rosewood-900/50 border border-brass-600/20">
                <CheckCircle2 className="w-4 h-4 text-brass-400 flex-shrink-0" />
                <span>{language === 'hi' ? 'सीधे कार्यशाला में परामर्श' : 'Direct Workshop Orders'}</span>
              </div>
            </div>

            <p className="text-[11px] text-cream-300/60 text-center pt-4">
              {language === 'hi'
                ? '*फर्नीचर का कार्य विशेष ऑर्डर पर सीधे बातचीत करके तैयार किया जाता है। आप हमारी कार्यशाला में आकर भी काष्ठ सामग्री व नमूने देख सकते हैं।'
                : '*All bespoke furniture orders are made to measure. You are welcome to visit our workshop in Zamania Kasba to inspect seasoned wood and designs.'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
