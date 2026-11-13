import React, { createContext, useContext, useState, useEffect } from 'react';
import type { InstrumentItem, RepairService, GenerationInfo } from '../types';
import { INITIAL_INSTRUMENTS, INITIAL_REPAIR_SERVICES, INITIAL_GENERATIONS } from '../data/initialData';

interface DataContextType {
  instruments: InstrumentItem[];
  repairServices: RepairService[];
  generations: GenerationInfo[];
  generationImages: Record<number, string>;
  isAuthenticated: boolean;
  loginOwner: (pin: string) => boolean;
  logoutOwner: () => void;
  updateOwnerPin: (currentPin: string, newPin: string) => { success: boolean; message: string };
  
  // Instrument actions
  addInstrument: (instrument: Omit<InstrumentItem, 'id'>) => void;
  updateInstrument: (id: string, updated: Partial<InstrumentItem>) => void;
  deleteInstrument: (id: string) => void;
  
  // Repair service actions
  addRepairService: (service: Omit<RepairService, 'id'>) => void;
  updateRepairService: (id: string, updated: Partial<RepairService>) => void;
  deleteRepairService: (id: string) => void;
  
  // Generation portraits
  updateGenerationImage: (genId: number, imageUrlOrBase64: string) => void;
  resetGenerationImage: (genId: number) => void;

  // Backup & Reset
  exportBackupJson: () => string;
  importBackupJson: (jsonString: string) => { success: boolean; message: string };
  resetAllToDefault: () => void;
}

const STORAGE_KEYS = {
  INSTRUMENTS: 'jagannath_instruments_v1',
  REPAIRS: 'jagannath_repairs_v1',
  GEN_IMAGES: 'jagannath_gen_images_v1',
  OWNER_PIN: 'jagannath_owner_pin_v1',
  AUTH: 'jagannath_auth_v1',
};

const DEFAULT_PIN = "232329";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Instruments state
  const [instruments, setInstruments] = useState<InstrumentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INSTRUMENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading saved instruments", e);
    }
    return INITIAL_INSTRUMENTS;
  });

  // Repair services state
  const [repairServices, setRepairServices] = useState<RepairService[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REPAIRS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading saved repairs", e);
    }
    return INITIAL_REPAIR_SERVICES;
  });

  // Generation image overrides (genId -> dataURL/url)
  const [generationImages, setGenerationImages] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GEN_IMAGES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading saved generation images", e);
    }
    return {};
  });

  // Owner PIN
  const [ownerPin, setOwnerPin] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.OWNER_PIN) || DEFAULT_PIN;
  });

  // Authentication session
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INSTRUMENTS, JSON.stringify(instruments));
  }, [instruments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(repairServices));
  }, [repairServices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GEN_IMAGES, JSON.stringify(generationImages));
  }, [generationImages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OWNER_PIN, ownerPin);
  }, [ownerPin]);

  // Auth methods
  const loginOwner = (pin: string): boolean => {
    if (pin.trim() === ownerPin.trim()) {
      setIsAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutOwner = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const updateOwnerPin = (currentPin: string, newPin: string): { success: boolean; message: string } => {
    if (currentPin.trim() !== ownerPin.trim()) {
      return { success: false, message: "Current PIN is incorrect." };
    }
    if (!newPin || newPin.trim().length < 4) {
      return { success: false, message: "New PIN must be at least 4 digits." };
    }
    setOwnerPin(newPin.trim());
    return { success: true, message: "Owner PIN updated successfully." };
  };

  // Instrument Actions
  const addInstrument = (instrument: Omit<InstrumentItem, 'id'>) => {
    const newItem: InstrumentItem = {
      ...instrument,
      id: `inst-${Date.now()}`
    };
    setInstruments(prev => [newItem, ...prev]);
  };

  const updateInstrument = (id: string, updated: Partial<InstrumentItem>) => {
    setInstruments(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deleteInstrument = (id: string) => {
    setInstruments(prev => prev.filter(item => item.id !== id));
  };

  // Repair Actions
  const addRepairService = (service: Omit<RepairService, 'id'>) => {
    const newService: RepairService = {
      ...service,
      id: `rep-${Date.now()}`
    };
    setRepairServices(prev => [...prev, newService]);
  };

  const updateRepairService = (id: string, updated: Partial<RepairService>) => {
    setRepairServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteRepairService = (id: string) => {
    setRepairServices(prev => prev.filter(s => s.id !== id));
  };

  // Generation Image Actions
  const updateGenerationImage = (genId: number, imageUrlOrBase64: string) => {
    setGenerationImages(prev => ({
      ...prev,
      [genId]: imageUrlOrBase64
    }));
  };

  const resetGenerationImage = (genId: number) => {
    setGenerationImages(prev => {
      const copy = { ...prev };
      delete copy[genId];
      return copy;
    });
  };

  // Backup & Import
  const exportBackupJson = (): string => {
    const backup = {
      version: 1,
      exportDate: new Date().toISOString(),
      instruments,
      repairServices,
      generationImages
    };
    return JSON.stringify(backup, null, 2);
  };

  const importBackupJson = (jsonString: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.instruments) && Array.isArray(parsed.repairServices)) {
        setInstruments(parsed.instruments);
        setRepairServices(parsed.repairServices);
        if (parsed.generationImages && typeof parsed.generationImages === 'object') {
          setGenerationImages(parsed.generationImages);
        }
        return { success: true, message: "Backup data restored successfully!" };
      }
      return { success: false, message: "Invalid JSON format: missing instruments or repairs." };
    } catch (e: any) {
      return { success: false, message: e.message || "Failed to parse JSON backup file." };
    }
  };

  const resetAllToDefault = () => {
    setInstruments(INITIAL_INSTRUMENTS);
    setRepairServices(INITIAL_REPAIR_SERVICES);
    setGenerationImages({});
    setOwnerPin(DEFAULT_PIN);
    localStorage.removeItem(STORAGE_KEYS.INSTRUMENTS);
    localStorage.removeItem(STORAGE_KEYS.REPAIRS);
    localStorage.removeItem(STORAGE_KEYS.GEN_IMAGES);
    localStorage.removeItem(STORAGE_KEYS.OWNER_PIN);
  };

  return (
    <DataContext.Provider value={{
      instruments,
      repairServices,
      generations: INITIAL_GENERATIONS,
      generationImages,
      isAuthenticated,
      loginOwner,
      logoutOwner,
      updateOwnerPin,
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
      resetAllToDefault
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
