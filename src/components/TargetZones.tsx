import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import AnimatedPage from './AnimatedPage';
import Header from './Header';

const TargetZones: React.FC = () => {
  const navigate = useNavigate();
  const { getNextRoute } = useQuiz();
  const [selectedZones, setSelectedZones] = useState<string[]>([]);

  const zones = [
    {
      id: 'full-body',
      label: 'Corpo inteiro',
      description: 'Trabalhe todos os grupos musculares',
      icon: '💪',
    },
    {
      id: 'breasts',
      label: 'Seios',
      description: 'Fortaleça e melhore a postura',
      icon: '👚',
    },
    {
      id: 'arms',
      label: 'Braços',
      description: 'Tonifique e defina',
      icon: '💪',
    },
    {
      id: 'belly',
      label: 'Barriga',
      description: 'Fortaleça o core',
      icon: '🔄',
    },
    {
      id: 'butt',
      label: 'Bumbum',
      description: 'Levante e fortaleça',
      icon: '🍑',
    },
    {
      id: 'legs',
      label: 'Pernas',
      description: 'Tonifique e defina',
      icon: '🦵',
    },
  ];

  const toggleZone = (id: string) => {
    setSelectedZones(prev =>
      prev.includes(id)
        ? prev.filter(zone => zone !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    navigate('/body-type');
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex-1 flex flex-col items-center px-4 pt-7">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#2D1441] mb-8 text-center">
              Quais áreas você quer trabalhar?
            </h2>

            <section className="space-y-2.5 mb-8" aria-label="Lista de áreas do corpo">
              {zones.map((zone) => (
                <motion.button
                  key={zone.id}
                  onClick={() => toggleZone(zone.id)}
                  className={`w-full flex items-center p-4 rounded-2xl border relative transition ${
                    selectedZones.includes(zone.id)
                      ? 'bg-gradient-to-r from-[#7432B4]/5 to-[#7432B4]/10 border-[#7432B4] shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Ícone com fundo arredondado - agora com emojis melhores */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                    selectedZones.includes(zone.id)
                      ? 'bg-[#7432B4] text-white'
                      : 'bg-[#7432B4]/10'
                  }`}>
                    {zone.icon}
                  </div>

                  {/* Texto */}
                  <div className="text-left flex-1 ml-3">
                    <div className="font-medium text-gray-800">{zone.label}</div>
                    <div className="text-sm text-gray-500">{zone.description}</div>
                  </div>

                  {/* Marcação de seleção */}
                  {selectedZones.includes(zone.id) && (
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

            {/* Botão de continuar */}
            <motion.button
              onClick={handleContinue}
              disabled={selectedZones.length === 0}
              className={`w-full py-4 rounded-xl text-white font-medium transition-all ${
                selectedZones.length > 0
                  ? 'bg-[#7432B4] hover:bg-[#6822A6]'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              whileHover={selectedZones.length > 0 ? { scale: 1.02 } : {}}
              whileTap={selectedZones.length > 0 ? { scale: 0.98 } : {}}
            >
              {selectedZones.length > 0 ? 'Continuar' : 'Selecione pelo menos uma área'}
            </motion.button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default TargetZones;