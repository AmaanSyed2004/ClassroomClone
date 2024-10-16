import React, { useState } from 'react';
import { Login } from '../components/Login';
import { Signup } from '../components/Signup';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
        {isLogin ? (
          <Login toggleForm={() => setIsLogin(false)} />
        ) : (
          <Signup toggleForm={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default Auth;
