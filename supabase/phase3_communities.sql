-- Phase 3: Community System Schema

-- Create Communities table
CREATE TABLE public.communities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  university_id UUID REFERENCES public.universities(id), -- If null, it's a global interest group
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: We might want a unique constraint on (name, university_id) so we don't have exact duplicate communities at the same university
ALTER TABLE public.communities ADD CONSTRAINT unique_community_name_per_uni UNIQUE NULLS NOT DISTINCT (name, university_id);


-- Create Community Members table (for joining communities)
CREATE TABLE public.community_members (
  community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (community_id, user_id)
);


-- Set up Row Level Security (RLS) for communities
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all communities
CREATE POLICY "Communities are viewable by everyone" ON public.communities
  FOR SELECT USING (true);

-- Allow authenticated users to create communities
CREATE POLICY "Authenticated users can create communities" ON public.communities
  FOR INSERT WITH CHECK (auth.uid() = created_by);


-- Set up Row Level Security (RLS) for community_members
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;

-- Allow public read access to see who is in what community
CREATE POLICY "Community members are viewable by everyone" ON public.community_members
  FOR SELECT USING (true);

-- Allow authenticated users to join communities (insert a row for themselves)
CREATE POLICY "Users can join communities" ON public.community_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to leave communities (delete their own row)
CREATE POLICY "Users can leave communities" ON public.community_members
  FOR DELETE USING (auth.uid() = user_id);


-- Optional: Insert some starter communities for the previously seeded universities
-- Get the IDs of the universities we inserted in Phase 2, and create a "General Tech" and "Alumni Hub" community
DO $$
DECLARE
  stanford_id UUID;
  mit_id UUID;
BEGIN
  SELECT id INTO stanford_id FROM public.universities WHERE domain = 'stanford.edu' LIMIT 1;
  SELECT id INTO mit_id FROM public.universities WHERE domain = 'mit.edu' LIMIT 1;

  IF stanford_id IS NOT NULL THEN
    INSERT INTO public.communities (name, description, university_id)
    VALUES 
      ('Stanford Computer Science', 'Discussions for CS majors and enthusiasts.', stanford_id),
      ('Stanford Startups', 'Find co-founders and discuss startup ideas.', stanford_id)
    ON CONFLICT DO NOTHING;
  END IF;

  IF mit_id IS NOT NULL THEN
    INSERT INTO public.communities (name, description, university_id)
    VALUES 
      ('MIT AI Researchers', 'Latest papers and academic discussion on Artificial Intelligence.', mit_id)
    ON CONFLICT DO NOTHING;
  END IF;
  
  -- Global Community Example
  INSERT INTO public.communities (name, description, university_id)
  VALUES ('Global Developers', 'A place for students from all universities to share code and projects.', NULL)
  ON CONFLICT DO NOTHING;
END $$;
