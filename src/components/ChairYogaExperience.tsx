import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import AnimatedPage from './AnimatedPage';

// Versão atualizada para combinar ChairYogaExperience e YogaLevel
const ChairYogaExperience: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setChairYogaExperience, setYogaLevel } = useQuiz();
  
  const options = [
    { 
      value: 'never', 
      yogaLevel: 'beginner',
      label: 'Sou iniciante',
      icon: '🌱',
      description: 'Nunca pratiquei yoga ou exercícios similares antes',
      benefit: 'Receberá instruções detalhadas, passo a passo'
    },
    { 
      value: 'tried', 
      yogaLevel: 'basic',
      label: 'Tenho alguma experiência',
      icon: '🍃',
      description: 'Já experimentei yoga ou atividades similares algumas vezes',
      benefit: 'Receberá exercícios de nível intermediário'
    },
    { 
      value: 'regular', 
      yogaLevel: 'intermediate',
      label: 'Pratico regularmente',
      icon: '🧘‍♀️',
      description: 'Pratico yoga ou exercícios similares com frequência',
      benefit: 'Receberá sequências mais avançadas e desafiadoras'
    }
  ];

  const handleSelect = (option: {value: string, yogaLevel: string}) => {
    setSelected(option.value);
    setChairYogaExperience(option.value as 'never' | 'tried' | 'regular');
    setYogaLevel(option.yogaLevel);
    setTimeout(() => {
      navigate('/activity-level');
    }, 300);
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white pt-6">
       
        
        <main className="flex-1 flex flex-col items-center px-4 pt-4">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6">

              <h2 className="text-2xl font-bold text-[#2D1441] mb-8 text-center">
                Qual é a sua experiência com yoga e exercícios? 
              </h2>
              
            </motion.div>
            
            <div className="space-y-3 mb-4">
              {options.map((option, index) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleSelect(option)}
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
                    <div className="mt-1 text-xs text-[#7432B4] font-medium">
                      {option.benefit}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
           
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default ChairYogaExperience;