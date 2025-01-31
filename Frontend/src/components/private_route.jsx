import React, { useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if not authenticated
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
        <div className='w-full h-full flex justify-center items-center'>
          <h1 className="text-2xl font-semibold">Loading...</h1>
        </div>
    );
  }

  if (user) {
    return children;
  }

  return null;
};

export default PrivateRoute;
