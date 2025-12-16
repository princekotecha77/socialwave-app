# SocialWave Architecture

## System Overview

SocialWave is built with a modern, scalable architecture optimized for performance, offline-first functionality, and user engagement.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Image Optimization**: Next.js Image + Sharp

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

### Infrastructure
- **Hosting**: Vercel
- **CDN**: Vercel Edge Network
- **Caching**: Service Workers + Browser Cache

## Architecture Layers

### 1. Presentation Layer
```
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Home page with feed
└── globals.css         # Global styles

components/
├── Header.tsx          # Top navigation
├── Feed.tsx            # Infinite scroll feed
├── PostCard.tsx        # Individual post component
└── CreatePost.tsx      # Post creation modal
```

### 2. State Management Layer
```
store/
├── authStore.ts        # User authentication state
└── feedStore.ts        # Feed data and pagination
```

### 3. Data Layer
```
lib/
└── supabase.ts         # Supabase client configuration
```

## Key Features Implementation

### Infinite Scroll
- Uses `react-intersection-observer` for viewport detection
- Loads 10 posts per page
- Automatic loading when user scrolls near bottom
- Skeleton loading states for smooth UX

### Offline Support
- Service Worker caches essential assets
- IndexedDB for offline post storage
- Background sync for posting when back online
- Graceful degradation with offline page

### Performance Optimizations

#### Image Optimization
- Next.js Image component with automatic optimization
- WebP/AVIF format support
- Lazy loading below the fold
- Responsive images with srcset

#### Code Splitting
- Automatic route-based code splitting
- Dynamic imports for heavy components
- Tree shaking for unused code

#### Caching Strategy
```
Cache-First: Static assets (images, fonts)
Network-First: API calls (posts, user data)
Stale-While-Revalidate: Feed data
```

## Database Schema

### Users Table
```sql
users (
  id: UUID PRIMARY KEY,
  username: TEXT UNIQUE,
  email: TEXT UNIQUE,
  full_name: TEXT,
  avatar_url: TEXT,
  bio: TEXT,
  created_at: TIMESTAMP
)
```

### Posts Table
```sql
posts (
  id: UUID PRIMARY KEY,
  user_id: UUID REFERENCES users,
  image_url: TEXT,
  caption: TEXT,
  likes_count: INTEGER,
  comments_count: INTEGER,
  created_at: TIMESTAMP
)
```

### Relationships
- Users → Posts (1:N)
- Users → Likes (N:M via likes table)
- Users → Comments (1:N)
- Users → Follows (N:M via follows table)

## API Routes (Future)

```
/api/posts
  GET    - Fetch feed posts
  POST   - Create new post

/api/posts/[id]
  GET    - Get single post
  PUT    - Update post
  DELETE - Delete post

/api/posts/[id]/like
  POST   - Like post
  DELETE - Unlike post

/api/posts/[id]/comments
  GET    - Get comments
  POST   - Add comment
```

## Security

### Row Level Security (RLS)
- Users can only update their own data
- Posts are viewable by everyone
- Only authenticated users can create content

### Authentication
- JWT-based authentication via Supabase
- Secure session management
- OAuth providers support (Google, GitHub, etc.)

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Initial Load | <2s | TBD |
| Time to Interactive | <3s | TBD |
| Lighthouse Score | >90 | TBD |
| First Contentful Paint | <1.5s | TBD |

## Scalability Considerations

### Horizontal Scaling
- Stateless architecture
- CDN for static assets
- Database read replicas

### Vertical Scaling
- Connection pooling
- Query optimization
- Indexed database columns

### Caching Layers
1. Browser cache (Service Worker)
2. CDN cache (Vercel Edge)
3. Application cache (Redis - future)
4. Database cache (PostgreSQL)

## Monitoring & Analytics

### Performance Monitoring
- Vercel Analytics (built-in)
- Web Vitals tracking
- Error tracking (Sentry - optional)

### User Analytics
- Page views
- Engagement metrics
- Conversion funnels

## Future Enhancements

### Phase 2
- [ ] Stories feature
- [ ] Direct messaging
- [ ] Video support
- [ ] AI recommendation engine

### Phase 3
- [ ] Live streaming
- [ ] Monetization (ads, subscriptions)
- [ ] Advanced analytics dashboard
- [ ] Mobile apps (React Native)

## Development Workflow

```bash
# Local development
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Linting
npm run lint
```

## Deployment Pipeline

```
Git Push → GitHub → Vercel
  ↓
Build & Test
  ↓
Deploy to Preview
  ↓
Manual Approval
  ↓
Deploy to Production
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=        # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Supabase anonymous key
```

## Contributing

See CONTRIBUTING.md for development guidelines.
