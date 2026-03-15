-- Phase 2: User Profiles & Database Schema

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create universities table
CREATE TABLE public.universities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  domain TEXT NOT NULL UNIQUE, -- e.g., 'stanford.edu'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: In Supabase, users are already stored in the auth.users table.
-- We create a public.profiles table to store public-facing information that we can attach to them.
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'Student' CHECK (role IN ('Student', 'Researcher', 'Recruiter', 'Alumni')),
  university_id UUID REFERENCES public.universities(id),
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS) for universities
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;

-- Allow anyone (even unauthenticated users before signing up) to read university data
CREATE POLICY "Universities are viewable by everyone" ON public.universities
  FOR SELECT USING (true);

-- Only authenticated admins can insert/update universities (placeholder policy, can be adjusted based on admin requirements)
CREATE POLICY "Only authenticated users can create universities for now" ON public.universities
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Set up Row Level Security (RLS) for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all profiles (for feeds and viewing other users)
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger to automatically create a profile when a new user signs up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- We extract the text before the '@' as a rough default username for now
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (new.id, split_part(new.email, '@', 1) || '_' || substr(md5(random()::text), 0, 5), split_part(new.email, '@', 1), '');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to fire the function above after a user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- We can optionally script some seed data for universities immediately:
INSERT INTO public.universities (name, domain)
VALUES 
  ('Stanford University', 'stanford.edu'),
  ('Harvard University', 'harvard.edu'),
  ('Massachusetts Institute of Technology', 'mit.edu'),
  ('University of Oxford', 'ox.ac.uk')
ON CONFLICT (domain) DO NOTHING;
