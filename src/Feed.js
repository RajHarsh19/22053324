import React, { useMemo } from 'react';
import { useData } from './DataContext';

export default function Feed() {
  const { posts } = useData();

  const sortedPosts = useMemo(() => 
    [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [posts]
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Real-Time Feed</h1>
      <div className="grid grid-cols-1 gap-4">
        {sortedPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-4">
              <img
                src={`https://picsum.photos/seed/${post.userId}/50/50`}
                alt="User"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h2 className="font-semibold">User {post.userId}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-gray-800 mb-2">{post.body}</p>
            <img
              src={`https://picsum.photos/seed/${post.id}/800/400`}
              alt="Post"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}