import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Menu, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuickNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isDev, setIsDev] = useState(true); // Toggle para controlar exibição em produção

  const routes = [
    { path: '/', label: 'Age Selection' },
    { path: '/sex-selection', label: 'Sex Selection' },
    { path: '/community', label: 'Community Page' },
    { path: '/goals', label: 'Goals Selection' },
    { path: '/confirmation', label: 'Confirmation Page' },
    { path: '/chair-yoga-experience', label: 'Chair Yoga Experience' },
    { path: '/chair-yoga-info', label: 'Chair Yoga Info' },
    { path: '/target-zones', label: 'Target Zones' },
    { path: '/body-type', label: 'Body Type' },
    { path: '/dream-body', label: 'Dream Body' },
    { path: '/activity-level', label: 'Activity Level' },
    { path: '/walking-time', label: 'Walking Time' },
    { path: '/yoga-level', label: 'Yoga Level' },
    { path: '/sensitivity-check', label: 'Sensitivity Check' },
    { path: '/support-step', label: 'Support Step' },
    { path: '/exercise-style', label: 'Exercise Style' },
    { path: '/available-time', label: 'Available Time' },
    { path: '/bmi-calculator', label: 'BMI Calculator' },
    { path: '/profile-summary', label: 'Profile Summary' },
    { path: '/plan-definitive', label: 'Plan Definitive' },
    { path: '/creating-plan', label: 'Creating Plan' },
    { path: '/plan-ready', label: 'Plan Ready' },
    { path: '/sales', label: 'Sales Page' },
    { path: '/checkout', label: 'Checkout' },
    { path: '/success', label: 'Success' }
  ];

  const currentIndex = routes.findIndex(route => route.path === location.pathname);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < routes.length - 1;

  const handleNext = () => {
    if (hasNext) {
      navigate(routes[currentIndex + 1].path);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      navigate(routes[currentIndex - 1].path);
    }
  };

  const handleJump = (path: string) => {
    navigate(path);
    setShowMenu(false);
  };

  const handleToggleDev = () => {
    setIsDev(!isDev);
    // Opcionalmente, você pode salvar a preferência no localStorage
    localStorage.setItem('quicknav-dev-mode', (!isDev).toString());
  };

  // Se não estiver em modo de desenvolvimento, não renderiza nada
  if (!isDev) return null;

  return (
    <>
      {/* Navegação Rápida */}
      <div className="fixed bottom-4 right-4 flex items-center gap-2 z-50">
        <motion.button
          onClick={() => setShowMenu(!showMenu)}
          className="bg-purple-800 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {showMenu ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
        
        <AnimatePresence>
          {!showMenu && (
            <>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${!hasPrev ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-700'}`}
                onClick={handlePrev}
                disabled={!hasPrev}
                whileHover={hasPrev ? { scale: 1.1 } : {}}
                whileTap={hasPrev ? { scale: 0.9 } : {}}
              >
                <ChevronLeft size={20} />
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${!hasNext ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-700'}`}
                onClick={handleNext}
                disabled={!hasNext}
                whileHover={hasNext ? { scale: 1.1 } : {}}
                whileTap={hasNext ? { scale: 0.9 } : {}}
              >
                <ChevronRight size={20} />
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700"
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Home size={18} />
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>
      
      {/* Menu de navegação expandido */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-16 right-4 bg-white rounded-xl shadow-xl p-4 w-64 max-h-[70vh] overflow-y-auto z-50 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-3 sticky top-0 bg-white pb-2 border-b">
              <h3 className="font-bold text-purple-800">Dev Navigation</h3>
              <button 
                onClick={handleToggleDev}
                className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded"
              >
                Hide Nav
              </button>
            </div>
            
            <div className="space-y-1">
              {routes.map((route, index) => (
                <button
                  key={route.path}
                  onClick={() => handleJump(route.path)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    location.pathname === route.path
                      ? 'bg-purple-100 text-purple-800 font-medium'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="w-5 text-xs text-gray-400">{index + 1}.</span>
                    <span>{route.label}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
              <p>Current page: <span className="font-medium text-purple-800">{routes[currentIndex]?.label}</span></p>
              <p className="mt-1">Progress: {Math.round(((currentIndex + 1) / routes.length) * 100)}%</p>
              <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                <div 
                  className="h-1 bg-purple-600 rounded-full" 
                  style={{ width: `${((currentIndex + 1) / routes.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuickNav;