import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PostProps } from './api/interfaces';

axios.defaults.baseURL = 'http://localhost:3001';

const fetchPosts = async (): Promise<PostProps> => {
  const response = await axios.get<PostProps>('/');
  return response.data;
};

function App() {
  const [post, setPost] = useState<PostProps | undefined>();
  useEffect(() => {
    fetchPosts().then(setPost);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {post ? post.text : 'No posts'}
      </header>
    </div>
  );
}

export default App;
