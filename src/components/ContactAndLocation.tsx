import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../data/initialData';
import { createWhatsAppUrl } from '../utils/helpers';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Sparkles, 
  Navigation, 
  Share2 
} from 'lucide-react';

export const ContactAndLocation: React.FC = () => {
  const { language, t } = useLanguage();
  const music = BUSINESS_CONFIG.musicDivision;
  const furniture = BUSINESS_CONFIG.furnitureDivision;

  const handleShareAddress = () => {
    const text = `Jagannath Musical & Furniture\nAddress: ${BUSINESS_CONFIG.address.en}\nContact Santosh Sharma (Musical): +91 8787219674 / +91 9935315824\nContact Sanjay Sharma (Furniture): +91 88400 57772\nZamania, Ghazipur, UP`;
    if (navigator.share) {
      navigator.share({
        title: 'Jagannath Musical & Furniture',
        text: text,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(language === 'hi' ? 'प्रतिष्ठान का पता कॉपी कर लिया गया है!' : 'Store address copied to clipboard!');
    }
  };

  return (
    <section id="contact" className="py-20 bg-cream-50 relative border-b border-brass-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brass-100 border border-brass-400/40 text-rosewood-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brass-700" />
            <span>{t('contactBadge')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-rosewood-950">
            {t('contactTitle')}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brass-500 to-transparent mx-auto mt-2" />

          <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed">
            {t('contactSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="bg-white rounded-2xl border border-brass-300 p-6 shadow-royal space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brass-500/10 border border-brass-400/40 text-brass-700 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-brass-700 uppercase tracking-wider block">
                    {t('addressLabel')}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-rosewood-950">
                    {BUSINESS_CONFIG.name[language]}
                  </h3>
                  <p className="text-sm text-charcoal font-medium leading-snug">
                    {BUSINESS_CONFIG.address[language]}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-cream-200">
                <a
                  href="https://maps.google.com/?q=Zamania+Kasba+Ghazipur+232329"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rosewood-900 text-brass-300 text-xs font-semibold hover:bg-rosewood-800 transition-all shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'गूगल मैप्स दिशा' : 'Get Directions'}</span>
                </a>

                <button
                  onClick={handleShareAddress}
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cream-200 hover:bg-cream-300 text-charcoal text-xs font-medium border border-brass-300/40 transition-all"
                  title="Share Address"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{language === 'hi' ? 'शेयर करें' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Division A: Musical Instruments Contact */}
            <div className="bg-white rounded-2xl border-2 border-brass-400/50 p-6 shadow-royal space-y-4">
              <div className="flex items-center justify-between border-b border-cream-200 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-rosewood-800 uppercase tracking-wider block">
                    {t('musicProprietorLabel')}
                  </span>
                  <h4 className="font-serif text-base font-bold text-rosewood-950">
                    {music.proprietor[language]}
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded bg-brass-100 text-brass-800 text-[10px] font-bold uppercase">
                  Musical Store
                </span>
              </div>

              <div className="space-y-2.5">
                {/* Number 1 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-cream-100 border border-brass-200">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-rosewood-800" />
                    <div>
                      <span className="font-serif text-sm font-bold text-rosewood-950 block">
                        {music.phone1}
                      </span>
                      <span className="text-[10px] text-charcoal-muted">
                        {language === 'hi' ? 'प्राथमिक कॉल व WhatsApp' : 'Primary Call & WhatsApp'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${music.phone1Raw}`}
                      className="p-2 rounded-lg bg-white hover:bg-rosewood-100 text-rosewood-900 border border-brass-300 transition-colors shadow-xs"
                      title="Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={createWhatsAppUrl(music.primaryWhatsApp, "नमस्ते संतोष जी, मैं 'जगन्नाथ म्यूजिकल' से वाद्य यंत्र के संबंध में जानकारी चाहता हूँ।")}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    </a>
                  </div>
                </div>

                {/* Number 2 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-cream-100 border border-brass-200">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-rosewood-800" />
                    <div>
                      <span className="font-serif text-sm font-bold text-rosewood-950 block">
                        {music.phone2}
                      </span>
                      <span className="text-[10px] text-charcoal-muted">
                        {language === 'hi' ? 'अतिरिक्त संपर्क नंबर' : 'Alternate Contact Number'}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`tel:${music.phone2Raw}`}
                    className="p-2 rounded-lg bg-white hover:bg-rosewood-100 text-rosewood-900 border border-brass-300 transition-colors shadow-xs"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Division B: Furniture Wing Contact Quick Card */}
            <div className="bg-rosewood-950 text-cream-100 rounded-2xl border border-brass-500/40 p-5 shadow-royal space-y-3">
              <div className="flex items-center justify-between border-b border-rosewood-800 pb-2">
                <div>
                  <span className="text-[10px] font-bold text-brass-400 uppercase tracking-wider block">
                    {t('furnitureProprietorLabel')}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-white">
                    {furniture.sanchalakShort[language]}
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded bg-rosewood-800 text-brass-300 text-[10px] font-bold uppercase">
                  Furniture Wing
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-serif text-base font-bold text-brass-300 block">
                    {furniture.phone}
                  </span>
                  <span className="text-[10px] text-cream-300/70">
                    {language === 'hi' ? 'कस्टम फर्नीचर ऑर्डर व पूछताछ' : 'Custom Woodwork & Orders'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${furniture.phoneRaw}`}
                    className="p-2 rounded-lg bg-rosewood-800 hover:bg-rosewood-700 text-brass-300 border border-rosewood-700 shadow-xs"
                    title="Call Sanjay Ji"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={createWhatsAppUrl(furniture.whatsApp, "नमस्ते संजय जी, मुझे फर्नीचर के संबंध में जानकारी चाहिए।")}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs"
                    title="WhatsApp Sanjay Ji"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Visiting Hours Card */}
            <div className="bg-cream-100 rounded-2xl border border-brass-200 p-4 flex items-center gap-3 text-charcoal">
              <Clock className="w-5 h-5 text-brass-700 flex-shrink-0" />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted block">
                  {t('visitingHoursLabel')}
                </span>
                <span className="text-xs sm:text-sm font-semibold">
                  {t('visitingHoursVal')}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps & Local Landmarks (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl border-2 border-brass-400/50 p-2 shadow-royal overflow-hidden">
              <div className="relative w-full h-[400px] sm:h-[460px] rounded-2xl overflow-hidden bg-rosewood-900">
                <iframe
                  title="Jagannath Musical & Furniture Location"
                  src={BUSINESS_CONFIG.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter contrast-105"
                />

                {/* Floating location card on map */}
                <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-xs bg-rosewood-950/95 backdrop-blur-md p-3.5 rounded-xl border border-brass-500/50 text-white shadow-royal text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-brass-300">
                    <MapPin className="w-4 h-4 text-brass-400" />
                    <span>{BUSINESS_CONFIG.name[language]}</span>
                  </div>
                  <p className="text-[11px] text-cream-300">
                    {BUSINESS_CONFIG.address[language]}
                  </p>
                </div>
              </div>
            </div>

            {/* Landmark Guidance Card */}
            <div className="bg-white rounded-2xl border border-brass-200 p-5 shadow-sm space-y-2">
              <h4 className="font-serif text-sm font-bold text-rosewood-950">
                {language === 'hi' ? 'दुकान तक कैसे पहुंचे (स्थानीय पहचान):' : 'How to Reach (Local Landmarks):'}
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {language === 'hi'
                  ? 'हमारा प्रतिष्ठान गाज़ीपुर जिले के ऐतिहासिक ज़मानिया कस्बे में सोनार टोली में स्थित है। ज़मानिया रेलवे स्टेशन अथवा बस स्टैंड से ऑटो/टोटो द्वारा सोनार टोली मुख्य मार्ग पर आसानी से पहुँचा जा सकता है।'
                  : 'Located in Sonar Toli within historical Zamania Kasba, Ghazipur. Conveniently reachable via local e-rickshaws or autos from Zamania Railway Station & Bus Stand.'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
