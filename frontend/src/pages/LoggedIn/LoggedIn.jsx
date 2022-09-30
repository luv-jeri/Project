import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoggedIn() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, []);

  return <div>LoggedIn</div>;
}
