import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IPost } from './api/interfaces';

axios.defaults.baseURL = process.env.REACT_APP_POST_API || 'http://localhost:3001';

// fetch posts 
const fetchPosts = async (): Promise<Array<IPost>> => {
  const response = await axios.get<Array<IPost>>('/posts');
  return response.data;
};

function App() {
  const [post, setPost] = useState<Array<IPost>>([]);
  const [error, setError] = useState<string | undefined>();
  const [user, setUser] = useState<Array<IPost>>([]);
  const [postText, setPostText] = useState<string>("");
  
  // create posts

  useEffect(() => {
    fetchPosts().then(setPost);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {}
        <p>{post ? post.text : 'No posts'}</p>
        <p>{post ? `${post.timeStamp.toString().split('T')[0]} at ${post.timeStamp.toString().split('T')[1].substring(0, 8)} ${parseInt(post.timeStamp.toString().split('T')[1].substring(0, 8), 10) >= 12 ? 'PM' : 'AM'} ` : 'No date'}</p>
      </header>
    </div>
  );
}

export default App;
