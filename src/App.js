import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { DataProvider } from './DataContext';
import TopUsers from './TopUsers';
import TrendingPosts from './TrendingPosts';
import Feed from './Feed';

export default function App() {
  return (
    <Router>
      <DataProvider>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <span className="text-xl font-bold">Social Analytics</span>
                <div className="flex space-x-4">
                  <Link to="/" className="px-3 py-2 rounded hover:bg-gray-100">Feed</Link>
                  <Link to="/top-users" className="px-3 py-2 rounded hover:bg-gray-100">Top Users</Link>
                  <Link to="/trending-posts" className="px-3 py-2 rounded hover:bg-gray-100">Trending Posts</Link>
                </div>
              </div>
            </div>
          </nav>

          <Switch>
            <Route path="/top-users" component={TopUsers} />
            <Route path="/trending-posts" component={TrendingPosts} />
            <Route path="/" component={Feed} />
          </Switch>
        </div>
      </DataProvider>
    </Router>
  );
}