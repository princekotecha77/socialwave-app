import { create } from 'zustand'

interface Post {
  id: string
  user: {
    username: string
    avatar_url: string
  }
  image_url: string
  caption: string
  likes_count: number
  comments_count: number
  created_at: string
  is_liked?: boolean
}

interface FeedState {
  posts: Post[]
  loading: boolean
  hasMore: boolean
  page: number
  fetchPosts: () => Promise<void>
  loadMore: () => Promise<void>
  addPost: (post: Post) => void
  updatePost: (id: string, updates: Partial<Post>) => void
}

// Mock data for prototype
const generateMockPosts = (count: number, offset: number = 0): Post[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `post-${offset + i}`,
    user: {
      username: `user${(offset + i) % 10}`,
      avatar_url: `https://i.pravatar.cc/150?img=${(offset + i) % 70}`,
    },
    image_url: `https://picsum.photos/600/600?random=${offset + i}`,
    caption: `This is post #${offset + i + 1}. Amazing content! 🚀 #socialwave #prototype`,
    likes_count: Math.floor(Math.random() * 1000),
    comments_count: Math.floor(Math.random() * 100),
    created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    is_liked: Math.random() > 0.5,
  }))
}

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: [],
  loading: false,
  hasMore: true,
  page: 0,

  fetchPosts: async () => {
    set({ loading: true })
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const mockPosts = generateMockPosts(10, 0)
    set({ posts: mockPosts, loading: false, page: 1 })
  },

  loadMore: async () => {
    const { page, posts } = get()
    if (page >= 5) {
      set({ hasMore: false })
      return
    }

    set({ loading: true })
    await new Promise((resolve) => setTimeout(resolve, 800))
    const newPosts = generateMockPosts(10, posts.length)
    set({
      posts: [...posts, ...newPosts],
      loading: false,
      page: page + 1,
    })
  },

  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),

  updatePost: (id, updates) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...updates } : post
      ),
    })),
}))
