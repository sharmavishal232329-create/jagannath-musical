import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import type { InstrumentCategory, InstrumentItem } from '../types';
import { BUSINESS_CONFIG } from '../data/initialData';
import { formatCurrency, createWhatsAppUrl } from '../utils/helpers';
import { 
  Search, 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';

export const InstrumentCatalog: React.FC = () => {
  const { language, t } = useLanguage();
  const { instruments } = useData();

  const [selectedCategory, setSelectedCategory] = useState<InstrumentCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: InstrumentCategory; label: string }[] = [
    { id: 'all', label: t('filterAll') },
    { id: 'harmonium', label: t('filterHarmonium') },
    { id: 'tabla-dholak', label: t('filterTablaDholak') },
    { id: 'naal-jhal', label: t('filterNaalJhal') },
    { id: 'keyboards-others', label: t('filterKeyboards') },
  ];

  const filteredInstruments = useMemo(() => {
    return instruments.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query filter (search across english, hindi names and specs)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchEnName = item.name.en.toLowerCase().includes(query);
        const matchHiName = item.name.hi.toLowerCase().includes(query);
        const matchEnSpec = item.specifications.en.toLowerCase().includes(query);
        const matchHiSpec = item.specifications.hi.toLowerCase().includes(query);
        return matchEnName || matchHiName || matchEnSpec || matchHiSpec;
      }
      return true;
    });
  }, [instruments, selectedCategory, searchQuery]);

  const handleWhatsAppBuy = (item: InstrumentItem) => {
    const itemName = item.name[language];
    const priceStr = formatCurrency(item.price);
    const stockStatus = item.inStock 
      ? (language === 'hi' ? 'दुकान पर उपलब्ध' : 'In Ready Stock')
      : (language === 'hi' ? 'ऑर्डर पर तैयार' : 'Custom Order');

    const msg = language === 'hi'
      ? `नमस्ते संतोष जी, मुझे 'जगन्नाथ म्यूजिकल एंड फर्नीचर' से निम्नलिखित वाद्य यंत्र के बारे में जानकारी / खरीद प्रक्रिया जाननी है:\n\n• वाद्य यंत्र: ${itemName}\n• मूल्य: ${priceStr}\n• स्थिति: ${stockStatus}\n\nकृपया उपलब्धता एवं डिलीवरी/दुकान से प्राप्त करने की प्रक्रिया बताएं।`
      : `Hello Santosh Ji, I would like to inquire about purchasing this instrument from Jagannath Musical & Furniture:\n\n• Instrument: ${itemName}\n• Price: ${priceStr}\n• Status: ${stockStatus}\n\nPlease share availability and purchase/pickup details.`;

    window.open(createWhatsAppUrl(BUSINESS_CONFIG.musicDivision.primaryWhatsApp, msg), '_blank');
  };

  return (
    <section id="instruments" className="py-20 bg-cream-50 relative border-b border-brass-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brass-100 border border-brass-400/40 text-rosewood-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brass-700" />
            <span>{t('catalogBadge')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-rosewood-950">
            {t('catalogTitle')}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brass-500 to-transparent mx-auto mt-2" />

          <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed">
            {t('catalogSub')}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="mb-10 space-y-4">
          
          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-brass-300 focus:border-brass-600 focus:ring-2 focus:ring-brass-500/20 text-sm text-charcoal shadow-sm outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-charcoal-muted hover:text-charcoal bg-cream-200 px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                type="button"
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-rosewood-900 text-brass-300 shadow-royal border border-brass-500/50 scale-105'
                    : 'bg-white text-charcoal hover:bg-cream-200 border border-brass-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Catalog Items Grid */}
        {filteredInstruments.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto space-y-3 bg-white rounded-3xl border border-brass-200 p-8 shadow-sm">
            <SlidersHorizontal className="w-10 h-10 text-brass-500 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-rosewood-900">
              {language === 'hi' ? 'कोई वाद्य यंत्र नहीं मिला' : 'No Instruments Found'}
            </h4>
            <p className="text-xs text-charcoal-muted">
              {language === 'hi' 
                ? 'कृपया दूसरा खोज शब्द दर्ज करें अथवा सभी श्रेणियां चुनें।' 
                : 'Try adjusting your search terms or clearing category filters.'}
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-rosewood-900 text-white rounded-xl text-xs font-semibold"
            >
              {language === 'hi' ? 'सभी देखें' : 'View All'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredInstruments.map((item) => (
              <InstrumentCard 
                key={item.id} 
                item={item} 
                onBuy={handleWhatsAppBuy} 
              />
            ))}
          </div>
        )}

        {/* Custom Order Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-cream-200/90 border border-brass-300 text-center max-w-3xl mx-auto space-y-3">
          <h4 className="font-serif text-lg sm:text-xl font-bold text-rosewood-950">
            {language === 'hi' ? 'क्या आप विशेष स्केल या कस्टमाइज़्ड वाद्य बनवाना चाहते हैं?' : 'Need a Custom Pitch Scale or Special Wood Finish?'}
          </h4>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto">
            {language === 'hi'
              ? 'संतोष जी स्वयं आपकी गायकी व सप्तक के अनुकूल हारमोनियम, तबला जोड़ी अथवा नाल की कस्टमाइज़्ड सेटिंग तैयार करके देते हैं।'
              : 'Shree Santosh Kumar Sharma personally tunes and custom-builds harmoniums and tabla pairs tailored to your vocal pitch and stage demands.'}
          </p>
          <button
            onClick={() => {
              const msg = language === 'hi'
                ? "नमस्ते संतोष जी, मुझे अपनी गायकी/मंच के अनुसार कस्टमाइज़्ड वाद्य यंत्र बनवाने के लिए बातचीत करनी है।"
                : "Hello Santosh Ji, I would like to discuss a custom built/tuned instrument for my singing scale.";
              window.open(createWhatsAppUrl(BUSINESS_CONFIG.musicDivision.primaryWhatsApp, msg), '_blank');
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rosewood-900 hover:bg-rosewood-800 text-brass-300 text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-brass-300 text-rosewood-900" />
            <span>{language === 'hi' ? 'कस्टम ऑर्डर हेतु संपर्क करें' : 'Discuss Custom Order'}</span>
          </button>
        </div>

      </div>
    </section>
  );
};

interface InstrumentCardProps {
  item: InstrumentItem;
  onBuy: (item: InstrumentItem) => void;
}

const InstrumentCard: React.FC<InstrumentCardProps> = ({ item, onBuy }) => {
  const { language, t } = useLanguage();
  const [imageError, setImageError] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-white rounded-2xl border border-brass-200/90 hover:border-brass-500/70 overflow-hidden shadow-royal hover:shadow-royal-lg transition-all duration-300 flex flex-col justify-between group">
      
      <div>
        {/* Photo Container */}
        <div className="relative h-48 w-full bg-rosewood-950 overflow-hidden">
          <img
            src={imageError ? fallbackImage : item.image}
            alt={item.name[language]}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Stock Badge Overlay */}
          <div className="absolute top-2.5 right-2.5">
            {item.inStock ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-700/90 text-white text-[11px] font-semibold backdrop-blur-xs shadow">
                <CheckCircle className="w-3 h-3" />
                <span>{t('inStockBadge')}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-700/90 text-white text-[11px] font-semibold backdrop-blur-xs shadow">
                <Clock className="w-3 h-3" />
                <span>{t('outOfStockBadge')}</span>
              </span>
            )}
          </div>

          {/* Category Tag Overlay */}
          <div className="absolute bottom-2.5 left-2.5">
            <span className="px-2 py-0.5 rounded-md bg-black/60 text-brass-300 text-[10px] font-semibold tracking-wide backdrop-blur-xs">
              {item.category.toUpperCase().replace('-', ' & ')}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-2.5">
          
          {/* Price */}
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-serif font-extrabold text-rosewood-900">
              {formatCurrency(item.price)}
            </span>
            <span className="text-[10px] text-charcoal-muted uppercase">
              {language === 'hi' ? 'शुद्ध सुर प्रमाणित' : 'Pure Tone Verified'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base font-bold text-charcoal group-hover:text-rosewood-900 transition-colors line-clamp-2">
            {item.name[language]}
          </h3>

          {/* Specifications */}
          <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
            {item.specifications[language]}
          </p>

        </div>
      </div>

      {/* Footer Buy CTA */}
      <div className="p-4 sm:p-5 pt-0">
        <button
          onClick={() => onBuy(item)}
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm hover:shadow transition-all active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>{t('btnBuyWhatsApp')}</span>
        </button>
      </div>

    </div>
  );
};
