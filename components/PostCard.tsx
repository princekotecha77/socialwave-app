'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

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

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.is_liked || false)
  const [likesCount, setLikesCount] = useState(post.likes_count)

  const handleLike = async () => {
    setLiked(!liked)
    setLikesCount(liked ? likesCount - 1 : likesCount + 1)
    // TODO: API call to like/unlike
  }

  const handleDoubleTap = () => {
    if (!liked) {
      handleLike()
    }
  }

  return (
    <motion.article 
      className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-0.5">
            <Image
              src={post.user.avatar_url || '/default-avatar.png'}
              alt={post.user.username}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{post.user.username}</p>
          <p className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </div>

      {/* Image */}
      <div 
        className="relative aspect-square bg-gray-100 dark:bg-gray-800"
        onDoubleClick={handleDoubleTap}
      >
        <Image
          src={post.image_url}
          alt={post.caption || 'Post image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
          priority={false}
        />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <button 
            onClick={handleLike}
            className="hover:opacity-70 transition"
          >
            <motion.svg 
              className="w-7 h-7" 
              fill={liked ? '#E1306C' : 'none'}
              stroke={liked ? '#E1306C' : 'currentColor'}
              strokeWidth="2"
              viewBox="0 0 24 24"
              whileTap={{ scale: 1.2 }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </motion.svg>
          </button>
          <button className="hover:opacity-70 transition">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <button className="hover:opacity-70 transition">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>
            </svg>
          </button>
          <button className="ml-auto hover:opacity-70 transition">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mb-2">
          {likesCount.toLocaleString()} likes
        </p>

        {/* Caption */}
        {post.caption && (
          <p className="text-sm mb-2">
            <span className="font-semibold mr-2">{post.user.username}</span>
            {post.caption}
          </p>
        )}

        {/* Comments */}
        {post.comments_count > 0 && (
          <button className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            View all {post.comments_count} comments
          </button>
        )}
      </div>
    </motion.article>
  )
}
