import React, { createContext, useContext, useEffect, useReducer, useMemo } from 'react';

const DataContext = createContext();

function dataReducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        users: action.payload.users,
        posts: action.payload.posts,
        comments: action.payload.comments,
        lastUpdated: new Date()
      };
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    posts: [],
    comments: [],
    lastUpdated: null
  });

  const fetchData = async () => {
    try {
      const [users, posts, comments] = await Promise.all([
        fetch('/api/users').then(res => res.json()),
        fetch('/api/posts').then(res => res.json()),
        fetch('/api/comments').then(res => res.json())
      ]);
      
      dispatch({ type: 'SET_DATA', payload: { users, posts, comments } });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);