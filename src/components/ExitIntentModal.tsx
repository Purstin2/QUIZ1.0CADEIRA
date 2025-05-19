{/* */}import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const ExitIntentModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [exitAttempts, setExitAttempts] = useState(0);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      // Só mostrar após primeira interação e max de 2 vezes por sessão
      if (e.clientY <= 5 && exitAttempts < 2) {
        setShowModal(true);
        setExitAttempts(prev => prev + 1);
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [exitAttempts]);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl max-w-md w-full p-6 relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-[#7432B4]" />
              </div>
              <h3 className="text-xl font-bold text-[#2D1441] mb-2">
                Espere! Seu plano está quase pronto
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Já analisamos 65% do seu perfil! Faltam apenas 2 minutos para você descobrir a rotina de exercícios perfeita para seu corpo.
              </p>
              
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <div className="text-sm text-purple-800 font-medium">
                  <span className="text-purple-900 block mb-1">Uma usuária acaba de completar:</span>
                  "Hesitei em continuar, mas que bom que terminei! Em 3 semanas eliminei minhas dores nas costas e perdi 3kg." - Maria S.
                </div>
              </div>
              
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-[#7432B4] text-white font-bold py-3 rounded-lg hover:bg-[#6822A6] transition-colors mb-2"
              >
                Continuar Meu Plano
              </button>
              
              <button
                onClick={() => setShowModal(false)}
                className="w-full text-sm text-gray-500 hover:text-[#7432B4]"
              >
                Vou pensar um pouco mais
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentModal;

// Implementar no App.tsx para que esteja disponível em todas as páginas
function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      <QuizProvider>
        <ProgressBar />
        
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {/* Rotas existentes */}
          </Routes>
        </AnimatePresence>
        
        <ExitIntentModal />
        <QuickNav />
      </QuizProvider>
    </div>
  );
}