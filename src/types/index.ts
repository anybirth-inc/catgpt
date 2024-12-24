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

export type RecordType = 'weight' | 'activity' | 'toilet' | 'food' | 'water' | 'temperature';

export interface Record {
  id?: string;
  catId: string;
  type: RecordType;
  date: string;
  value: number | string;
  unit?: string;
}