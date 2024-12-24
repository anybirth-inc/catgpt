/*
  # Add mock cats data
  
  1. Changes
    - Insert cats with a specific user ID
    
  2. Notes
    - Uses a specific user ID for testing
*/

-- Insert cats with a specific user ID
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM cats 
    WHERE id = '123e4567-e89b-12d3-a456-426614174000'::uuid
  ) THEN
    INSERT INTO cats (id, user_id, name, birth_date, adoption_date, breed, gender, photos, health_status)
    VALUES (
      '123e4567-e89b-12d3-a456-426614174000'::uuid,
      '3621d86d-36e0-4a52-a8fc-ea109f5815fe'::uuid,
      'ルナ',
      '2020-05-15',
      '2020-07-01',
      'ミックス',
      'female',
      ARRAY['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500&h=500'],
      'healthy'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM cats 
    WHERE id = '123e4567-e89b-12d3-a456-426614174001'::uuid
  ) THEN
    INSERT INTO cats (id, user_id, name, birth_date, adoption_date, breed, gender, photos, health_status)
    VALUES (
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
  END IF;
END $$;