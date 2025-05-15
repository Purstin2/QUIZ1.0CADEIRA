import React from 'react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const showGoalsHeader = location.pathname === '/goals';
  
  return (
    <header className="px-4 py-4">
      {showGoalsHeader ? (
        <div className="w-full text-center font-medium text-gray-500 uppercase tracking-wide text-sm">
          OBJETIVOS
        </div>
      ) : (
        <div className="w-full text-center">
          <h1 className="text-[#7432B4] font-bold text-2xl tracking-wider">FENJES</h1>
        </div>
      )}
    </header>
  );
};

export default Header;