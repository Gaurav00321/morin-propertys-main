-- ============================================================
-- Morin Propertys — Blog Images Storage Bucket
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Create the blog-images storage bucket (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public READ access to blog images
DROP POLICY IF EXISTS "Blog Images Public Read" ON storage.objects;
CREATE POLICY "Blog Images Public Read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

-- 3. Allow service-role INSERT (used by the API route to upload cover images)
DROP POLICY IF EXISTS "Blog Images Service Insert" ON storage.objects;
CREATE POLICY "Blog Images Service Insert"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-images');

-- 4. Allow service-role UPDATE
DROP POLICY IF EXISTS "Blog Images Service Update" ON storage.objects;
CREATE POLICY "Blog Images Service Update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-images');

-- 5. Allow service-role DELETE
DROP POLICY IF EXISTS "Blog Images Service Delete" ON storage.objects;
CREATE POLICY "Blog Images Service Delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-images');

-- 6. Refresh schema cache
NOTIFY pgrst, 'reload schema';
