'use client'; // Mark as a Client Component

import { useState } from 'react';
import { login } from '@/lib/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert('Logged in successfully!');
      router.push('/admin');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Login failed: ' + error.message);
      } else {
        alert('Login failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-black text-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image src="/hello.svg" alt="Logo" width={60} height={60} className="w-16 h-16" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-white font-medium mb-2">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-black-500 text-white py-2 px-4 rounded-lg hover:bg-white-600 hover:text-black transition-colors border border-white-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}
