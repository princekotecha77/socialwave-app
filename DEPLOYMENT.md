# Deployment Guide

## Quick Deploy to Vercel

1. **Fork/Clone the repository**
```bash
git clone https://github.com/princekotecha77/socialwave-app.git
cd socialwave-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key from Settings > API
   - Run the database schema (see DATABASE_SETUP.md)

4. **Configure environment variables**
```bash
cp .env.example .env.local
```
Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

5. **Run locally**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

6. **Deploy to Vercel**
   - Push code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy!

## Alternative: Deploy with Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Performance Optimization Checklist

- [x] Image optimization with Next.js Image
- [x] Code splitting and lazy loading
- [x] Service Worker for offline support
- [x] Aggressive caching strategy
- [x] Tailwind CSS purging
- [x] Compression enabled
- [ ] CDN configuration
- [ ] Database indexing
- [ ] Redis caching layer

## Monitoring Setup

1. **Vercel Analytics** - Automatically enabled
2. **Sentry** - Error tracking (optional)
3. **LogRocket** - Session replay (optional)

## Scaling Considerations

- Use Vercel Edge Functions for API routes
- Implement Redis for session management
- Set up CDN for static assets
- Enable database read replicas
- Implement rate limiting
