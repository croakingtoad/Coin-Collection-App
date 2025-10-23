-- Create storage bucket for coin images (run this if the bucket wasn't created)

-- Create the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('coin-images', 'coin-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Public read access for coin images" ON storage.objects;
DROP POLICY IF EXISTS "Public upload access for coin images" ON storage.objects;
DROP POLICY IF EXISTS "Public update access for coin images" ON storage.objects;
DROP POLICY IF EXISTS "Public delete access for coin images" ON storage.objects;

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
