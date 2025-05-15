import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import AnimatedPage from './AnimatedPage';
import Header from './Header';
import { GiMuscleUp, GiBreastplate, GiBiceps, GiStomach, GiBootStomp, GiLeg } from 'react-icons/gi'; // ícones exemplo

const TargetZones: React.FC = () => {
  const navigate = useNavigate();
  const { getNextRoute } = useQuiz();
  const [selectedZones, setSelectedZones] = useState<string[]>([]);

  const zones = [
    {
      id: 'full-body',
      label: 'Corpo inteiro',
      description: 'Trabalhe todos os grupos musculares',
      icon: <GiMuscleUp size={20} />,
    },
    {
      id: 'breasts',
      label: 'Seios',
      description: 'Fortaleça e melhore a postura',
      icon: <GiBreastplate size={20} />,
    },
    {
      id: 'arms',
      label: 'Braços',
      description: 'Tonifique e defina',
      icon: <GiBiceps size={20} />,
    },
    {
      id: 'belly',
      label: 'Barriga',
      description: 'Fortaleça o core',
      icon: <GiStomach size={20} />,
    },
    {
      id: 'butt',
      label: 'Bumbum',
      description: 'Levante e fortaleça',
      icon: <GiBootStomp size={20} />,
    },
    {
      id: 'legs',
      label: 'Pernas',
      description: 'Tonifique e defina',
      icon: <GiLeg size={20} />,
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
    navigate('/activity-level');
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-white p-6 max-w-md mx-auto">
        <Header />
        <div className="mb-8">
          <div className="text-xs text-center text-[#7432B4] uppercase mb-2">OBJETIVOS</div>
          <div className="h-1 w-full bg-[#F4F4F4] rounded-full">
            <div className="h-1 w-1/5 bg-[#7432B4] rounded-full" />
          </div>
        </div>

        <h2 className="text-[#2D1441] text-2xl font-bold mb-8 text-center">
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
              {/* Ícone com fundo arredondado */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedZones.includes(zone.id)
                  ? 'bg-[#7432B4] text-white'
                  : 'bg-[#7432B4]/10 text-[#7432B4]'
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
        <button
          onClick={handleContinue}
          disabled={selectedZones.length === 0}
          className={`w-full py-4 rounded-xl text-white font-medium transition-all ${
            selectedZones.length > 0
              ? 'bg-[#7432B4] hover:bg-[#6822A6]'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {selectedZones.length > 0 ? 'Continuar' : 'Selecione pelo menos uma área'}
        </button>
      </div>
    </AnimatedPage>
  );
};

export default TargetZones;
