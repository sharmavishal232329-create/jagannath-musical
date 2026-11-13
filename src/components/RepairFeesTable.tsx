import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import type { RepairCategory, RepairService } from '../types';
import { BUSINESS_CONFIG } from '../data/initialData';
import { formatCurrency, createWhatsAppUrl } from '../utils/helpers';
import { 
  Wrench, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Award,
  ArrowRight
} from 'lucide-react';

export const RepairFeesTable: React.FC = () => {
  const { language, t } = useLanguage();
  const { repairServices } = useData();
  const [activeTab, setActiveTab] = useState<RepairCategory>('harmonium');

  const categories: { id: RepairCategory; label: { en: string; hi: string }; icon: string }[] = [
    { id: 'harmonium', label: { en: 'Harmonium', hi: 'हारमोनियम' }, icon: '🎹' },
    { id: 'tabla', label: { en: 'Tabla Pair', hi: 'तबला जोड़ी' }, icon: '🥁' },
    { id: 'dholak', label: { en: 'Dholak', hi: 'ढोलक' }, icon: '🪘' },
    { id: 'naal', label: { en: 'Naal', hi: 'नाल' }, icon: '🎶' },
  ];

  const currentServices = repairServices.filter((s) => s.category === activeTab);

  const handleBookRepair = (service: RepairService) => {
    const serviceName = service.serviceName[language];
    const categoryName = categories.find(c => c.id === service.category)?.label[language] || service.category;
    const feeStr = formatCurrency(service.startingFee);

    const msg = language === 'hi'
      ? `नमस्ते संतोष जी, मुझे 'जगन्नाथ म्यूजिकल' में अपने वाद्य यंत्र की मरम्मत करवानी है:\n\n• वाद्य: ${categoryName}\n• सेवा: ${serviceName}\n• अनुमानित शुरुआती शुल्क: ${feeStr}\n\nकृपया बताएं कि वाद्य कब दुकान पर लेकर आऊँ अथवा कार्य पूर्ण होने में कितना समय लगेगा?`
      : `Hello Santosh Ji, I would like to book a repair service for my musical instrument at Jagannath Musical:\n\n• Instrument: ${categoryName}\n• Service: ${serviceName}\n• Starting Estimate: ${feeStr}\n\nPlease let me know when I can bring the instrument to your shop.`;

    window.open(createWhatsAppUrl(BUSINESS_CONFIG.musicDivision.primaryWhatsApp, msg), '_blank');
  };

  return (
    <section id="repairs" className="py-20 bg-cream-100 relative border-b border-brass-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brass-100 border border-brass-400/40 text-rosewood-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Wrench className="w-3.5 h-3.5 text-brass-700" />
            <span>{t('repairBadge')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-rosewood-950">
            {t('repairTitle')}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brass-500 to-transparent mx-auto mt-2" />

          <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed">
            {t('repairSub')}
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10">
          {categories.map((cat) => {
            const count = repairServices.filter(s => s.category === cat.id).length;
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                type="button"
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-serif text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-rosewood-900 text-brass-300 shadow-royal border border-brass-500 scale-105'
                    : 'bg-white text-charcoal hover:bg-cream-200 border border-brass-200/80 shadow-sm'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label[language]}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-brass-600/30 text-brass-200' : 'bg-cream-300 text-charcoal-muted'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Repair Services Rate List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {currentServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-brass-300/60 p-5 sm:p-6 shadow-royal hover:shadow-royal-lg hover:border-brass-500 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Header: Service Name & Fee */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-brass-700 tracking-wider uppercase">
                      {service.category.toUpperCase()}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-rosewood-950 mt-0.5">
                      {service.serviceName[language]}
                    </h3>
                  </div>

                  <div className="text-right flex-shrink-0 bg-cream-100 px-3 py-1.5 rounded-xl border border-brass-200">
                    <span className="text-[10px] text-charcoal-muted block uppercase font-medium">
                      {t('repairStartingFrom')}
                    </span>
                    <span className="text-lg font-serif font-extrabold text-rosewood-900">
                      {formatCurrency(service.startingFee)}
                      <span className="text-xs font-normal text-charcoal-muted ml-0.5">+</span>
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
                  {service.description[language]}
                </p>

                {/* Turnaround Time */}
                <div className="flex items-center gap-2 text-xs text-brass-800 font-medium">
                  <Clock className="w-3.5 h-3.5 text-brass-600" />
                  <span>
                    <strong>{t('repairTurnaround')}:</strong> {service.turnaround[language]}
                  </span>
                </div>

              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-cream-200">
                <button
                  onClick={() => handleBookRepair(service)}
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rosewood-900 hover:bg-rosewood-800 text-brass-300 hover:text-white text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-brass-300 text-rosewood-900" />
                  <span>{t('btnBookRepair')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Master Tuning Guarantee Assurance Banner */}
        <div className="mt-12 max-w-4xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-brass-50 via-cream-100 to-brass-50 border border-brass-400/50 shadow-sm flex flex-col sm:flex-row items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-rosewood-900 text-brass-400 flex items-center justify-center flex-shrink-0 shadow">
            <Award className="w-8 h-8" />
          </div>
          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-rosewood-900 uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'संतोष जी की व्यक्तिगत सुर गारंटी' : "Santosh Ji's Personal Tuning Guarantee"}</span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
              {language === 'hi'
                ? 'हारमोनियम की रीड्स व पंखा हो या तबला-ढोलक की पूड़ी—प्रत्येक मरम्मत कार्य के उपरांत श्री संतोष कुमार शर्मा जी स्वयं वाद्य को बजाकर सुर व ताल की अंतिम पुष्टि करते हैं।'
                : 'Whether reed alignment, bellows sealing, or tabla pudi fitting—every repaired instrument undergoes rigorous musical testing and octave tuning by Shree Santosh Kumar Sharma before customer handover.'}
            </p>
          </div>
          <a
            href={`tel:${BUSINESS_CONFIG.musicDivision.phone1Raw}`}
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-rosewood-900 text-brass-300 hover:text-white text-xs font-semibold shadow hover:shadow-md transition-all whitespace-nowrap"
          >
            {language === 'hi' ? 'दुकान से परामर्श लें' : 'Consult Workshop'}
          </a>
        </div>

      </div>
    </section>
  );
};
