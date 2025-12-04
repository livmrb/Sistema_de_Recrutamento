import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">Página não encontrada</h2>
        <p className="text-gray-600 mt-2 mb-8">
          A página que você está procurando não existe.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;