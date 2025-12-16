# 🚀 SocialWave - Quick Start Guide

Get your Instagram-killer app running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Git installed
- A Supabase account (free tier works!)
- A Vercel account (optional, for deployment)

## Step 1: Clone & Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/princekotecha77/socialwave-app.git
cd socialwave-app

# Install dependencies
npm install
```

## Step 2: Set Up Supabase (2 minutes)

### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for database to initialize (~2 minutes)

### Get Your Credentials
1. Go to Project Settings → API
2. Copy your **Project URL**
3. Copy your **anon/public key**

### Set Up Database
1. Go to SQL Editor in Supabase
2. Copy the entire content from `DATABASE_SETUP.md`
3. Paste and run it
4. Done! Your database is ready 🎉

## Step 3: Configure Environment (30 seconds)

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local and add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 4: Run Locally (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎊

You should see:
- ✅ SocialWave header
- ✅ Infinite scroll feed with mock posts
- ✅ Bottom navigation
- ✅ Create post button

## Step 5: Deploy to Vercel (Optional - 2 minutes)

### Option A: Using Vercel Dashboard
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"
7. Done! Your app is live 🌐

### Option B: Using Vercel CLI
```bash
npm i -g vercel
vercel login
vercel

# Follow prompts and add environment variables when asked
```

## What You Get Out of the Box

### ✅ Core Features
- Infinite scroll feed
- Post creation modal
- Like/comment interactions
- Responsive design
- Dark mode ready
- Offline support (PWA)

### ✅ Performance
- Image optimization
- Code splitting
- Lazy loading
- Service worker caching
- <2s initial load target

### ✅ Developer Experience
- TypeScript
- Tailwind CSS
- Hot reload
- ESLint ready
- Component-based architecture

## Next Steps

### Add Real Data
Replace mock data in `store/feedStore.ts` with real Supabase queries:

```typescript
// Example: Fetch real posts
const { data: posts } = await supabase
  .from('posts')
  .select('*, user:users(*)')
  .order('created_at', { ascending: false })
  .range(0, 9)
```

### Add Authentication
Implement Supabase Auth in your app:

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})
```

### Customize Design
- Edit `tailwind.config.ts` for colors/theme
- Modify components in `components/` folder
- Update `app/globals.css` for global styles

## Troubleshooting

### Port 3000 already in use?
```bash
# Use different port
PORT=3001 npm run dev
```

### Build errors?
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Supabase connection issues?
- Double-check your `.env.local` file
- Ensure no extra spaces in environment variables
- Verify your Supabase project is active

## Project Structure

```
socialwave-app/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx
│   ├── Feed.tsx
│   ├── PostCard.tsx
│   └── CreatePost.tsx
├── store/                 # State management
│   ├── authStore.ts
│   └── feedStore.ts
├── lib/                   # Utilities
│   └── supabase.ts
├── public/                # Static assets
│   ├── manifest.json
│   ├── sw.js
│   └── offline.html
└── Documentation files
```

## Resources

- 📖 [Full Documentation](./README.md)
- 🏗️ [Architecture Guide](./ARCHITECTURE.md)
- 🗄️ [Database Setup](./DATABASE_SETUP.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- 🤝 [Contributing](./CONTRIBUTING.md)

## Support

- Open an issue on GitHub
- Check existing issues for solutions
- Read the documentation

## What's Next?

Check out the roadmap in `README.md` for upcoming features:
- Stories
- Direct messaging
- Video support
- AI recommendations
- Mobile apps

---

**Built with ❤️ by the SocialWave team**

Happy coding! 🎉
