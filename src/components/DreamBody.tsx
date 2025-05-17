import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import AnimatedPage from './AnimatedPage';

const DreamBody: React.FC = () => {
  const navigate = useNavigate();
  const { dreamBody, setDreamBody } = useQuiz();
  const [selected, setSelected] = useState<string | null>(dreamBody || null);

  const bodyTypes = [
    {
      value: 'fit',
      label: 'Em forma',
      description: 'Corpo tonificado e saudável',
      image: 'https://i.imgur.com/6ayCelV.jpeg'
    },
    {
      value: 'athletic',
      label: 'Atlético',
      description: 'Corpo definido e esportivo',
      image: 'https://i.imgur.com/b7OWDt2.jpeg'
    },
    {
      value: 'shapely',
      label: 'Bem torneado',
      description: 'Curvas harmoniosas e definidas',
      image: 'https://i.imgur.com/8fwjuJH.jpeg'
    },
    {
      value: 'content',
      label: "Estou bem com meu corpo",
      description: 'Foco em saúde e bem-estar',
      image: 'https://i.imgur.com/Od0DXQv.jpeg'
    }
  ];

  const handleSelection = (type: 'fit' | 'athletic' | 'shapely' | 'content') => {
    setSelected(type);
    setDreamBody(type);
    setTimeout(() => {
      navigate('/target-zones');
    }, 300);
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex-1 flex flex-col items-center px-4 pt-7">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#2D1441] mb-3 text-center">
              Qual é o corpo dos seus sonhos?
            </h2>
            <p className="text-gray-500 mb-6 text-center text-sm">
              Escolha a opção que melhor representa seu objetivo
            </p>

            <section className="space-y-2.5 mb-6" aria-label="Lista de tipos de corpo">
              {bodyTypes.map((type) => (
                <motion.button
                  key={type.value}
                  onClick={() => handleSelection(type.value as 'fit' | 'athletic' | 'shapely' | 'content')}
                  className={`w-full flex items-center p-4 rounded-2xl border relative transition ${
                    selected === type.value
                      ? 'bg-gradient-to-r from-[#7432B4]/5 to-[#7432B4]/10 border-[#7432B4] shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Imagem com arredondamento consistente */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden mr-3 shadow-sm flex-shrink-0">
                    <motion.img 
                      src={type.image}
                      alt={type.label}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="text-left flex-1">
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

export default DreamBody;