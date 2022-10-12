import './styles/App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IPost } from './api/interfaces';

axios.defaults.baseURL = process.env.REACT_APP_POST_API || 'http://localhost:3001';

const fetchPosts = async (): Promise<Array<IPost>> => {
  const response = await axios.get<Array<IPost>>('/posts');
  return response.data;
};

function App() {
  const [post, setPost] = useState<Array<IPost>>([]);
  const [error, setError] = useState<string | undefined>();
  const [postText, setPostText] = useState<string>('');
  const [userNameText, setUserNameText] = useState<string>('');

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
      setPostText('');
    } catch (err) {
      setPost([]);
      setError('Something went wrong with fetching posts..');
    }
  };

  const clearInput = () => {
    setPostText('');
    setUserNameText('');
  };

  useEffect(() => {
    fetchPosts().then(setPost).catch(() => {
      setPost([]);
      setError('Something went wrong with fetching posts');
    });
  }, []);
  return (
    <div className="App">
      <section className="App-form">
        <p className="label">User</p>
        <input type="text" value={userNameText} onChange={(e) => setUserNameText(e.target.value)} />
        <p className="label">Message</p>
        <input type="text" value={postText} onChange={(e) => setPostText(e.target.value)} />
        <button
          type="submit"
          disabled={userNameText.length < 1 || postText.length < 1}
          onClick={() => createPost(postText, userNameText)}
          className="submit-button"
        >
          Send
        </button>
        <button className="clear-button" type="reset" onClick={clearInput}>Clear all fields</button>
      </section>
      <header className="app-output">
        {post ? post.map((p) => (
          <div>
            <div className="app-messages" key={p.id}>
              <p key={p.id}>
                {' '}
                {p.text}
              </p>
              <p key={p.id}>
                Sent by:
                {' '}
                {p.userName}
              </p>
            </div>
            <div className="app-date" key={p.id}>
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
          </div>
        )) : error || 'Waiting for posts..'}
      </header>
    </div>
  );
}

export default App;
