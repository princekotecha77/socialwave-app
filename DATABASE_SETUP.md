# Database Setup Guide

## Supabase Schema Setup

Run these SQL commands in your Supabase SQL Editor:

### 1. Enable UUID Extension
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 2. Create Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
```

### 3. Create Posts Table
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
```

### 4. Create Likes Table
```sql
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Indexes
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);
```

### 5. Create Comments Table
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
```

### 6. Create Follows Table
```sql
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Indexes
CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);
```

### 7. Create Functions for Counters

```sql
-- Function to update likes count
CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for likes
CREATE TRIGGER trigger_update_likes_count
AFTER INSERT OR DELETE ON likes
FOR EACH ROW EXECUTE FUNCTION update_post_likes_count();

-- Function to update comments count
CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for comments
CREATE TRIGGER trigger_update_comments_count
AFTER INSERT OR DELETE ON comments
FOR EACH ROW EXECUTE FUNCTION update_post_comments_count();
```

### 8. Set up Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Posts policies
CREATE POLICY "Posts are viewable by everyone" ON posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON posts FOR DELETE USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Likes are viewable by everyone" ON likes FOR SELECT USING (true);
CREATE POLICY "Users can like posts" ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike posts" ON likes FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Follows are viewable by everyone" ON follows FOR SELECT USING (true);
CREATE POLICY "Users can follow others" ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow others" ON follows FOR DELETE USING (auth.uid() = follower_id);
```

### 9. Storage Bucket Setup

Go to Storage in Supabase Dashboard and create a bucket named `posts`:

```sql
-- Set up storage policies
CREATE POLICY "Anyone can view post images" ON storage.objects FOR SELECT USING (bucket_id = 'posts');
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'posts' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own images" ON storage.objects FOR UPDATE USING (bucket_id = 'posts' AND auth.uid()::text = owner);
CREATE POLICY "Users can delete own images" ON storage.objects FOR DELETE USING (bucket_id = 'posts' AND auth.uid()::text = owner);
```

## Seed Data (Optional)

```sql
-- Insert sample users
INSERT INTO users (username, email, full_name, bio) VALUES
  ('john_doe', 'john@example.com', 'John Doe', 'Photography enthusiast 📸'),
  ('jane_smith', 'jane@example.com', 'Jane Smith', 'Travel blogger ✈️'),
  ('mike_wilson', 'mike@example.com', 'Mike Wilson', 'Foodie 🍕');
```

Your database is now ready! 🚀
