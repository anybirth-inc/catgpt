/*
  # Add mock records for Milo
  
  1. Changes
    - Insert weight, activity, food, water, and temperature records for Milo
    
  2. Notes
    - Only inserts if the cat exists
    - Uses explicit date casting
*/

-- Records for Milo
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM cats 
    WHERE id = '123e4567-e89b-12d3-a456-426614174001'::uuid
  ) THEN
    INSERT INTO records (cat_id, type, date, value, unit)
    VALUES 
      ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'weight', '2024-03-01'::date, '5.2', 'kg'),
      ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'weight', '2024-02-15'::date, '5.1', 'kg'),
      ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'weight', '2024-02-01'::date, '5.0', 'kg');

    INSERT INTO records (cat_id, type, date, value)
    VALUES 
      ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'activity', '2024-03-05'::date, 'low'),
      ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'activity', '2024-03-04'::date, 'normal'),
      ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'activity', '2024-03-03'::date, 'low');

    INSERT INTO records (cat_id, type, date, value, unit)
    VALUES 
      ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'food', '2024-03-05'::date, '180', 'g'),
      ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'food', '2024-03-04'::date, '160', 'g'),
      ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'food', '2024-03-03'::date, '170', 'g');

    INSERT INTO records (cat_id, type, date, value, unit)
    VALUES 
      ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'temperature', '2024-03-05'::date, '38.5', '℃'),
      ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'temperature', '2024-03-04'::date, '38.6', '℃'),
      ('123e4567-e89b-12d3-a456-426614174001'::uuid, 'temperature', '2024-03-03'::date, '38.7', '℃');
  END IF;
END $$;