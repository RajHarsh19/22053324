import React, { useMemo } from 'react';
import { useData } from './DataContext';

export default function TopUsers() {
  const { users, posts } = useData();

  const topUsers = useMemo(() => {
    const counts = posts.reduce((acc, post) => {
      acc[post.userId] = (acc[post.userId] || 0) + 1;
      return acc;
    }, {});

    return users
      .map(user => ({ ...user, count: counts[user.id] || 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [users, posts]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Top Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topUsers.map(user => (
          <div key={user.id} className="bg-white rounded-lg p-4 shadow-md">
            <img
              src={`https://picsum.photos/seed/${user.id}/100/100`}
              alt="User"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">{user.name}</h2>
            <p className="text-center text-gray-600">{user.count} posts</p>
          </div>
        ))}
      </div>
    </div>
  );
}