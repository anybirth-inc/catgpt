export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cats: {
        Row: {
          id: string
          user_id: string
          name: string
          birth_date: string
          adoption_date: string | null
          breed: string | null
          gender: 'male' | 'female'
          photos: string[] | null
          microchip_id: string | null
          health_status: 'healthy' | 'warning' | 'critical'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          birth_date: string
          adoption_date?: string | null
          breed?: string | null
          gender: 'male' | 'female'
          photos?: string[] | null
          microchip_id?: string | null
          health_status?: 'healthy' | 'warning' | 'critical'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          birth_date?: string
          adoption_date?: string | null
          breed?: string | null
          gender?: 'male' | 'female'
          photos?: string[] | null
          microchip_id?: string | null
          health_status?: 'healthy' | 'warning' | 'critical'
          created_at?: string
          updated_at?: string
        }
      }
      records: {
        Row: {
          id: string
          cat_id: string
          type: 'weight' | 'activity' | 'toilet' | 'food' | 'water' | 'temperature'
          date: string
          value: string
          unit: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cat_id: string
          type: 'weight' | 'activity' | 'toilet' | 'food' | 'water' | 'temperature'
          date: string
          value: string
          unit?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cat_id?: string
          type?: 'weight' | 'activity' | 'toilet' | 'food' | 'water' | 'temperature'
          date?: string
          value?: string
          unit?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}