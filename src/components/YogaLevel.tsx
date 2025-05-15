import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const YogaLevel = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate(); // Inicializando o hook de navegação

  const levels = [
    {
      id: 'beginner',
      label: 'Iniciante',
      description: 'Nunca experimentei ioga antes',
      icon: '🌱',
    },
    {
      id: 'basic',
      label: 'Nível básico',
      description: 'Tenho algumas aulas para iniciantes',
      icon: '🍃',
    },
    {
      id: 'intermediate',
      label: 'Intermediário',
      description: 'Pratico de forma consistente, mas não o tempo todo',
      icon: '🌿',
    },
    {
      id: 'advanced',
      label: 'Especialista',
      description: 'Confiante em poses avançadas',
      icon: '🎯',
    },
  ];

  const handleSelect = (level) => {
    setSelectedLevel(level.id);
    // Navegar para a próxima página após selecionar um nível
    navigate('/sensitivity-check'); // Substitua pelo caminho correto da sua aplicação
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-6">
          <div className="text-xs text-center text-purple-700 uppercase mb-2">EXPERIÊNCIA</div>
          <div className="h-1 w-full bg-gray-100 rounded-full">
            <div className="h-1 w-4/5 bg-purple-700 rounded-full" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
          Escolha seu nível de ioga
        </h2>

        <div className="space-y-4 mb-6">
          {levels.map((level) => (
            <motion.button
              key={level.id}
              onClick={() => handleSelect(level)}
              className={`w-full p-4 flex items-center gap-4 rounded-xl border transition-all ${
                selectedLevel === level.id
                  ? 'border-purple-700 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-700 hover:bg-purple-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={selectedLevel === level.id ? { scale: 1 } : { scale: 0.95 }}
              animate={
                selectedLevel === level.id
                  ? { scale: [1, 1.05, 1], transition: { duration: 0.3 } }
                  : { scale: 1, transition: { duration: 0.2 } }
              }
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  selectedLevel === level.id ? 'bg-purple-700 text-white' : 'bg-purple-100'
                }`}
              >
                {level.icon}
              </div>
              <div className="text-left flex-1">
                <div className={`font-medium ${selectedLevel === level.id ? 'text-purple-900' : 'text-gray-800'}`}>
                  {level.label}
                </div>
                <div className="text-sm text-gray-500">{level.description}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YogaLevel;
