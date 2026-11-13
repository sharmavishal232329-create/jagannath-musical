import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, { en: string; hi: string }> = {
  // Navigation
  navLegacy: { en: "Legacy", hi: "विरासत" },
  navInstruments: { en: "Instruments", hi: "वाद्य यंत्र" },
  navRepairing: { en: "Repair Fees", hi: "मरम्मत शुल्क" },
  navFurniture: { en: "Furniture", hi: "फर्नीचर" },
  navContact: { en: "Contact", hi: "संपर्क" },
  navOwnerLogin: { en: "Owner Portal", hi: "मालिक पोर्टल" },
  navTagline: { en: "Four Generations of Musical Legacy", hi: "चार पीढ़ियों की संगीत विरासत" },
  taglineBadge: { en: "Est. Across 4 Generations", hi: "चार पीढ़ियों की विरासत" },

  // Hero
  heroBadge: { en: "Est. Across 4 Generations • Zamania, Ghazipur", hi: "चार पीढ़ियों से सेवा में • ज़मानिया, गाज़ीपुर" },
  heroHeadlineMain: { 
    en: "Where Every Note Carries Four Generations of Trust", 
    hi: "जहाँ हर सुर में चार पीढ़ियों का विश्वास बसता है" 
  },
  heroSubtitle: { 
    en: "Authentic Harmoniums, Tabla, Dholak, Naal & Keyboards—personally tested and tuned to perfection by Organ & Keyboard Musician Shree Santosh Kumar Sharma.", 
    hi: "हारमोनियम, तबला, ढोलक, नाल एवं कीबोर्ड की बिक्री व विशेषज्ञ मरम्मत—कुशल ऑर्गन वादक श्री संतोष कुमार शर्मा द्वारा परखे हुए शुद्ध सुर।" 
  },
  heroCtaStock: { en: "Explore Instruments", hi: "वाद्य यंत्र देखें" },
  heroCtaRepair: { en: "View Repair Fees", hi: "मरम्मत शुल्क देखें" },
  heroCallNow: { en: "Call Santosh Ji", hi: "संतोष जी को कॉल करें" },

  // Stats / Badges
  featGenerations: { en: "4 Generations", hi: "4 पीढ़ियां" },
  featGenerationsSub: { en: "Unbroken lineage of acoustic masters", hi: "कारीगरी व सुर साधना की अटूट परंपरा" },
  featMusician: { en: "Musician-Tuned", hi: "कलाकार द्वारा सुर परख" },
  featMusicianSub: { en: "Every instrument tested by Santosh Ji", hi: "प्रत्येक वाद्य का व्यक्तिगत परीक्षण" },
  featFastRepair: { en: "Express Repair", hi: "विश्वसनीय मरम्मत" },
  featFastRepairSub: { en: "Harmonium, Tabla, Dholak, Naal", hi: "हारमोनियम, तबला, ढोलक व नाल" },
  featAuthentic: { en: "Genuine Woods", hi: "प्रामाणिक काष्ठ" },
  featAuthenticSub: { en: "Sheesham, Teak & Pure Bell Metals", hi: "पक्का शीशम, सागवान व शुद्ध कांसी" },

  // Legacy Section
  legacySectionBadge: { en: "Parampara & Lineage", hi: "परंपरा एवं गौरवशाली इतिहास" },
  legacySectionTitle: { en: "Four Generations of Musical Craftsmanship", hi: "चार पीढ़ियों की संगीत साधना व इतिहास" },
  legacySectionSub: { 
    en: "From the pioneering woodcraft of Late Ram Sundar Mistri to the modern musical mastery of Santosh Kumar Sharma, our story is sculpted in pure sound.", 
    hi: "स्व. श्री राम सुंदर मिस्त्री जी की शुरुआती काष्ठ-साधना से लेकर संतोष कुमार शर्मा जी की आधुनिक सुर-सिद्धता तक, हमारी हर पीढ़ी ने संगीत को समर्पित भाव से सींचा है।" 
  },
  portraitFallbackTitle: { en: "Portrait Frame", hi: "चित्र फ्रेम" },

  // Catalog Section
  catalogBadge: { en: "Direct Workshop Stock", hi: "दुकान व कार्यशाला स्टॉक" },
  catalogTitle: { en: "Handcrafted Musical Instruments", hi: "उपलब्ध वाद्य यंत्र संग्रह" },
  catalogSub: { 
    en: "Finely tested acoustic harmoniums, concert tablas, seasoned dholaks, crisp naals, and stage keyboards ready for dispatch or in-store purchase.", 
    hi: "दुकान पर उपलब्ध तैयार वाद्य यंत्र—भजन, कीर्तन, मंच गायन एवं संगीत शिक्षार्थियों के लिए शुद्ध सुरों में जाँचे-परखे हुए।" 
  },
  filterAll: { en: "All Instruments", hi: "सभी वाद्य यंत्र" },
  filterHarmonium: { en: "Harmonium", hi: "हारमोनियम" },
  filterTablaDholak: { en: "Tabla & Dholak", hi: "तबला व ढोलक" },
  filterNaalJhal: { en: "Naal & Jhal", hi: "नाल व झाल" },
  filterKeyboards: { en: "Keyboards & Others", hi: "कीबोर्ड व अन्य" },
  searchPlaceholder: { en: "Search harmonium, tabla, dholak...", hi: "हारमोनियम, तबला, ढोलक खोजें..." },
  inStockBadge: { en: "In Ready Stock", hi: "दुकान पर उपलब्ध" },
  outOfStockBadge: { en: "Custom Order / Re-stocking", hi: "ऑर्डर पर उपलब्ध" },
  btnBuyWhatsApp: { en: "Buy / Inquire on WhatsApp", hi: "व्हाट्सएप पर ऑर्डर / पूछताछ" },

  // Repair Section
  repairBadge: { en: "Master Workshop Services", hi: "मास्टर मरम्मत कार्यशाला" },
  repairTitle: { en: "Comprehensive Instrument Repairing Fees", hi: "वाद्य यंत्र मरम्मत शुल्क तालिका" },
  repairSub: { 
    en: "Transparent, honest, and expert repair solutions for harmoniums, naals, dholaks, and tablas by accomplished craftsmen.", 
    hi: "स्पष्ट एवं उचित दर पर हारमोनियम, नाल, ढोलक एवं तबले की कुशल व विश्वसनीय मरम्मत।" 
  },
  repairStartingFrom: { en: "Starting Fee", hi: "शुरुआती शुल्क" },
  repairTurnaround: { en: "Turnaround", hi: "समय" },
  btnBookRepair: { en: "Book Repair on WhatsApp", hi: "मरम्मत हेतु संपर्क करें" },

  // Furniture Section
  furnitureBadge: { en: "Independent Woodcraft Wing", hi: "स्वतंत्र काष्ठ कला विभाग" },
  furnitureTitle: { en: "Jagannath Furniture Division", hi: "जगन्नाथ फर्नीचर विभाग" },
  furnitureNotice: { en: "Contact-Only Division (No Online Catalog)", hi: "केवल संपर्क द्वारा पूछताछ (ऑनलाइन सूची नहीं)" },
  furnitureSanchalakLabel: { en: "Managed & Supervised By", hi: "संचालक एवं व्यवस्थापक" },
  furnitureCallBtn: { en: "Call Sanjay Ji", hi: "संजय जी को कॉल करें" },
  furnitureWhatsAppBtn: { en: "WhatsApp Inquiry", hi: "फर्नीचर पूछताछ (WhatsApp)" },

  // Contact & Location
  contactBadge: { en: "Visit Us in Zamania", hi: "ज़मानिया पधारें" },
  contactTitle: { en: "Store Location & Direct Contact", hi: "दुकान का पता व संपर्क सूत्र" },
  contactSub: { 
    en: "We welcome musicians, bhajan mandalis, and music enthusiasts from Ghazipur, Buxar, Varanasi, and across Purvanchal.", 
    hi: "गाज़ीपुर, बक्सर, वाराणसी और पूरे पूर्वांचल के संगीत प्रेमियों व कलाकारों का हमारे प्रतिष्ठान पर सदैव हार्दिक स्वागत है।" 
  },
  addressLabel: { en: "Store Address", hi: "प्रतिष्ठान का पता" },
  musicProprietorLabel: { en: "Musical Wing Proprietor", hi: "संगीत शाखा संचालक" },
  furnitureProprietorLabel: { en: "Furniture Wing Sanchalak", hi: "फर्नीचर शाखा संचालक" },
  visitingHoursLabel: { en: "Store Hours", hi: "दुकान का समय" },
  visitingHoursVal: { en: "Monday – Sunday: 9:00 AM – 8:30 PM", hi: "सोमवार से रविवार: सुबह 9:00 से रात्रि 8:30 बजे तक" },

  // Footer & Common
  footerRights: { en: "All Rights Reserved", hi: "सर्वाधिकार सुरक्षित" },
  footerHeritageNote: { 
    en: "Serving the sacred traditions of Indian classical, devotional, and folk music with honesty and acoustic perfection.", 
    hi: "भारतीय शास्त्रीय, भक्ति एवं लोक संगीत की सेवा में चार पीढ़ियों से समर्पित एवं विश्वसनीय।" 
  },
  ownerPortalBtn: { en: "Shop Owner Login", hi: "दुकानदार लॉगिन" }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('jagannath_lang');
    return (saved === 'hi' || saved === 'en') ? saved : 'hi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('jagannath_lang', lang);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'hi' : 'en';
    setLanguage(next);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || translations[key]['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
