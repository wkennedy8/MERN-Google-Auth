import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleGoogle = async () => {
    fetch('/auth/google')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" required onChange={handleChange} name="name" />
        <label>Email</label>
        <input type="email" required onChange={handleChange} name="email" />
        <label>Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="password"
        />
        <button type="submit">Sign In</button>
      </form>
      <a href="http://localhost:8000/auth/google">Sign Up with Google</a>
      <a href="http://localhost:8000/auth/facebook">Sign Up with Facebook</a>
      <a href="http://localhost:8000/auth/github">Sign Up with Github</a>
    </div>
  );
}

export default Register;
