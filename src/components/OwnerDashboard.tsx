import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData, type SaveResult } from '../context/DataContext';
import type { InstrumentItem, RepairService, RepairCategory, InstrumentCategory } from '../types';
import { formatCurrency, fileToBase64, compressAndConvertImage, getBase64SizeKb } from '../utils/helpers';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  LogOut, 
  Layers, 
  Wrench, 
  Users, 
  Settings, 
  Download, 
  RefreshCw, 
  Key, 
  CheckCircle, 
  Clock, 
  Sparkles 
} from 'lucide-react';

interface OwnerDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type DashboardTab = 'instruments' | 'repairs' | 'generations' | 'settings';

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const {
    instruments,
    repairServices,
    generations,
    generationImages,
    cloudStatus,
    syncWithCloud,
    logoutOwner,
    addInstrument,
    updateInstrument,
    deleteInstrument,
    addRepairService,
    updateRepairService,
    deleteRepairService,
    updateGenerationImage,
    resetGenerationImage,
    exportBackupJson,
    importBackupJson,
    updateOwnerPin,
    resetAllToDefault
  } = useData();

  const [activeTab, setActiveTab] = useState<DashboardTab>('instruments');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[92vh] bg-white rounded-3xl border-2 border-brass-500 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-rosewood-900 text-brass-300 border border-brass-400 text-xs font-semibold shadow-royal flex items-center gap-2 animate-bounce">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Dashboard Top Header */}
        <div className="px-6 py-4 bg-rosewood-950 text-white flex flex-wrap items-center justify-between gap-4 border-b border-rosewood-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brass-600/30 border border-brass-500 flex items-center justify-center text-brass-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>{language === 'hi' ? 'दुकानदार नियंत्रण कक्ष' : 'Owner Admin Dashboard'}</span>
                {cloudStatus === 'connected' ? (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-800 text-emerald-200 font-sans font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{language === 'hi' ? 'सुपाबेस क्लाउड लाइव' : 'CLOUD LIVE'}</span>
                  </span>
                ) : cloudStatus === 'syncing' ? (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-amber-800 text-amber-200 font-sans font-semibold animate-pulse">
                    SYNCING...
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300 font-sans font-semibold">
                    LOCAL / READY
                  </span>
                )}
              </h2>
              <p className="text-xs text-brass-400">
                {language === 'hi' ? 'श्री संतोष कुमार शर्मा • जगन्नाथ म्यूजिकल' : 'Shree Santosh Kumar Sharma • Jagannath Musical'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                logoutOwner();
                onClose();
              }}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rosewood-900 hover:bg-rosewood-800 text-rose-300 text-xs font-semibold border border-rosewood-700 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'लॉगआउट' : 'Log Out'}</span>
            </button>

            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xl bg-rosewood-900 text-cream-200 hover:text-white hover:bg-rosewood-800 transition-colors"
              title="Close and view site"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Nav Tabs */}
        <div className="bg-cream-100 px-6 py-2 border-b border-brass-200 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('instruments')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'instruments'
                ? 'bg-rosewood-900 text-brass-300 shadow-sm border border-brass-500'
                : 'text-charcoal-muted hover:text-charcoal hover:bg-cream-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{language === 'hi' ? 'वाद्य यंत्र स्टॉक' : 'Instruments Stock'} ({instruments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('repairs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'repairs'
                ? 'bg-rosewood-900 text-brass-300 shadow-sm border border-brass-500'
                : 'text-charcoal-muted hover:text-charcoal hover:bg-cream-200'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>{language === 'hi' ? 'मरम्मत दर सूची' : 'Repair Fee Cards'} ({repairServices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('generations')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'generations'
                ? 'bg-rosewood-900 text-brass-300 shadow-sm border border-brass-500'
                : 'text-charcoal-muted hover:text-charcoal hover:bg-cream-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{language === 'hi' ? '4 पीढ़ियों के चित्र' : '4-Gen Portraits'}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-rosewood-900 text-brass-300 shadow-sm border border-brass-500'
                : 'text-charcoal-muted hover:text-charcoal hover:bg-cream-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{language === 'hi' ? 'बैकअप व सुरक्षा पिन' : 'Backup & PIN'}</span>
          </button>
        </div>

        {/* Tab Content Container (scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-cream-50">
          {activeTab === 'instruments' && (
            <InstrumentsManager
              instruments={instruments}
              onAdd={addInstrument}
              onUpdate={updateInstrument}
              onDelete={deleteInstrument}
              onNotify={showToast}
            />
          )}

          {activeTab === 'repairs' && (
            <RepairsManager
              repairServices={repairServices}
              onAdd={addRepairService}
              onUpdate={updateRepairService}
              onDelete={deleteRepairService}
              onNotify={showToast}
            />
          )}

          {activeTab === 'generations' && (
            <GenerationsManager
              generations={generations}
              generationImages={generationImages}
              onUpdateImage={updateGenerationImage}
              onResetImage={resetGenerationImage}
              onNotify={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsManager
              onExport={exportBackupJson}
              onImport={importBackupJson}
              onUpdatePin={updateOwnerPin}
              onResetAll={resetAllToDefault}
              onNotify={showToast}
              cloudStatus={cloudStatus}
              onSyncWithCloud={syncWithCloud}
            />
          )}
        </div>

        {/* Dashboard Bottom Status Bar */}
        <div className="px-6 py-2.5 bg-cream-100 border-t border-brass-200 flex items-center justify-between text-xs text-charcoal-muted">
          <span>
            {cloudStatus === 'connected'
              ? (language === 'hi'
                  ? '✓ सुपाबेस क्लाउड से जुड़ा हुआ है — बदलाव तुरंत सभी ग्राहकों के मोबाइल पर लाइव दिखेंगे।'
                  : '✓ Supabase Cloud connected — updates reflect live across all customer devices.')
              : (language === 'hi'
                  ? 'बदलाव तुरंत आपकी वेबसाइट पर लाइव लागू हो जाते हैं (स्थायी स्टोरेज सक्रिय)।'
                  : 'All updates are saved locally and reflect on the website immediately.')}
          </span>
          <button
            onClick={onClose}
            type="button"
            className="font-bold text-rosewood-900 hover:text-brass-700 underline"
          >
            {language === 'hi' ? 'वेबसाइट पर देखें →' : 'View on Website →'}
          </button>
        </div>

      </div>
    </div>
  );
};

