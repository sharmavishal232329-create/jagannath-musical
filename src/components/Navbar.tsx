import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { BUSINESS_CONFIG } from '../data/initialData';
import { createWhatsAppUrl } from '../utils/helpers';
import { 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  Lock, 
  Unlock, 
  Music,
  MapPin
} from 'lucide-react';

interface NavbarProps {
  onOpenOwnerPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOwnerPortal }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { isAuthenticated } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#legacy", label: t('navLegacy') },
    { href: "#instruments", label: t('navInstruments') },
    { href: "#repairs", label: t('navRepairing') },
    { href: "#furniture", label: t('navFurniture') },
    { href: "#contact", label: t('navContact') },
  ];

  const handleWhatsAppClick = () => {
    const defaultMsg = language === 'hi'
      ? "नमस्ते संतोष जी, मैं 'जगन्नाथ म्यूजिकल एंड फर्नीचर' के वाद्य यंत्रों अथवा मरम्मत के संबंध में जानकारी चाहता हूँ।"
      : "Hello Santosh Ji, I would like to inquire about musical instruments or repair services at Jagannath Musical & Furniture.";
    window.open(createWhatsAppUrl(BUSINESS_CONFIG.musicDivision.primaryWhatsApp, defaultMsg), '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-rosewood-900/95 backdrop-blur-md border-b border-brass-600/30 text-cream-100 shadow-royal transition-all duration-300">
      {/* Top minimal clean announcement bar */}
      <div className="bg-rosewood-950 py-1.5 px-4 sm:px-6 lg:px-8 border-b border-rosewood-800/80 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Store Address */}
          <div className="flex items-center gap-1.5 text-cream-300/90 text-[11px] sm:text-xs truncate">
            <MapPin className="w-3.5 h-3.5 text-brass-400 flex-shrink-0" />
            <span className="truncate">{BUSINESS_CONFIG.address[language]}</span>
          </div>

          {/* Right: Phone & Proprietor Name */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs flex-shrink-0">
            <a 
              href={`tel:${BUSINESS_CONFIG.musicDivision.phone1Raw}`} 
              className="flex items-center gap-1.5 text-cream-200 hover:text-brass-300 transition-colors font-medium whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-brass-400" />
              <span>{BUSINESS_CONFIG.musicDivision.phone1}</span>
            </a>
            <span className="text-rosewood-700 hidden md:inline">|</span>
            <span className="hidden md:inline text-brass-400 font-normal whitespace-nowrap">
              {BUSINESS_CONFIG.musicDivision.proprietorShort[language]}
            </span>
          </div>

        </div>
      </div>

      {/* Main Single-Line Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Crisp Single-Line Title */}
          <a href="#" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brass-500 to-brass-700 p-0.5 shadow-gold-glow flex-shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-rosewood-900 flex items-center justify-center border border-brass-400/40">
                <Music className="w-5 h-5 text-brass-400" />
              </div>
            </div>
            <div className="min-w-0">
              <span className="font-serif text-lg sm:text-xl lg:text-[22px] font-bold tracking-tight text-white group-hover:text-brass-300 transition-colors whitespace-nowrap block">
                {BUSINESS_CONFIG.name[language]}
              </span>
              <p className="text-[11px] sm:text-xs text-brass-400 font-medium tracking-wide whitespace-nowrap">
                {t('navTagline')}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links - Single Line with clean gap-6 */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-cream-200 hover:text-brass-300 transition-colors whitespace-nowrap py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brass-500/60 bg-rosewood-800/80 hover:bg-rosewood-700 text-xs font-semibold text-brass-300 transition-all shadow-sm active:scale-95 whitespace-nowrap"
              title={language === 'en' ? "हिंदी में बदलें" : "Switch to English"}
            >
              <span className={`px-1.5 py-0.5 rounded ${language === 'en' ? 'bg-brass-500 text-rosewood-950 font-bold' : 'text-cream-300'}`}>
                EN
              </span>
              <span className="text-brass-500/70">/</span>
              <span className={`px-1.5 py-0.5 rounded font-serif-hi ${language === 'hi' ? 'bg-brass-500 text-rosewood-950 font-bold' : 'text-cream-300'}`}>
                हिंदी
              </span>
            </button>

            {/* Direct WhatsApp CTA */}
            <button
              onClick={handleWhatsAppClick}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md hover:shadow-emerald-700/50 transition-all active:scale-95 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </button>

            {/* Owner Login Icon Button */}
            <button
              onClick={onOpenOwnerPortal}
              type="button"
              className={`p-2 rounded-lg border transition-all ${
                isAuthenticated 
                  ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/50' 
                  : 'border-brass-600/40 bg-rosewood-800/60 text-brass-400 hover:bg-rosewood-700 hover:text-brass-200'
              }`}
              title={isAuthenticated ? "Owner Dashboard Active" : "Shop Owner Login"}
            >
              {isAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Button & Language Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              type="button"
              className="px-2.5 py-1 rounded-full border border-brass-500/60 bg-rosewood-800 text-xs font-bold text-brass-300"
            >
              {language === 'en' ? 'हिंदी' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-cream-200 hover:text-white hover:bg-rosewood-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-rosewood-950 border-b border-brass-600/30 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-cream-200 hover:text-brass-300 hover:bg-rosewood-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-rosewood-800 flex flex-col gap-2">
            <button
              onClick={() => {
                handleWhatsAppClick();
                setMobileMenuOpen(false);
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-sm shadow"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Santosh Ji</span>
            </button>

            <div className="flex gap-2">
              <a
                href={`tel:${BUSINESS_CONFIG.musicDivision.phone1Raw}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-rosewood-800 text-cream-200 hover:text-white text-xs border border-rosewood-700"
              >
                <Phone className="w-3.5 h-3.5 text-brass-400" />
                <span>Call Store</span>
              </a>

              <button
                onClick={() => {
                  onOpenOwnerPortal();
                  setMobileMenuOpen(false);
                }}
                type="button"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-brass-600/20 text-brass-300 text-xs border border-brass-600/40"
              >
                {isAuthenticated ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span>{isAuthenticated ? 'Owner Admin' : 'Owner Login'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
