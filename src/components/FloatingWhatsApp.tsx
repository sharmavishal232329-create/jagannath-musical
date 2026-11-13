import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../data/initialData';
import { createWhatsAppUrl } from '../utils/helpers';
import { MessageCircle, Phone, X, Music, Armchair } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const music = BUSINESS_CONFIG.musicDivision;
  const furniture = BUSINESS_CONFIG.furnitureDivision;

  const handleMusicWhatsApp = () => {
    const msg = language === 'hi'
      ? "नमस्ते संतोष जी, मैं 'जगन्नाथ म्यूजिकल' से वाद्य यंत्र/मरम्मत के संबंध में जानकारी चाहता हूँ।"
      : "Hello Santosh Ji, I would like to inquire about musical instruments or repair services.";
    window.open(createWhatsAppUrl(music.primaryWhatsApp, msg), '_blank');
    setIsOpen(false);
  };

  const handleFurnitureWhatsApp = () => {
    const msg = language === 'hi'
      ? "नमस्ते संजय जी, मुझे 'जगन्नाथ फर्नीचर' से लकड़ी के काम/फर्नीचर के संबंध में जानकारी चाहिए।"
      : "Hello Sanjay Ji, I would like to inquire about furniture and woodwork.";
    window.open(createWhatsAppUrl(furniture.whatsApp, msg), '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-royal-lg border-2 border-brass-400 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-cream-200 pb-2">
            <div>
              <h4 className="font-serif text-sm font-bold text-rosewood-950">
                {language === 'hi' ? 'सीधे व्हाट्सएप पर पूछें' : 'Chat on WhatsApp'}
              </h4>
              <p className="text-[10px] text-charcoal-muted">
                {language === 'hi' ? 'तुरंत सहायता एवं परामर्श' : 'Instant answers & advice'}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-charcoal-muted hover:text-charcoal hover:bg-cream-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Option 1: Musical Wing (Santosh Ji) */}
          <button
            onClick={handleMusicWhatsApp}
            type="button"
            className="w-full text-left p-2.5 rounded-xl bg-cream-100 hover:bg-emerald-50 border border-brass-200 hover:border-emerald-400 transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-rosewood-900 text-brass-300 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 transition-colors">
              <Music className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-rosewood-950 block truncate">
                {language === 'hi' ? 'वाद्य यंत्र एवं मरम्मत' : 'Instruments & Repairs'}
              </span>
              <span className="text-[10px] text-charcoal-muted block truncate">
                {music.proprietorShort[language]}
              </span>
            </div>
            <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
          </button>

          {/* Option 2: Furniture Wing (Sanjay Ji) */}
          <button
            onClick={handleFurnitureWhatsApp}
            type="button"
            className="w-full text-left p-2.5 rounded-xl bg-cream-100 hover:bg-emerald-50 border border-brass-200 hover:border-emerald-400 transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-rosewood-900 text-brass-300 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 transition-colors">
              <Armchair className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-rosewood-950 block truncate">
                {language === 'hi' ? 'फर्नीचर एवं काष्ठ कला' : 'Furniture & Woodwork'}
              </span>
              <span className="text-[10px] text-charcoal-muted block truncate">
                {furniture.sanchalakShort[language]}
              </span>
            </div>
            <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
          </button>

          {/* Direct Call Link */}
          <div className="pt-1 text-center">
            <a
              href={`tel:${music.phone1Raw}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-rosewood-900 hover:text-rosewood-700"
            >
              <Phone className="w-3 h-3 text-brass-600" />
              <span>{language === 'hi' ? 'अथवा सीधे फोन पर बात करें' : 'Or Call Us Directly'}</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-royal-lg hover:shadow-emerald-600/50 transition-all active:scale-95 group border-2 border-white/60"
        aria-label="WhatsApp Assistance"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium text-xs">
          {language === 'hi' ? 'व्हाट्सएप सहायता' : 'WhatsApp Us'}
        </span>
      </button>

    </div>
  );
};
