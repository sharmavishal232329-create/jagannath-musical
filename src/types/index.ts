export type Language = 'en' | 'hi';

export type InstrumentCategory = 'all' | 'harmonium' | 'tabla-dholak' | 'naal-jhal' | 'keyboards-others';

export interface InstrumentItem {
  id: string;
  name: {
    en: string;
    hi: string;
  };
  category: 'harmonium' | 'tabla-dholak' | 'naal-jhal' | 'keyboards-others';
  price: number;
  inStock: boolean;
  image: string;
  specifications: {
    en: string;
    hi: string;
  };
  featured?: boolean;
}

export type RepairCategory = 'harmonium' | 'naal' | 'dholak' | 'tabla';

export interface RepairService {
  id: string;
  category: RepairCategory;
  serviceName: {
    en: string;
    hi: string;
  };
  startingFee: number;
  description: {
    en: string;
    hi: string;
  };
  turnaround: {
    en: string;
    hi: string;
  };
}

export interface GenerationInfo {
  id: 1 | 2 | 3 | 4;
  generationTitle: {
    en: string;
    hi: string;
  };
  personName: {
    en: string;
    hi: string;
  };
  defaultImage: string;
  description: {
    en: string;
    hi: string;
  };
  badge: {
    en: string;
    hi: string;
  };
  specialties: {
    en: string[];
    hi: string[];
  };
}
