import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import AnimatedPage from './AnimatedPage';
import Header from './Header';

const DreamBody: React.FC = () => {
  const navigate = useNavigate();
  const { dreamBody, setDreamBody } = useQuiz();

  const handleSelection = (type: 'fit' | 'athletic' | 'shapely' | 'content') => {
    setDreamBody(type);
    navigate('/target-zones');
  };

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

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <div className="flex-1 flex flex-col items-center px-4">
          <div className="w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
              Qual é o corpo dos seus sonhos?
            </h2>
            <p className="text-gray-500 mb-6 text-center text-sm">
              Escolha a opção que melhor representa seu objetivo
            </p>

            <div className="space-y-2.5 mb-8">
              {bodyTypes.map((type) => (
                <motion.button
                  key={type.value}
                  onClick={() => handleSelection(type.value as 'fit' | 'athletic' | 'shapely' | 'content')}
                  className={`w-full p-4 flex items-center rounded-2xl border relative ${
                    dreamBody === type.value 
                      ? 'bg-[#7432B4] bg-opacity-5 border-[#7432B4] shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-[#7432B4] hover:bg-[#7432B4]/5'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Imagem com destaque e efeito de hover */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden mr-3 shadow-sm">
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

                  {dreamBody === type.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4 w-5 h-5 flex items-center justify-center text-[#7432B4] bg-white rounded-full border-2 border-[#7432B4]"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default DreamBody;
