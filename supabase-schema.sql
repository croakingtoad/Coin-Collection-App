-- Coins Inventory Database Schema
-- Run this in your Supabase SQL Editor

-- Create coins table
CREATE TABLE IF NOT EXISTS coins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  year INTEGER NOT NULL,
  country TEXT NOT NULL,
  denomination TEXT NOT NULL,
  mint_mark TEXT,
  grade TEXT,
  value NUMERIC,
  description TEXT,
  image TEXT,
  date_added TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  category TEXT,
  composition TEXT,
  weight NUMERIC,
  diameter NUMERIC,
  registration_number TEXT,
  grading_company TEXT,
  face_value TEXT,
  special_collection TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create an index on date_added for faster sorting
CREATE INDEX IF NOT EXISTS idx_coins_date_added ON coins(date_added DESC);

-- Create an index on country for filtering
CREATE INDEX IF NOT EXISTS idx_coins_country ON coins(country);

-- Create a full-text search index for searching coins
CREATE INDEX IF NOT EXISTS idx_coins_search ON coins USING gin(
  to_tsvector('english', coalesce(name, '') || ' ' || coalesce(country, '') || ' ' || coalesce(denomination, ''))
);

-- Enable Row Level Security (RLS)
ALTER TABLE coins ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read all coins (public access)
CREATE POLICY "Allow public read access" ON coins
  FOR SELECT
  USING (true);

-- Create a policy that allows anyone to insert coins (public access)
CREATE POLICY "Allow public insert access" ON coins
  FOR INSERT
  WITH CHECK (true);

-- Create a policy that allows anyone to update coins (public access)
CREATE POLICY "Allow public update access" ON coins
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create a policy that allows anyone to delete coins (public access)
CREATE POLICY "Allow public delete access" ON coins
  FOR DELETE
  USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function on updates
CREATE TRIGGER update_coins_updated_at
  BEFORE UPDATE ON coins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for coin images
INSERT INTO storage.buckets (id, name, public)
VALUES ('coin-images', 'coin-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public read access
CREATE POLICY "Public read access for coin images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'coin-images');

-- Create storage policy for public upload access
CREATE POLICY "Public upload access for coin images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'coin-images');

-- Create storage policy for public update access
CREATE POLICY "Public update access for coin images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'coin-images')
  WITH CHECK (bucket_id = 'coin-images');

-- Create storage policy for public delete access
CREATE POLICY "Public delete access for coin images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'coin-images');
