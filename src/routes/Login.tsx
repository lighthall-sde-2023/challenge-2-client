import React from 'react';
import '../Login.css'

export default function Login() {
  return (
    <form action="/task">
      <h1>Login</h1>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" placeholder="Enter your username" required />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" required />
      <input type="submit" value="Login" />
    </form>
  );
}
