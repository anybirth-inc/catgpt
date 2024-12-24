/*
  # Add mock records for cats

  1. New Records
    - Weight records
    - Activity records
    - Food/Water records
    - Temperature records
    
  2. Notes
    - Records are only created if the cat exists
    - Uses realistic values for each record type
*/

-- Weight records for Luna
INSERT INTO records (cat_id, type, date, value, unit)
SELECT 
  '123e4567-e89b-12d3-a456-426614174000'::uuid,
  'weight',
  date,
  weight::text,
  'kg'
FROM (
  VALUES 
    ('2024-03-01', 4.2),
    ('2024-02-15', 4.1),
    ('2024-02-01', 4.0),
    ('2024-01-15', 3.9),
    ('2024-01-01', 3.8)
) AS weights(date, weight)
WHERE EXISTS (
  SELECT 1 FROM cats 
  WHERE id = '123e4567-e89b-12d3-a456-426614174000'::uuid
);

-- Activity records for Luna
INSERT INTO records (cat_id, type, date, value)
SELECT 
  '123e4567-e89b-12d3-a456-426614174000'::uuid,
  'activity',
  date,
  activity
FROM (
  VALUES 
    ('2024-03-05', 'very_active'),
    ('2024-03-04', 'active'),
    ('2024-03-03', 'normal'),
    ('2024-03-02', 'active'),
    ('2024-03-01', 'very_active')
) AS activities(date, activity)
WHERE EXISTS (
  SELECT 1 FROM cats 
  WHERE id = '123e4567-e89b-12d3-a456-426614174000'::uuid
);

-- Food records for Luna
INSERT INTO records (cat_id, type, date, value, unit)
SELECT 
  '123e4567-e89b-12d3-a456-426614174000'::uuid,
  'food',
  date,
  amount::text,
  'g'
FROM (
  VALUES 
    ('2024-03-05', 200),
    ('2024-03-04', 180),
    ('2024-03-03', 220),
    ('2024-03-02', 190),
    ('2024-03-01', 200)
) AS food(date, amount)
WHERE EXISTS (
  SELECT 1 FROM cats 
  WHERE id = '123e4567-e89b-12d3-a456-426614174000'::uuid
);

-- Water records for Luna
INSERT INTO records (cat_id, type, date, value, unit)
SELECT 
  '123e4567-e89b-12d3-a456-426614174000'::uuid,
  'water',
  date,
  amount::text,
  'ml'
FROM (
  VALUES 
    ('2024-03-05', 150),
    ('2024-03-04', 160),
    ('2024-03-03', 140),
    ('2024-03-02', 155),
    ('2024-03-01', 150)
) AS water(date, amount)
WHERE EXISTS (
  SELECT 1 FROM cats 
  WHERE id = '123e4567-e89b-12d3-a456-426614174000'::uuid
);

-- Temperature records for Luna
INSERT INTO records (cat_id, type, date, value, unit)
SELECT 
  '123e4567-e89b-12d3-a456-426614174000'::uuid,
  'temperature',
  date,
  temp::text,
  '℃'
FROM (
  VALUES 
    ('2024-03-05', 38.2),
    ('2024-03-04', 38.1),
    ('2024-03-03', 38.3),
    ('2024-03-02', 38.2),
    ('2024-03-01', 38.1)
) AS temps(date, temp)
WHERE EXISTS (
  SELECT 1 FROM cats 
  WHERE id = '123e4567-e89b-12d3-a456-426614174000'::uuid
);

-- Weight records for Milo
INSERT INTO records (cat_id, type, date, value, unit)
SELECT 
  '123e4567-e89b-12d3-a456-426614174001'::uuid,
  'weight',
  date,
  weight::text,
  'kg'
FROM (
  VALUES 
    ('2024-03-01', 5.2),
    ('2024-02-15', 5.1),
    ('2024-02-01', 5.0),
    ('2024-01-15', 4.9),
    ('2024-01-01', 4.8)
) AS weights(date, weight)
WHERE EXISTS (
  SELECT 1 FROM cats 
  WHERE id = '123e4567-e89b-12d3-a456-426614174001'::uuid
);

-- Activity records for Milo
INSERT INTO records (cat_id, type, date, value)
SELECT 
  '123e4567-e89b-12d3-a456-426614174001'::uuid,
  'activity',
  date,
  activity
FROM (
  VALUES 
    ('2024-03-05', 'low'),
    ('2024-03-04', 'normal'),
    ('2024-03-03', 'low'),
    ('2024-03-02', 'normal'),
    ('2024-03-01', 'low')
) AS activities(date, activity)
WHERE EXISTS (
  SELECT 1 FROM cats 
  WHERE id = '123e4567-e89b-12d3-a456-426614174001'::uuid
);

-- Food records for Milo
INSERT INTO records (cat_id, type, date, value, unit)
SELECT 
  '123e4567-e89b-12d3-a456-426614174001'::uuid,
  'food',
  date,
  amount::text,
  'g'
FROM (
  VALUES 
    ('2024-03-05', 180),
    ('2024-03-04', 160),
    ('2024-03-03', 170),
    ('2024-03-02', 165),
    ('2024-03-01', 175)
) AS food(date, amount)
WHERE EXISTS (
  SELECT 1 FROM cats 
  WHERE id = '123e4567-e89b-12d3-a456-426614174001'::uuid
);

-- Water records for Milo
INSERT INTO records (cat_id, type, date, value, unit)
SELECT 
  '123e4567-e89b-12d3-a456-426614174001'::uuid,
  'water',
  date,
  amount::text,
  'ml'
FROM (
  VALUES 
    ('2024-03-05', 130),
    ('2024-03-04', 140),
    ('2024-03-03', 120),
    ('2024-03-02', 135),
    ('2024-03-01', 130)
) AS water(date, amount)
WHERE EXISTS (
  SELECT 1 FROM cats 
  WHERE id = '123e4567-e89b-12d3-a456-426614174001'::uuid
);

-- Temperature records for Milo
INSERT INTO records (cat_id, type, date, value, unit)
SELECT 
  '123e4567-e89b-12d3-a456-426614174001'::uuid,
  'temperature',
  date,
  temp::text,
  '℃'
FROM (
  VALUES 
    ('2024-03-05', 38.5),
    ('2024-03-04', 38.6),
    ('2024-03-03', 38.7),
    ('2024-03-02', 38.6),
    ('2024-03-01', 38.5)
) AS temps(date, temp)
WHERE EXISTS (
  SELECT 1 FROM cats 
  WHERE id = '123e4567-e89b-12d3-a456-426614174001'::uuid
);