import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
        }
        Insert: {
          id?: string
          username: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          image_url: string
          caption: string | null
          likes_count: number
          comments_count: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          image_url: string
          caption?: string | null
          likes_count?: number
          comments_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          image_url?: string
          caption?: string | null
          likes_count?: number
          comments_count?: number
          created_at?: string
        }
      }
    }
  }
}
