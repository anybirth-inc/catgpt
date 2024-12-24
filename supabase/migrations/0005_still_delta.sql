/*
  # Add mock records for Luna
  
  1. Changes
    - Insert weight, activity, food, water, and temperature records for Luna
    
  2. Notes
    - Only inserts if the cat exists
    - Uses explicit date casting
*/

-- Weight records for Luna
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM cats 
    WHERE id = '123e4567-e89b-12d3-a456-426614174000'::uuid
  ) THEN
    INSERT INTO records (cat_id, type, date, value, unit)
    VALUES 
      ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'weight', '2024-03-01'::date, '4.2', 'kg'),
      ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'weight', '2024-02-15'::date, '4.1', 'kg'),
      ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'weight', '2024-02-01'::date, '4.0', 'kg');

    INSERT INTO records (cat_id, type, date, value)
    VALUES 
      ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'activity', '2024-03-05'::date, 'very_active'),
      ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'activity', '2024-03-04'::date, 'active'),
      ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'activity', '2024-03-03'::date, 'normal');

    INSERT INTO records (cat_id, type, date, value, unit)
    VALUES 
      ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'food', '2024-03-05'::date, '200', 'g'),
      ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'food', '2024-03-04'::date, '180', 'g'),
      ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'food', '2024-03-03'::date, '220', 'g');

    INSERT INTO records (cat_id, type, date, value, unit)
    VALUES 
      ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'temperature', '2024-03-05'::date, '38.2', '℃'),
      ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'temperature', '2024-03-04'::date, '38.1', '℃'),
      ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'temperature', '2024-03-03'::date, '38.3', '℃');
  END IF;
END $$;