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
        <p>{post ? post.text : 'No posts'}</p>
        <p>{post ? `${post.timeStamp.toString().split('T')[0]} at ${post.timeStamp.toString().split('T')[1].substring(0, 8)} ${parseInt(post.timeStamp.toString().split('T')[1].substring(0, 8), 10) >= 12 ? 'PM' : 'AM'} ` : 'No date'}</p>
      </header>
    </div>
  );
}

export default App;
