import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import AnimatedPage from './AnimatedPage';

const BodyType: React.FC = () => {
  const navigate = useNavigate();
  const { setBodyType } = useQuiz();
  const [selected, setSelected] = useState<string | null>(null);

  const bodyTypes = [
    {
      value: 'normal',
      label: 'Corpo Normal',
      description: 'Proporções balanceadas, peso médio',
      image: 'https://i.imgur.com/x4v22Q7_d.webp?maxwidth=760&fidelity=grand'
    },
    {
      value: 'curvy',
      label: 'Corpo Curvilíneo',
      description: 'Curvas mais acentuadas, proporção cintura-quadril',
      image: 'https://i.imgur.com/ysFNKb7.jpg'
    },
    {
      value: 'plus',
      label: 'Corpo Plus Size',
      description: 'Mais volume e curvas generosas',
      image: 'https://i.imgur.com/SJu6Mwu_d.webp?maxwidth=760&fidelity=grand'
    }
  ];

  const handleSelection = (type: 'normal' | 'curvy' | 'plus') => {
    setSelected(type);
    setBodyType(type);
    setTimeout(() => {
      navigate('/dream-body');
    }, 300);
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex-1 flex flex-col items-center px-4 pt-7">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#2D1441] mb-8 text-center">
              Qual é seu tipo de corpo?
            </h2>

            <section className="space-y-2.5 mb-6" aria-label="Lista de tipos de corpo">
              {bodyTypes.map((type) => (
                <motion.button
                  key={type.value}
                  onClick={() => handleSelection(type.value as 'normal' | 'curvy' | 'plus')}
                  className={`w-full flex items-center p-4 rounded-2xl border relative transition ${
                    selected === type.value
                      ? 'bg-gradient-to-r from-[#7432B4]/5 to-[#7432B4]/10 border-[#7432B4] shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Imagem com tamanho consistente e arredondamento */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={type.image} 
                      alt={type.label}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Texto */}
                  <div className="text-left flex-1 ml-3">
                    <div className="font-medium text-gray-800">{type.label}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </div>

                  {/* Indicador de seleção */}
                  {selected === type.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4 w-5 h-5 bg-[#7432B4] rounded-full flex items-center justify-center text-white text-xs shadow-md"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </section>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default BodyType;