"use client";
import React from 'react'
import { useState, useEffect } from 'react'

const SkillsPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <div>{message}</div>;
}

export default SkillsPage