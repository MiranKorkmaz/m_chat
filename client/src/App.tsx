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
  const [postText, setPostText] = useState<string>('');
  const [userNameText, setUserNameText] = useState<string>('');

  // create posts
  const createPost = async (postText: string, userNameText: string): Promise<void> => {
    const post: IPost = {
      userName: userNameText,
      text: postText,
      timeStamp: new Date(),
    };
    try {
      await axios.post<Array<IPost>>('/posts', post);
      const response = await axios.get<Array<IPost>>('/posts');
      setPost(response.data);
      setPost("");
    } catch (err) {
      setPost([]);
      setError('Something went wrong with fetching posts..');
    }
  };

  useEffect(() => {
    fetchPosts().then(setPost).catch(() => {
      setPost([]);
      setError('Something went wrong with fetching posts');
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {post ? post.map((p) => (
          <div key={p.id}>
            <p key={p.id}>
              Message:
              {' '}
              {p.text}
            </p>
            <p key={p.id}>
              User:
              {' '}
              {p.userName}
            </p>
            <p key={p.id}>
              Date:
              {' '}
              {p.timeStamp.toString().split('T')[0]}
              {' '}
              at
              {' '}
              {p.timeStamp.toString().split('T')[1].substring(0, 8)}
              {' '}
              {parseInt(p.timeStamp.toString().split('T')[1].substring(0, 8), 10) >= 12 ? 'PM' : 'AM'}
            </p>
          </div>
        )) : error || 'Waiting for posts..'}
      </header>
      <section>
        <input type="text" value={postText} onChange={(e) => setPostText(e.target.value)} />
        <input type="text" value={userNameText} onChange={(e) => setUserNameText(e.target.value)} />
        <button type="submit" onClick={() => createPost(postText, userNameText)}>Send</button>
      </section>
    </div>
  );
}

export default App;
