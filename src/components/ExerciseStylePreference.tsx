import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Timer, Wind, HeartPulse, Flower } from 'lucide-react';
import Header from './Header';
import AnimatedPage from './AnimatedPage';

const ExerciseStylePreference: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [points, setPoints] = useState(0);

  const exerciseTypes = [
    {
      id: 'yoga',
      label: 'Yoga',
      icon: <Flower className="w-5 h-5" />,
      benefit: 'Flexibilidade e calma mental'
    },
    {
      id: 'strength',
      label: 'Força',
      icon: <Dumbbell className="w-5 h-5" />,
      benefit: 'Tonificação muscular'
    },
    {
      id: 'cardio',
      label: 'Cardio',
      icon: <HeartPulse className="w-5 h-5" />,
      benefit: 'Resistência e queima calórica'
    },
    {
      id: 'hiit',
      label: 'HIIT',
      icon: <Timer className="w-5 h-5" />,
      benefit: 'Resultados rápidos em menos tempo'
    },
    {
      id: 'mobility',
      label: 'Mobilidade',
      icon: <Wind className="w-5 h-5" />,
      benefit: 'Melhora nas articulações'
    }
  ];

  const toggleSelection = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
      setPoints(prev => prev - 5);
    } else {
      setSelected([...selected, id]);
      setPoints(prev => prev + 5);
    }
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1 flex flex-col px-4">
          <div className="w-full max-w-md mx-auto">

            {/* Barra de progresso + pontos */}
            <div className="mb-6 flex justify-between items-center">
              <div className="w-3/4">
                <div className="text-xs text-[#7432B4] uppercase mb-1">ESTILO DE VIDA</div>
                <div className="h-2 w-full bg-[#F4F4F4] rounded-full">
                  <motion.div
                    className="h-2 bg-[#7432B4] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${selected.length > 0 ? 30 + selected.length * 10 : 0}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs text-gray-500">PONTOS</div>
                <motion.div
                  key={points}
                  initial={{ scale: 1 }}
                  animate={{ scale: points > 0 ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                  className="font-bold text-[#7432B4]"
                >
                  {points}
                </motion.div>
              </div>
            </div>

            {/* Título e subtítulo */}
            <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
              Que tipo de exercício você prefere?
            </h2>
            <p className="text-gray-500 mb-4 text-center text-sm">
              Selecione todas as opções que você gosta
            </p>

            {/* Lista de opções */}
            <section className="space-y-2.5 mb-6" aria-label="Lista de estilos de exercício">
              {exerciseTypes.map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => toggleSelection(type.id)}
                  className={`w-full flex items-center p-4 rounded-2xl border relative transition ${
                    selected.includes(type.id)
                      ? 'bg-gradient-to-r from-[#7432B4]/5 to-[#7432B4]/10 border-[#7432B4] shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selected.includes(type.id)
                      ? 'bg-[#7432B4] text-white'
                      : 'bg-[#7432B4]/10 text-[#7432B4]'
                  }`}>
                    {type.icon}
                  </div>
                  <div className="text-left flex-1 ml-3">
                    <div className="font-medium text-gray-800">{type.label}</div>
                    <div className="text-sm text-gray-500">{type.benefit}</div>
                  </div>
                  {selected.includes(type.id) && (
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

            {/* Botão continuar */}
            <motion.button
              onClick={() => navigate('/available-time')}
              className={`w-full font-semibold py-4 px-6 rounded-2xl text-lg shadow-lg transition-all ${
                selected.length > 0
                  ? 'bg-[#7432B4] text-white hover:bg-[#6822A6]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={selected.length > 0 ? { scale: 1.02 } : {}}
              whileTap={selected.length > 0 ? { scale: 0.98 } : {}}
              disabled={selected.length === 0}
            >
              Continuar
            </motion.button>

          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default ExerciseStylePreference;
