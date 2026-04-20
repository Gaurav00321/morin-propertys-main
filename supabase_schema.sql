-- Run this script in the Supabase SQL Editor

-- 1. Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  slug TEXT UNIQUE NOT NULL,
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  locality TEXT NOT NULL,
  price NUMERIC NOT NULL,
  price_label TEXT NOT NULL,
  bhk TEXT NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  area NUMERIC NOT NULL,
  area_unit TEXT NOT NULL,
  floor TEXT,
  facing TEXT,
  age TEXT,
  parking TEXT,
  description TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  badge TEXT,
  nearby_places JSONB DEFAULT '[]'::jsonb,
  map_embed_url TEXT,
  videos TEXT[] DEFAULT '{}'
);

-- 2. Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  user_type TEXT,
  property_type TEXT,
  budget_range TEXT,
  message TEXT,
  property_code TEXT,
  source TEXT
);

-- 3. Set up Storage Bucket for Properties
INSERT INTO storage.buckets (id, name, public) VALUES ('properties', 'properties', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to properties bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'properties');

-- Allow anon to create, update, delete for simplicity of this setup without full Row Level Security tied to Auth
-- WARNING: In a production environment with public signup, this should be restricted to authenticated admin users.
DROP POLICY IF EXISTS "Anon Insert" ON storage.objects;
CREATE POLICY "Anon Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'properties');
DROP POLICY IF EXISTS "Anon Update" ON storage.objects;
CREATE POLICY "Anon Update" ON storage.objects FOR UPDATE USING (bucket_id = 'properties');
DROP POLICY IF EXISTS "Anon Delete" ON storage.objects;
CREATE POLICY "Anon Delete" ON storage.objects FOR DELETE USING (bucket_id = 'properties');

-- Allow all for properties
DROP POLICY IF EXISTS "Allow all for properties" ON public.properties;
CREATE POLICY "Allow all for properties" ON public.properties FOR ALL USING (true) WITH CHECK (true);
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Allow all for leads
DROP POLICY IF EXISTS "Allow all for leads" ON public.leads;
CREATE POLICY "Allow all for leads" ON public.leads FOR ALL USING (true) WITH CHECK (true);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Migration: Add videos column (Run this in Supabase SQL Editor if table already exists)
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS videos TEXT[] DEFAULT '{}';

-- Final Step: Refresh the schema cache
NOTIFY pgrst, 'reload schema';
