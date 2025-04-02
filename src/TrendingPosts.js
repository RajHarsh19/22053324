import React, { useMemo } from 'react';
import { useData } from './DataContext';

export default function TrendingPosts() {
  const { posts, comments } = useData();

  const trendingPosts = useMemo(() => {
    const commentCounts = comments.reduce((acc, comment) => {
      acc[comment.postId] = (acc[comment.postId] || 0) + 1;
      return acc;
    }, {});

    const maxCount = Math.max(...Object.values(commentCounts), 0);
    return posts.filter(post => commentCounts[post.id] === maxCount);
  }, [posts, comments]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Trending Posts</h1>
      <div className="grid grid-cols-1 gap-4">
        {trendingPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg p-4 shadow-md">
            <img
              src={`https://picsum.photos/seed/${post.id}/800/400`}
              alt="Post"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-800 mb-2">{post.body}</p>
            <div className="flex items-center text-gray-500">
              <span className="mr-4">📌 {post.userId}</span>
              <span>💬 {comments.filter(c => c.postId === post.id).length}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}