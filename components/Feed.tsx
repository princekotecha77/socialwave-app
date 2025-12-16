'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import PostCard from './PostCard'
import { useFeedStore } from '@/store/feedStore'

export default function Feed() {
  const { posts, loading, hasMore, fetchPosts, loadMore } = useFeedStore()
  const { ref, inView } = useInView()

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore()
    }
  }, [inView, hasMore, loading, loadMore])

  if (loading && posts.length === 0) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
            <div className="skeleton h-96 w-full"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {hasMore && (
        <div ref={ref} className="py-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          You're all caught up! 🎉
        </div>
      )}
    </div>
  )
}
