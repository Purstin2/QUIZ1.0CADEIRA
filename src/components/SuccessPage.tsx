import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useQuiz } from '../context/QuizContext';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedPlan } = useQuiz();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
      <Header />
      <main className="flex-1 px-5 py-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-[#2D1441] mb-3"
          >
            Compra Realizada com Sucesso!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mb-8"
          >
            Seu método personalizado de Yoga de Cadeira já está disponível. Enviamos os detalhes de acesso para seu email.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-md mb-8"
          >
            <h2 className="font-semibold text-lg text-[#2D1441] mb-4">Próximos Passos</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-[#7432B4]/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-[#7432B4]">1</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">Verifique seu email</p>
                  <p className="text-sm text-gray-600">Enviamos instruções detalhadas e seus dados de acesso</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-[#7432B4]/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-[#7432B4]">2</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">Baixe seu material</p>
                  <p className="text-sm text-gray-600">Acesse o portal para baixar seu método completo</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-[#7432B4]/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-[#7432B4]">3</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">Comece sua jornada</p>
                  <p className="text-sm text-gray-600">Siga o programa personalizado de 21 dias</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <button 
              className="bg-[#7432B4] text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Baixar Material
            </button>
            
            <button 
              onClick={() => navigate('/sales')}
              className="bg-white border border-[#7432B4] text-[#7432B4] font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2"
            >
              Acessar Portal
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SuccessPage;