/*
  # Add mock data for testing

  1. Changes
    - Add two mock cats for testing purposes
*/

INSERT INTO cats (id, user_id, name, birth_date, adoption_date, breed, gender, photos, health_status)
SELECT 
  '123e4567-e89b-12d3-a456-426614174000'::uuid,
  auth.uid(),
  'ルナ',
  '2020-05-15',
  '2020-07-01',
  'ミックス',
  'female',
  ARRAY['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500&h=500'],
  'healthy'
WHERE EXISTS (
  SELECT 1 FROM auth.users WHERE id = auth.uid()
);

INSERT INTO cats (id, user_id, name, birth_date, adoption_date, breed, gender, photos, health_status)
SELECT 
  '123e4567-e89b-12d3-a456-426614174001'::uuid,
  auth.uid(),
  'ミロ',
  '2019-03-10',
  '2019-05-20',
  'スコティッシュフォールド',
  'male',
  ARRAY['https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=500&h=500'],
  'warning'
WHERE EXISTS (
  SELECT 1 FROM auth.users WHERE id = auth.uid()
);