/* ====================================================================
   SUB-COMPONENT 1: Instruments Manager
   ==================================================================== */
interface InstrumentsManagerProps {
  instruments: InstrumentItem[];
  onAdd: (item: Omit<InstrumentItem, 'id'>) => Promise<SaveResult> | SaveResult;
  onUpdate: (id: string, updated: Partial<InstrumentItem>) => Promise<SaveResult> | SaveResult;
  onDelete: (id: string) => Promise<SaveResult> | SaveResult;
  onNotify: (msg: string) => void;
}

const InstrumentsManager: React.FC<InstrumentsManagerProps> = ({
  instruments,
  onAdd,
  onUpdate,
  onDelete,
  onNotify
}) => {
  const { language } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // New instrument form state
  const [nameEn, setNameEn] = useState('');
  const [nameHi, setNameHi] = useState('');
  const [category, setCategory] = useState<InstrumentCategory>('harmonium');
  const [price, setPrice] = useState<number>(5000);
  const [inStock, setInStock] = useState(true);
  const [specEn, setSpecEn] = useState('');
  const [specHi, setSpecHi] = useState('');
  const [image, setImage] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [imageSizeKb, setImageSizeKb] = useState<number | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      setIsCompressing(true);
      try {
        const compressed = await compressAndConvertImage(file, 600, 0.7);
        setImage(compressed);
        setImageSizeKb(getBase64SizeKb(compressed));
      } catch (err) {
        console.error("Compression failed, using fallback:", err);
        const raw = await fileToBase64(file);
        setImage(raw);
        setImageSizeKb(getBase64SizeKb(raw));
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim() && !nameHi.trim()) {
      alert("Please provide at least an English or Hindi name.");
      return;
    }

    const res = await onAdd({
      name: {
        en: nameEn.trim() || nameHi.trim(),
        hi: nameHi.trim() || nameEn.trim(),
      },
      category: category as any,
      price: Number(price) || 0,
      inStock,
      image: image || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      specifications: {
        en: specEn.trim() || "Handcrafted with seasoned tone wood.",
        hi: specHi.trim() || "परिपक्व काष्ठ व शुद्ध सुरों से हस्तनिर्मित।"
      }
    });

    if (res.success) {
      setNameEn('');
      setNameHi('');
      setSpecEn('');
      setSpecHi('');
      setImage('');
      setImageFileName('');
      setImageSizeKb(null);
      setShowAddForm(false);
      onNotify(res.message);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg font-bold text-rosewood-950">
            {language === 'hi' ? 'दुकान वाद्य यंत्र स्टॉक सूची' : 'Current Store Inventory'}
          </h3>
          <p className="text-xs text-charcoal-muted">
            {language === 'hi' 
              ? 'यहाँ से आप नया वाद्य यंत्र जोड़ सकते हैं, मूल्य बदल सकते हैं अथवा स्टॉक स्थिति अपडेट कर सकते हैं।' 
              : 'Add new items, update prices, change photo, or toggle stock availability.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rosewood-900 hover:bg-rosewood-800 text-brass-300 text-xs sm:text-sm font-bold shadow transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Cancel Form' : (language === 'hi' ? '+ नया वाद्य यंत्र जोड़ें' : '+ Add New Instrument')}</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreateSubmit} className="bg-white rounded-2xl border-2 border-brass-400 p-5 sm:p-6 shadow-royal space-y-4">
          <h4 className="font-serif text-base font-bold text-rosewood-900 border-b pb-2">
            {language === 'hi' ? 'नए वाद्य यंत्र का विवरण भरें' : 'Add New Instrument Details'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Instrument Name (English) *
              </label>
              <input
                type="text"
                required
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. 7-Stopper Sheesham Harmonium"
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs outline-none focus:border-brass-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                वाद्य यंत्र का नाम (हिंदी) *
              </label>
              <input
                type="text"
                required
                value={nameHi}
                onChange={(e) => setNameHi(e.target.value)}
                placeholder="उदा. 7-स्टॉपर शीशम हारमोनियम"
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs outline-none focus:border-brass-600 font-serif-hi"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Category / श्रेणी
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs outline-none focus:border-brass-600"
              >
                <option value="harmonium">Harmonium (हारमोनियम)</option>
                <option value="tabla-dholak">Tabla & Dholak (तबला व ढोलक)</option>
                <option value="naal-jhal">Naal & Jhal (नाल व झाल)</option>
                <option value="keyboards-others">Keyboards & Others (कीबोर्ड व अन्य)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Price in ₹ (मूल्य)
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs outline-none focus:border-brass-600 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Specification (English)
              </label>
              <textarea
                rows={2}
                value={specEn}
                onChange={(e) => setSpecEn(e.target.value)}
                placeholder="Wood type, reed brand, number of keys, etc."
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs outline-none focus:border-brass-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                विशिष्टता (हिंदी)
              </label>
              <textarea
                rows={2}
                value={specHi}
                onChange={(e) => setSpecHi(e.target.value)}
                placeholder="लकड़ी का प्रकार, रीड कंपनी, चाबी संख्या आदि"
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs outline-none focus:border-brass-600 font-serif-hi"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cream-100 border border-brass-200 space-y-2">
            <span className="block text-xs font-bold text-charcoal">
              Photo Upload (Upload from Phone/PC or paste URL)
            </span>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-rosewood-900 text-brass-300 hover:text-white text-xs font-semibold">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {imageFileName && (
                <span className="text-xs text-charcoal-muted truncate max-w-xs">
                  {imageFileName}
                </span>
              )}
              <span className="text-xs text-charcoal-muted">or URL:</span>
              <input
                type="text"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setImageSizeKb(null);
                }}
                placeholder="https://..."
                className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-brass-300 text-xs"
              />
            </div>
            {isCompressing && (
              <p className="text-xs text-brass-700 animate-pulse font-medium">
                ⏳ Compressing photo for permanent storage... (फोटो कंप्रेस हो रही है...)
              </p>
            )}
            {image && (
              <div className="mt-2 flex items-center gap-3">
                <span className="text-[11px] text-charcoal-muted">Preview:</span>
                <img src={image} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-brass-400" />
                {imageSizeKb !== null && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    ✓ ~{imageSizeKb} KB • Compressed for permanent storage
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="instock-check"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-4 h-4 rounded text-rosewood-900"
            />
            <label htmlFor="instock-check" className="text-xs font-bold text-charcoal">
              Available In Stock (रेडी स्टॉक में उपलब्ध)
            </label>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal-muted hover:bg-cream-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow"
            >
              Save Instrument
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-brass-300 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-rosewood-900 text-brass-300 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Photo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price (₹)</th>
                <th className="p-3">Stock Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {instruments.map((item) => (
                <tr key={item.id} className="hover:bg-cream-50 transition-colors">
                  <td className="p-3">
                    <img
                      src={item.image}
                      alt={item.name.en}
                      className="w-10 h-10 object-cover rounded-lg border border-brass-300"
                    />
                  </td>

                  <td className="p-3">
                    <div className="font-bold text-rosewood-950 font-serif">
                      {item.name[language]}
                    </div>
                    <div className="text-[10px] text-charcoal-muted line-clamp-1">
                      {item.specifications[language]}
                    </div>
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-cream-200 text-charcoal font-medium text-[10px]">
                      {item.category}
                    </span>
                  </td>

                  <td className="p-3 font-bold font-serif text-rosewood-900">
                    {editingId === item.id ? (
                      <input
                        type="number"
                        defaultValue={item.price}
                        onBlur={async (e) => {
                          const res = await onUpdate(item.id, { price: Number(e.target.value) });
                          setEditingId(null);
                          onNotify(res.message);
                        }}
                        className="w-20 px-2 py-1 border border-brass-400 rounded text-xs font-bold"
                        autoFocus
                      />
                    ) : (
                      <span 
                        onClick={() => setEditingId(item.id)}
                        className="cursor-pointer hover:underline"
                        title="Click to edit price"
                      >
                        {formatCurrency(item.price)}
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    <button
                      type="button"
                      onClick={async () => {
                        const res = await onUpdate(item.id, { inStock: !item.inStock });
                        onNotify(res.message);
                      }}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                        item.inStock 
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      {item.inStock ? 'In Stock (उपलब्ध)' : 'Out of Stock (ऑर्डर पर)'}
                    </button>
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={async () => {
                          const newPrice = prompt("Enter new price in ₹:", item.price.toString());
                          if (newPrice !== null && !isNaN(Number(newPrice))) {
                            const res = await onUpdate(item.id, { price: Number(newPrice) });
                            onNotify(res.message);
                          }
                        }}
                        className="p-1.5 rounded-lg text-brass-700 hover:bg-cream-200"
                        title="Edit Price"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={async () => {
                          if (confirm(`Delete "${item.name[language]}"?`)) {
                            const res = await onDelete(item.id);
                            onNotify(res.message);
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                        title="Delete Instrument"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

/* ====================================================================
   SUB-COMPONENT 2: Repairs Rate Card Manager
   ==================================================================== */
interface RepairsManagerProps {
  repairServices: RepairService[];
  onAdd: (service: Omit<RepairService, 'id'>) => Promise<SaveResult> | SaveResult;
  onUpdate: (id: string, updated: Partial<RepairService>) => Promise<SaveResult> | SaveResult;
  onDelete: (id: string) => Promise<SaveResult> | SaveResult;
  onNotify: (msg: string) => void;
}

const RepairsManager: React.FC<RepairsManagerProps> = ({
  repairServices,
  onAdd,
  onUpdate,
  onDelete,
  onNotify
}) => {
  const { language } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState<RepairCategory | 'all'>('all');

  const [category, setCategory] = useState<RepairCategory>('harmonium');
  const [nameEn, setNameEn] = useState('');
  const [nameHi, setNameHi] = useState('');
  const [fee, setFee] = useState<number>(300);
  const [descEn, setDescEn] = useState('');
  const [descHi, setDescHi] = useState('');
  const [turnaroundEn, setTurnaroundEn] = useState('Same Day');
  const [turnaroundHi, setTurnaroundHi] = useState('उसी दिन');

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim() && !nameHi.trim()) {
      alert("Please provide a service name.");
      return;
    }

    const res = await onAdd({
      category,
      serviceName: {
        en: nameEn.trim() || nameHi.trim(),
        hi: nameHi.trim() || nameEn.trim(),
      },
      startingFee: Number(fee) || 100,
      description: {
        en: descEn.trim() || "Expert repair & acoustic tuning.",
        hi: descHi.trim() || "विशेषज्ञ कारीगरी व सुर ट्यूनिंग।"
      },
      turnaround: {
        en: turnaroundEn.trim() || "24 Hours",
        hi: turnaroundHi.trim() || "24 घंटे"
      }
    });

    if (res.success) {
      setNameEn('');
      setNameHi('');
      setDescEn('');
      setDescHi('');
      setShowAddForm(false);
      onNotify(res.message);
    } else {
      alert(res.message);
    }
  };

  const filteredServices = filterCategory === 'all'
    ? repairServices
    : repairServices.filter(s => s.category === filterCategory);

  return (
    <div className="space-y-6">
      
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg font-bold text-rosewood-950">
            {language === 'hi' ? 'मरम्मत दर कार्ड प्रबंधन' : 'Repair Services & Rate Cards'}
          </h3>
          <p className="text-xs text-charcoal-muted">
            {language === 'hi'
              ? 'हारमोनियम, नाल, ढोलक व तबले की मरम्मत दरों का संपादन करें।'
              : 'Configure starting repair fees, service names, and turnaround estimates.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rosewood-900 hover:bg-rosewood-800 text-brass-300 text-xs sm:text-sm font-bold shadow transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Cancel' : (language === 'hi' ? '+ नई मरम्मत सेवा जोड़ें' : '+ Add Repair Service')}</span>
        </button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {(['all', 'harmonium', 'tabla', 'dholak', 'naal'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize ${
              filterCategory === cat
                ? 'bg-rosewood-900 text-brass-300'
                : 'bg-white border border-brass-200 text-charcoal'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-white rounded-2xl border-2 border-brass-400 p-5 shadow-royal space-y-4">
          <h4 className="font-serif text-sm font-bold text-rosewood-900 border-b pb-2">
            {language === 'hi' ? 'नई मरम्मत सेवा प्रविष्टि' : 'New Repair Service Entry'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Instrument Category / वाद्य प्रकार
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs outline-none"
              >
                <option value="harmonium">Harmonium (हारमोनियम)</option>
                <option value="tabla">Tabla (तबला)</option>
                <option value="dholak">Dholak (ढोलक)</option>
                <option value="naal">Naal (नाल)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Starting Fee in ₹ (शुरुआती शुल्क)
              </label>
              <input
                type="number"
                min="0"
                step="20"
                value={fee}
                onChange={(e) => setFee(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Service Name (English)
              </label>
              <input
                type="text"
                required
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Master Sur Tuning"
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                सेवा का नाम (हिंदी)
              </label>
              <input
                type="text"
                required
                value={nameHi}
                onChange={(e) => setNameHi(e.target.value)}
                placeholder="उदा. संपूर्ण सुर मिलाना"
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs outline-none font-serif-hi"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Turnaround Time (English)
              </label>
              <input
                type="text"
                value={turnaroundEn}
                onChange={(e) => setTurnaroundEn(e.target.value)}
                placeholder="e.g. Same Day / 24 Hours"
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                कार्य अवधि (हिंदी)
              </label>
              <input
                type="text"
                value={turnaroundHi}
                onChange={(e) => setTurnaroundHi(e.target.value)}
                placeholder="उदा. उसी दिन / 24 घंटे"
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs outline-none font-serif-hi"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs text-charcoal-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow"
            >
              Save Repair Service
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-brass-300 p-4 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-brass-700 uppercase">
                    {service.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-rosewood-950">
                    {service.serviceName[language]}
                  </h4>
                </div>

                <div className="text-right">
                  <span className="text-base font-serif font-extrabold text-rosewood-900 block">
                    {formatCurrency(service.startingFee)}+
                  </span>
                  <button
                    onClick={async () => {
                      const newFee = prompt("Enter new starting fee in ₹:", service.startingFee.toString());
                      if (newFee !== null && !isNaN(Number(newFee))) {
                        const res = await onUpdate(service.id, { startingFee: Number(newFee) });
                        onNotify(res.message);
                      }
                    }}
                    className="text-[10px] text-brass-700 underline"
                  >
                    Edit Fee
                  </button>
                </div>
              </div>

              <p className="text-xs text-charcoal-muted mt-2">
                {service.description[language]}
              </p>

              <div className="mt-2 text-[11px] text-charcoal flex items-center gap-1">
                <Clock className="w-3 h-3 text-brass-600" />
                <span>{service.turnaround[language]}</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-cream-200 flex items-center justify-end gap-2">
              <button
                onClick={async () => {
                  if (confirm(`Delete service "${service.serviceName[language]}"?`)) {
                    const res = await onDelete(service.id);
                    onNotify(res.message);
                  }
                }}
                className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

/* ====================================================================
   SUB-COMPONENT 3: 4-Generation Portraits Manager
   ==================================================================== */
interface GenerationsManagerProps {
  generations: any[];
  generationImages: Record<number, string>;
  onUpdateImage: (genId: number, base64OrUrl: string) => Promise<SaveResult> | SaveResult;
  onResetImage: (genId: number) => Promise<SaveResult> | SaveResult;
  onNotify: (msg: string) => void;
}

const GenerationsManager: React.FC<GenerationsManagerProps> = ({
  generations,
  generationImages,
  onUpdateImage,
  onResetImage,
  onNotify
}) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      
      <div>
        <h3 className="font-serif text-lg font-bold text-rosewood-950">
          {language === 'hi' ? '4 पीढ़ियों के चित्र व फोटो प्रबंधन' : '4-Generation Heritage Portrait Management'}
        </h3>
        <p className="text-xs text-charcoal-muted">
          {language === 'hi'
            ? 'आप अपने मोबाइल या कंप्यूटर से चारों पीढ़ियों (परदादा, दादा, पिता व स्वयं) की वास्तविक तस्वीरें यहाँ अपलोड कर सकते हैं।'
            : 'Upload high-resolution portraits for each generation directly from your phone/computer.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {generations.map((gen) => {
          const currentImage = generationImages[gen.id] || gen.defaultImage;
          const isOverridden = Boolean(generationImages[gen.id]);

          const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              try {
                const compressed = await compressAndConvertImage(file, 600, 0.7);
                const res = await onUpdateImage(gen.id, compressed);
                onNotify(res.message);
              } catch (err) {
                console.error("Portrait compression failed, using fallback:", err);
                const raw = await fileToBase64(file);
                const res = await onUpdateImage(gen.id, raw);
                onNotify(res.message);
              }
            }
          };

          return (
            <div
              key={gen.id}
              className="bg-white rounded-2xl border-2 border-brass-300 p-5 shadow-royal space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b pb-2 mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-brass-700 uppercase">
                      {gen.generationTitle[language]}
                    </span>
                    <h4 className="font-serif text-base font-bold text-rosewood-950">
                      {gen.personName[language]}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cream-200 text-rosewood-900 text-xs font-bold font-serif">
                    Gen {gen.id}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-24 h-32 rounded-xl bg-rosewood-950 border-2 border-brass-500 overflow-hidden flex-shrink-0 shadow">
                    <img
                      src={currentImage}
                      alt={gen.personName[language]}
                      onError={(e) => {
                        (e.target as any).src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80";
                      }}
                      className="w-full h-full object-cover filter grayscale"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-rosewood-900 hover:bg-rosewood-800 text-brass-300 hover:text-white text-xs font-bold transition-all shadow-sm">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'नया फोटो अपलोड करें' : 'Upload New Portrait'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        className="hidden"
                      />
                    </label>

                    <div className="text-[11px] text-charcoal-muted">
                      {isOverridden ? (
                        <span className="text-emerald-700 font-semibold block">
                          ✓ {language === 'hi' ? 'मालिक द्वारा अपलोड किया गया चित्र सक्रिय है' : 'Custom uploaded photo is active'}
                        </span>
                      ) : (
                        <span className="block">
                          {language === 'hi' ? 'डिफ़ॉल्ट फ़ाइल पाथ: ' : 'Default path: '}
                          <code className="bg-cream-200 px-1 py-0.5 rounded text-[10px]">{gen.defaultImage}</code>
                        </span>
                      )}
                    </div>

                    {isOverridden && (
                      <button
                        onClick={async () => {
                          const res = await onResetImage(gen.id);
                          onNotify(res.message);
                        }}
                        type="button"
                        className="text-xs text-rose-600 hover:underline block"
                      >
                        {language === 'hi' ? 'हटाएं व डिफ़ॉल्ट पर रीसेट करें' : 'Reset to Default'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-xs text-charcoal-muted font-light pt-2 border-t">
                {gen.badge[language]}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

/* ====================================================================
   SUB-COMPONENT 4: Settings, Backup & PIN
   ==================================================================== */
interface SettingsManagerProps {
  onExport: () => string;
  onImport: (json: string) => Promise<SaveResult> | SaveResult;
  onUpdatePin: (curr: string, next: string) => Promise<SaveResult> | SaveResult;
  onResetAll: () => Promise<void> | void;
  onNotify: (msg: string) => void;
  cloudStatus: 'connected' | 'offline' | 'syncing';
  onSyncWithCloud: () => Promise<void>;
}

const SettingsManager: React.FC<SettingsManagerProps> = ({
  onExport,
  onImport,
  onUpdatePin,
  onResetAll,
  onNotify,
  cloudStatus,
  onSyncWithCloud
}) => {
  const { language } = useLanguage();
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinMsg, setPinMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleExport = () => {
    const dataStr = onExport();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jagannath-musical-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    onNotify(language === 'hi' ? 'डेटा बैकअप फाइल डाउनलोड हो गई!' : 'Backup JSON file exported successfully!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const text = event.target?.result as string;
        const res = await onImport(text);
        if (res.success) {
          onNotify(res.message);
        } else {
          alert(res.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await onUpdatePin(currentPin, newPin);
    if (res.success) {
      setPinMsg({ text: res.message, isError: false });
      setCurrentPin('');
      setNewPin('');
      onNotify(res.message);
    } else {
      setPinMsg({ text: res.message, isError: true });
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      
      {/* Supabase Cloud Connection & SQL Setup Card */}
      <div className="bg-white rounded-2xl border-2 border-brass-400 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rosewood-900 text-brass-300 flex items-center justify-center font-bold text-lg">
              ☁️
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-rosewood-950 flex items-center gap-2">
                <span>{language === 'hi' ? 'सुपाबेस क्लाउड डेटाबेस स्थिति' : 'Supabase Cloud Database Status'}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  cloudStatus === 'connected' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : cloudStatus === 'syncing'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-zinc-100 text-zinc-800'
                }`}>
                  {cloudStatus === 'connected' ? '● Connected & Synced' : cloudStatus === 'syncing' ? 'Syncing...' : 'Pending Table Creation'}
                </span>
              </h4>
              <p className="text-xs text-charcoal-muted">
                {language === 'hi'
                  ? 'यह वेबसाइट सुपाबेस क्लाउड डेटाबेस से जुड़ी है जिससे सभी ग्राहकों को मोबाइल/कंप्यूटर पर तुरंत लाइव स्टॉक व दरें दिखेंगी।'
                  : 'Connected to Supabase PostgreSQL cloud so stock and prices update across every customer device in real time.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              await onSyncWithCloud();
              onNotify("Checked Cloud Database!");
            }}
            className="px-3.5 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-rosewood-900 text-xs font-bold border border-brass-300 transition-colors"
          >
            {language === 'hi' ? 'क्लाउड रिफ्रेश करें' : 'Refresh Cloud Sync'}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-rosewood-950 text-cream-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brass-300 uppercase tracking-wider">
              Supabase SQL Editor Query:
            </span>
            <button
              type="button"
              onClick={() => {
                const sql = `create table if not exists shop_data (\n  id text primary key,\n  data jsonb not null,\n  updated_at timestamptz default now()\n);\nalter table shop_data enable row level security;\ndrop policy if exists "Allow all access" on shop_data;\ncreate policy "Allow all access" on shop_data for all using (true) with check (true);`;
                navigator.clipboard.writeText(sql);
                onNotify(language === 'hi' ? 'SQL कॉपी हो गई!' : 'SQL Query Copied to Clipboard!');
              }}
              className="px-2.5 py-1 rounded bg-brass-600 hover:bg-brass-500 text-rosewood-950 text-xs font-bold transition-all"
            >
              Copy 4-Line SQL
            </button>
          </div>
          <pre className="text-[11px] font-mono bg-black/40 p-3 rounded-lg overflow-x-auto text-emerald-300 leading-relaxed select-all">
{`create table if not exists shop_data (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);
alter table shop_data enable row level security;
drop policy if exists "Allow all access" on shop_data;
create policy "Allow all access" on shop_data for all using (true) with check (true);`}
          </pre>
          <p className="text-[11px] text-brass-400">
            {language === 'hi'
              ? 'सुपाबेस डैशबोर्ड में SQL Editor खोलें, यह 4 लाइन पेस्ट करके Run दबाएं। इसके बाद सभी बदलाव हमेशा क्लाउड में सुरक्षित रहेंगे।'
              : 'Paste this 4-line SQL in Supabase SQL Editor and click RUN to enable cloud multi-device sync.'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brass-300 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brass-100 text-brass-700 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-base font-bold text-rosewood-950">
              {language === 'hi' ? 'दुकानदार सुरक्षा पिन बदलें' : 'Change Owner Security PIN'}
            </h4>
            <p className="text-xs text-charcoal-muted">
              {language === 'hi'
                ? 'पोर्टल लॉगिन हेतु नया 4-10 अंकों का पिन सेट करें (डिफ़ॉल्ट: 232329)'
                : 'Set a custom 4-10 digit PIN to secure your owner dashboard.'}
            </p>
          </div>
        </div>

        <form onSubmit={handlePinSubmit} className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Current PIN (वर्तमान पिन)
              </label>
              <input
                type="password"
                required
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value)}
                placeholder="232329"
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                New PIN (नया पिन)
              </label>
              <input
                type="password"
                required
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="••••••"
                className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-brass-300 text-xs font-bold outline-none"
              />
            </div>
          </div>

          {pinMsg && (
            <div className={`p-2.5 rounded-xl text-xs font-semibold ${
              pinMsg.isError ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
            }`}>
              {pinMsg.text}
            </div>
          )}

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-rosewood-900 text-brass-300 hover:text-white text-xs font-bold shadow"
          >
            Update PIN
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-brass-300 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brass-100 text-brass-700 flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-base font-bold text-rosewood-950">
              {language === 'hi' ? 'डेटा बैकअप एवं रिस्टोर' : 'Data Backup & Import / Export'}
            </h4>
            <p className="text-xs text-charcoal-muted">
              {language === 'hi'
                ? 'अपने पूरे स्टॉक, मरम्मत शुल्क व फोटो का सुरक्षित बैकअप डाउनलोड करें अथवा किसी दूसरे कंप्यूटर/मोबाइल पर अपलोड करें।'
                : 'Download a JSON file containing all products, repair rates, and portraits, or restore from a previous backup.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExport}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brass-600 hover:bg-brass-500 text-rosewood-950 font-bold text-xs shadow"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'hi' ? 'बैकअप डाउनलोड करें (JSON)' : 'Download Backup JSON'}</span>
          </button>

          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-rosewood-900 font-bold text-xs border border-brass-300">
            <Upload className="w-4 h-4" />
            <span>{language === 'hi' ? 'बैकअप रिस्टोर करें (Upload)' : 'Restore from JSON File'}</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="bg-rose-50 rounded-2xl border border-rose-200 p-6 space-y-3">
        <h4 className="font-serif text-base font-bold text-rose-900">
          {language === 'hi' ? 'फ़ैक्टरी रीसेट (आरंभिक डेटा बहाल करें)' : 'Factory Reset to Initial Data'}
        </h4>
        <p className="text-xs text-rose-700 leading-relaxed">
          {language === 'hi'
            ? 'चेतावनी: यह विकल्प आपके द्वारा जोड़े गए सभी नए उत्पादों और शुल्कों को हटाकर वेबसाइट को शुरुआत वाली स्थिति में ला देगा।'
            : 'Warning: This will clear custom localStorage changes and restore original factory sample data and default PIN (232329).'}
        </p>
        <button
          onClick={async () => {
            if (confirm("Are you sure you want to reset everything back to factory defaults?")) {
              await onResetAll();
              onNotify("Reset to defaults complete!");
            }
          }}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All to Default</span>
        </button>
      </div>

    </div>
  );
};
