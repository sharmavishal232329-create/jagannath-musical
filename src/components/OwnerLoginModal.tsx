import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Lock, KeyRound, X, AlertCircle, Shield } from 'lucide-react';

interface OwnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const OwnerLoginModal: React.FC<OwnerLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { language } = useLanguage();
  const { loginOwner } = useData();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setError(language === 'hi' ? 'कृपया अपना पिन दर्ज करें।' : 'Please enter your PIN.');
      return;
    }

    const success = loginOwner(pin);
    if (success) {
      setError('');
      setPin('');
      onSuccess();
    } else {
      setError(language === 'hi' ? 'गलत पिन! कृपया पुनः प्रयास करें।' : 'Incorrect PIN. Please try again.');
    }
  };

  const handleUseDefaultPin = () => {
    setPin('232329');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl border-2 border-brass-400 p-6 sm:p-8 shadow-royal-lg space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-cream-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-rosewood-900 text-brass-400 flex items-center justify-center mx-auto shadow">
            <Shield className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-rosewood-950">
            {language === 'hi' ? 'दुकानदार प्रबंधन पोर्टल' : 'Shop Owner Admin Access'}
          </h3>
          <p className="text-xs text-charcoal-muted">
            {language === 'hi' 
              ? 'श्री संतोष कुमार शर्मा जी हेतु स्टॉक, मरम्मत शुल्क व चित्र संपादन'
              : 'Direct live editing for Shree Santosh Kumar Sharma'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">
              {language === 'hi' ? 'मालिक सुरक्षा पिन (PIN) दर्ज करें' : 'Enter Owner PIN'}
            </label>
            <div className="relative">
              <KeyRound className="w-5 h-5 text-brass-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                maxLength={10}
                placeholder="••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-cream-100 border border-brass-300 focus:border-brass-600 focus:ring-2 focus:ring-brass-500/20 text-center tracking-widest text-lg font-bold text-rosewood-950 outline-none"
                autoFocus
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-rosewood-900 hover:bg-rosewood-800 text-brass-300 hover:text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>{language === 'hi' ? 'पोर्टल में प्रवेश करें' : 'Unlock Dashboard'}</span>
          </button>
        </form>

        {/* Helpful Default PIN Hint */}
        <div className="p-3.5 rounded-2xl bg-brass-50 border border-brass-200 text-xs text-brass-900 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-rosewood-900">
              {language === 'hi' ? 'डिफ़ॉल्ट सुरक्षा पिन (Zamania Pincode):' : 'Default Security PIN (Zamania PIN):'}
            </span>
            <button
              onClick={handleUseDefaultPin}
              type="button"
              className="text-[11px] font-bold text-brass-700 hover:underline bg-white px-2 py-0.5 rounded border border-brass-300"
            >
              Fill 232329
            </button>
          </div>
          <p className="text-[11px] text-charcoal-muted leading-tight">
            {language === 'hi'
              ? 'प्रारंभिक पिन 232329 है। डैशबोर्ड के भीतर Settings टैब से आप कभी भी नया पिन सेट कर सकते हैं।'
              : 'Default PIN is 232329. You can change this to a personalized PIN inside dashboard settings.'}
          </p>
        </div>

      </div>
    </div>
  );
};
