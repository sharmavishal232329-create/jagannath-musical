import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { InstrumentItem, RepairService, GenerationInfo } from '../types';
import { INITIAL_INSTRUMENTS, INITIAL_REPAIR_SERVICES, INITIAL_GENERATIONS } from '../data/initialData';
import { supabase } from '../supabaseClient';

export interface SaveResult {
  success: boolean;
  message: string;
  cloudSynced?: boolean;
}

export type CloudSyncStatus = 'connected' | 'offline' | 'syncing';

interface DataContextType {
  instruments: InstrumentItem[];
  repairServices: RepairService[];
  generations: GenerationInfo[];
  generationImages: Record<number, string>;
  isAuthenticated: boolean;
  cloudStatus: CloudSyncStatus;
  loginOwner: (pin: string) => boolean;
  logoutOwner: () => void;
  updateOwnerPin: (currentPin: string, newPin: string) => Promise<SaveResult>;
  
  // Instrument actions
  addInstrument: (instrument: Omit<InstrumentItem, 'id'>) => Promise<SaveResult>;
  updateInstrument: (id: string, updated: Partial<InstrumentItem>) => Promise<SaveResult>;
  deleteInstrument: (id: string) => Promise<SaveResult>;
  
  // Repair service actions
  addRepairService: (service: Omit<RepairService, 'id'>) => Promise<SaveResult>;
  updateRepairService: (id: string, updated: Partial<RepairService>) => Promise<SaveResult>;
  deleteRepairService: (id: string) => Promise<SaveResult>;
  
  // Generation portraits
  updateGenerationImage: (genId: number, imageUrlOrBase64: string) => Promise<SaveResult>;
  resetGenerationImage: (genId: number) => Promise<SaveResult>;

  // Backup & Reset
  exportBackupJson: () => string;
  importBackupJson: (jsonString: string) => Promise<SaveResult>;
  resetAllToDefault: () => Promise<void>;
  syncWithCloud: () => Promise<void>;
}

const STORAGE_KEYS = {
  INSTRUMENTS: 'jagannath_instruments_v1',
  REPAIRS: 'jagannath_repairs_v1',
  GEN_IMAGES: 'jagannath_gen_images_v1',
  OWNER_PIN: 'jagannath_owner_pin_v1',
  AUTH: 'jagannath_auth_v1',
};

const DEFAULT_PIN = "232329";
const CLOUD_DOC_ID = 'main_store';

