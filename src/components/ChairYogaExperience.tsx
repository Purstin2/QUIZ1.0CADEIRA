import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import Header from './Header';
import AnimatedPage from './AnimatedPage';

const ChairYogaExperience: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setChairYogaExperience } = useQuiz();
  
  const options = [
    { 
      value: 'never', 
      label: 'Sou iniciante',
      icon: '🌱',
      description: 'Nunca pratiquei yoga na cadeira antes',
      benefit: 'Receberá instruções detalhadas, passo a passo'
    },
    { 
      value: 'tried', 
      label: 'Tenho alguma experiência',
      icon: '🍃',
      description: 'Já experimentei algumas vezes',
      benefit: 'Receberá exercícios de nível intermediário'
    },
    { 
      value: 'regular', 
      label: 'Sou praticante regular',
      icon: '🧘‍♀️',
      description: 'Pratico regularmente há algum tempo',
      benefit: 'Receberá sequências avançadas e desafiadoras'
    }
  ];

  const handleSelect = (value: string) => {
    setSelected(value);
    
    // Armazenar resposta e navegar após breve atraso
    setChairYogaExperience(value as 'never' | 'tried' | 'regular');
    
    setTimeout(() => {
      navigate('/chair-yoga-info');
    }, 300);
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        
        {/* Mensagem de confirmação sutil */}
        <motion.div 
          className="w-full max-w-md mx-auto px-4 mt-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Objetivos registrados com sucesso!</span>
          </div>
        </motion.div>
        
        <main className="flex-1 flex flex-col items-center px-4 pt-4">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <h2 className="text-xl font-bold text-[#2D1441] mb-4 text-center">
                Qual é o seu nível de experiência?
              </h2>
              
              {/* Explicação de Yoga na Cadeira */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Yoga na Cadeira</span> são exercícios adaptados que podem ser realizados sentado, ideais para quem tem mobilidade limitada ou passa muito tempo sentado. Combinam movimentos suaves, respiração e posturas adaptadas.
                </p>
              </div>
            </motion.div>
            
            <div className="space-y-3 mb-4">
              {options.map((option, index) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center p-4 rounded-xl border transition-all ${
                    selected === option.value 
                      ? 'border-[#7432B4] bg-[#7432B4]/5 shadow-sm' 
                      : 'border-gray-200 hover:border-[#7432B4] hover:bg-[#7432B4]/5'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#7432B4]/10 mr-3">
                    <span className="text-2xl">{option.icon}</span>
                  </div>
                  
                  <div className="text-left flex-1">
                    <div className="font-medium text-gray-800">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                    
                    {/* Benefício destacado */}
                    <div className="mt-1 text-xs text-[#7432B4] font-medium">
                      {option.benefit}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* Elemento de redução de atrito */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center text-sm text-gray-500 max-w-md mx-auto px-6"
            >
              <p>
                Não se preocupe, nosso programa funciona para todos os níveis de experiência.
              </p>
            </motion.div>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default ChairYogaExperience;