import React from 'react';
import axios from 'axios';

function Home({ history }) {
  const handleLogout = async () => {
    axios
      .post('/api/users/logout')
      .then((res) => {
        console.log(res);
        history.push('/register');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
