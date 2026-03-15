-- Phase 5: Comments and Likes Schema

-- Create Comments table
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Likes table (preventing double-liking via composite primary key constraint)
CREATE TABLE public.likes (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (post_id, user_id)
);


-- Set up Row Level Security (RLS) for comments
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all comments
CREATE POLICY "Comments are viewable by everyone" ON public.comments
  FOR SELECT USING (true);

-- Allow authenticated users to create comments
CREATE POLICY "Users can create comments" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Optional: Allow users to delete their own comments
CREATE POLICY "Users can delete their own comments" ON public.comments
  FOR DELETE USING (auth.uid() = author_id);


-- Set up Row Level Security (RLS) for likes
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to see who liked what
CREATE POLICY "Likes are viewable by everyone" ON public.likes
  FOR SELECT USING (true);

-- Allow authenticated users to like a post (insert row mapping to their id)
CREATE POLICY "Users can like posts" ON public.likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to unlike a post (delete row mapping to their id)
CREATE POLICY "Users can unlike posts" ON public.likes
  FOR DELETE USING (auth.uid() = user_id);
