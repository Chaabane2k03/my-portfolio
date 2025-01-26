'use client'; // Mark as a Client Component

import { useState } from 'react';
import { signUpAdmin } from '@/lib/auth';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignup = async () => {
    try {
      await signUpAdmin(email, password, username);
      alert('Admin account created successfully!');
    } catch (error) {
      if (error instanceof Error) {
        alert('Signup failed: ' + error.message);
      } else {
        alert('Signup failed');
      }
    }
  };

  return (
    <div>
      <h1>Admin Signup</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}