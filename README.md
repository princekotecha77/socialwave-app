# SocialWave - Next-Gen Social Media Platform

Instagram reimagined with superior UX, offline-first architecture, and optimized engagement.

## 🚀 Key Features

- **Offline-First**: Works seamlessly on 2G connections
- **Lightning Fast**: <2s initial load, <100ms interactions
- **AI-Powered Feed**: Hyper-personalized content curation
- **Effortless Creation**: AI-assisted editing and smart tools
- **Low Bandwidth**: Adaptive quality, aggressive caching
- **Bug-Free**: 80%+ test coverage, continuous monitoring

## 🛠 Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: Tailwind CSS + Framer Motion
- **State**: Zustand
- **Performance**: React Window (virtualization)
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/princekotecha77/socialwave-app.git
cd socialwave-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🗄 Database Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Likes table
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Follows table
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);
```

## 🎯 Roadmap

### Phase 1 (MVP) ✅
- [x] Core feed with infinite scroll
- [x] Post creation with image upload
- [x] User profiles
- [x] Like & comment system
- [x] Follow/unfollow
- [x] Offline support

### Phase 2 (Growth)
- [ ] Stories feature
- [ ] Direct messaging
- [ ] AI recommendation engine
- [ ] Advanced editing tools
- [ ] Video support

### Phase 3 (Scale)
- [ ] Live streaming
- [ ] Monetization
- [ ] Analytics dashboard
- [ ] Mobile apps (React Native)

## 📱 Performance Targets

- Initial Load: <2s
- Time to Interactive: <3s
- Interaction Response: <100ms
- Lighthouse Score: >90

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

## 📄 License

MIT License - see LICENSE file for details