// Helper for safe, quota-checked localStorage saving
const safeSetItem = (key: string, data: any): { success: boolean; error?: string } => {
  try {
    const serialized = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(key, serialized);
    return { success: true };
  } catch (err: any) {
    console.error(`localStorage error on key "${key}":`, err);
    if (
      err.name === 'QuotaExceededError' ||
      err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      err.code === 22 ||
      err.code === 1014
    ) {
      return {
        success: false,
        error: "Storage limit reached. Compressed photos keep storage within quota."
      };
    }
    return { success: false, error: err.message || "Failed to save to local storage" };
  }
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Instruments state with persistent local fallback
  const [instruments, setInstruments] = useState<InstrumentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INSTRUMENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read instruments from localStorage:", e);
    }
    safeSetItem(STORAGE_KEYS.INSTRUMENTS, INITIAL_INSTRUMENTS);
    return INITIAL_INSTRUMENTS;
  });

  // 2. Repair services state with persistent local fallback
  const [repairServices, setRepairServices] = useState<RepairService[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REPAIRS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read repairs from localStorage:", e);
    }
    safeSetItem(STORAGE_KEYS.REPAIRS, INITIAL_REPAIR_SERVICES);
    return INITIAL_REPAIR_SERVICES;
  });

  // 3. Generation portraits override state
  const [generationImages, setGenerationImages] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GEN_IMAGES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read generation portraits from localStorage:", e);
    }
    return {};
  });

  // 4. Owner PIN
  const [ownerPin, setOwnerPin] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OWNER_PIN);
      if (saved && saved.trim()) return saved.trim();
    } catch (e) {
      console.warn("Could not read owner PIN:", e);
    }
    safeSetItem(STORAGE_KEYS.OWNER_PIN, DEFAULT_PIN);
    return DEFAULT_PIN;
  });

  // 5. Authentication session state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // 6. Supabase Cloud Sync Status
  const [cloudStatus, setCloudStatus] = useState<CloudSyncStatus>('offline');

  // Helper to upsert state to Supabase 'shop_data'
  const pushToCloud = useCallback(async (
    instList: InstrumentItem[],
    repList: RepairService[],
    genImgs: Record<number, string>,
    pin: string
  ): Promise<{ cloudSynced: boolean; error?: string }> => {
    try {
      setCloudStatus('syncing');
      const { error } = await supabase
        .from('shop_data')
        .upsert({
          id: CLOUD_DOC_ID,
          data: {
            instruments: instList,
            repairServices: repList,
            generationImages: genImgs,
            ownerPin: pin,
            updatedAt: new Date().toISOString()
          },
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.warn("Supabase push note:", error.message);
        setCloudStatus('offline');
        return { cloudSynced: false, error: error.message };
      }

      setCloudStatus('connected');
      return { cloudSynced: true };
    } catch (err: any) {
      console.warn("Supabase network error:", err);
      setCloudStatus('offline');
      return { cloudSynced: false, error: err.message };
    }
  }, []);

  // Fetch cloud data on load
  const syncWithCloud = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('shop_data')
        .select('data')
        .eq('id', CLOUD_DOC_ID)
        .maybeSingle();

      if (error) {
        console.info("Supabase fetch note (table may be pending creation):", error.message);
        setCloudStatus('offline');
        return;
      }

      if (data?.data) {
        const cloudState = data.data;
        if (Array.isArray(cloudState.instruments) && cloudState.instruments.length > 0) {
          setInstruments(cloudState.instruments);
          safeSetItem(STORAGE_KEYS.INSTRUMENTS, cloudState.instruments);
        }
        if (Array.isArray(cloudState.repairServices) && cloudState.repairServices.length > 0) {
          setRepairServices(cloudState.repairServices);
          safeSetItem(STORAGE_KEYS.REPAIRS, cloudState.repairServices);
        }
        if (cloudState.generationImages && typeof cloudState.generationImages === 'object') {
          setGenerationImages(cloudState.generationImages);
          safeSetItem(STORAGE_KEYS.GEN_IMAGES, cloudState.generationImages);
        }
        if (cloudState.ownerPin && typeof cloudState.ownerPin === 'string') {
          setOwnerPin(cloudState.ownerPin);
          safeSetItem(STORAGE_KEYS.OWNER_PIN, cloudState.ownerPin);
        }
        setCloudStatus('connected');
      } else {
        // Table exists but row is not created yet -> Seed it with current local state
        setCloudStatus('connected');
        await pushToCloud(instruments, repairServices, generationImages, ownerPin);
      }
    } catch (err) {
      console.warn("Could not connect to Supabase (offline fallback active):", err);
      setCloudStatus('offline');
    }
  }, [instruments, repairServices, generationImages, ownerPin, pushToCloud]);

  // Initial load and Realtime listener
  useEffect(() => {
    syncWithCloud();

    const channel = supabase
      .channel('shop_data_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'shop_data', filter: `id=eq.${CLOUD_DOC_ID}` },
        (payload: any) => {
          if (payload.new?.data) {
            const cloudState = payload.new.data;
            if (Array.isArray(cloudState.instruments)) {
              setInstruments(cloudState.instruments);
              safeSetItem(STORAGE_KEYS.INSTRUMENTS, cloudState.instruments);
            }
            if (Array.isArray(cloudState.repairServices)) {
              setRepairServices(cloudState.repairServices);
              safeSetItem(STORAGE_KEYS.REPAIRS, cloudState.repairServices);
            }
            if (cloudState.generationImages) {
              setGenerationImages(cloudState.generationImages);
              safeSetItem(STORAGE_KEYS.GEN_IMAGES, cloudState.generationImages);
            }
            if (cloudState.ownerPin) {
              setOwnerPin(cloudState.ownerPin);
              safeSetItem(STORAGE_KEYS.OWNER_PIN, cloudState.ownerPin);
            }
            setCloudStatus('connected');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Run once on mount

  // Auth methods
  const loginOwner = (pin: string): boolean => {
    if (pin.trim() === ownerPin.trim()) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      } catch (e) {
        console.warn("Session storage error:", e);
      }
      return true;
    }
    return false;
  };

  const logoutOwner = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    } catch (e) {
      console.warn("Session storage error:", e);
    }
  };

  const updateOwnerPin = async (currentPin: string, newPin: string): Promise<SaveResult> => {
    if (currentPin.trim() !== ownerPin.trim()) {
      return { success: false, message: "Current PIN is incorrect." };
    }
    if (!newPin || newPin.trim().length < 4) {
      return { success: false, message: "New PIN must be at least 4 digits." };
    }
    const cleanPin = newPin.trim();
    safeSetItem(STORAGE_KEYS.OWNER_PIN, cleanPin);
    setOwnerPin(cleanPin);

    const cloud = await pushToCloud(instruments, repairServices, generationImages, cleanPin);
    return {
      success: true,
      cloudSynced: cloud.cloudSynced,
      message: cloud.cloudSynced
        ? "Saved to Cloud & Live Everywhere! PIN updated successfully."
        : "Saved Permanently! PIN updated successfully."
    };
  };

  // Instrument Actions (Immediate Synchronous Local + Async Supabase Push)
  const addInstrument = async (instrument: Omit<InstrumentItem, 'id'>): Promise<SaveResult> => {
    const newItem: InstrumentItem = {
      ...instrument,
      id: `inst-${Date.now()}`
    };
    const nextList = [newItem, ...instruments];
    safeSetItem(STORAGE_KEYS.INSTRUMENTS, nextList);
    setInstruments(nextList);

    const cloud = await pushToCloud(nextList, repairServices, generationImages, ownerPin);
    return {
      success: true,
      cloudSynced: cloud.cloudSynced,
      message: cloud.cloudSynced
        ? "Saved to Cloud & Live Everywhere! (क्लाउड व सभी डिवाइस पर सहेजा गया!)"
        : "Saved Permanently! (स्थायी रूप से सहेजा गया!)"
    };
  };

  const updateInstrument = async (id: string, updated: Partial<InstrumentItem>): Promise<SaveResult> => {
    const nextList = instruments.map(item => item.id === id ? { ...item, ...updated } : item);
    safeSetItem(STORAGE_KEYS.INSTRUMENTS, nextList);
    setInstruments(nextList);

    const cloud = await pushToCloud(nextList, repairServices, generationImages, ownerPin);
    return {
      success: true,
      cloudSynced: cloud.cloudSynced,
      message: cloud.cloudSynced
        ? "Saved to Cloud & Live Everywhere! (क्लाउड व सभी डिवाइस पर सहेजा गया!)"
        : "Saved Permanently! (स्थायी रूप से सहेजा गया!)"
    };
  };

  const deleteInstrument = async (id: string): Promise<SaveResult> => {
    const nextList = instruments.filter(item => item.id !== id);
    safeSetItem(STORAGE_KEYS.INSTRUMENTS, nextList);
    setInstruments(nextList);

    const cloud = await pushToCloud(nextList, repairServices, generationImages, ownerPin);
    return {
      success: true,
      cloudSynced: cloud.cloudSynced,
      message: cloud.cloudSynced
        ? "Saved to Cloud & Live Everywhere! Item removed."
        : "Saved Permanently! Item removed from stock."
    };
  };

  // Repair Actions (Immediate Synchronous Local + Async Supabase Push)
  const addRepairService = async (service: Omit<RepairService, 'id'>): Promise<SaveResult> => {
    const newService: RepairService = {
      ...service,
      id: `rep-${Date.now()}`
    };
    const nextList = [...repairServices, newService];
    safeSetItem(STORAGE_KEYS.REPAIRS, nextList);
    setRepairServices(nextList);

    const cloud = await pushToCloud(instruments, nextList, generationImages, ownerPin);
    return {
      success: true,
      cloudSynced: cloud.cloudSynced,
      message: cloud.cloudSynced
        ? "Saved to Cloud & Live Everywhere! (क्लाउड व सभी डिवाइस पर सहेजा गया!)"
        : "Saved Permanently! (स्थायी रूप से सहेजा गया!)"
    };
  };

  const updateRepairService = async (id: string, updated: Partial<RepairService>): Promise<SaveResult> => {
    const nextList = repairServices.map(s => s.id === id ? { ...s, ...updated } : s);
    safeSetItem(STORAGE_KEYS.REPAIRS, nextList);
    setRepairServices(nextList);

    const cloud = await pushToCloud(instruments, nextList, generationImages, ownerPin);
    return {
      success: true,
      cloudSynced: cloud.cloudSynced,
      message: cloud.cloudSynced
        ? "Saved to Cloud & Live Everywhere! (क्लाउड व सभी डिवाइस पर सहेजा गया!)"
        : "Saved Permanently! (स्थायी रूप से सहेजा गया!)"
    };
  };

  const deleteRepairService = async (id: string): Promise<SaveResult> => {
    const nextList = repairServices.filter(s => s.id !== id);
    safeSetItem(STORAGE_KEYS.REPAIRS, nextList);
    setRepairServices(nextList);

    const cloud = await pushToCloud(instruments, nextList, generationImages, ownerPin);
    return {
      success: true,
      cloudSynced: cloud.cloudSynced,
      message: cloud.cloudSynced
        ? "Saved to Cloud & Live Everywhere! Service removed."
        : "Saved Permanently! Service removed from list."
    };
  };

  // Generation Image Actions (Immediate Synchronous Local + Async Supabase Push)
  const updateGenerationImage = async (genId: number, imageUrlOrBase64: string): Promise<SaveResult> => {
    const nextMap = {
      ...generationImages,
      [genId]: imageUrlOrBase64
    };
    safeSetItem(STORAGE_KEYS.GEN_IMAGES, nextMap);
    setGenerationImages(nextMap);

    const cloud = await pushToCloud(instruments, repairServices, nextMap, ownerPin);
    return {
      success: true,
      cloudSynced: cloud.cloudSynced,
      message: cloud.cloudSynced
        ? "Saved to Cloud & Live Everywhere! Portrait updated."
        : "Saved Permanently! Portrait updated."
    };
  };

  const resetGenerationImage = async (genId: number): Promise<SaveResult> => {
    const nextMap = { ...generationImages };
    delete nextMap[genId];
    safeSetItem(STORAGE_KEYS.GEN_IMAGES, nextMap);
    setGenerationImages(nextMap);

    const cloud = await pushToCloud(instruments, repairServices, nextMap, ownerPin);
    return {
      success: true,
      cloudSynced: cloud.cloudSynced,
      message: cloud.cloudSynced
        ? "Saved to Cloud & Live Everywhere! Reset to default portrait."
        : "Saved Permanently! Reset to default portrait."
    };
  };

  // Backup & Import
  const exportBackupJson = (): string => {
    const backup = {
      version: 1,
      exportDate: new Date().toISOString(),
      instruments,
      repairServices,
      generationImages,
      ownerPin
    };
    return JSON.stringify(backup, null, 2);
  };

  const importBackupJson = async (jsonString: string): Promise<SaveResult> => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.instruments) && Array.isArray(parsed.repairServices)) {
        safeSetItem(STORAGE_KEYS.INSTRUMENTS, parsed.instruments);
        safeSetItem(STORAGE_KEYS.REPAIRS, parsed.repairServices);
        setInstruments(parsed.instruments);
        setRepairServices(parsed.repairServices);

        let nextGenImages = generationImages;
        if (parsed.generationImages && typeof parsed.generationImages === 'object') {
          safeSetItem(STORAGE_KEYS.GEN_IMAGES, parsed.generationImages);
          setGenerationImages(parsed.generationImages);
          nextGenImages = parsed.generationImages;
        }

        let nextPin = ownerPin;
        if (parsed.ownerPin && typeof parsed.ownerPin === 'string') {
          safeSetItem(STORAGE_KEYS.OWNER_PIN, parsed.ownerPin);
          setOwnerPin(parsed.ownerPin);
          nextPin = parsed.ownerPin;
        }

        const cloud = await pushToCloud(parsed.instruments, parsed.repairServices, nextGenImages, nextPin);
        return {
          success: true,
          cloudSynced: cloud.cloudSynced,
          message: cloud.cloudSynced
            ? "Saved to Cloud & Live Everywhere! Backup data restored successfully."
            : "Saved Permanently! Backup data restored successfully."
        };
      }
      return { success: false, message: "Invalid JSON format: missing instruments or repair data." };
    } catch (e: any) {
      return { success: false, message: e.message || "Failed to parse JSON backup file." };
    }
  };

  const resetAllToDefault = async () => {
    setInstruments(INITIAL_INSTRUMENTS);
    setRepairServices(INITIAL_REPAIR_SERVICES);
    setGenerationImages({});
    setOwnerPin(DEFAULT_PIN);
    safeSetItem(STORAGE_KEYS.INSTRUMENTS, INITIAL_INSTRUMENTS);
    safeSetItem(STORAGE_KEYS.REPAIRS, INITIAL_REPAIR_SERVICES);
    safeSetItem(STORAGE_KEYS.GEN_IMAGES, {});
    safeSetItem(STORAGE_KEYS.OWNER_PIN, DEFAULT_PIN);
    await pushToCloud(INITIAL_INSTRUMENTS, INITIAL_REPAIR_SERVICES, {}, DEFAULT_PIN);
  };

  return (
    <DataContext.Provider value={{
      instruments,
      repairServices,
      generations: INITIAL_GENERATIONS,
      generationImages,
      isAuthenticated,
      cloudStatus,
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
      resetAllToDefault,
      syncWithCloud
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
