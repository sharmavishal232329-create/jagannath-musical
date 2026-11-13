import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { BUSINESS_CONFIG } from '../data/initialData';
import { 
  Music, 
  MapPin, 
  Phone, 
  Lock, 
  Unlock, 
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onOpenOwnerPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOwnerPortal }) => {
  const { language, t } = useLanguage();
  const { isAuthenticated } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-rosewood-950 text-cream-200 border-t-2 border-brass-600/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-rosewood-800">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brass-600/20 border border-brass-500/60 flex items-center justify-center text-brass-400">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {BUSINESS_CONFIG.name[language]}
                </h3>
                <p className="text-xs text-brass-400 font-medium">
                  {BUSINESS_CONFIG.tagline[language]}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream-300/80 leading-relaxed font-sans max-w-md">
              {t('footerHeritageNote')}
            </p>

            <div className="flex items-start gap-2.5 text-xs text-cream-300">
              <MapPin className="w-4 h-4 text-brass-500 flex-shrink-0 mt-0.5" />
              <span>{BUSINESS_CONFIG.address[language]}</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-brass-400 uppercase tracking-wider">
              {language === 'hi' ? 'महत्वपूर्ण अनुभाग' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#legacy" className="hover:text-brass-300 transition-colors">
                  {t('navLegacy')}
                </a>
              </li>
              <li>
                <a href="#instruments" className="hover:text-brass-300 transition-colors">
                  {t('navInstruments')}
                </a>
              </li>
              <li>
                <a href="#repairs" className="hover:text-brass-300 transition-colors">
                  {t('navRepairing')}
                </a>
              </li>
              <li>
                <a href="#furniture" className="hover:text-brass-300 transition-colors">
                  {t('navFurniture')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brass-300 transition-colors">
                  {t('navContact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Proprietors & Divisions (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-sm font-bold text-brass-400 uppercase tracking-wider">
              {language === 'hi' ? 'संचालक एवं संपर्क' : 'Leadership & Direct Lines'}
            </h4>

            {/* Musical Store Line */}
            <div className="p-3 rounded-xl bg-rosewood-900/60 border border-rosewood-800 text-xs space-y-1">
              <span className="text-[10px] text-brass-400 font-bold uppercase block">
                {language === 'hi' ? 'वाद्य यंत्र निर्माण व सुर ट्यूनिंग' : 'Musical Instruments & Tuning'}
              </span>
              <div className="font-serif font-bold text-white">
                {BUSINESS_CONFIG.musicDivision.proprietorShort[language]}
              </div>
              <div className="text-cream-300 flex items-center gap-1.5 pt-0.5">
                <Phone className="w-3 h-3 text-brass-500" />
                <span>+91 8787219674 / +91 9935315824</span>
              </div>
            </div>

            {/* Furniture Line */}
            <div className="p-3 rounded-xl bg-rosewood-900/60 border border-rosewood-800 text-xs space-y-1.5">
              <span className="text-[10px] text-brass-400 font-bold uppercase block">
                {language === 'hi' ? 'काष्ठ कला व फर्नीचर निर्माण' : 'Furniture & Bespoke Woodcraft'}
              </span>
              <div className="font-serif font-bold text-white text-xs sm:text-sm">
                {BUSINESS_CONFIG.furnitureDivision.proprietor1.name[language]} • {BUSINESS_CONFIG.furnitureDivision.proprietor2.name[language]}
              </div>
              <div className="text-cream-300 flex flex-col gap-1 pt-0.5 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-brass-400 font-medium">Sanjay Sharma (WA):</span>
                  <a href={`https://wa.me/${BUSINESS_CONFIG.furnitureDivision.proprietor1.whatsAppRaw}`} target="_blank" rel="noreferrer" className="hover:text-brass-300">
                    {BUSINESS_CONFIG.furnitureDivision.proprietor1.whatsApp}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-brass-400 font-medium">Saheb Sharma (Call & WA):</span>
                  <a href={`tel:${BUSINESS_CONFIG.furnitureDivision.proprietor2.phoneRaw}`} className="hover:text-brass-300">
                    {BUSINESS_CONFIG.furnitureDivision.proprietor2.phone}
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-300/70">
          
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {BUSINESS_CONFIG.name[language]}.</span>
            <span>{t('footerRights')}.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenOwnerPortal}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rosewood-900 hover:bg-rosewood-800 text-brass-400 hover:text-brass-200 border border-brass-600/30 transition-all text-xs"
            >
              {isAuthenticated ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{isAuthenticated ? 'Admin Dashboard (Active)' : t('ownerPortalBtn')}</span>
            </button>

            <button
              onClick={scrollToTop}
              type="button"
              className="p-2 rounded-lg bg-rosewood-900 hover:bg-rosewood-800 text-cream-300 hover:text-white transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
