/*
  # Cat Health Tracker Database Schema

  1. New Tables
    - `cats`
      - Basic cat information including name, birth date, etc.
    - `records`
      - Health records for cats including weight, activity, etc.
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Cats table
CREATE TABLE IF NOT EXISTS cats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  birth_date date NOT NULL,
  adoption_date date,
  breed text,
  gender text CHECK (gender IN ('male', 'female')),
  photos text[],
  microchip_id text,
  health_status text DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'warning', 'critical')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Records table
CREATE TABLE IF NOT EXISTS records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cat_id uuid REFERENCES cats(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('weight', 'activity', 'toilet', 'food', 'water', 'temperature')),
  date date NOT NULL,
  value text NOT NULL,
  unit text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE cats ENABLE ROW LEVEL SECURITY;
ALTER TABLE records ENABLE ROW LEVEL SECURITY;

-- Policies for cats
CREATE POLICY "Users can view their own cats"
  ON cats FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own cats"
  ON cats FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own cats"
  ON cats FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own cats"
  ON cats FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Policies for records
CREATE POLICY "Users can view their cats' records"
  ON records FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM cats
    WHERE cats.id = records.cat_id
    AND cats.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their cats' records"
  ON records FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM cats
    WHERE cats.id = records.cat_id
    AND cats.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their cats' records"
  ON records FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM cats
    WHERE cats.id = records.cat_id
    AND cats.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their cats' records"
  ON records FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM cats
    WHERE cats.id = records.cat_id
    AND cats.user_id = auth.uid()
  ));