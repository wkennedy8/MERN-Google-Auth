import React from 'react';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Email</label>
        <input type="email" required />
        <label>Password</label>
        <input type="password" required />
        <button type="submit">Sign In</button>
      </form>
      <a href="http://localhost:8000/auth/google">Login with Google</a>
    </div>
  );
}

export default Login;
