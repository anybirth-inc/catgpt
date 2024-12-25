export interface Cat {
  id: string;
  name: string;
  birthDate: string;
  adoptionDate: string;
  breed: string;
  gender: 'male' | 'female';
  photos: string[];
  microchipId?: string;
  healthStatus: 'healthy' | 'warning' | 'critical';
}

export type RecordType = 
  | 'weight' 
  | 'food' 
  | 'water' 
  | 'temperature'
  | 'urine'
  | 'poop'
  | 'activity';

export interface Record {
  id: string;
  cat_id: string;
  type: RecordType;
  value?: string;
  amount?: string;
  frequency?: number;
  condition?: string;
  date: string;
  created_at?: string;
}

export interface Diary {
  id: string;
  cat_id: string;
  date: string;
  content: string;
  photos: string[];
  created_at?: string;
}

export const AMOUNT_OPTIONS = [
  { value: 'little', label: '少ない' },
  { value: 'normal', label: '普通' },
  { value: 'much', label: '多い' }
] as const;

export const POOP_CONDITION_OPTIONS = [
  { value: 'normal', label: '普通' },
  { value: 'soft', label: '軟便' },
  { value: 'diarrhea', label: '下痢' },
  { value: 'hard', label: '硬い' }
] as const;

export const ACTIVITY_OPTIONS = [
  { value: 'very_active', label: 'とても活発' },
  { value: 'active', label: '活発' },
  { value: 'normal', label: '普通' },
  { value: 'less_active', label: 'おとなしい' },
  { value: 'inactive', label: 'ほとんど動かない' }
] as const;
