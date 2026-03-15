-- Phase 4: Posts & Storage Schema

-- Create Posts table
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE, -- Null means it is a global/general post
  content TEXT NOT NULL,
  image_url TEXT, -- URL or path to the image in Supabase Storage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS) for posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all posts
CREATE POLICY "Posts are viewable by everyone" ON public.posts
  FOR SELECT USING (true);

-- Allow authenticated users to create posts
CREATE POLICY "Users can create posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Optional: Allow users to delete their own posts
CREATE POLICY "Users can delete their own posts" ON public.posts
  FOR DELETE USING (auth.uid() = author_id);


-- Set up Storage for post media
-- Note: You MUST manually create a storage bucket named 'post-media' in your Supabase Dashboard 
-- -> Storage -> New Bucket. Make it "Public".

-- The following policies apply to the 'post-media' bucket (once you create it):
CREATE POLICY "Public media is viewable by everyone." 
  ON storage.objects FOR SELECT 
  USING ( bucket_id = 'post-media' );

CREATE POLICY "Authenticated users can upload media." 
  ON storage.objects FOR INSERT 
  WITH CHECK ( bucket_id = 'post-media' AND auth.role() = 'authenticated' );

CREATE POLICY "Users can delete their own media." 
  ON storage.objects FOR DELETE 
  USING ( bucket_id = 'post-media' AND auth.uid() = owner );
