/*
  # Add mock data with specific user ID

  1. Changes
    - Insert cats with a specific user ID
    - Insert corresponding records for each cat
    
  2. Notes
    - Uses a specific user ID instead of auth.uid()
    - Ensures data consistency with foreign key relationships
*/

-- Insert cats with a specific user ID
INSERT INTO cats (id, user_id, name, birth_date, adoption_date, breed, gender, photos, health_status)
VALUES 
  (
    '123e4567-e89b-12d3-a456-426614174000'::uuid,
    '3621d86d-36e0-4a52-a8fc-ea109f5815fe'::uuid,
    'ルナ',
    '2020-05-15',
    '2020-07-01',
    'ミックス',
    'female',
    ARRAY['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500&h=500'],
    'healthy'
  ),
  (
    '123e4567-e89b-12d3-a456-426614174001'::uuid,
    '3621d86d-36e0-4a52-a8fc-ea109f5815fe'::uuid,
    'ミロ',
    '2019-03-10',
    '2019-05-20',
    'スコティッシュフォールド',
    'male',
    ARRAY['https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=500&h=500'],
    'warning'
  );

-- Weight records for Luna
INSERT INTO records (cat_id, type, date, value, unit)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'weight', '2024-03-01'::date, '4.2', 'kg'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'weight', '2024-02-15'::date, '4.1', 'kg'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'weight', '2024-02-01'::date, '4.0', 'kg'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'weight', '2024-01-15'::date, '3.9', 'kg'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'weight', '2024-01-01'::date, '3.8', 'kg');

-- Activity records for Luna
INSERT INTO records (cat_id, type, date, value)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'activity', '2024-03-05'::date, 'very_active'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'activity', '2024-03-04'::date, 'active'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'activity', '2024-03-03'::date, 'normal'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'activity', '2024-03-02'::date, 'active'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'activity', '2024-03-01'::date, 'very_active');

-- Food and water records for Luna
INSERT INTO records (cat_id, type, date, value, unit)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'food', '2024-03-05'::date, '200', 'g'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'food', '2024-03-04'::date, '180', 'g'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'food', '2024-03-03'::date, '220', 'g'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'water', '2024-03-05'::date, '150', 'ml'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'water', '2024-03-04'::date, '160', 'ml'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'water', '2024-03-03'::date, '140', 'ml');

-- Temperature records for Luna
INSERT INTO records (cat_id, type, date, value, unit)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'temperature', '2024-03-05'::date, '38.2', '℃'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'temperature', '2024-03-04'::date, '38.1', '℃'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'temperature', '2024-03-03'::date, '38.3', '℃');

-- Weight records for Milo
INSERT INTO records (cat_id, type, date, value, unit)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'weight', '2024-03-01'::date, '5.2', 'kg'),
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'weight', '2024-02-15'::date, '5.1', 'kg'),
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'weight', '2024-02-01'::date, '5.0', 'kg');

-- Activity records for Milo
INSERT INTO records (cat_id, type, date, value)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'activity', '2024-03-05'::date, 'low'),
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'activity', '2024-03-04'::date, 'normal'),
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'activity', '2024-03-03'::date, 'low');

-- Food and water records for Milo
INSERT INTO records (cat_id, type, date, value, unit)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'food', '2024-03-05'::date, '180', 'g'),
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'food', '2024-03-04'::date, '160', 'g'),
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'food', '2024-03-03'::date, '170', 'g'),
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'water', '2024-03-05'::date, '130', 'ml'),
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'water', '2024-03-04'::date, '140', 'ml'),
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'water', '2024-03-03'::date, '120', 'ml');

-- Temperature records for Milo
INSERT INTO records (cat_id, type, date, value, unit)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'temperature', '2024-03-05'::date, '38.5', '℃'),
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'temperature', '2024-03-04'::date, '38.6', '℃'),
  ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'temperature', '2024-03-03'::date, '38.7', '℃');